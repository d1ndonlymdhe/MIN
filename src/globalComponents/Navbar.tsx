const tabs = ["Home", "Blogs", "Alumini","Projects", "About", "MQ"] as const
type NavbarProps = {
    activeTab: typeof tabs[number]
    className?: string
}
export default function Navbar(props: NavbarProps) {
    const { activeTab, className } = props;
    return (
        <nav className="grid grid-cols-2">
            <div className="flex justify-start text-[30px] items-center font-primary  font-[700]">
                <a href="/">
                    <p className="mx-20 hover:cursor-pointer">MIN</p>
                </a>
            </div>
            <div className="flex justify-end mx-20">
                <ul className={`flex gap-4 flex-row ${className ? className : ""}`}>
                    {
                        tabs.map(t=>{
                            return <li>
                                {/*TODO use next/link */}
                                <a href={`/${t}`}>
                                    <div className={`grid hover:cursor-pointer text-[30px] font-complementry font-[700] place-items-center ${activeTab == t ? "border-b-4 border-b-complementary bg-[#352F79] font-black" :""}`}>
                                        <p className="mx-8 mt-10 mb-4">{t}</p>
                                    </div>
                                </a>
                            </li>
                        })
                    }
                </ul>
            </div>
        </nav>)


}