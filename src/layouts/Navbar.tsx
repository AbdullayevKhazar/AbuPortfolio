import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // Icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Base classes for the mobile menu panel
  const mobileMenuClasses = `
    fixed top-0 right-0 w-3/4 max-w-sm h-screen 
    bg-[#1A1A1A] z-40 shadow-2xl
    flex flex-col items-center justify-center 
    transform transition-transform duration-300 ease-in-out
  `;

  return (
    <header className="relative">
      <div className="hidden md:block max-w-xl px-5 py-2 absolute top-10 left-1/2 -translate-x-1/2 z-50 text-sm text-[#eeeeee] bg-[#1A1A1A] border border-gray-50/10 rounded-md">
        <nav className="flex justify-between gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-[#eeeeee]/75 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center px-5 py-4 bg-[#1A1A1A] border-b border-gray-50/10">
          <a href="/" className="font-bold text-lg text-white">
            Abufolio
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl z-50"
            aria-label="Toggle menu"
            aria-expanded={isOpen} // Added ARIA attribute
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
        ]
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 transition-opacity duration-300"
            onClick={handleLinkClick} // Allows clicking outside to close
          />
        )}
        <div
          className={`${mobileMenuClasses} ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-3xl text-[#eeeeee]/75 hover:text-white transition-colors duration-300"
                onClick={handleLinkClick}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
