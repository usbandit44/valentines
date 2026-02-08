import React, { useState, useEffect } from "react";
import "./Card.css";

interface CardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  flipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  slideOut: boolean;
}

const Card: React.FC<CardProps> = ({
  frontContent,
  backContent,
  flipped,
  setFlipped,
  slideOut,
}) => {
  const [animateIn, setAnimateIn] = useState(false);
  // const [slideOut, setSlideOut] = useState(false)

  useEffect(() => {
    // Trigger slide-in animation on mount
    setAnimateIn(true);
  }, []);

  const handleFlip = () => setFlipped(!flipped);

  const handleSlideOut = () => {
    // setSlideOut(true)
    // Optional: remove the card from DOM after animation
    setTimeout(() => {
      setAnimateIn(false);
      setFlipped(false);
      // setSlideOut(false)
    }, 1000); // match animation duration
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        className={`flip-card ${animateIn ? "slide-in" : ""} ${slideOut ? "slide-out" : ""}`}
        onClick={handleFlip}
      >
        <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
          <div className="flip-card-front">{frontContent}</div>
          <div className="flip-card-back">{backContent}</div>
        </div>
      </div>
      {/* <button
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        onClick={handleSlideOut}
      >
        Slide Out
      </button> */}
    </div>
  );
};

export default Card;
