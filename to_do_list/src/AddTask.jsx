import { useState } from "react";

const ToDoForm = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-form">
      <input
        value={inputValue}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Новая миссия..."
        className="space-input"
      />
      <button className="space-button">Запуск</button>
    </form>
  );
};

export default ToDoForm;
