// import uuid from "react-uuid";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import p1 from "../../public/images/people/p1.jpg"
import p2 from "../../public/images/people/p2.jpg"
import p3 from "../../public/images/people/p3.jpg"
import p4 from "../../public/images/people/p4.jpg"
import p5 from "../../public/images/people/p5.jpg"
import p6 from "../../public/images/people/p6.jpg"
import p7 from "../../public/images/people/p7.jpg"
import Button from "../globalComponents/Button";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Quote from "../globalComponents/Quotes";
const ps = [p1, p2, p3, p4, p5, p6, p7];
import minLogo from "../../public/images/MINLogox.png"
import homeImage from "../../public/images/homeImage.jpg";
import homeImageL from "../../public/images/homeImageL.jpg";
import Navbar from "../globalComponents/Navbar";
import Head from "next/head";
import React, { SetStateAction, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Footer from "../globalComponents/Footer";
import Image from "next/image"
const parentArr = ps.map(p => {
  return {
    image: p.src,
    text: "Aut nihil mollitia deserunt quia sed rem. Quibusdam amet veniam rerum id rerum beatae. Quas rerum iste necessitatibus. At voluptates ad magnam blanditiis excepturi expedita aut. Aut repellat inventore qui minima illum est."
  }
})




export default function App() {
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
      <Intro setModalShown={setModalShown} activeTab="Home" ></Intro>
      <ProjectHighlights></ProjectHighlights>
      <Testimonials></Testimonials>
      <Newsletter></Newsletter>
      <Footer></Footer>
    </div>)
}

export function Intro(props: {
  setModalShown: React.Dispatch<SetStateAction<boolean>>
  activeTab: "Home" | "Projects" | "Blogs" | "Alumni" | "About" | "Contribute"
}) {
  const { setModalShown, activeTab } = props;
  return <>

    <div className="h-screen w-screen bg1">
      <div className="z-[3] relative">
        <Navbar setModalShown={setModalShown} activeTab={activeTab}></Navbar>
      </div>
      <div className="flex justify-center items-center bg-primary bg-opacity-50 h-screen w-screen z-[2] absolute top-0">
        <div className="grid  justify-center items-center font-secondary text-white h-fit w-fit md:gap-15 ">
          <div className=" flex flex-col gap-8  w-[15em] md:w-[40em] text-center">
            <p className="text-lg md:text-4xl  font-bold">
              Mathmatics Initiatives in Nepal
            </p>
            <p className="text-sm">
            MIN is an exceptional non-profit mathematics organization, fueled by a vibrant community of passionate students committed to enriching the mathematical landscape since its inception in October 2020. We wholeheartedly embrace the elegance of mathematics, igniting a transformative journey towards its highest potential. MIN is devoted to revolutionizing mathematics in Nepal through captivating online talk shows, exhilarating math events, raising awareness about Olympiads, and so much more. MIN is not merely an organization; it's a dynamic platform designed to ignite the mathematical minds of Nepal, fueling your mathematical curiosities and unleashing your prowess.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
}


function ProjectHighlights() {
  return <div className="flex flex-col gap-10">
    <div className="flex flex-col gap-10 mt-10">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col h-[20%] justify-center items-center">
          <p className="text-4xl md:text-6xl font-bold text-center text-complementary">
            PROJECT HIGHLIGHTS
          </p>
        </div>
        <Carousel2></Carousel2>
      </div>
    </div>
    <div className="grid grid-cols-3 text-lg md:text-2xl text-center text-white font-secondary items-center justify-center h-[35vh] border-y-white border-y">
      <div className="flex flex-col">
        <span className="text-4xl text-center md:text-8xl font-[700]">30K<span className="text-complementary">+</span></span>
        <span className="font-[500] text-lg text-center md:text-4xl">Students Reached</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl  text-center md:text-8xl font-[700]">20<span className="text-complementary">+</span></span>
        <span className="font-[500] text-lg text-center md:text-4xl">Projects Installed</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl text-center md:text-8xl font-[700]">15<span className="text-complementary">+</span>
        </span>
        <span className="font-[500] text-lg text-center  md:text-4xl">
          Partners & Collaborators
        </span>
      </div>
    </div>
  </div>
}

function Testimonials() {
  return <div className="testimonials flex flex-col gap-10 mt-10">
    <div className="flex flex-col h-[20%] justify-center items-center">
      <p className="text-4xl md:text-6xl font-bold text-center text-complementary">
        TESTIMONIALS
      </p>
    </div>
    <div className="flex flex-col">
      <CCarousel></CCarousel>
    </div>
  </div>
}


