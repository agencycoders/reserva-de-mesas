import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect } from "fabric";
import { Home } from "lucide-react";
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

const TableLayout = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  const addTable = (shape: "circle" | "rectangle") => {
    if (!fabricCanvas) return;

    if (shape === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: "#e2e8f0",
        radius: 30,
        strokeWidth: 2,
        stroke: "#94a3b8",
      });
      fabricCanvas.add(circle);
      fabricCanvas.renderAll();
      toast.success("Mesa redonda adicionada");
    } else {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: "#e2e8f0",
        width: 60,
        height: 60,
        strokeWidth: 2,
        stroke: "#94a3b8",
      });
      fabricCanvas.add(rect);
      fabricCanvas.renderAll();
      toast.success("Mesa quadrada adicionada");
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

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Elementos</CardTitle>
            <CardDescription>
              Arraste os elementos para criar o layout do seu restaurante
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addTable("circle")}
              >
                Mesa Redonda
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addTable("rectangle")}
              >
                Mesa Quadrada
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
  );
};

export default TableLayout;