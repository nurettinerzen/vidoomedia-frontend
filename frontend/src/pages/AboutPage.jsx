import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, TrendingUp, Zap } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Users,
      title: 'Driver-First Approach',
      description: 'We prioritize our driver partners, ensuring they earn fair compensation while maintaining their rideshare status.',
    },
    {
      icon: Target,
      title: 'Advertiser Success',
      description: 'We deliver measurable results through high-engagement advertising that actually reaches consumers.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We continuously improve our technology and platform to provide the best experience for all stakeholders.',
    },
    {
      icon: Zap,
      title: 'Simplicity',
      description: 'From onboarding to analytics, we make everything easy and straightforward for everyone involved.',
    },
  ];

  const milestones = [
    { year: '2023', title: 'Company Founded', description: 'RideMedia launched in Los Angeles with a vision to revolutionize in-vehicle advertising' },
    { year: '2024', title: '100 Vehicles', description: 'Reached our first major milestone with 100 active vehicles across LA' },
    { year: '2024', title: '500 Vehicles', description: 'Expanded to 12 cities with 500 active vehicles and growing' },
    { year: '2025', title: '1,000 Vehicle Goal', description: 'On track to launch officially with 1,000 vehicles nationwide' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative pt-24 pb-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.85), rgba(29, 78, 216, 0.85)), url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto animate-fade-in leading-relaxed">
            To create a win-win ecosystem where drivers earn more income, brands reach engaged audiences,
            and passengers enjoy relevant content during their rides.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-lg">
              RideMedia was founded in 2023 with a simple observation: millions of rideshare trips happen every day,
              but the in-vehicle experience hasn't evolved. Passengers sit in the back seat with nothing to engage
              with, while drivers miss out on potential income opportunities.
            </p>
            
            <p className="text-lg">
              We saw an opportunity to transform these rides into valuable advertising moments. By installing
              high-quality digital screens in rideshare vehicles, we created a new advertising channel that benefits
              everyone involved.
            </p>
            
            <p className="text-lg">
              Today, we operate in 12 major cities with 500 active vehicles, delivering over 2 million monthly
              impressions to engaged passengers. Our drivers earn an average of $400-600 extra per month, and our
              advertiser partners see engagement rates 3-5x higher than traditional digital advertising.
            </p>

            <p className="text-lg">
              Based in Los Angeles, we're on track to reach 1,000 vehicles by the end of 2025, with plans to
              expand to 25+ cities nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="hover-lift border-0 shadow-lg" data-testid={`value-${index}`}>
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden md:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  data-testid={`milestone-${index}`}
                >
                  <div className="flex-1 text-center md:text-right">
                    <Card className="hover-lift border-0 shadow-lg">
                      <CardContent className="pt-6 pb-6">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center z-10 flex-shrink-0 hidden md:flex">
                    <div className="w-6 h-6 rounded-full bg-white"></div>
                  </div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Active Vehicles</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">12</div>
              <div className="text-blue-100">Cities</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">2M+</div>
              <div className="text-blue-100">Monthly Impressions</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">$500</div>
              <div className="text-blue-100">Avg. Driver Earnings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals driving innovation in advertising technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-lift border-0 shadow-lg">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">JD</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">John Doe</h3>
                <p className="text-blue-600 font-medium mb-3">CEO & Founder</p>
                <p className="text-gray-600 text-sm">Former VP at major ad tech company with 15+ years experience</p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">SM</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Sarah Martinez</h3>
                <p className="text-blue-600 font-medium mb-3">CTO</p>
                <p className="text-gray-600 text-sm">Technology leader with expertise in IoT and digital displays</p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">MC</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Mike Chen</h3>
                <p className="text-blue-600 font-medium mb-3">Head of Partnerships</p>
                <p className="text-gray-600 text-sm">Rideshare industry veteran focused on driver success</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
