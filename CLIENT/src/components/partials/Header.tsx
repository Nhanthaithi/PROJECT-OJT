import { Nav } from 'react-bootstrap';

function Header() {
  return (
    <div className="header p-3 mb-1 bg-dark-subtle">
      <Nav variant="pills" defaultActiveKey="/">
        <Nav.Item className="text-danger fs-5 fw-bold">Admin Page</Nav.Item>
      </Nav>
    </div>
  );
}

export default Header;
