import React, { useState } from 'react'
// import Navbar from '../globalComponents/Navbar'
import Aboutimage from "../../public/images/alumni.jpg";
// import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";
// import Image from "next/image";
import MemberCard from "../globalComponents/MemberCard";
import { Intro } from '.';
import Head from 'next/head';

import ManishPoudel from "../../public/images/MINPeople/ManishPoudel.jpeg"
import AayushShah from "../../public/images/MINPeople/AayushShah.png"
import AbhinavAcharya from "../../public/images/MINPeople/AbhinavAcharya.jpg"
import AbhishekRana from "../../public/images/MINPeople/AbhishekRana.jpg"
import AbishaAryal from "../../public/images/MINPeople/AbishaAryal.png"
import AdarshaSubedi from "../../public/images/MINPeople/AdarshaSubedi.jpg"
import AmarKushwaha  from "../../public/images/MINPeople/AmarKushwaha.jpg"
import AmashKhadka from "../../public/images/MINPeople/AmashKhadka.png"
import AnujSubedi  from "../../public/images/MINPeople/AnujSubedi.jpg"
import ApeelSubedi from "../../public/images/MINPeople/ApeelSubedi.jpg"
import ArpanNeupane from "../../public/images/MINPeople/ArpanNeupane.jpg"
import AtharvPathak from "../../public/images/MINPeople/AtharvPathak.jpg"
import AtithAdhikari from "../../public/images/MINPeople/AtithAdhikari.jpg"
import BikashShah from "../../public/images/MINPeople/BikashShah.jpg"
import DroneChaudhary from "../../public/images/MINPeople/DroneChaudahry.jpg"
import KrishYadav from "../../public/images/MINPeople/KrishYadav.jpg"
import KumudGhimire  from "../../public/images/MINPeople/KumudGhimire.jpg"
import MunishLohani from "../../public/images/MINPeople/MunishLohani.jpg"
import NayamBarun from "../../public/images/MINPeople/NayamBarun.jpg"
import PrabhatMahato from "../../public/images/MINPeople/PrabhatMahato.jpg"
import PrachiJha from "../../public/images/MINPeople/PrachiJha.jpg"
import PrakashPant from "../../public/images/MINPeople/PrakashPant.jpg"
import RahulBhujel from "../../public/images/MINPeople/RahulBhujel.jpg"
import RanjeetGhimire from "../../public/images/MINPeople/RanjeetGhimire.jpg"
import SajaniSharma from "../../public/images/MINPeople/SajaniSharma.png"
import SakshyamPokharel from "../../public/images/MINPeople/SakshyamPokharel.jpg"
import SamaMalla from "../../public/images/MINPeople/SamaMalla.jpg"
import SandeshShrestha  from "../../public/images/MINPeople/SandeshShrestha.jpg"
import SayamShrestha  from "../../public/images/MINPeople/SayamShrestha.jpg"
import ShirjakThokar from "../../public/images/MINPeople/ShirjakThokar.jpg"
import ShivamKumar from "../../public/images/MINPeople/ShivamKumar.jpg"
import SijanKhadka from "../../public/images/MINPeople/SijanKhadka.jpg"
import SinshiyaKC  from "../../public/images/MINPeople/SinshiyaKc.jpg"
import SushankPaudel from "../../public/images/MINPeople/SushankPaudel.jpg"
import SwikarLamsal from "../../public/images/MINPeople/SwikarLamsal.jpg"
import SwikritiAcharya from "../../public/images/MINPeople/SwikritiAcharya.jpg"
import UmangaBaral from "../../public/images/MINPeople/UmangaBaral.jpg"


const About = () => {
  const [modalShown, setModalShown] = useState(false)
  return (<>
    <Head>
      <style>
        {
          `
                .bg1{
                    background-image:url(${Aboutimage.src});
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
        <MemberCard name="Manish Poudel" image={ManishPoudel} />
      </div>

      <hr className="border-b w-full"/>

      <div className="mt-[2em] md:mt-[6em] mb-[5em]">
      <h1 className="z-1 text-2xl flex items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Board of Directors
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Apeel Subedi" image={ApeelSubedi}/>
        <MemberCard name="Prachi Jha" image={PrachiJha}/>
        <MemberCard name="Swikriti Acharya" image={SwikritiAcharya}/>
      </div>

      <hr className="border-b w-full"/>

      <div className="mt-[2em] md:mt-[6em] mb-[5em]">
        <h1 className="z-1 flex text-2xl items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Content Creators
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Prakash Pant" image={PrakashPant}/>
        <MemberCard name="Bikash Shah" image={BikashShah}/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Shirjak Thokar" image={ShirjakThokar}/>
        <MemberCard name="Sama Malla" image={SamaMalla}/>
        <MemberCard name="Rahul Bhujel" image={RahulBhujel}/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Swikar Lamsal" image={SwikarLamsal}/>
        <MemberCard name="Sayam Shrestha" image={SayamShrestha}/>
        <MemberCard name="Sushank Paudel" image={SushankPaudel}/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Atith Adhikari" image={AtithAdhikari}/>
        <MemberCard name="Amash Khadka" image={AmashKhadka}/>
        <MemberCard name="Sinshiya KC" image={SinshiyaKC}/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Nayam Barun" image={NayamBarun}/>
        <MemberCard name="Nayam Barun" image={AdarshaSubedi}/>
        <MemberCard name="Nayam Barun" image={ArpanNeupane}/>
      </div>

      <hr className="border-b w-full"/>

      <div className="mt-[2em] md:mt-[6em] mb-[5em]">
        <h1 className="z-1 flex text-2xl items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Event Department
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Anuj Subedi" image={AnujSubedi}/>
        <MemberCard name="Abhinav Acharya" image={AbhinavAcharya}/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Drone Chaudhary" image={DroneChaudhary}/>
        <MemberCard name="Krish Yadav" image={KrishYadav}/>
        <MemberCard name="Resham Ghimire" image={RanjeetGhimire}/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Abhisek Rana" image={AbhishekRana}/>
        <MemberCard name="Prabhat Mahato" image={PrabhatMahato}/>
        <MemberCard name="Atharv Pathak" image={AtharvPathak}/>
      </div>


      <hr className="border-b w-full"/>

      <div className="mt-[2em] md:mt-[6em] mb-[5em]">
        <h1 className="z-1 flex text-2xl items-center justify-center font-secondary  font-bold text-white md:text-4xl">
          Developers & Designers
        </h1>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Shivam Sah" image={ShivamKumar}/>
        <MemberCard name="Sajani Sharma" image={SajaniSharma}/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Amar Kushwaha"image={AmarKushwaha}/>
        <MemberCard name="Munish Prasad Lohani" image={MunishLohani}/>
        <MemberCard name="Sijan Khadka" image={SijanKhadka}/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Kumud Raj Ghimire" image={KumudGhimire}/>
        <MemberCard name="Sakshyam Pokharel" image={SakshyamPokharel} />
        <MemberCard name="Aayush Shah" image={AayushShah}/>
      </div>

      <div className="flex flex-col justify-evenly md:flex-row my-10">
        <MemberCard name="Sandesh Shrestha" image={SandeshShrestha}/>
        <MemberCard name="Sandesh Shrestha" image={AbishaAryal}/>
        {/* <MemberCard name="Rib En Ce" image={}/> */}
      </div>
      {/*  <Footer /> */}
      <Footer />
    </div>
  </>
  );
};

export default About;
