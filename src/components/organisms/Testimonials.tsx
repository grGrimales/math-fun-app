import React from "react";
import { Star, Gamepad2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../atoms/Button";

const testimonials = [
  {
    text: "A mi hija le encanta practicar matemáticas con MathFun. ¡Los colores y las animaciones hacen que quiera seguir jugando!",
    name: "Ana García",
    role: "Madre de Sofía, 7 años",
  },
  {
    text: "Como profesor, recomiendo MathFun a todos mis alumnos. Es una forma divertida de reforzar lo que aprenden en clase.",
    name: "Carlos Rodríguez",
    role: "Profesor de primaria",
  },
  {
    text: "Mi hijo solía tener dificultades con las multiplicaciones, pero desde que usa MathFun ha mejorado muchísimo. ¡Y se divierte!",
    name: "Laura Martínez",
    role: "Madre de Lucas, 9 años",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 bg-[#FAFAF5]">
      <div className="container px-4 md:px-6">
        {/* Encabezado */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block bg-[#F9ECF2] p-2 rounded-lg mb-4">
             <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter text-gray-900 mb-4">
            ¡Los niños adoran MathFun!
          </h2>
          <p className="max-w-[700px] text-gray-600">
            Descubre por qué padres y profesores recomiendan nuestra aplicación.
          </p>
        </div>

        {/* Testimonios */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative"
            >
              <div className="absolute -top-5 -left-5">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <div className="pt-4">
                <p className="italic text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F9ECF2] mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón */}
        <div className="mt-12 flex items-center justify-center">
          <Link href="/game">
            <Button size="lg" className="animate-pulse">
              <Gamepad2 className="mr-2 h-5 w-5" />
              ¡Comienza a jugar ahora!
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
