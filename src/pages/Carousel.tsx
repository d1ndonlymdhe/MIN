import uuid from "react-uuid";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import p2 from "../../public/image/minLogo.png"
import p1 from "../../public/images/chad.png"
// import p2 from "../../public/images/child.png"
const p2 = p1;
// import p3 from "../../public/image/alumini.jpg"
const p3 = p1;
// import p4 from "../../public/image/people/p4.jpg"
const p4 = p1;
const p5 = p2;
const p6 = p3;
const p7 = p1;
// import p5 from "../../public/image/people/p5.jpg"
// import p6 from "../../public/image/people/p6.jpg"
// import p7 from "../../public/image/people/p7.jpg"
import Button from "../globalComponents/Button";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
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


const parentArr = [{
  image: chad.src,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
}, {
  image: child.src,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
},
{
  image: minLogo.src,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
},
{
  image: homeImage.src,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
},
{
  image: homeImageL.src,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur, nulla vel consectetur semper, diam erat condimentum sapien, vel porta."
}

]


// export default function App() {

//   return (
//     <div className="mt">
//       <Carousel renderArrowNext={
//         (onClickHandler, hasNext, label) => {
//           return <div
//             className="flex items-center top-0 right-3 w-fit h-full z-[2]  absolute">
//             <Button onClick={onClickHandler} className={`mx-2 h-4/6 ${hasNext ? "bg-secondary cursor-pointer" : "bg-secondary/50 cursor-not-allowed"}  `}>
//               <ChevronDoubleRightIcon className="h-6 w-6 text-black"></ChevronDoubleRightIcon>
//             </Button>
//           </div>
//         }
//       }
//         renderArrowPrev={
//           (onClickHandler, hasPrev, label) => {
//             return <div
//               className="flex items-center top-0 left-3 w-fit h-full z-[2]  absolute">
//               <Button onClick={onClickHandler} className={`mx-2 h-4/6 ${hasPrev ? "bg-secondary cursor-pointer" : "bg-secondary/50 cursor-not-allowed"}  `}>
//                 <ChevronDoubleLeftIcon className="h-6 w-6 text-black"></ChevronDoubleLeftIcon>
//               </Button>
//             </div>
//           }
//         }
//         showStatus={false} showThumbs={false} showIndicators={false}
//         infiniteLoop={true}
//         autoPlay={true}
//         interval={5000}

//       >
//         {parentArr.map<Card>((p) => { return { imgSrc: p, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus enim repudiandae id amet, consequatur, ducimus temporibus repellendus, fuga quos accusantium sed ullam voluptates earum. In rerum nemo velit. Consequatur, facilis." } }).map((card) => {
//           return (
//             <ImagePlaceholder
//               card={card}
//               key={uuid()}
//             ></ImagePlaceholder>
//           );
//         })}

//       </Carousel>
//     </div>
//   );
// }




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
      <div className="">
        <div className="h-screen w-screen bg1">
          <div className="z-[3] relative">
            <Navbar activeTab="Home"></Navbar>
          </div>
          <div className="flex justify-center items-center bg-primary bg-opacity-50 h-screen w-screen z-[2] absolute top-0">
            <div className="grid grid-rows-[70%_30%] md:grid-rows-2  justify-center items-center font-secondary text-white h-fit w-fit md:gap-15 ">
              <div className="md:pt-60 flex flex-col gap-8  w-[15em] md:w-[40em] text-center">
                <p className="text-lg md:text-4xl  font-bold">
                  Mathmatics Initiatives in Nepal
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, temporibus mollitia. Possimus eos pariatur reiciendis earum ut! Praesentium, unde. Exercitationem nemo modi ducimus quibusdam cumque maxime expedita, repellendus qui iste.
                </p>
              </div>
              <p className="pt-10 text-xl md:text-4xl font-bold text-center opacity-50 absolute top-[80vh] left-[25vw] md:left-[40vw]">
                PROJECT HIGHLIGHTS
              </p>
            </div>
          </div>

        </div>
        <div className="min-w-screen min-h-screen">
          <div className="grid grid-cols-3 text-lg md:text-2xl text-center text-white font-primary items-center justify-center h-[25vh] border-y-white border-y">
            <div>
              <p>1000+</p>
              <p>Students Reached</p>
            </div>
            <div>
              <p>20+</p>
              <p>Projects Installed</p>
            </div>
            <div>
              <p>
                15+
              </p>
              <p>
                Partners & Collaborators
              </p>
            </div>
          </div>
          <Carousel renderArrowNext={
            (onClickHandler, hasNext, label) => {
              return <div
                className="flex items-center top-0 right-3 w-fit h-full z-[2] absolute">
                <Button onClick={onClickHandler} className={`mx-2 h-4/6 ${hasNext ? "bg-secondary cursor-pointer" : "bg-secondary/50 cursor-not-allowed"}  `}>
                  <ChevronDoubleRightIcon className="h-6 w-6 text-black"></ChevronDoubleRightIcon>
                </Button>
              </div>
            }
          }
            renderArrowPrev={
              (onClickHandler, hasPrev, label) => {
                return <div
                  className="flex items-center top-0 left-3 w-fit h-full z-[2]  absolute">
                  <Button onClick={onClickHandler} className={`mx-2 h-4/6 ${hasPrev ? "bg-secondary cursor-pointer" : "bg-secondary/50 cursor-not-allowed"}  `}>
                    <ChevronDoubleLeftIcon className="h-6 w-6 text-black"></ChevronDoubleLeftIcon>
                  </Button>
                </div>
              }
          }
            showStatus={false} showThumbs={false} showIndicators={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
          >
            {
              parentArr.map((p) => {
                return <div className="w-full flex items-center justify-center">
                  <div className="w-[70vw] h-[20vw] mx-10 bg-white rounded-md">
                    <div className="my-4 mx-4 grid grid-cols-[30%_70%]">
                      <img className="h-[15vw] w-10 rounded-md" src={p.image}>
                      </img>
                      <p>
                        {p.text}
                      </p>
                    </div>
                  </div>
                </div>
              })
          }
          </Carousel>
        </div>
      </div>
    </>)
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
