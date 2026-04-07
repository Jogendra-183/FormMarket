import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Award,
  BookOpen,
  Camera,
  CheckCircle2,
  ClipboardList,
  Clock,
  CreditCard,
  Crown,
  FileText,
  Globe,
  HelpCircle,
  LifeBuoy,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  Newspaper,
  Phone,
  Search,
  Shield,
  Sparkles,
  Sprout,
  Star,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { MarketingLayout } from "../components/MarketingLayout";

const PAGE_CONTENT = {
  privacy: {
    badge: "Privacy",
    title: "Privacy Policy",
    subtitle: "We protect your data and keep you in control of what you share.",
    highlights: [
      {
        title: "Data ownership",
        description: "Your farm, your data. You decide what gets shared.",
        icon: Shield
      },
      {
        title: "Security first",
        description: "Encryption, access controls, and continuous monitoring.",
        icon: Lock
      },
      {
        title: "Clear choices",
        description: "Manage preferences and export your data anytime.",
        icon: CheckCircle2
      }
    ],
    sections: [
      {
        title: "What we collect",
        description: "Account details, listings, orders, and usage analytics to improve the marketplace.",
        icon: ClipboardList
      },
      {
        title: "How we use it",
        description: "To power search, recommendations, payments, and customer support.",
        icon: Search
      },
      {
        title: "Sharing and access",
        description: "We share only what is needed to complete transactions and comply with laws.",
        icon: Users
      },
      {
        title: "Retention",
        description: "We keep data only as long as needed for service and compliance.",
        icon: Clock
      }
    ],
    cta: { label: "Create a secure account", to: "/register" }
  },
  terms: {
    badge: "Terms",
    title: "Terms of Service",
    subtitle: "Clear rules that keep the marketplace fair for farmers and buyers.",
    highlights: [
      {
        title: "Fair use",
        description: "Respect listings, pricing, and communication guidelines.",
        icon: FileText
      },
      {
        title: "Payments",
        description: "Secure processing with transparent fees and receipts.",
        icon: CreditCard
      },
      {
        title: "Community trust",
        description: "Verified profiles and dispute support keep everyone safe.",
        icon: Shield
      }
    ],
    sections: [
      {
        title: "Account responsibilities",
        description: "Keep credentials secure and provide accurate business details.",
        icon: Users
      },
      {
        title: "Marketplace rules",
        description: "List only real inventory and keep pricing up to date.",
        icon: ClipboardList
      },
      {
        title: "Refunds and disputes",
        description: "We help resolve issues with fair mediation and clear timelines.",
        icon: HelpCircle
      },
      {
        title: "Service updates",
        description: "We may refine features to improve reliability and safety.",
        icon: TrendingUp
      }
    ],
    cta: { label: "Explore pricing", to: "/pricing" }
  },
  cookies: {
    badge: "Cookies",
    title: "Cookie Policy",
    subtitle: "Small files that help personalize your FarmMarket experience.",
    highlights: [
      {
        title: "Essential cookies",
        description: "Required for login, checkout, and basic navigation.",
        icon: Shield
      },
      {
        title: "Experience tuning",
        description: "Remember themes, filters, and language preferences.",
        icon: Sparkles
      },
      {
        title: "Analytics",
        description: "Understand what helps farmers and buyers succeed.",
        icon: TrendingUp
      }
    ],
    sections: [
      {
        title: "Types of cookies",
        description: "Session, preference, and analytics cookies support the service.",
        icon: ClipboardList
      },
      {
        title: "Managing preferences",
        description: "Update browser settings or opt out in your account profile.",
        icon: Lock
      },
      {
        title: "Third-party tools",
        description: "We use vetted providers for analytics and performance.",
        icon: Globe
      },
      {
        title: "Expiration",
        description: "Cookies have clear expiration windows to protect privacy.",
        icon: Clock
      }
    ],
    cta: { label: "Visit Help Center", to: "/help" }
  },
  pricing: {
    badge: "Pricing",
    title: "Plans built for every farm size",
    subtitle: "Start free, upgrade as you scale, and keep your margins healthy.",
    highlights: [
      {
        title: "No setup fees",
        description: "Launch in minutes with zero onboarding cost.",
        icon: Sparkles
      },
      {
        title: "Growth analytics",
        description: "Track demand, orders, and repeat buyers.",
        icon: TrendingUp
      },
      {
        title: "Secure payments",
        description: "Protected payouts and transparent statements.",
        icon: Shield
      }
    ],
    plans: [
      {
        name: "Starter",
        price: "Free",
        description: "Perfect for new farmers testing the marketplace.",
        icon: Sprout,
        features: [
          "Public storefront",
          "Basic analytics",
          "Community access",
          "Email support"
        ],
        cta: { label: "Start free", to: "/register?role=farmer" }
      },
      {
        name: "Growth",
        price: "₹499/mo",
        description: "Boost visibility and manage more orders with ease.",
        icon: Star,
        tag: "Most Popular",
        features: [
          "Priority listings",
          "Advanced analytics",
          "Order automation",
          "Priority support"
        ],
        cta: { label: "Upgrade now", to: "/register?role=farmer" }
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Tailored solutions for co-ops and large distributors.",
        icon: Crown,
        features: [
          "Dedicated success team",
          "Custom integrations",
          "Regional fulfillment",
          "SLA-backed support"
        ],
        cta: { label: "Talk to sales", to: "/contact" }
      }
    ],
    cta: { label: "See buyer plans", to: "/register?role=buyer" }
  },
  careers: {
    badge: "Careers",
    title: "Grow the future of agriculture with us",
    subtitle: "Join a mission-driven team focused on farmers and food systems.",
    highlights: [
      {
        title: "Meaningful impact",
        description: "Help farmers earn more while buyers get fresher food.",
        icon: Target
      },
      {
        title: "Remote-friendly",
        description: "Collaborate across regions with flexible schedules.",
        icon: Globe
      },
      {
        title: "Career growth",
        description: "Mentorship, learning budgets, and leadership tracks.",
        icon: Award
      }
    ],
    sections: [
      {
        title: "How we work",
        description: "Small teams, fast decisions, and customer-driven delivery.",
        icon: Users
      },
      {
        title: "Benefits",
        description: "Health coverage, wellness days, and home office support.",
        icon: Sparkles
      },
      {
        title: "Open roles",
        description: "Product, engineering, partnerships, and operations roles.",
        icon: ClipboardList
      },
      {
        title: "Hiring process",
        description: "Intro call, skills session, and team culture interview.",
        icon: TrendingUp
      }
    ],
    cta: { label: "Contact recruiting", to: "/contact" }
  },
  press: {
    badge: "Press",
    title: "Press and media resources",
    subtitle: "Download brand assets and connect with our media team.",
    highlights: [
      {
        title: "Brand kit",
        description: "Logos, colors, and photography guidelines.",
        icon: Camera
      },
      {
        title: "Newsroom",
        description: "Latest announcements and releases.",
        icon: Newspaper
      },
      {
        title: "Media support",
        description: "Fast response times for inquiries.",
        icon: Megaphone
      }
    ],
    sections: [
      {
        title: "Press inquiries",
        description: "Email our media team for interviews and statements.",
        icon: Mail
      },
      {
        title: "Brand guidelines",
        description: "Keep FarmMarket messaging consistent across channels.",
        icon: FileText
      },
      {
        title: "Regional coverage",
        description: "Stories from farmers, buyers, and partner communities.",
        icon: Globe
      },
      {
        title: "Thought leadership",
        description: "Insights on food systems and supply chain resilience.",
        icon: TrendingUp
      }
    ],
    cta: { label: "Email press@farmmarket.com", href: "mailto:press@farmmarket.com" }
  },
  contact: {
    badge: "Contact",
    title: "We are here to help",
    subtitle: "Reach our support team or ask about partnerships.",
    highlights: [
      {
        title: "Fast responses",
        description: "Most requests answered within one business day.",
        icon: Clock
      },
      {
        title: "Dedicated partners",
        description: "Account managers for co-ops and distributors.",
        icon: Users
      },
      {
        title: "Secure support",
        description: "Your data stays protected while we assist.",
        icon: Shield
      }
    ],
    contactMethods: [
      {
        label: "Email",
        value: "support@farmmarket.com",
        description: "General questions and technical help",
        icon: Mail,
        action: { label: "Send email", href: "mailto:support@farmmarket.com" }
      },
      {
        label: "Phone",
        value: "+91 1800-123-4567",
        description: "Mon-Fri, 9:00 AM - 6:00 PM",
        icon: Phone,
        action: { label: "Call support", href: "tel:+9118001234567" }
      },
      {
        label: "Office",
        value: "Bengaluru, India",
        description: "Regional partner hub",
        icon: MapPin
      },
      {
        label: "Community",
        value: "Farmer forums and events",
        description: "Connect with other growers",
        icon: MessageSquare,
        action: { label: "Visit community", to: "/community" }
      }
    ],
    cta: { label: "Visit Help Center", to: "/help" }
  },
  help: {
    badge: "Help",
    title: "Help Center",
    subtitle: "Guides, checklists, and tutorials to keep you moving.",
    highlights: [
      {
        title: "Getting started",
        description: "Launch your storefront in minutes.",
        icon: Sprout
      },
      {
        title: "Orders and delivery",
        description: "Track fulfillment, returns, and payouts.",
        icon: ClipboardList
      },
      {
        title: "Account security",
        description: "Keep your profile and payments protected.",
        icon: Shield
      }
    ],
    sections: [
      {
        title: "Farmer playbooks",
        description: "Pricing, inventory, and demand forecasting tips.",
        icon: BookOpen
      },
      {
        title: "Buyer guides",
        description: "Curated sourcing and subscription insights.",
        icon: Search
      },
      {
        title: "Support workflows",
        description: "Escalations, refunds, and ticket tracking.",
        icon: LifeBuoy
      },
      {
        title: "Community resources",
        description: "Events, webinars, and local meetups.",
        icon: MessageSquare
      }
    ],
    cta: { label: "Browse FAQs", to: "/faqs" }
  },
  faqs: {
    badge: "FAQs",
    title: "Frequently asked questions",
    subtitle: "Quick answers for the most common FarmMarket questions.",
    faqs: [
      {
        question: "How do I verify my farm?",
        answer: "Complete your profile and upload business documents in the farmer dashboard. Verification usually takes 24-48 hours."
      },
      {
        question: "How are payments processed?",
        answer: "Payments are secured through encrypted providers with payouts on a weekly schedule."
      },
      {
        question: "Can buyers schedule recurring deliveries?",
        answer: "Yes. Subscription plans allow weekly or bi-weekly delivery scheduling with flexible pause options."
      },
      {
        question: "What if an order has a quality issue?",
        answer: "Report the issue in your order history and our support team will help resolve it quickly."
      }
    ],
    cta: { label: "Contact support", to: "/contact" }
  }
};

