import React, { useState, useRef, useEffect } from "react";

import "./styles.css";

/**
 * Dropdown component to select options with single or multiple selection
 *
 * @param {string[]} options - list of options to display in dropdown
 * @param {(selectedOptions: string[]) => void} onSave - callback function to save selected options that
 * takes in a list of selected options as a list of strings
 * @param {boolean} isMultiSelect - whether to allow multiple options to be selected
 * @returns {JSX.Element} - dropdown component
 */
export function Dropdown({
  label,
  options,
  isMultiSelect,
  onSave,
}: {
  label?: string;
  options: string[];
  onSave: (selectedOptions: string[]) => void;
  isMultiSelect?: boolean;
}) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // listener to close dropdown when clicked outside
  useEffect(() => {
    const closeDropdown = (event: any) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        if (isChanged) {
          onSave(selectedOptions);
          setIsChanged(false);
        }
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [isOpen, isChanged, onSave, selectedOptions]);

  // helper functions
  const isSelected = (option: string) => selectedOptions.includes(option);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    if (isChanged) {
      onSave(selectedOptions);
      setIsChanged(false);
    }
  };

  const selectAll = () => {
    setSelectedOptions(options);
    setIsChanged(true);
  };

  const clearAll = () => {
    setSelectedOptions([]);
    setIsChanged(true);
  };

  const handleOptionToggle = (option: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
    setIsChanged(true);
  };

  // class names
  const dropdownItemClass = (option: string) =>
    `dropdown-item ${isSelected(option) ? "active" : ""}`;

  // dropdown menu for multiple selections
  const multiSelectMenu = (
    <>
      <div className="dropdown-menu-header">
        <button className="dropdown-menu-header-button" onClick={selectAll}>
          Select All
        </button>
        <button className="dropdown-menu-header-button" onClick={clearAll}>
          Clear All
        </button>
      </div>
      <div className="dropdown-menu-section">
        {options.map((option) => (
          <label key={option} className={dropdownItemClass(option)}>
            <input
              type="checkbox"
              checked={isSelected(option)}
              onChange={() => handleOptionToggle(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </>
  );

  // dropdown menu for single selection
  const singleSelectMenu = (
    <>
      <div className="dropdown-menu-section">
        <div
          className={`select-none dropdown-item ${
            selectedOptions.length ? "" : "active"
          }`}
          onClick={() => {
            setSelectedOptions([]);
            setIsOpen(false);
            onSave([]);
          }}
        >
          None
        </div>
        {options.map((option) => (
          <div
            className={dropdownItemClass(option)}
            onClick={() => {
              setSelectedOptions([option]);
              setIsOpen(false);
              onSave([option]);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <button className="dropdown" onClick={toggleDropdown}>
        {selectedOptions.length
          ? selectedOptions.join(", ")
          : label || "Select an option"}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {isMultiSelect ? multiSelectMenu : singleSelectMenu}
        </div>
      )}
    </div>
  );
}
