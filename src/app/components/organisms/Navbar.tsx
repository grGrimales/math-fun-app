"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, GamepadIcon, Trophy, User, Settings, LogIn, LogOut, Menu, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/libs/utils";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "../atoms/Button";
import { Sheet, SheetContent, SheetTrigger } from "../molecules/Sheet";

export const Navbar = () => {
  const pathname = usePathname();
  const isMobile = useMobile();
  const [open, setOpen] = useState(false);
  const { user, login, logout } = useAuthStore();

  const routes = [
    { href: "/", label: "Inicio", icon: <Home className="mr-2 h-5 w-5" />, active: pathname === "/" },
    { href: "/game", label: "Jugar", icon: <GamepadIcon className="mr-2 h-5 w-5" />, active: pathname === "/game" || pathname.startsWith("/game/") },
    { href: "/results", label: "Resultados", icon: <Trophy className="mr-2 h-5 w-5" />, active: pathname === "/results" },
    ...(user ? [
      { href: "/profile", label: "Perfil", icon: <User className="mr-2 h-5 w-5" />, active: pathname === "/profile" },
      { href: "/settings", label: "Configuración", icon: <Settings className="mr-2 h-5 w-5" />, active: pathname === "/settings" },
    ] : []),
  ];

  const NavItems = () => (
    <nav className="hidden md:flex space-x-6">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button
            variant={route.active ? "default" : "ghost"}
            className={cn(
              "flex items-center text-sm font-medium transition-colors",
              route.active ? "text-primary border-b-2 border-primary" : "text-foreground hover:text-primary"
            )}
          >
            {route.icon}
            {route.label}
          </Button>
        </Link>
      ))}
    </nav>
  );

  const AuthButton = () => (
    <div className="hidden md:flex items-center space-x-4">
      {user ? (
        <Button
          variant="outline"
          onClick={() => { logout(); setOpen(false); }}
          className="flex items-center border border-border text-primary"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      ) : (
        <Button
          onClick={() => { login(); setOpen(false); }}
          className="flex items-center bg-primary text-white hover:bg-accent"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Iniciar sesión
        </Button>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl mr-6">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-primary">Math</span>
          <span className="text-foreground">Fun</span>
        </Link>

        {/* Menú de Navegación */}
        {!isMobile && <NavItems />}
        {!isMobile && <AuthButton />}

        {/* Menú Mobile */}
        {isMobile && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <NavItems />
              <div className="mt-auto pt-4">
                <AuthButton />
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};
