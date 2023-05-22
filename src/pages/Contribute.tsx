import Navbar from "../globalComponents/Navbar"
import Background from "../globalComponents/Background"
import homeImage from "../../public/images/homeImage.jpg";
import homeImageL from "../../public/images/homeImageL.jpg";

const Contribute = () => {
  return (
    <>
    <Navbar activeTab="Contribute" />
      <Background
        backgroundImg={homeImage.src}
        backgroundImg2={homeImageL.src}
        introText="Contribute"
      />

    </>
  )
}

export default Contribute