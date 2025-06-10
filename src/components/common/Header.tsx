import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
/**Header component that renders the the app navigation and logo*/
const Header: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <header className="h-22 p-2 pt-4 pb-4 bg-primary flex justify-between">
      <div className="logo-container h-14 aspect-square">
        <Link to="/" aria-label="EE product listing app">
          <img
            alt="EE assignment logo"
            className="w-full h-auto object-cove cursor-pointer"
            src="https://www.equalexperts.com/wp-content/themes/equalexperts2024/assets/images/ico/Equal-Experts-Apple-Touch-Icon-144.png"
          />
        </Link>
      </div>
      {/**app navigation area*/}
      {children}
    </header>
  );
};

export default Header;
