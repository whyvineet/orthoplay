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
    <nav className="sticky top-0 bg-white/50 z-50 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-2 hover:shadow-md transition-shadow duration-300">
      <div className="mx-auto md:px-4 flex items-center justify-between w-full p-1 md:h-16 h-12">
        {/* logo */}
        <Link to={"/"} className="flex items-center group">
          <img 
            src="/icon.png" 
            alt="Orthoplay Logo" 
            className="w-8 h-8 mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
          />
          <span className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">Orthoplay</span>
        </Link>
        {/* Desktop Navigation */}
        <div className="items-center space-x-6 hidden md:flex">
          {navLinks.map((navLink) => (
            <Link
              key={navLink.text}
              to={navLink.redirectTo}
              className="text-gray-600 hover:text-blue-600 transition-all duration-300 cursor-pointer relative group"
            >
              {navLink.text}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}


          <div className="flex items-center text-sm">
            <span className="text-gray-500 mr-2">API Status:</span>
            <span
              className={`flex items-center font-medium transition-all duration-300 ${apiStatus === "connected" ? "text-green-600" : "text-red-600"
                }`}
            >
              {apiStatus === "connected" ? (
                <CheckCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
              ) : (
                <XCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
              )}
              {apiStatus === "connected" ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        {/* mobile navbar hamburger */}
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <button className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Menu className="transition-transform duration-300 hover:scale-110" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white p-4 flex flex-col gap-y-4 rounded-b-md shadow-lg z-50 text-sm items-center animate-in slide-in-from-top-2 duration-300">
            {navLinks.map((navLink) => (
              <Link
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 w-full text-center py-2 rounded-lg hover:bg-blue-50"
                key={navLink.text}
                to={navLink.redirectTo}>
                {navLink.text}
              </Link>
            ))}
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <span>API Status:</span>
              <span
                className={`flex items-center font-medium transition-all duration-300 ${apiStatus === "connected" ? "text-green-600" : "text-red-600"
                  }`}
              >
                {apiStatus === "connected" ? (
                  <CheckCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
                ) : (
                  <XCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
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
