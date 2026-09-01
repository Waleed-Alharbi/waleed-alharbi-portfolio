import helpdeskDashboard from '../assets/projects/helpdesk/dashboard.png';
import helpdeskTickets from '../assets/projects/helpdesk/tickets.png';
import helpdeskReports from '../assets/projects/helpdesk/reports.png';
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

export type LocalizedText = { en: string; ar: string };

export type PortfolioProject = {
  slug: string;
  number: string;
  title: LocalizedText;
  displayTitle?: string;
  category: LocalizedText;
  homeSummary: LocalizedText;
  overview: LocalizedText;
  context: LocalizedText;
  solution: LocalizedText;
  built: { en: string[]; ar: string[] };
  features: { en: string[]; ar: string[] };
  workflow: string[];
  stack: string[];
  decisions: { en: string[]; ar: string[] };
  demonstrates: LocalizedText;
  github: string;
  images: { src: string; alt: LocalizedText }[];
  accent: string;
};

export const projects: PortfolioProject[] = [
  {
    slug: 'it-helpdesk',
    number: '01',
    title: { en: 'IT Helpdesk & Asset Management System', ar: 'نظام مكتب الدعم وإدارة الأصول التقنية' },
    category: { en: 'IT Support / IT Operations', ar: 'الدعم التقني / عمليات تقنية المعلومات' },
    homeSummary: {
      en: 'A full-stack service desk workspace connecting ticket queues, asset inventory, user management, and operational reporting.',
      ar: 'مساحة عمل متكاملة لمكتب الدعم تربط تذاكر الخدمة ومخزون الأصول وإدارة المستخدمين والتقارير التشغيلية.',
    },
    overview: {
      en: 'A portfolio-scale IT service management application that brings practical support workflows into one responsive interface. It is intentionally presented as a realistic demonstration—not an enterprise production system.',
      ar: 'تطبيق لإدارة خدمات تقنية المعلومات بحجم مناسب للعرض المهني، يجمع مسارات الدعم العملية في واجهة واحدة متجاوبة. وهو نموذج واقعي للتوضيح وليس نظامًا مؤسسيًا للإنتاج.',
    },
    context: {
      en: 'Service desk work is fragmented when tickets, device ownership, users, and reporting live in separate views. A useful junior IT portfolio needs to show both support-domain understanding and end-to-end implementation.',
      ar: 'يتشتت عمل مكتب الدعم عندما تنفصل التذاكر وملكية الأجهزة والمستخدمون والتقارير. لذلك يحتاج المشروع المهني إلى إظهار فهم مجال الدعم والتنفيذ المتكامل معًا.',
    },
    solution: {
      en: 'A React operations workspace consumes a documented FastAPI REST API. SQLAlchemy persists tickets, assets, and users in SQLite, while reporting endpoints turn the same records into operational summaries.',
      ar: 'مساحة عمليات مبنية بـ React تتصل بواجهة REST موثقة عبر FastAPI. تحفظ SQLAlchemy التذاكر والأصول والمستخدمين في SQLite، وتحوّل واجهات التقارير البيانات نفسها إلى ملخصات تشغيلية.',
    },
    built: {
      en: ['Ticket search, filtering, creation, editing, deletion, priority, status, assignment, and SLA indicators', 'Asset inventory with ownership, department, serial number, purchase date, and lifecycle status', 'Organization directory and active/inactive user management', 'Dashboard and reporting views for workload, resolution, asset status, and monthly trends'],
      ar: ['البحث في التذاكر وتصفيتها وإنشاؤها وتعديلها وحذفها مع الأولوية والحالة والإسناد ومؤشرات SLA', 'مخزون أصول يوضح الملكية والقسم والرقم التسلسلي وتاريخ الشراء وحالة دورة الحياة', 'دليل مستخدمين وإدارة الحالات النشطة وغير النشطة', 'لوحات وتقارير لعبء العمل ونسب الحل وحالة الأصول والاتجاهات الشهرية'],
    },
    features: {
      en: ['Full CRUD workflows', 'REST / JSON integration', 'Responsive tables and forms', 'Loading, error, empty, and confirmation states', 'Swagger / OpenAPI documentation', 'Docker Compose development setup'],
      ar: ['عمليات CRUD متكاملة', 'تكامل REST / JSON', 'جداول ونماذج متجاوبة', 'حالات التحميل والخطأ والفراغ والتأكيد', 'توثيق Swagger / OpenAPI', 'بيئة تطوير عبر Docker Compose'],
    },
    workflow: ['React + Vite', 'REST / JSON', 'FastAPI', 'SQLAlchemy', 'SQLite'],
    stack: ['React 18', 'Vite', 'JavaScript', 'Tailwind CSS', 'Recharts', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'SQLite', 'Docker'],
    decisions: {
      en: ['Kept support entities related through one API instead of presenting disconnected mock screens.', 'Included user-feedback states across management workflows to make CRUD behavior explainable.', 'Scoped authentication, audit history, and enterprise SLA automation as future work rather than claiming unimplemented production capabilities.'],
      ar: ['ربط كيانات الدعم عبر واجهة برمجية واحدة بدل عرض شاشات تجريبية منفصلة.', 'إضافة حالات واضحة للتغذية الراجعة في مسارات الإدارة لتسهيل فهم عمليات CRUD.', 'تحديد المصادقة وسجل التدقيق وأتمتة SLA المؤسسية كتحسينات مستقبلية دون ادعاء وظائف غير منفذة.'],
    },
    demonstrates: {
      en: 'Practical IT support thinking, data-backed operations visibility, full-stack CRUD development, and frontend-to-backend integration.',
      ar: 'فهم عملي للدعم التقني، ورؤية تشغيلية قائمة على البيانات، وتطوير CRUD متكامل، وربط الواجهة الأمامية بالخلفية.',
    },
    github: 'https://github.com/Waleed-Alharbi/it-helpdesk-asset-management',
    images: [
      { src: helpdeskDashboard, alt: { en: 'IT Helpdesk operations dashboard', ar: 'لوحة عمليات مكتب الدعم التقني' } },
      { src: helpdeskTickets, alt: { en: 'Ticket management workspace', ar: 'مساحة إدارة تذاكر الدعم' } },
      { src: helpdeskReports, alt: { en: 'Operational reports and analytics', ar: 'التقارير والتحليلات التشغيلية' } },
    ],
    accent: '#b85b38',
  },
  {
    slug: 'soc-security',
    number: '02',
    title: { en: 'SOC Security Monitoring Dashboard', ar: 'لوحة مراقبة مركز العمليات الأمنية' },
    category: { en: 'Cybersecurity / SOC', ar: 'الأمن السيبراني / مركز العمليات الأمنية' },
    homeSummary: {
      en: 'A simulated SOC workstation for alert triage, incident investigation, network context, event analysis, and response workflows.',
      ar: 'محطة عمل محاكاة لمركز العمليات الأمنية لفرز التنبيهات والتحقيق في الحوادث وسياق الشبكة وتحليل الأحداث والاستجابة.',
    },
    overview: {
      en: 'SentinelIQ models a junior SOC analyst workflow with fictional, simulated security data. It is a safe portfolio environment—not a production SIEM and not a source of real threat telemetry.',
      ar: 'يحاكي SentinelIQ مسار عمل محلل مبتدئ في مركز العمليات الأمنية باستخدام بيانات أمنية خيالية ومحاكاة. وهو بيئة عرض آمنة، وليس نظام SIEM إنتاجيًا أو مصدرًا لبيانات تهديدات حقيقية.',
    },
    context: {
      en: 'Security concepts are difficult to demonstrate through isolated alert cards. The important story is the analyst journey from telemetry to triage, investigation, incident handling, and resolution.',
      ar: 'يصعب إظهار مفاهيم الأمن عبر بطاقات تنبيه منفصلة؛ فالقيمة الحقيقية تكمن في رحلة المحلل من البيانات إلى الفرز والتحقيق وإدارة الحادث ثم الحل.',
    },
    solution: {
      en: 'A dense React command center consumes a FastAPI and SQLite backend seeded with coherent fictional events, alerts, incidents, endpoints, network nodes, and threat indicators.',
      ar: 'مركز قيادة كثيف المعلومات مبني بـ React يتصل بخلفية FastAPI وSQLite محمّلة بأحداث وتنبيهات وحوادث ونقاط طرفية وعُقد شبكة ومؤشرات تهديد خيالية ومترابطة.',
    },
    built: {
      en: ['Live rotating security event stream and filterable terminal-style console', 'Alert queue with severity, source, target, status, and simulated technique labels', 'Incident investigation drawer with evidence and correlated timeline', 'Response board and actions for acknowledge, investigate, contain, escalate, and resolve'],
      ar: ['تدفق متجدد للأحداث الأمنية ووحدة أحداث قابلة للتصفية', 'قائمة تنبيهات تتضمن الشدة والمصدر والهدف والحالة وتصنيفات محاكاة', 'واجهة تحقيق تضم الأدلة وخطًا زمنيًا مترابطًا', 'لوحة استجابة وإجراءات للإقرار والتحقيق والاحتواء والتصعيد والحل'],
    },
    features: {
      en: ['Security command center', 'Interactive network topology', 'Endpoint monitoring', 'Fictional IOC context', 'Rule-based detection simulation', 'Incident workflow board'],
      ar: ['مركز قيادة أمني', 'طوبولوجيا شبكة تفاعلية', 'مراقبة النقاط الطرفية', 'سياق خيالي لمؤشرات الاختراق', 'محاكاة كشف قائمة على القواعد', 'لوحة سير الحوادث'],
    },
    workflow: ['Fictional events', 'Detection rules', 'Alert queue', 'Investigation', 'Incident', 'Response'],
    stack: ['React', 'Vite', 'JavaScript', 'Recharts', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'SQLite', 'Docker'],
    decisions: {
      en: ['Clearly labeled every security signal as fictional or simulated.', 'Designed around analyst decisions rather than a generic collection of metrics.', 'Used rule-based scenarios without claiming real malware detection, threat feeds, or MITRE ATT&CK integration.'],
      ar: ['توضيح أن كل إشارة أمنية خيالية أو محاكاة.', 'تصميم التجربة حول قرارات المحلل بدل مجموعة عامة من المؤشرات.', 'استخدام سيناريوهات قائمة على القواعد دون ادعاء كشف برمجيات خبيثة أو تغذية تهديدات أو تكامل MITRE ATT&CK.'],
    },
    demonstrates: {
      en: 'Security monitoring concepts, alert triage, incident response thinking, network context, REST API development, and responsible simulation boundaries.',
      ar: 'مفاهيم المراقبة الأمنية وفرز التنبيهات والتفكير في الاستجابة للحوادث وسياق الشبكات وتطوير REST مع حدود محاكاة مسؤولة.',
    },
    github: 'https://github.com/Waleed-Alharbi/soc-security-monitoring-dashboard',
    images: [
      { src: socDashboard, alt: { en: 'Simulated SOC command center', ar: 'مركز قيادة SOC محاكى' } },
      { src: socNetwork, alt: { en: 'Interactive security network topology', ar: 'طوبولوجيا شبكة أمنية تفاعلية' } },
      { src: socIncidents, alt: { en: 'Incident response workflow board', ar: 'لوحة سير الاستجابة للحوادث' } },
    ],
    accent: '#657b7e',
  },
  {
    slug: 'waqttech',
    number: '03',
    title: { en: 'WaqtTech | وقتك', ar: 'وقتك | WaqtTech' },
    category: { en: 'Software Engineering / Full Stack', ar: 'هندسة البرمجيات / تطوير متكامل' },
    homeSummary: {
      en: 'An Arabic-first technical services marketplace built around discovery, availability, booking, rescheduling, and cancellation.',
      ar: 'منصة عربية لحجز الخدمات التقنية تركّز على الاستكشاف والتوفر والحجز وإعادة الجدولة والإلغاء.',
    },
    overview: {
      en: 'WaqtTech is a fictional Saudi-oriented product concept that gives customers a clear Arabic path from a technical need to a confirmed appointment. All services, specialists, customers, reviews, bookings, and locations are fictional.',
      ar: 'وقتك مفهوم منتج خيالي موجّه للسوق السعودي، يمنح العميل مسارًا عربيًا واضحًا من الحاجة التقنية إلى موعد مؤكد. جميع الخدمات والمختصين والعملاء والتقييمات والحجوزات والمواقع خيالية.',
    },
    context: {
      en: 'Individuals and small businesses may need technical help without an internal IT team, yet discovering a service, understanding its delivery mode, and coordinating availability can be unclear.',
      ar: 'قد يحتاج الأفراد والمنشآت الصغيرة إلى دعم تقني دون فريق داخلي، لكن العثور على الخدمة وفهم طريقة تقديمها وتنسيق الموعد قد يكون غير واضح.',
    },
    solution: {
      en: 'An Arabic RTL customer marketplace presents searchable services, rich service detail, remote or on-site delivery, validated availability, and a guided six-stage booking flow backed by relational data.',
      ar: 'سوق خدمات عربي باتجاه RTL يعرض خدمات قابلة للبحث وتفاصيل غنية وخيارات عن بُعد أو في الموقع وتوفرًا متحققًا منه ومسار حجز موجّهًا من ست مراحل مدعومًا ببيانات مترابطة.',
    },
    built: {
      en: ['Service discovery with search, categories, delivery filters, and sorting', 'Detail pages with specialist context, Saudi Riyal pricing, duration, requirements, inclusions, and availability', 'Booking flow covering mode, date, time, customer details, review, and confirmation', 'Appointment management with confirmed, completed, cancelled, rescheduled, and released-slot behavior'],
      ar: ['استكشاف الخدمات عبر البحث والتصنيفات وفلاتر طريقة التقديم والترتيب', 'صفحات تفاصيل تشمل سياق المختص والسعر بالريال والمدة والمتطلبات وما تتضمنه الخدمة والتوفر', 'مسار حجز يشمل الطريقة والتاريخ والوقت وبيانات العميل والمراجعة والتأكيد', 'إدارة المواعيد المؤكدة والمكتملة والملغاة مع إعادة الجدولة وتحرير الموعد'],
    },
    features: {
      en: ['Arabic-first RTL experience', '10 seeded services across 8 categories', 'Remote and on-site modes', 'Double-booking prevention', 'Booking reference generation', 'Responsive Arabic forms'],
      ar: ['تجربة عربية أصيلة باتجاه RTL', '10 خدمات تجريبية ضمن 8 تصنيفات', 'خدمات عن بُعد وفي الموقع', 'منع الحجز المزدوج', 'توليد مرجع للحجز', 'نماذج عربية متجاوبة'],
    },
    workflow: ['Discover', 'Details', 'Mode + slot', 'Customer data', 'Review', 'Confirm + manage'],
    stack: ['React', 'Vite', 'React Router', 'JavaScript', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'SQLite', 'Arabic RTL'],
    decisions: {
      en: ['Started from Arabic reading direction and localized product behavior rather than mirroring an English marketplace at the end.', 'Validated slot ownership, date, delivery mode, and availability in the backend.', 'Kept payment, real provider onboarding, notifications, and commercial deployment explicitly outside the MVP.'],
      ar: ['البدء من اتجاه القراءة العربي وسلوك المنتج المحلي بدل عكس سوق إنجليزي في النهاية.', 'التحقق في الخلفية من ارتباط الموعد بالخدمة والتاريخ وطريقة التقديم والتوفر.', 'إبقاء الدفع وانضمام المزودين الحقيقيين والإشعارات والتشغيل التجاري خارج نطاق النموذج بوضوح.'],
    },
    demonstrates: {
      en: 'Arabic product engineering, Saudi localization, relational booking logic, full-stack validation, responsive RTL design, and a complete customer journey.',
      ar: 'هندسة منتج عربي وتوطين سعودي ومنطق حجز مترابط والتحقق المتكامل وتصميم RTL متجاوب ورحلة عميل كاملة.',
    },
    github: 'https://github.com/Waleed-Alharbi/waqttech-service-booking',
    images: [
      { src: waqtHome, alt: { en: 'WaqtTech Arabic technical services homepage', ar: 'الصفحة الرئيسية العربية لمنصة وقتك' } },
      { src: waqtServices, alt: { en: 'Arabic technical service discovery', ar: 'استكشاف الخدمات التقنية بالعربية' } },
      { src: waqtBooking, alt: { en: 'RTL technical service booking flow', ar: 'مسار حجز خدمة تقنية باتجاه RTL' } },
    ],
    accent: '#3f7256',
  },
  {
    slug: 'basira',
    number: '04',
    title: { en: 'BASIRA | بصيرة', ar: 'بصيرة | BASIRA' },
    category: { en: 'Data Analysis / AI / Machine Learning', ar: 'تحليل البيانات / الذكاء الاصطناعي / تعلّم الآلة' },
    homeSummary: {
      en: 'An interactive laboratory that makes the full path from raw CSV to profiling, cleaning, exploration, modeling, and prediction visible.',
      ar: 'مختبر تفاعلي يُظهر المسار الكامل من ملف CSV الخام إلى التنميط والتنظيف والاستكشاف والنمذجة والتنبؤ.',
    },
    overview: {
      en: 'BASIRA is a full-stack data workbench for guided investigation—not a static dashboard. It combines React with Pandas and real scikit-learn pipelines in a temporary local lab session.',
      ar: 'بصيرة مساحة عمل متكاملة للتحقيق الموجّه في البيانات، وليست لوحة ثابتة. تجمع React مع Pandas وخطوط معالجة فعلية من scikit-learn داخل جلسة مختبر محلية مؤقتة.',
    },
    context: {
      en: 'Static dashboards show outcomes but often hide data quality, transformation, variable selection, preprocessing, evaluation, and uncertainty. Those decisions are what a technical reviewer needs to see.',
      ar: 'تعرض اللوحات الثابتة النتائج لكنها غالبًا تخفي جودة البيانات والتحويل واختيار المتغيرات والمعالجة والتقييم وعدم اليقين، مع أن هذه القرارات هي ما يحتاج المراجع التقني إلى رؤيته.',
    },
    solution: {
      en: 'A six-stage analytical workbench preserves the original frame, records safe transformations, builds requested visualizations, reports deterministic insights, trains compatible regression or classification pipelines, and predicts one scenario.',
      ar: 'مساحة تحليل من ست مراحل تحفظ البيانات الأصلية وتسجل التحويلات الآمنة وتبني الرسوم المطلوبة وتعرض استنتاجات حتمية وتدرّب خطوط انحدار أو تصنيف متوافقة ثم تتنبأ بسيناريو واحد.',
    },
    built: {
      en: ['Validated CSV import, schema profiling, completeness, duplicates, cardinality, and distributions', 'Pandas cleaning operations with ordered history, measured impact, reset, and CSV export', 'User-constructed charts, Pearson correlations, outlier hints, and deterministic statistical annotations', 'Regression and classification experiments with held-out evaluation, comparison, importance, and prediction'],
      ar: ['استيراد CSV متحقق منه وتنميط المخطط والاكتمال والتكرار والتنوع والتوزيعات', 'عمليات تنظيف Pandas بسجل مرتب وأثر مقاس وإعادة ضبط وتصدير CSV', 'رسوم يبنيها المستخدم وارتباطات Pearson ومؤشرات القيم الشاذة وتعليقات إحصائية حتمية', 'تجارب انحدار وتصنيف بتقييم منفصل ومقارنة وأهمية خصائص وتنبؤ'],
    },
    features: {
      en: ['Import → Profile → Clean → Explore → Model → Predict', 'Linear and Random Forest regression', 'Logistic and Random Forest classification', 'MAE, RMSE, R², Accuracy, Precision, Recall, F1', 'Leakage-aware preprocessing', '5 backend validation tests'],
      ar: ['استيراد ← تنميط ← تنظيف ← استكشاف ← نمذجة ← تنبؤ', 'الانحدار الخطي والغابة العشوائية', 'التصنيف اللوجستي والغابة العشوائية', 'MAE وRMSE وR² والدقة وPrecision وRecall وF1', 'معالجة تراعي منع تسرب البيانات', 'خمسة اختبارات تحقق للخلفية'],
    },
    workflow: ['Import', 'Profile', 'Clean', 'Explore', 'Model', 'Predict'],
    stack: ['React 18', 'Recharts', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-learn', 'Pydantic', 'Pytest'],
    decisions: {
      en: ['Fit preprocessing on training data only and reject incompatible estimator/problem combinations.', 'Describe the Insight Engine as deterministic statistics—not an LLM.', 'Limit the lab to validated CSV files and in-memory sessions rather than claiming production data infrastructure.'],
      ar: ['ملاءمة المعالجة المسبقة على بيانات التدريب فقط ورفض التركيبات غير المتوافقة بين النموذج ونوع المسألة.', 'وصف محرك الاستنتاجات كحسابات إحصائية حتمية وليس نموذجًا لغويًا.', 'قصر المختبر على ملفات CSV متحقق منها وجلسات مؤقتة بدل ادعاء بنية بيانات إنتاجية.'],
    },
    demonstrates: {
      en: 'End-to-end data analysis, safe transformation design, scikit-learn pipelines, model evaluation, API testing, and a workflow-led React interface.',
      ar: 'تحليل بيانات متكامل وتصميم تحويلات آمنة وخطوط scikit-learn وتقييم النماذج واختبار الواجهات وتجربة React قائمة على سير العمل.',
    },
    github: 'https://github.com/Waleed-Alharbi/basira-data-ai-lab',
    images: [
      { src: basiraHome, alt: { en: 'BASIRA data laboratory landing experience', ar: 'واجهة مختبر بيانات بصيرة' } },
      { src: basiraExplore, alt: { en: 'Interactive exploratory analysis canvas', ar: 'مساحة تحليل استكشافي تفاعلية' } },
      { src: basiraModel, alt: { en: 'Machine learning experiment workspace', ar: 'مساحة تجارب تعلّم الآلة' } },
    ],
    accent: '#b87c41',
  },
  {
    slug: 'bunya',
    number: '05',
    title: { en: 'BUNYA | بُنية', ar: 'بُنية | BUNYA' },
    category: { en: 'Systems / Infrastructure / Cloud / DevOps', ar: 'الأنظمة / البنية التحتية / السحابة / DevOps' },
    homeSummary: {
      en: 'An infrastructure operations lab where topology, dependency impact, investigation, recovery, and request tracing are the main experience.',
      ar: 'مختبر لعمليات البنية التحتية يجعل الطوبولوجيا وتأثير الاعتماد والتحقيق والتعافي وتتبع الطلب جوهر التجربة.',
    },
    overview: {
      en: 'BUNYA is a fully simulated infrastructure lab built around a custom interactive topology. Its 14 resources, 15 directed links, and five architecture layers are synthetic and never connect to real systems or cloud accounts.',
      ar: 'بُنية مختبر محاكاة كامل للبنية التحتية يتمحور حول طوبولوجيا تفاعلية مخصصة. موارده الـ14 وروابطه الموجهة الـ15 وطبقاته الخمس اصطناعية ولا تتصل بأنظمة أو حسابات سحابية حقيقية.',
    },
    context: {
      en: 'Metric cards can show that services are unhealthy while hiding why. Infrastructure understanding is clearer when traffic flow, dependencies, failure propagation, evidence, and recovery can be explored together.',
      ar: 'قد تُظهر بطاقات المؤشرات تعطل الخدمات لكنها تخفي السبب. يصبح فهم البنية أوضح عندما يمكن استكشاف تدفق الحركة والاعتماد وانتشار العطل والأدلة والتعافي معًا.',
    },
    solution: {
      en: 'A custom React and SVG operations canvas visualizes network, compute, application, data, and support layers. A deterministic FastAPI engine applies seven safe incident scenarios and propagates their impact through explicit dependency rules.',
      ar: 'مساحة عمليات مخصصة عبر React وSVG تعرض طبقات الشبكة والحوسبة والتطبيق والبيانات والدعم. يطبق محرك FastAPI حتمي سبعة سيناريوهات حوادث آمنة وينشر أثرها وفق قواعد اعتماد صريحة.',
    },
    built: {
      en: ['Explorable topology with resource silhouettes, directed links, protocols, health, search, layer focus, and zoom', 'Contextual inspector for specifications, telemetry, ports, services, dependencies, and logs', 'Seven incident scenarios with root failure, downstream impact, timeline, and validated recovery action', 'Healthy and outage-aware synthetic request traces plus deployment history'],
      ar: ['طوبولوجيا قابلة للاستكشاف بأشكال موارد وروابط موجهة وبروتوكولات وصحة وبحث وتركيز على الطبقات وتقريب', 'مستعرض سياقي للمواصفات والقياسات والمنافذ والخدمات والاعتمادات والسجلات', 'سبعة سيناريوهات حوادث تشمل أصل العطل والأثر المتسلسل والخط الزمني وإجراء التعافي المتحقق منه', 'تتبعات طلبات اصطناعية في الصحة والعطل مع سجل النشر'],
    },
    features: {
      en: ['14 resources · 15 directed links', 'Five architecture layers', 'Seven deterministic incidents', 'Dependency impact propagation', 'Request tracing', 'Six backend workflow tests'],
      ar: ['14 موردًا · 15 رابط اعتماد موجهًا', 'خمس طبقات معمارية', 'سبعة حوادث حتمية', 'انتشار أثر الاعتماد', 'تتبع الطلبات', 'ستة اختبارات لمسارات الخلفية'],
    },
    workflow: ['Observe', 'Inspect', 'Incident', 'Impact', 'Recover', 'Trace'],
    stack: ['React', 'Vite', 'Custom SVG', 'JavaScript', 'FastAPI', 'Pydantic', 'Pytest'],
    decisions: {
      en: ['Put the dependency topology—not monitoring cards—at the center of the product.', 'Use explicit deterministic rules so root cause, propagation, response, and recovery remain explainable.', 'Keep every action in memory and clearly state that no SSH, cloud, network, container, or infrastructure command is executed.'],
      ar: ['وضع طوبولوجيا الاعتماد، لا بطاقات المراقبة، في مركز المنتج.', 'استخدام قواعد حتمية صريحة ليظل السبب الجذري والانتشار والاستجابة والتعافي قابلًا للتفسير.', 'إبقاء كل إجراء في الذاكرة والتوضيح أن التطبيق لا ينفذ أوامر SSH أو سحابة أو شبكة أو حاويات أو بنية تحتية.'],
    },
    demonstrates: {
      en: 'Systems thinking, dependency modeling, infrastructure concepts, incident investigation, deterministic simulation design, request tracing, and tested FastAPI workflows.',
      ar: 'التفكير النظمي ونمذجة الاعتماد ومفاهيم البنية والتحقيق في الحوادث وتصميم المحاكاة الحتمية وتتبع الطلبات ومسارات FastAPI المختبرة.',
    },
    github: 'https://github.com/Waleed-Alharbi/bunya-infrastructure-lab',
    images: [
      { src: bunyaTopology, alt: { en: 'BUNYA interactive infrastructure topology', ar: 'طوبولوجيا البنية التحتية التفاعلية في بُنية' } },
      { src: bunyaIncident, alt: { en: 'Simulated infrastructure incident investigation', ar: 'تحقيق في حادث بنية تحتية محاكى' } },
      { src: bunyaTrace, alt: { en: 'Healthy synthetic request trace', ar: 'تتبع اصطناعي سليم لطلب' } },
    ],
    accent: '#8b6247',
  },
];

export const projectBySlug = (slug?: string) => projects.find((project) => project.slug === slug);
