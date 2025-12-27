import React, { useState } from "react";
import { FaPlay, FaMicrophone } from "react-icons/fa";
import PronunciationSideMenu from "../components/PronunciationSideMenu";
import "./Pronunciation.css";

const Pronunciation: React.FC = () => {
  const [sentence, setSentence] = useState("");
  // const [sentences, setSentences] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (text: string) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleAddSentence = () => {
    if (sentence.trim() && !sentences.includes(sentence)) {
      setSentences([sentence, ...sentences]);
      setSentence("");
    }
  };

  const sentences = [
    "你好，世界",
    "今天天气很好",
    "我喜欢学习中文",
    "请慢慢说",
    "谢谢你的帮助",
    "我想练习发音",
    "今天学习很开心",
    "明天见",
    "我会说一点中文",
    "这个句子很有意思"
  ];

  return (
    <div className="pronunciation-page">
      <PronunciationSideMenu sentences={sentences} onSelect={handlePlay} />

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
    </div>
  );
};

export default Pronunciation;
