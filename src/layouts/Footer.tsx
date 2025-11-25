import Container from "../components/Container";

// --- Links for Navigation and Socials ---
// You can manage your links here or pass them as props
const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "skills" },
  { title: "Projects", href: "projects" },
];

const socialLinks = [
  { title: "GitHub", href: "https://github.com/AbdullayevKhazar" },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/x%C9%99z%C9%99rabdullayev/",
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/@inlineflexbox",
  },
];
// ----------------------------------------

const Footer = () => {
  return (
    <footer className="min-h-auto bg-white text-[#1a1a1a] dark:bg-[#0F0E0E]  relative  py-20 dark:text-white">
      <div className="absolute top-0 left-0 w-full h-full z-0 grid grid-cols-20">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="border-l border-black/4 dark:border-gray-50/1 h-full"
          ></div>
        ))}
      </div>
      <Container className="py-10">
        <div className="relative z-10 border bg-white shadow-lg shadow-black/8 dark:border-white/10 dark:bg-[#0F0E0E] dark:shadow-white/2 rounded-2xl p-8 md:p-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-10">
            <div className="max-w-md">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] dark:text-white mb-3">
                Khazar Abdullayev
              </h3>
              <p className="text-gray-400">
                Passionate developer creating modern and responsive web
                applications.
              </p>
            </div>
            <div className="flex sm:flex-row gap-10 sm:gap-20">
              <div>
                <h4 className="font-semibold dark:text-white mb-4">Navigate</h4>
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-[#1a1a1a] dark:hover:text-white transition-colors"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold  dark:text-white mb-4">Connect</h4>
                <ul className="space-y-2">
                  {socialLinks.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#1a1a1a] dark:hover:text-white transition-colors"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-white/10" />

          <div className="flex flex-col md:flex-row text-xs justify-between items-center pt-8 gap-4 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <span>© 2025 Licensed</span>
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                className="underline text-blue-500 dark:text-blue-400"
              >
                Creative Commons BY-NC 4.0
              </a>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
              Made by <span className="dark:text-white">Khazar</span>{" "}
              <span className="dark:text-white">Abdullayev</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
