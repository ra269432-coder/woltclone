"use client";

import { motion } from "framer-motion";
import { Activity, Users, MapPin, Package } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Stats() {
  const { t } = useLanguage();

  const stats = [
    { 
      value: "64", 
      label: t("statsSection.items.districts.label"), 
      desc: t("statsSection.items.districts.desc"),
      icon: MapPin 
    },
    { 
      value: "2.5M+", 
      label: t("statsSection.items.patients.label"), 
      desc: t("statsSection.items.patients.desc"),
      icon: Activity
    },
    { 
      value: "50k+", 
      label: t("statsSection.items.students.label"), 
      desc: t("statsSection.items.students.desc"),
      icon: Users
    },
    { 
      value: "15M+", 
      label: t("statsSection.items.relief.label"), 
      desc: t("statsSection.items.relief.desc"),
      icon: Package
    },
  ];

  return (
    <section className="py-16 bg-[#115E59] relative overflow-hidden text-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-400 font-bold tracking-[0.2em] uppercase mb-4 block flex items-center gap-4">
              <span className="w-12 h-1 bg-blue-400 inline-block"></span> {t("statsSection.tag")}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[1.05]">
              {t("statsSection.titleLine1")} <br/> {t("statsSection.titleLine2")}
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed font-medium">
              {t("statsSection.subtitle")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[2rem] shadow-lg border border-slate-700/50 hover:border-blue-500/30 relative overflow-hidden group transition-colors duration-500"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              
              <div className="absolute -top-4 -right-4 p-6 opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-500 transform group-hover:scale-110">
                <stat.icon className="w-32 h-32 text-blue-100" />
              </div>
              
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 text-white drop-shadow-lg">
                  {stat.value}
                </div>
                <div className="text-xl font-bold text-blue-200 mb-4">
                  {stat.label}
                </div>
                <p className="text-slate-400 text-base leading-relaxed font-medium">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
