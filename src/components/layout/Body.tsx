import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SentenceContainer from "../UI/SentenceContainer";
import TextField from "@mui/material/TextField";

const Body = () => {
  return (
    <>
      <main className="w-full h-screen font-poppins flex flex-col items-center bg-tb text-white">
        {/* choices section*/}
        <section className="border-yellow-500 border-2 mt-16">
          <h1 className="text-3xl">Test Your Limit</h1>

          <div className="flex flex-row mt-[20px]">
            <Select className="bg-sb border-red-400" label="Duration">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </section>

        {/* typing section */}
        <section className="border-green-500 border-2 mt-12 w-[815px] h-[214px]">
          <SentenceContainer />

          <div className="flex flex-row">
            <input className="w-[50%]"/>

            <div className="bg-sb flex p-5 justify-center items-center rounded-md m-[0.5rem]">
                WPM
            </div>

            <div className="bg-sb flex p-5 justify-center items-center rounded-md m-[0.5rem]">
                Timer
            </div>

            <div className="bg-sb flex p-5 justify-center items-center rounded-md m-[0.5rem]">
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
