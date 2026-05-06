import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LUXE_STUDIO = {
  name: 'LUXE Studio',
  services: [
    { title: 'Signature Cut', price: 'fr. 850 kr', duration: '60 min', image: '/images/haircut.png' },
    { title: 'Color Design', price: 'fr. 1600 kr', duration: '120 min', image: '/images/styling.png' },
    { title: 'Balayage Premium', price: 'fr. 2200 kr', duration: '180 min', image: '/images/styling.png' },
    { title: 'Scalp Therapy', price: '750 kr', duration: '45 min', image: '/images/hero.png' },
  ],
};

const Icons = {
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  ChevronRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Instagram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
  Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  MapPin: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Scissors: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>,
  Star: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
};

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'default', name: 'Original', color: '#1d1d1f' },
    { id: 'blue', name: 'Ocean', color: '#0071e3' },
    { id: 'red-gold', name: 'Royal', color: '#800000' },
    { id: 'tree', name: 'Nature', color: '#4a3728' },
  ];

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '30px', 
      right: '30px', 
      zIndex: 1000, 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '12px',
        background: 'var(--bg-primary)',
        padding: '12px',
        borderRadius: '100px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '1px solid var(--border)',
        transition: 'all 0.5s ease'
      }}>
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => onThemeChange(t.id)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: t.color,
              border: currentTheme === t.id ? '2px solid var(--accent)' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: currentTheme === t.id ? 'scale(1.2)' : 'scale(1)',
              boxShadow: currentTheme === t.id ? `0 0 15px ${t.color}44` : 'none',
            }}
            title={t.name}
          />
        ))}
      </div>
      <span style={{ 
        fontSize: '11px', 
        fontWeight: 600, 
        textTransform: 'uppercase', 
        letterSpacing: '0.1em',
        color: 'var(--text-secondary)',
        opacity: 0.8
      }}>Byt Tema</span>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-4 shadow-sm' : 'py-6'}`} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.5s ease', width: '100%' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-2xl font-bold tracking-tight" style={{ fontSize: '24px', fontWeight: 700, color: isScrolled ? 'var(--text-primary)' : '#fff' }}>
          {LUXE_STUDIO.name}
        </a>

        <div className="hidden md-flex" style={{ display: 'flex', gap: '32px', color: isScrolled ? 'var(--text-primary)' : '#fff' }}>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-sm font-medium hover:opacity-70 transition-opacity">Tjänster</a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }} className="text-sm font-medium hover:opacity-70 transition-opacity">Upplevelsen</a>
          <a href="#booking" onClick={(e) => { e.preventDefault(); scrollToSection('booking'); }} className="text-sm font-medium hover:opacity-70 transition-opacity">Boka</a>
        </div>

        <button onClick={() => scrollToSection('booking')} className="btn-primary" style={{ padding: '10px 24px', fontSize: '15px', backgroundColor: isScrolled ? 'var(--text-primary)' : '#fff', color: isScrolled ? 'var(--bg-primary)' : '#000' }}>
          Boka Nu
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textAlign: 'center', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
    <div className="absolute inset-0 z-0" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <img src="/images/hero.png" alt="Salon" className="w-full h-full object-cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)', backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
    </div>
    <div className="container relative z-10" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
      <div className="max-w-3xl mx-auto text-white" style={{ color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '14px', fontWeight: 500, marginBottom: '24px', display: 'block', opacity: 0.8 }}>Konsten att klippa</span>
        <h1 style={{ fontSize: 'clamp(48px, 10vw, 92px)', lineHeight: 0.95, marginBottom: '32px', fontWeight: 700, letterSpacing: '-0.05em' }}>Din stil,<br />vår passion.</h1>
        <p style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', marginBottom: '48px', opacity: 0.9, maxWidth: '640px', margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 400 }}>Upplev svensk minimalism möter modern lyx. En frisörupplevelse utöver det vanliga i hjärtat av Stockholm.</p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => { const el = document.getElementById('booking'); if(el) el.scrollIntoView({behavior:'smooth'}); }} className="btn-primary" style={{ backgroundColor: '#fff', color: '#000', padding: '18px 44px', fontSize: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>Boka tid</button>
          <a href="#services" onClick={(e) => { e.preventDefault(); const el = document.getElementById('services'); if(el) el.scrollIntoView({behavior:'smooth'}); }} style={{ color: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px' }}>Se tjänster <Icons.ChevronRight /></a>
        </div>
      </div>
    </div>
    <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}>
      <div style={{ width: '2px', height: '40px', backgroundColor: '#fff' }}></div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="section-padding bg-secondary" style={{ backgroundColor: 'var(--bg-secondary)', padding: '140px 0', transition: 'background-color 0.5s ease' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px', fontWeight: 700 }}>Exklusiva Tjänster</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '18px' }}>Varje behandling är skräddarsydd för att framhäva din unika personlighet och stil.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        {LUXE_STUDIO.services.map((s, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -12 }} 
            style={{ backgroundColor: 'var(--bg-primary)', borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'all 0.5s ease' }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5' }}>
              <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
              <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, border: '1px solid var(--border)' }}>{s.price}</div>
            </div>
            <div style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Clock /> {s.duration}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" style={{ padding: '140px 0', backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.5s ease' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '48px', marginBottom: '32px', fontWeight: 700 }}>En upplevelse utöver det vanliga.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background-color 0.5s ease' }}><Icons.Scissors /></div>
              <div>
                <h4 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Mästarkunskap</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Våra stylister har mångårig erfarenhet och utbildas kontinuerligt i de senaste teknikerna.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background-color 0.5s ease' }}><Icons.Star /></div>
              <div>
                <h4 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Premiumprodukter</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Vi arbetar uteslutande med marknadens mest exklusiva och skonsamma märken för ditt hårs hälsa.</p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ borderRadius: '40px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}
        >
          <img src="/images/haircut.png" alt="Experience" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
      </div>
    </div>
  </section>
);

const Booking = () => (
  <section id="booking" style={{ padding: '140px 0', backgroundColor: 'var(--bg-secondary)', transition: 'background-color 0.5s ease' }}>
    <div className="container">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass" 
        style={{ padding: '100px 40px', borderRadius: '48px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center', border: '1px solid var(--border)', transition: 'all 0.5s ease' }}
      >
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', marginBottom: '24px', fontWeight: 700, letterSpacing: '-0.04em' }}>Redo för en förändring?</h2>
        <p style={{ fontSize: '22px', color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>Hitta en tid som passar dig. Vi ser fram emot att välkomna dig till vår oas i city.</p>
        <button className="btn-primary" style={{ padding: '20px 60px', fontSize: '20px', fontWeight: 600, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>Boka din tid nu</button>
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', gap: '40px', opacity: 0.6, fontSize: '15px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Clock /> Öppet: 09:00 - 18:00</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.MapPin /> Centralgatan 12, Stockholm</span>
        </div>
      </motion.div>
    </div>
  </section>
);

function App() {
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.5s ease' }}>
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
      <Navbar />
      <Hero />
      <Services />
      <Experience />
      <Booking />
      <footer style={{ padding: '80px 0', borderTop: '1px solid var(--border)', textAlign: 'center', backgroundColor: 'var(--bg-primary)', transition: 'all 0.5s ease' }}>
        <div className="container">
          <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>{LUXE_STUDIO.name}</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '40px' }}>
            <a href="#" style={{ opacity: 0.6, hover: { opacity: 1 } }}><Icons.Instagram /></a>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>© {new Date().getFullYear()} {LUXE_STUDIO.name}. Skapad med passion för stil.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
