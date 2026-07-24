import { useRef, useEffect, useState, useCallback } from 'react';
import Card from './Card';

const services = [
  { title: 'Custom ERP Development',      image: '/images/erp-dashboard.png' },
  { title: 'Custom Software Development', image: '/images/code-editor.png' },
  { title: 'Web Development',             image: '/images/website-mockup.png' },
  { title: 'Mobile App Development',      image: '/images/mobile-app.png' },
  { title: 'AI Automation',               image: '/images/ai-workflow.png' },
  { title: 'Business Analytics',          image: '/images/analytics-dashboard.png' },
  { title: 'Motion Graphics',             image: '/images/motion-graphics.png' },
  { title: 'Video Editing',               image: '/images/video-editing.png' },
];

const rotations = [-2.5, 1.5, -1, 2, -1.5, 1, -2, 1.5];

// Triple the array so the strip is long enough for seamless looping
const items = [...services, ...services, ...services];
const rots  = [...rotations, ...rotations, ...rotations];

// Arc curve parameters
const ARC_PEAK = -45;  // px – center card rises this many px above baseline
const ARC_SIDE = 45;   // px – edge cards drop this many px below baseline
const SPEED    = 0.45; // px per frame (~27 px/s @ 60 fps)
const GAP      = 24;   // px gap between cards (matches gap-6)
const CARD_W   = 190;  // px – must match Card lg width

function curveY(distFromCentre, xPos) {
  const tNorm = (Math.cos(distFromCentre * Math.PI) + 1) / 2; // 1 at centre, 0 at edge
  const baseY = ARC_SIDE - tNorm * (ARC_SIDE + Math.abs(ARC_PEAK));
  const floatY = Math.sin(xPos * 0.015) * 10; // ±10px floating motion
  return baseY + floatY;
}

function curveScale(distFromCentre) {
  const tNorm = (Math.cos(distFromCentre * Math.PI) + 1) / 2;
  return 0.94 + tNorm * (1.0 - 0.94);
}

function curveRotate(distFromCentre, baseRot) {
  const tNorm = (Math.cos(distFromCentre * Math.PI) + 1) / 2;
  return baseRot * (1 - tNorm);
}

export default function ServiceCards() {
  const trackRef  = useRef(null);
  const offsetRef = useRef(0);
  const rafRef    = useRef(null);
  const pausedRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cardStyles, setCardStyles] = useState(() =>
    items.map(() => ({ translateY: ARC_SIDE, scale: 0.92, rotate: 0, zIndex: 1 }))
  );

  const computeStyles = useCallback(() => {
    const vw = window.innerWidth;
    setCardStyles(
      items.map((_, i) => {
        const cardCx       = i * (CARD_W + GAP) + CARD_W / 2 + offsetRef.current;
        const normX        = cardCx / vw;
        const distFromCentre = Math.min(Math.abs(normX - 0.5) * 2, 1);
        return {
          translateY: curveY(distFromCentre, cardCx),
          scale:      curveScale(distFromCentre),
          rotate:     curveRotate(distFromCentre, rots[i]),
          zIndex:     Math.round(curveScale(distFromCentre) * 100),
        };
      })
    );
  }, []);

  const tick = useCallback(() => {
    if (!pausedRef.current) {
      const track = trackRef.current;
      if (track) {
        const stripW = services.length * (CARD_W + GAP);
        offsetRef.current -= SPEED;
        if (offsetRef.current < -stripW) offsetRef.current += stripW;
        track.style.transform = `translateX(${offsetRef.current}px)`;
      }
      computeStyles();
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [computeStyles]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [tick]);

  const handleHover = useCallback((idx) => {
    pausedRef.current = true;
    setHoveredIndex(idx);
  }, []);

  const handleLeave = useCallback(() => {
    pausedRef.current = false;
    setHoveredIndex(null);
  }, []);

  // Vertical room: arc peak + hover lift + shadow buffer
  const HOVER_LIFT  = 40;
  const TOP_PADDING = Math.abs(ARC_PEAK) + HOVER_LIFT + 20; // 90px headroom

  return (
    <div style={{ width: '100%', overflowX: 'clip', overflowY: 'visible' }}>
      <section
        className="relative w-full"
        style={{
          overflow: 'visible',
          paddingTop: `${TOP_PADDING}px`,
          paddingBottom: `${ARC_SIDE + 30}px`,
        }}
        onMouseLeave={handleLeave}
      >
        {/* Ambient glow (not masked, so it doesn't get clipped) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ overflow: 'visible', zIndex: 0 }}>
          <div className="w-[700px] h-[300px] bg-accent/[0.04] rounded-full blur-[120px]" />
        </div>

        {/* Mask wrapper just for the cards, with large padding to prevent clipping shadows/tooltips */}
        <div 
          style={{
            paddingTop: '150px',
            paddingBottom: '150px',
            marginTop: '-150px',
            marginBottom: '-150px',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            zIndex: 1,
            position: 'relative'
          }}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className="flex flex-nowrap items-end"
            style={{
              gap: `${GAP}px`,
              willChange: 'transform',
              position: 'relative',
              width: 'max-content',
              overflow: 'visible',
            }}
          >
          {items.map((service, i) => {
            const s          = cardStyles[i] || { translateY: ARC_SIDE, scale: 0.92, rotate: 0, zIndex: 1 };
            const isHovered  = hoveredIndex === i;
            const translateY = s.translateY;
            const scale      = s.scale;
            const rotate     = isHovered ? 0    : s.rotate;
            const zIdx       = isHovered ? 999  : s.zIndex;

            return (
              <div
                key={`arc-card-${i}`}
                style={{
                  flexShrink: 0,
                  overflow: 'visible',
                  transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                  zIndex: zIdx,
                  position: 'relative',
                  transition: isHovered
                    ? 'transform 0.35s cubic-bezier(0.23,1,0.32,1)'
                    : 'transform 0.1s linear',
                  willChange: 'transform',
                }}
              >
                <Card
                  title={service.title}
                  image={service.image}
                  index={i}
                  rotation={0}
                  hoveredIndex={hoveredIndex}
                  onHover={handleHover}
                  onLeave={handleLeave}
                />
              </div>
            );
          })}
        </div>
        </div>
      </section>
    </div>
  );
}



