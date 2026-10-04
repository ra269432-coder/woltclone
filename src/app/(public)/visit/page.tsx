import { MapPin, Mail, CalendarCheck } from "lucide-react";

export default function VisitPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" 
            alt="Visit WOLT HQ" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-blue-400 font-bold tracking-widest uppercase mb-4 block">Get Involved</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Visit WOLT Foundation</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">We welcome researchers, donors, and volunteers to see our impact firsthand.</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 mt-16 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Schedule a Field Visit</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Transparency is at the core of what we do. We encourage our partners and prospective donors to visit our field operations in rural Bangladesh. Due to the sensitive nature of our humanitarian work, all field visits must be scheduled at least 2 weeks in advance.
              </p>
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors inline-flex items-center gap-2">
                <CalendarCheck className="w-5 h-5" /> Request a Visit
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Headquarters</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Address</h4>
                    <p className="text-slate-600">Flat 6B, House 49, Road 28<br/>Gulshan 1, Dhaka<br/>Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-600">info@woltrust.org</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bg-slate-200 rounded-3xl overflow-hidden h-[600px] relative shadow-inner border border-slate-200">
            <iframe 
              src="https://maps.google.com/maps?q=House%2049,%20Road%2028,%20Gulshan%201,%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="WOLT Headquarters Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
