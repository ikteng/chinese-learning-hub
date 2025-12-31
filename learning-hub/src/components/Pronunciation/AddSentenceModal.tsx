import React, { useState } from "react";
import pinyin from "pinyin";
import "./AddSentenceModal.css";

interface AddSentenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  sentence: string;
  setSentence: (value: string) => void;
  onAddSentence: () => void;
}

const AddSentenceModal: React.FC<AddSentenceModalProps> = ({
  isOpen,
  onClose,
  sentence,
  setSentence,
  onAddSentence,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  // Convert sentence to pinyin
  const sentencePinyin = sentence
    ? pinyin(sentence, { style: pinyin.STYLE_TONE2 }).flat().join(" ")
    : "";

  const handlePlay = (text: string) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a new sentence</h2>

        <textarea
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          rows={4}
          cols={50}
          placeholder="Type a Chinese sentence here..."
        />

        {sentence && (
          <div className="pinyin-audio-row">
            <input
              type="text"
              value={sentencePinyin}
              readOnly
              className="pinyin-field"
            />
            <button
              onClick={() => handlePlay(sentence)}
              disabled={isPlaying}
              className="play-button"
            >
              {isPlaying ? "Playing..." : "🔊"}
            </button>
          </div>
        )}

        <div className="modal-buttons">
          <button onClick={onAddSentence}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddSentenceModal;
