import Header from "../../components/Header";
import Skills from "../../components/Skills";
import MyWorks from "../../components/MyWorks";
import Socials from "../../components/Socials";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Khazar Abdullayev — Frontend Developer Portfolio</title>
        <meta
          name="description"
          content="I'm Khazar Abdullayev, a Frontend Developer building modern, fast and responsive web applications using React, TypeScript, Tailwind CSS and more."
        />
        <meta
          name="keywords"
          content="Frontend Developer, React Developer, Portfolio, JavaScript, TypeScript, Web Developer"
        />
        <link rel="canonical" href="https://yourdomain.com/" />
        <meta
          property="og:title"
          content="Khazar Abdullayev — Frontend Developer"
        />
        <meta
          property="og:description"
          content="Modern, clean and optimized web applications with React & TypeScript."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta
          property="og:image"
          content="https://yourdomain.com/your_preview_image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Khazar Abdullayev — Frontend Developer"
        />
        <meta
          name="twitter:description"
          content="Modern frontend projects built with React, Tailwind CSS and TypeScript."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/your_preview_image.jpg"
        />

        {/* --- Structured Data / JSON-LD (Google SEO) --- */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Xezer Abdullayev",
            jobTitle: "Frontend Developer",
            url: "https://yourdomain.com/",
            sameAs: [
              "https://github.com/yourusername",
              "https://www.linkedin.com/in/yourusername",
            ],
          })}
        </script>
      </Helmet>

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
          <Socials />
          <Skills />
          <MyWorks />
        </div>
      </div>
    </>
  );
};

export default Home;
