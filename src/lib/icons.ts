import { 
  Plane, 
  Ship, 
  Anchor, 
  Truck, 
  Shield, 
  FileCheck, 
  Globe, 
  Warehouse, 
  Package, 
  Boxes, 
  Clock, 
  MapPin, 
  Target, 
  Users, 
  Award,
  HelpCircle
} from 'lucide-react';

export const iconMap: { [key: string]: any } = {
  Truck: Truck,
  Plane: Plane,
  Ship: Ship,
  Anchor: Anchor,
  Shield: Shield,
  FileCheck: FileCheck,
  Globe: Globe,
  Warehouse: Warehouse,
  Package: Package,
  Boxes: Boxes,
  Clock: Clock,
  MapPin: MapPin,
  Target: Target,
  Users: Users,
  Award: Award,
};

export const getIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName];
  return IconComponent || HelpCircle;
};
