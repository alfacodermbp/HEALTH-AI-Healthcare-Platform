import Link from 'next/link';
import { Search, FileText, Activity, ArrowRight, ActivitySquare, ShieldCheck, HeartPulse, Building2, UserCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 -z-10" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary-100/40 to-blue-100/40 blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200 mb-8 mx-auto hover:shadow-md transition-shadow cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-600">AI Engine Online & Ready</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Smarter Healthcare <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                Better Decisions
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Upload your medical reports or describe your symptoms. Our AI will analyze them and recommend the top-rated doctors and most affordable hospitals.
            </p>

            <div className="glass rounded-2xl p-4 md:p-6 shadow-xl max-w-3xl mx-auto ring-1 ring-gray-900/5">
              <div className="flex flex-col md:flex-row gap-4">
                <Link href="/symptoms" className="flex-1 flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-1 text-lg group">
                  <ActivitySquare className="h-6 w-6" />
                  Check Symptoms
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center justify-center font-medium text-gray-400 px-2">OR</div>
                <Link href="/report-analysis" className="flex-1 flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold transition-all hover:border-primary-200 hover:shadow-md text-lg">
                  <FileText className="h-6 w-6 text-primary-600" />
                  Upload Report
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Complete Healthcare Intelligence</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We provide the transparency you need, combining AI insights with verified recommendations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primary-200 transition-colors group">
              <div className="h-14 w-14 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartPulse className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Symptom Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Describe your issues in plain English or Hindi. Our intelligence engine interprets them securely and categorizes severity instantly.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-blue-200 transition-colors group">
              <div className="h-14 w-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Govt vs Private Comparison</h3>
              <p className="text-gray-600 leading-relaxed">
                We show you side-by-side comparisons of exactly what it costs to treat your condition in state-run vs corporate hospitals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-teal-200 transition-colors group">
              <div className="h-14 w-14 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Trust Score</h3>
              <p className="text-gray-600 leading-relaxed">
                Only real patients can review. Every doctor profile clearly displays transparency badges, consultation fees, and approximate surgery costs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Search Specialities */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-12">
             <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Browse by Speciality</h2>
                <p className="text-gray-600">Find the top specialists quickly.</p>
             </div>
             <Link href="/doctors" className="hidden sm:flex text-primary-600 font-semibold hover:text-primary-700 items-center gap-1 group">
               View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
             {['Cardiologist', 'Ophthalmologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Orthopedist', 'Gynecologist', 'General Physician'].map((spec, i) => (
                <Link key={spec} href={`/doctors?specialty=${spec.split(' ')[0].toLowerCase()}`} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center transition-all hover:border-primary-200 hover:-translate-y-1">
                  <div className="h-12 w-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{spec}</h3>
                </Link>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}
