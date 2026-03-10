import { useTranslations } from "next-intl";
import { Star, ChevronLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/atoms/Button";
import { MathBackground } from "@/components/organisms/MathBackground";
import { Card } from "@/components/atoms/game/Card";
import { CardHeader } from "@/components/atoms/game/CardHeader";
import { CardTitle } from "@/components/atoms/game/CardTitle";
import { CardDescription } from "@/components/atoms/game/CardDescription";
import { CardContent } from "@/components/atoms/game/CardContent";
import { RegisterForm } from "@/components/organisms/RegisterForm";
import { CardFooter } from "@/components/atoms/game/CardFooter";

export default function RegisterPage() {
    const t = useTranslations("Register");

    return (
        <main className="min-h-screen flex justify-center items-start pt-20 p-4 relative bg-bg-secondary/30">
            <MathBackground />

            <div className="fixed top-8 left-8 z-50">
                <Link href="/login">
                    <Button variant="ghost" className="group flex items-center gap-2 text-text/60 hover:text-primary transition-all font-black bg-white/50 backdrop-blur-sm rounded-full px-4 shadow-sm border border-white/20">
                        <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        <span className="text-xs uppercase tracking-widest">{t("backToLogin")}</span>
                    </Button>
                </Link>
            </div>

            <Card className="w-full max-w-[440px] bg-white overflow-hidden border-2 shadow-2xl relative z-10 mt-10">
                <div className="absolute top-4 right-4 opacity-50">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>

                <CardHeader className="bg-bg-secondary/40 pt-10 pb-8 px-8 text-center border-b border-pink-50">
                    <div className="mb-6 flex justify-center">
                        <div className="p-4 rounded-3xl bg-white shadow-lg text-primary text-4xl font-black transform rotate-3">
                            +
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-black text-text tracking-tight">
                        {t("RegisterTitle")}
                    </CardTitle>
                    <CardDescription className="text-muted font-medium mt-2">
                        {t("RegisterSubtitle")}
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-10 py-10">
                    <RegisterForm />
                </CardContent>

                <CardFooter className="px-8 pb-10 pt-0 flex justify-center border-t border-dashed border-pink-100/50">
                    <p className="text-muted/80 text-sm mt-8 font-medium">
                        {t("haveAccount")}{" "}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            {t("loginLink")}
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
}