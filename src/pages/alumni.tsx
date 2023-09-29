import React, {  useState } from "react";
// import Navbar from "../globalComponents/Navbar";
// import AlumniImg from "../../public/images/alumni.jpg";
// import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";
// import Image from "next/image";
// import Chad from "../../public/images/chad.png";
import AlumniCard from "../globalComponents/AlumniCard";
import Head from "next/head";
import homeImage from "../../public/images/homeImage.jpg";
import homeImageL from "../../public/images/homeImageL.jpg";
import { Intro } from ".";
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
      <Intro setModalShown={setModalShown} activeTab="Alumni"></Intro>
      <section className="  bg-slate-100">
        <AlumniCard />
        <AlumniCard />
        <AlumniCard />

      </section>


      {/* footer */}
      <Footer />
    </div>
  );
};


export default Alumni;
