import { useRef } from "react";
import { trpc } from "../../utils/trpc";
import cookie from "js-cookie";
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
export default function Main() {
  const loginMutation = trpc.auth.loginMutation.useMutation({
    //run this function when loginmutaion is successful
    onSuccess: (data) => {
      const { token, success } = data;
      //set a uniquely generated token for future login
      cookie.set("token", token);
      window.location.reload();
    },
  });
  const signUpMutaion = trpc.auth.signupMutation.useMutation({
    onSuccess: (data) => {
      const { success } = data;
      window.location.reload();
    },
  });
  const loginUsernameRef = useRef<HTMLInputElement>(null);
  const loginPasswordRef = useRef<HTMLInputElement>(null);
  const signupUsernameRef = useRef<HTMLInputElement>(null);
  const signupPasswordRef = useRef<HTMLInputElement>(null);
  return (
    <main className="grid h-screen w-screen grid-rows-[2fr_8fr]">
      <div className="h-full w-full text-center">
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
            <div>LOGIN FORM</div>
            <label>
              Username
              <input
                ref={loginUsernameRef}
                type={"text"}
                className="border border-solid border-black"
              ></input>
            </label>
            <label>
              Password
              <input
                ref={loginPasswordRef}
                type={"password"}
                className="border border-solid border-black"
              ></input>
            </label>
            <button
              className="w-fit border border-solid border-black"
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
              if (signupPasswordRef && signupUsernameRef) {
                const username = signupUsernameRef.current?.value;
                const password = signupPasswordRef.current?.value;
                if (username && password) {
                  signUpMutaion.mutate({ username, password });
                }
              }
            }
          }}
        >
          <div className="flex flex-col">
            <div>SIGNUP FORM</div>
            <label>
              Username
              <input
                ref={signupUsernameRef}
                type={"text"}
                className="border border-solid border-black"
              ></input>
            </label>
            <label>
              Password
              <input
                ref={signupPasswordRef}
                type={"password"}
                className="border border-solid border-black"
              ></input>
            </label>
            <button
              className="w-fit border border-solid border-black"
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
      //if logged in redirect to homepage (admin page)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
