"use client";

import { Quote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/client";

export default function StoriesPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStories() {
      try {
        const data = await fetchAPI('/api/stories/');
        const fallbackImages = [
            "/images/story_village.jpg"
        ];
        
        setStories(data.map((s: any, idx: number) => ({
            name: s.title,
            location: s.author || "Bangladesh",
            program: "Impact Story",
            image: s.image || fallbackImages[idx % fallbackImages.length],
            quote: `"${s.content.substring(0, 100)}..."`,
            story: s.content,
            slug: s.slug
        })));
      } catch (error) {
        console.error("Failed to load stories:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="/images/story_village.jpg" 
            alt="Stories of Change" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-pink-400 font-bold tracking-widest uppercase mb-4 block">Impact</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Stories of Change</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">Real people, real impact. Read the inspiring journeys of the individuals whose lives have been transformed.</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 mt-16 max-w-7xl">
        <div className="space-y-16">
          {stories.map((story, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row group">
              <div className="md:w-2/5 relative h-80 md:h-auto overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                  {story.program}
                </div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6 relative">
                  <Quote className="absolute -top-4 -left-4 w-12 h-12 text-pink-100 rotate-180 -z-10" />
                  <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-snug italic relative z-10">
                    "{story.quote}"
                  </p>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900">{story.name}</h3>
                  <p className="text-pink-600 font-medium">{story.location}</p>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  {story.story}
                </p>
                <div>
                  <Link href={`/resource/story/${story.slug}`} className="inline-flex items-center gap-2 text-white bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full font-bold transition-colors shadow-md shadow-pink-600/20">
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
