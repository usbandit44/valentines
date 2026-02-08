import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Fireworks from "./components/Firework/Fireworks";
import Card from "./components/Card/Card";

function App() {
  const quotesArray = [
    "Will you be my Valentines?",
    "Wrong Button",
    "Accidents Happen",
    "This is not funny",
    "Yo lock in",
    "I am going to ask again",
  ];
  const [flipCard, setFlipCard] = useState(false);
  const [quote, setQuote] = useState(0);
  const [slideOut, setSlideOut] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const frontCard = () => {
    return (
      <div className="w-full h-full justify-center items-center flex flex-col gap-4">
        <img
          className="w-full h-[65%] object-contain"
          src="./public/Remove Background Image.png"
        ></img>
        <h4 className="decoration-black">Click Me!</h4>
      </div>
    );
  };
  const backCard = () => {
    return (
      <div className="w-full h-full justify-center items-center flex flex-col gap-4">
        <img
          className="w-[15%] object-contain absolute top-5 right-5"
          src="./public/Cartoon Heart Drawing copy.png"
        ></img>
        <img
          className="w-[15%] object-contain absolute top-5 left-5"
          src="./public/Cartoon Heart Drawing.png"
        ></img>
        <h4>{quotesArray[quote]}</h4>
      </div>
    );
  };
  return (
    <div className="flex h-screen w-screen justify-center items-center flex-col">
      <Card
        frontContent={frontCard()}
        backContent={backCard()}
        flipped={flipCard}
        setFlipped={setFlipCard}
        slideOut={slideOut}
      ></Card>
      {flipCard ? (
        <div>
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setQuote((prevQuote) => {
                const nextIndex = prevQuote + 1;
                return nextIndex >= quotesArray.length ? 0 : nextIndex;
              });
            }}
          >
            <h4>No</h4>
          </button>
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setFlipCard(!flipCard);
              setSlideOut(true);
              setShowEnding(true);
            }}
          >
            <h4>Yes</h4>
          </button>
        </div>
      ) : null}
      {showEnding ? (
        <>
          <div className="fixed inset-0 flex justify-center items-center">
            <img
              src="./public/Heart Drawing.png"
              alt="Pulsing"
              className="w-32 h-32 animate-pulse-custom"
            />
          </div>
          <Fireworks></Fireworks>
        </>
      ) : null}
    </div>
  );
}

export default App;
