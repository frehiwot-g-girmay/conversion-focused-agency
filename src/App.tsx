import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, Zap, BarChart3, Target, MessageSquare, 
  CheckCircle2, Award, Users, Download, Play, ChevronRight, 
  Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, 
  Globe, Search, TrendingUp, DollarSign, Rocket, PieChart, 
  Layers, Megaphone, Smartphone, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell 
} from 'recharts';

// --- Shared Components ---

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg' }>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md hover:shadow-lg",
      secondary: "bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
      outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
      ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400"
    };
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-3.5 text-lg"
    };
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle, centered = true, dark = false }: { title: string, subtitle?: string, centered?: boolean, dark?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
    {subtitle && <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>}
  </div>
);

// --- Sections ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className={`text-2xl font-black tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>NEXGEN</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-indigo-600 ${isScrolled ? 'text-gray-600' : 'text-white/90 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <Button size="md" className="font-bold">Contact Us</Button>
        </nav>

        {/* Mobile Toggle */}
        <button className={`lg:hidden p-2 ${isScrolled ? 'text-gray-900' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 lg:hidden bg-white z-50 flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black text-indigo-600">NEXGEN</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-900"><X size={32} /></button>
            </div>
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-3xl font-bold text-gray-900" onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <Button className="w-full py-5 text-xl mt-8">Get Started</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-900">
      {/* Background with Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/117846ef-f48d-4776-b31b-2de0cc82fb4d/hero-image-242ab28f-1772208556496.webp" 
          alt="Modern agency" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-900/60 to-indigo-900/20" />
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-white/10 text-white text-sm font-semibold mb-8 backdrop-blur-md border border-white/20">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
              <span>Elite Digital Excellence for 2024</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
              DOMINATE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">DIGITAL MARKET</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-medium">
              We build high-performance marketing machines that turn your vision into predictable, scalable revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="h-16 px-10 text-lg font-bold group">
                Scale My Business
                <Rocket className="ml-3 w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                View Results
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-20 pt-10 border-t border-white/10 flex flex-wrap gap-12"
          >
            <div>
              <div className="text-4xl font-black text-white mb-1">500+</div>
              <div className="text-indigo-400 text-sm font-bold uppercase tracking-widest">Global Clients</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-1">10X</div>
              <div className="text-indigo-400 text-sm font-bold uppercase tracking-widest">Avg. Growth</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-1">$500M+</div>
              <div className="text-indigo-400 text-sm font-bold uppercase tracking-widest">Revenue Generated</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsDashboard = () => {
  const chartData = [
    { name: 'Mon', organic: 4000, paid: 2400 },
    { name: 'Tue', organic: 3000, paid: 3500 },
    { name: 'Wed', organic: 5000, paid: 9800 },
    { name: 'Thu', organic: 2780, paid: 3908 },
    { name: 'Fri', organic: 1890, paid: 4800 },
    { name: 'Sat', organic: 2390, paid: 3800 },
    { name: 'Sun', organic: 6490, paid: 4300 },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-indigo-600 font-black text-sm uppercase tracking-widest mb-4 block">Proven Performance</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">Numbers That Fuel Your Ambition</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              We don't hide behind vanity metrics. Our performance dashboard gives you a transparent look at your customer acquisition cost, ROI, and pipeline velocity.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Retention Rate', value: '98%', icon: Users, color: 'text-blue-600' },
                { label: 'Lead Velocity', value: '+142%', icon: Zap, color: 'text-amber-500' },
                { label: 'Ad Spend ROI', value: '12.4x', icon: DollarSign, color: 'text-green-600' },
                { label: 'Market Share', value: '45%', icon: Target, color: 'text-indigo-600' }
              ].map((item, i) => (
                <Card key={i} className="p-6 border-none shadow-md hover:shadow-xl transition-shadow">
                  <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                  <div className="text-3xl font-black text-gray-900 mb-1">{item.value}</div>
                  <div className="text-sm font-bold text-gray-500 uppercase">{item.label}</div>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full -z-10 animate-blob" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-100 rounded-full -z-10 animate-blob animation-delay-2000" />
            
            <Card className="p-8 shadow-2xl border-none">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Campaign Performance</h3>
                  <p className="text-sm text-gray-500">Live multi-channel data tracking</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center text-xs font-bold text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2" /> Paid
                  </div>
                  <div className="flex items-center text-xs font-bold text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2" /> Organic
                  </div>
                </div>
              </div>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="paidGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="orgGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontWeight: 700 }}
                    />
                    <Area type="monotone" dataKey="paid" stroke="#6366f1" fillOpacity={1} fill="url(#paidGrad)" strokeWidth={4} />
                    <Area type="monotone" dataKey="organic" stroke="#10b981" fillOpacity={1} fill="url(#orgGrad)" strokeWidth={4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Precision SEO',
      description: 'Beyond keywords. We build semantic authority and technical foundations that dominate SERPs long-term.',
      icon: Search,
      img: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/117846ef-f48d-4776-b31b-2de0cc82fb4d/data-analysis-service-57024aa1-1772208550978.webp',
      benefits: ['Technical Audits', 'Entity-Based SEO', 'Backlink Velocity']
    },
    {
      title: 'Paid Media Scaling',
      description: 'Aggressive ROAS focused campaigns across Google, Meta, and TikTok. We spend your money like it’s ours.',
      icon: Target,
      img: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/117846ef-f48d-4776-b31b-2de0cc82fb4d/strategy-service-6c3747f4-1772208552312.webp',
      benefits: ['Algorithmic Bidding', 'Creative Testing', 'LTV Focused']
    },
    {
      title: 'Brand Storytelling',
      description: 'Emotional design meets strategic positioning. We make your brand impossible to ignore in a crowded market.',
      icon: Layers,
      img: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/117846ef-f48d-4776-b31b-2de0cc82fb4d/social-media-service-6b3219d5-1772208551186.webp',
      benefits: ['Visual Identity', 'Copywriting', 'Content Funnels']
    }
  ];

  return (
    <section id="services" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Growth Architectures" 
          subtitle="Precision-engineered services designed to solve complex growth challenges."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full group hover:border-indigo-600 transition-colors border-2 border-transparent">
                <div className="h-64 overflow-hidden relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-6 left-6 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <service.icon className="text-indigo-600 w-6 h-6" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-8 font-medium">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-10">
                    {service.benefits.map((b, bi) => (
                      <li key={bi} className="flex items-center text-sm font-bold text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 mr-2" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="p-0 h-auto hover:bg-transparent text-indigo-600 font-black group/btn">
                    Explore Implementation <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { title: 'Luxe Retail Rebrand', cat: 'Full Service', metric: '+240% Sales', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800' },
    { title: 'TechSaaS Acquisition', cat: 'Paid Media', metric: '$2.50 CAC', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
    { title: 'BioHealth SEO', cat: 'Content Strategy', metric: '1M+ Monthly Visits', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800' },
    { title: 'Urban Estate Ads', cat: 'Lead Generation', metric: '15x Pipeline', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <section id="portfolio" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-indigo-400 font-black text-sm uppercase tracking-widest mb-4 block">Our Work</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Featured Success Stories</h2>
          </div>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">View Portfolio</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }} 
              className="relative group h-[400px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <span className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-2 block">{p.cat}</span>
                <h3 className="text-3xl font-black text-white mb-4">{p.title}</h3>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-white font-bold">{p.metric}</span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md text-white group-hover:bg-indigo-600 transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: 'Launch',
      price: '$2,995',
      desc: 'Ideal for startups ready to establish a dominant market presence.',
      features: ['Technical SEO Foundation', 'Ad Strategy & Setup', 'Social Content Kit', '24/7 Live Dashboard'],
      cta: 'Start Launching',
      popular: false
    },
    {
      name: 'Accelerate',
      price: '$5,995',
      desc: 'Our most popular plan for businesses looking to scale aggressively.',
      features: ['Full Funnel Management', 'Content Production Hub', 'Influencer Outreach', 'Conversion Rate Opt', 'Weekly Strategy Sprints'],
      cta: 'Scale Now',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'Global solutions for brands requiring massive scale and complex systems.',
      features: ['Dedicated Growth Team', 'Omni-channel Dominance', 'Full PR & Media Buying', 'Predictive Modeling', 'Unlimited Support'],
      cta: 'Talk to Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle title="Investment Tiers" subtitle="Transparent pricing designed to scale with your success." />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <Card key={idx} className={`flex flex-col p-10 relative ${plan.popular ? 'border-indigo-600 border-2 shadow-2xl ring-4 ring-indigo-50' : 'border-gray-100'}`}>
              {plan.popular && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-black text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-500 mb-8 font-medium">{plan.desc}</p>
              <div className="flex items-baseline mb-10">
                <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                {plan.name !== 'Enterprise' && <span className="text-gray-500 font-bold ml-2">/mo</span>}
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center text-gray-700 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full py-5 text-lg font-black uppercase tracking-widest">
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      text: "NexGen didn't just manage our ads; they rebuilt our entire customer acquisition framework. Our revenue has tripled in 8 months.",
      author: "David Ross",
      role: "Founder, Stellar Tech",
      avatar: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/117846ef-f48d-4776-b31b-2de0cc82fb4d/team-member-2-8f028df6-1772208551666.webp"
    },
    {
      text: "The most transparent agency I've ever worked with. The performance dashboard is a game-changer for our executive team.",
      author: "Sarah Meyer",
      role: "CMO, GreenLeaf Global",
      avatar: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/117846ef-f48d-4776-b31b-2de0cc82fb4d/team-member-1-a0f13e41-1772208551982.webp"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-1">
            <div className="flex space-x-1 mb-6">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="text-amber-500 fill-amber-500 w-6 h-6" />)}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Trusted by Market Leaders</h2>
            <p className="text-xl text-gray-600">Join 500+ companies that have scaled their digital presence with NexGen.</p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((r, i) => (
              <Card key={i} className="p-10 border-none shadow-xl relative">
                <MessageSquare className="absolute top-6 right-8 text-indigo-100 w-16 h-16 -z-0" />
                <p className="text-xl text-gray-700 italic font-medium mb-10 relative z-10 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-4 relative z-10">
                  <img src={r.avatar} alt={r.author} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <div className="font-black text-gray-900">{r.author}</div>
                    <div className="text-indigo-600 font-bold text-sm uppercase">{r.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ResourceBar = () => {
  return (
    <section className="py-12 bg-indigo-600 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-md border border-white/20">
              <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/117846ef-f48d-4776-b31b-2de0cc82fb4d/free-resource-mockup-7261dfc5-1772208558856.webp" alt="Ebook" className="w-12 h-16 object-cover rounded shadow-lg" />
            </div>
            <div>
              <h3 className="text-2xl font-black">Free Growth Audit Guide</h3>
              <p className="text-indigo-100 font-medium">Download our 45-page blueprint for scaling in 2024.</p>
            </div>
          </div>
          <div className="flex w-full lg:w-auto gap-3">
            <input className="bg-white/10 border border-white/20 rounded-lg px-6 py-4 flex-grow lg:w-80 outline-none focus:bg-white/20 transition-all placeholder:text-white/60" placeholder="Your work email" />
            <Button variant="secondary" className="px-8 font-black">Download</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent! Our strategists will reach out within 2 hours.");
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px]" />
            <h2 className="text-5xl font-black mb-8 leading-tight">Let's Build Your <br /> Growth Engine.</h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              We typically reply within 2 hours. Join our high-performance client roster and start dominating today.
            </p>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Call Us Directly</div>
                  <div className="text-xl font-bold">+1 (888) NEX-GEN1</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Email Strategy</div>
                  <div className="text-xl font-bold">growth@nexgen.agency</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-white p-12 lg:p-20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500">Full Name</label>
                  <input required className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all" placeholder="Alex Rivera" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500">Work Email</label>
                  <input required type="email" className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all" placeholder="alex@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Company Website</label>
                <input required className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all" placeholder="https://example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Monthly Ad Budget</label>
                <select className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all">
                  <option>$5k - $10k</option>
                  <option>$10k - $50k</option>
                  <option>$50k - $100k</option>
                  <option>$100k+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Your Message</label>
                <textarea className="w-full px-5 py-4 rounded-xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all min-h-[120px]" placeholder="Tell us about your conversion goals..."></textarea>
              </div>
              <Button disabled={isSubmitting} className="w-full h-16 text-lg font-black uppercase tracking-widest" type="submit">
                {isSubmitting ? 'Securing Slot...' : 'Request Growth Audit'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight">NEXGEN</span>
            </a>
            <p className="text-gray-400 font-medium leading-relaxed">
              We aren't just an agency. We are your outsourced growth department, focused on one thing only: your bottom line.
            </p>
            <div className="flex space-x-4">
              {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all text-white/60 hover:text-white">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-8 text-indigo-400">Expertise</h4>
            <ul className="space-y-4 text-gray-400 font-bold">
              <li><a href="#" className="hover:text-white transition-colors">Performance SEO</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Paid Acquisition</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Creative Strategy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">B2B Lead Gen</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conversion Rate Opt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-8 text-indigo-400">Company</h4>
            <ul className="space-y-4 text-gray-400 font-bold">
              <li><a href="#" className="hover:text-white transition-colors">Our Ethos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">The Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-8 text-indigo-400">Headquarters</h4>
            <p className="text-gray-400 font-bold mb-4">
              123 Marketing Way, Suite 500<br />
              San Francisco, CA 94103
            </p>
            <p className="text-indigo-400 font-black">+1 (888) NEX-GEN1</p>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm font-bold">© 2024 NEXGEN GLOBAL. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 text-xs font-black uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-600 selection:text-white">
      <Toaster position="top-center" richColors />
      <Header />
      <Hero />
      <StatsDashboard />
      <Services />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <ResourceBar />
      <LeadForm />
      <Footer />
    </div>
  );
}