function PublicInfoPage({ page }) {
  const content = PAGE_CONTENT[page];

  if (!content) {
    return (
      <MarketingLayout>
        <div className="container mx-auto px-4 py-16">
          <Card className="fm-panel rounded-3xl p-8">
            <CardHeader>
              <CardTitle>Page not found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The page you are looking for does not exist. Try returning to the home page.
              </p>
              <Button asChild>
                <Link to="/">Back to home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </MarketingLayout>
    );
  }

  return (
    <MarketingLayout>
      <section className="container mx-auto px-4 space-y-16">
        <motion.div
          className="fm-panel rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            {content.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black mb-4">{content.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {content.highlights && (
          <div className="grid gap-6 md:grid-cols-3">
            {content.highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="fm-card h-full">
                    <CardHeader className="space-y-3">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-emerald-600" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      {item.description}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {content.plans && (
          <div className="grid gap-6 lg:grid-cols-3">
            {content.plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`fm-card h-full ${plan.tag ? "border-emerald-500/50" : ""}`}>
                    <CardHeader className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{plan.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                          </div>
                        </div>
                        {plan.tag && (
                          <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-500/20">
                            {plan.tag}
                          </Badge>
                        )}
                      </div>
                      <div className="text-3xl font-black">{plan.price}</div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {plan.cta && (
                        <Button className="w-full" asChild>
                          <Link to={plan.cta.to}>{plan.cta.label}</Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {content.sections && (
          <div className="grid gap-6 lg:grid-cols-2">
            {content.sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="fm-card h-full">
                    <CardHeader className="space-y-3">
                      <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-emerald-600" />
                      </div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      {section.description}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {content.contactMethods && (
          <div className="grid gap-6 md:grid-cols-2">
            {content.contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="fm-card h-full">
                    <CardHeader className="space-y-3">
                      <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-emerald-600" />
                      </div>
                      <CardTitle className="text-lg">{method.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-muted-foreground">
                      <p className="text-base font-semibold text-foreground">
                        {method.value}
                      </p>
                      <p>{method.description}</p>
                      {method.action && (
                        <Button variant="outline" size="sm" asChild>
                          {method.action.to ? (
                            <Link to={method.action.to}>{method.action.label}</Link>
                          ) : (
                            <a href={method.action.href}>{method.action.label}</a>
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {content.faqs && (
          <div className="grid gap-6 lg:grid-cols-2">
            {content.faqs.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="fm-card h-full">
                  <CardHeader className="space-y-3">
                    <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <HelpCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {item.answer}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {content.cta && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.cta.to ? (
              <Button size="lg" asChild>
                <Link to={content.cta.to}>{content.cta.label}</Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <a href={content.cta.href}>{content.cta.label}</a>
              </Button>
            )}
          </motion.div>
        )}
      </section>
    </MarketingLayout>
  );
}

export { PublicInfoPage };
