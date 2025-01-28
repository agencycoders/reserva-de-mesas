import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
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
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const CustomerDetails = () => {
  const { email } = useParams();

  const { data: customer, isLoading: isLoadingCustomer } = useQuery({
    queryKey: ["customer", email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select("customer_name, customer_email, customer_phone")
        .eq("customer_email", email)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: reservations, isLoading: isLoadingReservations } = useQuery({
    queryKey: ["customer-reservations", email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("customer_email", email)
        .order("date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoadingCustomer || isLoadingReservations) {
    return <div>A carregar...</div>;
  }

  const totalReservations = reservations?.length || 0;
  const attended = reservations?.filter(r => r.attendance_status === "attended").length || 0;
  const noShow = reservations?.filter(r => r.attendance_status === "no_show").length || 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Detalhes do Cliente</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-medium text-sm text-muted-foreground">Nome</h3>
          <p className="mt-2 text-2xl font-semibold">{customer?.customer_name}</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
          <p className="mt-2 text-2xl font-semibold">{customer?.customer_email}</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium text-sm text-muted-foreground">Telefone</h3>
          <p className="mt-2 text-2xl font-semibold">{customer?.customer_phone}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-medium text-sm text-muted-foreground">Total de Reservas</h3>
          <p className="mt-2 text-2xl font-semibold">{totalReservations}</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium text-sm text-muted-foreground">Compareceu</h3>
          <p className="mt-2 text-2xl font-semibold">{attended}</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium text-sm text-muted-foreground">Não Compareceu</h3>
          <p className="mt-2 text-2xl font-semibold">{noShow}</p>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Pessoas</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Compareceu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations?.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>
                  {format(new Date(reservation.date), "dd/MM/yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell>
                  {format(new Date(reservation.date), "HH:mm", { locale: ptBR })}
                </TableCell>
                <TableCell>{reservation.party_size}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>
                  {reservation.attendance_status === "attended" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : reservation.attendance_status === "no_show" ? (
                    <X className="h-4 w-4 text-red-500" />
                  ) : (
                    "Pendente"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerDetails;