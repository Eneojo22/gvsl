import React from 'react';
import { motion } from 'motion/react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  fallbackImage: string;
  objectPosition?: string;
  bio: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Gospel Akuetiemhe',
    role: 'Managing Director',
    image: '/image/team-pic/md.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    objectPosition: 'center 8%',
    bio: 'Strategic leader focused on growth, operational excellence, and exceptional client outcomes for our relocation services.',
  },
  {
    name: 'Abiodun Akuetiemhe',
    role: 'Director, Administration & Human Resources',
    image: '/image/team-pic/Abiodun Akuetiemhe_Web Image.png',
    fallbackImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    objectPosition: 'center 15%',
    bio: 'HR and operations strategist dedicated to optimizing talent, strengthening organizational performance, and driving team synergy.',
  },
  {
    name: 'Daniel Adewole',
    role: 'Accountant',
    image: '/image/team-pic/daniel.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    objectPosition: 'center 15%',
    bio: 'Finance lead delivering transparent financial reporting, compliance, and effective cashflow management.',
  },
  {
    name: 'Oluwakemi Adesanwo',
    role: 'Facility Supervisor',
    image: '/image/team-pic/kemipic.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
    objectPosition: 'center 15%',
    bio: 'Facility operations expert maintaining safe, efficient environments, excellent support and vendor management.',
  },
  {
    name: 'Ifeoluwa Folorunsho',
    role: 'Admin & Client Relations Officer',
    image: '/image/team-pic/ifeoluwa.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    objectPosition: 'center 15%',
    bio: 'A detail-oriented administrative coordinator and client relations officer dedicated to efficient workflow management, prompt service delivery, and fostering strong client satisfaction.',
  },
  {
    name: 'Victor Ejiga',
    role: 'IT Team – Developer & IT Operations',
    image: '/image/team-pic/ejigavictor.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600',
    objectPosition: 'center 12%',
    bio: 'Supports digital systems, software development, and IT operations to keep business processes efficient and reliable.',
  },
  {
    name: 'Ogie Akuetiemhe',
    role: 'IT Team – Developer & IT Operations',
    image: '/image/team-pic/ogiepic.png',
    fallbackImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    objectPosition: 'center 15%',
    bio: 'Works across development and IT operations, helping to maintain secure, scalable, and effective technology solutions.',
  },
  {
    name: 'Olayiwola Oluwafemi',
    role: 'Project Specialist',
    image: '/image/team-pic/layiwola.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    objectPosition: 'center 15%',
    bio: 'Coordinates projects with a focus on execution, organization, and delivering quality results on time.',
  },
  {
    name: 'Toni Akuetiemhe',
    role: 'Design Consultant',
    image: '/image/team-pic/toni.PNG',
    fallbackImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    objectPosition: 'center 15%',
    bio: 'A versatile design consultant blending creativity and strategic space planning to develop elegant, practical, and inspiring environments for homes and corporate settings.',
  },
  {
    name: 'Lewis Gbagi',
    role: 'Workshop Foreman',
    image: '/image/team-pic/gbagi-lawis.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
    objectPosition: 'center 15%',
    bio: 'Oversees production operations, leads a high-performing team, and ensures strict quality control standards are maintained across all projects.',
  },
];

export function TeamPage() {
  return (
    <div className="bg-white min-h-screen pt-32 sm:pt-36 md:pt-40 pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm block mb-3"
          >
            Our Team
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-neutral-900 leading-tight mb-6"
          >
            Meet our Team<br />
            <span className="text-neutral-400 font-light">Passionate. Proactive. Expert.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-500 leading-relaxed max-w-2xl font-normal"
          >
            We lead with care as our core value and share a dedicated passion for 
            connecting your relocation, housing, and workspace needs with world-class solutions across Nigeria.
          </motion.p>
        </div>

        {/* Team Grid: 4 columns on Desktop (lg), 2 on Tablet (sm), 1 on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-14 sm:gap-y-16">
          {TEAM.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.4 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Circular Profile Image Container */}
              <div className="w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 aspect-square rounded-full overflow-hidden mb-6 bg-neutral-100 border border-neutral-200/80 shadow-sm flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                <img 
                  src={member.image} 
                  alt={member.name}
                  style={{ objectPosition: member.objectPosition || 'center 15%' }}
                  onError={(e) => {
                    if (e.currentTarget.src !== member.fallbackImage) {
                      e.currentTarget.src = member.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover transition-all duration-700"
                  loading="lazy"
                />
              </div>

              {/* Member Details - In Normal Document Flow Below Image */}
              <div className="flex flex-col items-center w-full">
                <h3 className="text-lg sm:text-xl font-display font-medium text-neutral-900 mb-1 leading-snug">
                  {member.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-3 leading-normal">
                  {member.role}
                </p>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal max-w-xs">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
