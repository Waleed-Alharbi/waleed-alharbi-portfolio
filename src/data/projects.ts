import helpdeskDashboard from '../assets/projects/helpdesk/dashboard.png';
import helpdeskTickets from '../assets/projects/helpdesk/tickets.png';
import helpdeskAssets from '../assets/projects/helpdesk/assets.png';
import socDashboard from '../assets/projects/soc/dashboard.png';
import socNetwork from '../assets/projects/soc/network.png';
import socIncidents from '../assets/projects/soc/incidents.png';
import waqtHome from '../assets/projects/waqttech/home.png';
import waqtServices from '../assets/projects/waqttech/services.png';
import waqtBooking from '../assets/projects/waqttech/booking.png';
import basiraHome from '../assets/projects/basira/home.png';
import basiraExplore from '../assets/projects/basira/explore.png';
import basiraModel from '../assets/projects/basira/model-lab.png';
import bunyaTopology from '../assets/projects/bunya/topology.png';
import bunyaIncident from '../assets/projects/bunya/incident.png';
import bunyaTrace from '../assets/projects/bunya/request-trace.png';

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
  images: { src: string; alt: Localized }[];
  theme: 'helpdesk' | 'soc' | 'waqttech' | 'basira' | 'bunya';
  signal: Localized;
};

