// import Navbar from "../globalComponents/Navbar";
import homeImage from "../../public/images/homeImage.jpg";
import homeImageL from "../../public/images/homeImageL.jpg";
// import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";
import ProjectCard from "../globalComponents/ProjectCard";
import { useState } from "react";
import Head from "next/head";
import { Intro } from ".";


const Projects = () => {
  const [modalShown, setModalShown] = useState(false)
  return (<>
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
    <div className={`${modalShown ? "h-screen w-screen overflow-hidden bg-primary" : "bg-primary overflow-x-hidden"} flex flex-col gap-8`}>
      {/* <Navbar activeTab="Projects" setModalShown={setModalShown} /> */}
      {/* <Background
        backgroundImg={homeImage.src}
        backgroundImg2={homeImageL.src}
        introText="Projects"
      /> */}
      <Intro setModalShown={setModalShown} activeTab="Projects"></Intro>
      <section className="flex flex-col gap-4">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />


      </section>

      {/* footer */}
      <Footer />
    </div>
  </>
  );
};



export default Projects;
