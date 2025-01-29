import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect } from "fabric";
import { 
  Home, 
  Save, 
  Trash, 
  RotateCcw, 
  Square, 
  Circle as CircleIcon,
  Clock,
  User,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Reservation {
  id: string;
  customer_name: string;
  date: string;
  party_size: number;
  status: string;
}

const TableLayout = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    canvas.on("selection:created", (e) => {
      setSelectedElement(e.selected?.[0]);
    });

    canvas.on("selection:cleared", () => {
      setSelectedElement(null);
    });

    setFabricCanvas(canvas);

    // Carregar reservas do dia
    loadTodayReservations();

    return () => {
      canvas.dispose();
    };
  }, []);

  const loadTodayReservations = async () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .gte('date', startOfDay)
      .lte('date', endOfDay)
      .order('date', { ascending: true });

    if (error) {
      toast.error("Erro ao carregar reservas");
      return;
    }

    setReservations(data);
  };

  const addTable = async (shape: "circle" | "rectangle") => {
    if (!fabricCanvas) return;

    const commonProps = {
      left: 100,
      top: 100,
      fill: "#e2e8f0",
      strokeWidth: 2,
      stroke: "#94a3b8",
      hasControls: true,
      hasBorders: true,
    };

    let element;
    if (shape === "circle") {
      element = new Circle({
        ...commonProps,
        radius: 30,
      });
      fabricCanvas.add(element);
      toast.success("Mesa redonda adicionada");
    } else {
      element = new Rect({
        ...commonProps,
        width: 60,
        height: 60,
      });
      fabricCanvas.add(element);
      toast.success("Mesa quadrada adicionada");
    }

    element.set('customProps', {
      type: 'table',
      shape: shape,
      name: `Mesa ${Math.floor(Math.random() * 100)}`,
      capacity: 4
    });

    fabricCanvas.renderAll();
  };

  const deleteSelected = () => {
    if (!fabricCanvas || !selectedElement) return;
    fabricCanvas.remove(selectedElement);
    setSelectedElement(null);
    toast.success("Elemento removido");
  };

  const rotateSelected = () => {
    if (!fabricCanvas || !selectedElement) return;
    selectedElement.rotate((selectedElement.angle || 0) + 45);
    fabricCanvas.renderAll();
  };

  const saveLayout = async () => {
    if (!fabricCanvas) return;

    try {
      const { data: layout, error: layoutError } = await supabase
        .from('table_layouts')
        .insert([
          { name: `Layout ${new Date().toLocaleString()}` }
        ])
        .select()
        .single();

      if (layoutError) throw layoutError;

      const elements = fabricCanvas.getObjects();
      const elementPromises = elements.map(obj => {
        const customProps = obj.get('customProps');
        if (!customProps) return null;

        return supabase
          .from('layout_elements')
          .insert({
            layout_id: layout.id,
            element_type: customProps.type,
            shape: customProps.shape,
            position_x: Math.round(obj.left || 0),
            position_y: Math.round(obj.top || 0),
            width: Math.round(obj.width || 0),
            height: Math.round(obj.height || 0),
            rotation: Math.round(obj.angle || 0),
            name: customProps.name,
            capacity: customProps.capacity
          });
      });

      await Promise.all(elementPromises);
      toast.success("Layout salvo com sucesso!");
    } catch (error) {
      console.error('Erro ao salvar layout:', error);
      toast.error("Erro ao salvar layout");
    }
  };

  return (
    <div className="space-y-6">
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
              <BreadcrumbPage>Layout das Mesas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-semibold">Layout das Mesas</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
        {/* Painel de Reservas */}
        <Card>
          <CardHeader>
            <CardTitle>Reservas do Dia</CardTitle>
            <CardDescription>
              {format(new Date(), "dd 'de' MMMM 'de' yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{reservation.customer_name}</span>
                      </div>
                      <Badge variant={reservation.status === 'confirmed' ? 'default' : 'secondary'}>
                        {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {format(new Date(reservation.date), 'HH:mm')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {reservation.party_size} pessoas
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Layout Editor */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Elementos</CardTitle>
              <CardDescription>
                Adicione elementos para criar o layout do seu restaurante
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => addTable("circle")}
                >
                  <CircleIcon className="w-4 h-4" />
                  Mesa Redonda
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => addTable("rectangle")}
                >
                  <Square className="w-4 h-4" />
                  Mesa Quadrada
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
              <CardDescription>
                Ações disponíveis para o elemento selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={rotateSelected}
                  disabled={!selectedElement}
                >
                  <RotateCcw className="w-4 h-4" />
                  Rodar 45°
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                  onClick={deleteSelected}
                  disabled={!selectedElement}
                >
                  <Trash className="w-4 h-4" />
                  Remover
                </Button>
                <Separator />
                <Button
                  variant="default"
                  className="w-full justify-start gap-2"
                  onClick={saveLayout}
                >
                  <Save className="w-4 h-4" />
                  Salvar Layout
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Layout</CardTitle>
              <CardDescription>
                Clique e arraste os elementos para posicioná-los
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TableLayout;