import { useParams } from "react-router";

interface RouteParams {
  [key: string]: string | undefined;
  id: string;
}

const Note = () => {
  const { id } = useParams<RouteParams>();
  return (
    <div>
      <p>Route id: {id}</p>
    </div>
  );
};

export default Note;
