import React from 'react';
import { VidooNavbar } from '@/components/VidooNavbar';
import { VidooFooter } from '@/components/VidooFooter';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, TrendingUp, Zap } from 'lucide-react';

export default function VidooAboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <VidooNavbar />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            About VidooMedia
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in">
            Revolutionizing outdoor advertising through smart in-car displays
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <div className="w-20 h-1 bg-[#00AEEF] mx-auto mb-8"></div>
          </div>
          
          <div className="text-lg text-gray-300 leading-relaxed space-y-6">
            <p>
              <span className="text-[#00AEEF] font-semibold text-2xl">"To turn every ride into an opportunity for brands and drivers alike."</span>
            </p>
            
            <p>
              VidooMedia is transforming the way brands connect with real-world audiences. We've created a smart advertising network that leverages in-car digital screens to deliver targeted, high-engagement campaigns to passengers during their rideshare journeys.
            </p>
            
            <p>
              Founded with the vision of creating a win-win ecosystem, we help drivers earn passive income while enabling brands to reach consumers in a captive, attention-rich environment. Our technology-driven approach combines GPS targeting, real-time analytics, and AI optimization to deliver measurable results.
            </p>

            <p>
              With 500+ active vehicles across 12 major cities and growing, we're building the future of outdoor advertising—one ride at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <Target className="text-[#00AEEF]" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Pushing boundaries with cutting-edge ad tech and smart targeting
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <Users className="text-[#00AEEF]" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Partnership</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Building lasting relationships with drivers and advertisers
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-[#00AEEF]" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Results</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Delivering measurable outcomes that drive business growth
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <Zap className="text-[#00AEEF]" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Efficiency</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Making advertising and earning simple and seamless
                </p>
              </CardContent>
            </Card>
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
              <div className="text-5xl font-bold text-[#00AEEF] mb-2">$500</div>
              <div className="text-gray-400">Avg. Driver Earnings</div>
            </div>
          </div>
        </div>
      </section>

      <VidooFooter />
    </div>
  );
}