"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LoaderCircle, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard-sidebar";
import UniversidadeFormDialog from "@/components/universidade-form-dialog";
import UniversidadesTable from "@/components/universidades-table";
import {
  atualizarUniversidade,
  criarUniversidade,
  excluirUniversidade,
  listarUniversidades,
  type Universidade,
} from "@/lib/universidades-api";

type Notice = { type: "success" | "error"; message: string } | null;

function mensagemErro(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function UniversidadesDashboard() {
  const [universidades, setUniversidades] = useState<Universidade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<Universidade | null>(null);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [aviso, setAviso] = useState<Notice>(null);

  useEffect(() => {
    let ativo = true;

    listarUniversidades()
      .then((dados) => {
        if (ativo) setUniversidades(dados);
      })
      .catch((error: unknown) => {
        if (ativo) {
          setAviso({
            type: "error",
            message: mensagemErro(error, "Não foi possível carregar as universidades."),
          });
        }
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  async function buscarUniversidades() {
    setCarregando(true);
    setAviso(null);
    try {
      setUniversidades(await listarUniversidades());
    } catch (error) {
      setAviso({
        type: "error",
        message: mensagemErro(error, "Não foi possível carregar as universidades."),
      });
    } finally {
      setCarregando(false);
    }
  }

  function abrirCadastro(universidade?: Universidade) {
    setEditando(universidade ?? null);
    setNome(universidade?.nome ?? "");
    setEndereco(universidade?.endereco ?? "");
    setAviso(null);
    setModalAberto(true);
  }

  function fecharModal(aberto: boolean) {
    setModalAberto(aberto);
    if (!aberto) {
      setEditando(null);
      setNome("");
      setEndereco("");
    }
  }

  async function salvarUniversidade(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = { nome: nome.trim(), endereco: endereco.trim() };
    if (!dados.nome || !dados.endereco) {
      setAviso({
        type: "error",
        message: "Preencha o nome e o endereço da universidade.",
      });
      return;
    }

    setSalvando(true);
    setAviso(null);
    try {
      if (editando) {
        const atualizada = await atualizarUniversidade(editando.id, dados);
        setUniversidades((lista) =>
          lista.map((item) => (item.id === atualizada.id ? atualizada : item)),
        );
        setAviso({ type: "success", message: "Universidade atualizada." });
      } else {
        const criada = await criarUniversidade(dados);
        setUniversidades((lista) => [criada, ...lista]);
        setAviso({ type: "success", message: "Universidade cadastrada." });
      }
      fecharModal(false);
    } catch (error) {
      setAviso({
        type: "error",
        message: mensagemErro(error, "Não foi possível salvar a universidade."),
      });
    } finally {
      setSalvando(false);
    }
  }

  async function removerUniversidade(universidade: Universidade) {
    if (!window.confirm(`Excluir "${universidade.nome}"?`)) return;

    setAviso(null);
    try {
      await excluirUniversidade(universidade.id);
      setUniversidades((lista) =>
        lista.filter((item) => item.id !== universidade.id),
      );
      setAviso({ type: "success", message: "Universidade excluída." });
    } catch (error) {
      setAviso({
        type: "error",
        message: mensagemErro(error, "Não foi possível excluir a universidade."),
      });
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground md:flex">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-7 md:ml-64 md:px-10 md:py-9">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm text-[#247BA0]">Desenvolvimento Web FrontEnd (4SI) - Adair Rohling</p>
            <h1 className="text-3xl font-semibold tracking-tight text-[#13293D]">
              Universidades
            </h1>
            <p className="mt-2 text-sm text-[#13293D]/65">
              Consulte e gerencie as instituições cadastradas.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 border-[#247BA0]/30 bg-white text-[#13293D] hover:bg-[#E8F1F2]"
              onClick={() => void buscarUniversidades()}
              disabled={carregando}
            >
              {carregando ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <RefreshCw className="size-4" aria-hidden="true" />
              )}
              Atualizar
            </Button>
            <Button
              type="button"
              className="h-10 gap-2 bg-[#006494] text-white hover:bg-[#247BA0]"
              onClick={() => abrirCadastro()}
            >
              <Plus className="size-4" aria-hidden="true" />
              Cadastrar
            </Button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#247BA0]/15 bg-white p-5 shadow-sm">
            <p className="text-sm text-[#13293D]/60">Universidades cadastradas</p>
            <p className="mt-2 text-3xl font-semibold text-[#13293D]">
              {carregando ? "—" : universidades.length}
            </p>
          </div>
          <div className="rounded-2xl bg-[#006494] p-5 text-white shadow-sm">
            <p className="text-sm text-white/75">Conexão</p>
            <p className="mt-2 text-xl font-semibold">
              {carregando
                ? "Carregando..."
                : aviso?.type === "error"
                  ? "Verifique a API"
                  : "MockAPI"}
            </p>
            <p className="mt-1 truncate text-xs text-white/70">
              frontend/api/universidades
            </p>
          </div>
        </section>

        {aviso && (
          <p
            role={aviso.type === "error" ? "alert" : "status"}
            className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
              aviso.type === "error"
                ? "border-[#247BA0]/30 bg-[#E8F1F2] text-[#13293D]"
                : "border-[#247BA0]/20 bg-white text-[#006494]"
            }`}
          >
            {aviso.message}
          </p>
        )}

        <section className="overflow-hidden rounded-2xl border border-[#247BA0]/15 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E8F1F2] px-5 py-4">
            <div>
              <h2 className="font-semibold text-[#13293D]">Lista de universidades</h2>
              <p className="mt-1 text-xs text-[#13293D]/55">
                Use as ações da tabela para editar ou excluir.
              </p>
            </div>
            <span className="rounded-full bg-[#E8F1F2] px-3 py-1 text-xs font-medium text-[#006494]">
              {universidades.length} registros
            </span>
          </div>
          <UniversidadesTable
            universidades={universidades}
            carregando={carregando}
            onEditar={abrirCadastro}
            onExcluir={(universidade) => void removerUniversidade(universidade)}
          />
        </section>

        <UniversidadeFormDialog
          aberto={modalAberto}
          universidade={editando}
          nome={nome}
          endereco={endereco}
          salvando={salvando}
          onOpenChange={fecharModal}
          onNomeChange={setNome}
          onEnderecoChange={setEndereco}
          onSubmit={salvarUniversidade}
        />
      </main>
    </div>
  );
}
