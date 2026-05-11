import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SALON_DATA = {
  name: "Stiv's Hårsalong",
  bookingUrl: 'https://www.bokadirekt.se/places/stivs-harsalong-61413',
  phone: '011-12 18 18',
  address: 'Nygatan 79, 602 34 Norrköping',
  instagram: '@stivistifo',
  services: [
    { title: 'Damklippning', price: '350 kr', duration: '30 min' },
    { title: 'Herrklippning', price: '300 kr', duration: '20 min' },
    { title: 'Barnklippning', price: '250 kr', duration: '30 min' },
    { title: 'Färgning (inkl. klippning)', price: 'fr. 1 000 kr', duration: '120 min' },
    { title: 'Balayage', price: 'fr. 1 500 kr', duration: '180 min' },
    { title: 'Färg + slingor + klippning', price: 'fr. 1 500 kr', duration: '180 min' },
    { title: 'Hårpermanent', price: 'fr. 1 000 kr', duration: '120 min' },
    { title: 'Håruppsättning', price: 'fr. 800 kr', duration: '90 min' },
    { title: 'Inpackning skadat hår', price: '500 kr', duration: '45 min' },
    { title: 'Brynplock (tråd & pincett)', price: '150 kr', duration: '20 min' },
  ],
  reviews: [
    { text: "Hälsa på schemat på Stiv's hårsalong — bra jobbat Stiv!", rating: 5 },
    { text: "Stort tack för att ni tog emot och fixade till vår lilla frisör som klippt sig själv.", rating: 5 },
    { text: "Tack bästa Stiv för den fina uppsättningen!", rating: 5 },
    { text: "Stiv, jag skulle vilja kalla dig för 'hårkonstnär' efter att ha sett bilderna på dina uppsättningar.", rating: 5 },
  ],
  stats: {
    rating: '5/5',
    reviewCount: 27,
    recommendationRate: '96%'
  }
};

