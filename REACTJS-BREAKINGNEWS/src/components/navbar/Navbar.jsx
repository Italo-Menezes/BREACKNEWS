import logo from "../../images/logoBN.png";
import { Button, Nav, Imglogo, InputSpace } from "./Navbarstyled";
/* import "./Navbar.css"; */

export function Navbar() {
  return (
    <>
      <Nav>
        <InputSpace>
          <i class="fi fi-br-search"></i>
          <input type="text" placeholder="Pesquise por um titulo" />
        </InputSpace>

        <Imglogo src={logo} alt="logo" />

        <Button>Entrar</Button>

      </Nav>
    </>
  )
}


