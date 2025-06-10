import React, { ReactNode } from "react";
import Header from "../common/Header";
import HeaderMenu from "../menu/HeaderMenu";
import Footer from "../common/Footer";
import { useLocation } from "react-router-dom";

/** Default layout component that is shared by all the pages */
const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currentRoute = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <HeaderMenu currentRoute={currentRoute.pathname} />
      </Header>
      <main className="flex-grow container mx-auto p-3 md:py-4 lg:py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
