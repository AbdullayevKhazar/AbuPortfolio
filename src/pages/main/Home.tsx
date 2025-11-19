import Header from "../../components/Header";
import Skills from "../../components/Skills";
import MyWorks from "../../components/MyWorks";

const Home = () => {
  return (
    <div className="h-auto w-full bg-white text-[#1a1a1a] dark:bg-[#0F0E0E] dark:text-white relative">
      <div className="absolute top-0 left-0 w-full h-full z-0 grid grid-cols-20">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="border-l border-black/4 dark:border-gray-50/1 h-full"
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        <Header />
        <Skills />
        <MyWorks />
      </div>
    </div>
  );
};

export default Home;
