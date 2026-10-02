import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../lib/hooks.js';

/*
 * Ori, from the Codex pet spritesheet (v2 layout): 8 columns × 11 rows of
 * 192×208 cells. Rows 0–8 are animations, rows 9–10 are sixteen look
 * directions, clockwise from straight up.
 *
 * The left-facing look frames in this sheet face right, so every look to the
 * left is the matching right-hand frame mirrored.
 */
const SHEET = '/pet/ori.webp';
const CW = 192;
const CH = 208;
const COLS = 8;
const ROWS = 11;
const NEUTRAL = { row: 0, col: 6 };
// The head, in cell pixels: centred on the figure, from the top of the hair.
const HEAD = { x: 47, y: 3, size: 96 };

/* Frame timings are the Codex pet contract's, except `working`: its six
   frames are six different poses, which read as a flicker at 120ms. */
const ANIMS = {
  idle:    { row: 0, ms: [280, 110, 110, 140, 140, 320], loop: true, rest: [2400, 5200] },
  waving:  { row: 3, ms: [140, 140, 140, 280], times: 2 },
  jumping: { row: 4, ms: [140, 140, 140, 140, 280] },
  failed:  { row: 5, ms: [140, 140, 140, 140, 140, 140, 140, 240], hold: 2400 },
  waiting: { row: 6, ms: [150, 150, 150, 150, 150, 260], loop: true },
  working: { row: 7, ms: [520, 520, 520, 520, 520, 640], loop: true },
};

const rand = ([a, b]) => a + Math.random() * (b - a);

/**
 * mode   'idle' | 'working' — the state it settles into
 * pulse  { name, n } — play a one-shot ('waving', 'jumping', 'failed'); bump n to replay
 * follow look toward the cursor while idle
 * crop   'full' (the whole figure) or 'head' (a square avatar)
 * size   height for 'full', side for 'head'
 */
export function Pet({ mode = 'idle', pulse, follow = false, crop = 'full', size = 200, onClick, title, style }) {
  const reduced = useReducedMotion();
  const base = mode === 'working' ? 'working' : 'idle';
  const [override, setOverride] = useState(null);
  const [frame, setFrame] = useState(0);
  const [look, setLook] = useState(null);
  const ref = useRef(null);
  const current = override || base;

  useEffect(() => { if (pulse && pulse.name) setOverride(pulse.name); }, [pulse && pulse.n]);
  useEffect(() => { if (base === 'working') setOverride(null); }, [base]);

  useEffect(() => {
    const a = ANIMS[current];
    if (!a) return undefined;
    if (reduced) { setFrame(0); return undefined; }
    let timer;
    let i = 0;
    let cycle = 0;
    const step = () => {
      setFrame(i);
      const delay = a.ms[i];
      i += 1;
      if (i < a.ms.length) { timer = setTimeout(step, delay); return; }
      cycle += 1;
      if (a.loop || (a.times && cycle < a.times)) {
        i = 0;
        if (a.rest) {
          timer = setTimeout(() => {
            setFrame(0);
            timer = setTimeout(() => { i = 1; step(); }, rand(a.rest));
          }, delay);
        } else {
          timer = setTimeout(step, delay);
        }
        return;
      }
      timer = setTimeout(() => setOverride(null), delay + (a.hold || 0));
    };
    step();
    return () => clearTimeout(timer);
  }, [current, reduced, pulse && pulse.n]);

  /* Looking at the cursor: only while idle, and only while the cursor is
     moving — after a pause the figure goes back to its own idle loop. */
  useEffect(() => {
    if (!follow) return undefined;
    let raf = 0;
    let settle;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < r.height * 0.45) { setLook(null); return; }
        const deg = (Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360;
        setLook(Math.round(deg / 22.5) % 16);
        clearTimeout(settle);
        settle = setTimeout(() => setLook(null), 2600);
      });
    };
    const onLeave = () => setLook(null);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [follow]);

  let row;
  let col;
  let flip = false;
  if (follow && look != null && current === 'idle') {
    if (look === 8) { row = 10; col = 0; }
    else if (look < 8) { row = 9; col = look; }
    else { row = 9; col = 16 - look; flip = true; }
  } else if (reduced) {
    if (current === 'idle') ({ row, col } = NEUTRAL);
    else { row = ANIMS[current].row; col = 0; }
  } else {
    row = ANIMS[current].row;
    col = frame;
  }

  let box;
  if (crop === 'head') {
    const k = size / HEAD.size;
    box = {
      width: size, height: size,
      backgroundSize: `${CW * COLS * k}px ${CH * ROWS * k}px`,
      backgroundPosition: `-${(col * CW + HEAD.x) * k}px -${(row * CH + HEAD.y) * k}px`,
    };
  } else {
    const w = (size * CW) / CH;
    box = {
      width: w, height: size,
      backgroundSize: `${w * COLS}px ${size * ROWS}px`,
      backgroundPosition: `-${col * w}px -${row * size}px`,
    };
  }

  return (
    <div ref={ref} role="img" aria-label={title || 'Ori'} title={title} onClick={onClick}
      style={{
        ...box,
        flexShrink: 0,
        backgroundImage: `url(${SHEET})`,
        backgroundRepeat: 'no-repeat',
        transform: flip ? 'scaleX(-1)' : undefined,
        cursor: onClick ? 'pointer' : undefined,
        userSelect: 'none',
        ...style,
      }} />
  );
}

