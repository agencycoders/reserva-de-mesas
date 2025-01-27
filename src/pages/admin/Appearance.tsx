import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Type } from "lucide-react";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface Typography {
  fontFamily: string;
  headingFont: string;
  baseSize: string;
}

const Appearance = () => {
  const [colors, setColors] = useState<ThemeColors>({
    primary: "#7c3aed",
    secondary: "#a78bfa",
    accent: "#4f46e5",
    background: "#ffffff",
    text: "#1f2937"
  });

  const [typography, setTypography] = useState<Typography>({
    fontFamily: "Poppins",
    headingFont: "Poppins",
    baseSize: "16px"
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Personalização</h1>
        <p className="text-gray-600">Personalize a aparência do seu sistema de reservas</p>
      </div>

      <Tabs defaultValue="colors">
        <TabsList className="mb-8">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Cores
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Tipografia
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label>Cor Primária</Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Input 
                      type="color" 
                      value={colors.primary}
                      onChange={(e) => setColors({...colors, primary: e.target.value})}
                      className="w-20 h-10"
                    />
                    <Input 
                      type="text" 
                      value={colors.primary}
                      onChange={(e) => setColors({...colors, primary: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label>Cor Secundária</Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Input 
                      type="color" 
                      value={colors.secondary}
                      onChange={(e) => setColors({...colors, secondary: e.target.value})}
                      className="w-20 h-10"
                    />
                    <Input 
                      type="text" 
                      value={colors.secondary}
                      onChange={(e) => setColors({...colors, secondary: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label>Cor de Destaque</Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Input 
                      type="color" 
                      value={colors.accent}
                      onChange={(e) => setColors({...colors, accent: e.target.value})}
                      className="w-20 h-10"
                    />
                    <Input 
                      type="text" 
                      value={colors.accent}
                      onChange={(e) => setColors({...colors, accent: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Cor de Fundo</Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Input 
                      type="color" 
                      value={colors.background}
                      onChange={(e) => setColors({...colors, background: e.target.value})}
                      className="w-20 h-10"
                    />
                    <Input 
                      type="text" 
                      value={colors.background}
                      onChange={(e) => setColors({...colors, background: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label>Cor do Texto</Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Input 
                      type="color" 
                      value={colors.text}
                      onChange={(e) => setColors({...colors, text: e.target.value})}
                      className="w-20 h-10"
                    />
                    <Input 
                      type="text" 
                      value={colors.text}
                      onChange={(e) => setColors({...colors, text: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button>Salvar Alterações</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="typography">
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label>Fonte Principal</Label>
                  <select 
                    className="w-full mt-2 p-2 border rounded-md"
                    value={typography.fontFamily}
                    onChange={(e) => setTypography({...typography, fontFamily: e.target.value})}
                  >
                    <option value="Poppins">Poppins</option>
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                  </select>
                </div>

                <div>
                  <Label>Fonte dos Títulos</Label>
                  <select 
                    className="w-full mt-2 p-2 border rounded-md"
                    value={typography.headingFont}
                    onChange={(e) => setTypography({...typography, headingFont: e.target.value})}
                  >
                    <option value="Poppins">Poppins</option>
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                  </select>
                </div>

                <div>
                  <Label>Tamanho Base</Label>
                  <select 
                    className="w-full mt-2 p-2 border rounded-md"
                    value={typography.baseSize}
                    onChange={(e) => setTypography({...typography, baseSize: e.target.value})}
                  >
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl mb-4" style={{fontFamily: typography.headingFont}}>
                  Preview da Tipografia
                </h3>
                <p className="mb-4" style={{fontFamily: typography.fontFamily, fontSize: typography.baseSize}}>
                  Este é um exemplo de como o texto vai aparecer no seu site. 
                  O tamanho e a fonte podem ser ajustados conforme sua preferência.
                </p>
                <h4 className="text-xl mb-2" style={{fontFamily: typography.headingFont}}>
                  Subtítulo de Exemplo
                </h4>
                <p style={{fontFamily: typography.fontFamily, fontSize: typography.baseSize}}>
                  Mais um parágrafo para demonstrar a tipografia escolhida em diferentes contextos.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button>Salvar Alterações</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appearance; 