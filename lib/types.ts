export interface Universidade {
  id: string;
  nome: string;
  sigla: string;
  cidade: string;
  estado: string;
  site: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UniversidadeFormData {
  nome: string;
  sigla: string;
  cidade: string;
  estado: string;
  site: string;
}