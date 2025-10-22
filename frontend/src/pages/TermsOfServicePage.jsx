import React from 'react';
import { VidooNavbar } from '@/components/VidooNavbar';
import { VidooFooter } from '@/components/VidooFooter';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <VidooNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> October 21, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              Welcome to VidooMedia, operated by Selenly LLC. By accessing or using our website at vidoomedia.com and our vehicle wrap advertising services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms").
            </p>
            <p className="text-gray-700">
              If you do not agree to these Terms, you may not access or use our Services. We reserve the right to modify these Terms at any time, and your continued use of the Services constitutes acceptance of any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
            <p className="text-gray-700 mb-4">
              VidooMedia connects advertisers with vehicle owners (drivers) to facilitate vehicle wrap advertising campaigns. Our Services include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Matching advertisers with qualified drivers</li>
              <li>Facilitating vehicle wrap installations</li>
              <li>Tracking and reporting campaign performance</li>
              <li>Managing driver applications and advertiser inquiries</li>
            </ul>
            <p className="text-gray-700">
              We act as a platform and intermediary. We do not own or control the vehicles, and we are not responsible for the driving behavior of participants.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Eligibility</h2>
            <p className="text-gray-700 mb-4">
              To use our Services, you must:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Provide accurate and complete information during registration</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
            <p className="text-gray-700">
              For drivers: You must possess a valid driver's license, vehicle registration, and insurance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Driver Terms</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Application Process</h3>
            <p className="text-gray-700 mb-4">
              Drivers must submit a complete application including vehicle information, driving history, and location. VidooMedia reserves the right to approve or reject any application at our sole discretion.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Vehicle Requirements</h3>
            <p className="text-gray-700 mb-4">
              Your vehicle must meet our minimum standards, including cleanliness, condition, and model year requirements. You must maintain valid insurance and registration throughout the campaign period.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Driving Requirements</h3>
            <p className="text-gray-700 mb-4">
              You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Operate your vehicle safely and legally at all times</li>
              <li>Maintain the vehicle wrap in good condition</li>
              <li>Drive the agreed-upon minimum miles or hours</li>
              <li>Not engage in illegal activities while displaying advertiser branding</li>
              <li>Not modify or remove the wrap without authorization</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.4 Compensation</h3>
            <p className="text-gray-700">
              Driver compensation will be specified in individual campaign agreements. Payment terms, amounts, and schedules vary by campaign. VidooMedia is not responsible for disputes between drivers and advertisers regarding payment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Advertiser Terms</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Campaign Setup</h3>
            <p className="text-gray-700 mb-4">
              Advertisers must provide complete campaign details, creative assets, and targeting requirements. VidooMedia will work to match you with suitable drivers but does not guarantee specific results or impressions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Content Guidelines</h3>
            <p className="text-gray-700 mb-4">
              Advertiser content must:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Comply with all applicable laws and regulations</li>
              <li>Not contain offensive, discriminatory, or illegal content</li>
              <li>Not infringe on third-party intellectual property rights</li>
              <li>Meet our creative specifications and quality standards</li>
            </ul>
            <p className="text-gray-700">
              VidooMedia reserves the right to reject any campaign content that violates these guidelines.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Payment Terms</h3>
            <p className="text-gray-700">
              Payment terms will be specified in individual campaign agreements. You agree to pay all fees on time and understand that campaigns may be paused or terminated for non-payment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content on the VidooMedia website, including text, graphics, logos, and software, is the property of Selenly LLC or our licensors and is protected by copyright and trademark laws.
            </p>
            <p className="text-gray-700">
              By submitting content to VidooMedia, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display that content for the purpose of providing our Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Prohibited Conduct</h2>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Use the Services for any illegal purpose</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the Services</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Collect user information without consent</li>
              <li>Post false, misleading, or fraudulent information</li>
              <li>Harass, abuse, or harm other users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers and Limitation of Liability</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">8.1 Service Disclaimer</h3>
            <p className="text-gray-700 mb-4">
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">8.2 Limitation of Liability</h3>
            <p className="text-gray-700 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SELENLY LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL.
            </p>
            <p className="text-gray-700">
              OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO US IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
            <p className="text-gray-700">
              You agree to indemnify, defend, and hold harmless Selenly LLC, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including attorney fees) arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to suspend or terminate your access to the Services at any time, with or without cause or notice, including for violation of these Terms.
            </p>
            <p className="text-gray-700">
              Upon termination, your right to use the Services will immediately cease. Sections of these Terms that by their nature should survive termination will remain in effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">11.1 Governing Law</h3>
            <p className="text-gray-700 mb-4">
              These Terms are governed by the laws of the State of California, United States, without regard to conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">11.2 Arbitration</h3>
            <p className="text-gray-700">
              Any disputes arising from these Terms or the Services shall be resolved through binding arbitration in Orange County, California, in accordance with the rules of the American Arbitration Association.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. General Provisions</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and VidooMedia.</li>
              <li><strong>Severability:</strong> If any provision is found invalid, the remaining provisions remain in effect.</li>
              <li><strong>No Waiver:</strong> Our failure to enforce any right does not constitute a waiver of that right.</li>
              <li><strong>Assignment:</strong> You may not assign these Terms without our written consent.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Selenly LLC (VidooMedia)</strong></p>
              <p className="text-gray-700">Email: nurettin@vidoomedia.com</p>
              <p className="text-gray-700">Location: Brea, CA, USA</p>
            </div>
          </section>

          <p className="text-gray-600 italic mt-8">
            By using VidooMedia's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>

      <VidooFooter />
    </div>
  );
}