/** The neutral frame, no motion: 8Legs' faint watermark in the corner of every page. */
export function PetWatermark({ size = 560, style }) {
  const w = (size * CW) / CH;
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', pointerEvents: 'none', userSelect: 'none',
      width: w, height: size, opacity: 0.035, filter: 'grayscale(1)',
      backgroundImage: `url(${SHEET})`, backgroundRepeat: 'no-repeat',
      backgroundSize: `${w * COLS}px ${size * ROWS}px`,
      backgroundPosition: `-${NEUTRAL.col * w}px -${NEUTRAL.row * size}px`,
      ...style,
    }} />
  );
}

/**
 * The home screen's centrepiece, in place of 8Legs' spider: the figure on a
 * soft light halo, standing on a faint shadow. Clicking it makes it jump.
 */
export function PetStage({ size = 220, mode, pulse, busy }) {
  // The parent's reactions and the click share one counter, so the latest wins.
  const [own, setOwn] = useState({ name: null, n: 0 });
  // A reaction from before this stage mounted (an earlier conversation's error) is not replayed.
  const seen = useRef(pulse && pulse.n);
  useEffect(() => {
    if (!pulse || !pulse.name || pulse.n === seen.current) return;
    seen.current = pulse.n;
    setOwn((p) => ({ name: pulse.name, n: p.n + 1 }));
  }, [pulse && pulse.n]);
  return (
    <div style={{
      position: 'relative', width: size * 1.15, height: size * 1.04, flexShrink: 0,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      <div className={`pet-halo${busy ? ' busy' : ''}`} style={{
        position: 'absolute', left: '50%', top: '46%', width: size * 1.1, height: size * 1.1,
        marginLeft: -(size * 0.55), marginTop: -(size * 0.55), borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.75) 38%, rgba(255,255,255,0) 68%)',
      }} />
      <div style={{
        position: 'absolute', left: '50%', bottom: size * 0.025, width: size * 0.42, height: size * 0.06,
        marginLeft: -(size * 0.21), borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(13,15,20,0.16) 0%, rgba(13,15,20,0) 70%)',
      }} />
      <Pet size={size} mode={mode} pulse={own} follow
        onClick={() => setOwn((p) => ({ name: 'jumping', n: p.n + 1 }))}
        style={{ position: 'relative' }} />
    </div>
  );
}
