import React, { useState } from "react";
import { FaPlay, FaMicrophone } from "react-icons/fa";
import "./PronunciationPracticeArea.css";

interface PracticeAreaProps {
  sentence: string;
  setSentence: (value: string) => void;
  handleAddSentence: () => void;
}

const PracticeArea: React.FC<PracticeAreaProps> = ({
  sentence,
  setSentence,
  handleAddSentence,
}) => {

  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlay = (text: string) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="practice-container">
      <h1>Chinese Speaking Practice</h1>
      <textarea
        placeholder="Type a Chinese sentence here..."
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        rows={4}
        cols={50}
        className="sentence-input"
      />
      <div className="buttons">
        <button onClick={() => handlePlay(sentence)} className="play-button">
          <FaPlay /> Play
        </button>
        <button onClick={handleAddSentence} className="record-button">
          <FaMicrophone /> Add
        </button>
      </div>
    </div>
  );
};

export default PracticeArea;
