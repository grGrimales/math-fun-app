"use client";

import React from "react";
import { Star, Gamepad2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "../atoms/Button";

export default function Testimonials() {
  const t = useTranslations("Testimonials");

  const testimonialKeys = ["1", "2", "3"] as const;

  return (
    <section className="w-full py-12 md:py-24 bg-[#FAFAF5]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block bg-[#F9ECF2] p-2 rounded-lg mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="max-w-[700px] text-gray-600">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonialKeys.map((key) => (
            <div
              key={key}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative"
            >
              <div className="absolute -top-5 -left-5">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <div className="pt-4">
                <p className="italic text-gray-700 mb-4">
                  {t(`list.${key}.text`)}
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F9ECF2] mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {t(`list.${key}.name`)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t(`list.${key}.role`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center">
          <Link href="/game">
            <Button size="lg" className="animate-pulse">
              <Gamepad2 className="mr-2 h-5 w-5" />
              {t("cta")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}