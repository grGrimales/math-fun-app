import Image from "next/image";
import { Star } from "lucide-react";
import { CardHeader } from "@/components/atoms/game/CardHeader";
import { CardTitle } from "@/components/atoms/game/CardTitle";
import { CardDescription } from "@/components/atoms/game/CardDescription";
import { CardContent } from "@/components/atoms/game/CardContent";
import { CardFooter } from "@/components/atoms/game/CardFooter";
import { Card } from "@/components/atoms/game/Card";
import { useTranslations } from "next-intl";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  level: string;
  ageRange: string;
  image: string;
}

export const GameCard = ({ id, title, description, icon, bgColor, level, ageRange, image }: GameCardProps) => {
  const t = useTranslations("Common");
  return (
    <Card href={`/game/${id}`} className="w-full flex flex-col overflow-hidden border-2 hover:border-primary relative">
      <div className="absolute top-2 right-2 z-10">
        <div className="bg-white rounded-full p-1 shadow-md">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        </div>
      </div>

      <CardHeader className={`${bgColor} relative min-h-[160px] flex flex-col justify-center`}>
        <div className="absolute inset-0 opacity-10">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <div className="flex justify-center relative z-10">
          <div className="p-2 rounded-full bg-white shadow-md">{icon}</div>
        </div>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center line-clamp-2">{description}</CardDescription>
      </CardHeader>

      <CardContent className="px-6 py-4 flex-1">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("level")}:</span>
            <span className="font-semibold">{level}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("ageRange")}:</span>
            <span className="font-semibold">{ageRange}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pb-6">
        <span className="text-primary font-semibold cursor-pointer hover:underline">{t("playNow")}</span>
      </CardFooter>
    </Card>
  );
};
