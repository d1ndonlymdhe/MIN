import { useRef } from "react";
import { trpc } from "../utils/trpc";
import cookie from "js-cookie";
import { type GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
export default function Main() {
  const loginMutation = trpc.auth.loginMutation.useMutation({
    //run this function when loginmutaion is successful
    onSuccess: (data) => {
      const { token } = data;
      //set a uniquely generated token for future login
      cookie.set("token", token, { expires: 30 });
      window.location.reload();
    },
  });
  const signUpMutaion = trpc.auth.signupMutation.useMutation({
    onSuccess: (data) => {
      // const { success } = data;
      window.location.reload();
    },
  });
  const loginUsernameRef = useRef<HTMLInputElement>(null);
  const loginPasswordRef = useRef<HTMLInputElement>(null);
  const signupUsernameRef = useRef<HTMLInputElement>(null);
  const signupPasswordRef = useRef<HTMLInputElement>(null);
  const signupNameRef = useRef<HTMLInputElement>(null);
  return (
    <main className="grid h-screen w-screen grid-rows-[2fr_8fr] p-8">
      <div className="h-full w-full text-center font-bold text-white pt-10">
        Mathmatics Initiatives in Nepal
      </div>
      <div className="grid grid-cols-2">
        {/* login side */}
        <form
          name="login_form"
          onSubmit={(e) => {
            e.preventDefault();
            //if not already trying to login or signup
            if (!loginMutation.isLoading && !signUpMutaion.isLoading) {
              if (loginPasswordRef && loginUsernameRef) {
                const username = loginUsernameRef.current?.value;
                const password = loginPasswordRef.current?.value;
                //add form validation
                if (username && password) {
                  loginMutation.mutate({ username, password });
                }
              }
            }
          }}
        >
          <div className="flex flex-col">
            <div className="py-2 font-bold text-white">LOGIN FORM</div>
            <label className="text-white">
              Username: 
              <input
                ref={loginUsernameRef}
                type={"text"}
                className="border border-solid border-black text-black"
              ></input>
            </label>
            <label className="text-white py-4">
              Password: 
              <input
                ref={loginPasswordRef}
                type={"password"}
                className="border border-solid border-black text-black"
              ></input>
            </label>
            <button
              className="w-fit border border-solid bg-purple-600 py-1 px-2 text-white rounded-md"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        {/* signup side */}
        <form
          name="signup_form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!loginMutation.isLoading && !signUpMutaion.isLoading) {
              if (signupPasswordRef && signupUsernameRef && signupNameRef) {
                const name = signupNameRef.current?.value;
                const username = signupUsernameRef.current?.value;
                const password = signupPasswordRef.current?.value;
                if (username && password && name) {
                  signUpMutaion.mutate({ username, password, name });
                }
              }
            }
          }}
        >
          <div className="flex flex-col">
            <div className="py-2 font-bold text-white">SIGNUP FORM</div>
            <label className="text-white">
              Username: 
              <input
                ref={signupUsernameRef}
                type={"text"}
                className="border border-solid border-black text-black"
              ></input>
            </label>
            <label  className="text-white">
              Full Name: 
              <input
                type={"text"}
                ref={signupNameRef}
                className="border border-solid border-black text-black"
              ></input>
            </label>
            <label className="text-white py-4">
              Password: 
              <input
                ref={signupPasswordRef}
                type={"password"}
                className="border border-solid border-black"
              ></input>
            </label>
            <button
              className="w-fit border border-solid bg-purple-600 py-1 px-2 text-white rounded-md"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;
  const prisma = new PrismaClient();
  if (token) {
    const dbToken = await prisma.token.findFirst({
      where: { value: token },
      include: { user: true },
    });
    if (dbToken) {
      // const user = dbToken.user;
      //if logged in redirect to homepage (admin page)
      return {
        redirect: {
          destination: `/adminofmin`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
