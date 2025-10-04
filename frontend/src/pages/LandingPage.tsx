import { Button } from '@/components/ui/button';
import { MarketingNavbar } from '@/components/marketing/Navbar';
import { MarketingFooter } from '@/components/marketing/Footer';
import { Target, Users, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold mb-6">About ExpenseFlow</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make expense management effortless for companies of all sizes, from startups to global enterprises.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
              <Target className="h-48 w-48 text-primary/30" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Traditional expense management is broken. It's time-consuming, error-prone, and frustrating for everyone involved. We built ExpenseFlow to change that.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our platform combines cutting-edge OCR technology, intelligent approval workflows, and real-time currency conversion to create a seamless expense management experience that saves time and reduces errors.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that managing expenses should be as simple as taking a photo. That's why we've built a platform that automates the tedious parts and empowers teams to focus on what matters most.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{icon: Zap, title: 'Speed', desc: 'Fast approvals, instant insights, and quick reimbursements'}, {icon: Shield, title: 'Security', desc: 'Bank-level encryption and compliance with global standards'}, {icon: Users, title: 'Simplicity', desc: 'Intuitive design that anyone can use without training'}, {icon: CheckCircle, title: 'Accuracy', desc: 'Precise OCR and currency conversion you can trust'}].map((item) => (
                <div className="text-center" key={item.title}>
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-muted/30 rounded-2xl p-12 mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose ExpenseFlow?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[{title: 'Global-Ready', desc: 'Support for 150+ currencies with real-time conversion and multi-country operations'}, {title: 'Flexible Workflows', desc: 'Customize approval chains to match your company\'s unique processes and policies'}, {title: 'AI-Powered OCR', desc: 'Advanced machine learning extracts data from receipts with industry-leading accuracy'}, {title: 'Enterprise Security', desc: 'SOC 2 compliant with end-to-end encryption and role-based access controls'}, {title: 'Real-Time Analytics', desc: 'Instant visibility into spending patterns, approval times, and team expenses'}, {title: 'Seamless Integration', desc: 'Connect with your existing accounting software and ERP systems effortlessly'}].map(block => (
                <div className="flex gap-4" key={block.title}>
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{block.title}</h3>
                    <p className="text-muted-foreground">{block.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-lg text-muted-foreground">Companies Trust Us</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">95%</div>
              <p className="text-lg text-muted-foreground">Time Saved on Processing</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">99.5%</div>
              <p className="text-lg text-muted-foreground">OCR Accuracy Rate</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-4xl font-bold mb-4">Join Thousands of Happy Teams</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Experience the future of expense management. Start your free 30-day trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">Explore Features</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
