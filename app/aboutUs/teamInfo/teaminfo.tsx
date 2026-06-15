
'use client'

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageCarouselProps {
  title: string;
  subtitle?: string;
  image: string;
  overlayOpacity?: string;
  height?: string;
}

interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string;
  imageClassName?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Gospel  Akuetiemhe',
    title: 'Managing Director',
    image: '/image/team-pic/md.jpeg',
    bio: 'Strategic leader focused on growth, operational excellence, and exceptional client outcomes for our relocation services.',
  },
  {
    name: ' Abiodun  Akuetiemhe',
    title: 'Director, Administration & Human Resources',
    image: '/image/team-pic/Abiodun Akuetiemhe_Web Image.png',
    bio: 'HR and operations strategist dedicated to optimizing talent, strengthening organizational performance, and driving team synergy',
  },
  {
    name: 'Daniel Adewole',
    title: 'Accountant',
    image: '/image/team-pic/',
    bio: 'Finance lead delivering transparent financial reporting, compliance, and effective cashflow management.',
  },
  {
    name: 'Oluwakemi Adesanwo',
    title: 'Facility Supervisor',
    image: '/image/team-pic/kemipic.jpg',
    bio: 'Facility operations expert maintaining safe, efficient environments, excellent support and vendor management.',
  },
  {
    name: 'Ifeoluwa Folorunsho',
    title: 'Admin & Client Relations Officer',
    image: '/image/team-pic/ifeoluwa.jpeg',
    bio: 'A detail-oriented administrative coordinator and client relations officer dedicated to efficient workflow management, prompt service delivery, and fostering strong client satisfaction.',
  },
  {
    name: 'Victor Ejiga',
    title: 'IT Team – Developer & IT Operations',
    image: '/image/team-pic/ejigavictor.jpeg',
    bio: 'Supports digital systems, software development, and IT operations to keep business processes efficient and reliable.',
  },
  {
    name: 'Ogie Akuetiemhe ',
    title: 'IT Team – Developer & IT Operations',
    image: '/image/team-pic/ogiepic.png',
    bio: 'Works across development and IT operations, helping to maintain secure, scalable, and effective technology solutions.',
  },
  {
    name: 'Oluwafemi Layiwola',
    title: 'Project Specialist',
    image: '/image/team-pic/layiwola.jpeg',
    bio: 'Coordinates projects with a focus on execution, organization, and delivering quality results on time.',
  },
  {
    name: 'Toni Akuetiemhe',
    title: 'Design Consultant',
    image: '/image/team-pic/toni.PNG',
    bio: 'Provides creative design direction and visualA versatile design consultant blending creativity and strategic space planning to develop elegant, practical, and inspiring environments for homes and corporate settings solutions that strengthen brand identity and user experience.',
  },
{
  name: 'Lewis Gbagi',
  title: 'Workshop Foreman',
  image: '/image/team-pic/gbagi-lawis.jpeg',
  bio: 'As Workshop Foreman at Leadwood Furniture, Lewis oversees production operations, leads a high-performing team, and ensures strict quality control standards are maintained across all projects.',
},
];

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function TeamMemberImage({ member }: { member: TeamMember }) {
  const [hasImageError, setHasImageError] = useState(false);

  if (hasImageError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-white text-3xl font-semibold tracking-[0.18em] text-slate-500">
        {getInitials(member.name)}
      </div>
    );
  }

  return (
    <Image
      src={member.image}
      alt={member.name}
      fill
      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 92vw"
      className={`object-cover object-top ${member.imageClassName ?? ''}`}
      onError={() => setHasImageError(true)}
    />
  );
}

export function ImageCarousel({
  title,
  subtitle,
  image,
  overlayOpacity = 'bg-black/60',
  height = 'h-[600px] sm:h-[600px]',
}: ImageCarouselProps) {
  return (
    <section className={`relative isolate overflow-hidden ${height}`}>
  <Image
    src={image}
    alt={title}
    fill
    priority
    className="object-center object-cover"
  />
  <div className={`absolute inset-0 ${overlayOpacity}`} />
  <div className="relative z-10 flex h-full items-center">
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl text-white">
        <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="mt-4 text-sm text-slate-100 md:text-base">{subtitle}</p>
        ) : null}
      </div>
    </div>
  </div>
</section>
  );
}

export default function Company() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-[#fd4c07] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">Our Leadership</p>
              <h1 className="text-3xl font-bold md:text-5xl">Professional Team Driving Global Mobility Excellence</h1>
              <p className="mt-4 max-w-2xl text-sm text-slate-200 md:text-base">
                We combine relocation expertise, local knowledge, and operational precision to deliver tailored relocation outcomes. From strategy and administration to finance and facilities, our team ensures seamless transitions for every client.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/20">Trusted Advisors</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/20">Expert Support</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/20">Client Focused</span>
              </div>
            </div>
            <div className="rounded-3xl border border-white/20 bg-[#0f172a]/70 p-6 shadow-2xl backdrop-blur">
              <div className="text-sm uppercase tracking-[0.2em] text-slate-300">Our Values</div>
              <ul className="mt-4 space-y-3 text-slate-200">
                <li className="rounded-xl bg-white/10 p-3">Customer-first service with transparent communication.</li>
                <li className="rounded-xl bg-white/10 p-3">Reliable processes built on local and global experience.</li>
                <li className="rounded-xl bg-white/10 p-3">Data-driven recommendations and personalized support.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd5500]">Meet the Team</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Experienced experts, dedicated to your success</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Our multidisciplinary team blends relocation strategy, operations, finance, and people management to deliver seamless outcomes.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-100">
                <TeamMemberImage member={member} />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[#dd5500]">{member.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{member.bio}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
}
