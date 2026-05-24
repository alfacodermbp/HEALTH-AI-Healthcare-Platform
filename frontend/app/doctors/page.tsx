'use client';

import { useEffect, useState } from 'react';
import { getDoctors } from '@/lib/api';
import { MapPin, Building2, UserCircle2, Star, Filter, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { indiaLocations, statesList } from '@/lib/locations';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ specialty: '', state: '', city: '', type: '', search: '', sort: 'rating' });

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await getDoctors(filters);
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [filters]);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'state') {
      setFilters({ ...filters, state: value, city: '' });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Find the Best Doctors</h1>
          <p className="text-gray-600">Browse verified specialists. Filter by budget, ratings, and hospital type.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-lg font-bold text-gray-900">
                <Filter className="h-5 w-5" />
                Filters
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Name/Hospital</label>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="text" 
                      name="search" 
                      value={filters.search} 
                      onChange={handleFilterChange}
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                      placeholder="e.g. Apollo, Dr. Sharma"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <select name="specialty" value={filters.specialty} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none text-sm">
                    <option value="">All Specialties</option>
                    <option value="eye">Ophthalmologist</option>
                    <option value="heart">Cardiologist</option>
                    <option value="skin">Dermatologist</option>
                    <option value="neuro">Neurologist</option>
                    <option value="ortho">Orthopedist</option>
                    <option value="diabetes">Endocrinologist</option>
                    <option value="child">Pediatrician</option>
                    <option value="gynec">Gynecologist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select name="state" value={filters.state} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none text-sm">
                    <option value="">All States</option>
                    {statesList.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select name="city" value={filters.city} onChange={handleFilterChange} disabled={!filters.state} className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none text-sm ${!filters.state ? 'bg-gray-100' : ''}`}>
                    <option value="">{filters.state ? 'All Cities' : 'Select State First'}</option>
                    {filters.state && indiaLocations[filters.state]?.map((c: string) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Type</label>
                  <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none text-sm">
                    <option value="">Govt & Private</option>
                    <option value="govt">Government Hubs (Low/Free Cost)</option>
                    <option value="private">Private Hospitals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select name="sort" value={filters.sort} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none text-sm text-primary-700 font-medium bg-primary-50 border-primary-200">
                    <option value="rating">Highest Rated</option>
                    <option value="experience">Most Experienced</option>
                    <option value="fee_low">Lowest Fee First</option>
                    <option value="fee_high">Highest Fee First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="grid md:grid-cols-2 gap-6 animate-pulse">
                {[1,2,3,4].map(n => <div key={n} className="bg-white h-64 rounded-2xl border border-gray-200"></div>)}
              </div>
            ) : doctors.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No doctors found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                <button onClick={() => setFilters({ specialty: '', state: '', city: '', type: '', search: '', sort: 'rating' })} className="mt-4 text-primary-600 font-medium hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {doctors.map((doc: any) => (
                  <div key={doc.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full">
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4">
                          <div className="relative h-16 w-16 bg-gray-100 rounded-full overflow-hidden shrink-0 border border-gray-200">
                            {/* In a real app we'd use Image component, using icon for demo robust fallback */}
                            <div className="absolute inset-0 flex items-center justify-center bg-primary-50 text-primary-500">
                               <UserCircle2 className="h-10 w-10" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">{doc.name}</h3>
                              {doc.verified && <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Verified</span>}
                            </div>
                            <p className="text-sm font-medium text-gray-600">{doc.specialization}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <span className="font-medium text-yellow-600 flex items-center mr-2"><Star className="h-3 w-3 mr-0.5" fill="currentColor"/> {doc.rating}</span>
                              ({doc.totalReviews} verified reviews)
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                         <div className="flex items-start text-sm text-gray-700">
                          <Building2 className="h-4 w-4 mr-2 text-primary-500 shrink-0 mt-0.5" />
                          <div className="flex flex-col">
                             <span className="font-semibold">{doc.hospital}</span>
                             <span className="text-xs text-gray-500 flex items-center mt-1"><MapPin className="h-3 w-3 mr-1"/> {doc.city}{doc.state ? `, ${doc.state}` : ''}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200">
                           <div className="text-sm">
                             <div className="text-xs text-gray-500">Experience</div>
                             <div className="font-semibold text-gray-900">{doc.experience} Years</div>
                           </div>
                           <div className="text-sm text-right">
                             <div className="text-xs text-gray-500">Consultation Fee</div>
                             <div className="font-bold text-primary-700">₹{doc.consultFee}</div>
                           </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {doc.type === 'govt' && <span className="text-xs font-semibold px-2 py-1 bg-teal-100 text-teal-800 rounded-md">Government Hospital</span>}
                        {doc.ayushman && <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-md">Ayushman Bharat</span>}
                      </div>

                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-3">
                       <Link href={`/doctors/${doc.id}`} className="flex-1 text-center bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                         View Profile
                       </Link>
                       <button className="flex-1 text-center bg-primary-600 text-white font-medium py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                         Book Consult
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
