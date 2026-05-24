'use client';

import { useState, useRef } from 'react';
import { analyzeReportMock } from '@/lib/api';
import { FileText, UploadCloud, Loader2, CheckCircle, AlertTriangle, XCircle, HeartPulse, Stethoscope, Activity } from 'lucide-react';
import Link from 'next/link';

export default function ReportAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setProcessing(true);
      
      // Attempt to guess type from file name, for demo
      let type = 'general';
      const name = file.name.toLowerCase();
      if (name.includes('blood') || name.includes('cbc')) type = 'blood';
      if (name.includes('eye') || name.includes('vision') || name.includes('iop')) type = 'eye';
      if (name.includes('mri')) type = 'mri';

      // Call API
      analyzeReportMock({ reportType: type, fileName: file.name })
        .then(data => {
          if (data.success) {
            setResult(data);
          }
        })
        .finally(() => {
          setProcessing(false);
        });

    }, 2000);
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Medical Report Analyzer</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Upload your lab reports, prescriptions, or discharge summaries. Our OCR + AI engine will extract key values and explain them in simple language.</p>
        </div>

        {!result && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div 
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors
                ${file ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setFile(e.dataTransfer.files[0]);
                }
              }}
            >
              {file ? (
                <div>
                  <FileText className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{file.name}</h3>
                  <p className="text-sm text-gray-500 mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button 
                    onClick={resetForm}
                    className="text-sm text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded border border-red-200 bg-white"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div 
                  className="cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Click or drag file to upload</h3>
                  <p className="text-sm text-gray-500 mb-4">Support for PDF, JPG, PNG (Max 5MB)</p>
                  <div className="mx-auto inline-flex items-center text-primary-600 font-semibold px-4 py-2 border border-primary-200 rounded-lg bg-white shadow-sm">
                    Browse Files
                  </div>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>

            <div className="mt-8">
              <button 
                onClick={handleUpload}
                disabled={!file || uploading || processing}
                className="w-full flex justify-center items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {uploading ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Uploading...</>
                ) : processing ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Extracting Data (OCR)...</>
                ) : (
                  'Analyze Report'
                )}
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg flex items-start gap-3 border border-yellow-200">
              <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <span className="font-semibold block mb-1">Data Privacy Guarantee</span>
                Your medical files are processed securely. We don't store them permanently unless you explicitly save them to your Health Vault.
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Analysis Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                 <div className="flex items-center gap-3">
                   <div className="bg-primary-100 p-2 rounded-lg">
                     <FileText className="h-6 w-6 text-primary-700" />
                   </div>
                   <div>
                     <h2 className="text-xl font-bold text-gray-900">{result.fileName}</h2>
                     <p className="text-sm text-gray-500">Analyzed on {new Date(result.timestamp).toLocaleString()}</p>
                   </div>
                 </div>
                 <div className={`px-4 py-2 rounded-full border flex items-center gap-2 font-semibold ${
                   result.severity === 'normal' ? 'bg-green-50 text-green-700 border-green-200' :
                   result.severity === 'needs_attention' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                   'bg-red-50 text-red-700 border-red-200'
                 }`}>
                   {result.severity === 'normal' && <CheckCircle className="h-4 w-4" />}
                   {result.severity === 'needs_attention' && <AlertTriangle className="h-4 w-4" />}
                   {result.severity === 'critical' && <XCircle className="h-4 w-4" />}
                   {result.severityLabel.label}
                 </div>
               </div>

               <div className="p-6 md:p-8">
                 <h3 className="text-lg font-bold text-gray-900 mb-4">AI Summary</h3>
                 <p className="text-gray-700 text-lg mb-6 leading-relaxed bg-blue-50 p-4 rounded-xl border border-blue-100">{result.analysis.summary}</p>
                 
                 <div className="grid md:grid-cols-2 gap-8">
                   <div>
                     <h4 className="font-semibold text-gray-900 mb-4 mt-2 uppercase tracking-wide text-sm opacity-70">Key Findings</h4>
                     <ul className="space-y-3">
                       {result.analysis.findings.map((f: string, i: number) => (
                         <li key={i} className="flex gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                           <span className="shrink-0">{f.startsWith('⚠️') ? '⚠️' : f.startsWith('✅') ? '✅' : '•'}</span>
                           <span>{f.replace('⚠️ ', '').replace('✅ ', '')}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                   <div>
                     <h4 className="font-semibold text-gray-900 mb-4 mt-2 uppercase tracking-wide text-sm opacity-70">Recommendations</h4>
                     <ul className="space-y-2">
                       {result.recommendations.map((r: string, i: number) => (
                         <li key={i} className="flex items-center gap-2 text-gray-700">
                           <CheckCircle className="h-4 w-4 text-primary-500" />
                           {r}
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>
               </div>
            </div>

            {/* Extracted Values Table */}
            {result.extractedData.labels.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-gray-500" />
                    Extracted Values (OCR)
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm border-b uppercase tracking-wider">
                      <tr>
                        <th className="font-medium p-4">Parameter</th>
                        <th className="font-medium p-4">Report Value</th>
                        <th className="font-medium p-4">Normal Range</th>
                        <th className="font-medium p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {result.extractedData.labels.map((item: any, i: number) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="p-4 text-gray-900 font-medium">{item.name}</td>
                          <td className="p-4 text-gray-900 font-bold">{item.value}</td>
                          <td className="p-4 text-gray-500">{item.normal}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              item.status === 'normal' || item.status === 'info' ? 'bg-green-100 text-green-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center pt-4">
              <button onClick={resetForm} className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
                Analyze Another Report
              </button>
              <Link href="/doctors" className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm cursor-pointer">
                <Stethoscope className="h-5 w-5" />
                Find a Doctor
              </Link>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-500 bg-gray-100 p-4 rounded-xl">
              {result.disclaimer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
