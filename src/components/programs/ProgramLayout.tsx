import { ArrowLeft, CheckCircle2, Quote } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Intervention {
  title: string;
  description: string;
  image?: string;
}

interface Stat {
  value: string;
  label: string;
}

interface ProgramLayoutProps {
  title: string;
  subtitle: string;
  heroImage: string;
  challengeText: React.ReactNode;
  approachText: React.ReactNode;
  interventions: Intervention[];
  stats: Stat[];
  quote: {
    text: string;
    author: string;
  };
}

export function ProgramLayout({
  title,
  subtitle,
  heroImage,
  challengeText,
  approachText,
  interventions,
  stats,
  quote,
}: ProgramLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-300 font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur-sm border border-blue-500/30">
            Our Interventions
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-medium drop-shadow-md">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-blue-900 text-white py-12 relative z-20 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-blue-800/50">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center px-4">
              <h3 className="text-4xl font-black text-blue-400 mb-2">{stat.value}</h3>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold mb-12 transition-colors uppercase tracking-wide text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Main Content (Left) */}
            <div className="lg:col-span-8 space-y-16">
              
              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">The Challenge</h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-4">
                  {challengeText}
                </div>
              </div>

              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Approach</h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-4">
                  {approachText}
                </div>
              </div>

            </div>

            {/* Sidebar (Right) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Quote Card */}
              <div className="bg-blue-600 text-white p-10 rounded-3xl relative overflow-hidden shadow-xl shadow-blue-600/20">
                <Quote className="absolute -top-6 -left-6 w-32 h-32 text-blue-500/30 rotate-12" />
                <div className="relative z-10">
                  <p className="text-xl font-medium italic leading-relaxed mb-8">
                    "{quote.text}"
                  </p>
                  <p className="font-bold text-blue-200 tracking-wide uppercase text-sm">
                    — {quote.author}
                  </p>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-slate-900 text-white p-10 rounded-3xl text-center shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Support Our Work</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Your contribution directly funds these critical interventions on the ground.
                </p>
                <Link href="/visit#donate">
                  <div className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold transition-colors inline-flex justify-center cursor-pointer">
                    Make a Donation
                  </div>
                </Link>
              </div>

            </div>
          </div>

          {/* Key Interventions (Full Width) */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Key Interventions</h2>
            <div className={`grid gap-8 ${
              interventions.length === 1 ? 'grid-cols-1 max-w-3xl mx-auto' : 
              interventions.length === 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' : 
              'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {interventions.map((intervention, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full group">
                  {intervention.image ? (
                    <div className="h-56 w-full relative shrink-0 overflow-hidden">
                      <img src={intervention.image} alt={intervention.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="p-8 pb-0 shrink-0">
                      <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                    </div>
                  )}
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{intervention.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{intervention.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
