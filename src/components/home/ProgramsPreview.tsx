"use client";

import { motion } from "framer-motion";
import { ArrowRight, HeartPulse, GraduationCap, Package, Wind, BrainCircuit, Accessibility } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/client";
import { useLanguage } from "@/context/LanguageContext";

export function ProgramsPreview() {
  const { t } = useLanguage();

  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const data = await fetchAPI('/api/programs/');
        
        const getContextVisuals = (title: string, defaultImage: string, defaultIcon: any) => {
          const t = (title || "").toLowerCase();
          // Humanitarian response — clean boxes + crowd photo (no text/logo)
          if (t.includes("humanitarian") || t.includes("relief")) {
            return { image: "/images/pillar_humanitarian.jpg", icon: Package };
          }
          // Disaster preparedness — Bangladesh Army triage/emergency response (no text)
          if (t.includes("disaster") || t.includes("preparedness") || t.includes("emergency")) {
            return { image: "/images/disaster_warning.jpg", icon: Package };
          }
          if (t.includes("healthcare") || t.includes("medical")) {
            return { image: "/images/health_mobile_clinic.jpg", icon: HeartPulse };
          }
          if (t.includes("health") && !t.includes("mental")) {
            return { image: "/generated/expanding_health_coverage.jpg", icon: HeartPulse };
          }
          if (t.includes("climate") || t.includes("environment")) {
            return { image: "/images/prog_climate.jpg", icon: Wind };
          }
          if (t.includes("mental")) {
            return { image: "/images/prog_counseling.jpg", icon: BrainCircuit };
          }
          if (t.includes("disability") || t.includes("inclusion")) {
            return { image: "/images/disability_assistive.jpg", icon: Accessibility };
          }
          if (t.includes("education") || t.includes("enterprise") || t.includes("youth") || t.includes("bashundhara")) {
            return { image: "/images/pillar_enterprise.jpg", icon: GraduationCap };
          }
          return { image: defaultImage, icon: defaultIcon };
        };

        const fallbackIcons = [Package, HeartPulse, Wind, BrainCircuit, Accessibility, GraduationCap];
        const fallbackImages = [
          "/images/pillar_humanitarian.jpg",
          "/images/health_mobile_clinic.jpg",
          "/images/prog_climate.jpg",
          "/images/prog_counseling.jpg",
          "/images/disability_assistive.jpg",
          "/images/pillar_enterprise.jpg"
        ];
        
        setPrograms(data.slice(0, 6).map((prog: any, idx: number) => {
          const visuals = getContextVisuals(
            prog.title, 
            fallbackImages[idx % fallbackImages.length], 
            fallbackIcons[idx % fallbackIcons.length]
          );
          
          return {
            title: prog.title,
            description: prog.description,
            icon: visuals.icon,
            link: `/programs/${prog.slug}`,
            image: prog.image || visuals.image
          };
        }));
      } catch (error) {
        console.error("Failed to load programs:", error);
      }
    }
    loadPrograms();
  }, []);

  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item: any = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section className="py-16 bg-[#E2E8F0] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <span className="block text-[#0F172A] text-[13px] font-black tracking-[0.25em] uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-1 bg-[#0F172A] inline-block"></span> {t("programs.tag")}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#0F172A] tracking-tighter leading-[1.1]">
              {t("programs.titleLine1")} <br/> {t("programs.titleLine2")}
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 flex flex-col lg:items-end"
          >
            <Link href="/programs">
              <div className="hidden lg:flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-colors shadow-2xl hover:-translate-y-2 transform text-lg cursor-pointer">
                {t("programs.viewAll")} <ArrowRight className="w-6 h-6" />
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {programs.map((program, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link href={program.link} className="group block h-full outline-none hover:-translate-y-2 transition-transform duration-500">
                <div className="h-full rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col group-focus-visible:ring-4 ring-offset-4 ring-slate-900 bg-white border border-slate-200 hover:border-blue-200">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-md text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <program.icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow bg-white">
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-4 leading-tight group-hover:text-blue-600 transition-colors">{program.title}</h3>
                    <p className="text-[#0F172A]/80 mb-8 flex-grow leading-relaxed font-medium">
                      {program.description}
                    </p>
                    
                    <div className="mt-auto inline-flex items-center font-bold text-sm tracking-widest uppercase text-slate-800 group-hover:text-blue-600 transition-colors">
                      {t("programs.explore")} <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center md:hidden">
          <Link href="/programs">
            <div className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold w-full justify-center shadow-xl active:scale-95 transition-transform text-lg cursor-pointer">
              {t("programs.viewAll")} <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
