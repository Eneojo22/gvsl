export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
}

export interface Category {
  name: string;
  count: number;
  icon: string;
}

export const SLIDES: Slide[] = [
  {
    id: '01',
    category: 'Homes',
    title: 'Local orientation and area tours',
    subtitle: 'Area Guides & Schools',
    image: 'https://images.unsplash.com/photo-1545324418-f1d3c5b53fe8?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: '02',
    category: 'Homes',
    title: 'Airport arrivals and coordination',
    subtitle: 'Welcome to Nigeria',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: '03',
    category: 'Homes',
    title: 'Housing search and shortlist',
    subtitle: 'Executive & Family Housing',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: '04',
    category: 'Furniture',
    title: 'Furniture sourcing and setup',
    subtitle: 'Furnish with Precision',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000',
  },
];

export const CATEGORIES: Category[] = [
  { name: 'Lagos', count: 120, icon: 'Navigation' },
  { name: 'Abuja', count: 85, icon: 'Navigation' },
];
