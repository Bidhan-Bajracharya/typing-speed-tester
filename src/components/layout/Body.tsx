import { useState, useEffect, KeyboardEvent } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SentenceContainer from "../UI/SentenceContainer";
import ResultContainer from "../UI/ResultContainer";

export interface Word {
  id: number;
  word: string;
  correct: string;
}

const Body = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [seconds, setSeconds] = useState(60);
  const [initialSeconds, setInitialSeconds] = useState(60);
  const [startedTyping, setStartedTyping] = useState(false);
  const [disableInputField, setDisableInputField] = useState(false);
  const [incorrectWordCount, setIncorrectWordCount] = useState(0);
  const [grossWPM, setGrossWPM] = useState(0);
  const [rawWPM, setRawWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [spaceCounter, setSpaceCounter] = useState(0); // number of words typed by user
  const [userWord, setUserWord] = useState(""); // tracking the word typed by the user

  const fetchWords = async () => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=90&length=5"
      );
      if (!response.ok) {
        throw new Error("Request failed.");
      }
      const responseData = await response.json();

      const wordsLists = responseData.map((word: string, index: number) => {
        return { id: index + 1, word: word, correct: "pending" };
      });

      setWords(wordsLists);
    } catch (error) {
      console.log(error);
    }
  };

  // fetching random words
  useEffect(() => {
    fetchWords();
  }, []);

  // counting down the timer
  useEffect(() => {
    let timer: any;
    // check if user started typing and if timer has run out
    if (startedTyping && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((prevSec) => prevSec - 1);
      }, 1000);
      // disable input field when timer runs out
    } else if (seconds === 0) {
      setDisableInputField(true);

      // net/gross wpm
      const grossWPM = spaceCounter / 5 / 1;
      setGrossWPM(grossWPM);

      // raw wpm
      const rawWPM = grossWPM - incorrectWordCount / 1;
      setRawWPM(rawWPM);

      // accuracy percentage
      const accuracyPct = (grossWPM / rawWPM) * 100;
      setAccuracy(accuracyPct);
    }
    return () => clearTimeout(timer);
  }, [startedTyping, seconds]);

  const handleWordSubmit = (word: string) => {
    if (!startedTyping) {
      setStartedTyping(true);
    }

    setUserWord(word);
  };

  // reset the tester
  const resetGame = () => {
    setAccuracy(0);
    setIncorrectWordCount(0);
    setRawWPM(0);
    setGrossWPM(0);
    setDisableInputField(false);
    setSeconds(initialSeconds);
    setStartedTyping(false);
    setUserWord("");
    fetchWords();
  };

  // checking if user-typed word matched existing word
  const handleWordCheck = (status: string) => {
    setWords((prevWords) => {
      const updatedWords = prevWords.map((word, index) => {
        if (index == spaceCounter) {
          // update color of the word user recently typed
          return { ...word, correct: `${status}` };
        }
        return word;
      });

      return updatedWords;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // check for spacebar
    if (event.key === " " || event.key === "Spacebar") {
      const target = event.target as HTMLTextAreaElement;

      event.preventDefault(); // Prevents the space character from being entered in the input field
      setUserWord(target.value.trim());

      // check if the entered word matched the current word
      if (userWord === words[spaceCounter].word) {
        handleWordCheck("correct");
      } else if (userWord !== words[spaceCounter].word) {
        setIncorrectWordCount((prevState) => prevState + 1);
        handleWordCheck("wrong");
      }

      setSpaceCounter((prevState) => prevState + 1);
      setUserWord("");
    }
  };

  return (
    <>
      <main className="w-full h-screen font-poppins flex flex-col items-center bg-tb text-white">
        {/* choices section*/}
        <section className="border-yellow-500 border-2 mt-16">
          <h1 className="text-3xl">Test Your Limit</h1>

          <div className="flex flex-row mt-[20px]">
            {/* <Select className="bg-sb border-red-400" label="Duration">
              <MenuItem value={1}>Ten</MenuItem>
              <MenuItem value={2}>Twenty</MenuItem>
              <MenuItem value={3}>Thirty</MenuItem>
            </Select> */}
          </div>
        </section>

        {/* typing section */}
        <section className="mt-12 w-[815px] h-[214px]">
          <SentenceContainer words={words} />

          <div className="flex flex-row mt-[10px]">
            <input
              className="w-[50%] text-black m-[0.5rem] rounded-sm p-3"
              value={userWord}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleWordSubmit(e.target.value)}
              disabled={disableInputField}
            />

            <div className="bg-sb flex p-5 justify-center items-center grow rounded-md m-[0.5rem]">
              {grossWPM}
              WPM
            </div>

            <div className="bg-sb flex p-5 justify-center items-center grow rounded-md m-[0.5rem]">
              {seconds === 0 ? (
                <span>Time's up!</span>
              ) : (
                <span>{`${Math.floor(seconds / 60)}:${(seconds % 60)
                  .toString()
                  .padStart(2, "0")}`}</span>
              )}
            </div>

            <div
              onClick={resetGame}
              className="bg-sb flex p-5 justify-center items-center grow rounded-md m-[0.5rem] cursor-pointer"
            >
              Reset
            </div>
          </div>
        </section>

        {/* result section */}
        <section className="mt-[48px] w-72">
          <ResultContainer
            rawWPM={rawWPM}
            accuracy={accuracy}
            correctCharacters={spaceCounter - incorrectWordCount}
            incorrectCharacters={incorrectWordCount}
          />
        </section>
      </main>
    </>
  );
};

export default Body;