function Newsletter() {
  return <>
    <div className="hidden md:block">
      <div className="font-complementry w-full h-96 relative bg-[#352f79] mt-10 ">
        <div className="absolute left-0 top-0 bg-white w-[60vw] flex flex-row justify-center items-center z-[3] h-96" style={{
          clipPath: "polygon(0 0,80% 0%,100% 100%,0% 100%)"
        }}>
          <div className="flex flex-col  md:gap-10 ml-8">
            <p className=" font-[500] text-5xl">Subscribe Newsletter</p>
            <p className="text-gray-500">Sign Up for Newsletter to get upto date info about our organizations plan and event.</p>
          </div>
          <div className="w-[20vw]">
          </div>
        </div>
        <div className="flex justify-end  items-center h-full ">
          <div className="h-fit w-fit -translate-x-[15rem] z-[4] shadow-2xl shadow-black rounded-md">
            <input className="bg-slate-300 h-16 w-[20vw] rounded-l-md z-[4] focus:outline-[#352f79] pl-10 placeholder:text-black  " placeholder="Enter your email address"></input>
            <button className="bg-[#3b3486] h-16 px-8 py-4 font-bold text-lg text-yellow-500  rounded-r-md">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full grid grid-rows-[2fr_8fr] gap-4 mt-10 md:hidden border-y-2 border-y-complementary  py-10">
      <div className="text-4xl font-bold  w-full h-full text-complementary text-center">
        Newsletter
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="text-center text-lg text-white font-complementry mx-4">
          Sign Up for Newsletter to get upto date info about our organizations plan and event.
        </div>
        <input className="w-[60%] rounded-md py-4 pl-4 placeholder:text-[#bcbcbc] placeholder:font-complementry" placeholder="Enter your email.">
        </input>
        <button className="rounded-md bg-[#ffb700] text-xl w-[60%] py-4 font-bold">
          SIGN UP

        </button>
      </div>
    </div>
  </>
}

// function Footer() {
//   return <div className="bg-primary w-full">
//     <div className="w-full items-center border-b-2 border-b-complementary flex flex-col-reverse md:flex-row pb-10 pt-10" >
//       <div className="w-1/2 flex flex-col items-center">
//         <div className="flex flex-col gap-4 py-4">
//           <img src={minLogo.src} className="h-24 md:h-52"></img>
//           <div className="flex flex-row gap-2 md:items-start">
//             <p>LinkedIn</p>
//             <p>Facebook</p>
//             <p>Instagram</p>
//           </div>
//         </div>
//       </div>
//       <div className="w-full md:w-1/2 grid grid-cols-2 gap-20 text-2xl text-white font-primary pt-4 justify-items-center md:justify-items-end md:pr-10">
//         <div className="flex flex-col gap-2">
//           <div className="text-complementary">Contact</div>
//           <div>WhatsApp</div>
//           <div>Support</div>
//         </div>
//         <div className="flex flex-col gap-2">
//           <div className="text-complementary">Quick Links</div>
//           <div>Home</div>
//           <div>Projects</div>
//           <div>Alumini</div>
//           <div>About</div>
//           <div>Support</div>
//         </div>
//       </div>
//     </div>
//     <div className="w-full h-20 text-white flex justify-center items-center">
//       <p>Copyright © 2023 Mathmatics Initiatives in Nepal</p>
//     </div>
//   </div>
// }



