import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, Facebook, Instagram, Globe, Info, ExternalLink } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

// Função para converter texto em slug
const generateSlug = (text: string): string => {
  return text
    .toLowerCase() // Converter para minúsculas
    .normalize('NFD') // Normalizar caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiais
    .replace(/\s+/g, '-') // Substituir espaços por hífens
    .replace(/--+/g, '-') // Remover hífens duplicados
    .trim(); // Remover espaços no início e fim
};

const Integrations = () => {
  const { toast } = useToast();
  // Exemplo de nome de restaurante convertido para slug
  const restaurantName = "Restaurante Sabor & Arte";
  const restaurantId = generateSlug(restaurantName); // Resultado: "restaurante-sabor-arte"
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // Usar o domínio atual da aplicação
  const currentDomain = window.location.origin;
  const bookingFormUrl = `${currentDomain}/booking/${restaurantId}`;

  const embedCode = `<script src="${currentDomain}/embed.js"></script>
<div id="restaurant-booking-form" data-restaurant-id="${restaurantId}"></div>`;

  const wordpressShortcode = `[restaurant-booking id="${restaurantId}"]`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Código copiado!",
      description: "O código foi copiado para a área de transferência.",
    });
  };

  const [integrations, setIntegrations] = useState([
    {
      name: "Facebook",
      status: "Conectado",
      icon: Facebook,
      lastSync: "Há 2 horas",
    },
    {
      name: "Instagram",
      status: "Desconectado",
      icon: Instagram,
      lastSync: "-",
    }
  ]);

  const handleConnection = async (platform: string) => {
    setIsLoading(platform);
    const integration = integrations.find(i => i.name === platform);
    const isConnecting = integration?.status !== "Conectado";

    try {
      if (isConnecting) {
        // Simular chamada à API de autenticação da rede social
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Atualizar o estado da integração
        setIntegrations(prev => prev.map(i => 
          i.name === platform 
            ? { ...i, status: "Conectado", lastSync: "Agora" }
            : i
        ));

        toast({
          title: "Plataforma conectada!",
          description: `${platform} foi conectado com sucesso.`,
        });
      } else {
        // Simular desconexão
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Atualizar o estado da integração
        setIntegrations(prev => prev.map(i => 
          i.name === platform 
            ? { ...i, status: "Desconectado", lastSync: "-" }
            : i
        ));

        toast({
          title: "Plataforma desconectada",
          description: `${platform} foi desconectado com sucesso.`,
        });
      }
    } catch (error) {
      toast({
        title: "Erro na conexão",
        description: `Não foi possível ${isConnecting ? 'conectar' : 'desconectar'} o ${platform}. Tente novamente.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Integrações</h1>
      </div>

      <Alert className="mb-8">
        <Info className="h-4 w-4" />
        <AlertTitle>Seu ID de Restaurante</AlertTitle>
        <AlertDescription className="flex items-center gap-2 mt-2">
          <code className="bg-muted px-3 py-1 rounded-md font-mono">{restaurantId}</code>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(restaurantId)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Plataformas Conectadas</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Plataforma</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Sincronização</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrations.map((integration) => (
                    <TableRow key={integration.name}>
                      <TableCell className="flex items-center gap-2">
                        <integration.icon className="w-5 h-5" />
                        {integration.name}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            integration.status === "Conectado"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {integration.status}
                        </span>
                      </TableCell>
                      <TableCell>{integration.lastSync}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant={
                            integration.status === "Conectado"
                              ? "destructive"
                              : "default"
                          }
                          size="sm"
                          onClick={() => handleConnection(integration.name)}
                          disabled={isLoading === integration.name}
                        >
                          {isLoading === integration.name ? (
                            <span className="flex items-center gap-2">
                              <span className="animate-spin">⏳</span>
                              {integration.status === "Conectado" ? "Desconectando..." : "Conectando..."}
                            </span>
                          ) : (
                            integration.status === "Conectado" ? "Desconectar" : "Conectar"
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  URL do Formulário de Reserva
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use este link para direcionar seus clientes diretamente para o formulário de reserva.
                </p>
                <div className="flex items-center gap-2 bg-muted p-4 rounded-lg">
                  <a 
                    href={bookingFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex-1 truncate hover:underline text-primary"
                  >
                    {bookingFormUrl}
                  </a>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => copyToClipboard(bookingFormUrl)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      asChild
                    >
                      <a
                        href={bookingFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Código HTML para Websites
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Copie e cole este código HTML no local onde deseja que o
                  formulário apareça.
                </p>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap break-all">
                    {embedCode}
                  </pre>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(embedCode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Shortcode para WordPress
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use este shortcode em qualquer página ou post do WordPress.
                </p>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm font-mono">
                    {wordpressShortcode}
                  </pre>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(wordpressShortcode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Personalização (opcional)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Adicione CSS personalizado para ajustar o estilo do formulário no
                  seu site.
                </p>
                <Textarea
                  placeholder="Adicione CSS personalizado aqui para ajustar o estilo do formulário"
                  className="font-mono min-h-[150px] resize-y"
                />
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "CSS salvo!",
                      description:
                        "As personalizações foram aplicadas com sucesso.",
                    });
                  }}
                >
                  Salvar CSS Personalizado
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Integrations;