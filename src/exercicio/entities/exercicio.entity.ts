import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'tb_exercicios' })
export class Exercicio {
  @PrimaryGeneratedColumn({ type: 'int' })
  @ApiProperty()
  id: number;

  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @Column({ type: 'int', nullable: true })
  @ApiProperty()
  tempo: number | null;

  @Column({ type: 'int', nullable: true })
  @ApiProperty()
  series: number | null;

  @Column({ type: 'int', nullable: true })
  @ApiProperty()
  repeticoes: number | null;

  @Column({ type: 'int', nullable: true })
  @ApiProperty()
  descanso: number | null;

  @Column({ type: 'int', nullable: true })
  @ApiProperty()
  carga: number | null;

  @Column()
  @ApiProperty()
  video: string;

  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categoria) => categoria.exercicio, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
