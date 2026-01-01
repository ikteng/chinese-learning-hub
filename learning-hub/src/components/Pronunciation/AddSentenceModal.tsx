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
  const isChinese = (text: string) => /[\u4E00-\u9FFF]/.test(text);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  // Convert sentence to pinyin
  const sentencePinyin = isChinese(sentence)
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

  const handleClose = () => {
    setSentence(""); // Clear the sentence
    onClose();       // Close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add a new sentence</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>

        <label htmlFor="sentence-field" className="sentence-label">Sentence:</label>
        <textarea
          id="sentence-field"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          rows={4}
          cols={50}
          placeholder="Type a Chinese sentence here..."
          className={!isChinese(sentence) && sentence ? "textarea-error" : ""}
        />

        {sentence && !isChinese(sentence) && (
          <p style={{ color: 'red', marginTop: '5px' }}>
            Please enter a Chinese sentence.
          </p>
        )}

        {sentence && (
          <div className="pinyin-audio-row">
            <label htmlFor="pinyin-field" className="pinyin-label" title="Pinyin will be auto-generated from the sentence">Pinyin:</label>
            <input
              id="pinyin-field"
              type="text"
              value={sentencePinyin}
              readOnly
              className="pinyin-field"
              title={
                !isChinese(sentence) && sentence
                  ? "Enter a Chinese sentence to generate Pinyin"
                  : "Pinyin will be auto-generated from the sentence"
              }
            />
            
            <button
              onClick={() => handlePlay(sentence)}
              disabled={isPlaying || !isChinese(sentence)}
              className="play-button"
              title={!isChinese(sentence) ? "Please enter a Chinese sentence to play audio" : ""}
            >
              {isPlaying ? "Playing..." : <SpeakerIcon />}
            </button>

          </div>
        )}

        <div className="modal-buttons">
          <button
            onClick={onAddSentence}
            disabled={!isChinese(sentence)}
            title={!isChinese(sentence) ? "Please enter a Chinese sentence to add" : ""}
          >
            Add
          </button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddSentenceModal;
