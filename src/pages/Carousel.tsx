import uuid from "react-uuid";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import p2 from "../../public/image/minLogo.png"
import p1 from "../../public/images/people/p1.jpg"
import p2 from "../../public/images/people/p2.jpg"
// const p2 = p1;
import p3 from "../../public/images/people/p3.jpg"
// const p3 = p1;
import p4 from "../../public/images/people/p4.jpg"
// const p4 = p1;
// const p5 = p2;
// const p6 = p3;
// const p7 = p1;
import p5 from "../../public/images/people/p5.jpg"
import p6 from "../../public/images/people/p6.jpg"
import p7 from "../../public/images/people/p7.jpg"
import Button from "../globalComponents/Button";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
// import quote from "../../public/images/Quotes.svg";
import Quote from "../globalComponents/Quotes";
const ps = [p1, p2, p3, p4, p5, p6, p7];

// const parentArr = ps.map(p => p.src)




import chad from "../../public/images/chad.png";
import child from "../../public/images/child.png";
import minLogo from "../../public/images/minLogo.png"
import homeImage from "../../public/images/homeImage.jpg";
import homeImageL from "../../public/images/homeImageL.jpg";
import Navbar from "../globalComponents/Navbar";
import Background from "../globalComponents/Background";
import Head from "next/head";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";


// const parentArr = [{
//   image: chad.src,
//   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
// }, {
//   image: child.src,
//   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
// },
// {
//   image: minLogo.src,
//   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
// },
// {
//   image: homeImage.src,
//   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
// },
// {
//   image: homeImageL.src,
//   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
// }
// ]

const parentArr = ps.map(p => {
  return {
    image: p.src,
    text: "Aut nihil mollitia deserunt quia sed rem. Quibusdam amet veniam rerum id rerum beatae. Quas rerum iste necessitatibus. At voluptates ad magnam blanditiis excepturi expedita aut. Aut repellat inventore qui minima illum est."
  }
})




export default function App() {
  return (
    <>
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
      <Intro></Intro>
      <ProjectHighlights></ProjectHighlights>
      <Testimonials></Testimonials>
      <Newsletter></Newsletter>
    </>)
}


function Intro() {
  return <div className="h-screen w-screen bg1">
    <div className="z-[3] relative">
      <Navbar activeTab="Home"></Navbar>
    </div>
    <div className="flex justify-center items-center bg-primary bg-opacity-50 h-screen w-screen z-[2] absolute top-0">
      <div className="grid  justify-center items-center font-secondary text-white h-fit w-fit md:gap-15 ">
        <div className=" flex flex-col gap-8  w-[15em] md:w-[40em] text-center">
          <p className="text-lg md:text-4xl  font-bold">
            Mathmatics Initiatives in Nepal
          </p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, temporibus mollitia. Possimus eos pariatur reiciendis earum ut! Praesentium, unde. Exercitationem nemo modi ducimus quibusdam cumque maxime expedita, repellendus qui iste.
          </p>
        </div>
      </div>
    </div>
  </div>
}


function ProjectHighlights() {
  return <div className="flex flex-col gap-10">
    <div className="flex flex-col gap-10 mt-10">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col h-[20%] justify-center items-center">
          <p className="text-xl md:text-6xl font-bold text-center text-complementary">
            PROJECT HIGHLIGHTS
          </p>
        </div>
        <CCarousel></CCarousel>
      </div>
    </div>
    <div className="grid grid-cols-3 text-lg md:text-2xl text-center text-white font-secondary items-center justify-center h-[25vh] border-y-white border-y">
      <div className="flex flex-col">
        <span className="text-8xl font-[700]">1000<span className="text-complementary">+</span></span>
        <span className="font-[500] text-4xl">Students Reached</span>
      </div>
      <div className="flex flex-col">
        <span className="text-8xl font-[700]">20<span className="text-complementary">+</span></span>
        <span className="font-[500] text-4xl">Projects Installed</span>
      </div>
      <div className="flex flex-col">
        <span className="text-8xl font-[700]">
          15<span className="text-complementary">+</span>
        </span>
        <span className="font-[500] text-4xl">
          Partners & Collaborators
        </span>
      </div>
    </div>
  </div>
}

function Testimonials() {
  return <div className="testimonials flex flex-col gap-10 mt-10">
    <div className="flex flex-col h-[20%] justify-center items-center">
      <p className="text-xl md:text-6xl font-bold text-center text-complementary">
        TESTIMONIALS
      </p>
    </div>
    <div className="flex flex-col">
      <CCarousel></CCarousel>
    </div>
  </div>
}


function Newsletter() {
  return <div className="w-full h-20 bg-green-500">

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
                <div className="flex flex-col gap-4">
                  <span className="w-full flex justify-end pr-4">
                    {/* <div> */}
                    <Quote className="md:h-16 md:w-16 h-10 w-10"></Quote>
                    {/* </div> */}
                  </span>
                  <span className="text-lg md:text-2xl md:pl-6 pr-8 leading-relaxed text-left">
                    {p.text}
                  </span>
                  <div className="flex flex-col gap-2 md:pl-6">
                    <span className="font-bold text-lg md:text-4xl text-left w-full">
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




type Card = {
  imgSrc: string,
  text: string,
}


type placeHolderProps = {
  card: Card,
}

function ImagePlaceholder(props: placeHolderProps) {
  const { card } = props
  return (
    <div
      className="mx-20"
      style={{
        direction: "ltr"
      }}
    >
      {/* to override the style passed from carousel component apply style props */}
      <div className="w-full flex h-full overflow-hidden justify-center items-top bg-minWhite rounded-md">
        <img style={
          {
            height: "20rem",
            width: "20rem"
          }
        } src={card.imgSrc}></img>
        <span
          className="overflow-hidden"
        >
          {card.text}
        </span>
      </div>
    </div>
  );
}
