import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      
      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 font-lato gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>
      </main> */}
      <section className="grid grid-cols-1 gap-0 bg-blue-100 bg-opacity-25 md:grid-cols-2">
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
         </section>
    </>
  );
};

export default Home;
