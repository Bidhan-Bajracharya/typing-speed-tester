import React from "react";

const ResultContainer = () => {
  return (
    <>
      <table className="table-auto border-separate border-spacing-x-5 border-spacing-y-3">
        <tbody>
          <tr className="bg-sb">
            <td>Raw WPM</td>
            <td>1</td>
          </tr>
          <tr>
            <td className="mr-5">Accuracy</td>
            <td>2</td>
          </tr>
          <tr>
            <td className="mr-5">Correct Characters</td>
            <td>3</td>
          </tr>
          <tr>
            <td className="mr-5">Incorrect Characters</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ResultContainer;
