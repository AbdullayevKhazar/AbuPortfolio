import { useTranslation } from "react-i18next";
import Container from "../components/Container";

const socialLinks = [
  { title: "GitHub", href: "https://github.com/AbdullayevKhazar" },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/x%C9%99z%C9%99rabdullayev/",
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@inlineflexbox",
  },
];

const Footer = () => {
  const { t } = useTranslation();
  const navLinks = [
    { title: t("nav.home"), href: "/" },
    { title: t("nav.about"), href: "/skills" },
    { title: t("nav.projects"), href: "/projects" },
  ];

  return (
    <footer className="min-h-auto relative bg-background py-20 text-foreground">
      <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-20">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="h-full border-l border-border/40" />
        ))}
      </div>

      <Container className="py-10">
        <div className="relative z-10 rounded-2xl border border-border bg-card p-8 shadow-lg shadow-black/8 dark:shadow-black/20 md:p-16">
          <div className="mb-10 flex flex-col items-start justify-between gap-12 md:flex-row">
            <div className="max-w-md">
              <h3 className="mb-3 text-2xl font-bold text-foreground lg:text-3xl">
                Khazar Abdullayev
              </h3>
              <p className="text-muted-foreground">
                {t("footer.description")}
              </p>
            </div>

            <div className="flex gap-10 sm:flex-row sm:gap-20">
              <div>
                <h4 className="mb-4 font-semibold text-foreground">
                  {t("footer.navigate")}
                </h4>
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-foreground">
                  {t("footer.connect")}
                </h4>
                <ul className="space-y-2">
                  {socialLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-border" />

          <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted-foreground md:flex-row">
            <div className="flex items-center gap-2">
              <span>
                {t("footer.licensed", { year: new Date().getFullYear() })}
              </span>
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary/80"
              >
                Creative Commons BY-NC 4.0
              </a>
            </div>

            <p className="text-center text-sm text-muted-foreground md:text-right">
              {t("footer.madeBy")}{" "}
              <span className="text-foreground">Khazar Abdullayev</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
