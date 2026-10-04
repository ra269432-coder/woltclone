"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, Heart, ChevronDown, Briefcase, Laptop, Handshake, Building, Newspaper, BookOpen, Megaphone, Bell, Plus, Minus, Image, FileText, Package, HeartPulse, GraduationCap, Target, Users, MapPin, Leaf, Activity, ShieldAlert, X } from "lucide-react";
import { useState } from "react";
import { LanguageToggle } from "../ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[96%] max-w-[1400px] bg-white border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-full transition-all duration-500 hover:shadow-[0_10px_50px_rgba(0,0,0,0.15)]">
      <div className="flex h-[72px] items-center justify-between px-6 lg:px-8 relative">
        <div className="flex-1 flex justify-start h-full items-center gap-5">
          <Link href="/" className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full overflow-hidden bg-white transition-transform duration-500 hover:scale-105 z-20 flex-shrink-0">
            <img src="/logo2.jpeg" alt="WOLT Foundation" className="w-full h-full object-contain scale-[1.4] mix-blend-multiply contrast-110" />
          </Link>
          <div className="hidden sm:block h-6 w-[1px] bg-slate-300/50"></div>
          <LanguageToggle />
        </div>

        <div className="hidden lg:flex flex-none gap-2 items-center justify-center text-[14px] font-bold text-slate-700 tracking-wide h-full">
          <Link href="/sdg" className="relative px-4 py-2 rounded-full hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 flex items-center h-auto">
            {t("nav.sdgs")}
          </Link>
          
          {/* Mega Dropdown: ABOUT US */}
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 h-auto outline-none">
              {t("nav.aboutUs")} <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-slate-400 group-hover:text-blue-600" />
            </button>
            <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 invisible opacity-0 translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out w-[600px] pt-4">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-slate-100/50 p-6 flex gap-8 text-slate-600 normal-case tracking-normal">
                {/* Column 1 */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-[11px] uppercase text-slate-400 font-extrabold tracking-[0.2em] border-b border-slate-100 pb-3 mb-3">{t("nav.menu.aboutUs")}</h3>
                  <div className="flex flex-col space-y-1">
                    <Link href="/about/vision-mission-values" className="p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-blue-50/80 p-2.5 rounded-lg group-hover/item:bg-blue-500 group-hover/item:shadow-md group-hover/item:shadow-blue-500/20 transition-all duration-300"><Target className="w-5 h-5 text-blue-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-blue-600 transition-colors">{t("nav.menu.visionMission")}</span>
                    </Link>
                  </div>
                </div>
                {/* Column 2 */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-[11px] uppercase text-slate-400 font-extrabold tracking-[0.2em] border-b border-slate-100 pb-3 mb-3">{t("nav.menu.ourTeams")}</h3>
                  <div className="flex flex-col space-y-1">
                    <Link href="/teams/team" className="p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-emerald-50/80 p-2.5 rounded-lg group-hover/item:bg-emerald-500 group-hover/item:shadow-md group-hover/item:shadow-emerald-500/20 transition-all duration-300"><Users className="w-5 h-5 text-emerald-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-emerald-600 transition-colors">{t("nav.menu.team")}</span>
                    </Link>
                    <Link href="/teams/governing-board" className="p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-purple-50/80 p-2.5 rounded-lg group-hover/item:bg-purple-500 group-hover/item:shadow-md group-hover/item:shadow-purple-500/20 transition-all duration-300"><Briefcase className="w-5 h-5 text-purple-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-purple-600 transition-colors">{t("nav.menu.governingBoard")}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mega Dropdown: WHAT WE DO */}
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 h-auto outline-none">
              {t("nav.whatWeDo")} <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-slate-400 group-hover:text-blue-600" />
            </button>
            <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 invisible opacity-0 translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out w-[800px] pt-4">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-slate-100/50 p-8 flex gap-8 text-slate-600 normal-case tracking-normal">
                {/* Social Development */}
                <div className="flex-[1.5] space-y-2">
                  <h3 className="text-[11px] uppercase text-slate-400 font-extrabold tracking-[0.2em] border-b border-slate-100 pb-3 mb-3">{t("nav.menu.socialDevelopment")}</h3>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <Link href="/programs/mental-health" className="p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-3 font-semibold text-[14px] text-slate-800 group/item">
                      <div className="bg-pink-50 p-2 rounded-lg group-hover/item:bg-pink-500 transition-all duration-300"><Heart className="w-4 h-4 text-pink-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-pink-600 transition-colors">{t("nav.menu.mentalHealth")}</span>
                    </Link>
                    <Link href="/programs/climate-change" className="p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-3 font-semibold text-[14px] text-slate-800 group/item">
                      <div className="bg-teal-50 p-2 rounded-lg group-hover/item:bg-teal-500 transition-all duration-300"><Leaf className="w-4 h-4 text-teal-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-teal-600 transition-colors">{t("nav.menu.climateChange")}</span>
                    </Link>
                    <Link href="/programs/expanding-health-coverage" className="p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-3 font-semibold text-[14px] text-slate-800 group/item">
                      <div className="bg-emerald-50 p-2 rounded-lg group-hover/item:bg-emerald-500 transition-all duration-300"><HeartPulse className="w-4 h-4 text-emerald-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-emerald-600 transition-colors">{t("nav.menu.expandingHealth")}</span>
                    </Link>
                    <Link href="/programs/advocacy-for-social-change" className="p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-3 font-semibold text-[14px] text-slate-800 group/item">
                      <div className="bg-orange-50 p-2 rounded-lg group-hover/item:bg-orange-500 transition-all duration-300"><Megaphone className="w-4 h-4 text-orange-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-orange-600 transition-colors">{t("nav.menu.advocacy")}</span>
                    </Link>
                    <Link href="/programs/disability-inclusion" className="p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-3 font-semibold text-[14px] text-slate-800 group/item col-span-2">
                      <div className="bg-blue-50 p-2 rounded-lg group-hover/item:bg-blue-500 transition-all duration-300"><Users className="w-4 h-4 text-blue-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-blue-600 transition-colors">{t("nav.menu.disabilityInclusion")}</span>
                    </Link>
                  </div>
                </div>
                {/* Humanitarian Response & Social Enterprise */}
                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-[11px] uppercase text-slate-400 font-extrabold tracking-[0.2em] border-b border-slate-100 pb-3 mb-3">{t("nav.menu.humanitarianResponse")}</h3>
                    <div className="flex flex-col space-y-1">
                      <Link href="/programs/disaster-preparedness" className="p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-3 font-semibold text-[14px] text-slate-800 group/item">
                        <div className="bg-red-50 p-2 rounded-lg group-hover/item:bg-red-500 transition-all duration-300"><ShieldAlert className="w-4 h-4 text-red-600 group-hover/item:text-white transition-colors" /></div> 
                        <span className="group-hover/item:text-red-600 transition-colors leading-snug">{t("nav.menu.disasterPreparedness")}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          {/* Mega Dropdown: RESOURCES */}
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 h-auto outline-none">
              {t("nav.resources")} <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-slate-400 group-hover:text-blue-600" />
            </button>
            <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 invisible opacity-0 translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out w-[500px] pt-4">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-slate-100/50 p-6 text-slate-600 normal-case tracking-normal">
                <div className="space-y-2">
                  <h3 className="text-[11px] uppercase text-slate-400 font-extrabold tracking-[0.2em] border-b border-slate-100 pb-3 mb-4">{t("nav.resources")}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/resource/news" className="p-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-indigo-50 p-2.5 rounded-lg group-hover/item:bg-indigo-500 transition-all duration-300"><Newspaper className="w-4 h-4 text-indigo-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-indigo-600 transition-colors">{t("nav.menu.news")}</span>
                    </Link>
                    <Link href="/resource/story" className="p-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-amber-50 p-2.5 rounded-lg group-hover/item:bg-amber-500 transition-all duration-300"><BookOpen className="w-4 h-4 text-amber-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-amber-600 transition-colors">{t("nav.menu.story")}</span>
                    </Link>
                    <Link href="/resource/campaigns" className="p-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-rose-50 p-2.5 rounded-lg group-hover/item:bg-rose-500 transition-all duration-300"><Megaphone className="w-4 h-4 text-rose-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-rose-600 transition-colors">{t("nav.menu.campaigns")}</span>
                    </Link>
                    <Link href="/resource/notice" className="p-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-emerald-50 p-2.5 rounded-lg group-hover/item:bg-emerald-500 transition-all duration-300"><Bell className="w-4 h-4 text-emerald-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-emerald-600 transition-colors">{t("nav.menu.notice")}</span>
                    </Link>
                    <Link href="/resource/media" className="p-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-purple-50 p-2.5 rounded-lg group-hover/item:bg-purple-500 transition-all duration-300"><Image className="w-4 h-4 text-purple-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-purple-600 transition-colors">{t("nav.menu.media")}</span>
                    </Link>
                    <Link href="/resource/research" className="p-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-cyan-50 p-2.5 rounded-lg group-hover/item:bg-cyan-500 transition-all duration-300"><FileText className="w-4 h-4 text-cyan-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-cyan-600 transition-colors">{t("nav.menu.research")}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mega Dropdown: GET INVOLVED */}
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 h-auto outline-none">
              {t("nav.getInvolved")} <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-slate-400 group-hover:text-blue-600" />
            </button>
            <div className="absolute top-[calc(100%-8px)] right-0 invisible opacity-0 translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out w-[350px] pt-4">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-slate-100/50 p-6 text-slate-600 normal-case tracking-normal">
                <div className="space-y-2">
                  <h3 className="text-[11px] uppercase text-slate-400 font-extrabold tracking-[0.2em] border-b border-slate-100 pb-3 mb-4">{t("nav.menu.joinUs")}</h3>
                  <div className="flex flex-col space-y-1">
                    <Link href="/careers" className="p-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-amber-50 p-2.5 rounded-lg group-hover/item:bg-amber-500 transition-all duration-300"><Briefcase className="w-4 h-4 text-amber-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-amber-600 transition-colors">{t("nav.menu.career")}</span>
                    </Link>
                    <Link href="/internship" className="p-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-cyan-50 p-2.5 rounded-lg group-hover/item:bg-cyan-500 transition-all duration-300"><Laptop className="w-4 h-4 text-cyan-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-cyan-600 transition-colors">{t("nav.menu.internship")}</span>
                    </Link>
                    <Link href="/partner" className="p-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-pink-50 p-2.5 rounded-lg group-hover/item:bg-pink-500 transition-all duration-300"><Handshake className="w-4 h-4 text-pink-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-pink-600 transition-colors">{t("nav.menu.partner")}</span>
                    </Link>
                    <Link href="/visit" className="p-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-4 font-semibold text-[15px] text-slate-800 group/item">
                      <div className="bg-slate-50 p-2.5 rounded-lg group-hover/item:bg-slate-500 transition-all duration-300"><Building className="w-4 h-4 text-slate-600 group-hover/item:text-white transition-colors" /></div> 
                      <span className="group-hover/item:text-slate-600 transition-colors">{t("nav.menu.visit")}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end gap-3 sm:gap-6">
          <Link href="/login" className="hidden lg:block text-sm font-bold text-slate-600 hover:text-blue-600 uppercase transition-all duration-300 tracking-wider">
            {t("nav.login")}
          </Link>
          <Link href="/#donate" className="group/btn relative">
            <div className="absolute inset-0 bg-blue-600 rounded-full blur-md opacity-40 group-hover/btn:opacity-60 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full px-6 py-5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg border border-blue-400/20 inline-flex items-center justify-center whitespace-nowrap">
              {t("nav.donate")}
            </div>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 rounded-full hover:bg-blue-50">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    <div className={`fixed inset-0 z-[200] bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMobileMenuOpen(false)}>
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[360px] bg-white shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-white">
            <img src="/logo2.jpeg" alt="WOLT Foundation" className="w-full h-full object-contain scale-[1.4]" />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6 flex flex-col gap-2">
          <Link href="/sdg" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-slate-700 py-3 border-b border-slate-50 hover:text-blue-600 transition-colors">
            {t("nav.sdgs")}
          </Link>
          
          <div className="py-3 border-b border-slate-50">
            <div className="text-lg font-bold text-slate-700 mb-2">{t("nav.aboutUs")}</div>
            <div className="flex flex-col gap-2 pl-4">
              <Link href="/about/vision-mission-values" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.visionMission")}</Link>
              <Link href="/teams/team" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.team")}</Link>
              <Link href="/teams/governing-board" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.governingBoard")}</Link>
            </div>
          </div>

          <div className="py-3 border-b border-slate-50">
            <div className="text-lg font-bold text-slate-700 mb-2">{t("nav.whatWeDo")}</div>
            <div className="flex flex-col gap-2 pl-4">
              <Link href="/programs/mental-health" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.mentalHealth")}</Link>
              <Link href="/programs/climate-change" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.climateChange")}</Link>
              <Link href="/programs/disability-inclusion" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.disabilityInclusion")}</Link>
            </div>
          </div>

          <div className="py-3 border-b border-slate-50">
            <div className="text-lg font-bold text-slate-700 mb-2">{t("nav.resources")}</div>
            <div className="flex flex-col gap-2 pl-4">
              <Link href="/resource/news" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.news")}</Link>
              <Link href="/resource/campaigns" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.campaigns")}</Link>
            </div>
          </div>

          <div className="py-3 border-b border-slate-50">
            <div className="text-lg font-bold text-slate-700 mb-2">{t("nav.getInvolved")}</div>
            <div className="flex flex-col gap-2 pl-4">
              <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.career")}</Link>
              <Link href="/internship" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.internship")}</Link>
              <Link href="/partner" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.partner")}</Link>
              <Link href="/visit" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-blue-600">{t("nav.menu.visit")}</Link>
            </div>
          </div>

          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-slate-700 py-3 border-b border-slate-50 hover:text-blue-600 transition-colors">
            {t("nav.login")}
          </Link>
        </div>
        <div className="p-6 border-t border-slate-100">
          <Link href="/#donate" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6 text-lg font-bold uppercase tracking-wider inline-flex items-center justify-center whitespace-nowrap">
              {t("nav.donate")}
            </div>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
