import React, { useState } from "react";
import pinyin from "pinyin";
import SpeakerIcon from '@mui/icons-material/VolumeUp';
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
        <div className="modal-header">
          <h2>Add a new sentence</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <label htmlFor="sentence-field" className="sentence-label">Sentence:</label>
        <textarea
          id="sentence-field"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          rows={4}
          cols={50}
          placeholder="Type a Chinese sentence here..."
        />

        {sentence && (
          <div className="pinyin-audio-row">
            <label htmlFor="pinyin-field" className="pinyin-label" title="Pinyin will be auto-generated from the sentence">Pinyin:</label>
            <input
              id="pinyin-field"
              type="text"
              value={sentencePinyin}
              readOnly
              className="pinyin-field"
              title="Pinyin will be auto-generated from the sentence"
            />
            <button
              onClick={() => handlePlay(sentence)}
              disabled={isPlaying}
              className="play-button"
            >
              {isPlaying ? "Playing..." : <SpeakerIcon />}
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
