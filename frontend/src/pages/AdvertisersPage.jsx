import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Target, Eye, BarChart3, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function AdvertisersPage() {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    budget_range: '',
    cities: '',
    ad_formats: [],
  });
  const [file, setFile] = useState(null);
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let creativeId = null;

      // Upload file if present
      if (file) {
        const fileFormData = new FormData();
        fileFormData.append('file', file);

        const uploadResponse = await axios.post(`${BACKEND_URL}/api/upload`, fileFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        creativeId = uploadResponse.data.file_id;
      }

      // Submit advertiser contact
      const submissionData = {
        ...formData,
        ad_formats: formData.ad_formats.join(', '),
        creative_id: creativeId
      };

      await axios.post(`${BACKEND_URL}/api/advertisers/contact`, submissionData);

      toast.success('Thank you! Our team will reach out within 24 hours.');
      
      // Reset form
      setFormData({
        company_name: '',
        contact_name: '',
        email: '',
        budget_range: '',
        cities: '',
        ad_formats: [],
      });
      setFile(null);
      e.target.reset();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Target,
      title: 'Captive Audience',
      description: 'Reach passengers during their ride with unskippable, attention-grabbing ads.',
    },
    {
      icon: Eye,
      title: 'High Engagement',
      description: 'Average view time of 8-12 minutes per ride. Passengers can\'t look away.',
    },
    {
      icon: BarChart3,
      title: 'Measurable ROI',
      description: 'Track impressions, engagement, and conversions with detailed analytics.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative pt-24 pb-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.85), rgba(29, 78, 216, 0.85)), url('https://images.unsplash.com/photo-1700411882249-1bc16dc3b9e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHxjYXIlMjBwYXNzZW5nZXIlMjB0YWJsZXQlMjBzY3JlZW58ZW58MHx8fHwxNzYwNTA3MTMwfDA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Reach Passengers On the Move
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-fade-in">
            Connect with 2M+ monthly passengers through high-engagement, in-vehicle digital advertising
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why In-Vehicle Advertising?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most engaging advertising medium with unmatched audience attention
            </p>
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

      {/* Ad Formats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Flexible Ad Formats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-lift border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-2xl">Video Ads</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>15-30 second spots</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Full HD playback</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Sound enabled</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Highest engagement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-2xl">Static Display</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>High-resolution images</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Rotating carousel</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Cost-effective</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Great brand recall</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-2xl">Interactive</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Touch-enabled experiences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>QR code integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Lead capture</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Premium engagement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50" id="contact">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Started Today
            </h2>
            <p className="text-xl text-gray-600">
              Let's discuss how RideMedia can amplify your brand
            </p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Advertiser Contact Form</CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company_name">Company Name *</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      required
                      value={formData.company_name}
                      onChange={handleInputChange}
                      placeholder="Acme Corp"
                      className="mt-2"
                      data-testid="company-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_name">Your Name *</Label>
                    <Input
                      id="contact_name"
                      name="contact_name"
                      required
                      value={formData.contact_name}
                      onChange={handleInputChange}
                      placeholder="Jane Smith"
                      className="mt-2"
                      data-testid="contact-name-input"
                    />
                  </div>
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
                    placeholder="jane@acme.com"
                    className="mt-2"
                    data-testid="email-input"
                  />
                </div>

                <div>
                  <Label htmlFor="budget_range">Monthly Budget Range *</Label>
                  <Select 
                    name="budget_range"
                    value={formData.budget_range}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, budget_range: value }))}
                  >
                    <SelectTrigger className="mt-2" data-testid="budget-select">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="$10,000 - $25,000">$10,000 - $25,000</SelectItem>
                      <SelectItem value="$25,000 - $50,000">$25,000 - $50,000</SelectItem>
                      <SelectItem value="$50,000+">$50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cities">Target Cities/Markets *</Label>
                  <Textarea
                    id="cities"
                    name="cities"
                    required
                    value={formData.cities}
                    onChange={handleInputChange}
                    placeholder="Los Angeles, San Francisco, New York..."
                    className="mt-2"
                    rows={3}
                    data-testid="cities-input"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Ad Format Interest *</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="video"
                        checked={formData.ad_formats.includes('video')}
                        onCheckedChange={() => handleCheckboxChange('video')}
                        data-testid="format-video"
                      />
                      <label htmlFor="video" className="text-sm font-medium cursor-pointer">
                        Video Ads
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="static"
                        checked={formData.ad_formats.includes('static')}
                        onCheckedChange={() => handleCheckboxChange('static')}
                        data-testid="format-static"
                      />
                      <label htmlFor="static" className="text-sm font-medium cursor-pointer">
                        Static Display
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="interactive"
                        checked={formData.ad_formats.includes('interactive')}
                        onCheckedChange={() => handleCheckboxChange('interactive')}
                        data-testid="format-interactive"
                      />
                      <label htmlFor="interactive" className="text-sm font-medium cursor-pointer">
                        Interactive
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="creative">Upload Sample Creative (Optional)</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Input
                      id="creative"
                      type="file"
                      accept="image/*,video/*,.pdf"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                      data-testid="creative-input"
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
                  data-testid="submit-contact-button"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
