"use client";

import { useEffect, useState } from "react";
import { ProgramLayout } from "@/components/programs/ProgramLayout";
import { fetchAPI } from "@/lib/api/client";
import { notFound } from "next/navigation";

export function ProgramClient({ slug }: { slug: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchAPI(`/api/programs/${slug}/`);
        if (response) {
          setData(response);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    notFound();
  }

  // Helper to render text with paragraphs
  const renderText = (text: string) => {
    if (!text) return null;
    return (
      <>
        {text.split('\n\n').map((paragraph: string, idx: number) => (
          <p key={idx} className="mb-4">{paragraph}</p>
        ))}
      </>
    );
  };

  const getInterventionImage = (title: string) => {
    const t = (title || "").toLowerCase().trim();

    // --- Exact title matches for unique, non-repeated photos ---
    // Health Coverage page
    if (t === "mobile health clinics" || t === "mobile clinics") return "/images/health_mobile_clinic.jpg";
    if (t === "maternal & child health" || t === "maternal care") return "/images/health_maternal.jpg";
    if (t === "subsidized critical care" || t === "critical care") return "/images/health_critical_care.jpg";
    if (t === "health worker training") return "/images/health_worker_training.jpg";
    // Mental Health page
    if (t === "psychosocial counseling") return "/images/prog_counseling.jpg";
    if (t === "community awareness") return "/images/prog_awareness.jpg";
    if (t === "crisis intervention") return "/images/prog_crisis.jpg";
    if (t === "capacity building") return "/images/prog_capacity.jpg";
    // Disability Inclusion page
    if (t === "assistive technology") return "/images/disability_assistive.jpg";
    if (t === "inclusive education") return "/images/disability_education.jpg";
    if (t === "vocational rehabilitation") return "/images/disability_vocational.jpg";
    if (t === "rights & accessibility advocacy" || t === "rights and accessibility advocacy") return "/images/disability_advocacy.jpg";
    // Advocacy for Social Change page
    if (t === "rights awareness workshops") return "https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "gender equality campaigns") return "https://images.pexels.com/photos/6646916/pexels-photo-6646916.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "policy research & lobbying") return "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "grassroots leadership") return "https://images.pexels.com/photos/7693218/pexels-photo-7693218.jpeg?auto=compress&cs=tinysrgb&w=600";
    // Bashundhara Enterprise page
    if (t === "micro-financing") return "https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "fair-trade market linkages") return "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "agricultural modernization") return "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "women's economic empowerment") return "/images/story_cumilla.jpg";
    // Climate Change page
    if (t === "reforestation initiatives") return "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "climate-resilient agriculture") return "https://images.pexels.com/photos/2132058/pexels-photo-2132058.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "renewable energy access") return "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "environmental education") return "https://images.pexels.com/photos/8471938/pexels-photo-8471938.jpeg?auto=compress&cs=tinysrgb&w=600";
    // Disaster Preparedness page
    if (t === "early warning systems") return "/images/disaster_warning.jpg";
    if (t === "emergency relief distribution") return "/images/disaster_relief.jpg";
    if (t === "resilient infrastructure") return "/images/disaster_infrastructure.jpg";
    if (t === "post-disaster rehabilitation") return "/images/disaster_rehabilitation.jpg";
    // Teer Enterprise page
    if (t === "fortified food production") return "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "school nutrition programs") return "/images/prog_education.jpg";
    if (t === "local supply chain integration") return "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "sustainable reinvestment") return "https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg?auto=compress&cs=tinysrgb&w=600";
    // Humanitarian Response activities
    if (t === "food distribution") return "/images/prog_food.jpg";
    if (t === "emergency shelter") return "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t === "medical aid") return "/images/prog_health.jpg";

    // --- Keyword-based fallback matching ---
    if (t.includes("food") || t.includes("nutrition") || t.includes("meal") || t.includes("fortif")) return "/images/prog_food.jpg";
    if (t.includes("mobile") || t.includes("clinic") || t.includes("dental") || t.includes("eye") || t.includes("check-up")) return "/images/prog_health.jpg";
    if (t.includes("maternal") || t.includes("prenatal") || t.includes("immunization")) return "https://images.pexels.com/photos/6941883/pexels-photo-6941883.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("critical") || t.includes("hospital") || t.includes("subsidized") || t.includes("chronic")) return "https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("health") && (t.includes("worker") || t.includes("midwi"))) return "https://images.pexels.com/photos/5214961/pexels-photo-5214961.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("health") || t.includes("medical")) return "/images/prog_health.jpg";
    if (t.includes("assistive") || t.includes("wheelchair") || t.includes("prosthetic")) return "https://images.pexels.com/photos/6306218/pexels-photo-6306218.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("inclusive") || t.includes("special educ")) return "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("vocational") || t.includes("employment") || t.includes("livelihood")) return "https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("gender") || t.includes("equality")) return "https://images.pexels.com/photos/6646916/pexels-photo-6646916.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("policy") || t.includes("research") || t.includes("lobby")) return "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("leadership") || t.includes("grassroots")) return "https://images.pexels.com/photos/7693218/pexels-photo-7693218.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("advocacy") || t.includes("rights") || t.includes("accessibility") || t.includes("stigma")) return "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("micro") || t.includes("loan") || t.includes("financ")) return "https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("market") || t.includes("trade") || t.includes("supply chain")) return "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("agri") || t.includes("farm") || t.includes("crop") || t.includes("seed")) return "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("solar") || t.includes("energy") || t.includes("renewable")) return "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("reforest") || t.includes("tree") || t.includes("plant")) return "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("climate") || t.includes("environment") || t.includes("green")) return "https://images.pexels.com/photos/2132058/pexels-photo-2132058.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("early warning") || t.includes("siren") || t.includes("evacuate")) return "https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("shelter") || t.includes("cyclone") || t.includes("infrastructure")) return "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("disaster") || t.includes("emergency") || t.includes("relief") || t.includes("crisis")) return "/images/prog_crisis.jpg";
    if (t.includes("rehabilitation") || t.includes("rebuild") || t.includes("restore")) return "/images/story_sylhet.jpg";
    if (t.includes("supply chain") || t.includes("reinvest")) return "https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg?auto=compress&cs=tinysrgb&w=600";
    if (t.includes("education") || t.includes("school") || t.includes("class")) return "/images/prog_education.jpg";
    if (t.includes("training") || t.includes("workshop") || t.includes("skill")) return "/images/prog_capacity.jpg";
    if (t.includes("awareness") || t.includes("campaign")) return "/images/prog_awareness.jpg";
    if (t.includes("water") || t.includes("sanitation") || t.includes("hygiene")) return "/images/prog_water.jpg";
    if (t.includes("counseling") || t.includes("therapy") || t.includes("mental") || t.includes("psycho")) return "/images/prog_counseling.jpg";
    if (t.includes("youth") || t.includes("digital") || t.includes("literacy") || t.includes("computer")) return "/images/story_dhaka.jpg";
    if (t.includes("women") || t.includes("girl") || t.includes("empower")) return "/images/story_cumilla.jpg";
    if (t.includes("capacity") || t.includes("build")) return "/images/prog_capacity.jpg";
    // Generic fallback
    return "/images/prog_capacity.jpg";
  };

  // Helper to format activities as interventions if interventions are empty
  const getInterventions = () => {
    let acts: any[] = [];
    if (data.interventions && data.interventions.length > 0) {
      acts = data.interventions;
    } else if (data.activities_list && data.activities_list.length > 0) {
      acts = data.activities_list.map((act: string) => ({
        title: act.trim(),
        description: ""
      }));
    } else if (data.activities) {
      // If activities is a python string representation of a list "['item', 'item2']"
      if (data.activities.trim().startsWith('[') && data.activities.trim().endsWith(']')) {
        const matches = data.activities.match(/['"](.*?)['"]/g);
        if (matches) {
          acts = matches.map((m: string) => ({
            title: m.slice(1, -1).trim(),
            description: ""
          }));
        }
      } else {
        const splitActs = data.activities.includes('\n') ? data.activities.split('\n') : data.activities.split(',');
        acts = splitActs.map((act: string) => ({
          title: act.trim(),
          description: ""
        }));
      }
    }
    
    return acts.filter((act: any) => act.title).map((act: any) => ({
      ...act,
      image: act.image || getInterventionImage(act.title)
    }));
  };

  const getContextImage = (title: string, defaultImage: string) => {
    const t = (title || "").toLowerCase();
    if (t.includes("humanitarian") || t.includes("disaster") || t.includes("relief")) {
      return "/images/humanitarian_response_bd.jpg";
    }
    if (t.includes("health") && !t.includes("mental")) {
      return "/images/social_development_bd.jpg";
    }
    if (t.includes("climate") || t.includes("environment")) {
      return "/images/hero.jpg";
    }
    if (t.includes("mental")) {
      return "/images/social_development.jpg";
    }
    if (t.includes("disability") || t.includes("inclusion")) {
      return "/images/humanitarian_response.jpg";
    }
    if (t.includes("education") || t.includes("enterprise") || t.includes("youth")) {
      return "/images/social_enterprise_bd.jpg";
    }
    return defaultImage;
  };

  return (
    <ProgramLayout
      title={data.title}
      subtitle={data.subtitle}
      heroImage={data.image || getContextImage(data.title, "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80")}
      stats={data.stats || []}
      challengeText={renderText(data.challenge_text || data.description)}
      approachText={renderText(data.approach_text || "We work closely with local communities to deliver sustainable and impactful solutions.")}
      interventions={getInterventions()}
      quote={{
        text: data.quote_text || "",
        author: data.quote_author || ""
      }}
    />
  );
}
