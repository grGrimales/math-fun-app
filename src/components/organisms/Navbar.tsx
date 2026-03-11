"use client";

import { useState } from "react";
import { Home, GamepadIcon, Trophy, LogIn, Sparkles, Menu, X, User } from "lucide-react";
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

  const { user } = useAuthStore();

  const routes = [
    {
      href: "/",
      label: t("home"),
      icon: <Home className="mr-2 h-5 w-5" />,
      active: pathname === "/"
    },
    {
      href: "/game",
      label: t("play"),
      icon: <GamepadIcon className="mr-2 h-5 w-5" />,
      active: pathname.startsWith("/game")
    },
    {
      href: "/results",
      label: t("results"),
      icon: <Trophy className="mr-2 h-5 w-5" />,
      active: pathname === "/results"
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-pink-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">

        <Link href="/" className="flex items-center space-x-3 font-bold text-xl">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-primary">Math</span>
          <span className="text-foreground">Fun</span>
        </Link>

        {/* 💻 Menú Desktop */}
        {!isMobile && (
          <nav className="flex items-center space-x-2">
            {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                <Button
                  variant={route.active ? "default" : "ghost"}
                  className={cn(
                    "rounded-xl font-bold transition-all",
                    route.active
                      ? "bg-pink-50 text-white hover:bg-secondary/80 hover:text-primary"
                      : "text-muted hover:text-primary hover:bg-pink-50"
                  )}
                >

                  {route.icon}
                  {route.label}
                </Button>
              </Link>
            ))}

            <div className="ml-4 mr-4 h-6 w-[1px] bg-pink-100" />
            <LanguageSwitcher />

            {/* 🔑 Botón Dinámico de Login/User */}
            {user ? (
              <Link href="/dashboard">
                <Button variant="outline" className="border-primary text-primary font-black rounded-xl ml-4">
                  <User className="mr-2 h-5 w-5" />
                  {user.name}
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-primary text-white hover:bg-ring font-black rounded-xl ml-4 shadow-md shadow-pink-200">
                  <LogIn className="mr-2 h-5 w-5" />
                  {t("login")}
                </Button>
              </Link>
            )}
          </nav>
        )}

        {/* 📱 Mobile Toggle */}
        {isMobile && (
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-primary p-2 hover:bg-pink-50 rounded-lg transition-colors"
            >
              {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        )}
      </div>

      {/* 📱 Menú Mobile (Drawer) */}
      {isMobile && menuOpen && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className="fixed inset-0 bg-text/20 backdrop-blur-sm z-40 mt-16"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="fixed top-16 left-0 w-full bg-white border-b border-pink-100 p-6 flex flex-col space-y-3 z-50">
            {routes.map((route) => (
              <Link key={route.href} href={route.href} onClick={() => setMenuOpen(false)}>
                <Button
                  variant={route.active ? "default" : "ghost"}
                  fullWidth
                  className={cn(
                    "justify-start text-lg font-bold rounded-2xl h-14",
                    route.active ? "bg-primary text-white" : "text-muted"
                  )}
                >
                  {route.icon}
                  {route.label}
                </Button>
              </Link>
            ))}

            <div className="pt-4 border-t border-dashed border-pink-100">
              <Link href={user ? "/dashboard" : "/login"} onClick={() => setMenuOpen(false)}>
                <Button fullWidth size="lg" className="rounded-2xl h-14 font-black">
                  {user ? (
                    <Link href="/dashboard">
                      <Button variant="outline" className="border-primary text-primary font-black rounded-xl ml-4">
                        <User className="mr-2 h-5 w-5" />
                        {user.name}
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <Button className="bg-primary text-white font-black rounded-xl ml-4">
                        <LogIn className="mr-2 h-5 w-5" />
                        {t("login")}
                      </Button>
                    </Link>
                  )}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};