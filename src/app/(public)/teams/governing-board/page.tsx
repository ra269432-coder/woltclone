import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ChairmanMessage } from "@/components/home/ChairmanMessage";

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
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')] opacity-20 bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            <div className="relative z-10 p-8 sm:p-12 w-full">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-200 uppercase bg-blue-900/50 rounded-full border border-blue-700/50 backdrop-blur-md">
                WOLT FOUNDATION
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{"Governing Board"}</h1>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-8 sm:p-12">
            
            {/* Leadership Profile Section */}
            <div className="flex flex-col md:flex-row gap-12 items-start">
              
              {/* Image Column */}
              <div className="w-full md:w-1/3 shrink-0">
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <img 
                    src="/images/chairman.png" 
                    alt="Grupado Dash - Chairman" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="mt-6 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-slate-900">Grupado Dash</h2>
                  <p className="text-blue-600 font-semibold mb-2">Chairman & Founder</p>
                  <p className="text-sm text-slate-500">Prestonwood Baptist Church<br/>Way of Light Trust</p>
                </div>
              </div>

              {/* Biography Column */}
              <div className="w-full md:w-2/3 prose prose-slate prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-slate-700 first-letter:text-5xl first-letter:font-bold first-letter:text-blue-700 first-letter:mr-1 first-letter:float-left">
                  Born on 7 September 1952, in the quiet rural stretches of Satkhira—where the Bay of Bengal kisses the land and the Sundarbans breathe with ancient whispers—Grupado Dash entered the world within a devout Hindu family. His childhood was marked by reverence, rituals, and the weight of tradition. Yet, even in those tender years, he felt a stirring—an unseen hand guiding him, a voice calling him toward a truth beyond the boundaries of his inherited faith.
                </p>

                <p className="text-lg leading-relaxed text-slate-700 mt-6">
                  As a young man, he wandered through questions that gnawed at his soul: Why are we sent to earth? What is the message of God? Where does the light dwell? He sought answers in the teachings of priests, masters, and scriptures, but the yearning remained unquenched.
                </p>

                <p className="text-lg leading-relaxed text-slate-700 mt-6">
                  At eighteen, a local pastor placed the Bible in his hands. In its pages, he discovered not merely words, but a living flame—the story of Jesus Christ, the Redeemer. That flame grew into a fire that consumed his doubts and illuminated his path. Against the tide of family opposition, against the loneliness of rejection, he chose the narrow road of faith. By twenty-one, he embraced Christianity fully, bearing the cost of estrangement yet fearing no one but God the Father.
                </p>

                <div className="my-10 pl-6 border-l-4 border-blue-600 bg-blue-50/50 py-4 pr-4 rounded-r-xl">
                  <p className="text-xl italic font-medium text-slate-800 m-0">
                    "His conversion was not a quiet act but a declaration of devotion. His family turned against him, but he stood unshaken, anchored in the love of Christ."
                  </p>
                </div>

                <p className="text-lg leading-relaxed text-slate-700">
                  From those days of youthful defiance and spiritual hunger, he rose into leadership, becoming a founding pastor and later the Chairman of Prestonwood Baptist Church. His vision was never small—he dreamed of a church of all nations, a sanctuary where every community in Bangladesh might hear the gospel and find belonging.
                </p>

                <p className="text-lg leading-relaxed text-slate-700 mt-6">
                  Through decades of ministry, his life has been marked by integrity, truthfulness, and a transparent heart. He is known for the revelatory teaching gift of the Holy Spirit upon him, and for his unwavering commitment to the spiritual growth and maturity of believers. His marriage, spanning over thirty-six years, has been a testament to faith and partnership, blessed with children who carry forward the legacy of devotion.
                </p>

                <p className="text-lg leading-relaxed text-slate-700 mt-6">
                  Grupado Dash’s journey is not merely a biography—it is a parable of struggle and light. From the mangrove shadows of Satkhira to the pulpit of a church that seeks to embrace all nations, his life tells of a man who walked through rejection, wrestled with doubt, and emerged as a bearer of hope. His story is the story of the Way of Light Trust itself: a beacon for the people of Bangladesh, born out of pain, sustained by faith, and shining with the promise of redemption.
                </p>
              </div>
            </div>
            
            {/* Footer Actions */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-slate-900 font-semibold mb-1">Need more information?</p>
                <p className="text-slate-500 text-sm">Our team is ready to answer your questions.</p>
              </div>
              <Link href="/teams/team">
                <div className="inline-flex justify-center cursor-pointer px-8 py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 w-full sm:w-auto active:scale-[0.98]">
                  Contact Our Team
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
