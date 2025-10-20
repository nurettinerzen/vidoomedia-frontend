import React from 'react';
import { Link } from 'react-router-dom';

export const VidooFooter = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-400">
            © Vidoomedia. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
