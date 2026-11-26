const API_URL =
  "https://6afe2fc83a0e70bc8d532dd2.mockapi.io/frontend/api/universidades";

export type Universidade = {
  id: string;
  nome: string;
  endereco: string;
};

type DadosUniversidade = Pick<Universidade, "nome" | "endereco">;

async function verificarResposta(response: Response) {
  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }
}

export async function listarUniversidades(): Promise<Universidade[]> {
  const response = await fetch(API_URL);
  await verificarResposta(response);
  return response.json() as Promise<Universidade[]>;
}

export async function criarUniversidade(
  dados: DadosUniversidade,
): Promise<Universidade> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  await verificarResposta(response);
  return response.json() as Promise<Universidade>;
}

export async function atualizarUniversidade(
  id: string,
  dados: DadosUniversidade,
): Promise<Universidade> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  await verificarResposta(response);
  return response.json() as Promise<Universidade>;
}

export async function excluirUniversidade(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  await verificarResposta(response);
}
