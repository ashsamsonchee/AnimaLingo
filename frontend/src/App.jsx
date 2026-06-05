import React, { useState } from 'react';
import QuizCard from './components/QuizCard'; 
import Navbar from './components/Navbar';     
import Home from './components/Home';         

function App() {
  const [view, setView] = useState('home');

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #020617 100%)', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      width: '100%', 
      overflowX: 'hidden', 
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* 1. Cyber Navigation Header */}
      <Navbar setView={setView} />
      
      {/* 2. Content Container (Left & Right Spacers Set to 0 to remove white gaps!) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '80px', 
        padding: '24px 0', 
        boxSizing: 'border-box'
      }}>
        {view === 'home' && <Home setView={setView} />}
        {view === 'quiz' && <QuizCard setView={setView} />}
      </div>
    </div>
  );
}

export default App;