import { motion, useReducedMotion } from 'framer-motion';

type DecorVariant = 'hero' | 'about' | 'experience' | 'work' | 'skills' | 'contact';

export function SectionDecor({ variant }: { variant: DecorVariant }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`section-decor decor-${variant}`} aria-hidden="true">
      <i className="section-decor-circle section-decor-circle-a" />
      <i className="section-decor-circle section-decor-circle-b" />
      <motion.i
        className="section-decor-line"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
