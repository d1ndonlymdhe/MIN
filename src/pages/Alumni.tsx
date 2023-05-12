import React from "react";
import Navbar from "../globalComponents/Navbar";
import AlumniImg from "../../public/images/alumni.jpg";
import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";
import Image from "next/image";
import Chad from "../../public/images/chad.png";
import AlumniCard from "../globalComponents/AlumniCard";

const Alumni = () => {
  return (
    <>
      <Navbar activeTab="Alumni" />
      <Background
        backgroundImg={AlumniImg.src}
        backgroundImg2={AlumniImg.src}
        introText="Alumni"
      />
      <section className="mt-[27.8em] md:mt-[39.2em] bg-white">
        <AlumniCard />
        <AlumniCard />
        <AlumniCard />

      </section>
    

      {/* footer */}
        <Footer /> 
    </>
  );
};

export default Alumni;
