import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Users,
  BarChart3,
  Share2,
  Bell,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Shield,
  Facebook,
  Instagram,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Calendar,
    title: "Sistema de Reservas Intuitivo",
    description: "Gerencie suas reservas de forma simples e eficiente. Confirmações automáticas e lembretes para seus clientes."
  },
  {
    icon: Users,
    title: "Gestão de Clientes",
    description: "Base de dados completa dos seus clientes, histórico de reservas e preferências para um atendimento personalizado."
  },
  {
    icon: BarChart3,
    title: "Análises e Relatórios",
    description: "Dashboards detalhados com métricas importantes do seu negócio, taxa de ocupação e tendências."
  },
  {
    icon: Share2,
    title: "Integrações com Redes Sociais",
    description: "Conecte-se com Facebook e Instagram para permitir reservas diretas das redes sociais."
  },
  {
    icon: Bell,
    title: "Notificações em Tempo Real",
    description: "Receba alertas instantâneos de novas reservas, cancelamentos e modificações."
  },
  {
    icon: Smartphone,
    title: "Acesso Mobile",
    description: "Gerencie seu restaurante de qualquer lugar através do nosso sistema responsivo."
  }
];

const benefits = [
  "Aumente a eficiência operacional",
  "Reduza no-shows com confirmações automáticas",
  "Melhore a experiência do cliente",
  "Economize tempo na gestão de reservas",
  "Tome decisões baseadas em dados",
  "Fidelize mais clientes"
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-primary to-slate-900 h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#0ea5e9)] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>
        
        {/* Animated Dots Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-[15%] w-24 h-24 bg-primary/30 rounded-full blur-3xl animate-float opacity-75"></div>
        <div className="absolute bottom-20 right-[15%] w-32 h-32 bg-blue-500/30 rounded-full blur-3xl animate-float-slow opacity-75"></div>
        <div className="absolute top-1/3 right-[25%] w-16 h-16 bg-indigo-500/30 rounded-full blur-2xl animate-float-slower opacity-75"></div>
        <div className="absolute bottom-1/3 left-[25%] w-20 h-20 bg-violet-500/30 rounded-full blur-2xl animate-float opacity-75"></div>

        {/* Neon Lines */}
        <div className="absolute top-[20%] left-0 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent rotate-[-45deg] blur-sm"></div>
        <div className="absolute bottom-[20%] right-0 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rotate-[45deg] blur-sm"></div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-[10%] w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_4px_rgba(79,70,229,0.3)] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-[10%] w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_4px_rgba(59,130,246,0.3)] animate-pulse"></div>
        <div className="absolute top-2/3 right-[30%] w-2 h-2 bg-violet-500 rounded-full shadow-[0_0_10px_4px_rgba(139,92,246,0.3)] animate-pulse"></div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 inline-block rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-medium text-white/90">
                Sistema de Reservas para Restaurantes
              </span>
            </div>

            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              Simplifique a Gestão de<br />Reservas do seu Restaurante
            </h1>

            <p className="text-xl mb-12 text-white/80 leading-relaxed max-w-2xl mx-auto">
              Automatize suas reservas, evite conflitos de horários e ofereça uma experiência excepcional aos seus clientes. Tudo em uma única plataforma.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold text-white">
                  +5.000
                </div>
                <div className="text-sm text-white/70 mt-2">
                  Reservas Gerenciadas
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold text-white">
                  -70%
                </div>
                <div className="text-sm text-white/70 mt-2">
                  Menos No-shows
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold text-white">
                  +30%
                </div>
                <div className="text-sm text-white/70 mt-2">
                  Aumento na Ocupação
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl px-12 h-14 text-lg font-medium rounded-full"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center gap-3">
                  Ver Planos
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e533_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
        
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              Recursos Pensados para seu Restaurante
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ferramentas poderosas que transformam a maneira como você gerencia suas reservas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10 border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-6 inline-block p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  Por que Escolher Nossa Plataforma?
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Uma solução completa que traz resultados reais para seu negócio
                </p>
                <div className="grid gap-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300"
                    >
                      <CheckCircle className="w-6 h-6 text-primary" strokeWidth={2} />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary rounded-[2.5rem] blur-[64px] opacity-25 -rotate-1"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 to-primary/30 rounded-[2.5rem] blur-[48px] opacity-20 rotate-1"></div>
                <div className="relative bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-2xl border border-gray-100/50 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/20 rounded-[2.5rem]"></div>
                  <img
                    src="/placeholder.svg"
                    alt="Dashboard Preview"
                    className="relative rounded-2xl shadow-lg w-full h-[400px] object-cover transform hover:-rotate-1 transition-transform duration-300"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e533_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
        
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent whitespace-nowrap">
              Planos Flexíveis para seu Negócio
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Escolha o plano que melhor se adapta às necessidades do seu restaurante
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Comission Plan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary rounded-[2rem] blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500"></div>
              <div className="relative bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-300">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Plano Comissão</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-primary">10%</span>
                    <span className="text-gray-600">por reserva</span>
                  </div>
                  <p className="text-gray-600">Ideal para restaurantes que estão começando</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" strokeWidth={2} />
                    <span className="text-gray-700">Sem mensalidade fixa</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" strokeWidth={2} />
                    <span className="text-gray-700">Pague apenas por reserva confirmada</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" strokeWidth={2} />
                    <span className="text-gray-700">Todas as funcionalidades incluídas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" strokeWidth={2} />
                    <span className="text-gray-700">Suporte prioritário</span>
                  </li>
                </ul>

                <Button 
                  size="lg"
                  className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded-full h-12"
                  asChild
                >
                  <Link to="/admin/register">
                    Começar Agora
                  </Link>
                </Button>
              </div>
            </div>

            {/* Subscription Plan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary rounded-[2rem] blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500"></div>
              <div className="relative bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-300">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Plano Mensal</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-primary">25€</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                  <p className="text-gray-600">Perfeito para restaurantes estabelecidos</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" strokeWidth={2} />
                    <span className="text-gray-700">Sem comissões por reserva</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" strokeWidth={2} />
                    <span className="text-gray-700">Reservas ilimitadas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" strokeWidth={2} />
                    <span className="text-gray-700">Todas as funcionalidades incluídas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" strokeWidth={2} />
                    <span className="text-gray-700">Suporte prioritário</span>
                  </li>
                </ul>

                <Button 
                  size="lg"
                  className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded-full h-12"
                  asChild
                >
                  <Link to="/admin/register">
                    Começar Agora
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-primary to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Pronto para Transformar seu Restaurante?
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Junte-se a milhares de restaurantes que já estão revolucionando sua gestão de reservas
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl px-12 h-14 text-lg font-medium rounded-full"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex items-center gap-3">
                Ver Planos
                <ArrowRight className="w-5 h-5" strokeWidth={2} />
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-white/60">© 2024 Sistema de Reservas. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 