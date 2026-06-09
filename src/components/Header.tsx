import { Earth, MoveRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
      <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-20">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="border-l border-border/40"></div>
        ))}
      </div>

      <div className="flex max-w-3xl flex-col items-center justify-center text-center">
        <p className="z-10 text-sm font-light leading-loose text-ink dark:text-soft/80 sm:text-base">
          {t("header.location")}
        </p>

        <h1 className="z-10 mt-2 text-4xl font-bold leading-tight text-ink dark:text-white sm:text-5xl md:text-6xl">
          {t("header.intro")}
          <span className="block text-brand dark:text-brand-light">
            {t("header.role")}
          </span>
        </h1>

        <p className="z-10 mt-4 max-w-xl text-sm font-light leading-relaxed text-ink/70 dark:text-soft/80 sm:text-base">
          {t("header.description")}
        </p>
      </div>

      <div className="z-10 mt-6 flex flex-col gap-3 sm:flex-row sm:gap-6">
        <Link
          to="../projects"
          className="flex items-center justify-center gap-1 rounded-md border border-primary/20 bg-primary px-4 py-2 text-xs text-primary-foreground shadow transition-colors duration-300 hover:bg-primary/90 sm:text-sm"
        >
          {t("header.works")}
          <MoveRight size={14} />
        </Link>

        <a
          href="https://drive.google.com/file/d/1fdoRVx2i96DyodVlrP2Ju_YPnDqV7WDZ/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="flex cursor-pointer items-center justify-center gap-1 rounded-md text-xs text-brand transition-colors duration-300 dark:text-brand-light dark:hover:text-white sm:text-sm"
        >
          {t("header.cv")}
          <Earth size={14} />
        </a>
      </div>

      <span className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs text-ink dark:text-white/50 sm:text-sm">
        {t("header.scroll")}
      </span>
    </section>
  );
};

export default Header;
