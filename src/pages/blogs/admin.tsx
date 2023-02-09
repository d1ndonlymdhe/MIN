import { Blog, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import uuid from "react-uuid";

export default function Main(props: PageProps) {
  const { blogs, loggedIn } = props;

  return (
    <main className="grid grid-rows-[2fr_8fr]">
      <div>MIN BLOGS</div>
      <div className="flex flex-col">
        {blogs.map((b) => {
          return (
            <div key={uuid()} className="flex flex-col">
                {/* use next link */}
              <a href={`/blogs/${underscore(b.title)}`}>
                <div className="font-bold">{b.title}</div>
              </a>
              {/* <div>{b.content}</div> */}
            </div>
          );
        })}
      </div>
    </main>
  );
}

type PageProps = {
  loggedIn: boolean;
  blogs: Blog[];
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const prisma = new PrismaClient();
  const token = context.req.cookies.token;
  let loggedIn = false;
  if (token) {
    const dbToken = await prisma.token.findFirst({
      where: { value: token },
      include: { user: true },
    });
    if (dbToken) {
      loggedIn = true;
    }
  }
  const blogs = await prisma.blog.findMany();
  return {
    props: {
      loggedIn,
      blogs,
    },
  };
};

function underscore(str:string){
    return str.split(" ").join("_")
}