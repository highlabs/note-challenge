import { ChangeEvent, useState, FC } from "react";

interface InputProps {
  placeholder?: string;
  value?: string;
  label: string;
  id: string;
  onChange?: (value: string) => void;
}

const Input: FC<InputProps> = ({ placeholder, value, onChange, label, id }) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="pb-2 block">
        {label}
      </label>
      <input
        type="text"
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        name={id}
        id={id}
      />
    </div>
  );
};

export default Input;
