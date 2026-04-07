import { motion } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  HelpCircle,
  BookOpen,
  MessageSquare,
  Mail,
  Phone,
  Video,
  Send,
  ExternalLink
} from "lucide-react";

function Help() {
  const { theme } = useTheme();

  const faqs = [
    {
      question: "How do I list my products?",
      answer: "To list your products, navigate to the Products page and click 'New Listing'. Fill in the product details, upload images, set your price, and publish. Your product will be reviewed and made available to buyers."
    },
    {
      question: "How do payments work?",
      answer: "Payments are processed securely through our platform. Buyers pay when they place an order, and funds are transferred to your account after successful delivery. You can track all transactions in your dashboard."
    },
    {
      question: "What are the platform fees?",
      answer: "FarmMarket charges a small commission on each sale to maintain the platform. The exact percentage depends on your subscription tier. Premium members enjoy reduced fees."
    },
    {
      question: "How do I handle shipping?",
      answer: "You can choose to handle shipping yourself or use our partner delivery services. Set your delivery areas and fees in your account settings. Buyers within your delivery zone can purchase your products."
    },
    {
      question: "How do I get verified?",
      answer: "Apply for verification by submitting your farm documents and certifications through your profile settings. Our team will review and verify your account within 3-5 business days."
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black mb-2">Help & Support</h1>
        <p className="text-muted-foreground">
          Get help with FarmMarket and learn how to make the most of the platform
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className={`rounded-2xl border ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
          }`}>
            <CardContent className="p-6">
              <BookOpen className="h-8 w-8 mb-3 text-indigo-600" />
              <h3 className="font-bold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse our comprehensive guides and tutorials
              </p>
              <Button variant="outline" className="w-full rounded-xl">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Docs
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Card className={`rounded-2xl border ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
          }`}>
            <CardContent className="p-6">
              <Video className="h-8 w-8 mb-3 text-indigo-600" />
              <h3 className="font-bold mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Watch step-by-step video guides
              </p>
              <Button variant="outline" className="w-full rounded-xl">
                <ExternalLink className="h-4 w-4 mr-2" />
                Watch Videos
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className={`rounded-2xl border ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
          }`}>
            <CardContent className="p-6">
              <MessageSquare className="h-8 w-8 mb-3 text-indigo-600" />
              <h3 className="font-bold mb-2">Community Forum</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with other farmers and users
              </p>
              <Button variant="outline" className="w-full rounded-xl">
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Forum
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <Card className={`rounded-2xl border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className={`rounded-2xl border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Contact Support
            </CardTitle>
            <CardDescription>
              Still need help? Send us a message
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Your Name</Label>
                <Input placeholder="John Doe" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Your Email</Label>
                <Input type="email" placeholder="john@example.com" className="rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="How can we help?" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea 
                placeholder="Describe your issue or question in detail..."
                className="rounded-xl min-h-[120px]"
              />
            </div>
            <Button className="w-full rounded-xl">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            
            <div className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-indigo-500/10' : 'bg-indigo-100'
            }`}>
              <p className="text-sm font-semibold mb-2">Other Ways to Reach Us</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@farmmarket.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
    </DashboardLayout>
  );
}

export default Help;
