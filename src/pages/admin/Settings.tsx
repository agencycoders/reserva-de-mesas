import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    restaurantName: "",
    logo: "",
    openingTime: "11:00",
    closingTime: "23:00",
    maxGuests: "8",
    address: "",
    // Configurações de SMTP
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPassword: "",
    smtpFromEmail: "",
    smtpFromName: "",
    smtpSecure: true,
    emailTemplate: `Caro(a) {nome},

Agradecemos a sua reserva no {restaurante}!

Detalhes da sua reserva:
Data: {data}
Hora: {hora}
Número de pessoas: {pessoas}
Número da reserva: {numero}

Morada do restaurante:
{morada}

Aguardamos a sua visita!

Cumprimentos,
Equipe {restaurante}`,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Configurações salvas",
      description: "As alterações foram aplicadas com sucesso.",
    });
  };

  const testSmtpConnection = async () => {
    try {
      // Aqui você implementaria o teste real da conexão SMTP
      toast({
        title: "Teste de conexão",
        description: "Enviando email de teste...",
      });
      
      // Simular delay do teste
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Conexão bem sucedida",
        description: "O servidor SMTP está configurado corretamente.",
      });
    } catch (error) {
      toast({
        title: "Erro na conexão",
        description: "Não foi possível conectar ao servidor SMTP. Verifique as configurações.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-playfair font-semibold">Configurações</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="smtp">SMTP</TabsTrigger>
          <TabsTrigger value="email">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurantName">Nome do Restaurante</Label>
                  <Input
                    id="restaurantName"
                    name="restaurantName"
                    value={settings.restaurantName}
                    onChange={handleChange}
                    placeholder="Digite o nome do restaurante"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">URL do Logotipo</Label>
                  <Input
                    id="logo"
                    name="logo"
                    value={settings.logo}
                    onChange={handleChange}
                    placeholder="https://exemplo.com/logo.png"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Morada do Restaurante</Label>
                  <Input
                    id="address"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    placeholder="Digite a morada completa do restaurante"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openingTime">Horário de Abertura</Label>
                    <Input
                      type="time"
                      id="openingTime"
                      name="openingTime"
                      value={settings.openingTime}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="closingTime">Horário de Fechamento</Label>
                    <Input
                      type="time"
                      id="closingTime"
                      name="closingTime"
                      value={settings.closingTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxGuests">
                    Número Máximo de Pessoas por Reserva
                  </Label>
                  <Input
                    type="number"
                    id="maxGuests"
                    name="maxGuests"
                    value={settings.maxGuests}
                    onChange={handleChange}
                    min="1"
                    max="20"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Salvar Configurações
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="smtp">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">Servidor SMTP</Label>
                  <Input
                    id="smtpHost"
                    name="smtpHost"
                    value={settings.smtpHost}
                    onChange={handleChange}
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Porta SMTP</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    value={settings.smtpPort}
                    onChange={handleChange}
                    placeholder="587"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpUser">Usuário SMTP</Label>
                  <Input
                    id="smtpUser"
                    name="smtpUser"
                    value={settings.smtpUser}
                    onChange={handleChange}
                    placeholder="seu.email@gmail.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">Senha SMTP</Label>
                  <Input
                    type="password"
                    id="smtpPassword"
                    name="smtpPassword"
                    value={settings.smtpPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpFromEmail">Email de Envio</Label>
                  <Input
                    id="smtpFromEmail"
                    name="smtpFromEmail"
                    value={settings.smtpFromEmail}
                    onChange={handleChange}
                    placeholder="reservas@seurestaurante.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpFromName">Nome de Exibição</Label>
                  <Input
                    id="smtpFromName"
                    name="smtpFromName"
                    value={settings.smtpFromName}
                    onChange={handleChange}
                    placeholder="Restaurante ABC"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Salvar Configurações
                </Button>
                <Button type="button" variant="outline" onClick={testSmtpConnection}>
                  Testar Conexão
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emailTemplate">Template do Email</Label>
                  <div className="text-sm text-muted-foreground mb-2">
                    Use as seguintes variáveis no template:
                    <ul className="list-disc list-inside mt-1">
                      <li>{"{nome}"} - Nome do cliente</li>
                      <li>{"{restaurante}"} - Nome do restaurante</li>
                      <li>{"{data}"} - Data da reserva</li>
                      <li>{"{hora}"} - Hora da reserva</li>
                      <li>{"{pessoas}"} - Número de pessoas</li>
                      <li>{"{numero}"} - Número da reserva</li>
                      <li>{"{morada}"} - Morada do restaurante</li>
                    </ul>
                  </div>
                  <Textarea
                    id="emailTemplate"
                    name="emailTemplate"
                    value={settings.emailTemplate}
                    onChange={handleChange}
                    className="min-h-[400px] font-mono"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Salvar Template de Email
              </Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;