"use client";

import type { FormEvent } from "react";
import { LoaderCircle, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Universidade } from "@/lib/universidades-api";

type UniversidadeFormDialogProps = {
  aberto: boolean;
  universidade: Universidade | null;
  nome: string;
  endereco: string;
  salvando: boolean;
  onOpenChange: (aberto: boolean) => void;
  onNomeChange: (nome: string) => void;
  onEnderecoChange: (endereco: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function UniversidadeFormDialog({
  aberto,
  universidade,
  nome,
  endereco,
  salvando,
  onOpenChange,
  onNomeChange,
  onEnderecoChange,
  onSubmit,
}: UniversidadeFormDialogProps) {
  return (
    <Dialog open={aberto} onOpenChange={onOpenChange}>
      <DialogContent className="border-0 p-0 sm:max-w-lg">
        <form onSubmit={onSubmit}>
          <DialogHeader className="border-b border-[#E8F1F2] px-6 py-5">
            <DialogTitle className="text-lg text-[#13293D]">
              {universidade ? "Editar universidade" : "Cadastrar universidade"}
            </DialogTitle>
            <DialogDescription className="text-[#13293D]/60">
              Informe o nome e o endereço da instituição.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 px-6 py-5">
            <div className="space-y-1.5">
              <label htmlFor="nome" className="text-sm font-medium text-[#13293D]">
                Nome
              </label>
              <input
                id="nome"
                value={nome}
                onChange={(event) => onNomeChange(event.target.value)}
                required
                className="h-10 w-full rounded-lg border border-[#247BA0]/25 bg-white px-3 text-sm text-[#13293D] outline-none placeholder:text-[#13293D]/40 focus:border-[#1B98E0] focus:ring-2 focus:ring-[#1B98E0]/20"
                placeholder="Nome da universidade"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="endereco"
                className="text-sm font-medium text-[#13293D]"
              >
                Endereço
              </label>
              <textarea
                id="endereco"
                value={endereco}
                onChange={(event) => onEnderecoChange(event.target.value)}
                required
                rows={3}
                className="w-full resize-y rounded-lg border border-[#247BA0]/25 bg-white px-3 py-2 text-sm text-[#13293D] outline-none placeholder:text-[#13293D]/40 focus:border-[#1B98E0] focus:ring-2 focus:ring-[#1B98E0]/20"
                placeholder="Rua, número, cidade e CEP"
              />
            </div>
          </div>
          <DialogFooter className="border-t border-[#E8F1F2] bg-[#E8F1F2]/50 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              className="gap-2 border-[#247BA0]/25 bg-white text-[#13293D]"
              onClick={() => onOpenChange(false)}
              disabled={salvando}
            >
              <X className="size-4" aria-hidden="true" />
              Cancelar
            </Button>
            <Button
              type="submit"
              className="gap-2 bg-[#006494] text-white hover:bg-[#247BA0]"
              disabled={salvando}
            >
              {salvando ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Plus className="size-4" aria-hidden="true" />
              )}
              {universidade ? "Salvar alterações" : "Cadastrar universidade"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
