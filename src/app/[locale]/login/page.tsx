// src/app/[locale]/login/page.tsx
import { useTranslations } from "next-intl";
import { ChevronLeft, Star } from "lucide-react";
import { MathBackground } from "@/components/organisms/MathBackground";
import { LoginForm } from "@/components/organisms/LoginForm";

import { Card } from "@/components/atoms/game/Card";
import { CardHeader } from "@/components/atoms/game/CardHeader";
import { CardTitle } from "@/components/atoms/game/CardTitle";
import { CardDescription } from "@/components/atoms/game/CardDescription";
import { CardContent } from "@/components/atoms/game/CardContent";
import { CardFooter } from "@/components/atoms/game/CardFooter";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";

export default function LoginPage() {
    const t = useTranslations("Login");

    return (
        <main className="min-h-screen flex items-center justify-center p-4 relative bg-bg-secondary/30">
            <MathBackground />
            <div className="absolute top-10 left-20 ">
                <Link href="/">
                    <Button
                        variant="ghost"
                        size="md"
                        className="group flex items-center gap-2 text-text/60 hover:text-primary transition-all font-black bg-white/50 backdrop-blur-sm rounded-full px-4 shadow-sm border border-white/20"
                    >
                        <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        <span className="text-xs uppercase tracking-widest">
                            {t("backToHome") || "Volver"}
                        </span>
                    </Button>
                </Link>
            </div>

            <Card className="w-full max-w-[450px] bg-white overflow-hidden border-2 shadow-xl relative z-10">

                <div className="absolute top-4 right-4 z-10">
                    <div className="bg-white rounded-full p-1.5 shadow-md border border-pink-100">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    </div>
                </div>

                <CardHeader className="bg-bg-secondary pt-10 pb-8 px-8 text-center border-b">
                    <div className="mb-4 flex justify-center">
                        <div className="p-3 rounded-2xl bg-white shadow-sm text-primary text-3xl font-black">
                            ∑
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-black text-text tracking-tight">
                        {t("LoginTitle")}
                    </CardTitle>
                    <CardDescription className="text-muted font-medium mt-2">
                        {t("LoginSubtitle")}
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-8 py-10">
                    <LoginForm />
                </CardContent>

                <CardFooter className="px-8 pb-10 pt-0 flex justify-center border-t border-dashed border-pink-100 mt-4">
                    <p className="text-muted text-sm mt-6">
                        {t("noAccount")}{" "}
                        <Link href="/signup">
                            <span className="text-primary font-bold cursor-pointer hover:underline transition-colors">
                                {t("signUpLink")}
                            </span>
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
}