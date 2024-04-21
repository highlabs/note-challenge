import {
  ChangeEvent,
  ForwardRefRenderFunction,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
} from "react";

interface InputProps {
  placeholder?: string;
  value?: string;
  label: string;
  id: string;
  onChange: (value: string) => void;
  hideLabel?: boolean;
  noBorder?: boolean;
  onKeyUp?: (event: KeyboardEvent) => void;
  className?: string;
  onClick?: (event: MouseEvent) => void;
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
    className,
    ...rest
  },
  ref
) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e?.target?.value);
  };

  return (
    <div className="mb-4 flex flex-col flex-grow">
      <label htmlFor={id} className={`pb-2 block ${hideLabel && "sr-only"}`}>
        {label}
      </label>
      <textarea
        className={`w-full p-2 rounded border border-slate-300 focus:outline-none focus:border-blue-500 flex-grow ${
          noBorder && "border-0 resize-none"
        } ${className}`}
        placeholder={placeholder}
        value={value}
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
