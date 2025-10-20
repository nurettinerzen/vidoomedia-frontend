import React, { useState } from 'react';
import { VidooNavbar } from '@/components/VidooNavbar';
import { VidooFooter } from '@/components/VidooFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function VidooDriversPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    platform: '',
    vehicle_year: '',
    vehicle_make: '',
    vehicle_model: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${BACKEND_URL}/api/drivers/apply`, formData);
      toast.success('Application submitted successfully! We\'ll contact you within 48 hours.');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        platform: '',
        vehicle_year: '',
        vehicle_make: '',
        vehicle_model: '',
      });
      e.target.reset();
    } catch (error) {
      console.error('Application error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <VidooNavbar />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1664209448379-732f0dac59bd?crop=entropy&cs=srgb&fm=jpg&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Earn While You Drive
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in">
            Join our network and turn your car into a revenue generator
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <DollarSign className="text-[#00AEEF]" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Make Passive Income</h3>
                <p className="text-gray-400 leading-relaxed">
                  Earn $400-600 per month with minimal effort. Just drive your normal routes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <Zap className="text-[#00AEEF]" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No Rider Interaction</h3>
                <p className="text-gray-400 leading-relaxed">
                  Screens run automatically. You just drive as you normally would.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#00AEEF] transition-all">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#00AEEF]/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-[#00AEEF]" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Weekly Payments</h3>
                <p className="text-gray-400 leading-relaxed">
                  Get paid every week via direct deposit. Fast and reliable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-[#0a0a0a]" id="apply">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Apply to Drive
            </h2>
            <p className="text-xl text-gray-400">
              Fill out the form below and we'll get back to you within 48 hours
            </p>
          </div>

          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-2xl text-white">Driver Application</CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="mt-2 bg-black border-gray-700 text-white"
                      data-testid="name-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="mt-2 bg-black border-gray-700 text-white"
                      data-testid="email-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="mt-2 bg-black border-gray-700 text-white"
                      data-testid="phone-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-white">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Los Angeles"
                      className="mt-2 bg-black border-gray-700 text-white"
                      data-testid="city-input"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="platform" className="text-white">Rideshare Platform *</Label>
                  <Select 
                    name="platform" 
                    value={formData.platform}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}
                  >
                    <SelectTrigger className="mt-2 bg-black border-gray-700 text-white" data-testid="platform-select">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-gray-700">
                      <SelectItem value="Uber">Uber</SelectItem>
                      <SelectItem value="Lyft">Lyft</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="vehicle_year" className="text-white">Vehicle Year *</Label>
                    <Input
                      id="vehicle_year"
                      name="vehicle_year"
                      required
                      value={formData.vehicle_year}
                      onChange={handleInputChange}
                      placeholder="2020"
                      className="mt-2 bg-black border-gray-700 text-white"
                      data-testid="year-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicle_make" className="text-white">Make *</Label>
                    <Input
                      id="vehicle_make"
                      name="vehicle_make"
                      required
                      value={formData.vehicle_make}
                      onChange={handleInputChange}
                      placeholder="Toyota"
                      className="mt-2 bg-black border-gray-700 text-white"
                      data-testid="make-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicle_model" className="text-white">Model *</Label>
                    <Input
                      id="vehicle_model"
                      name="vehicle_model"
                      required
                      value={formData.vehicle_model}
                      onChange={handleInputChange}
                      placeholder="Camry"
                      className="mt-2 bg-black border-gray-700 text-white"
                      data-testid="model-input"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#00AEEF] hover:bg-[#0099D6] text-white py-6 text-lg rounded-none font-semibold"
                  disabled={isSubmitting}
                  data-testid="submit-application-button"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <VidooFooter />
    </div>
  );
}