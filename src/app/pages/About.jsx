import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Sprout,
  Target,
  Users,
  Leaf,
  TrendingUp,
  Shield,
  Heart,
  Globe
} from "lucide-react";

function About() {
  const { theme } = useTheme();

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We're committed to promoting sustainable farming practices and reducing environmental impact."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building strong connections between farmers and consumers to create a thriving local food ecosystem."
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Every farmer is verified, every product is authentic, and every transaction is secure."
    },
    {
      icon: Heart,
      title: "Quality Focused",
      description: "We prioritize fresh, high-quality produce that meets the highest standards."
    }
  ];

  const stats = [
    { label: "Active Farmers", value: "2,400+", icon: Users },
    { label: "Products Listed", value: "18,000+", icon: Sprout },
    { label: "Weekly Orders", value: "45,000+", icon: TrendingUp },
    { label: "Cities Served", value: "150+", icon: Globe }
  ];

  const teamMembers = [
    {
      name: "Aanya Rao",
      role: "Co-founder & CEO",
      focus: "Marketplace strategy and farmer success."
    },
    {
      name: "Karthik Iyer",
      role: "CTO",
      focus: "Platform reliability and data security."
    },
    {
      name: "Meera Shah",
      role: "Head of Growth",
      focus: "Partnerships and regional expansion."
    },
    {
      name: "Rohit Menon",
      role: "Product Lead",
      focus: "Buyer experience and subscription growth."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`p-4 rounded-2xl ${
            theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
          }`}>
            <Sprout className="h-12 w-12 text-emerald-600" />
          </div>
        </div>
        <h1 className="text-5xl font-black mb-4">About FarmMarket</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Connecting farmers directly with consumers to create a sustainable, 
          transparent, and thriving local food marketplace.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className={`rounded-2xl border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Target className="h-6 w-6" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground leading-relaxed space-y-4">
            <p>
              FarmMarket was founded with a simple yet powerful mission: to revolutionize 
              the way fresh produce moves from farm to table. We believe that farmers 
              deserve fair prices for their hard work, and consumers deserve access to 
              fresh, locally-sourced food.
            </p>
            <p>
              By eliminating unnecessary intermediaries, we create a direct connection 
              that benefits everyone. Farmers gain better market access and fair compensation, 
              while buyers enjoy fresher produce at competitive prices.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
            >
              <Card className={`rounded-2xl border ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-indigo-600" />
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-black text-center mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card className={`rounded-2xl border h-full ${
                  theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
                }`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${
                        theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-100'
                      }`}>
                        <Icon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Team */}
      <motion.div
        id="team"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="text-center mb-8">
          <Badge className="mb-3 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            Leadership
          </Badge>
          <h2 className="text-3xl font-black">Meet the Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A cross-functional team obsessed with farmer impact and buyer trust.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <Card className={`rounded-2xl border ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black ${
                      theme === 'dark' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {member.name.split(" ").map((part) => part[0]).join("")}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    {member.focus}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <Card className={`rounded-2xl border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
        }`}>
          <CardHeader>
            <CardTitle className="text-2xl">The Story Behind FarmMarket</CardTitle>
            <CardDescription className="text-base">
              How we started and where we're headed
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              Founded in 2024, FarmMarket emerged from a simple observation: the agricultural 
              supply chain was broken. Farmers struggled to find markets for their produce, 
              while urban consumers paid premium prices for food that wasn't always fresh.
            </p>
            <p>
              Our founders, a group of agricultural technologists and former farmers, 
              envisioned a platform that would leverage modern technology to recreate the 
              traditional farmer's market experience at scale. The result is FarmMarket—a 
              digital marketplace that brings the farm to your doorstep.
            </p>
            <p>
              Today, we're proud to serve thousands of farmers and hundreds of thousands 
              of customers across the country. But we're just getting started. Our vision 
              is to create a sustainable food system that works for everyone, from the 
              smallest family farm to the largest urban community.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-center text-muted-foreground"
      >
        <p className="text-sm">
          © 2026 FarmMarket. Building the future of sustainable agriculture.
        </p>
      </motion.div>
    </div>
  );
}

export { About };
