import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DollarSign, Zap, Shield, CheckCircle2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function DriversPage() {
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
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoId = null;

      // Upload file if present
      if (file) {
        const fileFormData = new FormData();
        fileFormData.append('file', file);

        const uploadResponse = await axios.post(`${BACKEND_URL}/api/upload`, fileFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        photoId = uploadResponse.data.file_id;
      }

      // Submit application
      const applicationData = { ...formData, photo_id: photoId };
      await axios.post(`${BACKEND_URL}/api/drivers/apply`, applicationData);

      toast.success('Application submitted successfully! We\'ll contact you within 48 hours.');
      
      // Reset form
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
      setFile(null);
      e.target.reset();
    } catch (error) {
      console.error('Application error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Extra Income',
      description: 'Make $400-600 per month with minimal effort. Just drive as you normally would.',
    },
    {
      icon: Zap,
      title: 'Quick & Easy Setup',
      description: 'Professional installation takes less than 30 minutes. We handle everything.',
    },
    {
      icon: Shield,
      title: 'No Risk to Your Account',
      description: 'Fully compliant with Uber and Lyft policies. Your rideshare status is protected.',
    },
  ];

  const faqs = [
    {
      question: 'Will this affect my Uber/Lyft account?',
      answer: 'No! Our system is fully compliant with rideshare platform policies. Thousands of drivers use similar setups without issues.',
    },
    {
      question: 'How much can I really earn?',
      answer: 'Most drivers earn between $400-600 per month, depending on their driving frequency and location. High-traffic areas typically see higher earnings.',
    },
    {
      question: 'Who installs the screen?',
      answer: 'Our professional team handles the installation at your convenience. It takes about 30 minutes and requires no modifications to your vehicle.',
    },
    {
      question: 'What if the screen gets damaged?',
      answer: 'All equipment is insured and maintained by us at no cost to you. We provide immediate replacements if needed.',
    },
    {
      question: 'Can I remove the screen if I want to?',
      answer: 'Absolutely! You can end the partnership at any time, and we\'ll remove the equipment with no penalties.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative pt-24 pb-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.85), rgba(29, 78, 216, 0.85)), url('https://images.unsplash.com/photo-1664209448379-732f0dac59bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxjYXIlMjB0YWJsZXQlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc2MDUwNzA5Mnww&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Earn More With Your Vehicle
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-fade-in">
            Join 500+ drivers already earning extra income through in-vehicle digital advertising
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Partner With Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="hover-lift border-0 shadow-lg" data-testid={`benefit-${index}`}>
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                      <Icon className="text-white" size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white" id="apply">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Apply Now
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 48 hours
            </p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Driver Application Form</CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="mt-2"
                      data-testid="name-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="mt-2"
                      data-testid="email-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="mt-2"
                      data-testid="phone-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Los Angeles"
                      className="mt-2"
                      data-testid="city-input"
                    />
                  </div>
                </div>

                {/* Platform */}
                <div>
                  <Label htmlFor="platform">Rideshare Platform *</Label>
                  <Select 
                    name="platform" 
                    value={formData.platform}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}
                  >
                    <SelectTrigger className="mt-2" data-testid="platform-select">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Uber">Uber</SelectItem>
                      <SelectItem value="Lyft">Lyft</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Vehicle Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="vehicle_year">Vehicle Year *</Label>
                    <Input
                      id="vehicle_year"
                      name="vehicle_year"
                      required
                      value={formData.vehicle_year}
                      onChange={handleInputChange}
                      placeholder="2020"
                      className="mt-2"
                      data-testid="year-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicle_make">Make *</Label>
                    <Input
                      id="vehicle_make"
                      name="vehicle_make"
                      required
                      value={formData.vehicle_make}
                      onChange={handleInputChange}
                      placeholder="Toyota"
                      className="mt-2"
                      data-testid="make-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicle_model">Model *</Label>
                    <Input
                      id="vehicle_model"
                      name="vehicle_model"
                      required
                      value={formData.vehicle_model}
                      onChange={handleInputChange}
                      placeholder="Camry"
                      className="mt-2"
                      data-testid="model-input"
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <Label htmlFor="photo">Vehicle Interior Photo (Optional)</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                      data-testid="photo-input"
                    />
                    {file && (
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle2 size={16} className="mr-1" />
                        {file.name}
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl btn-hover"
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

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-md px-6 border-0"
                data-testid={`faq-${index}`}
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-blue-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
}
