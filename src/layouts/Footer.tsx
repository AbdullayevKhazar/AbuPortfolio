import Container from "../components/Container";

// --- Links for Navigation and Socials ---
// You can manage your links here or pass them as props
const navLinks = [
  { title: "Home", href: "" },
  { title: "About", href: "about" },
  { title: "Projects", href: "projects" },
  { title: "Contact", href: "contact" },
];

const socialLinks = [
  { title: "GitHub", href: "https://github.com/your-username" },
  { title: "LinkedIn", href: "https://linkedin.com/in/your-username" },
  { title: "Twitter", href: "https://twitter.com/your-username" },
];
// ----------------------------------------

const Footer = () => {
  return (
    <footer className="min-h-auto bg-[#0F0E0E]  relative text-white pt-20">
      <div className="absolute top-0 left-0 w-full h-full z-0 grid grid-cols-20">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="border-l border-gray-50/1 h-full"></div>
        ))}
      </div>
      <Container>
        <div className="relative z-10 border border-white/10 bg-[#0F0E0E] rounded-2xl p-8 md:p-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-10">
            <div className="max-w-md">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                Khazar Abdullayev
              </h3>
              <p className="text-gray-400">
                Passionate developer creating modern and responsive web
                applications.
              </p>
            </div>
            <div className="flex sm:flex-row gap-10 sm:gap-20">
              <div>
                <h4 className="font-semibold text-white mb-4">Navigate</h4>
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Connect</h4>
                <ul className="space-y-2">
                  {socialLinks.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
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

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} Khazar Abullayev. All rights
              reserved.
            </p>
            <p className="text-sm text-gray-500 text-center md:text-right">
              Made by <span className="text-white">Khazar</span>{" "}
              <span className="text-white">Abdullayev</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
