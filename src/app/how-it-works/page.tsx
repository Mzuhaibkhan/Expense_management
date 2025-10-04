import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Upload, 
  CheckCircle2, 
  Users2, 
  FileCheck,
  ArrowRight,
  Camera,
  FileText,
  Bell,
  TrendingUp
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">How ExpenseFlow Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From expense submission to approval and reimbursement - a seamless process in four simple steps
            </p>
          </div>

          {/* Step 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                1
              </div>
              <h2 className="text-4xl font-bold mb-4">Submit Your Expense</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Take a photo of your receipt or upload it from your device. Our intelligent OCR technology 
                automatically extracts all the important details - amount, date, merchant, and line items. 
                Review the extracted data, make any necessary corrections, and submit.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Camera className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Scan Receipt</h4>
                    <p className="text-sm text-muted-foreground">
                      Take a photo with your phone or upload from your computer
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Auto-Fill Details</h4>
                    <p className="text-sm text-muted-foreground">
                      OCR extracts merchant, amount, date, and category automatically
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Review & Submit</h4>
                    <p className="text-sm text-muted-foreground">
                      Verify the information and submit for approval
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
              <Upload className="h-48 w-48 text-primary/30" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1 aspect-square bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
              <Users2 className="h-48 w-48 text-primary/30" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                2
              </div>
              <h2 className="text-4xl font-bold mb-4">Approval Workflow</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your expense enters a customizable approval workflow. Based on your company's policies, 
                it may need approval from your manager, finance team, or specific approvers depending on 
                the amount and category.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Bell className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Automatic Routing</h4>
                    <p className="text-sm text-muted-foreground">
                      Expense is routed to the appropriate approvers based on rules
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Users2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Multi-Level Approval</h4>
                    <p className="text-sm text-muted-foreground">
                      Sequential or parallel approvals based on your workflow setup
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Smart Decisions</h4>
                    <p className="text-sm text-muted-foreground">
                      Conditional rules can auto-approve based on thresholds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                3
              </div>
              <h2 className="text-4xl font-bold mb-4">Review & Decision</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Approvers receive notifications and can review expenses in their approval queue. They see 
                all relevant details including the receipt image, original and converted amounts, and can 
                approve or reject with comments.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Bell className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Real-Time Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Approvers get notified immediately when action is required
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <FileCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Complete Context</h4>
                    <p className="text-sm text-muted-foreground">
                      View receipt, expense details, and approval history in one place
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Quick Actions</h4>
                    <p className="text-sm text-muted-foreground">
                      Approve or reject with a single click, add comments if needed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
              <FileCheck className="h-48 w-48 text-primary/30" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1 aspect-square bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center">
              <TrendingUp className="h-48 w-48 text-primary/30" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                4
              </div>
              <h2 className="text-4xl font-bold mb-4">Track & Analyze</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Once approved, expenses are ready for reimbursement. Administrators can export data for 
                accounting systems, while everyone can track spending patterns, approval times, and 
                generate reports for better financial insights.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Reimbursement Ready</h4>
                    <p className="text-sm text-muted-foreground">
                      Approved expenses are queued for payment processing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Analytics Dashboard</h4>
                    <p className="text-sm text-muted-foreground">
                      Visualize spending patterns, trends, and team metrics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Export & Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Export to CSV, Excel, or integrate with accounting software
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Summary */}
          <div className="bg-muted/30 rounded-2xl p-12 mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">The Complete Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Submit</h3>
                <p className="text-sm text-muted-foreground">Scan & submit your expense</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Route</h3>
                <p className="text-sm text-muted-foreground">Automatic approval routing</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Approve</h3>
                <p className="text-sm text-muted-foreground">Quick review & decision</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Analyze</h3>
                <p className="text-sm text-muted-foreground">Track & export data</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your free trial and experience the streamlined expense workflow yourself
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline">
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