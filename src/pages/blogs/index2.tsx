import { Blog, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import uuid from "react-uuid";
import Navbar from "../../globalComponents/Navbar";
import { useState } from "react";


export default function Main(props: PageProps) {
  const { blogs, loggedIn } = props;
  const [modalShown, setModalShown] = useState(false);
  return (
    <div className={modalShown ? "h-screen w-screen overflow-hidden" : ""}>
      <Navbar setModalShown={setModalShown} activeTab="Blogs" />
    <main className="w-full px-4 py-12 mx-auto max-w-7xl md:w-4/5">
          <h1 className="py-8 text-2xl font-bold">FEATURED BLOG</h1>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1596496181871-9681eacf9764?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx"
                      className="object-cover w-full h-56 mb-5 bg-center rounded"
                      alt="image alt"
                      loading="lazy"
                    />
                  </div>
                  <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Math
                  </p>
                  <h2 className="mb-2 text-xl font-bold leading-snug text-gray-900">
                    <a href="#" className="text-gray-900 hover:text-purple-700">
                      Planning for Math 
                    </a>
                  </h2>
                  <p className="mb-4 text-sm font-normal text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis delectus esse vel. At eos quas provident, explicabo facere numquam veritatis, laboriosam iure reprehenderit animi dolores!
                  </p>
                </div> 
          </div>
          <div className="flex flex-col items-center justify-center mt-12 space-x-0 space-y-2 md:space-x-2 md:space-y-0 md:flex-row">
            <a href="#" className="w-full rounded-full btn btn-light btn-xl md:w-auto">
              👈    
            </a>
            <a href="#" className="w-full rounded-full btn btn-light btn-xl md:w-auto">
              👉    
            </a>
          </div>
    </main>
    </div>
  );
}

type PageProps = {
  loggedIn: boolean;
  blogs: Blog[];
};

// export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
//   const prisma = new PrismaClient();
//   const token = context.req.cookies.token;
//   let loggedIn = false;
//   if (token) {
//     const dbToken = await prisma.token.findFirst({
//       where: { value: token },
//       include: { user: true },
//     });
//     if (dbToken) {
//       loggedIn = true;
//     }
//   }
//   const blogs = await prisma.blog.findMany();
//   return {
//     props: {
//       loggedIn,
//       blogs,
//     },
//   };
// };


export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies?.token;
  const prisma = new PrismaClient()
  const blogCount = 3;
  let loggedIn = false;
  if (token) {
    const dbToken = await prisma.token.findFirst({ where: { value: token } });
    if (dbToken) {
      loggedIn = true;
    }
  }
  const latestBlogs = await prisma.blog.findMany({ where: { isTemp: false }, orderBy: { publishedOn: "desc" }, include: { author: { select: { name: true } } } })

  return {
    props: {
      loggedIn,
      blogs: latestBlogs.reverse().slice(0 - blogCount).reverse()
    }
  }
}

function underscore(str: string) {
  return str.split(" ").join("_")
}
