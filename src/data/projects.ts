import helpdeskDashboard from '../assets/projects/helpdesk/dashboard.webp';
import helpdeskTickets from '../assets/projects/helpdesk/tickets.webp';
import helpdeskAssets from '../assets/projects/helpdesk/assets.webp';
import socDashboard from '../assets/projects/soc/dashboard.webp';
import socNetwork from '../assets/projects/soc/network.webp';
import socIncidents from '../assets/projects/soc/incidents.webp';
import waqtHome from '../assets/projects/waqttech/home.webp';
import waqtServices from '../assets/projects/waqttech/services.webp';
import waqtBooking from '../assets/projects/waqttech/booking.webp';
import basiraHome from '../assets/projects/basira/home.webp';
import basiraExplore from '../assets/projects/basira/explore.webp';
import basiraModel from '../assets/projects/basira/model-lab.webp';
import bunyaTopology from '../assets/projects/bunya/topology.webp';
import bunyaIncident from '../assets/projects/bunya/incident.webp';
import bunyaTrace from '../assets/projects/bunya/request-trace.webp';
import basiraCover from '../assets/projects/covers/basira-cover.webp';
import socCover from '../assets/projects/covers/soc-cover.webp';
import bunyaCover from '../assets/projects/covers/bunya-cover.webp';
import helpdeskCover from '../assets/projects/covers/helpdesk-cover.webp';
import waqttechCover from '../assets/projects/covers/waqttech-cover.webp';

export type Localized = { en: string; ar: string };

export type PortfolioProject = {
  slug: string;
  number: string;
  shortTitle: Localized;
  title: Localized;
  category: Localized;
  summary: Localized;
  overview: Localized;
  challenge: Localized;
  solution: Localized;
  built: { en: string[]; ar: string[] };
  decisions: { en: string[]; ar: string[] };
  stack: string[];
  github: string;
  cardImage?: { src: string; alt: Localized };
  images: { src: string; alt: Localized }[];
  theme: 'helpdesk' | 'soc' | 'waqttech' | 'basira' | 'bunya';
  signal: Localized;
};

