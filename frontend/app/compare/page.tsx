'use client';

import { useEffect, useState } from 'react';
import { getGovtVsPrivate } from '@/lib/api';
import { Building2, IndianRupee, Clock, ShieldCheck, Search, Info } from 'lucide-react';

export default function ComparePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [specialty, setSpecialty] = useState('heart');

  useEffect(() => {
    setLoading(true);
    getGovtVsPrivate({ specialty })
      .then(res => {
        if (res.success) {
          setData(res);
        }
      })
      .finally(() => setLoading(false));
  }, [specialty]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Govt vs Private <span className="text-primary-600">Comparison Engine</span></h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Make an informed decision. Compare treatment costs, wait times, and facility quality across top Government and Private hospitals in India.</p>
        </div>

        <div className="max-w-xl mx-auto mb-12 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
           <label className="block text-sm font-semibold text-gray-700 mb-2">Select Condition / Specialty</label>
           <select 
             className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-primary-500 focus:border-primary-500 block p-3 outline-none"
             value={specialty}
             onChange={(e) => setSpecialty(e.target.value)}
           >
             <option value="heart">Cardiology (Heart)</option>
             <option value="eye">Ophthalmology (Eye)</option>
             <option value="neuro">Neurology (Brain/Spine)</option>
             <option value="ortho">Orthopedics (Bone/Joint)</option>
             <option value="skin">Dermatology (Skin)</option>
           </select>
        </div>

        {loading ? (
          <div className="flex justify-center my-20">
             <div className="h-16 w-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : data ? (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Government Section */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-teal-100 overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-teal-600"></div>
               <div className="p-8">
                 <div className="flex items-center gap-4 mb-6 pt-2">
                   <div className="h-16 w-16 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
                     <Building2 className="h-8 w-8 text-teal-600" />
                   </div>
                   <div>
                     <h2 className="text-3xl font-heading font-bold text-gray-900">Government</h2>
                     <p className="text-gray-500 font-medium">State & Central Institutes</p>
                   </div>
                 </div>

                 <div className="bg-teal-50 rounded-2xl p-6 mb-8 border border-teal-100">
                   <h3 className="text-teal-900 font-bold mb-4 uppercase tracking-wider text-sm">Key Characteristics</h3>
                   <ul className="space-y-4">
                     <li className="flex items-start gap-4">
                       <div className="bg-white p-2 rounded-lg text-teal-600 shadow-sm"><IndianRupee className="h-5 w-5" /></div>
                       <div>
                         <p className="text-sm text-gray-500 font-medium">Treatment Cost</p>
                         <p className="font-bold text-gray-900">Extremely Low or Free</p>
                       </div>
                     </li>
                     <li className="flex items-start gap-4">
                       <div className="bg-white p-2 rounded-lg text-teal-600 shadow-sm"><Clock className="h-5 w-5" /></div>
                       <div>
                         <p className="text-sm text-gray-500 font-medium">Average Wait Time</p>
                         <p className="font-bold text-gray-900">High (Days to Weeks)</p>
                       </div>
                     </li>
                     <li className="flex items-start gap-4">
                       <div className="bg-white p-2 rounded-lg text-teal-600 shadow-sm"><ShieldCheck className="h-5 w-5" /></div>
                       <div>
                         <p className="text-sm text-gray-500 font-medium">Ayushman Bharat Coverage</p>
                         <p className="font-bold text-gray-900">Yes (100% Accepted)</p>
                       </div>
                     </li>
                   </ul>
                 </div>

                 <div>
                   <h3 className="text-lg font-bold text-gray-900 mb-4 flex justify-between items-center">
                     Top Recommendations
                     <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-normal">Based on AI Rating</span>
                   </h3>
                   <div className="space-y-4">
                     {data.government.map((hosp: any, idx: number) => (
                       <div key={hosp.id} className="flex items-center gap-4 border border-gray-100 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                         <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm shrink-0">#{idx + 1}</div>
                         <div className="flex-grow">
                           <h4 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors">{hosp.name}</h4>
                           <p className="text-xs text-gray-500">{hosp.city}</p>
                         </div>
                         <div className="font-bold text-yellow-500 flex items-center text-sm">⭐ {hosp.rating}</div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </div>

            {/* Private Section */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-blue-100 overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
               <div className="p-8">
                 <div className="flex items-center gap-4 mb-6 pt-2">
                   <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                     <Building2 className="h-8 w-8 text-blue-600" />
                   </div>
                   <div>
                     <h2 className="text-3xl font-heading font-bold text-gray-900">Private</h2>
                     <p className="text-gray-500 font-medium">Corporate Hospitals</p>
                   </div>
                 </div>

                 <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-100">
                   <h3 className="text-blue-900 font-bold mb-4 uppercase tracking-wider text-sm">Key Characteristics</h3>
                   <ul className="space-y-4">
                     <li className="flex items-start gap-4">
                       <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm"><IndianRupee className="h-5 w-5" /></div>
                       <div>
                         <p className="text-sm text-gray-500 font-medium">Treatment Cost</p>
                         <p className="font-bold text-gray-900">High (Thousands to Lakhs)</p>
                       </div>
                     </li>
                     <li className="flex items-start gap-4">
                       <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm"><Clock className="h-5 w-5" /></div>
                       <div>
                         <p className="text-sm text-gray-500 font-medium">Average Wait Time</p>
                         <p className="font-bold text-gray-900">Low (Same or Next Day)</p>
                       </div>
                     </li>
                     <li className="flex items-start gap-4">
                       <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm"><ShieldCheck className="h-5 w-5" /></div>
                       <div>
                         <p className="text-sm text-gray-500 font-medium">Ayushman Bharat Coverage</p>
                         <p className="font-bold text-gray-900">Limited (Depends on hospital)</p>
                       </div>
                     </li>
                   </ul>
                 </div>

                 <div>
                   <h3 className="text-lg font-bold text-gray-900 mb-4 flex justify-between items-center">
                     Top Recommendations
                     <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-normal">Based on AI Rating</span>
                   </h3>
                   <div className="space-y-4">
                     {data.private.map((hosp: any, idx: number) => (
                       <div key={hosp.id} className="flex items-center gap-4 border border-gray-100 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                         <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">#{idx + 1}</div>
                         <div className="flex-grow">
                           <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{hosp.name}</h4>
                           <p className="text-xs text-gray-500">{hosp.city}</p>
                         </div>
                         <div className="font-bold text-yellow-500 flex items-center text-sm">⭐ {hosp.rating}</div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </div>

          </div>
        ) : null}

        {!loading && (
          <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex items-start gap-4 max-w-4xl mx-auto shadow-sm">
            <Info className="h-6 w-6 text-indigo-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-indigo-900 mb-2">Platform Recommendation</h4>
              <p className="text-indigo-800 text-sm leading-relaxed">
                If your condition is an <span className="font-bold">emergency</span> (e.g., heart attack, severe trauma), go to the nearest hospital immediately, regardless of type. If your condition is <span className="font-bold">chronic</span> or requires expensive surgery (e.g., joint replacement) and budget is a constraint, a Government institute like AIIMS or PGI provides world-class care at near-zero cost, provided you can handle the wait list.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
