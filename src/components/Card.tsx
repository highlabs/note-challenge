import { FC, ReactNode } from "react";

interface CardType {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardType> = ({ children, className }) => {
  return (
    <div
      className={`bg-white border rounded p-4 max-w-lg mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
