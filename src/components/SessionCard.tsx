import { useState, FormEvent, useContext } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import slugify from "../utils/slugify";
import Card from "./Card";
import Context from "../state";

const SessionCard = () => {
  const [sessionRoute, setSessionRoute] = useState<string>("");
  const navigate = useNavigate();
  const { setSessionName } = useContext(Context);

  const openSession = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const slug = slugify(sessionRoute);
    navigate(`/${slug}`);
    setSessionName(sessionRoute);
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-2">Login to your session</h2>
      <form onSubmit={openSession}>
        <Input
          placeholder="my-notes"
          label="Your session name"
          id="session-id"
          value={sessionRoute}
          onChange={setSessionRoute}
        />
        <button className="bg-white border hover:bg-slate-300 text-black font-semibold py-2 px-4 rounded">
          Enter
        </button>
      </form>
    </Card>
  );
};

export default SessionCard;
