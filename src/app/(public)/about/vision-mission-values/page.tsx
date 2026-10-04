"use client";

import { ArrowLeft, Eye, Target, Diamond } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const principles = [
    {
      id: "vision",
      title: isBn ? "আমাদের রূপকল্প" : "Our Vision",
      description: isBn ? "দারিদ্র্যমুক্ত একটি সমাজ, যেখানে প্রত্যেকেরই তাদের প্রকৃত সম্ভাবনা উপলব্ধি করতে এবং মর্যাদার সাথে জীবনযাপন করার জন্য শিক্ষা এবং স্বাস্থ্যসেবার অ্যাক্সেস রয়েছে।" : "A society free from poverty, where everyone has access to education and healthcare to realize their true potential and live with dignity.",
      color: "bg-blue-600",
      icon: <Eye className="w-6 h-6 text-white" />,
      textColor: "text-blue-600",
      lightBg: "bg-white",
      borderColor: "border-blue-600/20",
      hoverBorder: "hover:border-blue-600",
      image: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "mission",
      title: isBn ? "আমাদের মিশন" : "Our Mission",
      description: isBn ? "প্রয়োজনীয় ত্রাণ, চিকিৎসা পরিচর্যা এবং শিক্ষামূলক কর্মসূচী প্রদান করে দারিদ্র্য, নিরক্ষরতা এবং রোগের পরিস্থিতিতে মানুষ এবং সম্প্রদায়কে ক্ষমতায়ন করা।" : "To empower people and communities in situations of poverty, illiteracy, and disease by providing essential relief, medical care, and educational programs.",
      color: "bg-orange-500",
      icon: <Target className="w-6 h-6 text-white" />,
      textColor: "text-orange-500",
      lightBg: "bg-white",
      borderColor: "border-orange-500/20",
      hoverBorder: "hover:border-orange-500",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "values",
      title: isBn ? "মূল মান" : "Core Values",
      description: isBn ? "উদ্ভাবন, সততা, অন্তর্ভুক্তি এবং কার্যকারিতা। আমরা যা কিছু করি তাতে আমরা স্বচ্ছতা, সহানুভূতি এবং টেকসই প্রভাবের প্রতি প্রতিশ্রুতিবদ্ধ।" : "Innovation, Integrity, Inclusiveness, and Effectiveness. We are committed to transparency, compassion, and sustainable impact in everything we do.",
      color: "bg-emerald-600",
      icon: <Diamond className="w-6 h-6 text-white" />,
      textColor: "text-emerald-600",
      lightBg: "bg-white",
      borderColor: "border-emerald-600/20",
      hoverBorder: "hover:border-emerald-600",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> {isBn ? "হোমে ফিরে যান" : "Back to Home"}
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Area */}
          <div className="h-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative flex items-end">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=2000&q=80')] opacity-20 bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            <div className="relative z-10 p-8 sm:p-12 w-full">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-200 uppercase bg-blue-900/50 rounded-full border border-blue-700/50 backdrop-blur-md">
                {isBn ? "WOLT ফাউন্ডেশনের নীতি" : "WOLT FOUNDATION PRINCIPLES"}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{isBn ? "রূপকল্প, মিশন ও মূল্যবোধ" : "Vision, Mission & Values"}</h1>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-8 sm:p-12">
            <div className="prose prose-slate max-w-none prose-lg">
              <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium max-w-3xl">
                {isBn ? "মূল নীতি যা আমাদের কাজকে পরিচালিত করে। আমরা এমন একটি বিশ্বের কল্পনা করি যেখানে প্রতিটি ব্যক্তির উন্নতির সুযোগ রয়েছে, টেকসই প্রভাবের প্রতি আমাদের অটল প্রতিশ্রুতি দ্বারা সমর্থিত।" : "The core principles that guide our work. We envision a world where every individual has the opportunity to thrive, supported by our unwavering commitment to sustainable impact."}
              </p>
              
              <div className="h-px bg-slate-100 w-full my-10"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-12">
                {principles.map((item) => (
                  <div 
                    key={item.id} 
                    className={`rounded-3xl border transition-all duration-300 group ${item.lightBg} ${item.borderColor} ${item.hoverBorder} hover:shadow-xl hover:-translate-y-2 overflow-hidden flex flex-col`}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl shadow-md flex items-center justify-center backdrop-blur-sm ${item.color}`}>
                          {item.icon}
                        </div>
                        <span className={`text-white font-bold tracking-wider uppercase text-sm drop-shadow-md`}>
                          {item.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex-grow">
                      <p className="text-slate-600 leading-relaxed m-0 p-0 text-[15px]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer Actions */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-slate-900 font-semibold mb-1">{isBn ? "আমাদের মিশনে অংশ হতে চান?" : "Want to be part of our mission?"}</p>
                <p className="text-slate-500 text-sm">{isBn ? "একটি টেকসই প্রভাব তৈরি করতে আমাদের সাথে যোগ দিন।" : "Join us in making a sustainable impact."}</p>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <Link href="/programs" className="w-full sm:w-auto">
<div className="inline-flex justify-center cursor-pointer px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all w-full sm:w-auto active:scale-[0.98]">
                    {isBn ? "প্রোগ্রাম অন্বেষণ করুন" : "Explore Programs"}
                  </div>
</Link>
                <Link href="/teams/team" className="w-full sm:w-auto">
<div className="inline-flex justify-center cursor-pointer px-6 py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 w-full sm:w-auto active:scale-[0.98]">
                    {isBn ? "আমাদের দলে যোগ দিন" : "Join Our Team"}
                  </div>
</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
