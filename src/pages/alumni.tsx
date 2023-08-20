import React, { SetStateAction, useState } from "react";
import Navbar from "../globalComponents/Navbar";
import AlumniImg from "../../public/images/alumni.jpg";
import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";
import Image from "next/image";
import Chad from "../../public/images/chad.png";
import AlumniCard from "../globalComponents/AlumniCard";
import Head from "next/head";
import homeImage from "../../public/images/homeImage.jpg";
import homeImageL from "../../public/images/homeImageL.jpg";
const Alumni = () => {
  // modalShown is needed to find if the navbar modal is shown in mobile mode the width and height of main parent div is set to 100vh to avoid scrolling
  const [modalShown, setModalShown] = useState(false);
  return (
    <div className={modalShown ? "h-screen w-screen overflow-hidden bg-primary" : "bg-primary overflow-x-hidden"}>
      <Head>
        <style>
          {
            `
                .bg1{
                    background-image:url(${homeImage.src});
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    width: 100vw;
                    height: 80vh;

                }
                @media only screen and (min-width:768px){
                    .bg1{
                        background-image:url(${homeImageL.src});
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                        width: 100vw;
                        height: 100vh;

                    }
                }`
          }
        </style>
      </Head>
      <Intro setModalShown={setModalShown}></Intro>
      <section className=" bg-white">
        <AlumniCard />
        <AlumniCard />
        <AlumniCard />

      </section>


      {/* footer */}
      <Footer />
    </div>
  );
};

function Intro(props: {
  setModalShown: React.Dispatch<SetStateAction<boolean>>
}) {
  const { setModalShown } = props;
  return <div className="h-screen w-screen bg1">
    <div className="z-[3] relative">
      <Navbar setModalShown={setModalShown} activeTab="Alumni"></Navbar>
    </div>
    <div className="flex justify-center items-center bg-primary bg-opacity-50 h-screen w-screen z-[2] absolute top-0">
      <div className="grid  justify-center items-center font-secondary text-white h-fit w-fit md:gap-15 ">
        <div className=" flex flex-col gap-8  w-[15em] md:w-[40em] text-center">
          <p className="text-lg md:text-4xl  font-bold">
            Mathmatics Initiatives in Nepal
          </p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, temporibus mollitia. Possimus eos pariatur reiciendis earum ut! Praesentium, unde. Exercitationem nemo modi ducimus quibusdam cumque maxime expedita, repellendus qui iste.
          </p>
        </div>
      </div>
    </div>
  </div>
}

export default Alumni;
