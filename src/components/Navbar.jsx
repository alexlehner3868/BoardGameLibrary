import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Game Library</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/stats">Stats</Link>
      <Link to="/Game Suggestion">Game Suggestion</Link>
    </nav>
  );
};

export default Navbar;
