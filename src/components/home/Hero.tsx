"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Button } from "../ui/button";
import { ShieldCheck, Globe2, Users, ArrowRight, Play, HeartHandshake, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t, language } = useLanguage();
  const isBn = language === 'bn';
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section ref={ref} className="relative min-h-[100svh] lg:min-h-[90svh] flex flex-col justify-center overflow-hidden text-white bg-[#0B1120] pt-20 sm:pt-24 pb-6 sm:pb-8">
      {/* Heavy Dynamic Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950 z-10" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/40 blur-[120px] rounded-full z-20 pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/30 blur-[120px] rounded-full z-20 pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531206715517-5c56108158d5?auto=format&fit=crop&w=1920&q=80')] opacity-[0.12] mix-blend-luminosity z-30 bg-cover bg-center" />
      </motion.div>

      <div className="container relative z-40 px-4 py-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ opacity: opacityText }}
            className="lg:col-span-7"
          >
            <motion.div 
              variants={itemVariants}
              className="mb-2"
            >
              <motion.div
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="inline-block text-2xl md:text-3xl font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-[length:200%_auto]"
              >
                {t("hero.titleLine1")} {t("hero.titleLine2")}
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl mb-4 border border-white/10 hover:border-emerald-500/30 shadow-2xl transition-all cursor-pointer group"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 group-hover:text-emerald-300 transition-colors">{t("hero.badge")}</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[6rem] font-black tracking-tighter mb-4 sm:mb-6 leading-[1.1] sm:leading-[1.05]">
              {isBn ? "ওয়ে অফ লাইট" : "Way of Light"} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                {isBn ? "ট্রাস্ট" : "Trust"}
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed font-medium max-w-2xl">
              {t("hero.subtitle")}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link href="#donate">
                <div className="w-full sm:w-auto bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 rounded-full px-8 sm:px-10 py-4 sm:py-5 lg:py-6 text-base sm:text-lg font-black shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] group inline-flex items-center justify-center cursor-pointer">
                  {t("hero.startDonating")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
              <Link href="/resource/media">
                <div className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-4 sm:py-5 lg:py-6 text-base sm:text-lg border-white/20 bg-white/5 hover:bg-white/10 hover:text-white font-bold backdrop-blur-md transition-all hover:scale-105 inline-flex items-center justify-center cursor-pointer border">
                  <Play className="w-5 h-5 mr-3 fill-current" />
                  {t("hero.watchVideo")}
                </div>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 sm:gap-6 pt-5 sm:pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 sm:gap-3 text-slate-400 group">
                <div className="bg-white/5 p-2 sm:p-2.5 rounded-2xl group-hover:bg-emerald-500/20 transition-colors">
                  <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">{t("hero.trustSecure")}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-slate-400 group">
                <div className="bg-white/5 p-2 sm:p-2.5 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                  <Globe2 className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">{t("hero.trustGlobal")}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-slate-400 group">
                <div className="bg-white/5 p-2 sm:p-2.5 rounded-2xl group-hover:bg-purple-500/20 transition-colors">
                  <Users className="w-4 sm:w-5 h-4 sm:h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">{t("hero.trustReached")}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Single Full Premium Photo Showcase (No overlapping sad photo) */}
          <div className="hidden lg:block lg:col-span-5 relative h-[480px] w-full">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)] border border-white/15 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80" 
                alt="WOLT Foundation Community Impact" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              
              {/* Refined gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500"></div>



              {/* Bottom Card Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-3xl border border-white/20 text-white shadow-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{t("hero.photoTag")}</span>
                    <span className="text-xs font-bold text-slate-300">{t("hero.photoYear")}</span>
                  </div>
                  <h3 className="font-black text-2xl tracking-tight">{t("hero.photoTitle")}</h3>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {t("hero.photoDesc")}
                  </p>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                className="absolute top-24 right-6 z-30 bg-indigo-600/90 backdrop-blur-xl text-white px-5 py-3.5 rounded-2xl shadow-[0_15px_35px_rgba(79,70,229,0.6)] border border-indigo-400/40 flex items-center gap-3"
              >
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider leading-none mb-1">{t("hero.totalImpact")}</p>
                  <p className="text-lg font-black leading-none">{t("hero.raised")}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
