import Image from "next/image";
import { Star } from "lucide-react";
import { CardHeader } from "@/components/atoms/game/CardHeader";
import { CardTitle } from "@/components/atoms/game/CardTitle";
import { CardDescription } from "@/components/atoms/game/CardDescription";
import { CardContent } from "@/components/atoms/game/CardContent";
import { CardFooter } from "@/components/atoms/game/CardFooter";
import { Card } from "@/components/atoms/game/Card";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  level: string;
  ageRange: string;
  image: string;
}

export const GameCard = ({ id, title, description, icon, bgColor, level, ageRange, image }: GameCardProps) => {
  return (
    <Card href={`/game/${id}`} className="w-max mx-auto h-full overflow-hidden border-2 hover:border-primary relative">
      {/* 🔹 Icono de Favorito */}
      <div className="absolute top-2 right-2 z-10">
        <div className="bg-white rounded-full p-1 shadow-md">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        </div>
      </div>

      {/* 🔹 Encabezado de la tarjeta */}
      <CardHeader className={`${bgColor} relative`}>
        <div className="absolute inset-0 opacity-10">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <div className="flex justify-center relative z-10">
          <div className="p-2 rounded-full bg-white shadow-md">{icon}</div>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {/* 🔹 Contenido de la tarjeta */}
      <CardContent className="px-6 py-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Nivel:</span>
            <span className="font-semibold">{level}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Edad recomendada:</span>
            <span className="font-semibold">{ageRange}</span>
          </div>
        </div>
      </CardContent>

      {/* 🔹 Botón para jugar */}
      <CardFooter className="pb-6">
        <span className="text-primary font-semibold cursor-pointer hover:underline">Jugar ahora →</span>
      </CardFooter>
    </Card>
  );
};