const Icons = {
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  ChevronRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Instagram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
  Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  MapPin: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Scissors: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>,
  Star: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
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
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-2xl font-bold tracking-tight" style={{ fontSize: '20px', fontWeight: 700, color: isScrolled ? 'var(--text-primary)' : '#fff' }}>
          {SALON_DATA.name}
        </a>

        <div className="hidden md-flex" style={{ display: 'flex', gap: '32px', color: isScrolled ? 'var(--text-primary)' : '#fff' }}>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-sm font-medium hover:opacity-70 transition-opacity">Tjänster</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="text-sm font-medium hover:opacity-70 transition-opacity">Om oss</a>
          <a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }} className="text-sm font-medium hover:opacity-70 transition-opacity">Recensioner</a>
        </div>

        <button onClick={() => window.open(SALON_DATA.bookingUrl, '_blank')} className="btn-primary" style={{ padding: '10px 24px', fontSize: '15px', backgroundColor: isScrolled ? 'var(--text-primary)' : '#fff', color: isScrolled ? 'var(--bg-primary)' : '#000' }}>
          Boka Tid
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ height: '80vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textAlign: 'center', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', backgroundColor: '#1a1a1c' }}>
    <div className="container relative z-10" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
      <div className="max-w-3xl mx-auto text-white" style={{ color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '14px', fontWeight: 500, marginBottom: '24px', display: 'block', opacity: 0.8 }}>Välkommen till {SALON_DATA.name}</span>
        <h1 style={{ fontSize: 'clamp(36px, 8vw, 72px)', lineHeight: 1.1, marginBottom: '32px', fontWeight: 700, letterSpacing: '-0.05em' }}>Skönhet börjar med<br />rätt frisyr.</h1>
        <p style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', marginBottom: '48px', opacity: 0.9, maxWidth: '640px', margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 400 }}>Välkänd salong i centrala Norrköping sedan 2006. Vi skapar moderna och tidlösa frisyrer i en välkomnande miljö.</p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => window.open(SALON_DATA.bookingUrl, '_blank')} className="btn-primary" style={{ backgroundColor: '#fff', color: '#000', padding: '18px 44px', fontSize: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>Boka din tid</button>
          <a href="#services" onClick={(e) => { e.preventDefault(); const el = document.getElementById('services'); if(el) el.scrollIntoView({behavior:'smooth'}); }} style={{ color: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px' }}>Se tjänster <Icons.ChevronRight /></a>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="section-padding bg-secondary" style={{ backgroundColor: 'var(--bg-secondary)', padding: '100px 0', transition: 'background-color 0.5s ease' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px', fontWeight: 700 }}>Våra Tjänster & Priser</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '18px' }}>Vi erbjuder allt från klassisk klippning till avancerad färgning och styling.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {SALON_DATA.services.map((s, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            style={{ 
              backgroundColor: 'var(--bg-primary)', 
              padding: '24px 32px', 
              borderRadius: '20px', 
              border: '1px solid var(--border)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>{s.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Clock /> {s.duration}</p>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{s.price}</div>
          </motion.div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <button onClick={() => window.open(SALON_DATA.bookingUrl, '_blank')} className="btn-primary" style={{ padding: '16px 40px' }}>Boka tid på Bokadirekt</button>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" style={{ padding: '100px 0', backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.5s ease' }}>
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '42px', marginBottom: '24px', fontWeight: 700 }}>Hårkonst i hjärtat av Norrköping.</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '48px', lineHeight: 1.7 }}>
            Stiv's Hårsalong är en välkänd oas i centrala Norrköping sedan 2006. 
            Stiv är specialist på håruppsättningar och har över 20 års erfarenhet av att skapa magi med hår.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Icons.Scissors /></div>
              <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Expertis & Erfarenhet</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Klippning, färgning och styling för alla åldrar.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Icons.Star /></div>
              <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>96% Rekommendationsgrad</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Våra kunder lämnar salongen med ett leende.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Reviews = () => (
  <section id="reviews" style={{ padding: '120px 0', backgroundColor: 'var(--bg-secondary)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
          {[...Array(5)].map((_, i) => <Icons.Star key={i} />)}
        </div>
        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>{SALON_DATA.stats.rating}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Baserat på {SALON_DATA.stats.reviewCount} recensioner från Bokadirekt & Facebook</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {SALON_DATA.reviews.map((rev, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ backgroundColor: 'var(--bg-primary)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border)' }}
          >
            <p style={{ fontStyle: 'italic', fontSize: '17px', lineHeight: 1.6, color: 'var(--text-primary)' }}>"{rev.text}"</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, j) => <Icons.Star key={j} />)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-primary)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700 }}>Galleri</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {[1, 2, 3, 4].map((num) => (
          <motion.div 
            key={num}
            whileHover={{ scale: 1.05 }}
            style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '1/1', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
          >
            <img src={`/images/salon${num}.jpg`} alt={`Portfolio ${num}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ padding: '100px 0 60px', backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', marginBottom: '80px', textAlign: 'left' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>{SALON_DATA.name}</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '300px', lineHeight: 1.6 }}>Din salong i hjärtat av Norrköping. Vi skapar stilfulla frisyrer i en avslappnad miljö.</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '32px' }}>
            <a href={`https://instagram.com/${SALON_DATA.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.Instagram /></a>
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Kontakt</h4>
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: 'var(--text-secondary)' }}><Icons.MapPin /> {SALON_DATA.address}</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: 'var(--text-secondary)' }}><Icons.Clock /> {SALON_DATA.phone}</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}><Icons.Instagram /> {SALON_DATA.instagram}</p>
        </div>
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Öppettider</h4>
          <p style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Mån–Fre: 10:00–18:00</p>
          <p style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Lördag: 10:00–14:00</p>
          <p style={{ color: 'var(--text-secondary)' }}>Söndag: Stängt</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>© {new Date().getFullYear()} {SALON_DATA.name}. Alla rättigheter förbehållna.</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.5s ease' }}>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <section style={{ padding: '100px 0', backgroundColor: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '24px' }}>Redo att förvandla din stil?</h2>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px' }}>Boka din tid idag och låt Stiv hjälpa dig hitta din perfekta look.</p>
          <button onClick={() => window.open(SALON_DATA.bookingUrl, '_blank')} className="btn-primary" style={{ padding: '20px 60px', fontSize: '20px' }}>Boka tid på Bokadirekt</button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
