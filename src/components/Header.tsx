import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import Context from "../state";
interface RouteParams {
  [key: string]: string | undefined;
  id: string;
}
const Header = () => {
  const { sessionName } = useContext(Context);
  const { session } = useParams<RouteParams>();

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
