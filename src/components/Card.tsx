import { FC, ReactNode } from "react";

interface CardType {
  children: ReactNode;
}

export const Card: FC<CardType> = ({ children }) => {
  return (
    <div className="bg-white border rounded p-4 max-w-lg mx-auto">
      {children}
    </div>
  );
};

export default Card;
