import {
  ChartNoAxesCombined,
  CircleDollarSign,
  ClipboardList,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type MenuItem = {
  path: string;
  icon: LucideIcon;
  title: string;
  children?: MenuItem;
};

export const menuItems: Record<string, MenuItem> = {
  dashboard: {
    path: "/hub",
    title: "Visão geral",
    icon: ChartNoAxesCombined,
  },
  invoices: {
    path: "/hub/invoices",
    title: "Compras",
    icon: CircleDollarSign,
  },
  management: {
    path: "/hub/management",
    title: "Gerenciamento",
    icon: ClipboardList,
  },
  settings: {
    path: "/hub/settings",
    title: "Configurações",
    icon: Settings,
  },
};
