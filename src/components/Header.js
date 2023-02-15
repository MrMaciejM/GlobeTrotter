import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Header</h1>
      <nav>
        <NavLink to='/'>Landing</NavLink>
        <NavLink to='/translate'>Translate</NavLink>
        <NavLink to='/currency'>Currency</NavLink>
        <NavLink to='/landmarks'>Landmarks</NavLink>
      </nav>
    </header>
  );
}

export default Header;
