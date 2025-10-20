import React from 'react';
import { Link } from 'react-router-dom';
import { VidooNavbar } from '@/components/VidooNavbar';
import { VidooFooter } from '@/components/VidooFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, BarChart3, Target, DollarSign, Zap, TrendingUp } from 'lucide-react';

export default function VidooHomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <VidooNavbar />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://customer-assets.emergentagent.com/job_ridemedia/artifacts/tbd488kd_ChatGPT%20Image%20Oct%2015%2C%202025%20at%2001_18_56%20PM.png')`,
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
          <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto animate-fade-in">
            Engage riders with smart, location-based video ads. Boost your brand's visibility where it matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <a href="#contact">
              <Button 
                size="lg"
                className="bg-[#00AEEF] hover:bg-[#0099D6] text-white px-8 py-6 text-lg rounded-none font-semibold"
                data-testid="advertise-cta"
              >
                Advertise With Us
              </Button>
            </a>
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

      {/* Drivers Preview Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div 
                className="h-[500px] rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1664209448379-732f0dac59bd?crop=entropy&cs=srgb&fm=jpg&q=85')`,
                }}
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Earn While You Drive
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Turn your daily commute into a source of passive income. Join our network of drivers earning extra money with minimal effort.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#00AEEF] flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <DollarSign size={14} className="text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Make Passive Income</h4>
                    <p className="text-gray-400 text-sm">Earn $400-600 per month just by driving your normal routes</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#00AEEF] flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <Zap size={14} className="text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">No Rider Interaction Needed</h4>
                    <p className="text-gray-400 text-sm">Screens run automatically - you just drive as usual</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#00AEEF] flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <TrendingUp size={14} className="text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Weekly Payments</h4>
                    <p className="text-gray-400 text-sm">Get paid every week via direct deposit</p>
                  </div>
                </li>
              </ul>

              <Link to="/drivers">
                <Button 
                  size="lg"
                  className="bg-[#00AEEF] hover:bg-[#0099D6] text-white px-8 py-6 text-lg rounded-none font-semibold"
                  data-testid="apply-drive-button"
                >
                  Apply to Drive
                </Button>
              </Link>
            </div>
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
            <Link to="/advertising">
              <Button 
                size="lg"
                className="bg-[#00AEEF] hover:bg-[#0099D6] text-white px-8 py-6 text-lg rounded-none font-semibold"
              >
                Start Advertising
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#00AEEF] text-[#00AEEF] hover:bg-[#00AEEF] hover:text-black px-8 py-6 text-lg rounded-none font-semibold"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <VidooFooter />
    </div>
  );
}
