import { FC } from "react";
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
      return nameStartWith.slice(0, 10);
    }

    return sortedPersons.slice(0, 10);
  };
  return (
    <div
      className="border border-red-700 absolute mt-8 w-52 max-w-full"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <ul>
        {handlePersons()?.map((item) => (
          <li key={item.email}>{item.first_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Mentions;
