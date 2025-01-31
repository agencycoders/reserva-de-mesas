import { Card } from "@/components/ui/card";
import { 
  CalendarDays, 
  Users, 
  Clock, 
  TrendingUp, 
  Home,
  Loader2,
  Download,
  Search,
  Filter
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
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { useToast } from "@/components/ui/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

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

  const filteredReservations = reservations?.filter(res => {
    const matchesSearch = res.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         res.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || res.status === statusFilter;
    const matchesDate = dateFilter === "all" || 
                       (dateFilter === "today" && format(new Date(res.date), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) ||
                       (dateFilter === "week" && new Date(res.date) <= new Date(new Date().setDate(new Date().getDate() + 7)));
    return matchesSearch && matchesStatus && matchesDate;
  });

  const todayReservations = reservations?.filter(
    (res) => format(new Date(res.date), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  ).length || 0;

  const totalCustomers = reservations?.length || 0;
  const cancelationRate = reservations ? 
    ((reservations.filter(r => r.status === 'cancelled').length / reservations.length) * 100).toFixed(1) : 
    0;
  const averagePartySize = reservations ? 
    (reservations.reduce((acc, curr) => acc + curr.party_size, 0) / reservations.length).toFixed(1) : 
    0;

  const exportToCSV = () => {
    if (!reservations) return;
    
    const headers = ["Nome", "Email", "Telefone", "Data", "Pessoas", "Status"];
    const csvData = reservations.map(r => [
      r.customer_name,
      r.customer_email,
      r.customer_phone,
      format(new Date(r.date), "dd/MM/yyyy HH:mm"),
      r.party_size,
      r.status
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(","))
      .join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `reservas_${format(new Date(), "dd-MM-yyyy")}.csv`;
    link.click();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4 animate-fade-in">
        <p className="text-lg text-muted-foreground">Erro ao carregar dados</p>
        <p className="text-sm text-muted-foreground">Tente novamente mais tarde</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Tentar novamente
        </Button>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, loading }: { 
    title: string; 
    value: string | number; 
    icon: any;
    loading?: boolean;
  }) => (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {loading ? (
            <Skeleton className="h-8 w-24 mt-2" />
          ) : (
            <h3 className="text-2xl font-semibold mt-2">{value}</h3>
          )}
        </div>
        <div className="p-3 rounded-full bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );

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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Painel</h1>
          <Button onClick={exportToCSV} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard
              title="Reservas Hoje"
              value={todayReservations}
              icon={CalendarDays}
            />
            <StatCard
              title="Total de Clientes"
              value={totalCustomers}
              icon={Users}
            />
            <StatCard
              title="Taxa de Cancelamento"
              value={`${cancelationRate}%`}
              icon={TrendingUp}
            />
            <StatCard
              title="Média de Pessoas"
              value={averagePartySize}
              icon={Users}
            />
          </>
        )}
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:max-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar reservas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Próximos 7 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Pessoas</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations?.map((reservation) => (
                    <TableRow key={reservation.id} className="transition-colors hover:bg-muted/50 animate-fade-in">
                      <TableCell>{reservation.customer_name}</TableCell>
                      <TableCell>
                        {format(new Date(reservation.date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(reservation.date), "HH:mm")}
                      </TableCell>
                      <TableCell>{reservation.party_size}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reservation.status === 'confirmed' ? 'Confirmado' :
                           reservation.status === 'cancelled' ? 'Cancelado' :
                           'Pendente'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;