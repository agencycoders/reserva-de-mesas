import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, ThumbsUp, MessageSquare, BarChart3 } from "lucide-react";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  visitDate: Date;
  reviewDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  response?: string;
}

const Reviews = () => {
  const [filter, setFilter] = useState({
    rating: "all",
    status: "all",
    date: "all"
  });

  // Mock data - substituir por dados reais da API
  const reviews: Review[] = [
    {
      id: "1",
      customerName: "João Silva",
      rating: 5,
      comment: "Excelente experiência! A comida estava deliciosa e o serviço impecável.",
      visitDate: new Date("2024-03-03"),
      reviewDate: new Date("2024-03-04"),
      status: "pending"
    },
    {
      id: "2",
      customerName: "Maria Santos",
      rating: 4,
      comment: "Muito bom, apenas o tempo de espera foi um pouco longo.",
      visitDate: new Date("2024-03-02"),
      reviewDate: new Date("2024-03-03"),
      status: "approved"
    }
  ];

  const stats = {
    average: 4.5,
    total: reviews.length,
    responseRate: "92%"
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Avaliações</h1>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Média Geral</p>
            <p className="text-2xl font-bold">{stats.average}★</p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total de Avaliações</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <ThumbsUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Taxa de Resposta</p>
            <p className="text-2xl font-bold">{stats.responseRate}</p>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Classificação</Label>
            <Select
              value={filter.rating}
              onValueChange={(value) => setFilter({ ...filter, rating: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas as classificações" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="5">5 estrelas</SelectItem>
                <SelectItem value="4">4 estrelas</SelectItem>
                <SelectItem value="3">3 estrelas</SelectItem>
                <SelectItem value="2">2 estrelas</SelectItem>
                <SelectItem value="1">1 estrela</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Status</Label>
            <Select
              value={filter.status}
              onValueChange={(value) => setFilter({ ...filter, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="approved">Aprovados</SelectItem>
                <SelectItem value="rejected">Rejeitados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Período</Label>
            <Select
              value={filter.date}
              onValueChange={(value) => setFilter({ ...filter, date: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os períodos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Lista de Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{review.customerName}</span>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Visita em: {review.visitDate.toLocaleDateString()}
                </p>
                <p className="mt-2">{review.comment}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Responder
                </Button>
                {review.status === "pending" && (
                  <>
                    <Button variant="default" size="sm">
                      Aprovar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Rejeitar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reviews; 