import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [options, setOptions] = useState([
    { id: 1, label: "car", selected: false },
    { id: 2, label: "train", selected: false },
    { id: 3, label: "bus", selected: false },
  ]);
  const [selectedId, setSelectedId] = useState([]);

  const toggleSelectAll = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll); // Using functional form of setSelectAll
    if (!selectAll) {
      let op = options.map((op) => ({ ...op, selected: true }));
      setOptions(op); // Assuming you meant to update options here, not selectAll
      setSelectedId(op);
    } else {
      let op = options.map((op) => ({ ...op, selected: false }));
      setOptions(op);
      setSelectedId([]);
    }
  };

  const toggleOption = (option) => {
    const updatedOptions = options.map((op) => {
      if (op.id === option.id) {
        return { ...op, selected: !op.selected }; // Toggle the selected state of the clicked option
      }
      return op;
    });

    setOptions(updatedOptions); // Update the options state with the modified array

    const selectedOptions = updatedOptions.filter((op) => op.selected);
    setSelectedId(selectedOptions);
    if (selectedOptions.length === 3) {
      setSelectAll(true);
    } else if (selectedOptions.length < 3) {
      setSelectAll(false);
    }
    // Update the selectedId state with the selected options
  };

  const showOptions = () => {
    setIsOpen(!isOpen);
  };

  const getCheckStatus = (option) => {
    return selectedId.some((op) => op.id === option.id);
  };

  return (
    <div>
      {!selectedId.length > 0 ? (
        <div className="select-box" onClick={() => showOptions()}>
          Select Options {!isOpen ? "↓" : "↑"}
        </div>
      ) : (
        <div className="show-selected">
          <div className="container">
            {selectedId.map((option) => {
              return (
                <div className="each-item">
                  {option.label}
                  <span className="cross" onClick={() => toggleOption(option)}>
                    x
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isOpen && (
        <>
          <div>
            <label>
              <input
                type="checkbox"
                onClick={() => toggleSelectAll()}
                checked={selectAll}
              />
              Select All
            </label>
          </div>

          <div className="select-options">
            {options.map((option) => {
              return (
                <label>
                  <input
                    type="checkbox"
                    onClick={() => toggleOption(option)}
                    checked={getCheckStatus(option)}
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
