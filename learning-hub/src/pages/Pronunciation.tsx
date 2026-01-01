import React, { useEffect, useState } from "react";
import type { Sentence } from "../api/SentenceApi";
import { SentenceApi } from "../api/SentenceApi";
import SideMenu from "../components/Pronunciation/PronunciationSideMenu";
import PracticeArea from "../components/Pronunciation/PronunciationPracticeArea";
import AddSentenceModal from "../components/Pronunciation/AddSentenceModal";
import "./Pronunciation.css";

const Pronunciation: React.FC = () => {
  const [sentence, setSentence] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [isLoadingSentences, setIsLoadingSentences] = useState(true);

  useEffect(() => {
    const fetchSentences = async () => {
      try {
        const data = await SentenceApi.getAll();
        setSentences(data);
      } catch (err) {
        console.error("Failed to fetch sentences", err);
      } finally {
        setIsLoadingSentences(false);
      }
    };
    fetchSentences();
  }, []);

 const [selectedSentence, setSelectedSentence] = useState<Sentence | null>(null);

  const handleSelectSentence = (sentence: Sentence) => {
    setSelectedSentence(sentence);
  };

  const handleAddSentence = async () => {
    if (!sentence.trim()) return;
    try {
      const added = await SentenceApi.add(sentence);
      setSentences([added, ...sentences]); // update list in parent
      setSentence(""); // clear modal input
      setIsModalOpen(false); // close modal
    } catch (err) {
      console.error("Failed to add sentence", err);
    }
  };

  return (
    <div className="pronunciation-page">
      <SideMenu
        sentences={sentences}
        isLoading={isLoadingSentences}
        onSelect={(sentence: Sentence) => handleSelectSentence(sentence)}
        onAddSentence={() => setIsModalOpen(true)}
      />

      {selectedSentence && (
        <PracticeArea
          sentence={sentence || selectedSentence?.text || ""}
          setSentence={setSentence}
          handleAddSentence={handleAddSentence}
        />
      )}

      <AddSentenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sentence={sentence}
        setSentence={setSentence}
        onAddSentence={handleAddSentence}
      />

    </div>
  );
};

export default Pronunciation;
