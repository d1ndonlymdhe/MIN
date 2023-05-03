import { type NextPage } from "next";

import Image from "next/image";
import Navbar from "../globalComponents/Navbar";
import Head from "next/head";
import Background from "../globalComponents/Background";
import homeImage from "../../public/images/homeImage.jpg";
import homeImageL from "../../public/images/homeImageL.jpg";
import Footer from "../globalComponents/Footer";

/* let homeImg = "";
if (window.innerWidth >= 940) {
   homeImg = "/images/homeImage.jpg";
} else {
   homeImg = "/images/MIN-project.jpg";
} */

const Home: NextPage = () => {
  /*   const [windowSize, setWindowSize] = useState(960);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
      console.log(windowSize);

      if (windowSize >= 940) {
        homeImg = "/images/homeImage.jpg";
      } else {
        homeImg = "/images/MIN-project.jpg";
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }); */

  return (
    <>
      <Navbar activeTab="Home" />
      <Background
        backgroundImg={homeImage.src}
        backgroundImg2={homeImageL.src}
        introText="Mathematics Initiatives in Nepal"
      />
      <section className="mt-[34em] md:mt-[42em]">
        <h1 className="z-1 flex items-center justify-center font-secondary text-2xl font-bold text-white md:text-4xl">
          PROJECTS HIGHLIGHTS
        </h1>
      </section>

      <div className="my-[10em] flex h-[20em] flex-col justify-center border-y border-white md:h-[14em]">
        <div className="flex flex-col place-content-around items-center space-y-10 font-secondary  text-2xl text-white md:flex-row md:space-y-0 md:text-2xl">
          <h1 className="text-center">
            10000+ <br /> Students Reached
          </h1>
          <h1 className="text-center">
            20+ <br /> Projects Initaited{" "}
          </h1>
          <h1 className="text-center">
            15+ <br /> Partners & Collaborators
          </h1>
        </div>
      </div>

    {/* footer */}
    <Footer />
    </>
  );
};

export default Home;
