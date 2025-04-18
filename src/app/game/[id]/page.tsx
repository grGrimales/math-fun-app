"use client"

import { notFound } from "next/navigation"
import { PlusIcon, MinusIcon, XIcon, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/atoms/Button"
import { Card } from "@/components/atoms/game/Card"
import { CardHeader } from "@/components/atoms/game/CardHeader"
import { CardContent } from "@/components/atoms/game/CardContent"
import { CardFooter } from "@/components/atoms/game/CardFooter"
import AdditionGame from "@/components/organisms/game/AdditionGame"

type GameConfig = {
  title: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  image: string;
  color: string;
  component?: React.ReactNode; 
};

const games: Record<string, GameConfig> = {
  addition: {
    title: "Juego de Sumas",
    description: "Practica tus habilidades de suma",
    details: "Resuelve problemas de suma lo más rápido que puedas. Tienes 30 segundos para responder tantas preguntas como sea posible.",
    icon: <PlusIcon className="h-6 w-6 text-pink-500" />,
    image: "/placeholder.svg?height=160&width=160",
    color: "bg-pink-100",
    component: <AdditionGame />, // componente inyectado aquí
  },
  subtraction: {
    title: "Juego de Restas",
    description: "Practica tus habilidades de resta",
    details: "Resta números rápidamente antes que el tiempo se acabe. Mejora tu rapidez mental con cada intento.",
    icon: <MinusIcon className="h-6 w-6 text-purple-500" />,
    image: "/placeholder.svg?height=160&width=160",
    color: "bg-purple-100",
  },
  multiplication: {
    title: "Juego de Multiplicación",
    description: "Practica las tablas de multiplicar",
    details: "Multiplica rápido y mejora tus habilidades con los números del 1 al 10.",
    icon: <XIcon className="h-6 w-6 text-fuchsia-500" />,
    image: "/placeholder.svg?height=160&width=160",
    color: "bg-fuchsia-100",
  },
};


export default function GameDetailPage({ params }: { params: { id: string } }) {
  const game = games[params.id as keyof typeof games]

  if (!game) return notFound()

    return (
      <section className="w-full py-12 md:py-24 relative overflow-hidden">
        <div className="container px-4 md:px-6 flex justify-center">
          {game.component ? (
            game.component
          ) : (
            <Card className="w-full max-w-md text-center relative z-10 shadow-md">
              <CardHeader className={`${game.color} px-6 py-4`}>
                <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow">
                  {game.icon}
                </div>
                <h1 className="text-2xl font-bold mt-4">{game.title}</h1>
                <p className="text-muted-foreground text-sm mt-2">{game.description}</p>
              </CardHeader>
  
              <CardContent className="pt-4 px-6">
                <h2 className="text-2xl font-bold">¡{game.title}!</h2>
                <div className="relative w-full h-40 my-6">
                  <Image src="/placeholder.svg?height=160&width=300" alt="Juego" fill className="object-contain" />
                </div>
                <p className="text-text text-sm">{game.details}</p>
              </CardContent>
  
              <CardFooter className="justify-center p-6">
                <div className="mt-12 flex items-center justify-center">
                  <Link href={`/play/${params.id}`}>
                    <Button size="md" className="animate-pulse">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Comenzar juego
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
  
        {/* Burbujas decorativas */}
        <div className="bubble w-32 h-32 top-20 left-[10%] animate-float"></div>
        <div className="bubble w-24 h-24 top-40 right-[15%] animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="math-symbol text-4xl text-pink-300 top-32 left-[30%] animate-spin-slow">+</div>
        <div
          className="math-symbol text-5xl text-pink-400 top-64 right-[25%] animate-spin-slow"
          style={{ animationDelay: "2s" }}
        >
          +
        </div>
      </section>
    );
  
}
