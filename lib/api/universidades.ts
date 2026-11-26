import type { Universidade, UniversidadeFormData } from '@/lib/types';

const API_BASE_URL = 'https://6afe2fc83a0e70bc8d532dd2.mockapi.io/frontend/api/universidades';

// Função para extrair cidade e estado do endereço
function parseEndereco(endereco: string): { cidade: string; estado: string } {
  // Formato: "Rua X, 123 - Bairro, Cidade - ESTADO, CEP"
  // ou: "Avenida X, s/n - Campus, Cidade - ESTADO, CEP"
  // ou: "Linha X, s/n - Rural, Cidade - ESTADO, CEP"

  const partes = endereco.split(',');
  let cidade = '';
  let estado = '';

  // Procurar pela parte que contém " - CIDADE - ESTADO"
  for (let i = partes.length - 1; i >= 0; i--) {
    const parte = partes[i].trim();
    const match = parte.match(/^(.+?)\s*-\s*([A-Z]{2})\s*(?:,\s*\d{5}-?\d{3})?$/);
    if (match) {
      cidade = match[1].trim();
      estado = match[2].trim();
      break;
    }
  }

  // Fallback se não encontrar
  if (!cidade || !estado) {
    const ultimaParte = partes[partes.length - 1].trim();
    const match = ultimaParte.match(/^(.+?)\s*-\s*([A-Z]{2})/);
    if (match) {
      cidade = match[1].trim();
      estado = match[2].trim();
    }
  }

  return { cidade: cidade || 'Não informado', estado: estado || 'Não informado' };
}

// Função para gerar sigla baseada no nome
function gerarSigla(nome: string): string {
  const palavras = nome
    .replace(/Universidade\s+(Federal|Estadual|Tecnológica|do|da|de|dos|das)\s+/gi, '')
    .replace(/Federal|Estadual|Tecnológica/gi, '')
    .split(/\s+/)
    .filter(p => p.length > 2);

  if (palavras.length >= 2) {
    return (palavras[0][0] + palavras[1][0]).toUpperCase();
  }
  return nome.substring(0, 4).toUpperCase();
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(error.message || `Erro HTTP: ${response.status}`);
  }
  return response.json();
}

export async function getUniversidades(): Promise<Universidade[]> {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
  });

  const data = await handleResponse<any[]>(response);

  // Transformar dados da API para nosso formato
  return data.map((item) => {
    const { cidade, estado } = parseEndereco(item.endereco);
    const sigla = gerarSigla(item.nome);

    return {
      id: item.id,
      nome: item.nome,
      sigla,
      cidade,
      estado,
      site: `https://www.${sigla.toLowerCase()}.br`, // Site fictício baseado na sigla
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  });
}

export async function getUniversidade(id: string): Promise<Universidade> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const item = await handleResponse<any>(response);
  const { cidade, estado } = parseEndereco(item.endereco);
  const sigla = gerarSigla(item.nome);

  return {
    id: item.id,
    nome: item.nome,
    sigla,
    cidade,
    estado,
    site: `https://www.${sigla.toLowerCase()}.br`,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export async function createUniversidade(data: UniversidadeFormData): Promise<Universidade> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: data.nome,
      endereco: `${data.cidade} - ${data.estado}`, // Formato simplificado para a API
    }),
  });

  const item = await handleResponse<any>(response);
  const { cidade, estado } = parseEndereco(item.endereco);
  const sigla = data.sigla || gerarSigla(data.nome);
  const site = data.site || `https://www.${sigla.toLowerCase()}.br`;

  return {
    id: item.id,
    nome: item.nome,
    sigla,
    cidade,
    estado,
    site,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export async function updateUniversidade(id: string, data: UniversidadeFormData): Promise<Universidade> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: data.nome,
      endereco: `${data.cidade} - ${data.estado}`,
    }),
  });

  const item = await handleResponse<any>(response);
  const { cidade, estado } = parseEndereco(item.endereco);
  const sigla = data.sigla || gerarSigla(data.nome);
  const site = data.site || `https://www.${sigla.toLowerCase()}.br`;

  return {
    id: item.id,
    nome: item.nome,
    sigla,
    cidade,
    estado,
    site,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export async function deleteUniversidade(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro ao excluir' }));
    throw new Error(error.message || `Erro HTTP: ${response.status}`);
  }
}