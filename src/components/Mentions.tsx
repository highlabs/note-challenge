import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { User } from "../utils/types";

interface MentionsType {
  position: {
    x: number;
    y: number;
  };
  mention: string;
  persons: User[];
}

const Mentions: FC<MentionsType> = ({ position, persons, mention }) => {
  const [showOnTop, setShowOnTop] = useState<boolean>(false);
  const [showOnRight, setShowOnRight] = useState<boolean>(false);
  const [mentionHandles, setMentionHandles] = useState<User[]>([]);

  useEffect(() => checkIfDropdownFits(), [mentionHandles]);
  useEffect(() => handlePersons(), [mention]);

  const handlePersons = () => {
    const sortedPersons = persons.sort((a, b) => {
      if (a.first_name < b.first_name) {
        return -1;
      }
      if (a.first_name > b.first_name) {
        return 1;
      }
      return 0;
    });

    if (mention.length > 0) {
      const nameWithoutHandle = mention.replace("@", "");

      const nameStartWith = sortedPersons.filter((name) =>
        name.first_name.startsWith(nameWithoutHandle)
      );
      setMentionHandles(nameStartWith.slice(0, 10));
      return;
    }

    setMentionHandles(sortedPersons.slice(0, 10));
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const checkIfDropdownFits = () => {
    if (dropdownRef?.current === null) return;
    const dropdown = dropdownRef.current;
    const x = dropdown.offsetLeft;
    const y = dropdown.offsetTop;
    const elementHeight = dropdown.clientHeight;
    const elementWidht = dropdown.clientWidth;

    const isVisibleOnBottom = window.innerHeight - y - elementHeight;
    if (isVisibleOnBottom <= 0) {
      setShowOnTop(true);
    }

    const isVisibleOnRight = window.innerWidth - x - elementWidht;
    if (isVisibleOnRight <= 0) {
      setShowOnRight(true);
    }
  };

  const addMention = (event: MouseEvent<HTMLElement>, user: User) => {
    event.preventDefault();
    console.log(user);
  };

  return (
    <div
      className="border rounded absolute mt-8 w-52 max-w-full bg-white z-50"
      style={{
        left: position.x,
        top: position.y,
        translate: showOnTop ? `0 calc(-100% + -32px)` : "0 0",

        transform: showOnRight
          ? `translateX(calc(-100% + -32px))`
          : "translateX(0)",
      }}
      ref={dropdownRef}
    >
      <ul>
        {mentionHandles.map((item) => (
          <li key={item.email} className="border-b last:border-0">
            <button
              className="py-1 px-2 cursor-pointer w-full text-left hover:bg-slate-300"
              onClick={(e) => addMention(e, item)}
            >
              {item.first_name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mentions;
