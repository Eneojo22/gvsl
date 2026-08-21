import React, { useState, useEffect } from 'react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut, 
  Loader2, 
  Image as ImageIcon, 
  MapPin, 
  Type, 
  Mail, 
  LogIn,
  CheckCircle2,
  AlertCircle,
  X,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { MediaUploader } from '../components/MediaUploader';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  size: 'large' | 'medium' | 'small';
  type: 'portfolio' | 'home' | 'furniture';
  before?: string;
  after?: string;
  portfolioType?: 'Custom Builds' | 'Revamps';
  client?: string;
  testimonial?: string;
  price?: string;
  promoPrice?: string;
  dimensions?: string;
  material?: string;
  condition?: string;
  isFurniture?: boolean;
  isRoom?: boolean;
  inStock?: boolean;
  colors?: string;
  tower?: string;
  rentBuy?: string;
  unitType?: string;
}

const isVideoUrl = (url?: string) => {
  if (!url) return false;
  return url.startsWith('data:video/') || url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm') || url.toLowerCase().includes('.mov') || url.toLowerCase().includes('.ogg');
};

function AdminMediaPreview({ src, className, alt = "Media" }: { src?: string; className?: string; alt?: string }) {
  if (!src) return null;
  if (isVideoUrl(src)) {
    return (
      <video 
        src={src} 
        className={className} 
        muted 
        loop 
        autoPlay 
        playsInline 
        style={{ pointerEvents: 'none' }}
      />
    );
  }
  return <img src={src} className={className} alt={alt} />;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  projectType: string;
  category?: string;
  description: string;
  measurements?: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: string;
}

