import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./PronunciationSideMenu.css";

interface PronunciationSideMenuProps {
  sentences: string[];
  onSelect: (sentence: string) => void;
  onAddSentence: () => void;
}

const PronunciationSideMenu: React.FC<PronunciationSideMenuProps> = ({ sentences, onSelect, onAddSentence }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="side-menu-container">
      <div className={`side-menu ${isOpen ? "open" : "collapsed"}`}>
        {isOpen && (
          <>
            <h2>Sentences</h2>
            <div className="sentence-list">
              <ul>
                {sentences.length === 0 && <li>No sentences added yet</li>}

                {sentences.map((s, index) => (
                  <li key={index} onClick={() => onSelect(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add Sentence Button */}
            <button className="add-sentence-btn" onClick={onAddSentence}>
              Add Sentence
            </button>
          </>
        )}
      </div>

      {/* Collapse Button */}
      <button
        className="toggle-btn-outside"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
    </div>
  );
};

export default PronunciationSideMenu;
