"use client";

import { HowItWorksCard } from "./HowItWorksCard";


export const HowItWorksSection = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-[#F7F3F5] relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        {/* Título y descripción */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">¿Cómo funciona?</h2>
          <p className="max-w-[700px] text-muted-foreground">
            MathFun hace que aprender matemáticas sea divertido y efectivo
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <HowItWorksCard
            step={1}
            title="Elige un juego"
            description="Selecciona entre sumas, restas o multiplicaciones"
            imageSrc="/placeholder.svg?height=128&width=256"
          />
          <HowItWorksCard
            step={2}
            title="Juega y aprende"
            description="Resuelve problemas matemáticos de forma divertida"
            imageSrc="/placeholder.svg?height=128&width=256"
            delay="0.2s"
          />
          <HowItWorksCard
            step={3}
            title="Sigue tu progreso"
            description="Revisa tus resultados y mejora con cada sesión"
            imageSrc="/placeholder.svg?height=128&width=256"
            delay="0.4s"
          />
        </div>
      </div>
    </section>
  );
};
