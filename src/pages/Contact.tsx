import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';
import { MessageCircle, Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const presetPiece = searchParams.get('piece') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Make (Custom Order)');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Pre-fill fields if user was referred by a showroom catalog piece item query
  useEffect(() => {
    if (presetPiece) {
      setInterest('Resell (Shop Pieces)');
      setMessage(`Hello, I am interested in ordering/inquiring about the "${presetPiece}" piece from your showroom catalogue.`);
    }
  }, [presetPiece]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorStatus(null);

    const leadData = {
      name,
      email,
      projectType: interest,
      description: message,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Save directly to Firestore database
      await addDoc(collection(db, 'leads'), leadData);

      // 2. Dispatch email webhook notification to info@gvss.ng & eejiga77@gmail.com
      try {
        await fetch('https://formspree.io/f/xbjnbqzy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            interest,
            message,
            recipients: 'info@gvss.ng, eejiga77@gmail.com',
            _subject: `New Inquiry from ${name} [${interest}]`,
            submittedAt: new Date().toLocaleString()
          })
        });
      } catch (emailErr) {
        console.warn('Formspree/Webhook background dispatch:', emailErr);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting inquiry lead:', error);
      setErrorStatus('Failed to send inquiry to database. Please reach out directly on WhatsApp or Email.');
      handleFirestoreError(error, OperationType.WRITE, 'leads');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoLink = `mailto:info@gvss.ng,eejiga77@gmail.com?subject=${encodeURIComponent(`Leadwood & GVSS Inquiry from ${name || 'Client'}: ${interest}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${message}\n`)}`;
  const whatsappForwardLink = `https://wa.me/2348137167298?text=${encodeURIComponent(`*New Leadwood & GVSS Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Interest:* ${interest}\n\n*Message:*\n${message}`)}`;

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 md:px-8 bg-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-8 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <span className="text-orange-500 font-bold uppercase tracking-[0.35em] text-[10px] sm:text-xs">Get in Touch</span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight text-gray-900 leading-[0.95] sm:leading-[0.9]">
                Let's Build <br />
                <span className="italic font-serif text-neutral-400">Together.</span>
              </h1>
              <p className="text-base sm:text-xl text-gray-500 font-medium leading-relaxed max-w-md">
                Whether you're looking for a custom build, a restoration, property consultation, or a corporate partnership, our team is ready to help.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* WhatsApp Primary Card */}
              <a 
                href="https://wa.me/2348137167298" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 sm:gap-6 p-5 sm:p-8 bg-[#25D366]/10 rounded-2xl sm:rounded-[2.5rem] border border-[#25D366]/20 group hover:bg-[#25D366] transition-all duration-500 active:scale-[0.99]"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg group-hover:bg-white group-hover:text-[#25D366] transition-colors shrink-0">
                  <MessageCircle size={28} className="sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#25D366] mb-1 group-hover:text-white transition-colors">Primary Channel</h3>
                  <p className="text-xl sm:text-2xl font-display font-medium text-gray-900 group-hover:text-white transition-colors">Chat on WhatsApp</p>
                </div>
              </a>

              {/* Email & Call Responsive Grid (Stacked on mobile, 2 cols on tablet/desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <a 
                  href="mailto:info@gvss.ng"
                  className="p-6 sm:p-8 bg-neutral-50 hover:bg-neutral-100/80 rounded-2xl sm:rounded-[2.5rem] space-y-3 sm:space-y-4 transition-all duration-300 block group"
                >
                  <Mail className="text-neutral-400 group-hover:text-orange-500 transition-colors" size={22} />
                  <div>
                    <h4 className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Email US</h4>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base break-all group-hover:text-orange-600 transition-colors">info@gvss.ng</p>
                  </div>
                </a>

                <a 
                  href="tel:+2348137167298"
                  className="p-6 sm:p-8 bg-neutral-50 hover:bg-neutral-100/80 rounded-2xl sm:rounded-[2.5rem] space-y-3 sm:space-y-4 transition-all duration-300 block group"
                >
                  <Phone className="text-neutral-400 group-hover:text-orange-500 transition-colors" size={22} />
                  <div>
                    <h4 className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Call US</h4>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base group-hover:text-orange-600 transition-colors">+234 813 716 7298</p>
                  </div>
                </a>
              </div>

              {/* Location Information Card */}
              <div className="p-6 sm:p-8 bg-neutral-50 rounded-2xl sm:rounded-[2.5rem] flex items-center gap-4 sm:gap-6">
                <MapPin className="text-neutral-400 shrink-0" size={22} />
                <div>
                  <h4 className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Service Area</h4>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">90, Allen Avenue, Ikeja, Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card with high mobile responsiveness */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[3.5rem] border border-neutral-100 shadow-2xl shadow-black/5 min-h-[440px] flex flex-col justify-center mt-4 lg:mt-0"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-6 sm:py-8"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 text-emerald-500 rounded-full mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 size={32} className="sm:w-9 sm:h-9" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-display font-medium text-neutral-800">Inquiry Received</h2>
                    <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. Your inquiry has been received securely and our team will review your requirements and respond promptly.
                    </p>
                  </div>

                  {/* Immediate Action Buttons */}
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2.5 max-w-md mx-auto text-left">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Need instant real-time response?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a
                        href={whatsappForwardLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#25D366] text-white hover:bg-[#1ebd59] rounded-xl text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                      >
                        <MessageCircle size={14} />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <a
                        href={mailtoLink}
                        className="p-3 bg-neutral-900 text-white hover:bg-orange-500 rounded-xl text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                      >
                        <Mail size={14} />
                        <span>Open Mail Client</span>
                      </a>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setInterest('Make (Custom Order)');
                      setMessage('');
                    }}
                    className="px-8 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#E5A85C] ml-3 sm:ml-4">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl py-4 sm:py-5 px-5 sm:px-8 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all text-base font-medium" 
                      placeholder="e.g. Adebayo Adeleke" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-3 sm:ml-4">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl py-4 sm:py-5 px-5 sm:px-8 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all text-base font-medium" 
                      placeholder="e.g. adebayo@example.com" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-3 sm:ml-4">I am interested in</label>
                    <select 
                      value={interest}
                      onChange={e => setInterest(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl py-4 sm:py-5 px-5 sm:px-8 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all text-base font-medium appearance-none cursor-pointer"
                    >
                      <option value="Make (Custom Order)">Make (Custom Furniture Order)</option>
                      <option value="Leadwood Homes (Relocation / Buy / Rent)">Leadwood Homes (Relocation / Buy / Rent)</option>
                      <option value="Revamp (Restoration)">Revamp (Restoration)</option>
                      <option value="Resell (Showroom Pieces)">Resell (Showroom Pieces)</option>
                      <option value="Corporate Partnership">Corporate Partnership</option>
                      <option value="Business Care Plan">Business Care Plan</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-3 sm:ml-4">Message</label>
                    <textarea 
                      required
                      rows={4} 
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl py-4 sm:py-5 px-5 sm:px-8 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all text-base font-medium resize-none" 
                      placeholder="Tell us about your requirements or housing inquiry..."
                    />
                  </div>

                  {errorStatus && (
                    <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl text-xs font-medium leading-relaxed">
                      {errorStatus}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-4.5 sm:py-5 rounded-2xl text-[11px] sm:text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-500 transition-all duration-300 shadow-xl disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        Submitting Inquiry <Loader2 className="animate-spin" size={16} />
                      </>
                    ) : (
                      <>
                        Send Inquiry <Send size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

