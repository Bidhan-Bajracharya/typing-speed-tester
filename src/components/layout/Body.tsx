import React, { useState, useEffect, KeyboardEvent, useRef } from "react";
import SentenceContainer from "../UI/SentenceContainer";
import ResultContainer from "../UI/ResultContainer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export interface Word {
  id: number;
  word: string;
  correct: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Body = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [displayWords, setDisplayWords] = useState<Word[]>([]);
  const [seconds, setSeconds] = useState(60);
  const [initialSeconds] = useState(60);
  const [startedTyping, setStartedTyping] = useState(false);
  const [disableInputField, setDisableInputField] = useState(false);
  const [incorrectWordCount, setIncorrectWordCount] = useState(0);
  const [grossWPM, setGrossWPM] = useState(0);
  const [rawWPM, setRawWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [spaceCounter, setSpaceCounter] = useState(0); // number of words typed by user
  const [userWord, setUserWord] = useState(""); // tracking the word typed by the user
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false); // snackbar open/close state
  const inputRef = useRef<HTMLInputElement>(null);

  // focus on input field on page render
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=200&length=5"
      );
      if (!response.ok) {
        throw new Error("Request failed.");
      }
      const responseData = await response.json();

      const wordsLists = responseData.map((word: string, index: number) => {
        return { id: index + 1, word: word, correct: "pending" };
      });

      setWords(wordsLists); // fetched words

      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      setOpen(true); // displaying error message
    }
  };

  useEffect(() => {
    if (displayWords.length == 0) {
      const slicedWords = words.slice(0, 22);
      setDisplayWords(slicedWords); // displaying 22 words initially
    }
  }, [words]);

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
      const grossWPM = currentWordIndex / 5 / 1;
      setGrossWPM(grossWPM);

      // raw wpm
      const rawWPM = currentWordIndex - incorrectWordCount / 1;
      setRawWPM(rawWPM);

      // accuracy percentage
      const correctWords = currentWordIndex - incorrectWordCount;
      const accuracyPct = (correctWords / currentWordIndex) * 100;
      setAccuracy(accuracyPct);
    }
    return () => clearTimeout(timer);
  }, [startedTyping, seconds]);

  // updating lines when user reaches the last word in the line
  useEffect(() => {
    if (spaceCounter == 22) {
      setDisplayWords(words.slice(currentWordIndex, currentWordIndex + 22));
    }
  }, [spaceCounter]);

  // reset the counter for new lines of words
  useEffect(() => {
    if (spaceCounter == 22) {
      setSpaceCounter(0);
    }
  }, [currentWordIndex]);

  const handleWordSubmit = (word: string) => {
    if (!startedTyping) {
      setStartedTyping(true);
    }

    setUserWord(word);
  };

  // reset the tester
  const resetGame = () => {
    setCurrentWordIndex(0);
    setSpaceCounter(0);
    setAccuracy(0);
    setIncorrectWordCount(0);
    setRawWPM(0);
    setGrossWPM(0);
    setDisableInputField(false);
    setSeconds(initialSeconds);
    setStartedTyping(false);
    setUserWord("");
    setDisplayWords([]);
    setIsLoading(true);
    fetchWords();
    setTimeout(() => setIsLoading(false), 1000);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // checking if user-typed word matched existing word
  const handleWordCheck = (status: string) => {
    setDisplayWords((prevWords) => {
      const updatedWords = prevWords.map((word, index) => {
        // getting the word that the user is currently in
        if (index == spaceCounter) {
          // update status of the word user recently typed
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
      if (userWord === words[currentWordIndex].word) {
        handleWordCheck("correct");
      } else if (userWord !== words[currentWordIndex].word) {
        setIncorrectWordCount((prevState) => prevState + 1);
        handleWordCheck("wrong");
      }

      setCurrentWordIndex((prevState) => prevState + 1);
      setSpaceCounter((prevState) => prevState + 1);
      setUserWord("");
    }
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Something went wrong, try again later
        </Alert>
      </Snackbar>

      <main className="w-full min-h-screen font-poppins flex flex-col items-center bg-tb text-white">
        {/* choices section*/}
        <section className="mt-16">
          <h1 className="text-3xl">Test Your Typing Limit</h1>
        </section>

        {/* typing section */}
        <section className="mt-12 w-[815px] h-[214px]">
          <SentenceContainer
            words={displayWords}
            status={isLoading}
            currentWordIndex={spaceCounter}
          />

          <div className="flex flex-row mt-[10px]">
            <input
              ref={inputRef}
              className="w-[50%] text-white bg-sb m-[0.5rem] rounded-md p-3 outline-none focus:border-blue-400 focus:border-2"
              value={userWord}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleWordSubmit(e.target.value)}
              disabled={disableInputField}
            />

            <div className="bg-sb flex p-5 justify-center items-center grow rounded-md m-[0.5rem]">
              {disableInputField && grossWPM} WPM
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
        {disableInputField && (
          <section className="mt-[48px] w-72 mb-5">
            <ResultContainer
              rawWPM={rawWPM}
              accuracy={accuracy}
              correctCharacters={currentWordIndex - incorrectWordCount}
              incorrectCharacters={incorrectWordCount}
            />
          </section>
        )}
      </main>
    </>
  );
};

export default Body;
