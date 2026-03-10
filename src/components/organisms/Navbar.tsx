"use client";

import { useState } from "react";
import { Home, GamepadIcon, Trophy, LogIn, Sparkles, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/libs/utils";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "../atoms/Button";
import { LanguageSwitcher } from "../atoms/LanguageSwitcher";

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, login } = useAuthStore();

  const routes = [
    { href: "/", label: t("home"), icon: <Home className="mr-2 h-5 w-5" />, active: pathname === "/" },
    { href: "/game", label: t("play"), icon: <GamepadIcon className="mr-2 h-5 w-5" />, active: pathname.startsWith("/game") },
    { href: "/results", label: t("results"), icon: <Trophy className="mr-2 h-5 w-5" />, active: pathname === "/results" },
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
          <nav className="flex items-center space-x-4">
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

            <div className="ml-4 border-l pl-4">
              <LanguageSwitcher />
            </div>
          </nav>
        )}

        {/* Botón de Iniciar Sesión (Solo en Desktop) */}
        {!isMobile && (
          <Button onClick={() => login()} className="bg-primary text-white hover:bg-accent">
            <LogIn className="mr-2 h-5 w-5" />
            {t("login")}
          </Button>
        )}

        {/* Menú hamburguesa para móviles */}
        {isMobile && (
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-primary cursor-pointer">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        )}
      </div>

      {/* Menú Mobile */}
      {isMobile && menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-16 left-0 w-full bg-white shadow-md p-6 flex flex-col items-center space-y-4 z-50">
            {routes.map((route) => (
              <Link key={route.href} href={route.href} onClick={() => setMenuOpen(false)} className="w-full">
                <Button
                  variant={route.active ? "default" : "ghost"}
                  className={cn(
                    "w-full flex items-center justify-center text-lg font-medium",
                    route.active ? "bg-primary text-white" : ""
                  )}
                >
                  {route.icon}
                  {route.label}
                </Button>
              </Link>
            ))}
            <Button onClick={() => login()} className="bg-primary text-white hover:bg-accent w-full">
              <LogIn className="mr-2 h-5 w-5" />
              {t("login")}
            </Button>
          </div>
        </>
      )}
    </header>
  );
};