import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findByUsuario(usuario: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
      },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });
    if (!usuario)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async findByName(nome: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario)
      throw new HttpException('O Usuario já existe!', HttpStatus.BAD_REQUEST);

    usuario.imc = this.calcularImc(usuario.peso, usuario.altura);

    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario && buscaUsuario.id !== usuario.id)
      throw new HttpException(
        'Usuário (e-mail) já Cadastrado!',
        HttpStatus.BAD_REQUEST,
      );

    usuario.imc = this.calcularImc(usuario.peso, usuario.altura);

    return await this.usuarioRepository.save(usuario);
  }

  private calcularImc(peso: number, altura: number): number {
    if (isNaN(peso) || isNaN(altura)) {
      throw new HttpException(
        'Peso e altura devem ser números.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (peso <= 0 || altura <= 0) {
      throw new HttpException(
        'Peso e altura devem ser maiores que zero.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (peso > 400) {
      throw new HttpException('Peso inválido.', HttpStatus.BAD_REQUEST);
    }
    return parseFloat((peso / (altura * altura)).toFixed(2));
  }
}
