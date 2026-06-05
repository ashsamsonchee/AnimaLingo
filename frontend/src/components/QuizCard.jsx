import React, { useState, useEffect } from 'react';
import animalData from '../mockAnimals.json';

// 🔐 SECURE KEY LINK: Pulls the key directly from your hidden local .env file!
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function QuizCard({ setView }) {
  // --- STATE VARIABLES ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false); 
  const [isCorrect, setIsCorrect] = useState(false);        
  const [quizFinished, setQuizFinished] = useState(false); 
  const [shuffledChoices, setShuffledChoices] = useState([]); 

  const [hoveredChoiceIndex, setHoveredChoiceIndex] = useState(null); 
  const [hoveredBannerBtn, setHoveredBannerBtn] = useState(false);     
  const [pressedBannerBtn, setPressedBannerBtn] = useState(false);     

  const currentAnimal = animalData[currentIndex];

  // Fisher-Yates Shuffling Function
  const shuffleArray = (array) => {
    let shuffled = [...array]; 
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
    }
    return shuffled;
  };

  // Shuffle options whenever the question changes
  useEffect(() => {
    if (currentAnimal) {
      setShuffledChoices(shuffleArray(currentAnimal.choices));
      
      // 💡 FUTURE UPGRADE EXAMPLE: 
      // You can use ACCESS_KEY here to fetch live data from Unsplash, like:
      // fetch(`https://api.unsplash.com/photos/random?query=${currentAnimal.correctAnswer}&client_id=${ACCESS_KEY}`)
    }
  }, [currentIndex]); 

  // --- GAME FUNCTION: RUNS WHEN AN ANIMAL BUTTON IS CLICKED ---
  const handleAnswerClick = (chosenOption) => {
    if (chosenOption === currentAnimal.correctAnswer) {
      const successAudio = new Audio('/correct.wav');
      successAudio.volume = 0.3;
      successAudio.play();

      setIsCorrect(true);
      setShowFeedback(true);
      setScore(score + 10); 
    } else {
      const failureAudio = new Audio('/wrong.wav');
      failureAudio.volume = 0.3;
      failureAudio.play();

      setIsCorrect(false);
      setShowFeedback(true);
    }
  };

  // --- NAVIGATION FUNCTION: RUNS WHEN THE BANNER BUTTON IS CLICKED ---
  const handleNextClick = () => {
    setShowFeedback(false); 
    setHoveredBannerBtn(false);
    setPressedBannerBtn(false);

    if (currentIndex < animalData.length - 1) {
      setCurrentIndex(currentIndex + 1); 
    } else {
      setQuizFinished(true); 
    }
  };

  // --- RESTART & GO HOME FUNCTION ---
  const handleGoHome = () => {
    setCurrentIndex(0);
    setScore(0);
    setQuizFinished(false);
    setView('home'); 
  };

  // --- SCREEN 1: THE CUSTOM END-OF-QUIZ RESULTS SCREEN ---
  if (quizFinished) {
    return (
      <div style={{
        border: '4px solid #eab308', 
        borderRadius: '24px', 
        padding: '40px 24px', 
        maxWidth: '400px', 
        textAlign: 'center',
        background: 'white',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
      }}>
        <span style={{ fontSize: '72px' }}>🏆</span>
        <h1 style={{ color: '#1e293b', margin: '16px 0 8px 0' }}>Quiz Complete!</h1>
        <p style={{ fontSize: '18px', color: '#64748b', margin: '0 0 24px 0' }}>
          Amazing job! You practiced your animal vocabulary skills.
        </p>

        <div style={{
          backgroundColor: '#fef08a',
          padding: '16px 32px',
          borderRadius: '16px',
          display: 'inline-block',
          marginBottom: '32px'
        }}>
          <h2 style={{ color: '#854d0e', margin: 0, fontSize: '28px' }}>✨ {score} Total XP</h2>
        </div>

        <button
          onClick={handleGoHome}
          style={{
            display: 'block',
            width: '100%',
            padding: '16px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            color: '#ffffff',
            backgroundColor: '#4a6dde',
            boxShadow: '0 4px 0 #2b4cb0',
          }}
        >
          Back to Home 🏠
        </button>
      </div>
    );
  }

  // --- SCREEN 2: THE ACTIVE QUIZ LAYOUT SCREEN ---
  return (
    <div style={{
      border: '4px solid #4a6dde', 
      borderRadius: '24px', 
      padding: '24px', 
      maxWidth: '400px', 
      textAlign: 'center',
      background: 'white',
      boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
    }}>
      {/* Score Tracker */}
      <h3 style={{ color: '#eab308' }}>✨ {score} XP</h3>

      {/* Dynamic Animal Image */}
      <img 
        src={currentAnimal.imageUrl} 
        alt="Guess the animal" 
        style={{ width: '100%', borderRadius: '16px', height: '200px', objectFit: 'cover' }}
      />

      <h2>Which animal is this?</h2>

      {/* Choices Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {shuffledChoices.map((choice, index) => {
          const isButtonHovered = hoveredChoiceIndex === index;
          
          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(choice)}
              disabled={showFeedback} 
              onMouseEnter={() => !showFeedback && setHoveredChoiceIndex(index)}
              onMouseLeave={() => setHoveredChoiceIndex(null)}
              style={{
                padding: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '12px',
                border: '2px solid #cbd5e1',
                cursor: showFeedback ? 'not-allowed' : 'pointer',
                backgroundColor: showFeedback 
                  ? '#e2e8f0' 
                  : (isButtonHovered ? '#e0f2fe' : '#f8fafc'), 
                color: showFeedback 
                  ? '#94a3b8' 
                  : (isButtonHovered ? '#0369a1' : '#000000'),
                borderColor: !showFeedback && isButtonHovered ? '#7dd3fc' : '#cbd5e1',
                transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease'
              }}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {/* Fixed Bottom Notification Banner */}
      {showFeedback && (
        <div style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100%',
          padding: '24px 40px',
          backgroundColor: isCorrect ? '#dcfce7' : '#fee2e2', 
          borderTop: isCorrect ? '4px solid #22c55e' : '4px solid #ef4444', 
          display: 'flex',
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxSizing: 'border-box',
          zIndex: 100
        }}>
          
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ color: isCorrect ? '#15803d' : '#b91c1c', margin: '0 0 4px 0' }}>
              {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
            </h2>
            <p style={{ color: '#334155', margin: 0, fontWeight: '500' }}>
              {isCorrect ? 'Splendid work! Keep it up.' : `Oops! The answer was ${currentAnimal.correctAnswer}.`}
            </p>
          </div>

          <button 
            onClick={handleNextClick}
            onMouseEnter={() => setHoveredBannerBtn(true)}
            onMouseLeave={() => { setHoveredBannerBtn(false); setPressedBannerBtn(false); }}
            onMouseDown={() => setPressedBannerBtn(true)}
            onMouseUp={() => setPressedBannerBtn(false)}
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 'bold',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              backgroundColor: isCorrect 
                ? (hoveredBannerBtn ? '#16a34a' : '#22c55e') 
                : (hoveredBannerBtn ? '#dc2626' : '#ef4444'), 
              transform: pressedBannerBtn ? 'translateY(4px)' : 'translateY(0px)',
              boxShadow: pressedBannerBtn 
                ? '0 0px 0 rgba(0,0,0,0)' 
                : '0 4px 0 ' + (isCorrect ? '#16a34a' : '#dc2626'), 
              transition: 'transform 0.05s, box-shadow 0.05s, background-color 0.15s'
            }}
          >
            {currentIndex === animalData.length - 1 ? 'Finish 🏁' : 'Continue'}
          </button>

        </div>
      )}
    </div>
  );
}