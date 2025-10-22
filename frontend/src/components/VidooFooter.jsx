import React from 'react';
import { Link } from 'react-router-dom';

export const VidooFooter = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Legal Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/privacy-policy" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link 
              to="/terms-of-service" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} VidooMedia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
