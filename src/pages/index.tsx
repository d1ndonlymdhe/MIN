import { type NextPage } from "next";

import Image from "next/image";
import Navbar from "../globalComponents/Navbar";
import Head from "next/head";
import Background from "../globalComponents/Background";
import homeImage from "../../public/images/homeImage.jpg";
import homeImageL from "../../public/images/homeImageL.jpg";
import Footer from "../globalComponents/Footer";
import { Carousel } from "react-responsive-carousel";
import Button from "../globalComponents/Button";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

import chad from "../../public/images/chad.png";
import child from "../../public/images/child.png";
import minLogo from "../../public/images/minLogo.png"

const parentArr = [{
  image: chad.src,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
}, {
  image: child.src,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
},
{
  image: minLogo.src,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
},
{
  image: homeImage.src,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
},
{
  image: homeImageL.src,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
}

]



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
      {/* <div className="w-full h-full relative"> */}
      <Carousel
        className="relative"
        renderArrowNext={
          (onClickHandler, hasNext, label) => {
            return <div
              className="flex items-center top-0 right-3 w-fit h-full z-[2] absolute">
              <Button onClick={onClickHandler} className={`mx-2 h-4/6 ${hasNext ? "bg-secondary cursor-pointer" : "bg-secondary/50 cursor-not-allowed"}  `}>
                <ChevronDoubleRightIcon className="h-6 w-6 text-black"></ChevronDoubleRightIcon>
              </Button>
            </div>
          }
        }
        renderArrowPrev={
          (onClickHandler, hasPrev, label) => {
            return <div
              className="flex items-center top-0 left-3 w-fit h-full z-[2]  absolute">
              <Button onClick={onClickHandler} className={`mx-2 h-4/6 ${hasPrev ? "bg-secondary cursor-pointer" : "bg-secondary/50 cursor-not-allowed"}  `}>
                <ChevronDoubleLeftIcon className="h-6 w-6 text-black"></ChevronDoubleLeftIcon>
              </Button>
            </div>
          }
        }
        showStatus={false} showThumbs={false} showIndicators={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}

      >
        {
          parentArr.map((p) => {
            return <div className="w-screen h-20 mx-10 my-2 bg-white rounded-md">
              <div className="my-4 mx-4 grid grid-cols-[30%_70%]">
                <img className="h-10 w-10 rounded-md" src={p.image}>
                </img>
                <p>
                  {p.text}
                </p>
              </div>
            </div>
          })
        }

      </Carousel>
      {/* </div> */}
    {/* footer */}
    <Footer />
    </>
  );
};

export default Home;
