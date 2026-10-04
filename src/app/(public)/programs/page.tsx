"use client";

import { ArrowLeft, Package, HeartPulse, GraduationCap, CheckCircle2, Globe, Users, Award } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/client";

const VISUAL_STYLES = [
  { icon: <Package className="w-8 h-8 text-orange-600" />, color: "bg-orange-50", iconColor: "text-orange-600", borderColor: "border-orange-200" },
  { icon: <HeartPulse className="w-8 h-8 text-emerald-600" />, color: "bg-emerald-50", iconColor: "text-emerald-600", borderColor: "border-emerald-200" },
  { icon: <GraduationCap className="w-8 h-8 text-blue-600" />, color: "bg-blue-50", iconColor: "text-blue-600", borderColor: "border-blue-200" }
];

export default function ProgramsPage() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const data = await fetchAPI('/api/programs/');
        
        const getContextImage = (title: string, defaultImage: string) => {
          const t = (title || "").toLowerCase();
          if (t.includes("humanitarian") || t.includes("disaster") || t.includes("relief")) {
            return "/images/humanitarian_response_bd.jpg";
          }
          if (t.includes("health") && !t.includes("mental")) {
            return "/images/social_development_bd.jpg";
          }
          if (t.includes("climate") || t.includes("environment")) {
            return "/images/hero.jpg";
          }
          if (t.includes("mental")) {
            return "/images/social_development.jpg";
          }
          if (t.includes("disability") || t.includes("inclusion")) {
            return "/images/humanitarian_response.jpg";
          }
          if (t.includes("education") || t.includes("enterprise") || t.includes("youth")) {
            return "/images/social_enterprise_bd.jpg";
          }
          return defaultImage;
        };

        const fallbackImages = [
          "/images/humanitarian_response_bd.jpg", 
          "/images/social_development_bd.jpg", 
          "/images/humanitarian_response.jpg", 
          "/images/social_development.jpg", 
          "/images/hero.jpg", 
          "/images/social_enterprise_bd.jpg"
        ];

        // Apply visual styles based on index
        const mappedData = data.map((prog: any, index: number) => {
          const style = VISUAL_STYLES[index % VISUAL_STYLES.length];
          const fallbackImg = getContextImage(prog.title, fallbackImages[index % fallbackImages.length]);
          return { ...prog, activities: prog.activities_list || [], ...style, id: prog.slug, image: prog.image || fallbackImg };
        });
        setPrograms(mappedData);
      } catch (error) {
        console.error("Failed to load programs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPrograms();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=2000&q=80" 
            alt="WOLT Foundation Programs" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors text-sm mb-6 bg-slate-900/30 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-700">
              <ArrowLeft className="w-4 h-4" /> {isBn ? "হোমে ফিরে যান" : "Back to Home"}
            </Link>
            <span className="block text-blue-400 font-bold tracking-wider uppercase text-sm mb-4">{isBn ? "আমাদের কাজ" : "What We Do"}</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              {isBn ? "আমাদের প্রোগ্রাম ও হস্তক্ষেপ" : "Our Programs & Interventions"}
            </h1>
            <p className="text-xl text-slate-200 leading-relaxed font-medium max-w-2xl">
              {isBn ? "আমরা স্থিতিস্থাপক সম্প্রদায় গড়ে তোলার জন্য ত্রাণ, স্বাস্থ্যসেবা এবং শিক্ষায় টেকসই সমাধান বাস্তবায়ন করে সমগ্র বাংলাদেশে কাজ করি।" : "We operate across Bangladesh, implementing sustainable solutions in relief, healthcare, and education to build resilient communities."}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="flex flex-col items-center text-center p-4">
              <Globe className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-3xl font-bold text-slate-900 mb-2">64</h3>
              <p className="text-slate-600 font-medium uppercase tracking-wide text-sm">{isBn ? "জেলায় পৌঁছেছি" : "Districts Reached"}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Users className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="text-3xl font-bold text-slate-900 mb-2">50,000+</h3>
              <p className="text-slate-600 font-medium uppercase tracking-wide text-sm">{isBn ? "জীবন প্রভাবিত" : "Lives Impacted"}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Award className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="text-3xl font-bold text-slate-900 mb-2">12+</h3>
              <p className="text-slate-600 font-medium uppercase tracking-wide text-sm">{isBn ? "বছরের সেবা" : "Years of Service"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">{isBn ? "সম্প্রদায়ের ক্ষমতায়ন, জীবন পরিবর্তন" : "Empowering Communities, Transforming Lives"}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {isBn ? "আমাদের সামগ্রিক দৃষ্টিভঙ্গি নিশ্চিত করে যে দীর্ঘমেয়াদী টেকসই উন্নয়নের ভিত্তি তৈরি করার সাথে সাথে তাৎক্ষণিক মানবিক চাহিদাগুলি পূরণ করা হয়। নিচে আমাদের হস্তক্ষেপের মূল স্তম্ভগুলি আবিষ্কার করুন।" : "Our holistic approach ensures that immediate humanitarian needs are met while building the foundation for long-term sustainable development. Discover our core pillars of intervention below."}
            </p>
          </div>

          <div className="space-y-32">
            {programs.map((program, index) => (
              <div key={program.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
                
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className={`absolute inset-0 ${program.color} transform -rotate-3 rounded-[3rem] transition-transform duration-500 group-hover:rotate-0`}></div>
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/10"></div>
                  </div>
                  {/* Floating Icon Badge */}
                  <div className={`absolute -bottom-8 ${index % 2 !== 0 ? '-left-8' : '-right-8'} w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 ${program.borderColor} z-10 transform transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                    {program.icon}
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <span className={`inline-block px-4 py-1.5 rounded-full ${program.color} ${program.iconColor} font-bold text-sm tracking-wide uppercase mb-6 border ${program.borderColor}`}>
                    {isBn ? "স্তম্ভ ০" : "Pillar 0"}{index + 1}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                    {program.title}
                  </h2>
                  <h3 className="text-xl text-slate-700 font-semibold mb-6">
                    {program.subtitle}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {program.description}
                  </p>
                  
                  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      {isBn ? "প্রধান হস্তক্ষেপ" : "Key Interventions"}
                    </h4>
                    <ul className="space-y-4">
                      {program.activities.map((activity: string, i: number) => (
                        <li key={i} className="flex items-start gap-4">
                          <CheckCircle2 className={`w-6 h-6 ${program.iconColor} flex-shrink-0 mt-0.5`} />
                          <span className="text-slate-700 font-medium leading-relaxed">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">{isBn ? "আমাদের হস্তক্ষেপ সমর্থন করুন" : "Support Our Interventions"}</h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            {isBn ? "আপনার সমর্থন এই প্রোগ্রামগুলোকে সম্ভব করে তোলে। বাংলাদেশে যাদের সবচেয়ে বেশি প্রয়োজন তাদের কাছে ত্রাণ, স্বাস্থ্য এবং শিক্ষা পৌঁছে দেওয়ার আমাদের মিশনে যোগ দিন।" : "Your support makes these programs possible. Join us in our mission to bring relief, health, and education to those who need it most in Bangladesh."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/visit#donate">
<div className="inline-flex justify-center cursor-pointer w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 active:scale-95">
                {isBn ? "দান করুন" : "Make a Donation"}
              </div>
</Link>
            <Link href="/teams/team">
<div className="inline-flex justify-center cursor-pointer w-full sm:w-auto px-10 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 active:scale-95">
                {isBn ? "আমাদের সাথে অংশীদার হন" : "Partner With Us"}
              </div>
</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
