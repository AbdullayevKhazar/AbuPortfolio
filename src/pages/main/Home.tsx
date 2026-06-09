import Header from "../../components/Header";
import Skills from "../../components/Skills";
import MyWorks from "../../components/MyWorks";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <title>XAB</title>
      <meta
        name="description"
        content={t("home.metaDescription")}
      />
      <div className="h-auto w-full bg-background text-foreground relative">
        <div className="absolute top-0 left-0 w-full h-full z-0 grid grid-cols-20">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="h-full border-l border-border/40"
            ></div>
          ))}
        </div>

        <div className="relative z-10">
          <Header />
          <Skills />
          <MyWorks />
        </div>
      </div>
    </>
  );
};

export default Home;
