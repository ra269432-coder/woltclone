import { ArrowLeft, Heart, Wheat, HeartPulse, BookOpen } from "lucide-react";
import Link from "next/link";

const sdgs = [
  {
    goal: "Goal 1",
    title: "No Poverty",
    description: "Providing essential relief packages and support to the most vulnerable communities in Bangladesh to help eradicate extreme poverty.",
    color: "bg-[#e5243b]",
    icon: <Heart className="w-6 h-6 text-white" />,
    textColor: "text-[#e5243b]",
    lightBg: "bg-white",
    borderColor: "border-[#e5243b]/20",
    hoverBorder: "hover:border-[#e5243b]",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
  },
  {
    goal: "Goal 2",
    title: "Zero Hunger",
    description: "Distributing food relief to ensure no one goes to bed hungry, especially during times of crisis and natural disasters.",
    color: "bg-[#dda63a]",
    icon: <Wheat className="w-6 h-6 text-white" />,
    textColor: "text-[#dda63a]",
    lightBg: "bg-white",
    borderColor: "border-[#dda63a]/20",
    hoverBorder: "hover:border-[#dda63a]",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop"
  },
  {
    goal: "Goal 3",
    title: "Good Health & Well-being",
    description: "Organizing free medical camps and providing healthcare access to underserved populations across all districts.",
    color: "bg-[#4c9f38]",
    icon: <HeartPulse className="w-6 h-6 text-white" />,
    textColor: "text-[#4c9f38]",
    lightBg: "bg-white",
    borderColor: "border-[#4c9f38]/20",
    hoverBorder: "hover:border-[#4c9f38]",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800&auto=format&fit=crop"
  },
  {
    goal: "Goal 4",
    title: "Quality Education",
    description: "Empowering the next generation through comprehensive education programs, ensuring inclusive learning opportunities.",
    color: "bg-[#c5192d]",
    icon: <BookOpen className="w-6 h-6 text-white" />,
    textColor: "text-[#c5192d]",
    lightBg: "bg-white",
    borderColor: "border-[#c5192d]/20",
    hoverBorder: "hover:border-[#c5192d]",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Area */}
          <div className="h-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative flex items-end">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=80')] opacity-20 bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            <div className="relative z-10 p-8 sm:p-12 w-full">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-200 uppercase bg-blue-900/50 rounded-full border border-blue-700/50 backdrop-blur-md">
                WOLT FOUNDATION ALIGNMENT
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Sustainable Development Goals</h1>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-8 sm:p-12">
            <div className="prose prose-slate max-w-none prose-lg">
              <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
                Our mission at the Way of Light Trust (WOLT) Foundation directly supports the United Nations&apos; 2030 Agenda for Sustainable Development. Here is how our core programs align with the global goals.
              </p>
              
              <div className="h-px bg-slate-100 w-full my-10"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-12">
                {sdgs.map((sdg) => (
                  <div 
                    key={sdg.goal} 
                    className={`rounded-3xl border transition-all duration-300 group ${sdg.lightBg} ${sdg.borderColor} ${sdg.hoverBorder} hover:shadow-xl hover:-translate-y-2 overflow-hidden flex flex-col`}
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      <img 
                        src={sdg.image} 
                        alt={sdg.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl shadow-md flex items-center justify-center backdrop-blur-sm ${sdg.color}`}>
                          {sdg.icon}
                        </div>
                        <span className="text-white font-bold tracking-wider uppercase text-sm drop-shadow-md">
                          {sdg.goal}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex-grow">
                      <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-4">{sdg.title}</h3>
                      <p className="text-slate-600 leading-relaxed m-0 p-0 text-[15px]">
                        {sdg.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer Actions */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-slate-900 font-semibold mb-1">Join our mission for a better future</p>
                <p className="text-slate-500 text-sm">Every contribution brings us closer to these goals.</p>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <Link href="/programs" className="w-full sm:w-auto">
<div className="inline-flex justify-center cursor-pointer px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all w-full sm:w-auto active:scale-[0.98]">
                    View Programs
                  </div>
</Link>
                <Link href="/visit#donate" className="w-full sm:w-auto">
<div className="inline-flex justify-center cursor-pointer px-6 py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 w-full sm:w-auto active:scale-[0.98]">
                    Donate Now
                  </div>
</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