export function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'leads'>('portfolio');
  const [adminListType, setAdminListType] = useState<'all' | 'furniture' | 'home' | 'portfolio'>('all');
  
  // Login State
  const [loginMode, setLoginMode] = useState<'google' | 'email'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Deletion Modal State
  const [deleteModal, setDeleteModal] = useState<{
    id: string;
    title: string;
    type: 'project' | 'lead';
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Feedback Notification State
  const [feedbackNotice, setFeedbackNotice] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [refreshingList, setRefreshingList] = useState(false);

  const initialFormState: Partial<Project> = {
    title: '',
    description: '',
    image: '',
    category: 'Sofas',
    location: '',
    size: 'small',
    type: 'furniture',
    before: '',
    after: '',
    portfolioType: 'Custom Builds',
    client: '',
    testimonial: '',
    price: '',
    promoPrice: '',
    dimensions: '',
    material: '',
    condition: 'New',
    isFurniture: false,
    isRoom: false,
    inStock: true,
    colors: '',
    tower: 'Tower A',
    rentBuy: 'Buy',
    unitType: 'Penthouse'
  };

  const [form, setForm] = useState<Partial<Project>>(initialFormState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        fetchProjects();
        fetchLeads();
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (feedbackNotice) {
      const timer = setTimeout(() => setFeedbackNotice(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [feedbackNotice]);

  const fetchProjects = async () => {
    setRefreshingList(true);
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Project));
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      handleFirestoreError(error, OperationType.LIST, 'projects');
    } finally {
      setRefreshingList(false);
    }
  };

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Lead));
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
      handleFirestoreError(error, OperationType.LIST, 'leads');
    }
  };

  const handleLogin = async () => {
    if (loginLoading) return;
    setLoginLoading(true);
    setLoginError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Login failed', error);
      if (error.code === 'auth/popup-blocked') {
        setLoginError('The login popup was blocked by your browser. Please allow popups for this site and try again.');
      } else if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        setLoginError('Login was cancelled. Please try again.');
      } else {
        setLoginError('An unexpected error occurred during login. Please try again.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginLoading) return;
    setLoginLoading(true);
    setLoginError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login failed', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        setLoginError('Invalid email or password. Please double-check your credentials.');
      } else {
        setLoginError('Login failed: ' + (error.message || 'Authentication error'));
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setFeedbackNotice(null);

    try {
      const submissionData = { ...form };

      // Optional Title Handling: Fallback smoothly if left blank
      const defaultTitle = submissionData.category 
        ? `${submissionData.category} Piece` 
        : (submissionData.type === 'home' ? 'Luxury Residence' : 'Leadwood Custom Build');
      submissionData.title = submissionData.title?.trim() || defaultTitle;

      // Optional Image Handling: Fallback smoothly if not provided
      const defaultImage = submissionData.type === 'home'
        ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
        : (submissionData.type === 'furniture'
          ? 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop'
          : 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop');

      if (!submissionData.image || !submissionData.image.trim()) {
        submissionData.image = submissionData.after || submissionData.before || defaultImage;
      }

      if (submissionData.type === 'portfolio') {
        // Resolve images and before/after values:
        submissionData.image = submissionData.image || submissionData.after || submissionData.before || defaultImage;
        submissionData.after = submissionData.after || submissionData.image || '';
        submissionData.before = submissionData.before || submissionData.image || '';

        // Auto-assign isFurniture and isRoom flags based on selected category
        const catLower = submissionData.category?.toLowerCase() || '';
        submissionData.isFurniture = submissionData.isFurniture ?? (catLower === 'furniture' || catLower === 'custom builds');
        submissionData.isRoom = submissionData.isRoom ?? (catLower === 'rooms' || catLower === 'residential' || catLower === 'commercial');
      }

      if (isEditing) {
        await updateDoc(doc(db, 'projects', isEditing), {
          ...submissionData,
          updatedAt: serverTimestamp()
        });
        setFeedbackNotice({
          type: 'success',
          message: `"${submissionData.title}" was updated successfully!`
        });
      } else {
        await addDoc(collection(db, 'projects'), {
          ...submissionData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        setFeedbackNotice({
          type: 'success',
          message: `"${submissionData.title}" was added to the catalog!`
        });
      }

      // Reset form
      setForm(initialFormState);
      setIsEditing(null);
      await fetchProjects();
    } catch (error) {
      console.error('Save failed:', error);
      setFeedbackNotice({
        type: 'error',
        message: 'Could not save item. Please check your network and try again.'
      });
      handleFirestoreError(error, isEditing ? OperationType.UPDATE : OperationType.CREATE, 'projects');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (p: Project) => {
    setForm({
      title: p.title || '',
      description: p.description || '',
      image: p.image || '',
      category: p.category || (p.type === 'home' ? 'Homes' : (p.type === 'portfolio' ? 'Furniture' : 'Sofas')),
      location: p.location || '',
      size: p.size || 'small',
      type: p.type || 'furniture',
      before: p.before || '',
      after: p.after || '',
      portfolioType: p.portfolioType || 'Custom Builds',
      client: p.client || '',
      testimonial: p.testimonial || '',
      price: p.price || '',
      promoPrice: p.promoPrice || '',
      dimensions: p.dimensions || '',
      material: p.material || '',
      condition: p.condition || 'New',
      isFurniture: p.isFurniture || false,
      isRoom: p.isRoom || false,
      inStock: p.inStock === undefined ? true : p.inStock,
      colors: p.colors || '',
      tower: p.tower || 'Tower A',
      rentBuy: p.rentBuy || 'Buy',
      unitType: p.unitType || 'Penthouse'
    });
    setIsEditing(p.id);
    setTimeout(() => {
      document.getElementById('admin-form-container')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setForm(initialFormState);
  };

  const confirmDeleteAction = async () => {
    if (!deleteModal || isDeleting) return;
    setIsDeleting(true);
    try {
      if (deleteModal.type === 'project') {
        await deleteDoc(doc(db, 'projects', deleteModal.id));
        setProjects(prev => prev.filter(p => p.id !== deleteModal.id));
        setFeedbackNotice({
          type: 'success',
          message: `Item "${deleteModal.title}" was deleted.`
        });
      } else {
        await deleteDoc(doc(db, 'leads', deleteModal.id));
        setLeads(prev => prev.filter(l => l.id !== deleteModal.id));
        setFeedbackNotice({
          type: 'success',
          message: `Inquiry from "${deleteModal.title}" was removed.`
        });
      }
      setDeleteModal(null);
    } catch (error) {
      console.error('Delete failed:', error);
      setFeedbackNotice({
        type: 'error',
        message: 'Could not delete item. Please verify permissions and try again.'
      });
      handleFirestoreError(error, OperationType.DELETE, `${deleteModal.type === 'project' ? 'projects' : 'leads'}/${deleteModal.id}`);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <Loader2 className="animate-spin text-orange-500" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-10 sm:p-12 rounded-[2.5rem] shadow-2xl space-y-8 border border-neutral-100">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-display font-medium text-neutral-900">Admin Portal</h1>
            <p className="text-neutral-500 text-sm">Sign in to manage showroom items, homes & restoration portfolios.</p>
          </div>

          <div className="flex p-1 bg-neutral-100 rounded-2xl">
            <button 
              onClick={() => setLoginMode('email')}
              className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer ${loginMode === 'email' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              Email Login
            </button>
            <button 
              onClick={() => setLoginMode('google')}
              className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer ${loginMode === 'google' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              Google Auth
            </button>
          </div>

          {loginMode === 'email' ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Official Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-neutral-300" size={18} />
                  <input 
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-12 pr-6 py-3.5 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-sm" 
                    placeholder="zoho@gvss.ng"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Password</label>
                <div className="relative">
                  <input 
                    required
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-6 py-3.5 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-sm" 
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loginLoading}
                className="w-full py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-orange-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {loginLoading ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={18} /> Sign In</>}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <button 
                onClick={handleLogin}
                disabled={loginLoading}
                className="w-full py-4 bg-white border-2 border-neutral-100 text-black rounded-2xl font-bold uppercase tracking-widest hover:border-orange-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Signing in...
                  </>
                ) : (
                  <>
                    <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                    Sign in with Google
                  </>
                )}
              </button>
            </div>
          )}

          {loginError && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 flex items-start gap-3 text-left"
            >
              <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p>{loginError}</p>
            </motion.div>
          )}

          <div className="text-center">
            <p className="text-[10px] text-neutral-300 uppercase tracking-widest">
              Secured by Leadwood Systems
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-28 sm:pt-32 pb-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-display font-medium text-neutral-900">Admin Portal</h1>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-extrabold uppercase tracking-widest rounded-full">
                Active Session
              </span>
            </div>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => setActiveTab('portfolio')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  activeTab === 'portfolio' ? 'bg-black text-white shadow-md' : 'bg-white text-neutral-500 hover:text-black border border-neutral-100'
                }`}
              >
                Catalog & Portfolios ({projects.length})
              </button>
              <button 
                onClick={() => setActiveTab('leads')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  activeTab === 'leads' ? 'bg-black text-white shadow-md' : 'bg-white text-neutral-500 hover:text-black border border-neutral-100'
                }`}
              >
                Leads & Inquiries {leads.length > 0 && <span className="ml-1.5 bg-orange-500 text-white px-2 py-0.5 rounded-full text-[9px]">{leads.length}</span>}
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchProjects();
                fetchLeads();
              }}
              title="Refresh Data"
              className="p-3 bg-white rounded-xl border border-neutral-200 text-neutral-500 hover:text-black transition-all cursor-pointer hover:shadow-sm"
            >
              <RefreshCw size={18} className={refreshingList ? 'animate-spin text-orange-500' : ''} />
            </button>
            <div className="text-right hidden sm:block bg-white px-4 py-2 rounded-xl border border-neutral-200">
              <p className="text-xs font-bold text-neutral-900">{user.displayName || user.email?.split('@')[0]}</p>
              <p className="text-[10px] text-neutral-400 font-mono">{user.email}</p>
            </div>
            <button 
              onClick={() => signOut(auth)}
              title="Sign Out"
              className="p-3 bg-white rounded-xl border border-neutral-200 text-neutral-400 hover:text-red-500 transition-all cursor-pointer"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        <AnimatePresence>
          {feedbackNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-sm border ${
                feedbackNotice.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {feedbackNotice.type === 'success' ? (
                  <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-medium">{feedbackNotice.message}</span>
              </div>
              <button 
                onClick={() => setFeedbackNotice(null)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'portfolio' ? (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Form Column */}
            <div className="lg:col-span-5" id="admin-form-container">
              <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-lg border border-neutral-100 sticky top-28 sm:top-32 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isEditing ? 'bg-orange-50 text-orange-600' : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {isEditing ? <Edit2 size={18} /> : <Plus size={18} />}
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-medium text-neutral-900">
                        {isEditing ? 'Edit Item' : 'Add Item'}
                      </h2>
                      <p className="text-[10px] text-neutral-400">
                        {isEditing ? 'Modify item fields and click Update' : 'All fields are optional with smart defaults'}
                      </p>
                    </div>
                  </div>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-800 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-all"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                {isEditing && (
                  <div className="p-3 bg-orange-50 text-orange-800 border border-orange-200 rounded-xl text-xs flex items-center justify-between">
                    <span className="truncate">Editing: <strong>{form.title || 'Untitled Item'}</strong></span>
                    <button onClick={handleCancelEdit} className="text-orange-900 font-bold text-[10px] uppercase ml-2 hover:underline">
                      Reset
                    </button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  {/* Title (Optional) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Item Title</label>
                      <span className="text-[9px] text-neutral-400 font-mono italic">Optional</span>
                    </div>
                    <div className="relative">
                      <Type className="absolute left-4 top-3.5 text-neutral-300" size={16} />
                      <input 
                        value={form.title || ''}
                        onChange={e => setForm({...form, title: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-sm text-neutral-800" 
                        placeholder="e.g. Modern Bouclé Sofa or Ikoyi Villa"
                      />
                    </div>
                  </div>

                  {/* Type and Category selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Catalog Section</label>
                      <select 
                        value={form.type}
                        onChange={e => {
                          const newType = e.target.value as any;
                          let nextCategory = 'Homes';
                          if (newType === 'portfolio') {
                            nextCategory = 'Furniture';
                          } else if (newType === 'furniture') {
                            nextCategory = 'Sofas';
                          }
                          setForm({ ...form, type: newType, category: nextCategory });
                        }}
                        className="w-full px-3 py-3 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 appearance-none font-bold text-xs text-neutral-800 cursor-pointer"
                      >
                        <option value="furniture">🛋️ Furniture Showroom</option>
                        <option value="home">🏢 Homes / Apartments</option>
                        <option value="portfolio">🔨 Portfolio & Revamps</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Category</label>
                      <select 
                        value={form.category}
                        onChange={e => setForm({...form, category: e.target.value})}
                        className="w-full px-3 py-3 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 appearance-none text-xs text-neutral-800 cursor-pointer"
                      >
                        {form.type === 'portfolio' ? (
                          <>
                            <option value="Furniture">Furniture</option>
                            <option value="Rooms">Rooms</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Custom Builds">Custom Builds</option>
                          </>
                        ) : form.type === 'home' ? (
                          <option value="Homes">Homes</option>
                        ) : (
                          <>
                            <option value="Sofas">Sofas</option>
                            <option value="Armchairs">Armchairs</option>
                            <option value="Complementary Furniture">Complementary Furniture</option>
                            <option value="Table and Chairs">Table and Chairs</option>
                            <option value="Beds">Beds</option>
                            <option value="Sofa Beds">Sofa Beds</option>
                            <option value="Outdoor">Outdoor</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Media Upload */}
                  <MediaUploader
                    id="item-image"
                    label={form.type === 'portfolio' ? "Main Media / Hero Visual (Optional)" : "Main Media Image or Video (Optional)"}
                    value={form.image || ''}
                    onChange={val => setForm({...form, image: val})}
                    placeholderUrl="Image link or paste file"
                  />

                  {/* Portfolio specific Before/After (Optional) */}
                  {form.type === 'portfolio' && (
                    <div className="space-y-3 p-4 bg-neutral-50/70 rounded-2xl border border-neutral-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 block">
                          Before & After Transformation (Optional)
                        </span>
                        <p className="text-[9px] text-neutral-400 mt-0.5">
                          Upload both images if you want to display an interactive comparison slider on the portfolio page.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <MediaUploader
                          id="portfolio-before"
                          label="Before (Optional)"
                          value={form.before || ''}
                          onChange={val => setForm({...form, before: val})}
                          placeholderUrl="Before state URL"
                        />
                        <MediaUploader
                          id="portfolio-after"
                          label="After (Optional)"
                          value={form.after || ''}
                          onChange={val => setForm({...form, after: val})}
                          placeholderUrl="After state URL"
                        />
                      </div>
                    </div>
                  )}

                  {/* Portfolio segment & client info */}
                  {form.type === 'portfolio' && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Portfolio Segment</label>
                          <select 
                            value={form.portfolioType || 'Custom Builds'}
                            onChange={e => setForm({...form, portfolioType: e.target.value as any})}
                            className="w-full px-3 py-3 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 appearance-none text-xs"
                          >
                            <option value="Custom Builds">Custom Builds</option>
                            <option value="Revamps">Revamps</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Client Name (Opt)</label>
                          <input 
                            value={form.client || ''}
                            onChange={e => setForm({...form, client: e.target.value})}
                            className="w-full px-3 py-3 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-xs" 
                            placeholder="e.g. Lagos Lounge"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Client Testimonial (Opt)</label>
                        <textarea 
                          rows={2}
                          value={form.testimonial || ''}
                          onChange={e => setForm({...form, testimonial: e.target.value})}
                          className="w-full px-3 py-2.5 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-xs resize-none" 
                          placeholder="Client feedback quote..."
                        />
                      </div>

                      <div className="space-y-2 p-3 bg-orange-50/50 rounded-2xl border border-orange-100">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#241318]/70 block ml-1">Gallery Segment Inclusion</span>
                        <div className="flex gap-5 pl-1 pt-0.5">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input 
                              type="checkbox"
                              checked={!!form.isFurniture}
                              onChange={e => setForm({...form, isFurniture: e.target.checked})}
                              className="rounded border-neutral-300 text-orange-500 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                            />
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-700">Furniture Gallery</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input 
                              type="checkbox"
                              checked={!!form.isRoom}
                              onChange={e => setForm({...form, isRoom: e.target.checked})}
                              className="rounded border-neutral-300 text-orange-500 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                            />
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-700">Rooms Showcase</span>
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Size & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Card Size</label>
                      <select 
                        value={form.size}
                        onChange={e => setForm({...form, size: e.target.value as any})}
                        className="w-full px-3 py-3 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 appearance-none text-xs"
                      >
                        <option value="small">Small (1/3 Width)</option>
                        <option value="medium">Medium (1/2 Width)</option>
                        <option value="large">Large (2/3 Width)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Location (Opt)</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 text-neutral-300" size={15} />
                        <input 
                          value={form.location || ''}
                          onChange={e => setForm({...form, location: e.target.value})}
                          className="w-full pl-9 pr-3 py-3 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-xs" 
                          placeholder="Ikoyi / Lagos"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price & Stock for Showroom and Homes */}
                  {(form.type === 'home' || form.type === 'furniture') && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Price Tag (₦, Opt)</label>
                          <input 
                            value={form.price || ''}
                            onChange={e => setForm({...form, price: e.target.value})}
                            className="w-full px-3 py-3 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-xs" 
                            placeholder="e.g. 250,000"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Promo Price (₦, Opt)</label>
                          <input 
                            value={form.promoPrice || ''}
                            onChange={e => setForm({...form, promoPrice: e.target.value})}
                            className="w-full px-3 py-3 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-xs" 
                            placeholder="e.g. 180,000"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Availability</label>
                          <select 
                            value={form.inStock === false ? 'false' : 'true'}
                            onChange={e => setForm({...form, inStock: e.target.value === 'true'})}
                            className="w-full px-3 py-3 bg-[#FAF8F5] rounded-xl border-none focus:ring-2 focus:ring-orange-500 appearance-none text-xs"
                          >
                            <option value="true">In Stock (Available)</option>
                            <option value="false">Out of Stock</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Color Palette (Opt)</label>
                          <input 
                            value={form.colors || ''}
                            onChange={e => setForm({...form, colors: e.target.value})}
                            className="w-full px-3 py-3 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-xs" 
                            placeholder="#78350F,#D9CFC1,#241318"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Furniture specific optional attributes */}
                  {form.type === 'furniture' && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Dimensions</label>
                        <input 
                          value={form.dimensions || ''}
                          onChange={e => setForm({...form, dimensions: e.target.value})}
                          className="w-full px-2.5 py-2.5 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-xs" 
                          placeholder="W:180cm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Material</label>
                        <input 
                          value={form.material || ''}
                          onChange={e => setForm({...form, material: e.target.value})}
                          className="w-full px-2.5 py-2.5 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-xs" 
                          placeholder="Mahogany"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Condition</label>
                        <select 
                          value={form.condition || 'New'}
                          onChange={e => setForm({...form, condition: e.target.value})}
                          className="w-full px-2 py-2.5 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 appearance-none text-xs"
                        >
                          <option value="New">New</option>
                          <option value="Revamped">Revamped</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Home specific optional attributes */}
                  {form.type === 'home' && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Tower/Phase</label>
                        <input 
                          value={form.tower || ''}
                          onChange={e => setForm({...form, tower: e.target.value})}
                          className="w-full px-2.5 py-2.5 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-xs" 
                          placeholder="Tower A"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Listing</label>
                        <select 
                          value={form.rentBuy || 'Buy'}
                          onChange={e => setForm({...form, rentBuy: e.target.value})}
                          className="w-full px-2 py-2.5 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 appearance-none text-xs font-bold"
                        >
                          <option value="Buy">For Sale</option>
                          <option value="Rent">For Rent</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Unit Type</label>
                        <input 
                          value={form.unitType || ''}
                          onChange={e => setForm({...form, unitType: e.target.value})}
                          className="w-full px-2.5 py-2.5 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-xs" 
                          placeholder="Penthouse"
                        />
                      </div>
                    </div>
                  )}

                  {/* Description (Optional) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Description</label>
                      <span className="text-[9px] text-neutral-400 font-mono italic">Optional</span>
                    </div>
                    <textarea 
                      rows={3}
                      value={form.description || ''}
                      onChange={e => setForm({...form, description: e.target.value})}
                      className="w-full px-4 py-3 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 resize-none text-xs text-neutral-800" 
                      placeholder="Summary or artisan craftsmanship highlights..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3.5 bg-black text-white rounded-xl font-bold uppercase tracking-widest hover:bg-orange-500 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer text-xs"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} />
                          <span>{isEditing ? 'Update Item' : 'Publish Item'}</span>
                        </>
                      )}
                    </button>
                    {isEditing && (
                      <button 
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-5 py-3.5 bg-neutral-100 text-neutral-600 rounded-xl font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* List Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-5 rounded-[2rem] border border-neutral-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-display font-medium text-neutral-900">Showroom & Collection Items</h3>
                  <p className="text-[10px] text-neutral-400">Manage and edit your live Leadwood items</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button 
                    type="button"
                    onClick={() => setAdminListType('all')}
                    className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      adminListType === 'all' 
                        ? 'bg-neutral-900 text-white shadow-sm' 
                        : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
                    }`}
                  >
                    All ({projects.length})
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAdminListType('furniture')}
                    className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      adminListType === 'furniture' 
                        ? 'bg-orange-500 text-white shadow-sm' 
                        : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
                    }`}
                  >
                    🛋️ Showroom ({projects.filter(p => p.type === 'furniture').length})
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAdminListType('home')}
                    className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      adminListType === 'home' 
                        ? 'bg-[#241318] text-[#FAF8F5] shadow-sm' 
                        : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
                    }`}
                  >
                    🏢 Homes ({projects.filter(p => p.type === 'home').length})
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAdminListType('portfolio')}
                    className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      adminListType === 'portfolio' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
                    }`}
                  >
                    🔨 Portfolios ({projects.filter(p => p.type === 'portfolio').length})
                  </button>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                <AnimatePresence>
                  {projects
                    .filter(p => adminListType === 'all' || p.type === adminListType)
                    .map((p) => {
                      const isCurrentlyEditing = isEditing === p.id;
                      return (
                        <motion.div 
                          layout
                          key={p.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`bg-white p-5 rounded-[2rem] border transition-all shadow-sm flex flex-col gap-3 group ${
                            isCurrentlyEditing 
                              ? 'border-orange-400 ring-2 ring-orange-200' 
                              : 'border-neutral-100 hover:border-neutral-200 hover:shadow-md'
                          }`}
                        >
                          <div className="aspect-video rounded-2xl overflow-hidden relative bg-neutral-50">
                            {p.type === 'portfolio' && (p.before || p.after) ? (
                              <div className="grid grid-cols-2 h-full w-full gap-0.5">
                                <div className="relative h-full w-full overflow-hidden">
                                  <AdminMediaPreview src={p.before || p.image || ''} className="w-full h-full object-cover grayscale" alt="before" />
                                  <span className="absolute bottom-1.5 left-2 bg-neutral-900/80 text-white text-[7px] px-1.5 py-0.5 rounded font-bold uppercase tracking-widest font-mono z-10">Before</span>
                                </div>
                                <div className="relative h-full w-full overflow-hidden">
                                  <AdminMediaPreview src={p.after || p.image || ''} className="w-full h-full object-cover" alt="after" />
                                  <span className="absolute bottom-1.5 left-2 bg-orange-500/80 text-white text-[7px] px-1.5 py-0.5 rounded font-bold uppercase tracking-widest font-mono z-10">After</span>
                                </div>
                              </div>
                            ) : (
                              <AdminMediaPreview src={p.image || ''} className="w-full h-full object-cover" alt={p.title} />
                            )}
                            <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
                              <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-sm ${
                                p.type === 'furniture'
                                  ? 'bg-orange-500 text-white'
                                  : p.type === 'home'
                                    ? 'bg-[#241318] text-[#FAF8F5]'
                                    : 'bg-blue-600 text-white'
                              }`}>
                                {p.type === 'furniture' ? '🛋️ Showroom' : p.type === 'home' ? '🏢 Apartment' : '🔨 Portfolio'}
                              </span>
                              {p.category && (
                                <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-md text-neutral-800 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-sm">
                                  {p.category}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex-1 text-left">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-base font-display font-medium line-clamp-1 text-neutral-900">
                                {p.title || 'Untitled Item'}
                              </h4>
                              {(p.price || p.promoPrice) && (
                                <div className="text-right flex-shrink-0">
                                  {p.promoPrice ? (
                                    <>
                                      <span className="text-[10px] line-through text-neutral-400 mr-1">₦{p.price}</span>
                                      <span className="text-xs font-bold text-orange-500">₦{p.promoPrice}</span>
                                    </>
                                  ) : (
                                    <span className="text-xs font-bold text-neutral-800">₦{p.price}</span>
                                  )}
                                </div>
                              )}
                            </div>

                            {p.location && (
                              <p className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-1">
                                <MapPin size={10} /> {p.location}
                              </p>
                            )}

                            {/* Extra Properties separation display */}
                            {p.type === 'home' && (p.tower || p.rentBuy || p.unitType) && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {p.tower && <span className="px-2 py-0.5 bg-[#FAF8F5] text-[#241318] border border-neutral-100 text-[8px] font-bold uppercase tracking-wider rounded-md">{p.tower}</span>}
                                {p.rentBuy && <span className="px-2 py-0.5 bg-[#FAF8F5] text-orange-600 border border-neutral-100 text-[8px] font-bold uppercase tracking-wider rounded-md">For {p.rentBuy}</span>}
                                {p.unitType && <span className="px-2 py-0.5 bg-[#FAF8F5] text-blue-600 border border-neutral-100 text-[8px] font-bold uppercase tracking-wider rounded-md">{p.unitType}</span>}
                              </div>
                            )}

                            {p.type === 'furniture' && (p.material || p.dimensions || p.condition) && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {p.material && <span className="px-2 py-0.5 bg-neutral-50 text-neutral-600 border border-neutral-100 text-[8px] font-bold uppercase tracking-wider rounded-md">{p.material}</span>}
                                {p.dimensions && <span className="px-2 py-0.5 bg-neutral-50 text-neutral-600 border border-neutral-100 text-[8px] font-bold uppercase tracking-wider rounded-md">{p.dimensions}</span>}
                                {p.condition && <span className="px-2 py-0.5 bg-neutral-50 text-emerald-600 border border-neutral-100 text-[8px] font-bold uppercase tracking-wider rounded-md">{p.condition}</span>}
                              </div>
                            )}

                            <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                              {p.description || 'No description provided.'}
                            </p>
                          </div>

                          <div className="flex gap-2 pt-2 border-t border-neutral-100">
                            <button 
                              type="button"
                              onClick={() => handleEdit(p)}
                              className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                isCurrentlyEditing 
                                  ? 'bg-orange-500 text-white shadow-sm' 
                                  : 'bg-neutral-50 text-neutral-600 hover:text-black hover:bg-neutral-100'
                              }`}
                            >
                              <Edit2 size={12} /> {isCurrentlyEditing ? 'Editing Now' : 'Edit'}
                            </button>
                            <button 
                              type="button"
                              onClick={() => setDeleteModal({ id: p.id, title: p.title || 'Untitled Item', type: 'project' })}
                              className="p-2 bg-neutral-50 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                </AnimatePresence>
              </div>

              {projects.length === 0 && (
                <div className="py-24 text-center space-y-3 bg-white border-2 border-dashed border-neutral-200 rounded-[2.5rem]">
                  <div className="w-14 h-14 bg-neutral-100 rounded-full mx-auto flex items-center justify-center text-neutral-300">
                    <ImageIcon size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-neutral-600 text-sm uppercase tracking-wider">No items found</p>
                    <p className="text-xs text-neutral-400">Add an item using the form on the left to populate your catalog.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Leads Tab */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <h2 className="text-2xl font-display font-medium text-neutral-900">Client Inquiries & Leads</h2>
                <p className="text-xs text-neutral-400">View and respond to inquiries submitted through the contact page</p>
              </div>
              <span className="px-3 py-1 bg-neutral-900 text-white rounded-full text-xs font-bold font-mono">
                {leads.length} Total Leads
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-white p-6 sm:p-8 rounded-[2rem] border border-neutral-100 shadow-sm space-y-5 text-left flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-display font-medium text-neutral-900">{lead.name}</h3>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5">{lead.email}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                        lead.status === 'new' ? 'bg-orange-500 text-white' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {lead.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-md text-[9px] font-bold uppercase tracking-widest">
                        {lead.projectType}
                      </span>
                      {lead.category && (
                        <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-md text-[9px] font-bold uppercase tracking-widest">
                          {lead.category}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed italic bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                      "{lead.description}"
                    </p>

                    {lead.measurements && (
                      <div className="p-3 bg-neutral-50 rounded-xl">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5">Measurements</p>
                        <p className="text-xs font-mono text-neutral-700">{lead.measurements}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex gap-2">
                    {lead.status === 'new' ? (
                      <button 
                        onClick={async () => {
                          try {
                            await updateDoc(doc(db, 'leads', lead.id), { status: 'contacted' });
                            setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: 'contacted' } : l));
                            setFeedbackNotice({
                              type: 'success',
                              message: `Marked "${lead.name}" as contacted.`
                            });
                          } catch (err) {
                            handleFirestoreError(err, OperationType.UPDATE, `leads/${lead.id}`);
                          }
                        }}
                        className="flex-1 py-2.5 bg-black text-[#E5A85C] hover:bg-[#E5A85C] hover:text-black rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                      >
                        Mark Contacted
                      </button>
                    ) : (
                      <span className="flex-1 py-2.5 bg-neutral-100 text-neutral-400 rounded-xl text-[9px] font-bold uppercase tracking-widest text-center">
                        Contacted
                      </span>
                    )}
                    <button 
                      onClick={() => setDeleteModal({ id: lead.id, title: lead.name, type: 'lead' })}
                      className="p-2.5 bg-neutral-50 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                      title="Delete Lead"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {leads.length === 0 && (
              <div className="py-20 text-center text-neutral-400 font-bold uppercase tracking-widest text-xs border-2 border-dashed border-neutral-200 rounded-[2.5rem] bg-white">
                No inquiries submitted yet
              </div>
            )}
          </div>
        )}
      </div>

      {/* In-UI Deletion Confirmation Modal */}
      <AnimatePresence>
        {deleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-100 text-left space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Trash2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-neutral-900">
                    Confirm Deletion
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                    Are you sure you want to permanently delete{' '}
                    <span className="font-bold text-neutral-800">
                      "{deleteModal.title || (deleteModal.type === 'project' ? 'this item' : 'this lead')}"
                    </span>
                    ? This action will remove it immediately from Firestore and cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setDeleteModal(null)}
                  className="flex-1 py-3 px-4 rounded-xl border border-neutral-200 text-neutral-600 font-bold text-xs uppercase tracking-widest hover:bg-neutral-50 transition-all disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={confirmDeleteAction}
                  className="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="animate-spin" size={15} />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete Permanently</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
