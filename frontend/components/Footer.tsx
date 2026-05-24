import Link from 'next/link';
import { Activity, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-medical-dark text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Activity className="h-8 w-8 text-primary-500" />
              <span className="font-heading font-bold text-2xl tracking-tight text-white">HEALTH</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              AI-powered healthcare decision platform offering transparent doctor recommendations and unbiased medical report analysis.
            </p>
            <div className="text-xs text-gray-500 bg-gray-800 p-3 rounded-lg border border-gray-700">
              Disclaimer: This platform provides AI-assisted guidance, not medical diagnosis.
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">For Patients</h3>
            <ul className="space-y-3">
              <li><Link href="/symptoms" className="hover:text-primary-400 transition-colors">AI Symptom Checker</Link></li>
              <li><Link href="/report-analysis" className="hover:text-primary-400 transition-colors">Medical Report Analyzer</Link></li>
              <li><Link href="/doctors" className="hover:text-primary-400 transition-colors">Find Top Doctors</Link></li>
              <li><Link href="/compare" className="hover:text-primary-400 transition-colors">Govt vs Private Hospitals</Link></li>
              <li><Link href="/vault" className="hover:text-primary-400 transition-colors">Health Vault</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">Platform Info</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/fraud-report" className="hover:text-red-400 transition-colors flex items-center gap-1">Report Fraud</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                <span className="text-sm">123 Healthway Ave, Tech District, Bangalore, 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                <span className="text-sm">+91 1800-HEALTH (Toll Free)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                <span className="text-sm">support@healthplatform.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} HEALTH Platform. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500" /> for transparent healthcare.
          </p>
        </div>
      </div>
    </footer>
  );
}
