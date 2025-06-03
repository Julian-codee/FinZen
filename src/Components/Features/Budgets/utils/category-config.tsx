import { UtensilsCrossed, ShoppingCart, Home, Car, Gamepad2, Heart, GraduationCap, Shirt } from "lucide-react"

export const categoryIcons = {
  comida: <UtensilsCrossed className="w-5 h-5" />,
  supermercado: <ShoppingCart className="w-5 h-5" />,
  vivienda: <Home className="w-5 h-5" />,
  transporte: <Car className="w-5 h-5" />,
  entretenimiento: <Gamepad2 className="w-5 h-5" />,
  salud: <Heart className="w-5 h-5" />,
  educacion: <GraduationCap className="w-5 h-5" />,
  ropa: <Shirt className="w-5 h-5" />,
}

export const categoryColors = {
  comida: "bg-[#F97316]",
  supermercado: "bg-[#10B981]",
  vivienda: "bg-[#3B82F6]",
  transporte: "bg-[#8B5CF6]",
  entretenimiento: "bg-[#EC4899]",
  salud: "bg-[#EF4444]",
  educacion: "bg-[#F59E0B]",
  ropa: "bg-[#6366F1]",
}
