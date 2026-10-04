"use client";

import { Briefcase, ArrowRight, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/client";

export default function CareersPage() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await fetchAPI('/api/jobs/');
        setJobs(data);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80" 
            alt="Careers at WOLT" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-amber-400 font-bold tracking-widest uppercase mb-4 block">
            {isBn ? "জড়িত হন" : "Get Involved"}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            {isBn ? "প্রভাবশালী ক্যারিয়ার গড়ুন" : "Build a Career of Impact"}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {isBn ? "দারিদ্র্য দূরীকরণ এবং টেকসই পরিবর্তন চালনার জন্য নিবেদিত পেশাদারদের একটি বৈচিত্র্যময় দলে যোগ দিন।" : "Join a diverse team of passionate professionals dedicated to eradicating poverty and driving sustainable change."}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 mt-16 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {isBn ? "বর্তমান সুযোগ" : "Current Openings"}
          </h2>
          <p className="text-lg text-slate-600">
            {isBn ? "সারা বাংলাদেশে আমাদের দলে যোগদানের সুযোগগুলি অন্বেষণ করুন।" : "Explore opportunities to join our team across Bangladesh."}
          </p>
        </div>

        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div>
                <span className="text-sm font-bold text-amber-600 uppercase tracking-wider block mb-2">{job.department}</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.employment_type}</span>
                </div>
              </div>
              <div>
                <Link href={`/careers/${job.slug}`}>
                  <button className="w-full md:w-auto px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                    {isBn ? "বিস্তারিত দেখুন" : "View Details"} <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-xl">
          <Briefcase className="absolute -top-10 -right-10 w-48 h-48 text-blue-500/30 rotate-12" />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">{isBn ? "মানানসই কিছু দেখছেন না?" : "Don't see a fit?"}</h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
              {isBn ? "আমরা সবসময় ব্যতিক্রমী প্রতিভার সন্ধান করি। আমাদের ট্যালেন্ট পুলে আপনার জীবনবৃত্তান্ত পাঠান, এবং যখন একটি প্রাসঙ্গিক পদ খোলা হয় তখন আমরা আপনার সাথে যোগাযোগ করব।" : "We are always on the lookout for exceptional talent. Send your resume to our talent pool, and we'll contact you when a relevant position opens up."}
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl transition-colors">
              {isBn ? "সাধারণ আবেদন জমা দিন" : "Submit General Application"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
