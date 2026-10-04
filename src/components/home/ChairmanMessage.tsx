"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ChairmanMessage() {
  const { t, language } = useLanguage();
  const isBn = language === 'bn';
  const [activeId, setActiveId] = useState<string | null>(null);

  const leaders = [
    {
      id: "pd",
      name: isBn ? "ফারজানা রহমান" : "Farzana Rahman",
      role: isBn ? "প্রোগ্রাম ডিরেক্টর" : "Program Director",
      image: "/images/pd.jpg",
      message: isBn ? [
        "আমাদের প্রোগ্রামগুলি সবচেয়ে ঝুঁকিপূর্ণদের কাছে পৌঁছানোর জন্য ডিজাইন করা হয়েছে, এটি নিশ্চিত করে যে টেকসই উন্নয়নের দিকে আমাদের যাত্রায় কেউ পিছিয়ে না পড়ে।",
        "আমরা তৃণমূল পর্যায়ের প্রভাব তৈরি করার উপর ফোকাস করি যা স্থানীয় সম্প্রদায়গুলিকে স্থিতিস্থাপকতা এবং স্বনির্ভরতা গড়ে তুলতে সক্ষম করে।"
      ] : [
        "Our programs are designed to reach the most vulnerable, ensuring that no one is left behind in our journey toward sustainable development.",
        "We focus on creating grassroots impact that empowers local communities to build resilience and self-reliance."
      ],
      size: "small" // h-[400px]
    },
    {
      id: "chairman",
      name: isBn ? "ড. আব্দুল বারী" : "Dr. Abdul Bari",
      role: isBn ? "চেয়ারম্যান" : "Chairman",
      image: "/images/chairman.jpg",
      message: isBn ? [
        "আমাদের যাত্রা শুরু হয়েছিল একটি সহজ কিন্তু গভীর বিশ্বাস নিয়ে: প্রতিটি ব্যক্তি, তাদের পরিস্থিতি নির্বিশেষে, উন্নতির সুযোগ পাওয়ার যোগ্য। গ্রামীণ বাংলাদেশে আমরা অবিশ্বাস্য স্থিতিস্থাপকতা প্রত্যক্ষ করেছি।",
        "সামাজিক উন্নয়ন এবং মানবিক প্রতিক্রিয়ার প্রতি আমাদের সমন্বিত দৃষ্টিভঙ্গির মাধ্যমে, আমরা কেবল সহায়তা প্রদান করছি না; আমরা টেকসই ইকোসিস্টেম তৈরি করছি। আমাদের লক্ষ্য হলো সম্প্রদায়গুলিকে তাদের নিজস্ব উন্নয়নের নেতৃত্ব দিতে এবং আগামী প্রজন্মের জন্য একটি উজ্জ্বল ভবিষ্যৎ তৈরি করতে সক্ষম করা।"
      ] : [
        "Our journey began with a simple but profound belief: that every individual, regardless of their circumstances, deserves the opportunity to thrive. In rural Bangladesh, we have witnessed incredible resilience.",
        "Through our integrated approach to social development and humanitarian response, we are not just providing aid; we are building sustainable ecosystems. Our goal is to empower communities to lead their own development and create a brighter future for generations to come."
      ],
      size: "large" // h-[500px]
    },
    {
      id: "director",
      name: isBn ? "তরিকুল ইসলাম" : "Tariqul Islam",
      role: isBn ? "পরিচালক" : "Director",
      image: "/images/director.jpg",
      message: isBn ? [
        "অপারেশনাল শ্রেষ্ঠত্ব এবং স্বচ্ছতা আমাদের কাজের মূলভিত্তি। আমরা নিশ্চিত করি যে প্রতিটি অবদান সরাসরি পরিমাপযোগ্য প্রভাবে রূপান্তরিত হয়।",
        "সম্পদ এবং যাদের প্রয়োজন তাদের মধ্যে ব্যবধান দূর করে, আমরা বাংলাদেশে উন্নয়নের জন্য একটি নতুন আখ্যান তৈরি করছি।"
      ] : [
        "Operational excellence and transparency are the cornerstones of our work. We ensure every contribution directly translates to measurable impact.",
        "By bridging the gap between resources and those in need, we are crafting a new narrative for development in Bangladesh."
      ],
      size: "small" // h-[400px]
    }
  ];

  const activeLeader = leaders.find(l => l.id === activeId);

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
              {t("leadership.title")}
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
              {t("leadership.subtitle")}
            </p>
          </motion.div>

          <div className="relative w-full mx-auto flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-8 min-h-[550px]">
            {leaders.map((leader) => (
              <motion.div
                key={leader.id}
                layoutId={`card-${leader.id}`}
                onClick={() => setActiveId(leader.id)}
                className={`relative w-full rounded-[2rem] overflow-hidden cursor-pointer group shadow-xl hover:shadow-2xl transition-shadow flex-shrink-0 ${
                  leader.size === 'large' 
                    ? 'md:w-[350px] h-[500px] z-10' 
                    : 'md:w-[280px] h-[400px] opacity-90 hover:opacity-100'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Image 
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-1 bg-pink-500 rounded-full"></div>
                    <span className="text-pink-400 font-bold tracking-widest uppercase text-xs">{t("leadership.message")}</span>
                  </div>
                  <h3 className={`text-white font-bold mb-1 ${leader.size === 'large' ? 'text-2xl' : 'text-xl'}`}>
                    {leader.name}
                  </h3>
                  <p className={`text-slate-300 font-medium ${leader.size === 'large' ? 'mb-6 text-base' : 'mb-4 text-sm'}`}>
                    {leader.role}
                  </p>
                  
                  <button className="bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md transition-all duration-300 py-2.5 px-4 rounded-full font-bold flex items-center justify-center gap-2 w-full border border-white/30 text-sm">
                    <Quote className="w-3.5 h-3.5" />
                    {t("leadership.read")}
                  </button>
                </div>
              </motion.div>
            ))}

            <AnimatePresence>
              {activeId && activeLeader && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActiveId(null)}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
                  />
                  
                  <motion.div
                    layoutId={`card-${activeLeader.id}`}
                    className="relative w-full max-w-4xl bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh] md:h-[500px]"
                  >
                    {/* Left Side: Photo */}
                    <div className="relative w-full md:w-2/5 h-[250px] md:h-full flex-shrink-0">
                      <Image 
                        src={activeLeader.image}
                        alt={activeLeader.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent"></div>
                    </div>

                    {/* Right Side: Message */}
                    <div className="relative w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center text-left overflow-y-auto">
                      <button 
                        onClick={() => setActiveId(null)}
                        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      
                      <Quote className="w-10 h-10 md:w-12 md:h-12 text-pink-500/50 mb-4 md:mb-6 flex-shrink-0" />
                      
                      <div className="prose prose-invert max-w-none">
                        {activeLeader.message.map((paragraph, idx) => (
                          <p key={idx} className={`text-slate-300 font-medium leading-relaxed ${idx === 0 ? 'italic' : ''} mb-4 md:mb-6 text-sm md:text-base`}>
                            "{paragraph}"
                          </p>
                        ))}
                      </div>

                      <div className="mt-4 md:mt-auto">
                        <h4 className="text-white text-lg md:text-xl font-bold">{activeLeader.name}</h4>
                        <p className="text-pink-400 font-semibold text-sm md:text-base">{activeLeader.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
