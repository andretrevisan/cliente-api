"use client";

import { LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Universidade } from "@/lib/universidades-api";

type UniversidadesTableProps = {
  universidades: Universidade[];
  carregando: boolean;
  onEditar: (universidade: Universidade) => void;
  onExcluir: (universidade: Universidade) => void;
};

export default function UniversidadesTable({
  universidades,
  carregando,
  onEditar,
  onExcluir,
}: UniversidadesTableProps) {
  if (carregando) {
    return (
      <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-[#247BA0]">
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        Carregando...
      </div>
    );
  }

  if (universidades.length === 0) {
    return (
      <div className="px-5 py-14 text-center text-sm text-[#13293D]/60">
        Nenhuma universidade cadastrada.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-[#E8F1F2] hover:bg-transparent">
          <TableHead className="px-5 text-[#247BA0]">Universidade</TableHead>
          <TableHead className="text-[#247BA0]">Endereço</TableHead>
          <TableHead className="px-5 text-right text-[#247BA0]">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {universidades.map((universidade) => (
          <TableRow
            key={universidade.id}
            className="border-[#E8F1F2] hover:bg-[#E8F1F2]/60"
          >
            <TableCell className="min-w-56 px-5 py-4 font-medium whitespace-normal text-[#13293D]">
              {universidade.nome}
            </TableCell>
            <TableCell className="min-w-56 py-4 whitespace-normal text-[#13293D]/70">
              {universidade.endereco}
            </TableCell>
            <TableCell className="px-5 py-4">
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-[#247BA0]/25 text-[#006494] hover:bg-[#E8F1F2]"
                  onClick={() => onEditar(universidade)}
                  aria-label={`Editar ${universidade.nome}`}
                >
                  <Pencil className="size-3.5" aria-hidden="true" />
                  Editar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-[#13293D]/15 text-[#13293D] hover:border-[#13293D] hover:bg-[#13293D] hover:text-white"
                  onClick={() => onExcluir(universidade)}
                  aria-label={`Excluir ${universidade.nome}`}
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  Excluir
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
