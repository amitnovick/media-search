import React from "react";
import Downshift from "downshift";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

function DropdownSelect({ items, onSelect }) {
  return (
    <Downshift
      onSelect={selection => onSelect(selection)}
      itemToString={item => (item ? item.value : "")}
    >
      {({
        getItemProps,
        getToggleButtonProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
        <div>
          <button className={styles["button"]} {...getToggleButtonProps()}>
            Top
          </button>
          <ol
            className={styles["ol"]}
            {...getMenuProps()}
            data-active={isOpen ? "" : undefined}
          >
            {isOpen &&
              items.map((option, index) => (
                <li
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: "#bde4ff" }
                      : {}
                  }
                  className={styles["li"]}
                  key={`${option}${index}`}
                  {...getItemProps({ item: option, index })}
                >
                  {option}
                </li>
              ))}
          </ol>
          {/* if you Tab from menu, focus goes on button, and it shouldn't. only happens here. */}
          <div tabIndex="0" />
        </div>
      )}
    </Downshift>
  );
}

DropdownSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default DropdownSelect;
