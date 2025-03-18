"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, GamepadIcon, Trophy, LogIn, Sparkles, Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/libs/utils";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "../atoms/Button";

export const Navbar = () => {
  const pathname = usePathname();
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, login } = useAuthStore();

  const routes = [
    { href: "/", label: "Inicio", icon: <Home className="mr-2 h-5 w-5" />, active: pathname === "/" },
    { href: "/game", label: "Jugar", icon: <GamepadIcon className="mr-2 h-5 w-5" />, active: pathname.startsWith("/game") },
    { href: "/results", label: "Resultados", icon: <Trophy className="mr-2 h-5 w-5" />, active: pathname === "/results" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 font-bold text-xl">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-primary">Math</span>
          <span className="text-foreground">Fun</span>
        </Link>

        {/* Menú Desktop */}
        {!isMobile && (
          <nav className="flex space-x-6">
            {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                <Button
                  variant={route.active ? "default" : "ghost"}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors",
                    route.active ? "bg-primary text-white" : "text-foreground hover:text-primary"
                  )}
                >
                  {route.icon}
                  {route.label}
                </Button>
              </Link>
            ))}
          </nav>
        )}

        {/* Botón de Iniciar Sesión (Solo en Desktop) */}
        {!isMobile && (
          <Button onClick={() => login()} className="bg-primary text-white hover:bg-accent">
            <LogIn className="mr-2 h-5 w-5" />
            Iniciar sesión
          </Button>
        )}

        {/* Menú hamburguesa para móviles */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-primary cursor-pointer">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        )}
      </div>

      {/* Overlay para deshabilitar el fondo cuando el menú está abierto */}
      {isMobile && menuOpen && (
        <>
          {/* Fondo oscuro semitransparente */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menú Mobile */}
          <div className="fixed top-16 left-0 w-full bg-white shadow-md p-6 flex flex-col items-center space-y-4 z-50">
            {routes.map((route) => (
              <Link key={route.href} href={route.href} onClick={() => setMenuOpen(false)}>
                <Button
                  variant={route.active ? "default" : "ghost"}
                  className={cn(
                    "flex items-center text-lg font-medium",
                    route.active ? "bg-primary text-white" : "text-foreground hover:text-primary"
                  )}
                >
                  {route.icon}
                  {route.label}
                </Button>
              </Link>
            ))}
            <Button onClick={() => login()} className="bg-primary text-white hover:bg-accent w-full">
              <LogIn className="mr-2 h-5 w-5" />
              Iniciar sesión
            </Button>
          </div>
        </>
      )}
    </header>
  );
};
