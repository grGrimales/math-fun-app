import { notFound } from "next/navigation";
import { PlusIcon, MinusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";

const games = {
  addition: {
    title: "Juego de Sumas",
    description: "Practica sumas con números del 1 al 20.",
    icon: <PlusIcon className="h-10 w-10 text-pink-500" />,
    bgColor: "bg-pink-100",
    level: "Principiante a Intermedio",
    ageRange: "6-9 años",
    image: "/placeholder.svg?height=400&width=600",
  },
  subtraction: {
    title: "Juego de Restas",
    description: "Practica restas con números del 1 al 20.",
    icon: <MinusIcon className="h-10 w-10 text-purple-500" />,
    bgColor: "bg-purple-100",
    level: "Principiante a Intermedio",
    ageRange: "6-9 años",
    image: "/placeholder.svg?height=400&width=600",
  },
  multiplication: {
    title: "Juego de Multiplicación",
    description: "Practica las tablas de multiplicar del 1 al 10.",
    icon: <XIcon className="h-10 w-10 text-fuchsia-500" />,
    bgColor: "bg-fuchsia-100",
    level: "Intermedio a Avanzado",
    ageRange: "8-11 años",
    image: "/placeholder.svg?height=400&width=600",
  },
};

export default function GameDetailPage({ params }: { params: { id: string } }) {
  const game = games[params.id as keyof typeof games];

  if (!game) return notFound();

  return (
    <div className="container py-12">
      {/* Título */}
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-full shadow-lg bg-white">
          {game.icon}
        </div>
        <h1 className="text-3xl font-bold mt-4">{game.title}</h1>
        <p className="text-gray-600 mt-2">{game.description}</p>
      </div>

      {/* Imagen */}
      <div className="w-full flex justify-center">
        <Image src={game.image} alt={game.title} width={600} height={400} className="rounded-lg shadow-md" />
      </div>

      {/* Información del juego */}
      <div className={`mt-6 p-6 rounded-lg ${game.bgColor} shadow-md`}>
        <p className="text-lg">
          <strong>Nivel:</strong> {game.level}
        </p>
        <p className="text-lg">
          <strong>Edad recomendada:</strong> {game.ageRange}
        </p>
      </div>

      {/* Botón para jugar */}
      <div className="mt-8 text-center">
        <Link href={`/play/${params.id}`}>
          <Button size="lg" className="bg-primary text-white">
            Jugar Ahora →
          </Button>
        </Link>
      </div>
    </div>
  );
}
