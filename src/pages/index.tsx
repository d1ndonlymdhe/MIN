import { type NextPage } from "next";

import { useState, useEffect } from "react";

import Image from "next/image";
import Navbar from "../globalComponents/Navbar";
import Head from "next/head";
import Background from "./Background";




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
      <Navbar activeTab="Home"/>
      <Background/>
      <section className="mt-[34em] md:mt-[42em]">
    <h1 className="flex items-center justify-center font-secondary text-2xl font-bold text-white md:text-4xl z-1">
      PROJECTS HIGHLIGHTS
    </h1>
  </section>
  <h1>Dog shit</h1>
  

    </>
  );
};

export default Home;
