"use client";

import { GamepadIcon, LogIn, Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "../atoms/Button";
import { HeroText } from "../molecules/HeroText";

export const Hero = () => {
  return (
    <section className="hidden md:flex relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/20 to-background text-center  flex-col items-center justify-center overflow-hidden">
      {/* Burbujas decorativas */}
      <div className="absolute w-32 h-32 bg-pink-200 rounded-full top-10 left-[10%] opacity-50 animate-float"></div>
      <div className="absolute w-24 h-24 bg-pink-300 rounded-full top-40 right-[15%] opacity-50 animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute w-16 h-16 bg-pink-400 rounded-full top-55 left-[20%] opacity-50 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="absolute w-20 h-20 bg-pink-400 rounded-full top-60 right-[25%] opacity-50 animate-float" style={{ animationDelay: "3s" }}></div>

      {/* Símbolos matemáticos flotantes */}
      <div className="absolute text-4xl text-pink-300 top-20 left-[30%] animate-spin-slow">+</div>
      <div className="absolute text-5xl text-pink-400 top-48 right-[35%] animate-spin-slow" style={{ animationDelay: "2s" }}>−</div>
      <div className="absolute text-4xl text-pink-300 top-72 left-[25%] animate-spin-slow" style={{ animationDelay: "4s" }}>X</div>
      <div className="absolute text-5xl text-pink-400 top-36 right-[20%] animate-spin-slow" style={{ animationDelay: "6s" }}>÷</div>
      <div className="absolute text-4xl text-pink-300 top-64 left-[15%] animate-spin-slow" style={{ animationDelay: "3s" }}>%</div>
      <div className="absolute text-5xl text-pink-400 top-28 right-[10%] animate-spin-slow" style={{ animationDelay: "5s" }}>π</div>

      {/* Contenido principal */}
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-6 z-10">
        {/* Imagen del Logo */}
        <div className="relative w-40 h-40">
          <Image
            src="/placeholder.svg?height=160&width=160"
            alt="MathFun Logo"
            width={160}
            height={160}
            className="rounded-full bg-white p-2 shadow-lg"
          />
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        {/* Texto del Hero */}
            <HeroText/>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="sm:w-auto flex items-center" fullWidth> 
            <GamepadIcon className="mr-2 h-5 w-5" />
            Empezar a jugar
          </Button>
          <Button variant="outline" size="md" className="sm:w-auto flex items-center" fullWidth>
            <LogIn className="mr-2 h-5 w-5" />
            Iniciar sesión
          </Button>
        </div>
      </div>
    </section>
  );
};
