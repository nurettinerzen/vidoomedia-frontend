import React from 'react';
import { VidooNavbar } from '@/components/VidooNavbar';
import { VidooFooter } from '@/components/VidooFooter';
import { ContactForm } from '@/components/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin } from 'lucide-react';

export default function VidooContactPage() {

  return (
    <div className="min-h-screen bg-black text-white">
      <VidooNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in">
            Have questions? We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="bg-[#1a1a1a] border-gray-800">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-2xl text-white">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="contact_name" className="text-white">Name *</Label>
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
                    <Label htmlFor="company_name" className="text-white">Company (Optional)</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      placeholder="Your company"
                      className="mt-2 bg-black border-gray-700 text-white"
                      data-testid="company-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us how we can help..."
                      className="mt-2 bg-black border-gray-700 text-white"
                      rows={5}
                      data-testid="message-input"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#00AEEF] hover:bg-[#0099D6] text-white py-6 text-lg rounded-none font-semibold"
                    disabled={isSubmitting}
                    data-testid="submit-message-button"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Let's Connect
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Whether you're interested in advertising with us or becoming a driver partner, 
                  we're here to answer your questions and help you get started.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="text-[#00AEEF]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-400">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="text-[#00AEEF]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Coverage Area</h4>
                    <p className="text-gray-400">Operating in 12 major cities nationwide</p>
                  </div>
                </div>
              </div>

              <Card className="bg-[#1a1a1a] border-gray-800 mt-8">
                <CardContent className="pt-6 pb-6">
                  <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="/advertising" className="text-[#00AEEF] hover:text-[#0099D6] transition-colors">
                        → Learn About Advertising
                      </a>
                    </li>
                    <li>
                      <a href="/drivers" className="text-[#00AEEF] hover:text-[#0099D6] transition-colors">
                        → Apply to Drive
                      </a>
                    </li>
                    <li>
                      <a href="/about" className="text-[#00AEEF] hover:text-[#0099D6] transition-colors">
                        → About VidooMedia
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <VidooFooter />
    </div>
  );
}
