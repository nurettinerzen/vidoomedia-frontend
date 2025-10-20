import React, { useState } from 'react';
import { VidooNavbar } from '@/components/VidooNavbar';
import { VidooFooter } from '@/components/VidooFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, BarChart3, Target, Eye, TrendingUp, Users, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VidooAdvertisingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <VidooNavbar />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1700411882249-1bc16dc3b9e9?crop=entropy&cs=srgb&fm=jpg&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            For Brands & Agencies
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in">
            Reach thousands of real people every day with targeted, city-wide exposure
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why VidooMedia?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our smart screens optimize delivery by location, time, and behavior
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all hover:-translate-y-2">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mb-6 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <MapPin className="text-[#00AEEF]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Location-Based Targeting</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Target specific neighborhoods, business districts, and high-traffic areas with GPS precision. Your ads appear exactly where your audience is.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-400">
                    <CheckCircle2 size={16} className="text-[#00AEEF] mr-2" />
                    Geo-fencing capabilities
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <CheckCircle2 size={16} className="text-[#00AEEF] mr-2" />
                    POI targeting
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <CheckCircle2 size={16} className="text-[#00AEEF] mr-2" />
                    Real-time location updates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all hover:-translate-y-2">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mb-6 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="text-[#00AEEF]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Real-Time Analytics</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Track every impression, engagement, and conversion. Get detailed insights into campaign performance with our advanced analytics dashboard.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-400">
                    <CheckCircle2 size={16} className="text-[#00AEEF] mr-2" />
                    Live impression tracking
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <CheckCircle2 size={16} className="text-[#00AEEF] mr-2" />
                    Engagement metrics
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <CheckCircle2 size={16} className="text-[#00AEEF] mr-2" />
                    ROI calculations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all hover:-translate-y-2">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mb-6 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <Target className="text-[#00AEEF]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Hyper-Targeted Campaigns</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Reach the right audience at the right time with AI-powered optimization. Schedule ads based on time of day, day of week, and audience behavior.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-400">
                    <CheckCircle2 size={16} className="text-[#00AEEF] mr-2" />
                    Dayparting options
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <CheckCircle2 size={16} className="text-[#00AEEF] mr-2" />
                    Demographic targeting
                  </li>
                  <li className="flex items-center text-sm text-gray-400">
                    <CheckCircle2 size={16} className="text-[#00AEEF] mr-2" />
                    AI optimization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Unmatched Audience Engagement
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Unlike traditional billboards, our in-car screens deliver your message directly to passengers during their ride—a captive, engaged audience.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Eye className="text-[#00AEEF]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">High Attention Rates</h4>
                    <p className="text-gray-400">Average view time of 8-12 minutes per ride with 95% completion rates</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="text-[#00AEEF]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Quality Impressions</h4>
                    <p className="text-gray-400">Reach real people in premium urban markets with verifiable impressions</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Zap className="text-[#00AEEF]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Dynamic Content</h4>
                    <p className="text-gray-400">Update campaigns in real-time, A/B test creative, and optimize on the fly</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Campaign Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                    <span className="text-gray-400">Avg. View Time</span>
                    <span className="text-2xl font-bold text-[#00AEEF]">10 mins</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                    <span className="text-gray-400">Completion Rate</span>
                    <span className="text-2xl font-bold text-[#00AEEF]">95%</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                    <span className="text-gray-400">Monthly Reach</span>
                    <span className="text-2xl font-bold text-[#00AEEF]">2M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active Vehicles</span>
                    <span className="text-2xl font-bold text-[#00AEEF]">500+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-black to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Launch Your Campaign?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Get in touch with our team to discuss your advertising goals
          </p>
          <Link to="/contact">
            <Button 
              size="lg"
              className="bg-[#00AEEF] hover:bg-[#0099D6] text-white px-8 py-6 text-lg rounded-none font-semibold"
              data-testid="contact-us-cta"
            >
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>

      <VidooFooter />
    </div>
  );
}
