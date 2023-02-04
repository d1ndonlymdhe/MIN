import {
    Blog,
    BlogReaction,
    Comment as CommentRenderer,
    CommentReaction,
    PrismaClient,
    User,
  } from "@prisma/client";
  import { GetServerSideProps } from "next";
  import { useRef, useState } from "react";
  import uuid from "react-uuid";
  import { trpc } from "../../../utils/trpc";
  
  export default function Main(props: PageProps) {
    const {
      blog,
      loggedIn,
      author,
      comments,
      reactions,
      userId,
      username,
      isLiked: liked,
    } = props;
    const [isLiked, setIsLiked] = useState(liked);
    //select all true
    const [likeCount, setLikeCount] = useState(
      reactions.filter((r) => r.type).length
    );
    const likeMutation = trpc.blog.reaction.useMutation({
      // read this https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
      onMutate: (variables) => {
        setIsLiked(variables.type);
        setLikeCount(variables.type ? likeCount + 1 : likeCount - 1);
      },
      onSuccess: (data) => {
        setIsLiked(data.reaction.type);
      },
      onError: (data, context) => {
        setIsLiked(!context.type);
        setLikeCount(context.type ? likeCount - 1 : likeCount + 1);
      },
    });
    return (

        );
    }
    
    type CommentProp = {
      comment: ClientComment;
      blogId: string;
      userId?: string;
    };
    
    function CommentRenderer(props: CommentProp) {
      const { comment: c, userId, blogId } = props;
      const [isLiked, setIsLiked] = useState(
        (c.reactions.filter((r) => r.userId == userId)[0]?.type && true) || false
      );
      const [likes, setLikes] = useState(c.reactions.filter((r) => r.type).length);
      const commentReactionMutation = trpc.blog.comment.reaction.useMutation({
        onMutate: (variables) => {
          const { blogId, commentId, type } = variables;
          setIsLiked(type);
          if (type) {
            setLikes(likes + 1);
          } else {
            setLikes(likes - 1);
          }
        },
        onSuccess: (data) => {
          const { reaction, success } = data;
          //may need it
        },
        onError: (data, context) => {
          const { blogId, commentId, type } = context;
          setIsLiked(!type);
          if (type) {
            setLikes(likes - 1);
          } else {
            setLikes(likes + 1);
          }
        },
      });
      return (
        <div className=" flex flex-col gap-2 border border-solid border-black">
          <p>{c.author} :</p>
          <p className=" p-2">{c.content}</p>
          <div className="flex w-fit flex-row gap-2 ">
            <button
              onClick={() => {
                if (userId) {
                  if (!commentReactionMutation.isLoading) {
                    commentReactionMutation.mutate({
                      blogId,
                      commentId: c.id,
                      type: !isLiked,
                    });
                  }
                } else {
                  alert("You need to log in to react");
                }
              }}
              className={`${
                isLiked && "font-bold"
              } border border-solid border-black px-2`}
            >
              {isLiked ? "Liked" : "Like"}
            </button>
            <p>{likes} likes</p>
          </div>
        </div>
      );
    }
    
    type AddCommentProp = {
      blog: Blog;
    };
    
    function AddComment(props: AddCommentProp) {
      const { blog } = props;
      const commentRef = useRef<HTMLInputElement>(null);
      const addCommentMutation = trpc.blog.comment.addComment.useMutation({
        onSuccess: () => {
          window.location.reload();
        },
      });
      return (
        <>
            <article className="px-4 py-24 mx-auto max-w-7xl" itemid="#" itemscope itemtype="http://schema.org/BlogPosting">
        
                <div className="w-full mx-auto mb-8 text-left md:w-3/4 lg:w-1/2">
                    <img src="https://images.unsplash.com/photo-1596496181871-9681eacf9764?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=886&q=80" className="object-cover w-full h-64 bg-center rounded-lg" alt="something" />
                    <p className="mt-6 mb-2 text-xs font-semibold tracking-wider uppercase text-primary">Mathematics</p>
                    <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl"  title="title">
                    Planning for Math
                    </h1>
                    <div className="flex mb-4 space-x-2">
                    <a className="text-gray-900 bg-gray-100 badge hover:bg-gray-200" href="#">Math</a>
                    <a className="text-gray-900 bg-gray-100 badge hover:bg-gray-200" href="#">MIN</a>
                    <a className="text-gray-900 bg-gray-100 badge hover:bg-gray-200" href="#">Training</a>
                    </div>
                </div>

                <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam dolores ratione alias soluta rerum similique illo maiores nisi culpa. Adipisci expedita quaerat ut, dolores itaque, necessitatibus eos dolore, ullam quo maiores labore? Praesentium autem aperiam voluptate rerum in, itaque ratione beatae, veritatis recusandae iste omnis distinctio quidem animi? Numquam, vitae!
                    </p>
                    <p>...</p>
                </div>

            </article>
        </>
      );
    }
    
    type ClientComment = CommentRenderer & {
      author: string;
      reactions: CommentReaction[];
    };
    
    type PageProps = {
      loggedIn: boolean;
      blog: Blog;
      reactions: BlogReaction[];
      author: string;
      comments: ClientComment[];
      userId?: string;
      username?: string;
      isLiked?: boolean;
    };
    
    export const getServerSideProps: GetServerSideProps<
      PageProps,
      { underscoreBlogName: string }
    > = async (context) => {
      const underScoreBlogName = context.params?.underscoreBlogName;
      const token = context.req.cookies.token;
      const prisma = new PrismaClient();
      let loggedIn = false;
      let username: string | undefined;
      let userId: string | undefined;
      if (token) {
        const dbToken = await prisma.token.findFirst({
          where: { value: token },
          include: { user: true },
        });
        if (dbToken) {
          loggedIn = true;
          (username = dbToken.user.username), (userId = dbToken.userId);
        }
      }
      if (underScoreBlogName) {
        const blogName = underScoreBlogName.split("_").join(" ");
        const blog = await prisma.blog.findFirst({
          where: { title: blogName },
          include: { author: true },
        });
        if (blog) {
          const comments = await prisma.comment.findMany({
            where: { blogId: blog.id },
            include: {
              author: true,
            },
          });
          const reactions = await prisma.blogReaction.findMany({
            where: {
              blogId: blog.id,
            },
          });
          //find all comment reactions
          const commentReactions = await prisma.commentReaction.findMany({
            where: {
              commentId: { in: comments.map((r) => r.id) },
            },
          });
          return {
            props: {
              author: blog.author.name,
              blog: {
                authorId: blog.authorId,
                content: blog.content,
                id: blog.id,
                title: blog.title,
              },
              reactions,
              comments: comments.map((c) => {
                return {
                  author: c.author.name,
                  authorId: c.authorId,
                  blogId: c.blogId,
                  content: c.content,
                  id: c.id,
                  reactions: commentReactions.filter((r) => r.commentId == c.id),
                };
              }),
              loggedIn,
              userId: userId || "",
              username: username || "",
              isLiked: reactions.filter((r) => {
                return r.userId == userId;
              })[0]?.type
                ? true
                : false,
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
    