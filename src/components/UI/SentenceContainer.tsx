import React from "react";
import { Word } from "../layout/Body";
interface ChallengeWords {
  words: Word[];
}

const SentenceContainer: React.FC<ChallengeWords> = ({ words }) => {
  return (
    <>
      <div className="bg-sb px-9 py-6 w-full h-[7rem] rounded-md overflow-hidden leading-10">
        {words.map((word) => (
          <span
            key={word.id}
            className={`text-xl ${
              word.correct == "pending"
                ? "text-white"
                : word.correct == "correct"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {word.word + " "}
          </span>
        ))}
      </div>
    </>
  );
};

export default SentenceContainer;
