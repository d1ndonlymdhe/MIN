import React, { useState } from 'react'
import Navbar from '../globalComponents/Navbar'
import AboutImg from "../../public/images/alumni.jpg";
import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";

const About = () => {
  const [modalShown, setModalShown] = useState(false)
  return (
    <div className={modalShown ? "h-screen w-screen overflow-hidden" : ""} >
      <Navbar activeTab='About' setModalShown={setModalShown} />
    <Background
        backgroundImg={AboutImg.src}
        backgroundImg2={AboutImg.src}
        introText="Projects"
      />
     {/*  <Footer /> */}
    </div>
  )
}

export default About