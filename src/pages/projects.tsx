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
        {/* Project card has 2 compoent one hast img in left and another in right */}
        <ProjectCard Title1="JMOC" Title2="ETA: Education To All" Disc1="Junior Mathematics Olympiad Camp is a month-long Olympiad Camp intended to introduce Olympiad topics to secondary school students of grade 8, 9 and 10. It is a yearly event of Mathematics Initiatives in Nepal.  The Junior Mathematics Olympiad Camp (JMOC) will provide them with various resources that will help them to prosper in competitions and educate them about the limitless realms of mathematics as well as the limitless possibilities they have when entering the field." Disc2="The ETA program aims to bring quality education to every child in Nepal, regardless of their background or circumstances. It has been an awe-inspiring journey of knowledge sharing and fostering a love for mathematics among the students from various schools in  the nation. In the ETA session, our dedicated team of educators introduced the students to a range of captivating mathematical concepts. The curriculum includes engaging topics such as Monte Carlo simulation, Number Visualisation and triangles, Fractal, Game Theory and many more."/>
        <ProjectCard Title1="Olymprep Sessions" Title2="Discussion Sessions" Disc1="OlymPrep is a weekly series of discussion-based problem-solving sessions for Math Olympiad aspirants. OlymPrep is organized by Mathematics Initiatives in Nepal (MIN), in association with Mathematical Association of Nepal (MAN). This is a yearly recurring event of Mathematics Initiatives in Nepal (MIN)." Disc2="Our Discussion Sessions are chances to explore the uncharted territories of math, expand your horizons, and be part of an intellectual adventure! We pick some well known conjectures, debatable ideas or problems and then host a discussion session inviting a national or international famous personality. These are a great ways of engaging the greatest mathematical minds in the nation."/>


      </section>

      {/* footer */}
      <Footer />
    </div>
  </>
  );
};



export default Projects;
