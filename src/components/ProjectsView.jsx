import { useState } from 'react';
import projects from '../../content/projects.js';
import { tx, tl, bullet } from '../../shared/text.js';
import { Icons, PageHeader, Btn, Chip, EmptyState, Section } from './ui.jsx';

function ProjectCard({ p, t, lang, onAsk }) {
  const [hovered, setHovered] = useState(false);
  const name = tx(p.name, lang);
  const highlights = tl(p.highlights, lang);
  const links = p.links || {};
  const meta = [p.year, tx(p.role, lang)].filter(Boolean).join(' · ');
  return (
    <div className="fade-in"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)', borderRadius: 'var(--r-lg)',
        border: `1px solid ${hovered ? 'var(--primary-soft)' : 'var(--border)'}`,
        boxShadow: hovered ? '0 0 26px rgba(13,15,20,0.06), var(--shadow)' : 'var(--shadow)',
        padding: '18px 18px 14px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 196,
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}>
      {p.image && (
        <div style={{ margin: '-18px -18px 0', borderRadius: 'var(--r-lg) var(--r-lg) 0 0', overflow: 'hidden', borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
          <img src={p.image} alt="" loading="lazy" style={{ display: 'block', width: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }} />
        </div>
      )}
      <div>
        <div dir="auto" style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>{name}</div>
        {tx(p.tagline, lang) && <div dir="auto" style={{ fontSize: 12.5, color: 'var(--text-2)', marginTop: 4, fontWeight: 500 }}>{tx(p.tagline, lang)}</div>}
        {meta && <div dir="auto" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{meta}</div>}
      </div>
      {tx(p.description, lang) && (
        <div dir="auto" style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{tx(p.description, lang)}</div>
      )}
      {highlights.length > 0 && (
        <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.7 }}>
          {highlights.map((item, i) => {
            const { title, text } = bullet(item);
            return <li key={i} style={{ unicodeBidi: 'normal' }}>{title && <strong style={{ color: 'var(--text)', fontWeight: 650 }}>{title}: </strong>}{text}</li>;
          })}
        </ul>
      )}
      {(p.tech || []).length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.tech.map((x) => <Chip key={x} mono>{x}</Chip>)}
        </div>
      )}
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: 13 }}>
        {links.live && <Btn size="sm" icon={Icons.external} href={links.live}>{t.live}</Btn>}
        {links.repo && <Btn size="sm" icon={Icons.github} href={links.repo}>{t.code}</Btn>}
        <Btn size="sm" icon={Icons.sparkle} onClick={() => onAsk(t.askProjectQuestion(name))} style={{ marginInlineStart: 'auto' }}>
          {t.askAboutProject}
        </Btn>
      </div>
    </div>
  );
}

export function ProjectsView({ t, lang, onAsk, onOpenChat, stacked }) {
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const list = projects || [];
  return (
    <div dir={dir}>
      {!stacked && <PageHeader eyebrow={t.portfolio} title={t.projectsTitle} subtitle={list.length ? t.projectCount(list.length) : null} />}
      {list.length === 0 ? (
        <Section>
          <EmptyState icon={Icons.projects} title={t.comingSoon} subtitle={t.comingSoonSub}
            action={<Btn icon={Icons.chat} onClick={onOpenChat}>{t.openChat}</Btn>} />
        </Section>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {list.map((p, i) => <ProjectCard key={p.id || i} p={p} t={t} lang={lang} onAsk={onAsk} />)}
        </div>
      )}
    </div>
  );
}
