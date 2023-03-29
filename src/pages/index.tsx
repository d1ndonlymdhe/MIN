import { type NextPage } from "next";


import { trpc } from "../utils/trpc";
import Image from "next/image";
const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
{/*       <!--  navbar --> */}
  <nav className="relative container mx-auto p-6">
{/*     <!--     flex container --> */}
    <div className="flex items-center justify-between">
{/*       <!--    logo --> */}
      <div className="pt-2">
      <Image
      src="/image/minLogox.png"
      alt="Picture of the author"
      width={150}
      height={75}
    />
      </div>

{/*       <!--         menu -->
 */}      <div className="hidden md:flex space-x-10">
        <a href="#" className="text-white font-['Poppins'] hover:font-bold">Home</a>
        <a href="#" className="text-white font-['Poppins'] hover:font-bold">Blogs</a>
        <a href="#" className="text-white font-['Poppins'] hover:font-bold">Projects</a>
        <a href="#" className="text-white font-['Poppins'] hover:font-bold">Alumni</a>
        <a href="#" className="text-white font-['Poppins'] hover:font-bold">About</a>
        <a href="#" className="text-white font-['Poppins'] hover:font-bold">Support Us</a>
      </div>

{/*       <!--  Hamburger-icon --> */}
      <button id="menu-btn" className=" block hamburger md:hidden focus:outline-none">
       <span className="hamburger-top"></span>
       <span className="hamburger-middle"></span>
       <span className="hamburger-bottom"></span>
      </button>
    </div>
    <div className="md:hidden">
      <div id="menu"
        className="absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center sm:left-6 sm:right-6 drop-shadow-md">
        <a href="#" >Home</a>
        <a href="#" >Blogs</a>
        <a href="#" >Projects</a>
        <a href="#" >Alumni</a>
        <a href="#" >About</a>
        <a href="#" >Support Us</a>
      </div>
    </div>
  </nav>
      

{/*       <section className="grid grid-cols-1 gap-0 bg-blue-100 bg-opacity-25 md:grid-cols-2">
            <div className="flex flex-col items-start justify-center px-4 py-24 lg:px-20">
                <span className="mb-3 text-white bg-blue-900 badge rounded-md px-1 py-1">MIN</span>
                <h1 className="mb-6 text-4xl font-bold leading-tight text-blue-900 md:text-4xl lg:text-5xl">
                Subscribe Now to Our Newsletter
                </h1>
                <form className="w-full mb-6">
                <label className="sr-only">Your Email</label>
                <div className="block lg:hidden">
                    <input
                    className="text-blue-900 form-input form-input-lg rounded-md px-4 py-4"
                    type="email"
                    placeholder="Enter your email..."
                    required={true}></input>
                    <button
                    className="w-full mt-2 text-white bg-blue-900 hover:bg-blue-800 btn btn-lg rounded-md px-4 py-4"
                    type="submit"
                    >
                    Get Started
                    </button>
                </div>
                <div className="hidden w-full form-append lg:flex">
                    <input
                    className="text-blue-900 form-input form-input-lg"
                    type="email"
                    placeholder="Enter your email..."
                    required={true}></input>
                    <button
                    className="text-white bg-blue-900 hover:bg-blue-800 btn btn-lg rounded-md px-1 py-1"
                    type="submit"
                    >
                    Get Started
                    </button>
                </div>
                </form>
                <p className="pr-0 mb-4 text-sm text-blue-800 tracking-relaxed lg:pr-16">
                MIN is a blab Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, ducimus?
                </p>
            </div>
            <div>
                <img
                src="https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                alt="3 women looking at a laptop"
                className="object-cover w-full h-64 bg-gray-100 md:h-full"
                loading="lazy"/>
            </div>
         </section> */}
    </>
  );
};

export default Home;
