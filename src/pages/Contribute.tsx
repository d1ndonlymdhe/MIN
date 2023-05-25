import Navbar from "../globalComponents/Navbar";
import Background from "../globalComponents/Background";
import homeImage from "../../public/images/homeImage.jpg";
import homeImageL from "../../public/images/homeImageL.jpg";
import Image from "next/image";
import nokia from "../../public/images/nokia.png";
import Footer from "../globalComponents/Footer";

const Contribute = () => {
  return (
    <>
      <Navbar activeTab="Contribute" />
      <Background
        backgroundImg={homeImage.src}
        backgroundImg2={homeImageL.src}
        introText="Contribute"
      />
    

      <section className="mt-[34em] md:mt-[42em] mb-20">
        <div className="flex flex-col-reverse items-center  justify-evenly space-y-20 space-y-reverse md:flex-row md:space-y-0 px-6">
          <div className="flex flex-col space-y-12 justify-center">
            <p className="max-w-sm text-center font-primary font-[400] text-white md:text-left">
              Nullam non sapien varius, venenatis neque sit amet, dignissim
              nisi. Nam vel ex ac turpis lacinia iaculis. Fusce tincidunt, nisi
              ac imperdiet gravida, ipsum dui ornare est, lacinia elementum elit
              erat et dolor. Suspendisse potenti. Quisque consectetur mattis
              sollicitudin. Praesent mattis tortor ante, id egestas lectus
              faucibus pharetra. Mauris congue ipsum arcu, et mattis lacus
              congue quis.Nullam non sapien varius, venenatis neque sit amet, dignissim
              nisi. Nam vel ex ac turpis lacinia iaculis. 
            </p>
            <div className="flex items-center justify-center max-w-sm md:justify-start">
              <a
                href="#CTA"
                className="w-full bg-[#FFB700] mx-auto p-3 px-6 pt-2 text-center font-primary font-bold text-black hover:bg-[#FFCF1A] "
              >
                SUPPORT US
              </a>
            </div>
          </div>

          <div>
            <Image
              src={nokia.src}
              width={400}
              height={600}
              alt="illustration"
            />
          </div>
        </div>
      </section>

      <hr />
      
      <section className="mt-20 mb-20">
      <div className="flex flex-col-reverse items-center justify-evenly space-y-20 space-y-reverse md:flex-row px-6 md:space-y-0">
          <div className="flex flex-col space-y-12 justify-center md:order-2">
            <p className="max-w-sm text-center font-primary font-[400] text-white md:text-left">
              Nullam non sapien varius, venenatis neque sit amet, dignissim
              nisi. Nam vel ex ac turpis lacinia iaculis. Fusce tincidunt, nisi
              ac imperdiet gravida, ipsum dui ornare est, lacinia elementum elit
              erat et dolor. Suspendisse potenti. Quisque consectetur mattis
              sollicitudin. Praesent mattis tortor ante, id egestas lectus
              faucibus pharetra. Mauris congue ipsum arcu, et mattis lacus
              congue quis.Nullam non sapien varius, venenatis neque sit amet, dignissim
              nisi. Nam vel ex ac turpis lacinia iaculis. 
            </p>
            <div className="flex items-center justify-center max-w-sm md:justify-start">
              <a
                href="#CTA"
                className="w-full bg-[#FFB700] mx-auto p-3 px-6 pt-2 text-center font-primary font-bold text-black hover:bg-[#FFCF1A] "
              >
                JOIN US
              </a>
            </div>
          </div>

          <div className="md:order-1">
            <Image
              src={nokia.src}
              width={400}
              height={600}
              alt="illustration"
            />
          </div>
        </div>
      </section>

      
      {/* footer */}
      <Footer/>
    </>
  );
};

export default Contribute;
