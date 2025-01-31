import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";
import { Users, CalendarCheck, Ban, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ReservationsChart } from "@/components/dashboard/ReservationsChart";
import { ReservationsTable } from "@/components/dashboard/ReservationsTable";

const Dashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReservations: 0,
    confirmedReservations: 0,
    cancelledReservations: 0,
    averagePartySize: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [reservations, setReservations] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch reservations
      const { data: reservationsData, error: reservationsError } = await supabase
        .from("reservations")
        .select("*")
        .order("date", { ascending: false });

      if (reservationsError) throw reservationsError;

      // Calculate stats
      const confirmed = reservationsData.filter(
        (r) => r.status === "confirmed"
      ).length;
      const cancelled = reservationsData.filter(
        (r) => r.status === "cancelled"
      ).length;
      const avgPartySize =
        reservationsData.reduce((acc, curr) => acc + curr.party_size, 0) /
        reservationsData.length;

      setStats({
        totalReservations: reservationsData.length,
        confirmedReservations: confirmed,
        cancelledReservations: cancelled,
        averagePartySize: Math.round(avgPartySize * 10) / 10,
      });

      // Prepare chart data
      const last7Days = [...Array(7)].map((_, i) => {
        const date = subDays(new Date(), i);
        const formattedDate = format(date, "dd/MM");
        const total = reservationsData.filter(
          (r) => format(new Date(r.date), "dd/MM") === formattedDate
        ).length;
        return { date: formattedDate, total };
      }).reverse();

      setChartData(last7Days);
      setReservations(reservationsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar dados",
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleExportCSV = () => {
    const headers = ["Cliente", "Email", "Data", "Pessoas", "Status"];
    const csvData = reservations.map((r) => [
      r.customer_name,
      r.customer_email,
      format(new Date(r.date), "dd/MM/yyyy HH:mm"),
      r.party_size,
      r.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...csvData].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reservas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 p-8 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Reservas"
          value={stats.totalReservations}
          icon={Users}
        />
        <StatCard
          title="Reservas Confirmadas"
          value={stats.confirmedReservations}
          icon={CalendarCheck}
        />
        <StatCard
          title="Reservas Canceladas"
          value={stats.cancelledReservations}
          icon={Ban}
        />
        <StatCard
          title="Média de Pessoas"
          value={stats.averagePartySize}
          icon={TrendingUp}
        />
      </div>

      <ReservationsChart data={chartData} isLoading={isLoading} />

      <ReservationsTable
        reservations={reservations}
        isLoading={isLoading}
        onExportCSV={handleExportCSV}
      />
    </div>
  );
};

export default Dashboard;