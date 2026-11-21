import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from 'motion/react';

const BOOKING_URL = 'https://cal.com/m.chandrakala/15-mins-intro-call';
const EMAIL_ADDRESS = 'masanoori.chandrakala@yahoo.com';
const WHATSAPP_NUMBER = '';

function FilmGrain() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay"
    >
      <filter id="talriva-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#talriva-grain)" />
    </svg>
  );
}

function MagneticButton({
  href,
  children,
  className = '',
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - centerX) * 0.16,
      y: (e.clientY - centerY) * 0.16,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={prefersReduced ? undefined : { x: offset.x, y: offset.y }}
      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.5 }}
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 ${className}`}
    >
      {children}
    </motion.a>
  );
}

function MaskedHeadline({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}

function ScrollWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.24, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.26em]">
      {word}
    </motion.span>
  );
}

function ImageWithFallback({
  src,
  alt,
  fallbackLabel,
  className = '',
}: {
  src: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1B2A4A] to-[#F4A300] ${className}`}
      >
        <FilmGrain />
        <span
          className="font-serif-display select-none text-[6rem] leading-none text-transparent"
          style={{ WebkitTextStroke: '1.5px #FDF6EC' }}
        >
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

const WORK_CARDS = [
  {
    num: '01',
    title: 'Joining checklist',
    image: '/work-1.jpg',
    today: 'Today: joining steps sit scattered across messages and calls.',
    withTalriva:
      'With TALRIVA: every consultant moves through one joining checklist on one form and one sheet.',
  },
  {
    num: '02',
    title: 'Paper chase board',
    image: '/work-2.jpg',
    today: 'Today: you chase the same consultant papers again and again.',
    withTalriva:
      'With TALRIVA: one paper chase board keeps every document status visible on one sheet.',
  },
  {
    num: '03',
    title: 'Monday list of open roles',
    image: '/work-3.jpg',
    today: 'Today: the week starts by piecing together open roles by hand.',
    withTalriva:
      'With TALRIVA: your Monday list of open roles stays current on one sheet, kept running each month.',
  },
];

const WITHOUT_EVENING = [
  'You finish the day chasing missing consultant papers across messages and calls.',
  'You check separate notes to see which joining steps are still open.',
  'You spend your evening updating spreadsheets before tomorrow begins.',
  'You carry the same questions again and again into the night.',
];

const WITH_EVENING = [
  'Every joining checklist item sits recorded on one form and one sheet.',
  'Consultant papers stay visible in one place on your paper chase board.',
  'Your Monday list of open roles is ready on the same sheet.',
  'Your setup is kept running for you so you can close your laptop for the evening.',
];

const FAQ_ITEMS = [
  {
    q: 'Who is TALRIVA for?',
    a: 'TALRIVA is built for [Who I help] in Hyderabad.',
  },
  {
    q: 'What exactly do you set up?',
    a: 'I build a joining checklist, a paper chase board and a Monday list of open roles, all on one form and one sheet, and keep them running.',
  },
  {
    q: 'How long does setup take?',
    a: 'We agree on the setup timeline together on our 20 minute call.',
  },
  {
    q: 'What does it cost?',
    a: 'Rs 25,000 setup + Rs 5,000 a month.',
  },
  {
    q: 'How do we start?',
    a: 'Book a 20 minute call or send an email to masanoori.chandrakala@yahoo.com so we can map out your setup.',
  },
];

