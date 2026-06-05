import React, { useState } from 'react';

export default function Navbar({ setView }) {
  const [hoverHome, setHoverHome] = useState(false);
  const [hoverQuiz, setHoverQuiz] = useState(false);
  const [hoverLogin, setHoverLogin] = useState(false);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
      // 🌟 GLASSMORPHISM: Translucent dark backing
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(12px)',
      borderBottom: '2px solid rgba(56, 189, 248, 0.2)', // Soft cyan glow line
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      boxSizing: 'border-box',
      zIndex: 1000
    }}>
      {/* Glow Logo */}
      <div 
        onClick={() => setView('home')} 
        style={{ 
          fontSize: '24px', 
          fontWeight: '900', 
          color: '#38bdf8', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          textShadow: '0 0 10px rgba(56, 189, 248, 0.6)' // Cyber logo glow
        }}
      >
        <span>AnimaLingo </span>
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <button 
          onClick={() => setView('home')} 
          onMouseEnter={() => setHoverHome(true)}
          onMouseLeave={() => setHoverHome(false)}
          style={{ 
            background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', 
            color: hoverHome ? '#38bdf8' : '#94a3b8', 
            cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          Home
        </button>

        <button 
          onClick={() => setView('quiz')} 
          onMouseEnter={() => setHoverQuiz(true)}
          onMouseLeave={() => setHoverQuiz(false)}
          style={{ 
            background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', 
            color: hoverQuiz ? '#38bdf8' : '#94a3b8', 
            cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          Play Quiz
        </button>

        <button 
          onClick={() => alert('Login system coming soon!')} 
          onMouseEnter={() => setHoverLogin(true)}
          onMouseLeave={() => setHoverLogin(false)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '12px',
            border: '2px solid #38bdf8',
            backgroundColor: hoverLogin ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
            color: '#38bdf8',
            cursor: 'pointer',
            boxShadow: hoverLogin ? '0 0 15px rgba(56, 189, 248, 0.5)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          Log In
        </button>
      </div>
    </nav>
  );
}