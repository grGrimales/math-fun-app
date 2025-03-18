"use client";

import { Star } from "lucide-react";
import Image from "next/image";

interface HowItWorksCardProps {
  step: number;
  title: string;
  description: string;
  imageSrc: string;
  delay?: string;
}

export const HowItWorksCard = ({ step, title, description, imageSrc, delay }: HowItWorksCardProps) => {
  return (
    <div className="flex flex-col items-center text-center bg-card p-6 rounded-lg shadow-sm">
      {/* Número con estrella animada */}
      <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mb-4 relative">
        <span className="text-2xl text-background">{step}</span>
        <div className={`absolute -top-2 -right-2 animate-bounce`} style={{ animationDelay: delay }}>
          <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
        </div>
      </div>

      {/* Texto */}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>

      {/* Imagen decorativa */}
      <div className="mt-4 w-full h-32 relative rounded-lg overflow-hidden">
        <Image src="https://picsum.photos/300/200" alt={title} fill className="object-cover" />
      </div>
    </div>
  );
};
