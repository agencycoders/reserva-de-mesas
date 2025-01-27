import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, History } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Reservations = () => {
  const reservations = [
    {
      id: 1,
      name: "João Silva",
      date: "2024-03-20",
      time: "20:00",
      guests: 4,
      status: "pending",
      totalReservations: 5
    },
    {
      id: 2,
      name: "Maria Santos",
      date: "2024-03-20",
      time: "19:30",
      guests: 2,
      status: "confirmed",
      totalReservations: 3
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-playfair font-semibold">Reservas</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Pessoas</TableHead>
            <TableHead>Total de Reservas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.name}</TableCell>
              <TableCell>{reservation.date}</TableCell>
              <TableCell>{reservation.time}</TableCell>
              <TableCell>{reservation.guests}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-muted-foreground" />
                  {reservation.totalReservations}
                </div>
              </TableCell>
              <TableCell>
                {reservation.status === "confirmed" ? (
                  <span className="text-green-600 font-medium">Confirmada</span>
                ) : (
                  <span className="text-yellow-600 font-medium">Pendente</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {reservation.status === "pending" && (
                    <>
                      <Button size="sm" variant="default" className="w-8 h-8 p-0">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="w-8 h-8 p-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Reservations;