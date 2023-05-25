import React, { useState } from "react";
import Navbar from "../globalComponents/Navbar";
import AlumniImg from "../../public/images/alumni.jpg";
import Background from "../globalComponents/Background";
import Footer from "../globalComponents/Footer";
import Image from "next/image";
import Chad from "../../public/images/chad.png";
import AlumniCard from "../globalComponents/AlumniCard";

const Alumni = () => {
  // modalShown is needed to find if the navbar modal is shown in mobile mode the width and height of main parent div is set to 100vh to avoid scrolling
  const [modalShown, setModalShown] = useState(false);
  return (
    <div className={modalShown ? "h-screen w-screen overflow-hidden" : ""}>
      <Navbar activeTab="Alumni" setModalShown={setModalShown} />
      <Background
        backgroundImg={AlumniImg.src}
        backgroundImg2={AlumniImg.src}
        introText="Alumni"
      />
      <section className="mt-[27.8em] md:mt-[39.2em] bg-white">
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
