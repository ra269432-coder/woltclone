"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Anchor, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function WhatWeDoPreview() {
  const { t } = useLanguage();
  
  const pillars = [
    {
      title: t("whatWeDo.pillars.social.title"),
      description: t("whatWeDo.pillars.social.desc"),
      icon: Users,
      color: "bg-blue-600",
      lightBg: "bg-blue-50",
      hoverText: "group-hover:text-blue-600",
      link: "/programs/mental-health",
      image: "/images/pillar_social.jpg"
    },
    {
      title: t("whatWeDo.pillars.humanitarian.title"),
      description: t("whatWeDo.pillars.humanitarian.desc"),
      icon: Anchor,
      color: "bg-blue-600",
      lightBg: "bg-blue-50",
      hoverText: "group-hover:text-blue-600",
      link: "/programs/disaster-preparedness",
      image: "/images/pillar_humanitarian.jpg"
    },
    {
      title: t("whatWeDo.pillars.enterprise.title"),
      description: t("whatWeDo.pillars.enterprise.desc"),
      icon: Briefcase,
      color: "bg-blue-600",
      lightBg: "bg-blue-50",
      hoverText: "group-hover:text-blue-600",
      link: "/programs/bashundhara",
      image: "/images/pillar_enterprise.jpg"
    }
  ];

  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section className="py-12 bg-[#1E293B] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[30%] h-[40%] rounded-full bg-slate-200/50 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[100px] mix-blend-multiply"></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <span className="block text-blue-500 text-[13px] font-black tracking-[0.25em] uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-1 bg-blue-500 inline-block"></span> {t("whatWeDo.tag")}
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
              {t("whatWeDo.titleLine1")} <br/> {t("whatWeDo.titleLine2")}
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <p className="text-xl text-white/80 leading-relaxed font-medium">
              {t("whatWeDo.subtitle")}
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={item}
              className="h-full"
            >
              <Link href={pillar.link} className="group block h-full outline-none hover:-translate-y-2 transition-transform duration-500">
                <div className="relative h-96 w-full rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl flex flex-col justify-end p-8 border border-slate-700/50 bg-slate-800">
                  <Image 
                    src={pillar.image} 
                    alt={pillar.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10 opacity-90 transition-opacity duration-500"></div>
                  
                  <div className="relative z-20">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                      <pillar.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-white/80 font-medium leading-relaxed mb-6 line-clamp-3">
                      {pillar.description}
                    </p>
                    <div className="inline-flex items-center font-bold text-sm tracking-wide text-blue-400 uppercase">
                      {t("whatWeDo.explore")} <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
