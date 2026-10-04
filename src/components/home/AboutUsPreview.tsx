"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function AboutUsPreview() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const aboutFeatures = [
    {
      title: isBn ? "রূপকল্প, মিশন ও মূল্যবোধ" : "Vision, Mission & Values",
      description: isBn ? "আমাদের উদ্যোগের পেছনের চালিকাশক্তি এবং মূল মূল্যবোধগুলি আবিষ্কার করুন যা আমাদের মিশনকে আগামীকালের দিকে পরিচালিত করে।" : "Discover the driving force behind our initiatives and the core values that guide our mission towards a better tomorrow.",
      icon: Target,
      link: "/about/vision-mission-values",
      color: "bg-blue-600",
      hoverColor: "group-hover:text-blue-600",
      image: "/generated/about_vision_professional.jpg"
    },
    {
      title: isBn ? "আমাদের দল" : "Our Team",
      description: isBn ? "সারা বাংলাদেশ জুড়ে সম্প্রদায়গুলিতে টেকসই প্রভাব তৈরি করতে তাদের জীবন উৎসর্গকারী আবেগী ব্যক্তিদের সাথে দেখা করুন।" : "Meet the passionate individuals who dedicate their lives to making a sustainable impact in communities across Bangladesh.",
      icon: Users,
      link: "/teams/team",
      color: "bg-emerald-600",
      hoverColor: "group-hover:text-emerald-600",
      image: "/generated/about_team_professional.jpg"
    },
    {
      title: isBn ? "পরিচালনা পর্ষদ" : "Governing Board",
      description: isBn ? "অভিজ্ঞ নেতা এবং দূরদর্শীদের সম্পর্কে জানুন যারা WOLT ফাউন্ডেশনকে কৌশলগত দিকনির্দেশনা এবং শাসন প্রদান করেন।" : "Learn about the experienced leaders and visionaries who provide strategic direction and governance to WOLT Foundation.",
      icon: BookOpen,
      link: "/teams/governing-board",
      color: "bg-indigo-600",
      hoverColor: "group-hover:text-indigo-600",
      image: "/generated/about_board_professional.jpg"
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section className="py-12 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px] mix-blend-multiply"></div>
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
            <span className="block text-blue-700 text-[13px] font-black tracking-[0.25em] uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-1 bg-blue-700 inline-block"></span> {isBn ? "আমাদের সম্পর্কে" : "About Us"}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] tracking-tighter leading-[1.1]">
              {isBn ? <>আমরা কারা এবং <br/> আমাদের পথচলার প্রেরণা কী।</> : <>Who We Are & <br/> What Drives Us.</>}
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              {isBn ? "আমরা সারা দেশে টেকসই পরিবর্তন এবং দুর্বল সম্প্রদায়ের ক্ষমতায়নের জন্য প্রতিশ্রুতিবদ্ধ আবেগী ব্যক্তিদের একটি দল।" : "We are a collective of passionate individuals committed to driving sustainable change and empowering vulnerable communities across the nation."}
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {aboutFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link href={feature.link} className="group block h-full outline-none">
                <div className="h-full bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 flex flex-col group relative overflow-hidden hover:-translate-y-2">
                  {/* Image Section (Top half) */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>

                  {/* Card Content (Bottom half) */}
                    <div className="relative flex flex-col flex-grow p-8">
                    <h3 className={`text-2xl font-bold text-[#0F172A] mt-6 mb-4 transition-colors ${feature.hoverColor}`}>
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 mb-8 flex-grow leading-relaxed font-medium">
                      {feature.description}
                    </p>
                    <div className={`mt-auto flex items-center font-bold text-sm tracking-wide text-slate-800 ${feature.hoverColor} transition-colors uppercase`}>
                      {isBn ? "আরও জানুন" : "Learn More"} <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" />
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
