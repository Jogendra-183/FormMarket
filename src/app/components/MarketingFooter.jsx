import { Link } from "react-router";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Globe,
  Sprout
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const footerSections = [
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/about" },
      { label: "Team", to: "/about#team" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" }
    ]
  },
  {
    title: "Quick Links",
    links: [
      { label: "Browse Products", to: "/buyer/browse" },
      { label: "Sell Products", to: "/farmer/products" },
      { label: "Pricing", to: "/pricing" },
      { label: "Community", to: "/community" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/help" },
      { label: "FAQs", to: "/faqs" },
      { label: "Contact Us", to: "/contact" },
      { label: "Terms of Service", to: "/terms" }
    ]
  }
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Cookie Policy", to: "/cookies" }
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin }
];

function MarketingFooter() {
  const { theme } = useTheme();

  return (
    <footer className={`py-16 ${theme === "dark" ? "bg-slate-950" : "bg-slate-900"}`}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/20 rounded-2xl">
                <Sprout className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">FarmMarket</h3>
                <p className="text-sm text-slate-400">Harvest to Home</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Building the future of farm-to-table commerce. Empowering farmers,
              connecting markets, delivering freshness.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="p-3 bg-slate-800 hover:bg-emerald-500 rounded-xl text-slate-400 hover:text-white transition-all"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            <div className="space-y-3 text-slate-400 text-sm">
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                support@farmmarket.com
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                +91 1800-123-4567
              </p>
              <p className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-emerald-400" />
                www.farmmarket.com
              </p>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-bold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 FarmMarket. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { MarketingFooter };
