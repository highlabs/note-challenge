import { Link } from "react-router-dom";

const Header = () => (
  <header className="p-4 border-b mb-6">
    <Link to="/">
      <p className="text-3xl font-bold">Notes</p>
    </Link>
  </header>
);

export default Header;
