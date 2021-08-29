import React from "react";

function AddSchedule() {
  function addSchedule() {
    console.log(`Add Schedule Clicked!`);
  }

  return (
    <div>
      <button onClick={() => addSchedule()}>Add Schedule</button>
    </div>
  );
}

export default AddSchedule;
