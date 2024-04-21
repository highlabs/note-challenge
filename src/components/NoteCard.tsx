import { FC } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

interface NoteCardType {
  body: string;
  link: string;
}

const NoteCard: FC<NoteCardType> = ({ body, link }) => {
  return (
    <Link to={`${link}`} relative="path">
      <Card className="w-full min-h-48 whitespace-pre-line">
        <div className="line-clamp-6 overflow-hidden">{body}</div>
      </Card>
    </Link>
  );
};

export default NoteCard;
