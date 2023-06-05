import React from "react";
import { Word } from "../layout/Body";
import Skeleton from "@mui/material/Skeleton";

interface ChallengeWords {
  words: Word[];
  status: boolean;
  currentWordIndex: number;
}

const SentenceContainer: React.FC<ChallengeWords> = ({
  words,
  status: isLoading,
  currentWordIndex
}) => {
  return (
    <>
      <div className="bg-sb px-9 py-6 w-full h-[7rem] rounded-md overflow-hidden leading-10">
        {isLoading ? (
          <>
            <Skeleton animation="wave" sx={{ bgcolor: "grey.900" }} />
            <Skeleton animation="wave" sx={{ bgcolor: "grey.900" }} />
          </>
        ) : (
          words.map((word, index) => (
            <span
              key={word.id}
              className={`w-fit text-xl ${
                word.correct == "pending"
                  ? "text-white"
                  : word.correct == "correct"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              <span className={`${index == currentWordIndex && 'bg-gray-700'}`}>{word.word}</span>
              <span> </span>
            </span>
          ))
        )}
      </div>
    </>
  );
};

export default SentenceContainer;
