import Navbar from "../globalComponents/Navbar";
import homeImage from "../../public/images/homeImage.jpg";
import homeImageL from "../../public/images/homeImageL.jpg";
import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";
import ProjectCard from "../globalComponents/ProjectCard";


const projects = () => {
  return (
    <>
      <Navbar activeTab="Projects" />
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
    </>
  );
};

export default projects;
