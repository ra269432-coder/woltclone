import { Lightbulb, Leaf, HeartPulse, BrainCircuit, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ResearchPage() {
  const researchAreas = [
    {
      title: "Public Health & Epidemiology",
      description: "Studying disease patterns, healthcare access barriers, and maternal health outcomes in marginalized and remote communities.",
      icon: HeartPulse,
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
    {
      title: "Climate Change Adaptation",
      description: "Assessing ecological vulnerabilities and developing sustainable, community-led resilience models for coastal and flood-prone belts.",
      icon: Leaf,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      title: "Economic Inclusion",
      description: "Evaluating the long-term impact of micro-enterprise, vocational training, and fair-trade models on rural poverty alleviation.",
      icon: Lightbulb,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      title: "Social Interventions",
      description: "Measuring the effectiveness of community-driven awareness campaigns in breaking down social stigmas around mental health and disability.",
      icon: BrainCircuit,
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="bg-slate-900 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.1)_0%,_transparent_60%)]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lightbulb className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Research & Innovation</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            We believe in evidence-based impact. Our research initiatives guide our programs, ensuring every intervention is rooted in data, context, and proven methodologies.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 mt-16 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Research Areas</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Through rigorous field studies, impact evaluations, and community assessments, we continuously work to understand the root causes of the challenges we tackle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {researchAreas.map((area, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${area.bg} ${area.color} group-hover:scale-110 duration-300`}>
                <area.icon className="w-7 h-7" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{area.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {area.description}
              </p>
              <div className="flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-800 transition-colors">
                Explore Findings <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
