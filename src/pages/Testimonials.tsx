import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Executive Relocation Manager',
    company: 'Global Energy Sector',
    text: 'G&V handled the complex housing needs of our senior management team with absolute precision. Their local knowledge of the Ikoyi and VI markets is unmatched.',
    rating: 5
  },
  {
    id: 2,
    name: 'Expatriate Family',
    company: 'Consular Services',
    text: 'Moving to Lagos with two kids felt overwhelming. G&V helped us find the perfect home near the school and even coordinated the furniture setup before we arrived.',
    rating: 5
  },
  {
    id: 3,
    name: 'HR Director',
    company: 'Multinational FMCG',
    text: 'The airport meet-and-greet service paired with their orientation tours has significantly reduced the settling-in time for our new assignees.',
    rating: 5
  },
  {
    id: 4,
    name: 'Operations Lead',
    company: 'Tech Infrastructure',
    text: 'Leadwood Furniture transformed our satellite office in Abuja within 48 hours. Professional, rapid, and surprisingly easy to coordinate.',
    rating: 5
  }
];

export function TestimonialsPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 px-6 bg-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mb-24 space-y-6">
          <h1 className="text-5xl md:text-8xl font-display font-medium tracking-tight text-gray-900 leading-none">
            Client <span className="text-gray-400">Voices.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-xl">
            Real feedback from global mobility teams, corporate assignees, and families who have experienced our support first-hand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-gray-50 p-12 rounded-[2.5rem] relative overflow-hidden group hover:bg-black hover:text-white transition-all duration-700"
            >
              <Quote size={80} className="absolute -top-4 -right-4 opacity-[0.03] text-black group-hover:text-white" />
              
              <div className="flex gap-1 text-red-600 mb-8">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <div className="space-y-8 relative z-10">
                <p className="text-xl md:text-2xl font-display font-medium leading-tight">
                  "{item.text}"
                </p>
                
                <div className="pt-8 border-t border-gray-200 group-hover:border-white/10 transition-colors">
                  <p className="text-sm font-bold uppercase tracking-widest">{item.name}</p>
                  <p className="text-xs opacity-40 font-medium">{item.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
