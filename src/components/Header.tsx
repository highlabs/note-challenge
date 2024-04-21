import { Link, useParams } from "react-router-dom";
import type { Params } from "react-router-dom";
import { useContext } from "react";
import Context from "../state";

const Header = () => {
  const { sessionName } = useContext(Context);
  const { session } = useParams<Params>();

  return (
    <header className="p-4 border-b mb-6">
      <nav className="flex justify-between items-center">
        <Link to="/">
          <p className="text-3xl font-bold">Notes</p>
        </Link>
        {session && (
          <Link to={`/${session}`}>
            <p>
              Session:{" "}
              <strong className="text-1xl font-bold">
                {sessionName || session}
              </strong>
            </p>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
