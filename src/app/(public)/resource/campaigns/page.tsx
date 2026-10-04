"use client";

import { Heart, Target, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/client";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const data = await fetchAPI('/api/campaigns/');
        if (data) {
          setCampaigns(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCampaigns();
  }, []);

  const getDaysLeft = (endDate: string) => {
    if (!endDate) return 0;
    const end = new Date(endDate);
    const today = new Date();
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80" 
            alt="Active Campaigns" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-emerald-400 font-bold tracking-widest uppercase mb-4 block">Get Involved</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Active Campaigns</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">Join our ongoing missions. Your direct support funds immediate action on the ground.</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 mt-16 max-w-7xl">
        {campaigns.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            No active campaigns found. Check back soon.
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, idx) => {
              const target = Number(campaign.target_amount) || 1;
              const raised = Number(campaign.raised_amount) || 0;
              const percent = Math.min(100, Math.round((raised / target) * 100));
              const daysLeft = getDaysLeft(campaign.end_date);
              
              const defaultImages = [
                "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80"
              ];
              const image = campaign.image || defaultImages[idx % defaultImages.length];

              return (
                <div key={campaign.id || idx} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={image} 
                      alt={campaign.title} 
                      className="w-full h-full object-cover"
                    />
                    {campaign.status === 'urgent' && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full animate-pulse">
                        Urgent Appeal
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{campaign.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-8">{campaign.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-slate-800">${raised.toLocaleString()} Raised</span>
                        <span className="text-slate-400">Goal: ${target.toLocaleString()}</span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 h-3 rounded-full mb-6 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {campaign.donors_count || 0} Donors</div>
                        <div className="flex items-center gap-1.5 text-orange-600"><Target className="w-4 h-4" /> {daysLeft} Days Left</div>
                      </div>

                      <Link href={`/resource/campaigns/${campaign.slug}`}>
                        <div className="inline-flex justify-center cursor-pointer w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                          <Heart className="w-5 h-5 fill-pink-500 text-pink-500" /> View Campaign
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
