import React, { useState } from "react";
import { Skeleton } from "@mui/material";
import type { Sentence } from "../../api/SentenceApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./PronunciationSideMenu.css";

interface PronunciationSideMenuProps {
  sentences: Sentence[];
  isLoading: boolean;
  onSelect: (sentence: Sentence) => void;
  onAddSentence: () => void;
}

const PronunciationSideMenu: React.FC<PronunciationSideMenuProps> = ({ sentences, isLoading, onSelect, onAddSentence }) => {
  const [isOpen, setIsOpen] = useState(true);

  const sortSentencesByDate = (data: Sentence[]) => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.updated_at ?? a.created_at ?? "").getTime();
      const dateB = new Date(b.updated_at ?? b.created_at ?? "").getTime();
      return dateB - dateA; // newest → oldest
    });
  };

  const sortedSentences = React.useMemo(
    () => sortSentencesByDate(sentences),
    [sentences]
  );

  return (
    <div className="side-menu-container">
      <div className={`side-menu ${isOpen ? "open" : "collapsed"}`}>
        {isOpen && (
          <>
            <h2>Sentences</h2>
            <div className="sentence-list">
              <ul>
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <li key={index} className="skeleton-item">
                        <Skeleton
                          variant="rectangular"
                          height={25}
                          width="100%"
                          animation="wave"
                          sx={{
                            borderRadius: "20px",
                            backgroundColor: "var(--color-yellow)",
                          }}
                        />
                      </li>
                    ))
                  ) : sortedSentences.length === 0 ? (
                    <li className="no-sentences">No sentences added yet</li>
                  ) : (
                    sortedSentences.map((s) => {
                      const truncatedText =
                        s.text.length > 22 ? s.text.slice(0, 22) + "..." : s.text;

                      return (
                        <li key={s.id} onClick={() => onSelect(s)}>
                          <span className="sentence-text">{truncatedText}</span>
                          {s.updated_at && (
                            <small className="sentence-date">
                              {new Date(s.updated_at).toLocaleDateString()}
                            </small>
                          )}
                        </li>
                      );
                    })
                  )}

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
