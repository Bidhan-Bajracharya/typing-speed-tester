import React from "react";

interface Results {
  rawWPM: number;
  accuracy: number;
  correctCharacters: number;
  incorrectCharacters: number;
}

const ResultContainer: React.FC<Results> = ({
  rawWPM,
  accuracy,
  correctCharacters,
  incorrectCharacters,
}) => {
  return (
    <>
      <div>
        <ul className="list-none">
          <li className="flex justify-between px-5 py-2 my-2 rounded-sm bg-sb">
            <span>Raw WPM</span>
            <span>{rawWPM}</span>
          </li>
          <li className="flex justify-between px-5 py-2 my-2 rounded-sm">
            <span>Accuracy</span>
            <span>{accuracy}%</span>
          </li>
          <li className="flex justify-between px-5 py-2 my-2 rounded-sm bg-sb">
            <span>Correct Characters</span>
            <span>{correctCharacters}</span>
          </li>
          <li className="flex justify-between px-5 py-2 my-2 rounded-sm">
            <span>Incorrect Characters</span>
            <span>{incorrectCharacters}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ResultContainer;
