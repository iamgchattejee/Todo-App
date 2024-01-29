import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaBookBookmark } from "react-icons/fa6";
import './navbar.css';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { authAtom } from '../../store/index';
function Appbar() {
  const [auth,setAuthState] = useRecoilState(authAtom);
  const history = useNavigate();
  const handleLogout = () => {
    setAuthState({ user: '', isLoggedIn: false });
    sessionStorage.clear("id");
    history("/");
  };
  const isLoggedIn = auth.isLoggedIn;
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm p-16 mb-2 bg-white rounded">
      <Container>
        <Navbar.Brand href="/"><FaBookBookmark /><b> TODO</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className='user-link'>Home</Nav.Link>
            {!isLoggedIn && 
            <>
              <Nav.Link href="/signup" className='user-link'>Sign Up</Nav.Link>
              <Nav.Link href="/signin" className='user-link'>Sign In</Nav.Link>
              {/* <Nav.Link href="/todo" className='user-link'>Todo</Nav.Link> */}
            </>}
            {isLoggedIn && 
            <>
              <Nav.Link href="/todo" className='user-link'>Todo</Nav.Link>
              <Nav.Link href="/" className='user-link' onClick={handleLogout}>Logout</Nav.Link>
              <img className="img-fluid user-png" src='data:image/png;base64,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'></img>
            </>}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default Appbar;