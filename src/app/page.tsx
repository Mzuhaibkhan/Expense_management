import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Receipt, 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  TrendingUp, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                🚀 Modern Expense Management
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Expense Management Made
                <span className="text-primary"> Simple</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Streamline your expense workflow with intelligent OCR scanning, multi-level approvals, 
                and real-time currency conversion. Built for modern, global teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Features
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">Free 30-day trial</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/0ac10785-9b7f-49c4-b6cd-2db4d8ed1e52/generated_images/modern-expense-management-dashboard-inte-988e719e-20251004070702.jpg"
                  alt="ExpenseFlow Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to simplify expense management for teams of all sizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">OCR Scanning</h3>
              <p className="text-muted-foreground">
                Snap a photo of your receipt and let AI extract all the details automatically. 
                No more manual data entry.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Level Approvals</h3>
              <p className="text-muted-foreground">
                Configure sophisticated approval workflows with conditional rules, percentage thresholds, 
                and specific approvers.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Currency Conversion</h3>
              <p className="text-muted-foreground">
                Submit expenses in any currency. Automatic conversion to your company's default 
                currency with real-time exchange rates.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Policy Compliance</h3>
              <p className="text-muted-foreground">
                Enforce company policies automatically with configurable rules, spending limits, 
                and approval requirements.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
              <p className="text-muted-foreground">
                Get insights into spending patterns, approval times, and team expenses with 
                comprehensive dashboards.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Audit Trail</h3>
              <p className="text-muted-foreground">
                Complete audit history for every expense with immutable logs, comments, 
                and approval decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of companies streamlining their expense management with ExpenseFlow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10">
                  Learn More
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