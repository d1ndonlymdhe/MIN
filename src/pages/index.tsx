import { type NextPage } from "next";


import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
     <h5 className="p-2">WELCOME TO MIN.</h5>
    </>
  );
};

export default Home;
