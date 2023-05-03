import React from 'react'
import Navbar from '../globalComponents/Navbar'
import AboutImg from "../../public/images/alumni.jpg";
import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";

const About = () => {
  return (
    <>
    <Navbar activeTab='About' />
    <Background
        backgroundImg={AboutImg.src}
        backgroundImg2={AboutImg.src}
        introText="Projects"
      />
     {/*  <Footer /> */}
    </>
  )
}

export default About