import { motion } from 'motion/react';
import { Hammer, Users, Clock, Award } from 'lucide-react';

const stats = [
  { icon: Clock, label: 'Years in Business', value: '10+' },
  { icon: Hammer, label: 'Projects Completed', value: '500+' },
  { icon: Users, label: 'Client Types', value: '20+' },
  { icon: Award, label: 'Quality Guarantee', value: '100%' },
];

export function AboutPage() {
  return (
    <div className="bg-white pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6 md:px-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">
                Our Story
              </span>
              <h1 className="text-5xl md:text-8xl font-display font-medium tracking-tight leading-[0.9]">
                Giving Furniture <br />
                <span className="italic font-serif text-neutral-400">New Life.</span>
              </h1>
              <p className="text-xl text-neutral-500 leading-relaxed max-w-lg">
                Leadwood began with a simple passion: the belief that quality furniture deserves more than just a single lifetime. From our workshop in Lagos, we've grown into a premier destination for custom builds and expert restoration.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1200&auto=format&fit=crop" 
                  alt="Our Workshop" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-black text-white p-10 rounded-[2rem] hidden md:block">
                <p className="text-4xl font-display font-medium">10+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-display font-medium">Our Mission</h2>
          <p className="text-2xl text-neutral-600 leading-relaxed font-medium">
            "We make, restore, and rehome quality furniture for homes and businesses across Lagos. Our goal is to blend artistry with functionality, ensuring every piece tells a story of craftsmanship."
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-24 px-6 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <stat.icon size={28} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-3xl font-display font-medium">{stat.value}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process/Workshop Shots */}
      <section className="py-32 px-6 bg-neutral-900 text-white rounded-[4rem] mx-6 md:mx-12 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-4">
             <h2 className="text-4xl md:text-6xl font-display font-medium">Inside the Workshop</h2>
             <p className="text-neutral-400 text-lg">Real shots of our process and finished pieces.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              'https://images.unsplash.com/photo-1540633169354-920ac2cd46cd?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop'
            ].map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="aspect-square rounded-[2rem] overflow-hidden"
              >
                <img src={img} className="w-full h-full object-cover" alt="Workshop Shot" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
