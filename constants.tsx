
import React from 'react';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  ClipboardList, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  User as UserIcon,
  ShieldCheck,
  History,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Check,
  Smartphone
} from 'lucide-react';
import { ProductUnit, ProductStatus, UserRole } from './types';

export const ICONS = {
  Home: <Home size={20} />,
  Package: <Package size={20} />,
  Cart: <ShoppingCart size={20} />,
  Requests: <ClipboardList size={20} />,
  Settings: <Settings size={20} />,
  Logout: <LogOut size={20} />,
  Plus: <Plus size={20} />,
  Search: <Search size={18} />,
  Filter: <Filter size={18} />,
  ArrowRight: <ArrowRight size={18} />,
  ChevronRight: <ChevronRight size={18} />,
  User: <UserIcon size={20} />,
  Admin: <ShieldCheck size={20} />,
  History: <History size={20} />,
  Trash: <Trash2 size={18} />,
  Edit: <Edit size={18} />,
  Success: <CheckCircle2 size={24} className="text-green-500" />,
  Error: <XCircle size={24} className="text-red-500" />,
  Warning: <AlertTriangle size={24} className="text-amber-500" />,
  Loading: <Loader2 size={20} className="animate-spin" />,
  Check: <Check size={18} />,
  Smartphone: <Smartphone size={18} />
};

export const WHATSAPP_NUMBER = "553221040257";

export const INITIAL_CATEGORIES = [
  "Cofee-Break",
  "Descartáveis",
  "Higiene",
  "Instrumental",
  "Medicação",
  "Limpeza",
  "Escritório"
];

export const UNITS = Object.values(ProductUnit);
