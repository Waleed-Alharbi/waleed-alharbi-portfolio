import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { PointerEvent } from 'react';
import { useSite } from './SiteContext';

const concepts = [
  { en: 'SOFTWARE', ar: 'برمجيات', x: 96, y: 88 },
  { en: 'DATA + AI', ar: 'بيانات + AI', x: 440, y: 72 },
  { en: 'SECURITY', ar: 'أمن', x: 510, y: 300 },
  { en: 'IT OPS', ar: 'عمليات IT', x: 326, y: 478 },
  { en: 'SYSTEMS', ar: 'أنظمة', x: 64, y: 386 },
];

export function TechnicalMark() {
  const { language } = useSite();
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 90, damping: 18 });
  const y = useSpring(my, { stiffness: 90, damping: 18 });

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    if (reduceMotion) return;
    const box = event.currentTarget.getBoundingClientRect();
    mx.set(((event.clientX - box.left) / box.width - 0.5) * 12);
    my.set(((event.clientY - box.top) / box.height - 0.5) * 12);
  };

  return (
    <motion.svg
      className="technical-mark"
      viewBox="0 0 580 560"
      role="img"
      aria-label={language === 'en' ? 'Waleed Alharbi technical constellation' : 'كوكبة وليد الحربي التقنية'}
      onPointerMove={onMove}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
      style={{ x, y }}
    >
      <defs>
        <pattern id="mark-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="currentColor" strokeOpacity=".08" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="1" y="1" width="578" height="558" fill="url(#mark-grid)" stroke="currentColor" strokeOpacity=".18" />
      <path className="mark-orbit" d="M94 88C230 20 398 31 440 72S570 178 510 300 414 486 326 478 102 472 64 386 23 173 94 88Z" />
      <path className="mark-line" d="M94 88L292 277 440 72M292 277L510 300M292 277L326 478M292 277L64 386" />
      <path className="mark-cross" d="M262 277h60M292 247v60" />
      <circle className="mark-core-ring" cx="292" cy="277" r="103" />
      <circle className="mark-core-ring mark-core-ring--inner" cx="292" cy="277" r="88" />
      <text className="mark-monogram" x="292" y="306" textAnchor="middle">WA</text>
      <text className="mark-coordinate" x="26" y="30">26.2082° N</text>
      <text className="mark-coordinate" x="554" y="532" textAnchor="end">43.4837° E</text>
      {concepts.map((concept, index) => (
        <g key={concept.en} className="mark-node">
          <circle cx={concept.x} cy={concept.y} r="7" />
          <circle className="mark-node-pulse" cx={concept.x} cy={concept.y} r="14" style={{ animationDelay: `${index * -0.8}s` }} />
          <text x={concept.x} y={concept.y - 18} textAnchor={concept.x < 140 ? 'start' : concept.x > 430 ? 'end' : 'middle'}>
            {language === 'en' ? concept.en : concept.ar}
          </text>
        </g>
      ))}
    </motion.svg>
  );
}
