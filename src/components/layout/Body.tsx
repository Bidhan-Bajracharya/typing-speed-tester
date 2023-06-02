import { useState, KeyboardEvent } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SentenceContainer from "../UI/SentenceContainer";

const Body = () => {
  const [words, setWords] = useState([
    { word: "apple", correct: "pending" },
    { word: "banana", correct: "pending" },
    { word: "orange", correct: "pending" },
  ]);

  // number of words typed by user
  const [spaceCounter, setSpaceCounter] = useState(0);

  // tracking the word typed by the user
  const [userWord, setUserWord] = useState("");

  const handleWordSubmit = (word: string) => {
    setUserWord(word);
  };

  // checking if user-typed word matched existing word
  const handleWordCheck = (status: string) => {
    setWords((prevWords) => {
      const updatedWords = prevWords.map((word, index) => {
        if (index == spaceCounter) {
          return { ...word, correct: `${status}` };
        }
        return word;
      });

      return updatedWords;
    });
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // check for spacebar
    if (event.key === " " || event.key === "Spacebar") {
      const target = event.target as HTMLTextAreaElement;
      
      event.preventDefault(); // Prevents the space character from being entered in the input field
      setUserWord(target.value.trim());
      
      // check if the entered word matched the current word
      if (userWord === words[spaceCounter].word) {
        handleWordCheck("correct");
      } else if(userWord !== words[spaceCounter].word){
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
        <section className="border-green-500 border-2 mt-12 w-[815px] h-[214px]">
          <SentenceContainer words={words} />

          <div className="flex flex-row">
            <input
              className="w-[50%] text-black m-[0.5rem] rounded-sm p-3"
              value={userWord}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleWordSubmit(e.target.value)}
            />

            <div className="bg-sb flex p-5 justify-center items-center grow rounded-md m-[0.5rem]">
              WPM
            </div>

            <div className="bg-sb flex p-5 justify-center items-center grow rounded-md m-[0.5rem]">
              Timer
            </div>

            <div className="bg-sb flex p-5 justify-center items-center grow rounded-md m-[0.5rem] cursor-pointer">
              Reset
            </div>
          </div>
        </section>

        {/* result section */}
        <section className="border-purple-500 border-2">Results</section>
      </main>
    </>
  );
};

export default Body;
