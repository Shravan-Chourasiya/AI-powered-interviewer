'use client'
import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, FileText, Eye, Lock, Globe, Mail, Calendar, Zap, Users, LucideIcon } from 'lucide-react';

type SectionType = 'terms' | 'privacy' | 'cookies';

type ContentCardVariant = 'default' | 'highlight' | 'warning' | 'muted' | 'secondary';

interface NavButtonProps {
  id: SectionType;
  label: string;
  icon: LucideIcon;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon: LucideIcon;
  delay?: number;
}

interface SubSectionProps {
  title: string;
  children: React.ReactNode;
}

interface ContentCardProps {
  children: React.ReactNode;
  variant?: ContentCardVariant;
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  items: string[];
  description?: string;
}

interface ListItemProps {
  children: React.ReactNode;
}

interface SecurityFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

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

  const NavButton: React.FC<NavButtonProps> = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap transform hover:scale-105 ${
        activeSection === id
          ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-lg'
          : 'bg-gray-800 border border-gray-700 text-gray-300 hover:text-white hover:border-purple-400 hover:shadow-lg'
      }`}
      type="button"
    >
      <Icon size={16} className="sm:w-5 sm:h-5" />
      <span className="font-medium hidden sm:inline">{label}</span>
      <span className="font-medium sm:hidden">{label.split(' ')[0]}</span>
    </button>
  );

  const Section: React.FC<SectionProps> = ({ title, children, icon: Icon }) => (
    <div className="mb-8 sm:mb-12">
      <div className="flex items-center space-x-3 mb-6 sm:mb-8">
        <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 shadow-lg">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">{title}</h2>
      </div>
      {children}
    </div>
  );

  const SubSection: React.FC<SubSectionProps> = ({ title, children }) => (
    <div className="mb-8">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center">
        <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 text-purple-400" />
        <span className="break-words">{title}</span>
      </h3>
      <div className="text-gray-300 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );

  const ContentCard: React.FC<ContentCardProps> = ({ children, variant = 'default' }) => {
    const variants: Record<ContentCardVariant, string> = {
      default: 'p-4 sm:p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:border-purple-400 transition-all duration-300',
      highlight: 'p-4 bg-gradient-to-r from-purple-500/20 to-teal-500/20 border border-purple-400 rounded-xl shadow-lg',
      warning: 'p-4 bg-orange-500/20 border border-orange-500 rounded-xl shadow-lg',
      muted: 'p-4 sm:p-6 bg-gray-900 border border-gray-600 rounded-xl shadow-lg',
      secondary: 'p-4 bg-gray-700 border border-gray-600 rounded-xl shadow-lg'
    };
    
    return (
      <div className={`${variants[variant]} text-sm sm:text-base text-gray-300`}>
        {children}
      </div>
    );
  };

  const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, items, description }) => (
    <div className="p-4 sm:p-6 bg-gray-800 border border-gray-700 rounded-xl hover:border-purple-400 transition-all duration-300 group shadow-lg transform hover:scale-105">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-white">{title}</h3>
      </div>
      {description && (
        <p className="text-sm text-gray-400 mb-3">{description}</p>
      )}
      <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-300 ml-4">
        {items.map((item: string, index: number) => (
          <li key={index} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    </div>
  );

  const ListItem: React.FC<ListItemProps> = ({ children }) => (
    <div className="flex items-start space-x-3">
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-teal-400 mt-2 flex-shrink-0"></div>
      <span className="text-xs sm:text-sm text-gray-300">{children}</span>
    </div>
  );

  const securityFeatures: SecurityFeature[] = [
    { icon: Lock, title: 'Encryption', desc: 'Data encrypted in transit and at rest' },
    { icon: Shield, title: 'Authentication', desc: 'Secure authentication protocols' },
    { icon: Eye, title: 'Monitoring', desc: 'Regular security audits and updates' },
    { icon: Users, title: 'Access Control', desc: 'Limited access to personal data' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-500/10 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/5 rounded-full animate-pulse"></div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-teal-500 transition-all duration-200 shadow-lg"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero section */}
      <div className="relative pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 shadow-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="text-sm sm:text-base text-gray-300 font-medium">Legal Documentation</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              SyntheView - AI Interviewer
            </h1>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 text-white">
              Terms & Privacy Policy
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Transparency and trust are at the core of SyntheView. Review our policies to understand how we protect your data and ensure a secure interview preparation experience.
            </p>
            
            <div className="text-sm sm:text-base text-gray-500 flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Last updated: August 29, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-1 z-40 bg-gray-900/90 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-wrap gap-3 sm:gap-6 justify-center">
            <NavButton id="terms" label="Terms of Service" icon={FileText} />
            <NavButton id="privacy" label="Privacy Policy" icon={Shield} />
            <NavButton id="cookies" label="Cookie Policy" icon={Eye} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {activeSection === 'terms' && (
          <div className="space-y-8 sm:space-y-12">
            <Section title="Terms of Service" icon={FileText}>
              <SubSection title="1. Acceptance of Terms">
                <ContentCard>
                  By accessing or using SyntheView (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                </ContentCard>
              </SubSection>

              <SubSection title="2. Description of Service">
                <ContentCard>
                  <p className="mb-4 text-white">SyntheView is an AI-powered mock interview platform designed to help job seekers practice and prepare for real job interviews. Our service provides:</p>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <ListItem>AI-generated interview questions based on job roles and industries</ListItem>
                    <ListItem>Real-time feedback and suggestions</ListItem>
                    <ListItem>Interview performance analytics</ListItem>
                    <ListItem>Practice session recordings and reviews</ListItem>
                  </div>
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
                  <ContentCard variant="highlight">
                    <strong className="text-purple-400">Acceptable Use:</strong> You agree to:
                    <ul className="list-disc list-inside mt-3 ml-4 space-y-2 text-gray-300">
                      <li>Use the service only for legitimate interview preparation</li>
                      <li>Not share your account with others</li>
                      <li>Not attempt to reverse engineer or copy our AI technology</li>
                      <li>Not use the service for any unlawful purposes</li>
                    </ul>
                  </ContentCard>
                </div>
              </SubSection>

              <SubSection title="4. AI-Generated Content">
                <div className="space-y-6">
                  <ContentCard>
                    <strong className="text-purple-400">Nature of AI Responses:</strong> Our AI generates interview questions and feedback based on algorithms and training data. While we strive for accuracy and helpfulness, AI responses:
                    <ul className="list-disc list-inside mt-3 ml-4 space-y-2 text-gray-300">
                      <li>May not always be perfect or applicable to every situation</li>
                      <li>Should be used as practice tools, not as definitive career advice</li>
                      <li>Are generated automatically and may vary in quality</li>
                    </ul>
                  </ContentCard>
                  <ContentCard variant="warning">
                    <strong className="text-orange-400">No Guarantee of Interview Success:</strong> Using SyntheView does not guarantee job interview success or employment outcomes.
                  </ContentCard>
                </div>
              </SubSection>

              <SubSection title="5. Intellectual Property">
                <div className="grid sm:grid-cols-2 gap-6">
                  <ContentCard>
                    <strong className="text-purple-400 block mb-3">Our Content</strong>
                    <p className="text-gray-300 text-sm sm:text-base">The SyntheView platform, AI models, algorithms, and original content are owned by us and protected by intellectual property laws.</p>
                  </ContentCard>
                  <ContentCard>
                    <strong className="text-purple-400 block mb-3">Your Content</strong>
                    <p className="text-gray-300 text-sm sm:text-base">You retain ownership of any personal information or responses you provide, but grant us permission to use this data to improve our service.</p>
                  </ContentCard>
                </div>
              </SubSection>

              <SubSection title="6. Payment and Subscriptions">
                <div className="space-y-6">
                  <ContentCard variant="secondary">
                    <strong className="text-teal-400">Free Tier:</strong> Basic features are available at no cost with usage limitations.
                  </ContentCard>
                  <ContentCard>
                    <strong className="text-purple-400">Premium Subscriptions:</strong> Paid plans provide additional features and unlimited usage. Subscription fees are billed in advance and are non-refundable except as required by law.
                  </ContentCard>
                  <ContentCard>
                    <strong className="text-purple-400">Cancellation:</strong> You may cancel your subscription at any time. Access to premium features will continue until the end of your billing period.
                  </ContentCard>
                </div>
              </SubSection>

              <SubSection title="7. Limitation of Liability">
                <ContentCard variant="muted">
                  <p className="mb-4 text-white">SyntheView is provided &quot;as is&quot; without warranties. We are not liable for:</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <ListItem>Any direct, indirect, or consequential damages</ListItem>
                    <ListItem>Interview outcomes or employment decisions</ListItem>
                    <ListItem>Technical issues or service interruptions</ListItem>
                    <ListItem>Loss of data or personal information</ListItem>
                  </div>
                </ContentCard>
              </SubSection>

              <SubSection title="8. Termination">
                <ContentCard>
                  We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful behavior.
                </ContentCard>
              </SubSection>

              <SubSection title="9. Changes to Terms">
                <ContentCard>
                  We may update these terms periodically. Continued use of the service constitutes acceptance of updated terms.
                </ContentCard>
              </SubSection>

              <SubSection title="10. Contact Information">
                <ContentCard variant="highlight">
                  For questions about these terms, contact us at: <a href="mailto:legal@syntheview.com" className="text-purple-400 hover:text-teal-400 transition-colors font-medium break-all underline">legal@syntheview.com</a>
                </ContentCard>
              </SubSection>
            </Section>
          </div>
        )}

        {activeSection === 'privacy' && (
          <div className="space-y-8 sm:space-y-12">
            <Section title="Privacy Policy" icon={Shield}>
              <SubSection title="1. Information We Collect">
                <div className="space-y-6">
                  <FeatureCard
                    icon={Users}
                    title="Account Information"
                    items={[
                      'Email address and password',
                      'Name and profile information you provide',
                      'Job preferences and career goals'
                    ]}
                  />
                  <FeatureCard
                    icon={Zap}
                    title="Usage Data"
                    items={[
                      'Interview practice sessions and responses',
                      'Performance metrics and progress tracking',
                      'Device information and IP addresses',
                      'Service usage patterns and features accessed'
                    ]}
                  />
                  <FeatureCard
                    icon={FileText}
                    title="Interview Content"
                    items={[
                      'Your responses during mock interviews',
                      'Audio recordings (if enabled)',
                      'Feedback and ratings you provide'
                    ]}
                  />
                </div>
              </SubSection>

              <SubSection title="2. How We Use Your Information">
                <div className="grid gap-6 sm:gap-8">
                  <FeatureCard
                    icon={Zap}
                    title="Service Delivery"
                    items={[
                      'Provide personalized interview questions and feedback',
                      'Track your progress and performance over time',
                      'Improve AI responses based on your interactions'
                    ]}
                  />
                  <FeatureCard
                    icon={Shield}
                    title="Service Improvement"
                    items={[
                      'Analyze usage patterns to enhance our AI models',
                      'Develop new features and improvements',
                      'Ensure platform security and prevent abuse'
                    ]}
                  />
                  <FeatureCard
                    icon={Mail}
                    title="Communications"
                    items={[
                      'Send service updates and feature announcements',
                      'Provide customer support',
                      'Share interview tips and career resources (with your consent)'
                    ]}
                  />
                </div>
              </SubSection>

              <SubSection title="3. Information Sharing and Disclosure">
                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-gradient-to-r from-purple-500 to-teal-500 rounded-2xl p-6 sm:p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5 animate-pulse"></div>
                    
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
                      <div className="p-3 rounded-lg bg-white/20 flex-shrink-0 shadow-lg">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <strong className="text-xl sm:text-2xl block mb-2">We Do Not Sell Your Data</strong>
                        <p className="text-white/90 text-base sm:text-lg">Your personal information is never sold to third parties. This is our commitment to you.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-6">
                    <ContentCard>
                      <strong className="text-purple-400 block mb-3">Service Providers</strong>
                      <p className="text-gray-300 text-sm sm:text-base">Trusted vendors who help operate our platform (hosting, analytics, customer support)</p>
                    </ContentCard>
                    <ContentCard>
                      <strong className="text-purple-400 block mb-3">Legal Requirements</strong>
                      <p className="text-gray-300 text-sm sm:text-base">When required by law or to protect our rights</p>
                    </ContentCard>
                    <ContentCard>
                      <strong className="text-purple-400 block mb-3">Anonymized Data</strong>
                      <p className="text-gray-300 text-sm sm:text-base">We may share aggregated, non-identifiable statistics about interview trends</p>
                    </ContentCard>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-500/20 to-teal-500/20 border border-purple-400 rounded-xl shadow-lg">
                    <strong className="text-purple-400 text-sm sm:text-base">Your Interview Content:</strong>
                    <span className="text-sm sm:text-base text-gray-300"> Your practice interview responses are private and not shared with employers or third parties.</span>
                  </div>
                </div>
              </SubSection>

              <SubSection title="4. Data Security">
                <div className="grid sm:grid-cols-2 gap-6">
                  {securityFeatures.map((item: SecurityFeature, index: number) => (
                    <div key={index} className="p-4 sm:p-6 bg-gray-800 border border-gray-700 rounded-xl hover:border-purple-400 transition-all duration-300 group shadow-lg transform hover:scale-105">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <strong className="text-white block mb-2 text-sm sm:text-base">{item.title}</strong>
                      <p className="text-xs sm:text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="5. Data Retention">
                <div className="space-y-6">
                  <ContentCard>
                    <strong className="text-purple-400 text-sm sm:text-base">Account Data:</strong>
                    <span className="text-sm sm:text-base text-gray-300"> Retained while your account is active and for a reasonable period after deletion to comply with legal obligations.</span>
                  </ContentCard>
                  <ContentCard>
                    <strong className="text-purple-400 text-sm sm:text-base">Interview Sessions:</strong>
                    <span className="text-sm sm:text-base text-gray-300"> Practice sessions are retained to track your progress. You can delete individual sessions from your dashboard.</span>
                  </ContentCard>
                  <ContentCard>
                    <strong className="text-purple-400 text-sm sm:text-base">Deletion Requests:</strong>
                    <span className="text-sm sm:text-base text-gray-300"> You can request deletion of your account and associated data at any time.</span>
                  </ContentCard>
                </div>
              </SubSection>

              <SubSection title="6. Your Rights and Choices">
                <div className="space-y-6">
                  <ContentCard>
                    <h4 className="text-purple-400 font-semibold mb-4 text-base sm:text-lg">Access and Control</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 text-sm sm:text-base">
                      <li>View and update your account information</li>
                      <li>Download your interview history and progress data</li>
                      <li>Delete specific practice sessions or your entire account</li>
                    </ul>
                  </ContentCard>
                  <ContentCard>
                    <h4 className="text-purple-400 font-semibold mb-4 text-base sm:text-lg">Communication Preferences</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 text-sm sm:text-base">
                      <li>Opt-out of marketing emails while maintaining service communications</li>
                      <li>Control notification settings in your account dashboard</li>
                    </ul>
                  </ContentCard>
                  <div className="p-4 bg-gradient-to-r from-purple-500/20 to-teal-500/20 border border-purple-400 rounded-xl shadow-lg">
                    <strong className="text-purple-400 text-sm sm:text-base">Data Portability:</strong>
                    <span className="text-sm sm:text-base text-gray-300"> Request a copy of your data in a portable format.</span>
                  </div>
                </div>
              </SubSection>

              <SubSection title="7. Children's Privacy">
                <div className="p-4 sm:p-6 bg-orange-500/20 border border-orange-500 rounded-xl shadow-lg">
                  <p className="text-sm sm:text-base text-gray-300">SyntheView is not intended for users under 16 years of age. We do not knowingly collect personal information from children under 16.</p>
                </div>
              </SubSection>

              <SubSection title="8. International Users">
                <ContentCard>
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mb-3" />
                  <p className="text-sm sm:text-base text-gray-300">If you access SyntheView from outside the United States, you consent to the transfer and processing of your information in the United States.</p>
                </ContentCard>
              </SubSection>

              <SubSection title="9. Third-Party Services">
                <ContentCard>
                  <p className="text-sm sm:text-base text-gray-300">Our service may contain links to third-party websites or integrate with external services. This privacy policy does not apply to third-party services.</p>
                </ContentCard>
              </SubSection>

              <SubSection title="10. Contact Us">
                <div className="space-y-6">
                  <p className="text-sm sm:text-base text-white">For privacy-related questions or requests:</p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4 p-4 sm:p-6 bg-gray-800 border border-gray-700 rounded-xl hover:border-purple-400 transition-all duration-300 shadow-lg transform hover:scale-105">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-500">General Privacy</div>
                        <a href="mailto:privacy@syntheview.com" className="text-purple-400 hover:text-teal-400 transition-colors font-medium text-sm sm:text-base break-all underline">privacy@syntheview.com</a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 sm:p-6 bg-gray-800 border border-gray-700 rounded-xl hover:border-purple-400 transition-all duration-300 shadow-lg transform hover:scale-105">
                      <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-500">Data Protection Officer</div>
                        <a href="mailto:dpo@syntheview.com" className="text-purple-400 hover:text-teal-400 transition-colors font-medium text-sm sm:text-base break-all underline">dpo@syntheview.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </SubSection>
            </Section>
          </div>
        )}

        {activeSection === 'cookies' && (
          <div className="space-y-8 sm:space-y-12">
            <Section title="Cookie Policy" icon={Eye}>
              <SubSection title="1. What Are Cookies">
                <ContentCard>
                  <p className="text-sm sm:text-base text-gray-300 mb-4">
                    Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our service.
                  </p>
                </ContentCard>
              </SubSection>

              <SubSection title="2. Types of Cookies We Use">
                <div className="grid gap-6 sm:gap-8">
                  <FeatureCard
                    icon={Zap}
                    title="Essential Cookies"
                    description="Required for basic platform functionality, including user authentication and session management. These cookies cannot be disabled as they are necessary for the service to function."
                    items={[
                      'User session management',
                      'Authentication tokens',
                      'Security preferences',
                      'Basic functionality settings'
                    ]}
                  />

                  <FeatureCard
                    icon={Eye}
                    title="Analytics Cookies"
                    description="Help us understand how users interact with our platform to improve the user experience. These can be disabled in your browser settings without affecting core functionality."
                    items={[
                      'Page views and user journeys',
                      'Feature usage statistics',
                      'Performance metrics',
                      'Error tracking'
                    ]}
                  />

                  <FeatureCard
                    icon={Users}
                    title="Preference Cookies"
                    description="Remember your settings and preferences, such as theme selection and notification preferences. These enhance your user experience but are not required for basic functionality."
                    items={[
                      'Theme and display preferences',
                      'Notification settings',
                      'Language preferences',
                      'Dashboard customization'
                    ]}
                  />
                </div>
              </SubSection>

              <SubSection title="3. Managing Cookies">
                <ContentCard>
                  <h3 className="text-purple-400 font-semibold mb-4 text-base sm:text-lg">Cookie Control Options</h3>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">You can control cookie preferences through:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 text-sm sm:text-base">
                    <li>Your browser settings (most browsers allow you to block cookies)</li>
                    <li>Our cookie consent banner when you first visit</li>
                    <li>Your account settings for preference cookies</li>
                  </ul>
                </ContentCard>

                <div className="p-4 bg-gradient-to-r from-purple-500/20 to-teal-500/20 border border-purple-400 rounded-xl shadow-lg">
                  <strong className="text-purple-400 text-sm sm:text-base">Note:</strong>
                  <span className="text-sm sm:text-base text-gray-300"> Disabling essential cookies may affect the functionality of our service.</span>
                </div>
              </SubSection>

              <SubSection title="4. Third-Party Cookies">
                <ContentCard>
                  <p className="text-sm sm:text-base text-gray-300">
                    We may use third-party services that set their own cookies. These include analytics providers and customer support tools. Please refer to their respective privacy policies for more information.
                  </p>
                </ContentCard>
              </SubSection>

              <SubSection title="5. Updates to Cookie Policy">
                <ContentCard>
                  <p className="text-sm sm:text-base text-gray-300">
                    We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                  </p>
                </ContentCard>
              </SubSection>
            </Section>
          </div>
        )}

        {/* Agreement footer */}
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-gray-800">
          <div className="bg-gradient-to-r from-purple-500 to-teal-500 rounded-2xl p-6 sm:p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5 animate-pulse"></div>
            
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
              <div className="p-3 rounded-lg bg-white/20 flex-shrink-0 shadow-lg">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">Agreement</h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
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