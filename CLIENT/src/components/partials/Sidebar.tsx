import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MenuSidebarType } from '../../types/menu-sidebar.type';
import menuSidebar from '../../config/menu-sidebar.config';
import { useState } from 'react';
import { Button, Collapse, Nav } from 'react-bootstrap';

function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const [activePath, setActivePath] = useState<string | null>(null);

  const toggleDropdown = (path: string) => {
    if (openDropdown === path) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(path);
    }
    setActivePath(path);
  };

  const isActive = (path: string) => {
    return activePath === path || location.pathname.includes(path);
  };

  const renderMenuItems = (items: MenuSidebarType[]) => {
    return items.map((item) => {
      const isCurrentActive = isActive(item.path);

      if (item.children && item.children.length > 0) {
        return (
          <div key={item.path}>
            <Button
              className={`nav-link ${
                isCurrentActive ? 'active' : ''
              } text-start text-dark w-100 d-flex align-items-center justify-content-between`}
              onClick={() => toggleDropdown(item.path)}
              aria-controls={`collapse-${item.path}`}
              aria-expanded={openDropdown === item.path}
            >
              <div>
                <i className={`${item.icon} me-2`}></i>
                {item.name}
              </div>

              <i className={`bi ${openDropdown === item.path ? 'bi-chevron-down' : 'bi-chevron-right'}`} />
            </Button>
            <Collapse in={openDropdown === item.path}>
              <div id={`collapse-${item.path}`} className="submenu p-2 bg-light-subtle">
                {renderMenuItems(item.children)}
              </div>
            </Collapse>
          </div>
        );
      } else {
        return (
          <Link to={item.path} key={item.path} className={`nav-link text-dark ${isCurrentActive ? 'active' : ''}`}>
            <i className={`${item.icon} me-2`}></i>
            {item.name}
          </Link>
        );
      }
    });
  };

  return (
    <div className="col-2 p-3 bg-dark-subtle sidebar">
      <Nav className="flex-column">{renderMenuItems(menuSidebar)}</Nav>
    </div>
  );
}

export default Sidebar;
