import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const Navbar = ({ openDrawer }: { openDrawer: () => void }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/skills" },
    { name: t("nav.projects"), path: "/projects" },
    { name: t("nav.contact"), path: null },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const handleLinkClick = () => setIsOpen(false);
  const currentLanguage = i18n.resolvedLanguage || i18n.language;

  const handleLanguageChange = (language: "az" | "en") => {
    void i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const languageSwitcher = (
    <div className="flex items-center rounded-md border border-border p-0.5">
      {(["az", "en"] as const).map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => handleLanguageChange(language)}
          className={`rounded px-2 py-1 text-xs uppercase transition-colors ${
            currentLanguage === language
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {language}
        </button>
      ))}
    </div>
  );

  const mobileMenuClasses = `
      fixed top-0 right-0 w-3/4 max-w-sm h-screen bg-card text-card-foreground
      z-40 shadow-2xl
      flex flex-col items-center justify-center 
      transform transition-transform duration-300 ease-in-out
    `;

  return (
    <header className="relative">
      {/* DESKTOP */}
      <div className="hidden md:block max-w-full px-5 py-2 absolute top-10 left-1/2 -translate-x-1/2 z-50 text-sm bg-card text-card-foreground border border-border rounded-md shadow-sm">
        <nav className="flex justify-between gap-10 items-center">
          {navLinks.map((link) =>
            link.path ? (
              <Link
                key={link.name}
                to={link.path}
                className="text-black/70 dark:text-soft/70 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ) : (
              <button
                key={link.name}
                onClick={openDrawer}
                className="text-black/70 dark:text-soft/70 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ),
          )}

          {languageSwitcher}

          <button
            type="button"
            aria-label={t("nav.toggleTheme")}
            onClick={() => setIsDark((prev) => !prev)}
            className="relative hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300 rounded-lg p-2 cursor-pointer"
          >
            {isDark ? (
              <span className="text-yellow-300">
                <BsSun />
              </span>
            ) : (
              <span className="text-primary">
                <BsMoon />
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* MOBILE */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center px-5 py-4 bg-card border-b border-border">
          <Link to="/" className="font-bold text-lg text-ink dark:text-white">
            XAB
          </Link>

          <button
            type="button"
            aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setIsOpen(!isOpen)}
            className="text-ink dark:text-white text-2xl z-50"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30"
            onClick={handleLinkClick}
          />
        )}

        <div
          className={`${mobileMenuClasses} ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) =>
              link.path ? (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-3xl text-ink dark:text-soft transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => {
                    handleLinkClick();
                    openDrawer();
                  }}
                  className="text-3xl text-ink dark:text-soft/80 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </button>
              ),
            )}

            {languageSwitcher}

            <button
              type="button"
              aria-label={t("nav.toggleTheme")}
              onClick={() => setIsDark((prev) => !prev)}
              className="relative"
            >
              {isDark ? (
                <span className="text-yellow-300">
                  <BsSun />
                </span>
              ) : (
                <span className="text-primary">
                  <BsMoon />
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
