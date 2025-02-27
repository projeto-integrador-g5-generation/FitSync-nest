import { ValueTransformer } from 'typeorm';

export class NumericTransformer implements ValueTransformer {
  // Converte de TypeScript para o banco de dados
  to(value: number): number | null {
    return value !== null && value !== undefined
      ? parseFloat(value.toFixed(2))
      : null;
  }

  // Converte do banco de dados para TypeScript
  from(value: string): number | null {
    return value !== null && value !== undefined ? parseFloat(value) : null;
  }
}
