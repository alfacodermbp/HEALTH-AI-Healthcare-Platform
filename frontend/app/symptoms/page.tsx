'use client';

import { useState } from 'react';
import { getSmartRecommendations } from '@/lib/api';
import { ActivitySquare, Loader2, AlertTriangle, AlertCircle, Building2, UserCircle2, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim() || symptoms.length < 5) return;
    
    setLoading(true);
    try {
      const data = await getSmartRecommendations({ symptoms, city: 'Delhi' }); // defaulting city for demo
      if (data.success) {
        setResult(data);
      }
    } catch (error) {
      console.error('Analysis failed', error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (level: string) => {
    if (level === 'high') return 'bg-red-50 text-red-700 border-red-200';
    if (level === 'medium') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-green-50 text-green-700 border-green-200';
  };

  const getUrgencyIcon = (level: string) => {
    if (level === 'high') return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (level === 'medium') return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    return <ActivitySquare className="h-5 w-5 text-green-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">AI Symptom Checker</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Describe what you're feeling. Our AI will analyze your symptoms, suggest potential conditions, and recommend the right doctors and hospitals for you.</p>
        </div>

        {!result ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <form onSubmit={handleAnalyze}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">How are you feeling today?</label>
              <textarea 
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none resize-none mb-6"
                placeholder="E.g., I have been having severe headaches for 3 days and some blurriness in my right eye..."
              />
              <button 
                type="submit" 
                disabled={loading || symptoms.length < 5}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                {loading ? 'Analyzing...' : 'Analyze Symptoms'}
              </button>
            </form>
            <div className="mt-6 text-xs text-gray-500 flex gap-2 p-3 bg-gray-50 rounded-lg">
              <AlertCircle className="h-4 w-4 shrink-0 text-gray-400" />
              Information provided is analyzed by AI and does not constitute medical advice.
            </div>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* AI Insight Header */}
            <div className={`rounded-2xl border p-6 md:p-8 ${getUrgencyColor(result.analysis.urgency.level)}`}>
               <div className="flex items-start gap-4">
                 <div className="p-3 bg-white/60 rounded-xl shrink-0">
                   {getUrgencyIcon(result.analysis.urgency.level)}
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                     {result.analysis.urgency.label} Assessment
                   </h2>
                   <p className="font-medium mb-4">{result.analysis.urgency.advice}</p>
                   
                   <div className="grid md:grid-cols-2 gap-6 mt-6">
                     <div className="bg-white/60 rounded-xl p-4">
                       <h3 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-70">Possible Conditions</h3>
                       <ul className="space-y-2">
                         {result.analysis.possibleConditions.map((c: any, i: number) => (
                           <li key={i} className="flex justify-between items-center text-sm font-medium">
                             {c.name}
                             <span className="text-xs bg-white px-2 py-1 rounded shadow-sm opacity-80">{c.probability} Match</span>
                           </li>
                         ))}
                       </ul>
                     </div>
                     <div className="bg-white/60 rounded-xl p-4">
                       <h3 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-70">Immediate Actions</h3>
                       <ul className="list-disc pl-5 space-y-1 text-sm font-medium">
                         {result.analysis.immediateActions.map((action: string, i: number) => (
                           <li key={i}>{action}</li>
                         ))}
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Doctors Recommendation */}
            <div>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Recommended Specialists</h2>
                  <p className="text-gray-600">Based on your condition, we recommend consulting a <span className="font-semibold">{result.analysis.recommendedSpecialist}</span>.</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.doctors.map((doctor: any) => (
                  <div key={doctor.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="p-6">
                      <div className="flex gap-4 mb-4">
                        <div className="h-16 w-16 bg-primary-50 rounded-full flex items-center justify-center shrink-0">
                          <UserCircle2 className="h-8 w-8 text-primary-500" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">{doctor.name}</h3>
                          <p className="text-sm text-gray-500">{doctor.specialization} • {doctor.experience} yrs exp</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="truncate">{doctor.hospital}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {doctor.city}
                          </div>
                          <div className="font-semibold text-primary-700">₹{doctor.consultFee} Consult</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {doctor.tags?.slice(0,2).map((tag: string) => (
                           <span key={tag} className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                             {tag}
                           </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Govt vs Private Hospital Comparison */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Where to get treated? (Govt vs Private)</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                 {/* Govt */}
                 <div className="bg-white rounded-2xl border-2 border-teal-100 overflow-hidden shadow-sm">
                   <div className="bg-teal-50 px-6 py-4 border-b border-teal-100 flex justify-between items-center">
                     <h3 className="font-bold text-lg text-teal-900">Government Hospitals</h3>
                     <span className="text-xs font-bold text-teal-700 bg-teal-100 px-3 py-1 rounded-full uppercase tracking-wider">{result.comparison.govt.tag}</span>
                   </div>
                   <div className="p-6">
                     <div className="grid grid-cols-2 gap-4 mb-6">
                       <div className="bg-gray-50 p-3 rounded-lg">
                         <div className="text-xs text-gray-500 mb-1">Estimated Cost</div>
                         <div className="font-semibold text-gray-900">{result.comparison.govt.cost}</div>
                       </div>
                       <div className="bg-gray-50 p-3 rounded-lg">
                         <div className="text-xs text-gray-500 mb-1">Wait Time</div>
                         <div className="font-semibold text-gray-900">{result.comparison.govt.waitTime}</div>
                       </div>
                     </div>
                     <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Govt Options for your condition:</h4>
                     <ul className="space-y-3">
                       {result.govtHospitals.map((h: any) => (
                         <li key={h.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                           <span className="font-medium text-gray-900">{h.shortName}</span>
                           <span className="flex items-center text-yellow-500 font-medium">⭐ {h.rating}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>

                 {/* Private */}
                 <div className="bg-white rounded-2xl border-2 border-blue-100 overflow-hidden shadow-sm">
                   <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
                     <h3 className="font-bold text-lg text-blue-900">Private Hospitals</h3>
                     <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">{result.comparison.private.tag}</span>
                   </div>
                   <div className="p-6">
                     <div className="grid grid-cols-2 gap-4 mb-6">
                       <div className="bg-gray-50 p-3 rounded-lg">
                         <div className="text-xs text-gray-500 mb-1">Estimated Cost</div>
                         <div className="font-semibold text-gray-900">{result.comparison.private.cost}</div>
                       </div>
                       <div className="bg-gray-50 p-3 rounded-lg">
                         <div className="text-xs text-gray-500 mb-1">Wait Time</div>
                         <div className="font-semibold text-gray-900">{result.comparison.private.waitTime}</div>
                       </div>
                     </div>
                     <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Private Options for your condition:</h4>
                     <ul className="space-y-3">
                       {result.privateHospitals.map((h: any) => (
                         <li key={h.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                           <span className="font-medium text-gray-900">{h.shortName}</span>
                           <span className="flex items-center text-yellow-500 font-medium">⭐ {h.rating}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>
              </div>
            </div>
            
            <div className="text-center pt-8 border-t">
              <button onClick={() => setResult(null)} className="text-primary-600 font-semibold hover:text-primary-700">Check another symptom</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
