import { FC, useEffect, useState } from "react";
import "./Input.scss";

export interface InputProps {
  initialValue?: string;
  placeholder?: string;
  type?: string;
  onChange?(value: string): void;
  name?: string;
  inputId?: string;
  classError?: boolean;
  numberPokemon?: number;
}

export const Input: FC<InputProps> = ({
  initialValue = "",
  type = "text",
  placeholder,
  onChange = () => {},
  name,
  numberPokemon = 0,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleOnChange = (event: any) => {
    const val = event.target.value;
    setValue(val);
    onChange(val);
  };

  return (
    <section className="input--container">
      <h4>total of pokemon: {numberPokemon}</h4>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="input--child"
        onChange={handleOnChange}
        name={name}
      ></input>
    </section>
  );
};
