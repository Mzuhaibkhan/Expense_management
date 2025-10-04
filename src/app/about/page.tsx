import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Target, 
  Users, 
  Zap, 
  Shield,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold mb-6">About ExpenseFlow</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make expense management effortless for companies of all sizes, 
              from startups to global enterprises.
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
                Traditional expense management is broken. It's time-consuming, error-prone, and frustrating 
                for everyone involved. We built ExpenseFlow to change that.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our platform combines cutting-edge OCR technology, intelligent approval workflows, and 
                real-time currency conversion to create a seamless expense management experience that 
                saves time and reduces errors.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that managing expenses should be as simple as taking a photo. That's why we've 
                built a platform that automates the tedious parts and empowers teams to focus on what 
                matters most.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Speed</h3>
                <p className="text-muted-foreground">
                  Fast approvals, instant insights, and quick reimbursements
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Security</h3>
                <p className="text-muted-foreground">
                  Bank-level encryption and compliance with global standards
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
                <p className="text-muted-foreground">
                  Intuitive design that anyone can use without training
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accuracy</h3>
                <p className="text-muted-foreground">
                  Precise OCR and currency conversion you can trust
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-muted/30 rounded-2xl p-12 mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose ExpenseFlow?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Global-Ready</h3>
                  <p className="text-muted-foreground">
                    Support for 150+ currencies with real-time conversion and multi-country operations
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Flexible Workflows</h3>
                  <p className="text-muted-foreground">
                    Customize approval chains to match your company's unique processes and policies
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered OCR</h3>
                  <p className="text-muted-foreground">
                    Advanced machine learning extracts data from receipts with industry-leading accuracy
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
                  <p className="text-muted-foreground">
                    SOC 2 compliant with end-to-end encryption and role-based access controls
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
                  <p className="text-muted-foreground">
                    Instant visibility into spending patterns, approval times, and team expenses
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
                  <p className="text-muted-foreground">
                    Connect with your existing accounting software and ERP systems effortlessly
                  </p>
                </div>
              </div>
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
              <Link href="/signup">
                <Button size="lg" variant="secondary">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}