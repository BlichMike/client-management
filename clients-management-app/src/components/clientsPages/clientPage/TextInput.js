import React from "react";

function TextInput({ inputText, inputPlaceholder, inputValue, onChange }) {
  return (
    <div className="input-group mb-4">
      <div className="input-group-prepend">
        <span className="input-group-text">{inputText}</span>
      </div>
      <input
        type="text"
        className="form-control "
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput;
