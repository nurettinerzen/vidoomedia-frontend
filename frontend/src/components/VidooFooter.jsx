import React from 'react';
import { Link } from 'react-router-dom';

export const VidooFooter = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company */}
          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_ridemedia/artifacts/lfpcmy9s_VidooMedia%20Logo.png"
              alt="VidooMedia"
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-gray-400">
              Transforming rides into moving billboards.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-[#00AEEF] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/advertising" className="text-sm text-gray-400 hover:text-[#00AEEF] transition-colors">
                  Advertising
                </Link>
              </li>
              <li>
                <Link to="/drivers" className="text-sm text-gray-400 hover:text-[#00AEEF] transition-colors">
                  Drivers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-[#00AEEF] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-[#00AEEF] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get Started</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/advertising" className="text-sm text-gray-400 hover:text-[#00AEEF] transition-colors">
                  Become an Advertiser
                </Link>
              </li>
              <li>
                <Link to="/drivers" className="text-sm text-gray-400 hover:text-[#00AEEF] transition-colors">
                  Drive & Earn
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-[#00AEEF] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} VidooMedia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
