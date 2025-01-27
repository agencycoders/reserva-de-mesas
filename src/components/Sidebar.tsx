import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  CalendarDays,
  Share2,
  LogOut,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/reservations", icon: CalendarDays, label: "Reservas" },
    { path: "/admin/customers", icon: Users, label: "Clientes" },
    { path: "/admin/integrations", icon: Share2, label: "Integrações" },
    { path: "/admin/settings", icon: Settings, label: "Configurações" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
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