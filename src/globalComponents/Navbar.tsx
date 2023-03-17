import { Bars3Icon, RectangleStackIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Button from "./Button";
import ModalWithBackdrop from "./ModalWithBackdrop";

const tabs = ["Home", "Blogs", "Alumini", "Projects", "About", "MQ"] as const
type NavbarProps = {
    activeTab: typeof tabs[number]
    className?: string
}

export default function Navbar(props: NavbarProps) {
    const { activeTab, className } = props;
    const [showNavbarModal, setShowNavbarModal] = useState(false);
    //TODO do not show navbar modal when lg width is hit
    // useEffect(()=>{
    //     window.innerWidth
    // })
    const NavbarModal = () => {
        return <ModalWithBackdrop title="Menu" isShown={showNavbarModal} onClick={() => {
            setShowNavbarModal(false);
        }}>
            <div className="flex justify-end mx-20">
                <div className="flex flex-col">
                    <ul className={`flex gap-2 flex-col ${className ? className : ""}`}>
                        {
                            tabs.map(t => {
                                return <li key={uuid()}>
                                    {/*TODO use next/link */}
                                    <a href={`/${t}`} >
                                        <div className={`grid hover:cursor-pointer text-lg font-complementry font-[700] place-items-center ${activeTab == t ? "border-b-4 border-b-complementary bg-[#352F79] font-black" : ""}`}>
                                            <p className="mx-4 mt-6 mb-2">{t}</p>
                                        </div>
                                    </a>
                                </li>
                            })
                        }
                    </ul>
                    <Button className="bg-secondary" onClick={() => { setShowNavbarModal(false) }}>Close</Button>
                </div>
            </div>
        </ModalWithBackdrop>
    }



    return (
        <>
            <nav className="lg:grid lg:grid-cols-2 hidden">
                <div className="flex justify-start text-[30px] items-center font-primary  font-[700]">
                    <a href="/">
                        <p className="mx-20 hover:cursor-pointer">MIN</p>
                    </a>
                </div>
                <div className="flex justify-end mx-20">
                    <ul className={`flex gap-4 flex-row ${className ? className : ""}`}>
                        {
                            tabs.map(t => {
                                return <li key={uuid()}>
                                    {/*TODO use next/link */}
                                    <a href={`/${t}`} >
                                        <div className={`grid hover:cursor-pointer text-[30px] font-complementry font-[700] place-items-center ${activeTab == t ? "border-b-4 border-b-complementary bg-[#352F79] font-black" : ""}`}>
                                            <p className="mx-8 mt-10 mb-4">{t}</p>
                                        </div>
                                    </a>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </nav>
            <nav className="grid grid-cols-2 lg:hidden">
                <div className="flex justify-start text-[30px] items-center font-primary  font-[700]">
                    <a href="/">
                        <p className="mx-4 hover:cursor-pointer">MIN</p>
                    </a>
                </div>
                <NavbarModal></NavbarModal>
                <div className="flex w-full justify-end">
                    <Bars3Icon className="h-10 w-10 mx-4" onClick={()=>{
                        setShowNavbarModal(true)
                    }}></Bars3Icon>
                </div>
            </nav>
        </>
    )


}