function Carousel2() {
  const [currentSlide, setCurrentSlide] = useState(0)
  return <div className="flex flex-col gap-10">
    <Carousel
      renderArrowNext={
        (onClickHandler, hasNext, label) => {
          return <div
            className="flex justify-end items-center top-0 right-0 md:right-40 w-fit h-full z-[2] absolute">
            <button className="px-4 py-4 bg-secondary" onClick={onClickHandler}>
              <ArrowRightIcon className="h-6 w-6 text-white"></ArrowRightIcon>
            </button>
          </div>
        }
      }
      renderArrowPrev={
        (onClickHandler, hasPrev, label) => {
          return <div
            className="flex justify-start items-center top-0 left-0 md:left-40 w-fit h-full z-[2] absolute">
            <button className="px-4 py-4 bg-secondary" onClick={onClickHandler}>
              <ArrowLeftIcon className="h-6 w-6 text-white"></ArrowLeftIcon>
            </button>
          </div>
        }
      }
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      selectedItem={currentSlide}
      interval={1000}
      animationHandler={"slide"}
      showArrows={false}
      onChange={(index) => {
        console.log(index, currentSlide)
        setCurrentSlide(index)
      }}

    >
      {
        parentArr.map((p, i) => {
          return <div key={i} className="flex w-full h-fit justify-center text-black">
            <div className="bg-white flex flex-row w-[70vw] h-auto">
              <div className="w-[60vw] h-full invisible md:visible " style={{
                backgroundImage: `url(${p.image})`,
                backgroundSize: "cover"
              }}>
              </div>
              <div className="w-auto h-full flex flex-col sm:px-auto md:px-10 py-10 items-start gap-4">
                <p className="font-primary font-bold text-3xl text-left">
                  Eric
                  <br></br>
                  Shrestha
                </p>
                <p className="font-secondary text-gray-500 text-left">
                  Chief Operating Officer
                </p>
                <p className="text-left font-[550] font-complementry text-lg sm:text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit non elit vitae varius. Sed egestas convallis vulputate. Aenean efficitur, leo nec sollicitudin tempus, orci massa commodo turpis, id dapibus ligula dui a nisl. 
                </p>
              </div>
            </div>
          </div>
        })
      }
    </Carousel>
    <div className="w-full h-5 flex justify-center items-center">
      <div className="grid grid-cols-[2fr_6fr_2fr] gap-4">
        <div></div>
        <div className="flex flex-row gap-2 justify-center items-center">
          {
            ps.map((p, i) => {
              return <div className={`w-4 h-4 rounded-full ${i == currentSlide ? "bg-rose-600" : "bg-white"} cursor-pointer`} onClick={() => {
                setCurrentSlide(i);
              }} key={i}>
              </div>
            })
          }
        </div>
        <div></div>
      </div>
    </div>
  </div>
}


function CCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  return <div className="flex flex-col gap-10">
    <Carousel
      renderArrowNext={
        (onClickHandler, hasNext, label) => {
          return <div
            className="flex justify-end items-center top-0 right-0 md:right-3 w-fit h-full z-[2] absolute">
            <Button onClick={onClickHandler} className={`md:mx-2 h-4/6`}>
              <ChevronDoubleRightIcon className="h-8 w-8 md:h-12 md:w-12 text-white "></ChevronDoubleRightIcon>
            </Button>
          </div>
        }
      }
      renderArrowPrev={
        (onClickHandler, hasPrev, label) => {
          return <div
            className="flex justify-start items-center top-0 left-0 md:left-3 w-fit h-full z-[2] absolute">
            <Button onClick={onClickHandler} className={`md:mx-2 h-4/6  `}>
              <ChevronDoubleLeftIcon className="h-8 w-8 md:h-12 md:w-12 text-white "></ChevronDoubleLeftIcon>
            </Button>
          </div>
        }
      }
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      selectedItem={currentSlide}
      interval={1000}
      animationHandler={"slide"}
      showArrows={false}
      onChange={(index) => {
        console.log(index, currentSlide)
        setCurrentSlide(index)
      }}

    >
      {
        parentArr.map((p, i) => {
          return <div key={i} className="w-full flex items-center justify-center">
            <div className="w-[85vw] md:w-[70vw] h-fit mx-12 bg-white rounded-md">
              <div className="my-4 mx-4   flex flex-col md:grid  md:grid-cols-[30%_70%]">
                <div className="py-2 md:py-4">
                  <img className="w-[80vw] md:w-[90vw] aspect-square rounded-md" src={p.image}>
                  </img>
                </div>
                <div className="flex flex-col gap-4 ">
                  <span className="flex justify-end pr-4">
                    {/* <div> */}
                    <Quote className="md:h-16 md:w-16 h-10 w-10"></Quote>
                    {/* </div> */}
                  </span>
                  <span className="text-lg md:text-xl box-content md:pl-6 pr-8 leading-relaxed text-left">
                    {p.text}
                  </span>
                  <div className="flex flex-col gap-2 md:pl-6">
                    <span className="font-bold text-lg md:text-2xl text-left w-full">
                      Chad Bahadur
                    </span>
                    <p className="text-lg text-left w-full">
                      CEO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        })
      }
    </Carousel>
    <div className="w-full h-5 flex justify-center items-center">
      <div className="grid grid-cols-[2fr_6fr_2fr] gap-4">
        <div></div>
        <div className="flex flex-row gap-2 justify-center items-center">
          {
            ps.map((p, i) => {
              return <div className={`w-4 h-4 rounded-full ${i == currentSlide ? "bg-rose-600" : "bg-white"} cursor-pointer`} onClick={() => {
                setCurrentSlide(i);
              }} key={i}>
              </div>
            })
          }
        </div>
        <div></div>
      </div>
    </div>
  </div>
}


