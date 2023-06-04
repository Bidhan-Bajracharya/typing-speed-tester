import React from "react";
import { Word } from "../layout/Body";
import Skeleton from "@mui/material/Skeleton";

interface ChallengeWords {
  words: Word[];
  status: boolean;
}

const SentenceContainer: React.FC<ChallengeWords> = ({
  words,
  status: isLoading,
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
          words.map((word) => (
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
          ))
        )}
      </div>
    </>
  );
};

export default SentenceContainer;
