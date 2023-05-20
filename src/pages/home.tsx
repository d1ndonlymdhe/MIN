import { GetServerSideProps } from "next";

export default function Home() {
    return <div>Redirect</div>
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: "/",
            permanent: true
        }
    }
}