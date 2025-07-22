import { CheckCircle, XCircle, Menu } from "lucide-react";
import { useState } from "react";

const Navigation = ({ apiStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 mb-12 rounded-t-3xl shadow-sm flex items-center justify-between px-2">
      <div className="max-w-7xl mx-auto md:px-4 flex items-center justify-between w-full p-1 md:h-16 h-12">
        {/* logo */}
        <div className="flex items-center">
          <img src="/icon.png" alt="Orthoplay Logo" className="w-8 h-8 mr-3" />
          <span className="text-xl font-bold text-gray-900">Orthoplay</span>
        </div>

        {/* Desktop Navigation */}
        <div className="items-center space-x-6 hidden md:flex">
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            How to Play
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            About
          </button>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 mr-2">API:</span>
            <span
              className={`flex items-center font-medium ${
                apiStatus === "connected" ? "text-green-600" : "text-red-600"
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
          <button>
            <Menu />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white p-4 flex flex-col gap-2 rounded-b-md shadow-lg z-50 text-sm items-center">
            <div>How to Play</div>
            <hr className="w-full border-gray-300" />
            <div>About</div>
            <hr className="w-full border-gray-300" />
            <div className="flex items-center gap-2">
              <span>API:</span>
              <span
                className={`flex items-center font-medium ${
                  apiStatus === "connected" ? "text-green-600" : "text-red-600"
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
