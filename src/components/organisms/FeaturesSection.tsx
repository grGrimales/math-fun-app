"use client";

import { GamepadIcon, Trophy, Settings } from "lucide-react";
import { FeatureCard } from "../molecules/FeatureCard";

export const FeaturesSection = () => {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tarjeta 1 */}
          <FeatureCard
            icon={<GamepadIcon className="h-8 w-8 text-primary" />}
            title="Juegos divertidos"
            description="Sumas, restas y multiplicaciones en formato de juego interactivo"
          />
          {/* Tarjeta 2 */}
          <FeatureCard
            icon={<Trophy className="h-8 w-8 text-primary" />}
            title="Seguimiento de progreso"
            description="Mira tus resultados y mejora con cada juego"
          />
          {/* Tarjeta 3 */}
          <FeatureCard
            icon={<Settings className="h-8 w-8 text-primary" />}
            title="Personalizable"
            description="Ajusta la dificultad según la edad y nivel del niño"
          />
        </div>
      </div>
    </section>
  );
};
