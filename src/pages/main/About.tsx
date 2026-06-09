import { useState } from "react";
import Container from "../../components/Container";
import TabsBox from "../../components/TabsBox";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState("experience");

  return (
    <>
      <title>{t("about.pageTitle")}</title>
      <meta
        name="description"
        content={t("about.metaDescription")}
      />
      <div
        className="
      h-auto w-full 
      bg-background text-foreground
      relative pt-24 md:pt-60 pb-20
      "
      >
        {/* Background Grid */}
        <div className="absolute top-0 left-0 w-full h-full z-0 grid grid-cols-20">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="border-l border-ink/3 dark:border-soft/2 h-full"
            />
          ))}
        </div>

        <Container className="">
          {/* Tabs */}
          <div
            className="
          flex items-center w-full rounded-xl overflow-hidden 
          border border-ink/10 dark:border-ink
          bg-card
          backdrop-blur-md p-1 mb-6 relative z-10
          "
          >
            <button
              onClick={() => setTab("experience")}
              className={`
              flex-1 py-2 rounded-lg transition-all duration-300
              ${
                tab === "experience"
                  ? "bg-soft dark:bg-black/30 text-ink dark:text-soft"
                  : "text-ink/50 dark:text-soft/40 hover:bg-ink/10 dark:hover:bg-soft/10"
              }
            `}
            >
              {t("about.work")}
            </button>

            <button
              onClick={() => setTab("education")}
              className={`
              flex-1 py-2 rounded-lg transition-all duration-300
              ${
                tab === "education"
                  ? "bg-soft dark:bg-black/30 text-ink dark:text-soft"
                  : "text-ink/50 dark:text-soft/40 hover:bg-ink/10 dark:hover:bg-soft/10"
              }
              `}
            >
              {t("about.education")}
            </button>
          </div>

          <TabsBox tab={tab} />
        </Container>
      </div>
    </>
  );
};

export default About;
