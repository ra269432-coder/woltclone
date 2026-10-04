"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Target, Users, Heart } from "lucide-react";
import { use } from "react";

export default function CampaignDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCampaign() {
      try {
        const response = await fetchAPI(`/api/campaigns/${resolvedParams.slug}/`);
        if (response) {
          setCampaign(response);
        } else {
          setCampaign(null);
        }
      } catch (err) {
        console.error(err);
        setCampaign(null);
      } finally {
        setLoading(false);
      }
    }
    loadCampaign();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!campaign) {
    notFound();
  }

  const getDaysLeft = (endDate: string) => {
    if (!endDate) return 0;
    const end = new Date(endDate);
    const today = new Date();
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const target = Number(campaign.target_amount) || 1;
  const raised = Number(campaign.raised_amount) || 0;
  const percent = Math.min(100, Math.round((raised / target) * 100));
  const daysLeft = getDaysLeft(campaign.end_date);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src={campaign.image || "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=2000&q=80"} 
            alt={campaign.title} 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-5xl">
          <div className="mb-6 flex">
            <Link href="/resource/campaigns" className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors text-sm bg-slate-900/50 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-700">
              <ArrowLeft className="w-4 h-4" /> Back to Campaigns
            </Link>
          </div>
          {campaign.status === 'urgent' && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider mb-6 animate-pulse">
              Urgent Appeal
            </span>
          )}
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            {campaign.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            {campaign.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 -mt-20 relative z-20 max-w-5xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-12">
          
          <div className="flex-grow">
             <h2 className="text-3xl font-bold text-slate-900 mb-6">About this Campaign</h2>
             <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-loose">
               {/* Just repeating description as content since Campaign model currently only has description */}
               <p>{campaign.description}</p>
             </div>
          </div>

          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 sticky top-24">
              <div className="flex justify-between text-lg font-bold mb-2">
                <span className="text-slate-900">${raised.toLocaleString()} Raised</span>
              </div>
              <div className="text-slate-500 mb-6 font-medium">
                Goal: ${target.toLocaleString()}
              </div>
              
              <div className="w-full bg-slate-200 h-4 rounded-full mb-8 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-slate-100">
                  <Users className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-slate-900">{campaign.donors_count || 0}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Donors</div>
                </div>
                <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-slate-100">
                  <Target className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-slate-900">{daysLeft}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Days Left</div>
                </div>
              </div>

              <button className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Heart className="w-5 h-5 fill-pink-500 text-pink-500" /> Donate to this Campaign
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
