"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { use } from "react";

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const response = await fetchAPI(`/api/news/${resolvedParams.slug}/`);
        if (response) {
          setNews(response);
        } else {
          setNews(null);
        }
      } catch (err) {
        console.error(err);
        setNews(null);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0">
          <img
            src={news.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=80"}
            alt={news.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <Link href="/resource/news" className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors text-sm bg-slate-900/50 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-700">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider mb-6">
            {news.category || "News"}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
            {news.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-slate-300 font-medium">
            {news.published_date && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                {new Date(news.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            )}
            {news.author && (
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400" />
                {news.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 -mt-20 relative z-20 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl border border-slate-100">
          {news.short_description && (
            <p className="text-2xl text-slate-800 font-medium leading-relaxed mb-12 italic border-l-4 border-cyan-500 pl-6">
              {news.short_description}
            </p>
          )}
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-loose">
            {news.content.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
