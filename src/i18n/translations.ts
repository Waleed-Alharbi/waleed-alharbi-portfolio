export type Language = 'en' | 'ar';

export const translations = {
  en: {
    skip: 'Skip to content',
    nav: {
      home: 'Home', about: 'About', experience: 'Experience', work: 'Work', skills: 'Skills', contact: 'Contact',
    },
    controls: { language: 'Switch to Arabic', themeLight: 'Use light theme', themeDark: 'Use dark theme', menu: 'Open menu', close: 'Close menu' },
    hero: {
      eyebrow: 'Information Technology Graduate · Al-Qassim, Saudi Arabia',
      firstName: 'WALEED', lastName: 'ALHARBI', role: 'Information Technology Graduate',
      support: 'Building practical software, data, AI, security, and infrastructure solutions.',
      work: 'View my work', about: 'About me', github: 'GitHub', scroll: 'Scroll to explore',
    },
    profile: ['Al-Qassim, Saudi Arabia', 'Qassim University', 'B.Sc. Information Technology', 'Fresh Graduate', 'Open to Opportunities'],
    about: {
      label: '01 / Foundation', title: 'One IT foundation. Multiple practical specializations.',
      lead: 'Turning ideas into practical solutions.',
      body: 'I am an Information Technology graduate interested in how software, data, security, operations, and infrastructure connect. I build focused projects that make those connections visible—through working interfaces, documented APIs, realistic workflows, and thoughtful technical decisions.',
      note: 'Broad by foundation. Focused in execution.',
    },
    experience: {
      label: '02 / Education & training', title: 'Learning built around application.',
      education: 'Education', university: 'Qassim University', degree: 'Bachelor of Science in Information Technology', gpa: 'GPA',
      training: 'Technical Training', hours: '420 hours', place: 'Riyadh, Saudi Arabia',
      flow: ['Training', 'Development', 'Product Contribution', 'Delivery'],
    },
    work: {
      label: '03 / Selected work', title: 'Five projects. One connected technical practice.',
      intro: 'Large, working portfolio projects across the areas where modern information technology meets real operations.',
      caseStudy: 'View case study', github: 'GitHub repository',
    },
    achievement: {
      label: '04 / Achievement', number: '01', place: '1ST PLACE', event: 'Innovation Hackathon', project: 'Wahaj Forecast',
      text: 'A defining early milestone for the Wahaj Forecast innovation project.',
    },
    graduation: {
      label: '05 / Graduation project', title: 'Deep Learning for Sustainable Solar Energy Prediction',
      intro: 'A structured forecasting study connecting trusted energy and climate data with deep learning evaluation across multiple time horizons.',
      steps: [
        { kicker: 'Data sources', value: 'NASA POWER + KACARE' },
        { kicker: 'Preparation', value: 'Preprocessing' },
        { kicker: 'Models', value: 'LSTM · GRU · CNN-LSTM' },
        { kicker: 'Evaluation', value: 'MAE · RMSE' },
        { kicker: 'Forecasts', value: '1 hour · 3 hours · 24 hours' },
      ],
    },
    skills: {
      label: '06 / Capabilities', title: 'Skills shown in context.', intro: 'Technologies are mapped to the work where they are actually used—not presented as a logo collection.',
      usedIn: 'Used in', groups: { build: 'Build', data: 'Data & AI', systems: 'Systems', tools: 'Tools' },
    },
    contact: {
      label: '07 / Contact', title: "Let's build something useful.",
      body: 'Open to graduate and entry-level technology opportunities in Saudi Arabia.', github: 'Continue on GitHub', location: 'Al-Qassim · Saudi Arabia',
    },
    footer: 'Designed and built for clarity, depth, and practical proof.',
    case: {
      selectedWork: 'Selected work', overview: 'Overview', context: 'Problem / context', solution: 'Concept / solution', built: 'What I built',
      features: 'Key features', workflow: 'Architecture / workflow', stack: 'Technology stack', gallery: 'Selected real screens', decisions: 'Engineering decisions',
      demonstrates: 'What this project demonstrates', repository: 'View GitHub repository', back: 'Back to selected work', next: 'Next case study',
    },
    notFound: { title: 'This page is outside the map.', body: 'The route you opened does not exist.', back: 'Return home' },
  },
  ar: {
    skip: 'تجاوز إلى المحتوى',
    nav: {
      home: 'الرئيسية', about: 'نبذة', experience: 'الخبرة', work: 'الأعمال', skills: 'المهارات', contact: 'تواصل',
    },
    controls: { language: 'التبديل إلى الإنجليزية', themeLight: 'استخدام الوضع الفاتح', themeDark: 'استخدام الوضع الداكن', menu: 'فتح القائمة', close: 'إغلاق القائمة' },
    hero: {
      eyebrow: 'خريج تقنية معلومات · القصيم، المملكة العربية السعودية',
      firstName: 'وليد', lastName: 'الحربي', role: 'خريج تقنية معلومات',
      support: 'أبني حلولًا عملية في البرمجيات والبيانات والذكاء الاصطناعي والأمن والبنية التحتية.',
      work: 'استعرض أعمالي', about: 'نبذة عني', github: 'GitHub', scroll: 'مرّر للاستكشاف',
    },
    profile: ['القصيم، المملكة العربية السعودية', 'جامعة القصيم', 'بكالوريوس تقنية المعلومات', 'خريج حديث', 'متاح للفرص'],
    about: {
      label: '01 / الأساس', title: 'أساس واحد في تقنية المعلومات. وتخصصات عملية متعددة.',
      lead: 'أحوّل الأفكار إلى حلول عملية.',
      body: 'أنا خريج تقنية معلومات مهتم بكيفية ترابط البرمجيات والبيانات والأمن والعمليات والبنية التحتية. أبني مشاريع مركّزة تُظهر هذا الترابط من خلال واجهات تعمل، وواجهات برمجية موثقة، وسير عمل واقعي، وقرارات تقنية مدروسة.',
      note: 'معرفة شاملة في الأساس. وتركيز واضح في التنفيذ.',
    },
    experience: {
      label: '02 / التعليم والتدريب', title: 'تعلّم يرتكز على التطبيق.',
      education: 'التعليم', university: 'جامعة القصيم', degree: 'بكالوريوس العلوم في تقنية المعلومات', gpa: 'المعدل',
      training: 'التدريب التقني', hours: '420 ساعة', place: 'الرياض، المملكة العربية السعودية',
      flow: ['التدريب', 'التطوير', 'المساهمة في المنتج', 'التسليم'],
    },
    work: {
      label: '03 / أعمال مختارة', title: 'خمسة مشاريع. ممارسة تقنية واحدة مترابطة.',
      intro: 'مشاريع عملية متكاملة في المجالات التي تلتقي فيها تقنية المعلومات الحديثة مع الاحتياجات التشغيلية الواقعية.',
      caseStudy: 'استعرض دراسة الحالة', github: 'مستودع GitHub',
    },
    achievement: {
      label: '04 / إنجاز', number: '01', place: 'المركز الأول', event: 'هاكاثون الابتكار', project: 'وهج للتنبؤ',
      text: 'محطة مبكرة ومهمة لمشروع وهج للتنبؤ ضمن هاكاثون الابتكار.',
    },
    graduation: {
      label: '05 / مشروع التخرج', title: 'التعلّم العميق للتنبؤ المستدام بالطاقة الشمسية',
      intro: 'دراسة تنبؤية منظّمة تربط بيانات الطاقة والمناخ الموثوقة بتقييم نماذج التعلّم العميق عبر أطر زمنية متعددة.',
      steps: [
        { kicker: 'مصادر البيانات', value: 'NASA POWER + KACARE' },
        { kicker: 'الإعداد', value: 'المعالجة المسبقة' },
        { kicker: 'النماذج', value: 'LSTM · GRU · CNN-LSTM' },
        { kicker: 'التقييم', value: 'MAE · RMSE' },
        { kicker: 'التنبؤ', value: 'ساعة · 3 ساعات · 24 ساعة' },
      ],
    },
    skills: {
      label: '06 / القدرات', title: 'مهارات ضمن سياقها.', intro: 'ترتبط كل تقنية بالمشاريع التي استُخدمت فيها فعليًا، بدل عرضها كمجموعة شعارات.',
      usedIn: 'استُخدمت في', groups: { build: 'البناء', data: 'البيانات والذكاء الاصطناعي', systems: 'الأنظمة', tools: 'الأدوات' },
    },
    contact: {
      label: '07 / تواصل', title: 'لنصنع شيئًا مفيدًا.',
      body: 'متاح لفرص الخريجين والوظائف التقنية للمبتدئين في المملكة العربية السعودية.', github: 'تابع عبر GitHub', location: 'القصيم · المملكة العربية السعودية',
    },
    footer: 'صُمّم وبُني ليجمع بين الوضوح والعمق والدليل العملي.',
    case: {
      selectedWork: 'أعمال مختارة', overview: 'نظرة عامة', context: 'المشكلة والسياق', solution: 'الفكرة والحل', built: 'ما الذي بنيته',
      features: 'الخصائص الرئيسية', workflow: 'البنية وسير العمل', stack: 'التقنيات', gallery: 'شاشات حقيقية مختارة', decisions: 'قرارات هندسية',
      demonstrates: 'ما الذي يثبته هذا المشروع', repository: 'زيارة مستودع GitHub', back: 'العودة إلى الأعمال المختارة', next: 'دراسة الحالة التالية',
    },
    notFound: { title: 'هذه الصفحة خارج الخريطة.', body: 'المسار الذي فتحته غير موجود.', back: 'العودة إلى الرئيسية' },
  },
} as const;

export type Translation = (typeof translations)[Language];
