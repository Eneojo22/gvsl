import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'EN' | 'KR' | 'ZH' | 'AR' | 'ES';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const translations: Record<Language, any> = {
  EN: {
    hero: {
      title: 'Choose your pathway,',
      subtitle: 'built for the journey.',
      description: 'Premium housing, relocation, and furniture solutions for executives and teams moving to Nigeria.',
    },
    nav: {
      services: 'Services',
      portfolio: 'Our Portfolio',
      locations: 'Locations',
      testimonials: 'Testimonials',
      contact: 'Contact',
    },
    clients: {
      title: 'Trusted by global organizations',
      subtitle: 'Supporting seamless transitions for teams worldwide.',
    },
    services: {
      orientation: 'Orientation',
      meetGreet: 'Meet and Greet',
      leadwoodHomes: 'Leadwood Homes',
      leadwoodFurniture: 'Leadwood Furniture',
    },
    stats: {
      clients: 'Clients supported',
      experience: 'Years experience',
      satisfaction: 'Satisfaction',
      locations: 'Locations',
      response: 'Response',
    },
    slides: {
      s1: { title: 'Local orientation and area tours to help you settle in faster', sub: 'Area Guides & Schools' },
      s2: { title: 'Stress-free airport meet and greet with coordinated arrival support', sub: 'Welcome to Nigeria' },
      s3: { title: 'Shortlist stronger housing options faster with clearer property guidance', sub: 'Executive & Family Housing' },
      s4: { title: 'Turn an empty property into a ready-to-live home or work space', sub: 'Furnish with Precision' },
    },
    footer: {
      ctaTitle: 'Built to support.',
      ctaSub: 'Start your move.',
      sitemap: 'Sitemap',
      address: 'Address',
    }
  },
  KR: {
    hero: {
      title: '당신의 경로를 선택하세요,',
      subtitle: '여정을 위해 구축되었습니다.',
      description: '나이지리아로 이주하는 임원 및 팀을 위한 프리미엄 주택, 이전 및 가구 솔루션.',
    },
    nav: {
      services: '서비스',
      portfolio: '우리의 포트폴리오',
      locations: '위치',
      testimonials: '고객 후기',
      contact: '문의하기',
    },
    clients: {
      title: '글로벌 기업이 신뢰하는 파트너',
      subtitle: '전 세계 팀의 원활한 전환을 지원합니다.',
    },
    services: {
      orientation: '현지 오리엔테이션',
      meetGreet: '공항 마중 서비스',
      leadwoodHomes: '리드우드 홈즈',
      leadwoodFurniture: '리드우드 가구',
    },
    stats: {
      clients: '지원된 고객',
      experience: '경력 년수',
      satisfaction: '만족도',
      locations: '위치',
      response: '응답 시간',
    },
    slides: {
      s1: { title: '빠른 정착을 돕는 현지 오리엔테이션 및 지역 투어', sub: '지역 가이드 및 학교' },
      s2: { title: '조율된 도착 지원을 통한 스트레스 없는 공항 마중 서비스', sub: '나이지리아에 오신 것을 환영합니다' },
      s3: { title: '명확한 부동산 안내로 더 강력한 주택 옵션을 더 빠르게 선정하세요', sub: '임원 및 가족 주택' },
      s4: { title: '빈 부동산을 즉시 거주 가능한 집이나 업무 공간으로 바꾸세요', sub: '정밀한 가구 배치' },
    },
    footer: {
      ctaTitle: '지원을 위해 구축되었습니다.',
      ctaSub: '이동을 시작하세요.',
      sitemap: '사이트맵',
      address: '주소',
    }
  },
  ZH: {
    hero: {
      title: '选择您的路径，',
      subtitle: '为旅程而建。',
      description: '为移居尼日利亚的高管和团队提供优质的住房、搬迁和家具解决方案。',
    },
    nav: {
      services: '服务',
      portfolio: '我们的项目组合',
      locations: '地点',
      testimonials: '客户评价',
      contact: '联系我们',
    },
    clients: {
      title: '深受全球组织信任',
      subtitle: '支持全球团队的无缝过渡。',
    },
    services: {
      orientation: '环境介绍',
      meetGreet: '接机服务',
      leadwoodHomes: 'Leadwood 住宅',
      leadwoodFurniture: 'Leadwood 家具',
    },
    stats: {
      clients: '客户支持',
      experience: '多年经验',
      satisfaction: '满意度',
      locations: '服务地点',
      response: '响应速度',
    },
    slides: {
      s1: { title: '通过当地环境介绍和区域之旅，帮助您更快安顿下来', sub: '区域指南与学校' },
      s2: { title: '提供协调的接机支持，让您的机场迎接过程轻松无忧', sub: '欢迎来到尼日利亚' },
      s3: { title: '通过更清晰的物业指导，更快地筛选出更强大的住房选择', sub: '高管与家庭住房' },
      s4: { title: '将空置物业转变为即插即用的住宅或工作空间', sub: '精准布置家具' },
    },
    footer: {
      ctaTitle: '致力支持。',
      ctaSub: '开始您的搬迁。',
      sitemap: '网站地图',
      address: '地址',
    }
  },
  AR: {
    hero: {
      title: 'اختر مسارك،',
      subtitle: 'بنيت من أجل الرحلة.',
      description: 'حلول فاخرة للسكن والانتقال والأثاث للمديرين التنفيذيين والفرق المنتقلة إلى نيجيريا.',
    },
    nav: {
      services: 'الخدمات',
      portfolio: 'محفظة أعمالنا',
      locations: 'المواقع',
      testimonials: 'آراء العملاء',
      contact: 'اتصل بنا',
    },
    clients: {
      title: 'موثوق به من قبل منظمات عالمية',
      subtitle: 'دعم الانتقال السلس للفرق في جميع أنحاء العالم.',
    },
    services: {
      orientation: 'التوجيه المحلي',
      meetGreet: 'الاستقبال والترحيب',
      leadwoodHomes: 'ليدوود هومز',
      leadwoodFurniture: 'ليدوود للأثاث',
    },
    stats: {
      clients: 'عملاء تم دعمهم',
      experience: 'سنوات الخبرة',
      satisfaction: 'نسبة الرضا',
      locations: 'المواقع',
      response: 'الاستجابة',
    },
    slides: {
      s1: { title: 'توجيه محلي وجولات في المنطقة لمساعدتك على الاستقرار بشكل أسرع', sub: 'أدلة المنطقة والمدارس' },
      s2: { title: 'خدمة استقبال وترحيب في المطار خالية من الإجهاد مع دعم وصول منسق', sub: 'مرحباً بكم في نيجيريا' },
      s3: { title: 'قم باختيار خيارات سكن أقوى بشكل أسرع مع توجيه عقاري أوضح', sub: 'سكن المديرين التنفيذيين والعائلات' },
      s4: { title: 'حول العقار الفارغ إلى منزل جاهز للسكن أو مساحة عمل', sub: 'تأثيث بدقة' },
    },
    footer: {
      ctaTitle: 'بنيت للدعم.',
      ctaSub: 'ابدأ انتقالك.',
      sitemap: 'خريطة الموقع',
      address: 'العنوان',
    }
  },
  ES: {
    hero: {
      title: 'Elija su camino,',
      subtitle: 'construido para el viaje.',
      description: 'Soluciones premium de vivienda, reubicación y mobiliario para ejecutivos y equipos que se mudan a Nigeria.',
    },
    nav: {
      services: 'Servicios',
      portfolio: 'Nuestro Portafolio',
      locations: 'Ubicaciones',
      testimonials: 'Testimonios',
      contact: 'Contacto',
    },
    clients: {
      title: 'Con la confianza de organizaciones globales',
      subtitle: 'Apoyando transiciones fluidas para equipos en todo el mundo.',
    },
    services: {
      orientation: 'Orientación',
      meetGreet: 'Recepción y Bienvenida',
      leadwoodHomes: 'Leadwood Homes',
      leadwoodFurniture: 'Mobiliario Leadwood',
    },
    stats: {
      clients: 'Clientes apoyados',
      experience: 'Años de experiencia',
      satisfaction: 'Satisfacción',
      locations: 'Ubicaciones',
      response: 'Respuesta',
    },
    slides: {
      s1: { title: 'Orientación local y recorridos por la zona para ayudarle a instalarse más rápido', sub: 'Guías de área y escuelas' },
      s2: { title: 'Recepción en el aeropuerto sin estrés con apoyo de llegada coordinado', sub: 'Bienvenido a Nigeria' },
      s3: { title: 'Preseleccione opciones de vivienda más sólidas más rápido con una guía inmobiliaria más clara', sub: 'Vivienda para ejecutivos y familias' },
      s4: { title: 'Convierta una propiedad vacía en un hogar o espacio de trabajo listo para vivir', sub: 'Amueblar con precisión' },
    },
    footer: {
      ctaTitle: 'Construido para apoyar.',
      ctaSub: 'Inicie su mudanza.',
      sitemap: 'Mapa del sitio',
      address: 'Dirección',
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (path: string) => {
    const keys = path.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'AR' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
