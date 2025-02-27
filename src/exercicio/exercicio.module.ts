import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercicio } from './entities/exercicio.entity';
import { ExercicioController } from './controllers/exercicio.controller';
import { ExercicioService } from './services/exercicio.service';
import { CategoriaModule } from '../categoria/categoria.module';
import { CategoriaService } from '../categoria/services/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercicio]), CategoriaModule],
  controllers: [ExercicioController],
  providers: [ExercicioService, CategoriaService],
  exports: [TypeOrmModule],
})
export class ExercicioModule {}
