"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import { use } from "react";

export default function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStory() {
      try {
        const response = await fetchAPI(`/api/stories/${resolvedParams.slug}/`);
        if (response) {
          setStory(response);
        } else {
          setStory(null);
        }
      } catch (err) {
        console.error(err);
        setStory(null);
      } finally {
        setLoading(false);
      }
    }
    loadStory();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!story) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0">
            <img 
            src={story.image || "/images/story_village.jpg"} 
            alt={story.title} 
            className="w-full h-full object-cover opacity-30"
            />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <Link href="/resource/story" className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors text-sm bg-slate-900/50 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-700">
              <ArrowLeft className="w-4 h-4" /> Back to Stories
            </Link>
          </div>
          <span className="text-pink-400 font-bold tracking-widest uppercase mb-4 block">Impact Story</span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            {story.title}
          </h1>
          {story.author && (
            <p className="text-xl text-slate-300 font-medium">By {story.author}</p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 -mt-16 relative z-20 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl border border-slate-100 relative">
          <Quote className="absolute top-10 left-10 w-20 h-20 text-pink-50 opacity-50 -z-10 rotate-180" />
          
          <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed font-medium relative z-10">
            {story.content.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx} className={idx === 0 ? "text-2xl text-slate-900 font-bold mb-8 leading-snug" : "mb-6"}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