export default function App() {
  const prefersReduced = useReducedMotion();
  const [navTheme, setNavTheme] = useState<'transparent' | 'cream' | 'ink'>('transparent');
  const [showStickyMobile, setShowStickyMobile] = useState(false);
  const [afterMode, setAfterMode] = useState<'without' | 'with'>('without');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const problemRef = useRef<HTMLElement>(null);
  const whatIDoRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const archY = useTransform(scrollY, [0, 700], [0, prefersReduced ? 0 : 48]);

  const { scrollYProgress: problemProgress } = useScroll({
    target: problemRef,
    offset: ['start 0.78', 'end 0.35'],
  });

  const { scrollYProgress: whatIDoProgress } = useScroll({
    target: whatIDoRef,
    offset: ['start start', 'end end'],
  });
  const smoothCardsProgress = useSpring(whatIDoProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.4,
  });
  const cardsX = useTransform(smoothCardsProgress, [0, 1], ['0%', '-62%']);

  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ['start 0.75', 'end 0.55'],
  });
  const lineScaleY = useSpring(stepsProgress, {
    stiffness: 200,
    damping: 28,
  });

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowStickyMobile(y > 540);

      const inkSections = document.querySelectorAll<HTMLElement>('[data-surface="ink"]');
      let overInk = false;
      inkSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 68 && rect.bottom >= 68) {
          overInk = true;
        }
      });

      if (overInk) {
        setNavTheme('ink');
      } else if (y > 24) {
        setNavTheme('cream');
      } else {
        setNavTheme('transparent');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const problemSentence =
    'You lose time every evening chasing consultant papers across scattered sheets and answering the same questions again and again.';
  const problemWords = problemSentence.split(' ');

  return (
    <div className="min-h-screen bg-[#FDF6EC] text-[#1B2A4A]">
      {/* 1. TOP BAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          navTheme === 'transparent'
            ? 'bg-transparent text-[#1B2A4A]'
            : navTheme === 'cream'
              ? 'bg-[#FDF6EC] text-[#1B2A4A] border-b border-[#1B2A4A]/12'
              : 'bg-[#1B2A4A] text-[#FDF6EC] border-b border-[#FDF6EC]/12'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#" className="flex items-center" aria-label="TALRIVA home">
            <span
              className={`inline-flex items-center transition-colors duration-200 ${
                navTheme === 'ink'
                  ? 'rounded-xl bg-[#FDF6EC] px-2.5 py-1.5'
                  : ''
              }`}
            >
              <img
                src="/logo.png"
                alt="TALRIVA"
                className="h-8 w-auto object-contain md:h-9"
              />
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-[16px] font-medium md:flex">
            <a href="#what-i-do" className="hover:opacity-75 transition-opacity">
              What I do
            </a>
            <a href="#how-it-works" className="hover:opacity-75 transition-opacity">
              How it works
            </a>
            <a href="#about" className="hover:opacity-75 transition-opacity">
              About
            </a>
          </nav>

          <MagneticButton
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F4A300] px-5 py-2.5 text-[15px] font-semibold text-[#1B2A4A] hover:bg-[#e09600]"
          >
            Book a call
          </MagneticButton>
        </div>
      </header>

      {/* 2. HERO */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-[120px]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-12 md:gap-10 md:px-8">
          {/* Arch Frame on phone first, right column on laptop */}
          <div className="order-1 flex justify-center md:order-2 md:col-span-5 md:justify-end">
            <motion.div
              style={{ y: archY }}
              initial={prefersReduced ? false : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.4 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[340px] sm:max-w-[380px]"
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[28px] border border-[#1B2A4A]/12 bg-[#1B2A4A]">
                <ImageWithFallback
                  src="/me.jpg"
                  alt="Chandrakala M, founder of TALRIVA"
                  fallbackLabel="CM"
                  className="h-full w-full"
                />
              </div>

              <div className="absolute -bottom-5 left-4 right-4 rounded-[20px] border border-[#1B2A4A]/12 bg-[#FDF6EC] px-5 py-3.5 sm:left-auto sm:-left-6 sm:right-auto">
                <p className="text-[15px] font-semibold leading-snug text-[#1B2A4A]">
                  Chandrakala M, founder of TALRIVA
                </p>
              </div>
            </motion.div>
          </div>

          {/* Copy column */}
          <div className="order-2 pt-3 md:order-1 md:col-span-7 md:pt-0">
            <p className="mb-5 text-[16px] font-medium tracking-wide text-[#1B2A4A]/80">
              For{' '}
              <span className="rounded border border-dashed border-[#1B2A4A]/35 px-2 py-0.5 text-[#1B2A4A]">
                [Who I help]
              </span>{' '}
              in Hyderabad
            </p>

            <MaskedHeadline
              as="h1"
              className="font-serif-display text-[44px] leading-[1.0] tracking-[-0.02em] text-[#1B2A4A] sm:text-[62px] lg:text-[78px]"
            >
              Your consultants{' '}
              <span className="italic text-[#F4A300]">join</span> on time,
              every time.
            </MaskedHeadline>

            <p className="mt-7 max-w-[60ch] text-[18px] leading-[1.6] text-[#1B2A4A]/90">
              I build a joining checklist, a paper chase board and a Monday list
              of open roles, all built on one form and one sheet, and keep them
              running.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F4A300] px-7 py-4 text-[17px] font-semibold text-[#1B2A4A] hover:bg-[#e09600]"
              >
                Book a 20 minute call
              </MagneticButton>

              {WHATSAPP_NUMBER ? (
                <MagneticButton
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#1B2A4A]/20 px-6 py-4 text-[17px] font-medium text-[#1B2A4A] hover:border-[#1B2A4A]"
                >
                  Message me on WhatsApp
                </MagneticButton>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM (Ink section, word-by-word scroll light-up) */}
      <section
        ref={problemRef}
        data-surface="ink"
        className="relative overflow-hidden bg-[#1B2A4A] py-20 text-[#FDF6EC] md:py-[140px]"
      >
        <FilmGrain />
        <div className="relative mx-auto max-w-5xl px-5 md:px-8">
          <p className="font-serif-display text-[38px] leading-[1.08] tracking-[-0.01em] sm:text-[56px] lg:text-[72px]">
            {prefersReduced
              ? problemSentence
              : problemWords.map((word, idx) => {
                  const start = idx / problemWords.length;
                  const end = Math.min(1, start + 1 / problemWords.length + 0.04);
                  return (
                    <ScrollWord
                      key={`${word}-${idx}`}
                      word={word}
                      progress={problemProgress}
                      range={[start, end]}
                    />
                  );
                })}
          </p>
        </div>
      </section>

      {/* 4. WHAT I DO (Pinned sideways scroll on desktop, swipeable stack on mobile, stacked with reduced motion) */}
      <section
        id="what-i-do"
        ref={whatIDoRef}
        className={`relative bg-[#FDF6EC] py-16 md:py-[120px] ${
          prefersReduced ? '' : 'lg:h-[260vh]'
        }`}
      >
        <div
          className={
            prefersReduced
              ? 'mx-auto max-w-6xl px-5 md:px-8'
              : 'lg:sticky lg:top-20 lg:flex lg:min-h-[calc(100vh-5rem)] lg:flex-col lg:justify-center lg:overflow-hidden'
          }
        >
          <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
            <p className="mb-3 text-[15px] font-semibold uppercase tracking-[0.12em] text-[#1B2A4A]/70">
              What I do
            </p>
            <MaskedHeadline className="font-serif-display text-[44px] leading-[1.0] text-[#1B2A4A] lg:text-[72px]">
              One form and one sheet, built for your desk.
            </MaskedHeadline>
          </div>

          {/* Mobile swipeable horizontal cards */}
          <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 no-scrollbar lg:hidden">
            {WORK_CARDS.map((card) => (
              <article
                key={card.num}
                className="w-[86vw] max-w-[400px] shrink-0 snap-center overflow-hidden rounded-[28px] border border-[#1B2A4A]/12 bg-[#FDF6EC]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#1B2A4A]">
                  <ImageWithFallback
                    src={card.image}
                    alt={card.title}
                    fallbackLabel={card.num}
                    className="h-full w-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-block rounded-full bg-[#F4A300] px-3 py-0.5 text-[14px] font-bold text-[#1B2A4A]">
                      {card.num}
                    </span>
                    <h3 className="font-serif-display text-[30px] leading-none text-[#1B2A4A]">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[17px] leading-[1.55] text-[#1B2A4A]/75">
                    {card.today}
                  </p>
                  <p className="mt-2.5 text-[17px] font-medium leading-[1.55] text-[#1B2A4A]">
                    {card.withTalriva}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Desktop pinned horizontal track (or vertical stack when reduced motion is enabled) */}
          {prefersReduced ? (
            <div className="mt-12 hidden gap-8 lg:grid lg:grid-cols-1">
              {WORK_CARDS.map((card) => (
                <article
                  key={card.num}
                  className="overflow-hidden rounded-[28px] border border-[#1B2A4A]/12 bg-[#FDF6EC]"
                >
                  <div className="h-[340px] w-full overflow-hidden bg-[#1B2A4A]">
                    <ImageWithFallback
                      src={card.image}
                      alt={card.title}
                      fallbackLabel={card.num}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3">
                      <span className="inline-block rounded-full bg-[#F4A300] px-3.5 py-1 text-[15px] font-bold text-[#1B2A4A]">
                        {card.num}
                      </span>
                      <h3 className="font-serif-display text-[36px] leading-none text-[#1B2A4A]">
                        {card.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-[65ch] text-[18px] leading-[1.6] text-[#1B2A4A]/75">
                      {card.today}
                    </p>
                    <p className="mt-2 max-w-[65ch] text-[18px] font-medium leading-[1.6] text-[#1B2A4A]">
                      {card.withTalriva}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 hidden lg:block">
              <motion.div
                style={{ x: cardsX }}
                className="flex gap-8 pl-[max(2rem,calc((100vw-72rem)/2+2rem))] pr-24"
              >
                {WORK_CARDS.map((card) => (
                  <article
                    key={card.num}
                    className="w-[68vw] max-w-[880px] shrink-0 overflow-hidden rounded-[28px] border border-[#1B2A4A]/12 bg-[#FDF6EC]"
                  >
                    <div className="h-[340px] w-full overflow-hidden bg-[#1B2A4A]">
                      <ImageWithFallback
                        src={card.image}
                        alt={card.title}
                        fallbackLabel={card.num}
                        className="h-full w-full"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3.5">
                        <span className="inline-block rounded-full bg-[#F4A300] px-3.5 py-1 text-[15px] font-bold text-[#1B2A4A]">
                          {card.num}
                        </span>
                        <h3 className="font-serif-display text-[38px] leading-none text-[#1B2A4A]">
                          {card.title}
                        </h3>
                      </div>
                      <p className="mt-4 max-w-[66ch] text-[18px] leading-[1.6] text-[#1B2A4A]/75">
                        {card.today}
                      </p>
                      <p className="mt-2 max-w-[66ch] text-[18px] font-medium leading-[1.6] text-[#1B2A4A]">
                        {card.withTalriva}
                      </p>
                    </div>
                  </article>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* 5. BEFORE AND AFTER (Two-position switch with stacked crossfade) */}
      <section className="border-t border-[#1B2A4A]/12 py-16 md:py-[120px]">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <MaskedHeadline className="font-serif-display text-[44px] leading-[1.0] text-[#1B2A4A] lg:text-[72px]">
            How your evening looks.
          </MaskedHeadline>

          <div className="mt-8 inline-flex rounded-full border border-[#1B2A4A]/15 p-1.5">
            <button
              type="button"
              onClick={() => setAfterMode('without')}
              aria-pressed={afterMode === 'without'}
              className={`rounded-full px-5 py-2.5 text-[16px] font-semibold transition-colors duration-200 ${
                afterMode === 'without'
                  ? 'bg-[#1B2A4A] text-[#FDF6EC]'
                  : 'text-[#1B2A4A]'
              }`}
            >
              Without TALRIVA
            </button>
            <button
              type="button"
              onClick={() => setAfterMode('with')}
              aria-pressed={afterMode === 'with'}
              className={`rounded-full px-5 py-2.5 text-[16px] font-semibold transition-colors duration-200 ${
                afterMode === 'with'
                  ? 'bg-[#F4A300] text-[#1B2A4A]'
                  : 'text-[#1B2A4A]'
              }`}
            >
              With TALRIVA
            </button>
          </div>

          {/* Stacked crossfade grid so both lists occupy the exact same space */}
          <div className="mt-10 grid">
            <motion.ul
              initial={false}
              animate={{
                opacity: afterMode === 'without' ? 1 : 0,
              }}
              transition={{ duration: prefersReduced ? 0 : 0.35 }}
              aria-hidden={afterMode !== 'without'}
              className={`col-start-1 row-start-1 rounded-[28px] border border-[#1B2A4A]/12 p-6 md:p-10 ${
                afterMode === 'without' ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {WITHOUT_EVENING.map((line, i) => (
                <li
                  key={line}
                  className={`flex items-start gap-4 py-4 text-[18px] leading-[1.6] text-[#1B2A4A]/85 ${
                    i !== 0 ? 'border-t border-[#1B2A4A]/12' : ''
                  }`}
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1B2A4A]/40" />
                  <span className="max-w-[64ch]">{line}</span>
                </li>
              ))}
            </motion.ul>

            <motion.ul
              initial={false}
              animate={{
                opacity: afterMode === 'with' ? 1 : 0,
              }}
              transition={{ duration: prefersReduced ? 0 : 0.35 }}
              aria-hidden={afterMode !== 'with'}
              className={`col-start-1 row-start-1 rounded-[28px] border border-[#1B2A4A]/12 p-6 md:p-10 ${
                afterMode === 'with' ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {WITH_EVENING.map((line, i) => (
                <li
                  key={line}
                  className={`flex items-start gap-4 py-4 text-[18px] font-medium leading-[1.6] text-[#1B2A4A] ${
                    i !== 0 ? 'border-t border-[#1B2A4A]/12' : ''
                  }`}
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#F4A300]" />
                  <span className="max-w-[64ch]">{line}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* 6. HOW WE START (Three numbered steps on a thin vertical line filling with accent) */}
      <section
        id="how-it-works"
        className="border-t border-[#1B2A4A]/12 py-16 md:py-[120px]"
      >
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="mb-3 text-[15px] font-semibold uppercase tracking-[0.12em] text-[#1B2A4A]/70">
            How it works
          </p>
          <MaskedHeadline className="font-serif-display text-[44px] leading-[1.0] text-[#1B2A4A] lg:text-[72px]">
            How we start.
          </MaskedHeadline>

          <div ref={stepsRef} className="relative mt-14 pl-10 md:pl-14">
            {/* Background hairline */}
            <div className="absolute top-2 bottom-2 left-3.5 w-[2px] bg-[#1B2A4A]/12 md:left-4" />
            {/* Accent fill line */}
            <motion.div
              style={{
                scaleY: prefersReduced ? 1 : lineScaleY,
                transformOrigin: 'top',
              }}
              className="absolute top-2 bottom-2 left-3.5 w-[2px] bg-[#F4A300] md:left-4"
            />

            <div className="space-y-12">
              <div className="relative">
                <span className="absolute -left-10 top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F4A300] text-[14px] font-bold text-[#1B2A4A] md:-left-14 md:h-8 md:w-8">
                  1
                </span>
                <h3 className="font-serif-display text-[32px] leading-tight text-[#1B2A4A] md:text-[38px]">
                  A 20 minute call
                </h3>
                <p className="mt-2 max-w-[62ch] text-[18px] leading-[1.6] text-[#1B2A4A]/85">
                  We look at how you currently track your joining checklist,
                  paper chase board and Monday list of open roles.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-10 top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F4A300] text-[14px] font-bold text-[#1B2A4A] md:-left-14 md:h-8 md:w-8">
                  2
                </span>
                <h3 className="font-serif-display text-[32px] leading-tight text-[#1B2A4A] md:text-[38px]">
                  A plan for your{' '}
                  <span className="rounded border border-dashed border-[#1B2A4A]/35 px-2 py-0.5 font-sans text-[22px] font-medium">
                    [Who I help]
                  </span>
                </h3>
                <p className="mt-2 max-w-[62ch] text-[18px] leading-[1.6] text-[#1B2A4A]/85">
                  We agree on the exact layout for your form and sheet and the
                  setup timeline.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-10 top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F4A300] text-[14px] font-bold text-[#1B2A4A] md:-left-14 md:h-8 md:w-8">
                  3
                </span>
                <h3 className="font-serif-display text-[32px] leading-tight text-[#1B2A4A] md:text-[38px]">
                  I set it up and show your team
                </h3>
                <p className="mt-2 max-w-[62ch] text-[18px] leading-[1.6] text-[#1B2A4A]/85">
                  I build the form and the sheet for your team and keep them
                  running.
                </p>
                <p className="mt-4 inline-block rounded-full border border-[#1B2A4A]/15 px-4 py-1.5 text-[17px] font-semibold text-[#1B2A4A]">
                  Rs 25,000 setup + Rs 5,000 a month
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT ME (Letter format) */}
      <section
        id="about"
        className="border-t border-[#1B2A4A]/12 py-16 md:py-[120px]"
      >
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="rounded-[28px] border border-[#1B2A4A]/12 p-7 sm:p-12">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#1B2A4A]/15 bg-[#1B2A4A]">
                <ImageWithFallback
                  src="/me.jpg"
                  alt="Chandrakala M"
                  fallbackLabel="CM"
                  className="h-full w-full"
                />
              </div>
              <MaskedHeadline className="font-serif-display text-[36px] leading-none text-[#1B2A4A] sm:text-[48px]">
                A note from Chandrakala M
              </MaskedHeadline>
            </div>

            <div className="mt-8 space-y-5 text-[19px] leading-[1.65] text-[#1B2A4A]">
              <p className="max-w-[65ch]">
                I am Chandrakala M, founder of TALRIVA in Hyderabad. I work one
                on one with owners to set up a joining checklist, a paper chase
                board and a Monday list of open roles on one form and one sheet,
                and keep them running.
              </p>
            </div>

            <p className="font-signature mt-8 text-[40px] leading-none text-[#1B2A4A]">
              Chandrakala
            </p>

            <div className="mt-7">
              <MagneticButton
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F4A300] px-7 py-4 text-[17px] font-semibold text-[#1B2A4A] hover:bg-[#e09600]"
              >
                Book a 20 minute call with Chandrakala
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* 8. QUESTIONS (Five expandable hairline rows) */}
      <section className="border-t border-[#1B2A4A]/12 py-16 md:py-[120px]">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <MaskedHeadline className="font-serif-display text-[44px] leading-[1.0] text-[#1B2A4A] lg:text-[72px]">
            Questions.
          </MaskedHeadline>

          <div className="mt-10 border-t border-[#1B2A4A]/12">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="border-b border-[#1B2A4A]/12"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif-display text-[26px] leading-tight text-[#1B2A4A] sm:text-[28px]">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: prefersReduced ? 0 : 0.25 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1B2A4A]/20 text-[22px] leading-none text-[#1B2A4A]"
                    >
                      +
                    </motion.span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      duration: prefersReduced ? 0 : 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[65ch] pb-6 text-[18px] leading-[1.6] text-[#1B2A4A]/85">
                      {item.a}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FINAL INVITATION (On ink) */}
      <section
        data-surface="ink"
        className="relative overflow-hidden bg-[#1B2A4A] py-20 text-[#FDF6EC] md:py-[130px]"
      >
        <FilmGrain />
        <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
          <MaskedHeadline className="font-serif-display text-[44px] leading-[1.0] text-[#FDF6EC] sm:text-[64px] lg:text-[76px]">
            Let&apos;s give your evenings back.
          </MaskedHeadline>

          <div className="mt-9 flex justify-center">
            <MagneticButton
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F4A300] px-8 py-4 text-[18px] font-semibold text-[#1B2A4A] hover:bg-[#e09600]"
            >
              Book a 20 minute call
            </MagneticButton>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[17px] text-[#FDF6EC]/85">
            {WHATSAPP_NUMBER ? (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#FDF6EC]/40 underline-offset-4 hover:text-[#FDF6EC]"
              >
                Message me on WhatsApp
              </a>
            ) : null}
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="underline decoration-[#FDF6EC]/40 underline-offset-4 hover:text-[#FDF6EC]"
            >
              {EMAIL_ADDRESS}
            </a>
          </div>
        </div>
      </section>

      {/* 10. FOOTER (On ink) */}
      <footer
        data-surface="ink"
        className="relative border-t border-[#FDF6EC]/12 bg-[#1B2A4A] py-12 text-[#FDF6EC]"
      >
        <FilmGrain />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center md:px-8">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center rounded-xl bg-[#FDF6EC] px-3 py-2">
              <img
                src="/logo.png"
                alt="TALRIVA"
                className="h-8 w-auto object-contain"
              />
            </span>
            <span className="text-[16px] text-[#FDF6EC]/80">Hyderabad</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[16px] text-[#FDF6EC]/85">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FDF6EC]"
            >
              Book a 20 minute call
            </a>
            {WHATSAPP_NUMBER ? (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FDF6EC]"
              >
                Message me on WhatsApp
              </a>
            ) : null}
            <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-[#FDF6EC]">
              {EMAIL_ADDRESS}
            </a>
          </div>

          <p className="text-[15px] text-[#FDF6EC]/70">2026 TALRIVA</p>
        </div>
      </footer>

      {/* Mobile sticky bottom booking bar after hero scrolls away */}
      {showStickyMobile ? (
        <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-[#1B2A4A]/12 bg-[#FDF6EC] px-5 py-3 md:hidden">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-full bg-[#F4A300] py-3 text-[16px] font-semibold text-[#1B2A4A]"
          >
            Book a 20 minute call
          </a>
        </div>
      ) : null}
    </div>
  );
}
