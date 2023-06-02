import React from "react";

interface Word {
  word: string;
  correct: string;
}
interface ChallengeWords {
  words: Word[];
}

const SentenceContainer: React.FC<ChallengeWords> = ({ words }) => {
  return (
    <>
      <div className="bg-sb px-9 py-6 w-full h-[77px] rounded-md overflow-clip">
        {words.map((word) => (
          <span
            key={word.word}
            className={`${
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
