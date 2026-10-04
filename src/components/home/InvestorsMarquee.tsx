"use client";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/client";

const defaultPartners = [
  { name: "EBF", src: "/partners/media_1787805003778.png" },
  { name: "Baptist Union of Scotland", src: "/partners/media_1787805012657.png" },
  { name: "Eglise Baptiste du Calvaire", src: "/partners/media_1787805025175.png" },
  { name: "Baptist Gottingen", src: "/partners/media_1787805031290.png" }
];
import { useLanguage } from "@/context/LanguageContext";

export function InvestorsMarquee() {
  const { t } = useLanguage();
  const [partners, setPartners] = useState<any[]>(defaultPartners);

  useEffect(() => {
    async function loadPartners() {
      try {
        const data = await fetchAPI('/api/partners/');
        if (data) {
          const defaultImages = [
            "/partners/media_1787805003778.png",
            "/partners/media_1787805012657.png",
            "/partners/media_1787805025175.png",
            "/partners/media_1787805031290.png"
          ];
          setPartners(data.map((p: any, idx: number) => ({
            name: p.organization_name,
            src: p.logo || defaultImages[idx % defaultImages.length]
          })));
        }
      } catch (error) {
        console.error("Failed to load partners:", error);
      }
    }
    loadPartners();
  }, []);

  return (
    <section className="py-12 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10 mb-16">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
          {t("partners.title1")} <span className="text-[#0ea5e9]">{t("partners.title2")}</span>
        </h2>
      </div>

      <div className="relative flex overflow-hidden group py-4">
        {/* Gradient overlays for smooth fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex whitespace-nowrap items-center w-max"
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Duplicate the array twice to ensure seamless infinite scrolling */}
          {[...partners, ...partners, ...partners].map((partner, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center mx-12 min-w-[150px] md:min-w-[200px]"
            >
              <div className="transition-transform duration-300 hover:scale-110 group/logo cursor-pointer">
                <img 
                  src={partner.src} 
                  alt={partner.name}
                  className="h-16 md:h-20 w-auto object-contain grayscale opacity-70 transition-all duration-300 group-hover/logo:grayscale-0 group-hover/logo:opacity-100"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
