'use client'
import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, FileText, Eye, Lock, Globe, Mail, Calendar, LucideIcon } from 'lucide-react';

type SectionType = 'terms' | 'privacy' | 'cookies';

const TermsAndPrivacyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('terms');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavButton = ({ id, label, icon: Icon }: { id: SectionType; label: string; icon: LucideIcon }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
        activeSection === id
          ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-lg'
          : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-purple-500 hover:shadow-lg'
      }`}
      type="button"
    >
      <Icon size={20} className="flex-shrink-0" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const Section = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: LucideIcon }) => (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 shadow-lg flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">{title}</h2>
      </div>
      {children}
    </div>
  );

  const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-start">
        <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 text-purple-400 mt-0.5" />
        <span>{title}</span>
      </h3>
      <div className="text-muted-foreground leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );

  const ContentCard = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: string }) => {
    const variants = {
      default: 'p-6 bg-card border border-border rounded-xl shadow-lg hover:border-purple-400 transition-all duration-300',
      highlight: 'p-4 bg-gradient-to-r from-purple-500/20 to-teal-500/20 border border-purple-400 rounded-xl shadow-lg',
      warning: 'p-4 bg-orange-500/20 border border-orange-500 rounded-xl shadow-lg',
      muted: 'p-6 bg-muted border border-border rounded-xl shadow-lg',
      secondary: 'p-4 bg-secondary border border-border rounded-xl shadow-lg'
    };
    
    return (
      <div className={variants[variant as keyof typeof variants] || variants.default}>
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-500/20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full animate-pulse"></div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-teal-500 transition-all duration-200 shadow-lg"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero section */}
      <div className="relative pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-6 py-3 mb-8 shadow-lg">
              <Shield className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span className="text-muted-foreground font-medium">Legal Documentation</span>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              SyntheView - AI Interviewer
            </h1>
            
            <h2 className="text-3xl font-semibold mb-6 text-foreground">
              Terms & Privacy Policy
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Transparency and trust are at the core of SyntheView. Review our policies to understand how we protect your data and ensure a secure interview preparation experience.
            </p>
            
            <div className="text-muted-foreground flex items-center justify-center space-x-2">
              <Calendar className="w-5 h-5 flex-shrink-0" />
              <span>Last updated: August 29, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-1 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex gap-6 justify-center">
            <NavButton id="terms" label="Terms of Service" icon={FileText} />
            <NavButton id="privacy" label="Privacy Policy" icon={Shield} />
            <NavButton id="cookies" label="Cookie Policy" icon={Eye} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-8 py-12">
        {activeSection === 'terms' && (
          <div className="space-y-12">
            <Section title="Terms of Service" icon={FileText}>
              <SubSection title="1. Acceptance of Terms">
                <ContentCard>
                  By accessing or using SyntheView (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                </ContentCard>
              </SubSection>

              <SubSection title="2. Description of Service">
                <ContentCard>
                  <p className="mb-4 text-foreground">SyntheView is an AI-powered mock interview platform designed to help job seekers practice and prepare for real job interviews. Our service provides:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>AI-generated interview questions based on job roles and industries</li>
                    <li>Real-time feedback and suggestions</li>
                    <li>Interview performance analytics</li>
                    <li>Practice session recordings and reviews</li>
                  </ul>
                </ContentCard>
              </SubSection>

              <SubSection title="3. User Accounts and Responsibilities">
                <div className="space-y-6">
                  <ContentCard variant="highlight">
                    <strong className="text-purple-400">Account Creation:</strong> You must provide accurate, complete information when creating your account and keep it updated.
                  </ContentCard>
                  <ContentCard variant="highlight">
                    <strong className="text-purple-400">Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
                  </ContentCard>
                </div>
              </SubSection>

              <SubSection title="4. Contact Information">
                <ContentCard variant="highlight">
                  For questions about these terms, contact us at: <a href="mailto:legal@syntheview.com" className="text-purple-400 hover:text-teal-400 transition-colors font-medium underline">legal@syntheview.com</a>
                </ContentCard>
              </SubSection>
            </Section>
          </div>
        )}

        {activeSection === 'privacy' && (
          <div className="space-y-12">
            <Section title="Privacy Policy" icon={Shield}>
              <SubSection title="1. Information We Collect">
                <div className="space-y-6">
                  <ContentCard>
                    <h4 className="text-purple-400 font-semibold mb-3">Account Information</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Email address and password</li>
                      <li>Name and profile information you provide</li>
                      <li>Job preferences and career goals</li>
                    </ul>
                  </ContentCard>
                  <ContentCard>
                    <h4 className="text-purple-400 font-semibold mb-3">Usage Data</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Interview practice sessions and responses</li>
                      <li>Performance metrics and progress tracking</li>
                      <li>Device information and IP addresses</li>
                      <li>Service usage patterns and features accessed</li>
                    </ul>
                  </ContentCard>
                </div>
              </SubSection>

              <SubSection title="2. How We Use Your Information">
                <ContentCard>
                  <h4 className="text-purple-400 font-semibold mb-4">Service Delivery</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide personalized interview questions and feedback</li>
                    <li>Track your progress and performance over time</li>
                    <li>Improve AI responses based on your interactions</li>
                  </ul>
                </ContentCard>
              </SubSection>

              <SubSection title="3. Data Security">
                <div className="bg-gradient-to-r from-purple-500 to-teal-500 rounded-2xl p-8 text-white shadow-2xl">
                  <div className="flex items-center space-x-6">
                    <div className="p-3 rounded-lg bg-white/20 flex-shrink-0 shadow-lg">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <strong className="text-2xl block mb-2">We Do Not Sell Your Data</strong>
                      <p className="text-white/90 text-lg">Your personal information is never sold to third parties. This is our commitment to you.</p>
                    </div>
                  </div>
                </div>
              </SubSection>

              <SubSection title="4. Contact Us">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4 p-6 bg-card border border-border rounded-xl hover:border-purple-400 transition-all duration-300 shadow-lg">
                    <Mail className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-muted-foreground">General Privacy</div>
                      <a href="mailto:privacy@syntheview.com" className="text-purple-400 hover:text-teal-400 transition-colors font-medium underline">privacy@syntheview.com</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-6 bg-card border border-border rounded-xl hover:border-purple-400 transition-all duration-300 shadow-lg">
                    <Lock className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-muted-foreground">Data Protection Officer</div>
                      <a href="mailto:dpo@syntheview.com" className="text-purple-400 hover:text-teal-400 transition-colors font-medium underline">dpo@syntheview.com</a>
                    </div>
                  </div>
                </div>
              </SubSection>
            </Section>
          </div>
        )}

        {activeSection === 'cookies' && (
          <div className="space-y-12">
            <Section title="Cookie Policy" icon={Eye}>
              <SubSection title="1. What Are Cookies">
                <ContentCard>
                  <p className="text-muted-foreground mb-4">
                    Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our service.
                  </p>
                </ContentCard>
              </SubSection>

              <SubSection title="2. Types of Cookies We Use">
                <div className="space-y-6">
                  <ContentCard>
                    <h4 className="text-purple-400 font-semibold mb-3">Essential Cookies</h4>
                    <p className="text-muted-foreground mb-3">Required for basic platform functionality, including user authentication and session management.</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>User session management</li>
                      <li>Authentication tokens</li>
                      <li>Security preferences</li>
                      <li>Basic functionality settings</li>
                    </ul>
                  </ContentCard>
                  <ContentCard>
                    <h4 className="text-purple-400 font-semibold mb-3">Analytics Cookies</h4>
                    <p className="text-muted-foreground mb-3">Help us understand how users interact with our platform to improve the user experience.</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Page views and user journeys</li>
                      <li>Feature usage statistics</li>
                      <li>Performance metrics</li>
                      <li>Error tracking</li>
                    </ul>
                  </ContentCard>
                </div>
              </SubSection>

              <SubSection title="3. Managing Cookies">
                <ContentCard>
                  <h4 className="text-purple-400 font-semibold mb-4">Cookie Control Options</h4>
                  <p className="text-muted-foreground mb-4">You can control cookie preferences through:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Your browser settings (most browsers allow you to block cookies)</li>
                    <li>Our cookie consent banner when you first visit</li>
                    <li>Your account settings for preference cookies</li>
                  </ul>
                </ContentCard>
              </SubSection>
            </Section>
          </div>
        )}

        {/* Agreement footer */}
        <div className="mt-20 pt-10 border-t border-border">
          <div className="bg-gradient-to-r from-purple-500 to-teal-500 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-start space-x-6">
              <div className="p-3 rounded-lg bg-white/20 flex-shrink-0 shadow-lg">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Agreement</h3>
                <p className="text-white/90 leading-relaxed">
                  By using SyntheView, you acknowledge that you have read and understood our Terms of Service and Privacy Policy. Your continued use of our platform constitutes acceptance of these terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacyPage;