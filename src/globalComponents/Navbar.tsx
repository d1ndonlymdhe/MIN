import { Bars3Icon } from "@heroicons/react/24/solid";
import { type SetStateAction, useEffect, useState } from "react";
import uuid from "react-uuid";
import Button from "./Button";
// import ModalWithBackdrop from "./ModalWithBackdrop";
import Image from "next/image";
import Link from "next/link";
import MinLogoX from "../../public/images/MINLogox.png"
const tabs = ["Home", "Blogs", "Projects", "Alumni", "About", "Contribute"] as const;
type NavbarProps = {
  activeTab: (typeof tabs)[number];
  className?: string;
  setModalShown: React.Dispatch<SetStateAction<boolean>>
};

export default function Navbar(props: NavbarProps) {
  const { activeTab, className, setModalShown } = props;
  const [showNavbarModal, setShowNavbarModal] = useState(false);

  const ModalChild = () => {

    useEffect(() => {
      setModalShown(true);
      return () => {
        setModalShown(false);
      }
    }, [])

    return <div className="flex justify-center" onClick={(e) => {
      e.stopPropagation()
    }}>
      <div className="flex flex-col">
        <ul className={`flex flex-col gap-2 ${className ? className : ""}`}>
          {tabs.map((t) => {
            return (
              <li key={uuid()}>
                {/*TODO use next/link */}
                <a href={`/${t.toLowerCase()}`}>
                  <div
                    className={`grid place-items-center font-complementry text-white text-lg font-[700] hover:cursor-pointer ${activeTab == t
                      ? "border-b-4 border-b-complementary bg-[#352F79] font-black"
                      : ""
                        }`}
                  >
                    <p className="mx-4 mt-6 mb-2">{t}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
        <Button
          className="bg-secondary"
          onClick={() => {
            setShowNavbarModal(false);
          }}
        >
          Close
        </Button>
      </div>
    </div>
  }

  const NavbarModal = () => {
    return <div className="absolute h-screen w-screen left-0  top-0 z-50 flex justify-center items-center backdrop-blur-sm overflow-hidden" onClick={() => {
      setModalShown(false)
      setShowNavbarModal(false)
    }}>
      <ModalChild></ModalChild>
    </div>
  }



  return (
    <>
      <nav className="hidden lg:grid lg:grid-cols-2 relative z-10">
        <div className="flex items-center justify-start font-secondary font-bold ml-5">
          <Link href="/">
            <Image
              src={MinLogoX.src}
              alt="Picture of the author"
              width={150}
              height={75}
            />
          </Link>
        </div>
        <div className="mx-10 flex justify-end">
          <ul className={`flex flex-row gap-2 ${className ? className : ""}`}>
            {tabs.map((t) => {
              return (
                <li key={uuid()}>
                  {/*TODO use next/link */}
                  <a href={`/${(t == "Home" ? "" : t).toLowerCase()}`}>
                    <div
                      className={`grid place-items-center text-[18px] font-secondary text-white font-[550] opacity-60 hover:cursor-pointer ${activeTab == t
                          ? "border-b-4 border-b-complementary bg-[#352F79] font-black"
                          : ""
                        }`}
                    >
                      <p className="mx-8 mt-10 mb-4">{t}</p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <nav className="grid grid-cols-2 lg:hidden">
        <div className="flex items-center justify-start font-primary text-[30px] font-[700] ml-5 mt-2">
          <Link href="/">
            <Image
              src="/images/minLogox.png"
              alt="Picture of the author"
              width={150}
              height={75}
            />
          </Link>
        </div>
        {showNavbarModal && <NavbarModal></NavbarModal>}
        <div className="flex w-full justify-end items-center relative z-10">
          <Bars3Icon
            className="mx-4 h-10 w-10 fill-white mr-[30px]"
            onClick={() => {
              setShowNavbarModal(true);
            }}
          ></Bars3Icon>
        </div>
      </nav>
    </>
  );
}
