import React from "react";
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
  if (!isOpen) return null;

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
        <div className="modal-buttons">
          <button onClick={onAddSentence}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddSentenceModal;
