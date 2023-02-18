
import Sidebar from './Sidebar';


function Header() {

  const stylesObj = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "2px 5px"
    },
    Sidebar: {
      padding: "5px"
    },
    h1: {

    }
  }

  return (
    <header style={stylesObj.header}>
      <Sidebar />
      {/* <h1>Travel App</h1> */}
    </header>
  );
}

export default Header;
