import {
  ChangeEvent,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  KeyboardEvent,
} from "react";

interface InputProps {
  placeholder?: string;
  value?: string;
  label: string;
  id: string;
  onChange?: (value: string) => void;
  hideLabel?: boolean;
  noBorder?: boolean;
  onKeyUp?: (event: KeyboardEvent) => void;
}

const Input: ForwardRefRenderFunction<HTMLTextAreaElement, InputProps> = (
  {
    placeholder,
    value,
    onChange,
    label,
    id,
    hideLabel,
    noBorder,
    onKeyUp,
    ...rest
  },
  ref
) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="mb-4 flex flex-col flex-grow">
      <label htmlFor={id} className={`pb-2 block ${hideLabel && "sr-only"}`}>
        {label}
      </label>
      <textarea
        className={`w-full p-2 rounded border border-slate-300 focus:outline-none focus:border-blue-500 flex-grow ${
          noBorder && "border-0 resize-none"
        }`}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        name={id}
        id={id}
        ref={ref}
        onKeyUp={onKeyUp}
        {...rest}
      />
    </div>
  );
};

export default forwardRef(Input);
