import { CheckCircle, XCircle, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = ({ apiStatus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      text: "How to Play",
      redirectTo: "/how-to-play"
    },
    {
      text: "About",
      redirectTo: "/about"
    },
    {
      text: "Our Contributors",
      redirectTo: "/our-contributors"
    }
  ]



  return (
    <nav className="sticky top-0 bg-white/50 z-10 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-2">
      <div className="mx-auto md:px-4 flex items-center justify-between w-full p-1 md:h-16 h-12">
        {/* logo */}
        <Link to={"/"} className="flex items-center">
          <img src="/icon.png" alt="Orthoplay Logo" className="w-8 h-8 mr-3" />
          <span className="text-xl font-bold text-gray-900">Orthoplay</span>
        </Link>
        {/* Desktop Navigation */}
        <div className="items-center space-x-6 hidden md:flex">
          {navLinks.map((navLink) => (
            <Link
              key={navLink.text}
              to={navLink.redirectTo}
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              {navLink.text}
            </Link>
          ))}


          <div className="flex items-center text-sm">
            <span className="text-gray-500 mr-2">API Status:</span>
            <span
              className={`flex items-center font-medium ${apiStatus === "connected" ? "text-green-600" : "text-red-600"
                }`}
            >
              {apiStatus === "connected" ? (
                <CheckCircle className="h-4 w-4 mr-1" />
              ) : (
                <XCircle className="h-4 w-4 mr-1" />
              )}
              {apiStatus === "connected" ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        {/* mobile navbar hamburger */}
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <button className="cursor-pointer">
            <Menu />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white p-4 flex flex-col gap-y-4 rounded-b-md shadow-lg z-50 text-sm items-center">
            {navLinks.map((navLink) => (
              <Link
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
                key={navLink.text}
                to={navLink.redirectTo}>
                {navLink.text}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <span>API Status:</span>
              <span
                className={`flex items-center font-medium ${apiStatus === "connected" ? "text-green-600" : "text-red-600"
                  }`}
              >
                {apiStatus === "connected" ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : (
                  <XCircle className="h-4 w-4 mr-1" />
                )}
                {apiStatus === "connected" ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
