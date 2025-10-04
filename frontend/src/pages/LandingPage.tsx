import { Button } from '@/components/ui/button';
import { MarketingNavbar } from '@/components/marketing/Navbar';
import { MarketingFooter } from '@/components/marketing/Footer';
import { Particles } from '@/components/ui/particles';
import { Target, Users, Zap, Shield, ArrowRight, CheckCircle, Receipt, DollarSign, TrendingUp, Clock, FileText, BarChart3, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    // Check if user prefers dark mode
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setColor(isDark ? "#ffffff" : "#000000");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-blue-50/30 to-background relative overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={250}
        ease={80}
        size={1.2}
        color={color}
        refresh
      />
      
      {/* Content */}
      <div className="relative z-10">
        <MarketingNavbar />
        
        {/* Hero Section - Enhanced */}
        <section className="pt-20 pb-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Next-Gen Expense Management</span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  Simplify Your
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Expense </span>
                  Management
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform the way your team handles expenses. From receipt scanning to approval workflows, 
                  ExpenseFlow automates everything so you can focus on growing your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                      Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                      Watch Demo
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
                    <span className="text-sm text-muted-foreground">30-day free trial</span>
                  </div>
                </div>
              </div>
              
              {/* Hero Image/Illustration */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="space-y-4">
                    {/* Mock Dashboard Preview */}
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                            <Receipt className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Total Expenses</h3>
                            <p className="text-sm opacity-80">This month</p>
                          </div>
                        </div>
                        <TrendingUp className="h-8 w-8 opacity-80" />
                      </div>
                      <div className="text-4xl font-bold">$47,329</div>
                      <div className="mt-2 text-sm opacity-80">↑ 12% from last month</div>
                    </div>
                    
                    {/* Mock Expense Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-xs font-medium text-green-600">Approved</span>
                        </div>
                        <div className="text-2xl font-bold">142</div>
                        <div className="text-xs text-muted-foreground">Expenses</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                            <Clock className="h-4 w-4 text-yellow-600" />
                          </div>
                          <span className="text-xs font-medium text-yellow-600">Pending</span>
                        </div>
                        <div className="text-2xl font-bold">23</div>
                        <div className="text-xs text-muted-foreground">Expenses</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-20 px-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Everything You Need</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to streamline your expense management workflow
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Receipt,
                  title: 'Smart Receipt Scanning',
                  desc: 'Snap a photo and let AI extract all the details automatically. No more manual data entry.',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  icon: Globe,
                  title: 'Multi-Currency Support',
                  desc: 'Handle expenses in 150+ currencies with real-time conversion rates and accurate reporting.',
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  icon: Zap,
                  title: 'Instant Approvals',
                  desc: 'Configure custom approval workflows and get expenses approved in seconds, not days.',
                  color: 'from-orange-500 to-orange-600'
                },
                {
                  icon: BarChart3,
                  title: 'Real-Time Analytics',
                  desc: 'Track spending patterns, identify trends, and make data-driven decisions with powerful insights.',
                  color: 'from-green-500 to-green-600'
                },
                {
                  icon: Shield,
                  title: 'Bank-Grade Security',
                  desc: 'SOC 2 compliant with end-to-end encryption and multi-factor authentication.',
                  color: 'from-red-500 to-red-600'
                },
                {
                  icon: FileText,
                  title: 'Automated Reporting',
                  desc: 'Generate comprehensive expense reports automatically with customizable templates.',
                  color: 'from-indigo-500 to-indigo-600'
                }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-1"
                >
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get started in minutes and transform your expense workflow
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Capture Receipt',
                  desc: 'Take a photo of your receipt or forward email receipts. Our AI extracts all details instantly.',
                  icon: Receipt
                },
                {
                  step: '02',
                  title: 'Submit & Track',
                  desc: 'Review the extracted data, add notes, and submit. Track approval status in real-time.',
                  icon: FileText
                },
                {
                  step: '03',
                  title: 'Get Reimbursed',
                  desc: 'Once approved, get reimbursed quickly. All data syncs with your accounting system.',
                  icon: DollarSign
                }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-1/4 right-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform translate-x-1/2 z-0"></div>
                  )}
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-6xl font-bold text-primary/10 mb-4">{step.step}</div>
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6">
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Enhanced */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Trusted by Industry Leaders</h2>
              <p className="text-xl opacity-90">Join thousands of companies saving time and money</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10,000+', label: 'Active Companies' },
                { value: '$2.4B+', label: 'Expenses Processed' },
                { value: '95%', label: 'Time Saved' },
                { value: '99.8%', label: 'Accuracy Rate' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold mb-2">{stat.value}</div>
                  <p className="text-lg opacity-90">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Choose ExpenseFlow?</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  We've built the most comprehensive expense management platform that scales with your business.
                </p>
                <div className="space-y-6">
                  {[
                    {title: 'AI-Powered OCR', desc: 'Industry-leading 99.8% accuracy in receipt data extraction'},
                    {title: 'Global-Ready', desc: 'Support for 150+ currencies with real-time conversion'},
                    {title: 'Flexible Workflows', desc: 'Customize approval chains to match your processes'},
                    {title: 'Enterprise Security', desc: 'SOC 2 Type II certified with bank-grade encryption'},
                    {title: 'Real-Time Analytics', desc: 'Actionable insights into spending patterns and trends'},
                    {title: 'Seamless Integration', desc: 'Connect with QuickBooks, Xero, SAP, and more'}
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right side image/illustration */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  {/* Mock approval workflow */}
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Sarah Johnson</div>
                        <div className="text-sm text-muted-foreground">Submitted expense</div>
                      </div>
                      <div className="text-xs text-muted-foreground">2m ago</div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <Target className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Manager Review</div>
                        <div className="text-sm text-muted-foreground">Pending approval</div>
                      </div>
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border flex items-center gap-4 opacity-50">
                      <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Reimbursement</div>
                        <div className="text-sm text-muted-foreground">Awaiting approval</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Transform Your Expense Management?</h2>
                <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                  Join 10,000+ companies already saving time and money with ExpenseFlow. 
                  Start your free 30-day trial today—no credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <Button size="lg" variant="secondary" className="text-lg px-10 py-6 shadow-xl hover:scale-105 transition-transform">
                      Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="text-lg px-10 py-6 bg-white/10 border-white text-white hover:bg-white/20 backdrop-blur-sm">
                      Schedule a Demo
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Free 30-day trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      <MarketingFooter />
      </div>
    </div>
  );
}