export const projects: PortfolioProject[] = [
  {
    slug: 'helpdesk', number: '01', theme: 'helpdesk',
    shortTitle: { en: 'ServiceDesk', ar: 'مكتب الدعم' },
    title: { en: 'IT Helpdesk & Asset Management System', ar: 'نظام مكتب الدعم وإدارة الأصول التقنية' },
    category: { en: 'IT Operations', ar: 'عمليات تقنية المعلومات' },
    summary: { en: 'A service desk workspace that brings ticket queues, device inventory, users and operational reporting into one connected system.', ar: 'مساحة عمل تربط تذاكر الدعم ومخزون الأجهزة والمستخدمين والتقارير التشغيلية في نظام واحد مترابط.' },
    overview: { en: 'A portfolio-scale IT service management application that models practical support workflows in one responsive interface. The React workspace consumes a documented FastAPI REST API backed by SQLite.', ar: 'تطبيق لإدارة خدمات تقنية المعلومات يحاكي مسارات الدعم العملية في واجهة متجاوبة واحدة. تتصل مساحة React بواجهة REST موثقة عبر FastAPI وقاعدة SQLite.' },
    challenge: { en: 'Tickets, devices, users and reports often become disconnected views. The project needed to show how support data relates across a complete operational workflow.', ar: 'غالبًا ما تصبح التذاكر والأجهزة والمستخدمون والتقارير واجهات منفصلة. كان الهدف إظهار ترابط بيانات الدعم ضمن مسار تشغيلي متكامل.' },
    solution: { en: 'One API relates tickets, assets and users while reporting endpoints turn the same records into workload, resolution and lifecycle summaries.', ar: 'تربط واجهة برمجية واحدة التذاكر والأصول والمستخدمين، وتحول نقاط التقارير السجلات نفسها إلى ملخصات لعبء العمل والحل ودورة الحياة.' },
    built: { en: ['Ticket search, filters and full CRUD workflows', 'Asset inventory with ownership and lifecycle status', 'User directory and active status management', 'Operational dashboards and monthly reporting'], ar: ['بحث وتصنيف وعمليات متكاملة لتذاكر الدعم', 'مخزون أصول مع الملكية وحالة دورة الحياة', 'دليل مستخدمين وإدارة حالة النشاط', 'لوحات تشغيلية وتقارير شهرية'] },
    decisions: { en: ['Kept support entities connected through one REST API.', 'Included loading, error, empty and confirmation states.', 'Scoped authentication and enterprise SLA automation as future work.'], ar: ['ربط كيانات الدعم عبر واجهة REST واحدة.', 'تضمين حالات التحميل والخطأ والفراغ والتأكيد.', 'تحديد المصادقة وأتمتة SLA المؤسسية كتحسينات مستقبلية.'] },
    stack: ['React 18', 'Vite', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Recharts', 'Docker'],
    github: 'https://github.com/Waleed-Alharbi/it-helpdesk-asset-management',
    images: [
      { src: helpdeskDashboard, alt: { en: 'IT helpdesk operations dashboard', ar: 'لوحة عمليات مكتب الدعم التقني' } },
      { src: helpdeskTickets, alt: { en: 'Ticket management workspace', ar: 'مساحة إدارة تذاكر الدعم' } },
      { src: helpdeskAssets, alt: { en: 'Technology asset inventory', ar: 'مخزون الأصول التقنية' } },
    ],
    signal: { en: 'Support, connected.', ar: 'دعم تقني مترابط.' },
  },
  {
    slug: 'soc', number: '02', theme: 'soc',
    shortTitle: { en: 'SentinelIQ', ar: 'مركز العمليات' },
    title: { en: 'SOC Security Monitoring Dashboard', ar: 'لوحة مراقبة مركز العمليات الأمنية' },
    category: { en: 'Cybersecurity / SOC', ar: 'الأمن السيبراني / SOC' },
    summary: { en: 'A simulated security operations workstation for alert triage, investigation, network context and incident response.', ar: 'محطة عمليات أمنية محاكية لفرز التنبيهات والتحقيق وسياق الشبكة والاستجابة للحوادث.' },
    overview: { en: 'SentinelIQ models a junior SOC analyst workflow with coherent fictional security data. It is a safe portfolio simulation—not a production SIEM or a source of real threat telemetry.', ar: 'يحاكي SentinelIQ مسار محلل مبتدئ في مركز العمليات الأمنية باستخدام بيانات أمنية خيالية مترابطة. هو محاكاة آمنة للعرض وليس نظام SIEM إنتاجيًا.' },
    challenge: { en: 'Isolated alert cards do not communicate analysis. The useful story is the journey from telemetry to triage, evidence, incident handling and resolution.', ar: 'بطاقات التنبيه المنفصلة لا توضح التحليل. القصة المهمة هي الرحلة من القياسات إلى الفرز والأدلة وإدارة الحادث ثم الحل.' },
    solution: { en: 'A dense React command center consumes a FastAPI and SQLite backend seeded with events, alerts, incidents, endpoints, network nodes and fictional indicators.', ar: 'مركز قيادة كثيف المعلومات عبر React يتصل بخلفية FastAPI وSQLite محملة بأحداث وتنبيهات وحوادث ونقاط طرفية وعُقد شبكة خيالية.' },
    built: { en: ['Rotating event stream and filterable console', 'Alert queue with severity, source and status', 'Evidence-led incident investigation timeline', 'Response actions from acknowledge to resolve'], ar: ['تدفق أحداث متجدد ووحدة قابلة للتصفية', 'قائمة تنبيهات بالشدة والمصدر والحالة', 'خط زمني للتحقيق قائم على الأدلة', 'إجراءات استجابة من الإقرار حتى الحل'] },
    decisions: { en: ['Labelled every dataset and technique mapping as simulated.', 'Designed around analyst flow instead of decorative threat graphics.', 'Kept detection rules transparent and intentionally readable.'], ar: ['توضيح أن كل البيانات وتصنيفات التقنيات محاكية.', 'تصميم التجربة حول مسار المحلل بدل الرسومات الأمنية الزخرفية.', 'إبقاء قواعد الكشف واضحة وقابلة للقراءة.'] },
    stack: ['React', 'Vite', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Recharts', 'Docker'],
    github: 'https://github.com/Waleed-Alharbi/soc-security-monitoring-dashboard',
    images: [
      { src: socDashboard, alt: { en: 'SentinelIQ security command center', ar: 'مركز القيادة الأمني SentinelIQ' } },
      { src: socNetwork, alt: { en: 'Interactive security network context', ar: 'سياق شبكة أمني تفاعلي' } },
      { src: socIncidents, alt: { en: 'Incident response workflow board', ar: 'لوحة مسار الاستجابة للحوادث' } },
    ],
    signal: { en: 'See the signal.', ar: 'شاهد الإشارة.' },
  },
  {
    slug: 'waqttech', number: '03', theme: 'waqttech',
    shortTitle: { en: 'WaqtTech | وقتك', ar: 'وقتك | WaqtTech' },
    title: { en: 'WaqtTech | وقتك', ar: 'وقتك | WaqtTech' },
    category: { en: 'Software Engineering / Full Stack', ar: 'هندسة البرمجيات / تطوير متكامل' },
    summary: { en: 'An Arabic-first Saudi product concept for discovering and booking technical help around the customer’s schedule.', ar: 'مفهوم منتج سعودي يبدأ بالعربية لاكتشاف المساعدة التقنية وحجزها وفق وقت العميل.' },
    overview: { en: 'WaqtTech is a fictional Saudi-oriented service booking MVP. Its Arabic RTL experience covers discovery, service details, provider context, time slots and booking management.', ar: 'وقتك نموذج أولي خيالي لحجز الخدمات التقنية في سياق سعودي. تغطي تجربته العربية اكتشاف الخدمات وتفاصيلها ومقدميها والمواعيد وإدارة الحجوزات.' },
    challenge: { en: 'A local service product needs more than translated labels. Reading direction, trust cues, scheduling logic and responsive behavior have to feel native together.', ar: 'يحتاج المنتج المحلي إلى أكثر من ترجمة العناوين؛ يجب أن يعمل اتجاه القراءة وإشارات الثقة ومنطق المواعيد والتجاوب كتجربة أصيلة واحدة.' },
    solution: { en: 'A React customer journey connects to FastAPI and relational SQLite models for categories, services, specialists, slots, customers and bookings.', ar: 'رحلة عميل عبر React تتصل بخلفية FastAPI ونماذج SQLite مترابطة للفئات والخدمات والمتخصصين والمواعيد والعملاء والحجوزات.' },
    built: { en: ['Arabic-first responsive product interface', 'Service discovery and detailed provider context', 'Validated date, slot and booking flow', 'Booking list, detail, update and cancellation'], ar: ['واجهة منتج متجاوبة تبدأ بالعربية', 'اكتشاف الخدمات وسياق تفصيلي للمتخصص', 'مسار متحقق للتاريخ والموعد والحجز', 'قائمة الحجوزات وتفاصيلها وتعديلها وإلغاؤها'] },
    decisions: { en: ['Designed RTL as the primary product direction.', 'Validated service, date, method and availability in the backend.', 'Kept payment, authentication and real providers outside the MVP scope.'], ar: ['تصميم RTL بوصفه الاتجاه الأساسي للمنتج.', 'التحقق من الخدمة والتاريخ والطريقة والتوفر في الخلفية.', 'إبقاء الدفع والمصادقة ومقدمي الخدمة الحقيقيين خارج نطاق النموذج.'] },
    stack: ['React', 'Vite', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Arabic RTL'],
    github: 'https://github.com/Waleed-Alharbi/waqttech-service-booking',
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
    summary: { en: 'An interactive data laboratory that makes the full path from raw CSV to cleaning, analysis, modeling and prediction visible.', ar: 'مختبر بيانات تفاعلي يُظهر المسار الكامل من ملف CSV الخام إلى التنظيف والتحليل والنمذجة والتنبؤ.' },
    overview: { en: 'BASIRA is a full-stack analytical workbench rather than a static dashboard. A guided six-stage workflow combines React with Pandas and real scikit-learn pipelines.', ar: 'بصيرة مساحة عمل تحليلية متكاملة وليست لوحة ثابتة. يجمع مسار من ست مراحل بين React وPandas وخطوط scikit-learn فعلية.' },
    challenge: { en: 'Static dashboards show outcomes but hide data quality, transformation, preprocessing, evaluation and uncertainty—the decisions a technical reviewer needs to see.', ar: 'تعرض اللوحات الثابتة النتائج لكنها تخفي جودة البيانات والتحويل والمعالجة والتقييم وعدم اليقين؛ وهي القرارات التي يحتاج المراجع التقني إلى رؤيتها.' },
    solution: { en: 'The lab preserves the original frame, records safe transformations, builds requested charts, reports deterministic statistics, trains compatible models and predicts a scenario.', ar: 'يحفظ المختبر البيانات الأصلية ويسجل التحويلات الآمنة ويبني الرسوم المطلوبة ويعرض إحصاءات حتمية ويدرّب النماذج المتوافقة ويتنبأ بسيناريو.' },
    built: { en: ['Validated CSV import and schema profiling', 'Pandas cleaning with measured impact and history', 'Constructed charts, correlations and outlier hints', 'Regression and classification experiments'], ar: ['استيراد CSV متحقق وتنميط للمخطط', 'تنظيف عبر Pandas بأثر مقاس وسجل مرتب', 'رسوم وارتباطات ومؤشرات قيم شاذة', 'تجارب انحدار وتصنيف'] },
    decisions: { en: ['Fit preprocessing only on training data.', 'Describe insights as deterministic statistics—not an LLM.', 'Limit sessions to validated CSV files and local memory.'], ar: ['ملاءمة المعالجة المسبقة على بيانات التدريب فقط.', 'وصف الاستنتاجات كإحصاءات حتمية لا كنموذج لغوي.', 'قصر الجلسات على ملفات CSV متحققة وذاكرة محلية.'] },
    stack: ['React 18', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-learn', 'Recharts', 'Pytest'],
    github: 'https://github.com/Waleed-Alharbi/basira-data-ai-lab',
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
    summary: { en: 'A topology-first infrastructure lab where dependencies, failure impact, investigation, recovery and request tracing become visible.', ar: 'مختبر بنية تحتية يبدأ بالطوبولوجيا ويجعل الاعتماد وتأثير الأعطال والتحقيق والتعافي وتتبع الطلبات مرئيًا.' },
    overview: { en: 'BUNYA is a fully simulated infrastructure operations lab centered on a custom interactive topology of 14 resources, 15 directed links and five architecture layers.', ar: 'بُنية مختبر محاكاة كامل لعمليات البنية التحتية يتمحور حول طوبولوجيا تفاعلية مخصصة تضم 14 موردًا و15 رابطًا موجهًا وخمس طبقات.' },
    challenge: { en: 'Metric cards can show unhealthy services while hiding why. Infrastructure understanding becomes clearer when flow, dependencies, evidence and recovery can be explored together.', ar: 'قد تعرض بطاقات المؤشرات تعطل الخدمات لكنها تخفي السبب. يصبح فهم البنية أوضح عند استكشاف التدفق والاعتمادات والأدلة والتعافي معًا.' },
    solution: { en: 'A custom React and SVG canvas visualizes network, compute, application, data and support layers while a deterministic FastAPI engine applies seven safe incident scenarios.', ar: 'تعرض مساحة مخصصة عبر React وSVG طبقات الشبكة والحوسبة والتطبيق والبيانات والدعم، ويطبق محرك FastAPI حتمي سبعة سيناريوهات آمنة للحوادث.' },
    built: { en: ['Explorable topology with directed protocol links', 'Contextual resource telemetry, services and logs', 'Seven incidents with dependency impact and recovery', 'Healthy and outage-aware request traces'], ar: ['طوبولوجيا قابلة للاستكشاف بروابط بروتوكول موجهة', 'قياسات وخدمات وسجلات سياقية للموارد', 'سبعة حوادث بأثر اعتماد وتعافٍ', 'تتبع طلبات في الصحة وأثناء الأعطال'] },
    decisions: { en: ['Put dependency topology at the center of the product.', 'Use explicit deterministic rules for explainable impact.', 'Execute no real cloud, SSH, network or infrastructure commands.'], ar: ['وضع طوبولوجيا الاعتماد في مركز المنتج.', 'استخدام قواعد حتمية صريحة لأثر قابل للتفسير.', 'عدم تنفيذ أي أوامر حقيقية للسحابة أو SSH أو الشبكة.'] },
    stack: ['React', 'Vite', 'Custom SVG', 'FastAPI', 'Pydantic', 'Pytest'],
    github: 'https://github.com/Waleed-Alharbi/bunya-infrastructure-lab',
    images: [
      { src: bunyaTopology, alt: { en: 'BUNYA infrastructure dependency topology', ar: 'طوبولوجيا اعتماد البنية التحتية في بُنية' } },
      { src: bunyaIncident, alt: { en: 'Simulated infrastructure incident', ar: 'حادث بنية تحتية محاكى' } },
      { src: bunyaTrace, alt: { en: 'Synthetic request trace', ar: 'تتبع اصطناعي لطلب' } },
    ],
    signal: { en: 'Understand the system.', ar: 'افهم النظام.' },
  },
];

export const projectBySlug = (slug?: string) => projects.find((project) => project.slug === slug);
