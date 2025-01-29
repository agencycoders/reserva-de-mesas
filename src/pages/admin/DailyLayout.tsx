import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, Users } from "lucide-react";
import { toast } from "sonner";

type Reservation = Tables<"reservations">;
type TableLayout = Tables<"table_layouts">;
type LayoutElement = Tables<"layout_elements">;

const DailyLayout = () => {
  const [selectedLayout, setSelectedLayout] = useState<TableLayout | null>(null);
  const today = new Date();
  const formattedDate = format(today, "dd 'de' MMMM", { locale: ptBR });

  // Fetch today's reservations
  const { data: reservations, isLoading: isLoadingReservations } = useQuery({
    queryKey: ["daily-reservations"],
    queryFn: async () => {
      const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
      
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .gte("date", startOfDay)
        .lte("date", endOfDay)
        .order("date", { ascending: true });

      if (error) throw error;
      return data as Reservation[];
    },
  });

  // Fetch active table layout
  const { data: layouts, isLoading: isLoadingLayouts } = useQuery({
    queryKey: ["table-layouts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("table_layouts")
        .select("*")
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data as TableLayout;
    },
  });

  // Fetch layout elements when a layout is selected
  const { data: layoutElements, isLoading: isLoadingElements } = useQuery({
    queryKey: ["layout-elements", selectedLayout?.id],
    enabled: !!selectedLayout?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("layout_elements")
        .select("*")
        .eq("layout_id", selectedLayout?.id);

      if (error) throw error;
      return data as LayoutElement[];
    },
  });

  useEffect(() => {
    if (layouts) {
      setSelectedLayout(layouts);
    }
  }, [layouts]);

  const assignTableToReservation = async (reservationId: string, tableId: string) => {
    try {
      const { error } = await supabase
        .from("reservations")
        .update({ table_id: tableId })
        .eq("id", reservationId);

      if (error) throw error;
      toast.success("Mesa atribuída com sucesso!");
    } catch (error) {
      toast.error("Erro ao atribuir mesa");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Reservas do Dia</h1>
        <p className="text-muted-foreground">{formattedDate}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
        {/* Reservations List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="w-5 h-5" />
              Reservas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoadingReservations ? (
                <p>Carregando reservas...</p>
              ) : reservations?.length === 0 ? (
                <p>Nenhuma reserva para hoje</p>
              ) : (
                reservations?.map((reservation) => (
                  <Card key={reservation.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{reservation.customer_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(reservation.date), "HH:mm")}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {reservation.party_size} pessoas
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Implement table assignment logic
                            toast.info("Em desenvolvimento");
                          }}
                        >
                          Atribuir Mesa
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Layout View */}
        <Card>
          <CardHeader>
            <CardTitle>Layout do Restaurante</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingLayouts || isLoadingElements ? (
              <p>Carregando layout...</p>
            ) : !selectedLayout ? (
              <p>Nenhum layout ativo encontrado</p>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg border relative">
                {/* Layout visualization will be implemented here */}
                <p className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Visualização do layout em desenvolvimento
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyLayout;