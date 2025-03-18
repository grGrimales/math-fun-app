import { PlusIcon, MinusIcon, XIcon, Sparkles } from "lucide-react";
import { GameCard } from "@/components/molecules/game/GameCard";

export const GamePage = () => {
  const games = [
    {
      id: "addition",
      title: "Juego de Sumas",
      description: "Practica sumas con números del 1 al 20",
      icon: <PlusIcon className="h-10 w-10 text-pink-500" />,
      bgColor: "bg-pink-100",
      level: "Principiante a Intermedio",
      ageRange: "6-9 años",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "subtraction",
      title: "Juego de Restas",
      description: "Practica restas con números del 1 al 20",
      icon: <MinusIcon className="h-10 w-10 text-purple-500" />,
      bgColor: "bg-purple-100",
      level: "Principiante a Intermedio",
      ageRange: "6-9 años",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "multiplication",
      title: "Juego de Multiplicación",
      description: "Practica las tablas de multiplicar del 1 al 10",
      icon: <XIcon className="h-10 w-10 text-fuchsia-500" />,
      bgColor: "bg-fuchsia-100",
      level: "Intermedio a Avanzado",
      ageRange: "8-11 años",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <div className="relative container py-12 px-10">
      {/* 🔹 Burbujas flotantes */}
      <div className="bubble w-32 h-32 top-20 left-[10%] animate-float"></div>
      <div className="bubble w-24 h-24 top-40 right-[15%] animate-float" style={{ animationDelay: "1s" }}></div>

      {/* Encabezado */}
      <div className="text-center mb-12 relative">
        <div className="inline-block bg-primary/20 p-2 rounded-full mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tighter mb-2">Elige un juego</h1>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Selecciona uno de nuestros juegos matemáticos diseñados para ayudarte a aprender mientras te diviertes.
        </p>
      </div>

      {/* Lista de Juegos */}
      <div className="grid gap-6  sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
};
