import Navbar from "../globalComponents/Navbar";
import homeImage from "../../public/images/homeImage.jpg";
import homeImageL from "../../public/images/homeImageL.jpg";
import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";
import ProjectCard from "../globalComponents/ProjectCard";
import { useState } from "react";


const projects = () => {
  const [modalShown, setModalShown] = useState(false)
  return (
    <div className={modalShown ? "h-screen w-screen overflow-hidden" : ""}>
      <Navbar activeTab="Projects" setModalShown={setModalShown} />
      <Background
        backgroundImg={homeImage.src}
        backgroundImg2={homeImageL.src}
        introText="Projects"
      />
      <section className="mt-[34em] md:mt-[50em]">
        <ProjectCard />
        <ProjectCard />


      </section>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default projects;
