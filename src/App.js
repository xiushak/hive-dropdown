import { useState } from "react";
import "./App.css";

import { Dropdown } from "./components/dropdown";

// App component to showcase the Dropdown component
function App() {
  const [singleSelectValue, setSingleSelectValue] = useState([]);
  const [multiSelectValue, setMultiSelectValue] = useState([]);

  const options = [
    "option1 that is very very very very very very very very long",
    "option2",
    "option3",
    "option4",
    "option5",
    "option6",
    "option7",
  ];

  const veryLongListOfOptions = Array.from(
    { length: 1000 },
    (_, i) => `option ${i}`
  );

  return (
    <div>
      <div className="app">
        <div className="section">
          <Dropdown
            label="Single select dropdown"
            options={options}
            onSave={setSingleSelectValue}
          />
          <b>selected value in single select: </b>
          {singleSelectValue}
        </div>
        <div className="section">
          <Dropdown
            label="Multi select dropdown"
            isMultiSelect
            options={veryLongListOfOptions}
            onSave={setMultiSelectValue}
          />
          <b>
            Selected values in multi select &#40;{multiSelectValue.length}&#41;:{" "}
          </b>
          {multiSelectValue.join(", ")}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
