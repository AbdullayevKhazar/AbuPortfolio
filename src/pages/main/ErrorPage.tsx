import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <title>{t("errorPage.title")}</title>
      <meta name="robots" content="noindex,follow" />
      <div className="w-full bg-black max-h-dvh md:min-h-dvh grid grid-cols-1 md:grid-cols-4 p-2 md:p-10 overflow-hidden relative">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="grid p-2 md:p-8">
            {Array.from({ length: 5 }).map((_, j) => (
              <div
                key={j}
                className="flex items-center pb-6 text-xl justify-center text-white"
              >
                {t("errorPage.message")}
              </div>
            ))}
          </div>
        ))}
        <Link
          to={"/"}
          className="absolute bottom-8 left-8 border md:w-auto border-white/5 bg-dark-surface text-soft font-bold rounded-xl px-8 py-4 cursor-pointer hover:bg-dark-surface/50 transition-all duration-300"
        >
          {t("errorPage.home")}
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
