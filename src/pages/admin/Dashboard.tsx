import { Card } from "@/components/ui/card";
import { CalendarDays, Users, Clock, TrendingUp } from "lucide-react";
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

const Dashboard = () => {
  const { data: reservations, isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      return data;
    },
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
    : "N/A";

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reservas Hoje</p>
              <h3 className="text-2xl font-semibold mt-2">{todayReservations}</h3>
            </div>
            <CalendarDays className="w-8 h-8 text-primary" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Clientes</p>
              <h3 className="text-2xl font-semibold mt-2">{totalCustomers}</h3>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Horário Mais Popular</p>
              <h3 className="text-2xl font-semibold mt-2">{mostPopularHour}</h3>
            </div>
            <Clock className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Taxa de Ocupação</p>
              <h3 className="text-2xl font-semibold mt-2">
                {isLoading ? "..." : `${Math.round((todayReservations / 20) * 100)}%`}
              </h3>
            </div>
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Reservas por Dia da Semana</h3>
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
                <Bar dataKey="total" fill="var(--primary)" />
                <Tooltip />
              </BarChart>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Próximas Reservas</h3>
          <div className="overflow-auto">
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
                  <TableRow key={reservation.id}>
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;