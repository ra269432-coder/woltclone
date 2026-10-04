"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#020617] text-[#94A3B8] py-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-10">
          
          {/* Column 1: About, Connect (Takes up more space) */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <Link href="/" className="inline-block mb-6 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 hover:border-cyan-400/50 hover:bg-white/15 transition-all duration-300 shadow-2xl">
                <img src="/logo.png" alt="WOLT Foundation" className="h-20 sm:h-24 w-auto object-contain" />
              </Link>
              <p className="text-base md:text-lg font-medium text-slate-300 leading-relaxed max-w-sm">
                {t("footer.tagline")}
              </p>
            </div>

            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-3">{t("footer.connect")}</h3>
              <div className="flex gap-3">
                <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500 hover:border-cyan-400 text-slate-200 hover:text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </Link>
                <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-blue-500 hover:border-blue-400 text-slate-200 hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </Link>
                <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-indigo-600 hover:border-indigo-500 text-slate-200 hover:text-white transition-all duration-300 shadow-lg hover:shadow-indigo-600/25">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="md:col-span-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-4">Useful Links</h3>
            <ul className="space-y-3 text-base md:text-lg font-medium text-slate-300">
              <li><Link href="/" className="group flex items-center hover:text-cyan-400 transition-colors"><ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 mr-2 transition-all" /> Home</Link></li>
              <li><Link href="/about/vision-mission-values" className="group flex items-center hover:text-cyan-400 transition-colors"><ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 mr-2 transition-all" /> About Us</Link></li>
              <li><Link href="/programs" className="group flex items-center hover:text-cyan-400 transition-colors"><ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 mr-2 transition-all" /> Our Programs</Link></li>
              <li><Link href="/resource/media" className="group flex items-center hover:text-cyan-400 transition-colors"><ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 mr-2 transition-all" /> Media & News</Link></li>
              <li><Link href="#donate" className="group flex items-center hover:text-cyan-400 transition-colors"><ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 mr-2 transition-all" /> Donate Now</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-4">
            <h3 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-4">{t("footer.contact")}</h3>
            <div className="flex flex-col gap-3 text-sm md:text-base font-medium text-slate-300">
              
              {/* Bangladesh Office */}
              <div>
                <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">Bangladesh Office</h4>
                <div className="flex items-start gap-3 group mb-1.5">
                  <div className="mt-0.5 bg-white/5 p-1 rounded-lg group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <p className="leading-relaxed group-hover:text-slate-100 transition-colors">
                    Gulshan 1, Dhaka.
                  </p>
                </div>
              </div>

              {/* General Email */}
              <div className="pt-2 border-t border-white/5">
                <div className="flex items-center gap-3 group">
                  <div className="bg-white/5 p-1 rounded-lg group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href="mailto:info@woltrust.org" className="hover:text-cyan-400 transition-colors block">info@woltrust.org</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <Link href="/privacy" className="text-slate-300 font-bold hover:text-white hover:underline transition-colors text-sm uppercase tracking-wider">
              {t("footer.privacy")}
            </Link>
          </div>
          <div className="text-slate-400 text-center md:text-right font-medium text-sm">
            {t("footer.copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
}
