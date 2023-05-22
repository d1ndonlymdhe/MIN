import React from "react";
import Navbar from "../globalComponents/Navbar";
import AboutImg from "../../public/images/alumni.jpg";
import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";
import Image from "next/image";
import MemberCard from "../globalComponents/memberCard";


const About = () => {
  return (
    <>
      <Navbar activeTab="About" />
      <Background
        backgroundImg={AboutImg.src}
        backgroundImg2={AboutImg.src}
        introText="About"
      />

      <div className="mt-[34em] md:mt-[42em] mb-[5em]">
        <h1 className="z-1 text-2xl flex items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Board of Directors
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
      <MemberCard/>
      <MemberCard/>
      </div>

      <div className="mt-[2em] md:mt-[6em] mb-[5em]">
        <h1 className="z-1 flex text-2xl items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Content Creators
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
      </div>

      <div className="mt-[2em] md:mt-[6em] mb-[5em]">
        <h1 className="z-1 flex text-2xl items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Event Department
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
      </div>

      <div className="mt-[2em] md:mt-[6em] mb-[5em]">
        <h1 className="z-1 flex text-2xl items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Developers & Designers
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
      </div>




      {/*  <Footer /> */}
      <Footer/>
    </>
  );
};

export default About;