export const projects: PortfolioProject[] = [
  {
    slug: 'helpdesk', number: '01', theme: 'helpdesk',
    shortTitle: { en: 'IT Support', ar: 'الدعم التقني' },
    title: { en: 'IT Support Management System', ar: 'نظام إدارة الدعم التقني' },
    category: { en: 'IT Operations', ar: 'عمليات تقنية المعلومات' },
    summary: { en: 'A clear workspace where support teams receive requests, track devices and follow each issue until it is resolved.', ar: 'مساحة واضحة تستقبل فيها فرق الدعم الطلبات، وتتابع الأجهزة، وتعرف حالة كل مشكلة حتى حلها.' },
    overview: { en: 'Built as a practical IT operations workspace, the system gives support teams one responsive interface for managing requests, assigned devices and service activity. A React frontend works with a documented FastAPI REST API and a relational SQLite database.', ar: 'بنيته كمساحة عملية لفرق تقنية المعلومات تجمع إدارة الطلبات والأجهزة المسندة ونشاط الخدمة في واجهة متجاوبة واحدة. تتصل واجهة React بواجهة REST موثقة عبر FastAPI وقاعدة بيانات SQLite مترابطة.' },
    challenge: { en: 'Support work loses context when tickets, devices and user records live in separate tools. The key challenge was preserving those relationships from the first request through resolution and reporting.', ar: 'يفقد الدعم التقني سياقه عندما تتوزع التذاكر والأجهزة وبيانات المستخدمين بين أدوات منفصلة. كان التحدي هو الحفاظ على ترابطها من لحظة فتح الطلب حتى الحل وإعداد التقارير.' },
    solution: { en: 'I designed a shared data model and API that link every ticket to the relevant user and asset, then surface the same operational data through searchable queues, lifecycle views and concise reports.', ar: 'صممت نموذج بيانات وواجهة برمجية مشتركة تربط كل تذكرة بالمستخدم والأصل المعني، ثم تعرض البيانات التشغيلية نفسها عبر قوائم قابلة للبحث ومراحل دورة الحياة وتقارير موجزة.' },
    built: { en: ['Ticket search, filters and full CRUD workflows', 'Asset inventory with ownership and lifecycle status', 'User directory and active status management', 'Operational dashboards and monthly reporting'], ar: ['بحث وتصنيف وعمليات متكاملة لتذاكر الدعم', 'مخزون أصول مع الملكية وحالة دورة الحياة', 'دليل مستخدمين وإدارة حالة النشاط', 'لوحات تشغيلية وتقارير شهرية'] },
    decisions: { en: ['Kept support entities connected through one REST API.', 'Included loading, error, empty and confirmation states.', 'Scoped authentication and enterprise SLA automation as future work.'], ar: ['ربط كيانات الدعم عبر واجهة REST واحدة.', 'تضمين حالات التحميل والخطأ والفراغ والتأكيد.', 'تحديد المصادقة وأتمتة SLA المؤسسية كتحسينات مستقبلية.'] },
    stack: ['React 18', 'Vite', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Recharts', 'Docker'],
    github: 'https://github.com/Waleed-Alharbi/it-helpdesk-asset-management',
    cardImage: { src: helpdeskCover, alt: { en: 'IT support management illustration', ar: 'رسم توضيحي لنظام إدارة الدعم التقني' } },
    images: [
      { src: helpdeskDashboard, alt: { en: 'IT helpdesk operations dashboard', ar: 'لوحة عمليات مكتب الدعم التقني' } },
      { src: helpdeskTickets, alt: { en: 'Ticket management workspace', ar: 'مساحة إدارة تذاكر الدعم' } },
      { src: helpdeskAssets, alt: { en: 'Technology asset inventory', ar: 'مخزون الأصول التقنية' } },
    ],
    signal: { en: 'Support, connected.', ar: 'دعم تقني مترابط.' },
  },
  {
    slug: 'soc', number: '03', theme: 'soc',
    shortTitle: { en: 'SentinelIQ', ar: 'مركز العمليات' },
    title: { en: 'SOC Security Monitoring Dashboard', ar: 'لوحة مراقبة مركز العمليات الأمنية' },
    category: { en: 'Cybersecurity / SOC', ar: 'الأمن السيبراني / SOC' },
    summary: { en: 'A security dashboard that organizes alerts, explains what happened and helps an analyst follow each incident through resolution.', ar: 'لوحة أمنية ترتب التنبيهات، وتوضح ما حدث، وتساعد المحلل على متابعة كل حادثة حتى معالجتها.' },
    overview: { en: 'SentinelIQ demonstrates an end-to-end junior analyst workflow using coherent fictional data: monitor activity, triage alerts, inspect network context, assemble evidence and close incidents. It is intentionally a safe portfolio simulation rather than a production SIEM.', ar: 'يعرض SentinelIQ مسار عمل متكامل لمحلل أمن سيبراني مبتدئ باستخدام بيانات خيالية مترابطة: مراقبة النشاط، وفرز التنبيهات، وفحص سياق الشبكة، وتجميع الأدلة، وإغلاق الحوادث. وهو محاكاة آمنة للعرض وليس نظام SIEM إنتاجيًا.' },
    challenge: { en: 'A wall of alerts does not explain what an analyst should do next. The challenge was to connect raw telemetry, severity, affected devices and investigation history into one readable operational story.', ar: 'تكدّس التنبيهات لا يوضح الخطوة التالية للمحلل. كان التحدي هو ربط القياسات الخام والخطورة والأجهزة المتأثرة وسجل التحقيق في قصة تشغيلية واحدة قابلة للفهم.' },
    solution: { en: 'I built a React investigation workspace backed by FastAPI and SQLite, with linked events, alerts, incidents, endpoints and network nodes that preserve context from detection to resolution.', ar: 'بنيت مساحة تحقيق عبر React مدعومة بـFastAPI وSQLite، تربط الأحداث والتنبيهات والحوادث والأجهزة وعُقد الشبكة وتحافظ على السياق من الاكتشاف حتى المعالجة.' },
    built: { en: ['Rotating event stream and filterable console', 'Alert queue with severity, source and status', 'Evidence-led incident investigation timeline', 'Response actions from acknowledge to resolve'], ar: ['تدفق أحداث متجدد ووحدة قابلة للتصفية', 'قائمة تنبيهات بالشدة والمصدر والحالة', 'خط زمني للتحقيق قائم على الأدلة', 'إجراءات استجابة من الإقرار حتى الحل'] },
    decisions: { en: ['Labelled every dataset and technique mapping as simulated.', 'Designed around analyst flow instead of decorative threat graphics.', 'Kept detection rules transparent and intentionally readable.'], ar: ['توضيح أن كل البيانات وتصنيفات التقنيات محاكية.', 'تصميم التجربة حول مسار المحلل بدل الرسومات الأمنية الزخرفية.', 'إبقاء قواعد الكشف واضحة وقابلة للقراءة.'] },
    stack: ['React', 'Vite', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Recharts', 'Docker'],
    github: 'https://github.com/Waleed-Alharbi/soc-security-monitoring-dashboard',
    cardImage: { src: socCover, alt: { en: 'Cybersecurity monitoring illustration', ar: 'رسم توضيحي لمراقبة الأمن السيبراني' } },
    images: [
      { src: socDashboard, alt: { en: 'SentinelIQ security command center', ar: 'مركز القيادة الأمني SentinelIQ' } },
      { src: socNetwork, alt: { en: 'Interactive security network context', ar: 'سياق شبكة أمني تفاعلي' } },
      { src: socIncidents, alt: { en: 'Incident response workflow board', ar: 'لوحة مسار الاستجابة للحوادث' } },
    ],
    signal: { en: 'See the signal.', ar: 'شاهد الإشارة.' },
  },
  {
    slug: 'waqttech', number: '02', theme: 'waqttech',
    shortTitle: { en: 'WaqtTech | وقتك', ar: 'وقتك | WaqtTech' },
    title: { en: 'WaqtTech | وقتك', ar: 'وقتك | WaqtTech' },
    category: { en: 'Software Engineering / Full Stack', ar: 'هندسة البرمجيات / تطوير متكامل' },
    summary: { en: 'An Arabic booking experience that helps customers find a technical service and reserve a suitable appointment in a few clear steps.', ar: 'تجربة حجز عربية تساعد العميل على اختيار خدمة تقنية وحجز موعد مناسب عبر خطوات قصيرة وواضحة.' },
    overview: { en: 'WaqtTech is a full-stack service-booking MVP designed around Saudi users and native RTL behavior. The journey moves clearly from service discovery and provider context to available slots, confirmation and booking management.', ar: 'وقتك نموذج متكامل لحجز الخدمات صُمم للمستخدم السعودي ولاتجاه RTL من الأساس. تنتقل الرحلة بوضوح من اكتشاف الخدمة ومعلومات مقدمها إلى المواعيد المتاحة والتأكيد وإدارة الحجز.' },
    challenge: { en: 'A convincing Arabic experience requires more than translated labels. Direction, hierarchy, trust cues, validation and scheduling logic all need to feel natural on desktop and mobile.', ar: 'التجربة العربية المقنعة تحتاج أكثر من ترجمة العناوين؛ إذ يجب أن تبدو الاتجاهات والهرمية وإشارات الثقة والتحقق ومنطق المواعيد طبيعية على الكمبيوتر والجوال.' },
    solution: { en: 'I designed the customer journey in RTL first, then connected the React interface to FastAPI and relational models for services, specialists, availability, customers and bookings.', ar: 'صممت رحلة العميل باتجاه RTL أولًا، ثم ربطت واجهة React بخلفية FastAPI ونماذج مترابطة للخدمات والمتخصصين والتوفر والعملاء والحجوزات.' },
    built: { en: ['Arabic-first responsive product interface', 'Service discovery and detailed provider context', 'Validated date, slot and booking flow', 'Booking list, detail, update and cancellation'], ar: ['واجهة منتج متجاوبة تبدأ بالعربية', 'اكتشاف الخدمات وسياق تفصيلي للمتخصص', 'مسار متحقق للتاريخ والموعد والحجز', 'قائمة الحجوزات وتفاصيلها وتعديلها وإلغاؤها'] },
    decisions: { en: ['Designed RTL as the primary product direction.', 'Validated service, date, method and availability in the backend.', 'Kept payment, authentication and real providers outside the MVP scope.'], ar: ['تصميم RTL بوصفه الاتجاه الأساسي للمنتج.', 'التحقق من الخدمة والتاريخ والطريقة والتوفر في الخلفية.', 'إبقاء الدفع والمصادقة ومقدمي الخدمة الحقيقيين خارج نطاق النموذج.'] },
    stack: ['React', 'Vite', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Arabic RTL'],
    github: 'https://github.com/Waleed-Alharbi/waqttech-service-booking',
    cardImage: { src: waqttechCover, alt: { en: 'WaqtTech Arabic booking illustration', ar: 'رسم توضيحي لمنصة وقتك لحجز الخدمات' } },
    images: [
      { src: waqtHome, alt: { en: 'WaqtTech Arabic homepage', ar: 'الصفحة الرئيسية العربية لوقتك' } },
      { src: waqtServices, alt: { en: 'Arabic technical service discovery', ar: 'استكشاف الخدمات التقنية بالعربية' } },
      { src: waqtBooking, alt: { en: 'RTL service booking flow', ar: 'مسار حجز خدمة باتجاه RTL' } },
    ],
    signal: { en: 'Your service. Your time.', ar: 'خدمتك التقنية، في وقتك.' },
  },
  {
    slug: 'basira', number: '04', theme: 'basira',
    shortTitle: { en: 'BASIRA | بصيرة', ar: 'بصيرة | BASIRA' },
    title: { en: 'BASIRA | بصيرة', ar: 'بصيرة | BASIRA' },
    category: { en: 'Data & AI', ar: 'البيانات والذكاء الاصطناعي' },
    summary: { en: 'A guided tool that turns a data file into clear charts, useful findings and a prediction without losing the steps in between.', ar: 'أداة موجهة تحوّل ملف البيانات إلى رسوم واضحة ونتائج مفيدة وتنبؤ، مع شرح الخطوات على طول الطريق.' },
    overview: { en: 'BASIRA is a full-stack analytical workbench—not a static dashboard. Its six-stage workflow makes each decision visible while React, Pandas and real scikit-learn pipelines perform the underlying analysis.', ar: 'بصيرة مساحة عمل تحليلية متكاملة وليست لوحة نتائج ثابتة. يكشف مسارها المكوّن من ست مراحل كل قرار، بينما تنفذ React وPandas وخطوط scikit-learn فعلية التحليل في الخلفية.' },
    challenge: { en: 'Final charts can hide the most important work: data quality checks, transformations, preprocessing choices and model evaluation. The challenge was to make that process understandable without oversimplifying it.', ar: 'قد تخفي الرسوم النهائية أهم العمل: فحص جودة البيانات والتحويلات وخيارات المعالجة المسبقة وتقييم النموذج. كان التحدي هو شرح هذه الرحلة بوضوح دون تبسيط مخل.' },
    solution: { en: 'I built a step-by-step lab that preserves the source data, records safe transformations, generates requested analysis and trains only compatible models before presenting a prediction.', ar: 'بنيت مختبرًا متدرجًا يحافظ على البيانات الأصلية ويسجل التحويلات الآمنة وينشئ التحليلات المطلوبة، ثم يدرّب النماذج المتوافقة فقط قبل عرض التنبؤ.' },
    built: { en: ['Validated CSV import and schema profiling', 'Pandas cleaning with measured impact and history', 'Constructed charts, correlations and outlier hints', 'Regression and classification experiments'], ar: ['استيراد CSV متحقق وتنميط للمخطط', 'تنظيف عبر Pandas بأثر مقاس وسجل مرتب', 'رسوم وارتباطات ومؤشرات قيم شاذة', 'تجارب انحدار وتصنيف'] },
    decisions: { en: ['Fit preprocessing only on training data.', 'Describe insights as deterministic statistics—not an LLM.', 'Limit sessions to validated CSV files and local memory.'], ar: ['ملاءمة المعالجة المسبقة على بيانات التدريب فقط.', 'وصف الاستنتاجات كإحصاءات حتمية لا كنموذج لغوي.', 'قصر الجلسات على ملفات CSV متحققة وذاكرة محلية.'] },
    stack: ['React 18', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-learn', 'Recharts', 'Pytest'],
    github: 'https://github.com/Waleed-Alharbi/basira-data-ai-lab',
    cardImage: { src: basiraCover, alt: { en: 'BASIRA data analysis illustration', ar: 'رسم توضيحي لتحليل البيانات في بصيرة' } },
    images: [
      { src: basiraHome, alt: { en: 'BASIRA data lab introduction', ar: 'مقدمة مختبر بيانات بصيرة' } },
      { src: basiraExplore, alt: { en: 'Exploratory analysis workspace', ar: 'مساحة التحليل الاستكشافي' } },
      { src: basiraModel, alt: { en: 'Machine learning model lab', ar: 'مختبر نماذج تعلم الآلة' } },
    ],
    signal: { en: 'From rows to reason.', ar: 'من البيانات إلى البصيرة.' },
  },
  {
    slug: 'bunya', number: '05', theme: 'bunya',
    shortTitle: { en: 'BUNYA | بُنية', ar: 'بُنية | BUNYA' },
    title: { en: 'BUNYA | بُنية', ar: 'بُنية | BUNYA' },
    category: { en: 'Infrastructure / Cloud', ar: 'البنية التحتية / السحابة' },
    summary: { en: 'An interactive simulation that shows how connected services work together, what happens when one fails and how the system recovers.', ar: 'محاكاة تفاعلية توضح كيف تعمل الخدمات المترابطة، وماذا يحدث عند تعطل إحداها، وكيف يعود النظام للعمل.' },
    overview: { en: 'BUNYA is a fully simulated operations environment built around an interactive topology of 14 resources, 15 directed links and five architecture layers. It connects architecture, telemetry and incident response in one explorable view.', ar: 'بُنية بيئة محاكاة كاملة للعمليات تتمحور حول طوبولوجيا تفاعلية تضم 14 موردًا و15 رابطًا موجهًا وخمس طبقات معمارية، وتجمع المعمارية والقياسات والاستجابة للحوادث في مشهد واحد قابل للاستكشاف.' },
    challenge: { en: 'Status cards can report that a service is down without explaining why. The challenge was to show dependency flow, root-cause evidence and recovery as connected parts of the same system.', ar: 'قد تخبر بطاقات الحالة أن الخدمة متوقفة دون أن تشرح السبب. كان التحدي هو عرض تدفق الاعتمادات وأدلة السبب الجذري والتعافي كأجزاء مترابطة من النظام نفسه.' },
    solution: { en: 'I created a custom React and SVG topology for network, compute, application, data and support layers, then paired it with a deterministic FastAPI engine that applies seven safe incident scenarios and traces their impact.', ar: 'أنشأت طوبولوجيا مخصصة عبر React وSVG لطبقات الشبكة والحوسبة والتطبيق والبيانات والدعم، وربطتها بمحرك FastAPI حتمي يطبق سبعة سيناريوهات آمنة ويتتبع أثرها.' },
    built: { en: ['Explorable topology with directed protocol links', 'Contextual resource telemetry, services and logs', 'Seven incidents with dependency impact and recovery', 'Healthy and outage-aware request traces'], ar: ['طوبولوجيا قابلة للاستكشاف بروابط بروتوكول موجهة', 'قياسات وخدمات وسجلات سياقية للموارد', 'سبعة حوادث بأثر اعتماد وتعافٍ', 'تتبع طلبات في الصحة وأثناء الأعطال'] },
    decisions: { en: ['Put dependency topology at the center of the product.', 'Use explicit deterministic rules for explainable impact.', 'Execute no real cloud, SSH, network or infrastructure commands.'], ar: ['وضع طوبولوجيا الاعتماد في مركز المنتج.', 'استخدام قواعد حتمية صريحة لأثر قابل للتفسير.', 'عدم تنفيذ أي أوامر حقيقية للسحابة أو SSH أو الشبكة.'] },
    stack: ['React', 'Vite', 'Custom SVG', 'FastAPI', 'Pydantic', 'Pytest'],
    github: 'https://github.com/Waleed-Alharbi/bunya-infrastructure-lab',
    cardImage: { src: bunyaCover, alt: { en: 'BUNYA cloud infrastructure illustration', ar: 'رسم توضيحي للبنية التحتية السحابية في بُنية' } },
    images: [
      { src: bunyaTopology, alt: { en: 'BUNYA infrastructure dependency topology', ar: 'طوبولوجيا اعتماد البنية التحتية في بُنية' } },
      { src: bunyaIncident, alt: { en: 'Simulated infrastructure incident', ar: 'حادث بنية تحتية محاكى' } },
      { src: bunyaTrace, alt: { en: 'Synthetic request trace', ar: 'تتبع اصطناعي لطلب' } },
    ],
    signal: { en: 'Understand the system.', ar: 'افهم النظام.' },
  },
];

export const projectBySlug = (slug?: string) => projects.find((project) => project.slug === slug);
