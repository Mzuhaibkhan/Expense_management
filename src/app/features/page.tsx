import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Camera, 
  CheckCircle, 
  Globe, 
  Users, 
  TrendingUp, 
  Shield,
  Workflow,
  FileText,
  Clock,
  DollarSign,
  Bell,
  Download
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Powerful Features</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage expenses efficiently, from submission to approval and beyond
            </p>
          </div>

          {/* Feature 1: OCR Scanning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                Intelligent Automation
              </div>
              <h2 className="text-4xl font-bold mb-4">OCR Receipt Scanning</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Simply snap a photo of your receipt and watch as our advanced OCR technology extracts 
                all the relevant information - amount, date, merchant, and line items. No more tedious 
                manual data entry.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Automatic extraction of amount, date, and merchant</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Support for multiple receipt formats and languages</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Human-in-the-loop verification for accuracy</span>
                </li>
              </ul>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/0ac10785-9b7f-49c4-b6cd-2db4d8ed1e52/generated_images/ocr-receipt-scanning-technology-visualiz-856feb6a-20251004070711.jpg"
                alt="OCR Receipt Scanning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Feature 2: Multi-Level Approvals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1 aspect-video rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/0ac10785-9b7f-49c4-b6cd-2db4d8ed1e52/generated_images/multi-level-approval-workflow-diagram%2c-ec957418-20251004070717.jpg"
                alt="Multi-Level Approval Workflow"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                Flexible Workflows
              </div>
              <h2 className="text-4xl font-bold mb-4">Multi-Level Approval Workflows</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Design sophisticated approval chains with conditional rules. Set percentage thresholds, 
                specific approvers, or hybrid logic to ensure the right people review the right expenses.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Sequential or parallel approval steps</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Conditional rules based on amount or category</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Manager hierarchy and delegation support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3: Currency Conversion */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                Global Support
              </div>
              <h2 className="text-4xl font-bold mb-4">Real-Time Currency Conversion</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Submit expenses in any currency and have them automatically converted to your company's 
                default currency. Real-time exchange rates ensure accurate reporting and approval decisions.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Support for 150+ currencies worldwide</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Daily exchange rate updates from trusted sources</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Historical rate snapshots for audit compliance</span>
                </li>
              </ul>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/0ac10785-9b7f-49c4-b6cd-2db4d8ed1e52/generated_images/global-currency-conversion-visualization-8ab3ccdf-20251004070724.jpg"
                alt="Currency Conversion"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
              <p className="text-muted-foreground">
                Track spending patterns, approval times, and team expenses with real-time dashboards and reports.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Policy Enforcement</h3>
              <p className="text-muted-foreground">
                Automatically enforce spending limits, category restrictions, and approval requirements.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Audit Trail</h3>
              <p className="text-muted-foreground">
                Complete history of every expense with immutable logs, comments, and approval decisions.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">SLA Tracking</h3>
              <p className="text-muted-foreground">
                Monitor approval times and set escalation rules to ensure timely expense processing.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Notifications</h3>
              <p className="text-muted-foreground">
                Stay informed with real-time notifications for submissions, approvals, and rejections.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Export & Integration</h3>
              <p className="text-muted-foreground">
                Export to CSV, Excel, or integrate with your existing accounting and ERP systems.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience These Features?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your free 30-day trial today. No credit card required.
            </p>
            <Link href="/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}