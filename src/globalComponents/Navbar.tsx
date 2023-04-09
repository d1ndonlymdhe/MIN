import { Bars3Icon, RectangleStackIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Button from "./Button";
import ModalWithBackdrop from "./ModalWithBackdrop";
import Image from "next/image";
import Link from "next/link";

const tabs = ["Home", "Blogs", "Projects", "Alumni", "About", "Support Us"] as const;
type NavbarProps = {
  activeTab: (typeof tabs)[number];
  className?: string;
};

export default function Navbar(props: NavbarProps) {
  const { activeTab, className } = props;
  const [showNavbarModal, setShowNavbarModal] = useState(false);
  //TODO do not show navbar modal when lg width is hit
  // useEffect(()=>{
  //     window.innerWidth
  // })
  const NavbarModal = () => {
    return (
      <ModalWithBackdrop
        title="Menu"
        isShown={showNavbarModal}
        onClick={() => {
          setShowNavbarModal(false);
        }}
      >
        <div className="mx-20 flex justify-end">
          <div className="flex flex-col">
            <ul className={`flex flex-col gap-2 ${className ? className : ""}`}>
              {tabs.map((t) => {
                return (
                  <li key={uuid()}>
                    {/*TODO use next/link */}
                    <a href={`/${t}`}>
                      <div
                        className={`grid place-items-center font-complementry text-white text-lg font-[700] hover:cursor-pointer ${
                          activeTab == t
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
      </ModalWithBackdrop>
    );
  };

  return (
    <>
      <nav className="hidden lg:grid lg:grid-cols-2 relative z-10">
        <div className="flex items-center justify-start font-secondary font-bold ml-5">
          <Link href="/">
            <Image
              src="/images/minLogox.png"
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
                  <a href={`/${t}`}>
                    <div
                      className={`grid place-items-center text-[18px] font-secondary text-white font-[550] opacity-60 hover:cursor-pointer ${
                        activeTab == t
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
        <NavbarModal></NavbarModal>
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
