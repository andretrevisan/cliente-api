<<<<<<< HEAD
import UniversidadesDashboard from "@/components/universidades-dashboard";

export default function Home() {
  return <UniversidadesDashboard />;
}
=======
import { UniversidadesTable } from '@/components/universidades-table';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 container mx-auto px-4 py-8">
        <UniversidadesTable />
      </div>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>Sistema de Universidades - Desenvolvido com Next.js e shadcn/ui</p>
      </footer>
    </main>
  );
}
>>>>>>> origin/main
