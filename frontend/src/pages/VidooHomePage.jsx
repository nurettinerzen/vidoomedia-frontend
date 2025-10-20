import React from 'react';
import { Link } from 'react-router-dom';
import { VidooNavbar } from '@/components/VidooNavbar';
import { VidooFooter } from '@/components/VidooFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, BarChart3, Target } from 'lucide-react';

export default function VidooHomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <VidooNavbar />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://customer-assets.emergentagent.com/job_ridemedia/artifacts/yrnre02d_Lucid_Origin_A_realistic_interior_of_a_modern_Uber_or_Lyft_veh_1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in text-white"
            style={{ lineHeight: '1.1' }}
          >
            Revolutionizing<br />
            <span className="text-[#00AEEF]">Rideshare Advertising</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto animate-fade-in">
            Engage riders with smart, location-based video ads. Boost your brand's visibility where it matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-[#00AEEF] hover:bg-[#0099D6] text-white px-8 py-6 text-lg rounded-none font-semibold"
                data-testid="advertise-cta"
              >
                Advertise With Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#00AEEF] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#00AEEF] rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Advertising Preview Section */}
      <section className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              For Brands & Agencies
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Reach thousands of real people every day with targeted, city-wide exposure. 
              Our smart screens optimize delivery by location, time, and behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all hover:-translate-y-2">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <MapPin className="text-[#00AEEF]" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Location-Based Ads</h3>
                <p className="text-gray-400 leading-relaxed">
                  Target specific neighborhoods, business districts, and high-traffic areas with precision.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all hover:-translate-y-2">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="text-[#00AEEF]" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Real-Time Analytics</h3>
                <p className="text-gray-400 leading-relaxed">
                  Track impressions, engagement, and campaign performance with live dashboards.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all hover:-translate-y-2">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <Target className="text-[#00AEEF]" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Hyper-Targeted Campaigns</h3>
                <p className="text-gray-400 leading-relaxed">
                  Reach the right audience at the right time with AI-powered ad optimization.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/advertising">
              <Button 
                size="lg"
                className="bg-[#00AEEF] hover:bg-[#0099D6] text-white px-8 py-6 text-lg rounded-none font-semibold"
              >
                Learn More About Advertising
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-[#00AEEF] mb-2">500+</div>
              <div className="text-gray-400">Active Vehicles</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#00AEEF] mb-2">12</div>
              <div className="text-gray-400">Cities</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#00AEEF] mb-2">2M+</div>
              <div className="text-gray-400">Monthly Impressions</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#00AEEF] mb-2">95%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Banner */}
<div className="relative h-[600px] overflow-hidden" style={{backgroundImage: 'url(/tesla-wrap.jpg)', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundSize: 'cover'}}>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>
  
  {/* Content */}
  <div className="relative h-full flex items-center justify-center text-center px-4">
    <div className="max-w-3xl text-white">
      <h2 className="text-5xl font-bold mb-6">Transform Your Ads Into A Moving Billboard</h2>
      <p className="text-xl mb-8 opacity-90">Professional vehicle wraps that turn heads and grow your brand on every journey</p>
      <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
        Start Your Campaign
      </button>
    </div>
  </div>
</div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join the future of outdoor advertising today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-[#00AEEF] hover:bg-[#0099D6] text-white px-8 py-6 text-lg rounded-none font-semibold"
              >
                Contact Us
              </Button>
            </Link>
            <Link to="/advertising">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#00AEEF] text-[#00AEEF] hover:bg-[#00AEEF] hover:text-black px-8 py-6 text-lg rounded-none font-semibold"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <VidooFooter />
    </div>
  );
}
