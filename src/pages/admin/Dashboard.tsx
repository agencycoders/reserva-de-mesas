import { Card } from "@/components/ui/card";
import { 
  CalendarDays, 
  Users, 
  Clock, 
  TrendingUp, 
  Home,
  Loader2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Não autorizado",
          description: "Faça login para acessar o painel",
          variant: "destructive",
        });
        navigate("/admin/login");
      }
    };
    checkAuth();
  }, [navigate, toast]);

  const { data: reservations, isLoading, error } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching reservations:", error);
        throw error;
      }
      return data;
    },
    retry: 1,
    meta: {
      onError: () => {
        toast({
          title: "Erro ao carregar reservas",
          description: "Houve um problema ao carregar as reservas. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    }
  });

  // Calcular estatísticas com verificações de null/undefined
  const todayReservations = reservations?.filter(
    (res) => format(new Date(res.date), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  ).length || 0;

  const totalCustomers = reservations?.length || 0;

  const popularHour = reservations?.reduce((acc: { [key: string]: number }, curr) => {
    const hour = format(new Date(curr.date), "HH:mm");
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {}) || {};

  const mostPopularHour = Object.entries(popularHour).length > 0
    ? Object.entries(popularHour).reduce((a, b) => (b[1] > a[1] ? b : a))[0]
    : "N/D";

  // Dados para o gráfico com valor inicial
  const weeklyData = reservations?.reduce((acc: any[], curr) => {
    const weekDay = format(new Date(curr.date), "EEEE", { locale: ptBR });
    const existingDay = acc.find((item) => item.name === weekDay);
    
    if (existingDay) {
      existingDay.total += 1;
    } else {
      acc.push({ name: weekDay, total: 1 });
    }
    
    return acc;
  }, []) || [];

  const StatCard = ({ title, value, icon: Icon, loading }: { 
    title: string; 
    value: string | number; 
    icon: any;
    loading?: boolean;
  }) => (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {loading ? (
            <Skeleton className="h-8 w-24 mt-2" />
          ) : (
            <h3 className="text-2xl font-semibold mt-2 animate-fade-in">{value}</h3>
          )}
        </div>
        <div className="p-3 rounded-full bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <p className="text-lg text-muted-foreground">Erro ao carregar dados</p>
        <p className="text-sm text-muted-foreground">Tente novamente mais tarde</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Administração
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Painel</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-semibold">Painel</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Reservas Hoje"
          value={todayReservations}
          icon={CalendarDays}
          loading={isLoading}
        />
        
        <StatCard
          title="Total de Clientes"
          value={totalCustomers}
          icon={Users}
          loading={isLoading}
        />
        
        <StatCard
          title="Horário Mais Popular"
          value={mostPopularHour}
          icon={Clock}
          loading={isLoading}
        />

        <StatCard
          title="Taxa de Ocupação"
          value={isLoading ? "..." : `${Math.round((todayReservations / 20) * 100)}%`}
          icon={TrendingUp}
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Reservas por Dia da Semana</h3>
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="h-[300px]">
              <ChartContainer
                className="h-full"
                config={{
                  total: {
                    theme: {
                      light: "var(--primary)",
                      dark: "var(--primary)",
                    },
                  },
                }}
              >
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="total" fill="var(--primary)" className="transition-all duration-300 hover:opacity-80" />
                  <Tooltip />
                </BarChart>
              </ChartContainer>
            </div>
          )}
        </Card>

        <Card className="p-6 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Próximas Reservas</h3>
          <div className="overflow-auto">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Pessoas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations?.slice(0, 5).map((reservation) => (
                    <TableRow key={reservation.id} className="transition-colors hover:bg-muted/50">
                      <TableCell>{reservation.customer_name}</TableCell>
                      <TableCell>
                        {format(new Date(reservation.date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(reservation.date), "HH:mm")}
                      </TableCell>
                      <TableCell>{reservation.party_size}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;