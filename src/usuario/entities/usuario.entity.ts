import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NumericTransformer } from '../../util/numerictransformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @Column({ type: 'date', nullable: false })
  @ApiProperty()
  data_nascimento: Date;

  @IsNotEmpty()
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  @ApiProperty()
  peso: number;

  @IsNotEmpty()
  @Column('decimal', { precision: 3, scale: 2, nullable: true })
  @ApiProperty()
  altura: number;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ example: 'email@email.com.br' })
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  senha: string;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @Column('decimal', {
    precision: 5,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  @ApiProperty()
  imc: number;
}
