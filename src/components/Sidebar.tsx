import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  CalendarDays,
  Share2,
  LogOut,
  Users,
  Palette,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    {
      label: "Principal",
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/admin/dashboard",
        },
        {
          label: "Reservas",
          icon: CalendarDays,
          href: "/admin/reservations",
        },
        {
          label: "Clientes",
          icon: Users,
          href: "/admin/customers",
        },
      ],
    },
    {
      label: "Configurações",
      items: [
        {
          label: "Aparência",
          icon: Palette,
          href: "/admin/appearance",
        },
        {
          label: "Integrações",
          icon: Share2,
          href: "/admin/integrations",
        },
        {
          label: "Configurações",
          icon: Settings,
          href: "/admin/settings",
        },
      ],
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col h-full">
        <div className="space-y-4">
          {navigation.map((section) => (
            <div key={section.label}>
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                {section.label}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <Link
            to="/admin/login"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;