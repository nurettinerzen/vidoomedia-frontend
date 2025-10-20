import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    contact_name: '',
    company_name: '',
    email: '',
    cities: '',
    ad_formats: [],
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (format) => {
    setFormData(prev => {
      const formats = prev.ad_formats.includes(format)
        ? prev.ad_formats.filter(f => f !== format)
        : [...prev.ad_formats, format];
      return { ...prev, ad_formats: formats };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        company_name: formData.company_name,
        contact_name: formData.contact_name,
        email: formData.email,
        budget_range: 'Contact for quote',
        cities: `${formData.cities} | Message: ${message}`,
        ad_formats: formData.ad_formats.join(', '),
      };

      await axios.post(`${BACKEND_URL}/api/advertisers/contact`, submissionData);
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      
      setFormData({
        contact_name: '',
        company_name: '',
        email: '',
        cities: '',
        ad_formats: [],
      });
      setMessage('');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contact_name" className="text-white">Full Name *</Label>
          <Input
            id="contact_name"
            name="contact_name"
            required
            value={formData.contact_name}
            onChange={handleInputChange}
            placeholder="Your name"
            className="mt-2 bg-black border-gray-700 text-white"
            data-testid="name-input"
          />
        </div>

        <div>
          <Label htmlFor="company_name" className="text-white">Company Name *</Label>
          <Input
            id="company_name"
            name="company_name"
            required
            value={formData.company_name}
            onChange={handleInputChange}
            placeholder="Your company"
            className="mt-2 bg-black border-gray-700 text-white"
            data-testid="company-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email" className="text-white">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className="mt-2 bg-black border-gray-700 text-white"
            data-testid="email-input"
          />
        </div>

        <div>
          <Label htmlFor="cities" className="text-white">Location *</Label>
          <Input
            id="cities"
            name="cities"
            required
            value={formData.cities}
            onChange={handleInputChange}
            placeholder="City, State"
            className="mt-2 bg-black border-gray-700 text-white"
            data-testid="location-input"
          />
        </div>
      </div>

      <div>
        <Label className="text-white mb-3 block">Ad Format (select all that apply) *</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="in-car-tablet"
              checked={formData.ad_formats.includes('In-Car Tablet')}
              onCheckedChange={() => handleCheckboxChange('In-Car Tablet')}
              data-testid="format-tablet"
              className="border-gray-700"
            />
            <label htmlFor="in-car-tablet" className="text-sm text-white cursor-pointer">
              In-Car Tablet
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="car-wrapping"
              checked={formData.ad_formats.includes('Car Wrapping')}
              onCheckedChange={() => handleCheckboxChange('Car Wrapping')}
              data-testid="format-wrapping"
              className="border-gray-700"
            />
            <label htmlFor="car-wrapping" className="text-sm text-white cursor-pointer">
              Car Wrapping
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="on-top-screen"
              checked={formData.ad_formats.includes('On-Top Dynamic Screen')}
              onCheckedChange={() => handleCheckboxChange('On-Top Dynamic Screen')}
              data-testid="format-screen"
              className="border-gray-700"
            />
            <label htmlFor="on-top-screen" className="text-sm text-white cursor-pointer">
              On-Top Dynamic Screen
            </label>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="message" className="text-white">Message *</Label>
        <Textarea
          id="message"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your advertising goals..."
          className="mt-2 bg-black border-gray-700 text-white"
          rows={5}
          data-testid="message-input"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#00AEEF] hover:bg-[#0099D6] text-white py-6 text-lg rounded-none font-semibold"
        disabled={isSubmitting || formData.ad_formats.length === 0}
        data-testid="submit-contact-button"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};
