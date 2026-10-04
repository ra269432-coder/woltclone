"use client";

import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/client";

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await fetchAPI('/api/news/');
        const fallbackImages = [
            "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
            "https://images.pexels.com/photos/4063618/pexels-photo-4063618.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
        ];
        
        setNewsItems(data.map((n: any, idx: number) => ({
            title: n.title,
            date: new Date(n.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            category: n.category || "General",
            image: n.image || fallbackImages[idx % fallbackImages.length],
            excerpt: n.short_description || n.content.substring(0, 150) + "...",
            slug: n.slug
        })));
      } catch (error) {
        console.error("Failed to load news:", error);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80" 
            alt="News & Press" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-blue-400 font-bold tracking-widest uppercase mb-4 block">Resources</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">News & Updates</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">Latest press releases, program launches, and organizational updates from WOLT Foundation.</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 mt-16 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {item.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-4">
                  <Calendar className="w-4 h-4" /> {item.date}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="mt-auto">
                  <Link href={`/resource/news/${item.slug}`} className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors">
            Load More News
          </button>
        </div>
      </section>
    </div>
  );
}
