"use client";

import { useState, useMemo } from "react";
import { Home, GamepadIcon, Trophy, LogIn, Sparkles, Menu, X, User, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing"; // Asegúrate que el router sea el de i18n
import { useAuthStore } from "@/store/auth";
import { cn } from "@/libs/utils";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "../atoms/Button";
import { LanguageSwitcher } from "../atoms/LanguageSwitcher";

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuthStore();

  const routes = useMemo(() => {
    const baseRoutes = [
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
      }
    ];

    if (user) {
      baseRoutes.push({
        href: "/results",
        label: t("results"),
        icon: <Trophy className="mr-2 h-5 w-5" />,
        active: pathname === "/results"
      });
    }

    return baseRoutes;
  }, [user, pathname, t]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">

        <Link href="/" className="flex items-center space-x-2 font-black text-xl hover:opacity-80 transition-opacity">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          <span className="tracking-tighter">
            <span className="text-primary">MATH</span>
            <span className="text-foreground">FUN</span>
          </span>
        </Link>

        {!isMobile && (
          <nav className="flex items-center space-x-1">
            {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                <Button
                  variant={route.active ? "default" : "ghost"}
                  className={cn(
                    "rounded-xl font-bold transition-all",
                    route.active
                      ? "bg-primary text-white"
                      : "text-muted hover:text-primary hover:bg-pink-50"
                  )}
                >
                  {route.icon}
                  {route.label}
                </Button>
              </Link>
            ))}

            <div className="mx-4 h-6 w-[1px] bg-pink-100" />
            <LanguageSwitcher />

            {user ? (
              <div className="flex items-center gap-2 ml-4">
                <Link href="/dashboard">
                  <Button variant="outline" className="border-primary text-primary font-bold rounded-xl">
                    <User className="mr-2 h-4 w-4" />
                    {user.name}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <LogOut size={20} />
                </Button>
              </div>
            ) : (
              <Link href="/login" className="ml-4">
                <Button className="bg-primary text-white hover:bg-primary/90 font-black rounded-xl shadow-md shadow-pink-100">
                  <LogIn className="mr-2 h-5 w-5" />
                  {t("login")}
                </Button>
              </Link>
            )}
          </nav>
        )}

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

      {isMobile && menuOpen && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className="fixed cursor-pointer inset-0 bg-text/20 backdrop-blur-sm z-40 mt-16"
            onClick={() => setMenuOpen(false)}
          />


          <nav className="fixed top-16 left-0 w-full bg-white border-b border-pink-100 p-6 flex flex-col space-y-3 z-50">



            <div className="w-full space-y-2 mb-6">
              {routes.map((route) => (
                <Link key={route.href} href={route.href} onClick={() => setMenuOpen(false)} className="block">
                  <div className={cn(
                    "flex items-center justify-center gap-3 py-2.5 px-3 w-full rounded-xl font-bold text-sm transition-all",
                    pathname === route.href
                      ? "bg-primary text-white"
                      : "text-slate-500 hover:bg-slate-50"
                  )}>
                    {route.icon}
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>

            <div className="w-full pt-6 border-t border-slate-100">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm font-bold text-slate-700">¡Hola, {user.name.split(' ')[0]}!</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/dashboard" className="flex-1">
                      <Button fullWidth size="sm" className="rounded-xl h-10 font-bold text-xs uppercase">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="rounded-xl h-10 border-red-100 text-red-500"
                    >
                      <LogOut size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <Button size="lg" className="animate-pulse w-full" variant="outline">
                    <LogIn size={18} className="mr-2" />
                    {t("login")}
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};