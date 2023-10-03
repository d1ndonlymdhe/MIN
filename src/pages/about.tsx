import React, { useState } from 'react'
// import Navbar from '../globalComponents/Navbar'
import AboutImg from "../../public/images/alumni.jpg";
// import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";
// import Image from "next/image";
import MemberCard from "../globalComponents/MemberCard";
import { Intro } from '.';
import Head from 'next/head';


const About = () => {
  const [modalShown, setModalShown] = useState(false)
  return (<>
    <Head>
      <style>
        {
          `
                .bg1{
                    background-image:url(${AboutImg.src});
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    width: 100vw;
                    height: 80vh;
                    

                }
                `
        }
      </style>
    </Head>
    <div className={modalShown ? "h-screen w-screen overflow-hidden bg-primary" : "bg-primary overflow-x-hidden"} >
      <Intro activeTab='About' setModalShown={setModalShown}></Intro>

      <div className="mt-16  mb-[5em]">
        <h1 className="z-1 text-2xl flex items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          President
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Manish Poudel" />
      </div>

      <hr className="border-b w-full"/>

      <div className="mt-[2em] md:mt-[6em] mb-[5em]">
      <h1 className="z-1 text-2xl flex items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Board of Directors
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Apeel Subedi" />
        <MemberCard name="Prachi Jha" />
        <MemberCard name="Swikriti Acharya" />
      </div>

      <hr className="border-b w-full"/>

      <div className="mt-[2em] md:mt-[6em] mb-[5em]">
        <h1 className="z-1 flex text-2xl items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Content Creators
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Prakash Pant" />
        <MemberCard name="Bikash Shah" />
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Shirjak Thokar" />
        <MemberCard name="Sama Malla" />
        <MemberCard name="Rahul Bhujel" />
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Swikar Lamsal" />
        <MemberCard name="Sayam Shrestha" />
        <MemberCard name="Sushank Poudel" />
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Atith Adhikari" />
        <MemberCard name="Amash Khadka" />
        <MemberCard name="Sinshiya KC" />
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Nayam Barun" />
      </div>

      <hr className="border-b w-full"/>

      <div className="mt-[2em] md:mt-[6em] mb-[5em]">
        <h1 className="z-1 flex text-2xl items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Event Department
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Anuj Subedi" />
        <MemberCard name="Abhinav Acharya" />
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Drone Chaudhary" />
        <MemberCard name="Krish Yadav" />
        <MemberCard name="Resham Ghimire" />
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Abhisek Rana" />
        <MemberCard name="Prabhat Mahato" />
        <MemberCard name="Atharv Pathak" />
      </div>


      <hr className="border-b w-full"/>

      <div className="mt-[2em] md:mt-[6em] mb-[5em]">
        <h1 className="z-1 flex text-2xl items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Developers & Designers
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Shivam Sah" />
        <MemberCard name="Sajani Sharma" />
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Amar Kushwaha" />
        <MemberCard name="Munish Prasad Lohani" />
        <MemberCard name="Sijan Khadka" />
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Kumud Raj Ghimire" />
        <MemberCard name="Sakshyam Pokharel" />
        <MemberCard name="Aayush Shah" />
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Sandesh Shrestha" />
        <MemberCard name="Rib En Ce" />
      </div>
      {/*  <Footer /> */}
      <Footer />
    </div>
  </>
  );
};

export default About;
