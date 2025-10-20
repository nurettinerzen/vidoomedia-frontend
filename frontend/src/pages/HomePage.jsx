import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Monitor, TrendingUp, MapPin, Star } from 'lucide-react';

export default function HomePage() {
  const stats = [
    { label: 'Active Vehicles', value: '500+', icon: Users },
    { label: 'Digital Screens', value: '500+', icon: Monitor },
    { label: 'Monthly Impressions', value: '2M+', icon: TrendingUp },
    { label: 'Cities', value: '12', icon: MapPin },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Uber Driver',
      content: 'RideMedia has been a game-changer! I earn an extra $400-500 per month just by having the screen in my car.',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Marketing Director, TechCorp',
      content: 'The engagement rates are incredible. Our brand awareness increased by 45% in targeted markets.',
      rating: 5,
    },
    {
      name: 'Jessica Martinez',
      role: 'Lyft Driver',
      content: 'Installation was quick and easy. Passengers often comment on how cool the setup looks!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative pt-24 pb-20 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your
                <span className="text-blue-600"> Rideshare Vehicle</span>
                <br />
                Into Revenue
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join 500+ drivers earning extra income with in-vehicle digital advertising. 
                We connect brands with passengers through engaging, targeted ads.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/drivers">
                  <Button 
                    size="lg" 
                    className="btn-hover bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl"
                    data-testid="become-driver-cta"
                  >
                    Become a Driver Partner
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/advertisers">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-xl"
                    data-testid="advertise-cta"
                  >
                    Advertise With Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="animate-slide-in-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-lift">
                <img
                  src="https://images.unsplash.com/photo-1688457462495-1440d81f4ddb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxjYXIlMjB0YWJsZXQlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc2MDUwNzA5Mnww&ixlib=rb-4.1.0&q=85"
                  alt="In-car digital screen"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center hover-lift border-0 shadow-lg"
                  data-testid={`stat-card-${index}`}
                >
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="text-blue-600" size={32} />
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose RideMedia?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing how brands connect with consumers through innovative in-vehicle advertising
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-lift border-0 shadow-lg">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                  <Users className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Drivers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Earn $400-600 extra per month with minimal effort. Quick setup, no impact on your rideshare status.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                  <Monitor className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Advertisers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Reach your target audience with unskippable, high-engagement ads in a captive environment.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Measurable Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track impressions, engagement, and ROI with our comprehensive analytics dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What People Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our drivers and advertising partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg" data-testid={`testimonial-${index}`}>
                <CardContent className="pt-8 pb-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our network of 500 vehicles and be part of the future of in-vehicle advertising
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/drivers">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl btn-hover"
                data-testid="cta-driver-button"
              >
                Join as Driver
              </Button>
            </Link>
            <Link to="/advertisers">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                data-testid="cta-advertiser-button"
              >
                Start Advertising
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Toyota Wrap Banner */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <img 
        src="/toyota-wrap.jpg" 
        alt="Vehicle Wrap Design" 
        className="w-full h-[500px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
        <div className="max-w-xl ml-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Transform Your Vehicle</h2>
          <p className="text-xl mb-6">Professional vehicle wraps that turn heads and grow your brand</p>
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
      
      <Footer />
    </div>
  );
}
