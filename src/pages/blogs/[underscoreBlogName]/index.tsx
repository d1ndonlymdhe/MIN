import { Blog, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";

export default function Main(props: PageProps) {
  const { blog, loggedIn, author } = props;
  return (
    <main className="grid grid-rows-[2fr_8fr]">
      <div>
        MIN blog {blog.title} by {author}{" "}
      </div>
      <div>{blog.content}</div>
    </main>
  );
}

type PageProps = {
  loggedIn: boolean;
  blog: Blog;
  author: string;
};

export const getServerSideProps: GetServerSideProps<
  PageProps,
  { underscoreBlogName: string }
> = async (context) => {
  const underScoreBlogName = context.params?.underscoreBlogName;
  const token = context.req.cookies.token;
  const prisma = new PrismaClient();
  let loggedIn = false;
  if (token) {
    const dbToken = await prisma.token.findFirst({ where: { value: token } });
    if (dbToken) {
      loggedIn = true;
    }
  }
  console.log(underScoreBlogName);
  if (underScoreBlogName) {
    const blogName = underScoreBlogName.split("_").join(" ");
    const blog = await prisma.blog.findFirst({
      where: { title: blogName },
      include: { author: true },
    });
    if (blog) {
      return {
        props: {
          author: blog.author.name,
          blog: {
            authorId: blog.authorId,
            content: blog.content,
            id: blog.id,
            title: blog.title,
          },
          loggedIn,
        },
      };
    }
  }
  return {
    redirect: {
      destination: "/blogs/error",
      permanent: false,
    },
  };
};
