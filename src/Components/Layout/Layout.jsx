import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div key={children} className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
};
