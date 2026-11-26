<<<<<<< HEAD
"use client";

import { LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
=======
'use client';

import { useState, useEffect } from 'react';
>>>>>>> origin/main
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
<<<<<<< HEAD
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
=======
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  getUniversidades,
  createUniversidade,
  updateUniversidade,
  deleteUniversidade,
} from '@/lib/api/universidades';
import type { Universidade, UniversidadeFormData } from '@/lib/types';
import { Plus, Edit, Trash2, Loader2, Search, X, GraduationCap, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const initialFormData: UniversidadeFormData = {
  nome: '',
  sigla: '',
  cidade: '',
  estado: '',
  site: '',
};

function generateSigla(nome: string): string {
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

function getEstadoColor(estado: string): string {
  const norte = ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'];
  const nordeste = ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'];
  const centroOeste = ['DF', 'GO', 'MT', 'MS'];
  const sudeste = ['ES', 'MG', 'RJ', 'SP'];
  const sul = ['PR', 'RS', 'SC'];

  if (norte.includes(estado)) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  if (nordeste.includes(estado)) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  if (centroOeste.includes(estado)) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
  if (sudeste.includes(estado)) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  if (sul.includes(estado)) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
  return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
}

function LoadingRow(): React.ReactElement {
  return (
    <TableRow>
      <TableCell colSpan={3} className="text-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
          <span className="text-muted-foreground">Carregando universidades...</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

interface EmptyRowProps {
  searchTerm: string;
  onCreate: () => void;
}

function EmptyRow({ searchTerm, onCreate }: EmptyRowProps): React.ReactElement {
  return (
    <TableRow>
      <TableCell colSpan={3} className="text-center py-12">
        <div className="flex flex-col items-center gap-3">
          <GraduationCap className="h-12 w-12 text-muted-foreground/50" />
          <span className="text-muted-foreground">
            {searchTerm
              ? 'Nenhuma universidade encontrada com esse termo'
              : 'Nenhuma universidade cadastrada'}
          </span>
          {!searchTerm && (
            <Button onClick={onCreate} className="mt-2" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Cadastrar primeira
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

interface UniversidadeRowProps {
  universidade: Universidade;
  onEdit: () => void;
  onDelete: () => void;
}

function UniversidadeRow({ universidade, onEdit, onDelete }: UniversidadeRowProps): React.ReactElement {
  return (
    <TableRow
      key={universidade.id}
      className="hover:bg-muted/30 transition-colors border-b border-border/50 last:border-0"
    >
      <TableCell className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{universidade.nome}</p>
            <p className="text-sm text-muted-foreground">ID: {universidade.id}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{universidade.cidade}</span>
          </div>
          <Badge
            variant="secondary"
            className={`${getEstadoColor(universidade.estado)} w-fit`}
          >
            {universidade.estado}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
            title="Editar"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            title="Excluir"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function UniversidadesTable() {
  const [universidades, setUniversidades] = useState<Universidade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUniversidade, setEditingUniversidade] = useState<Universidade | null>(null);
  const [formData, setFormData] = useState<UniversidadeFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [universidadeToDelete, setUniversidadeToDelete] = useState<string | null>(null);

  const loadUniversidades = async () => {
    setIsLoading(true);
    try {
      const data = await getUniversidades();
      setUniversidades(data);
    } catch (error) {
      toast.error('Erro ao carregar universidades', {
        description: error instanceof Error ? error.message : 'Tente novamente',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadUniversidades();
  }, []);

  const handleOpenCreate = () => {
    setEditingUniversidade(null);
    setFormData({ ...initialFormData, sigla: '', site: '' });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (universidade: Universidade) => {
    setEditingUniversidade(universidade);
    setFormData({
      nome: universidade.nome,
      sigla: universidade.sigla,
      cidade: universidade.cidade,
      estado: universidade.estado,
      site: universidade.site,
    });
    setIsDialogOpen(true);
  };

  const handleNomeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, nome: value, sigla: generateSigla(value) }));
  };

  const handleOpenDelete = (id: string) => {
    setUniversidadeToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingUniversidade) {
        await updateUniversidade(editingUniversidade.id, formData);
        toast.success('Universidade atualizada com sucesso');
      } else {
        await createUniversidade(formData);
        toast.success('Universidade criada com sucesso');
      }
      setIsDialogOpen(false);
      setFormData(initialFormData);
      setEditingUniversidade(null);
      await loadUniversidades();
    } catch (error) {
      toast.error('Erro ao salvar', {
        description: error instanceof Error ? error.message : 'Tente novamente',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!universidadeToDelete) return;

    try {
      await deleteUniversidade(universidadeToDelete);
      toast.success('Universidade excluída com sucesso');
      setIsDeleteDialogOpen(false);
      setUniversidadeToDelete(null);
      await loadUniversidades();
    } catch (error) {
      toast.error('Erro ao excluir', {
        description: error instanceof Error ? error.message : 'Tente novamente',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string | null) => {
    if (value !== null) {
      setFormData((prev) => ({ ...prev, estado: value }));
    }
  };

  const filteredUniversidades = universidades.filter(
    (u) =>
      u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.sigla.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <GraduationCap className="inline-block mr-2 h-8 w-8" />
            Universidades
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as universidades cadastradas no sistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Card className="hidden sm:flex items-center gap-2 px-4 py-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
            <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {universidades.length} cadastradas
            </span>
          </Card>
          <Button onClick={handleOpenCreate} className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Nova Universidade
          </Button>
        </div>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, sigla, cidade ou estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-11 text-lg"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[50%] px-6 py-4">Universidade</TableHead>
                <TableHead className="w-[30%] px-6 py-4">Localização</TableHead>
                <TableHead className="w-[20%] px-6 py-4 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <LoadingRow />
              ) : filteredUniversidades.length === 0 ? (
                <EmptyRow searchTerm={searchTerm} onCreate={handleOpenCreate} />
              ) : (
                filteredUniversidades.map((universidade) => (
                  <UniversidadeRow
                    key={universidade.id}
                    universidade={universidade}
                    onEdit={() => handleOpenEdit(universidade)}
                    onDelete={() => handleOpenDelete(universidade.id)}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              {editingUniversidade ? 'Editar Universidade' : 'Nova Universidade'}
            </DialogTitle>
            <DialogDescription>
              {editingUniversidade
                ? 'Atualize as informações da universidade selecionada'
                : 'Preencha os dados para cadastrar uma nova universidade'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-sm font-medium">
                  Nome da Universidade <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={(e) => handleNomeChange(e.target.value)}
                  placeholder="Ex: Universidade Federal do Paraná"
                  required
                  className="h-11!"
                />
                <p className="text-xs text-muted-foreground">
                  A sigla será gerada automaticamente: <strong>{formData.sigla || '—'}</strong>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 items-start">
                <div className="space-y-2">
                  <Label htmlFor="cidade" className="text-sm font-medium flex h-11 items-end">
                    Cidade <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    placeholder="Ex: Curitiba"
                    required
                    className="h-11!"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado" className="text-sm font-medium flex h-11 items-end">
                    Estado <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.estado}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger id="estado" className="h-11!" data-slot="select-trigger">
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {ESTADOS_BRASIL.map((estado) => (
                        <SelectItem key={estado} value={estado}>
                          {estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setFormData(initialFormData);
                  setEditingUniversidade(null);
                }}
                className="w-full sm:w-auto"
              >
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    {editingUniversidade ? 'Atualizar' : 'Cadastrar'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <Trash2 className="h-6 w-6" />
              Excluir Universidade
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta universidade? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 border-t pt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="w-full sm:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir definitivamente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
>>>>>>> origin/main
