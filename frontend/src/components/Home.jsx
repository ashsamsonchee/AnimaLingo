import React, { useState, useEffect } from 'react';

// Holographic Feature Card 
function FeatureCard({ emoji, title, description, glowColor }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 24px',
        backgroundColor: 'rgba(30, 41, 59, 0.4)', 
        backdropFilter: 'blur(8px)',
        borderRadius: '20px',
        border: `2px solid rgba(255,255,255,0.05)`,
        borderTop: `3px solid ${glowColor}`, 
        textAlign: 'center',
        boxSizing: 'border-box',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0px)',
        boxShadow: hovered 
          ? `0 10px 25px -5px ${glowColor}44, 0 0 15px 0 ${glowColor}22` 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), boxShadow 0.25s ease'
      }}
    >
      <div style={{
        width: '60px',
        height: '60px',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        margin: '0 auto 16px auto',
        border: `1px solid ${glowColor}44`,
        boxShadow: `inset 0 0 10px ${glowColor}22`
      }}>
        {emoji}
      </div>
      <h3 style={{ color: '#ffffff', margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold' }}>{title}</h3>
      <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{description}</p>
    </div>
  );
}

export default function Home({ setView }) {
  const [hoverPlay, setHoverPlay] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerPoint = 150;
  const currentScrollProgress = Math.max(0, scrollY - triggerPoint);
  const earthLeftPosition = Math.min(40, -250 + currentScrollProgress * 0.7);
  const textOpacity = Math.min(1, currentScrollProgress / 250);

  return (
    <div style={{ width: '100%', fontFamily: 'system-ui, sans-serif', color: '#ffffff' }}>
      
      {/* HERO SECTION */}
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        padding: '80px 24px 40px 24px',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ 
          fontSize: '56px', 
          fontWeight: '900',
          color: '#ffffff', 
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          Welcome to <span style={{ 
            background: 'linear-gradient(to right, #38bdf8, #a855f7)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 8px rgba(56,189,248,0.3))'
          }}>AnimaLingo!</span>
        </h1>
        
        <p style={{ fontSize: '22px', color: '#94a3b8', maxWidth: '650px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
          The ultimate interactive guessing game where kids learn to identify incredible wild animals while earning experience points!
        </p>

        <button
          onClick={() => setView('quiz')}
          onMouseEnter={() => setHoverPlay(true)}
          onMouseLeave={() => setHoverPlay(false)}
          style={{
            padding: '20px 50px',
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#0f172a',
            backgroundColor: '#22c55e', 
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: hoverPlay ? '0 0 30px #22c55e, 0 0 10px #22c55e' : '0 0 15px rgba(34,197,94,0.4)',
            transform: hoverPlay ? 'scale(1.03)' : 'scale(1)',
            transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          Start Learning Now 🚀
        </button>
      </div>

      {/* FEATURE CARDS CONNECTOR GRID */}
      <div id="features-section" style={{ maxWidth: '850px', margin: '40px auto 0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '28px' }}>
          <FeatureCard emoji="🎨" title="Vibrant Visuals" description="Beautiful photography helps children form instant animal vocabulary connections." glowColor="#38bdf8" />
          <FeatureCard emoji="🔊" title="Audio Feedback" description="Immersive sound effects guide correct answers and cheer on student progress." glowColor="#a855f7" />
          <FeatureCard emoji="🏆" title="Earn Rewards" description="Collect XP points as you play and celebrate with a shiny trophy page at the finish line." glowColor="#eab308" />
        </div>
      </div>

      {/* VIRTUAL PLANET CONSOLE CONTAINER */}
      <div style={{
        background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.8), transparent)',
        width: '100%',
        margin: '120px 0 0 0',
        padding: '80px 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', alignItems: 'center', position: 'relative', minHeight: '350px' }}>
          
          {/* Orbital Earth Vector */}
          <div style={{
            position: 'absolute',
            left: `${earthLeftPosition}px`, 
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '180px',
            filter: 'drop-shadow(0 0 30px rgba(56, 189, 248, 0.4))', 
            rotate: `${currentScrollProgress * 0.08}deg`, 
            transition: 'left 0.1s ease-out, rotate 0.1s ease-out',
            userSelect: 'none'
          }}>
            🌍
          </div>

          {/* Core Content Readout */}
          <div style={{
            marginLeft: '280px',
            textAlign: 'left',
            maxWidth: '500px',
            opacity: textOpacity,
            transform: `translateY(${(1 - textOpacity) * 15}px)`,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
          }}>
            <h2 style={{ fontSize: '36px', color: '#38bdf8', margin: '0 0 16px 0', fontWeight: '800', textShadow: '0 0 15px rgba(56,189,248,0.2)' }}>
              Our Big, Beautiful Planet
            </h2>
            <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: '1.7', margin: 0 }}>
              Earth is home to over <span style={{ color: '#22c55e', fontWeight: 'bold' }}>8 million</span> species of breathtaking living creatures! 
              From roaring lions in the deep African grasslands to sleeping pandas in high bamboo forests, our interactive games introduce young explorers to wildlife across every continent.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}