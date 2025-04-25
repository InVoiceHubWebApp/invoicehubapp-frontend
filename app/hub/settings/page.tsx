import { Card } from "@/app/_components";

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="h-10 flex items-center">
        <h2 className="text-2xl">Configurações</h2>
      </div>
      <Card>
        <h2 className="text-sm text-primary pb-4">INFORMAÇÕES GERAIS</h2>
        </Card>
        <Card>
        <h2 className="text-sm text-primary pb-4">INFORMAÇÕES FINANCEIRAS</h2>
        </Card>
        <Card>
        <h2 className="text-sm text-primary pb-4">CONFIGURAÇÕES DE ENTRADA</h2>
        </Card>
    </div>
  );
}
