import { motion } from 'motion/react';
import { Palette, Ruler, Hammer, Truck, PenTool } from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    icon: Palette,
    title: 'Consultation',
    description: 'We discuss your vision, space requirements, and style preferences to build a design brief.',
    color: 'bg-orange-50'
  },
  {
    icon: PenTool,
    title: 'Concept & Sketch',
    description: 'Our designers create detailed sketches and 3D mockups for your approval before work begins.',
    color: 'bg-blue-50'
  },
  {
    icon: Ruler,
    title: 'Material Selection',
    description: 'Choose from our premium wood samples, leathers, and fabrics to match your aesthetic exactly.',
    color: 'bg-green-50'
  },
  {
    icon: Hammer,
    title: 'Precision Crafting',
    description: 'Our master craftsmen bring the design to life in our workshop with meticulous attention to detail.',
    color: 'bg-purple-50'
  },
  {
    icon: Truck,
    title: 'Delivery & Setup',
    description: 'White-glove delivery and professional arrangement in your space by our logistics team.',
    color: 'bg-neutral-100'
  }
];

export function DesignWorkflowPage() {
  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="container mx-auto">
        <div className="max-w-4xl mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm block mb-4"
          >
            Custom Services
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-medium text-black leading-tight mb-8"
          >
            Your Vision, <span className="text-neutral-400">Our Craft.</span><br />
            Process Workflow.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-500 leading-relaxed max-w-2xl"
          >
            We've refined our custom furniture engineering into a seamless journey from initial inspiration or renovation to a finished masterpiece in your home.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-neutral-200 -translate-x-1/2" />

          <div className="space-y-24 lg:space-y-40">
            {WORKFLOW_STEPS.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual Indicator */}
                <div className="flex-1 flex justify-center">
                  <div className={`w-64 h-64 rounded-full ${step.color} flex items-center justify-center relative`}>
                    <step.icon size={64} className="text-black" strokeWidth={1} />
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-display font-bold text-xl">
                      0{idx + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-3xl font-display font-medium text-black mb-6">
                    {step.title}
                  </h3>
                  <p className="text-lg text-neutral-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-40 p-12 md:p-20 bg-orange-500 rounded-[3rem] text-center text-white"
        >
          <h2 className="text-4xl md:text-6xl font-display font-medium mb-8">
            Ready to start your project?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Book a consultation with our Lead Architect to discuss your furniture needs and get a preliminary quote.
          </p>
          <a 
            href="/contact"
            className="inline-block px-12 py-6 bg-black text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all duration-500"
          >
            Book Free Consultation
          </a>
        </motion.div>
      </div>
    </div>
  );
}
