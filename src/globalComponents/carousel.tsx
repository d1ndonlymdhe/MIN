import { Carousel as C } from "react-responsive-carousel"
import Button from "./Button"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid"

export default function Carousel() {
    return (
        <div className="mt">
            <C
                renderArrowNext={
                    (onClickHandler, hasNext) => {
                        return <div
                            className="flex items-center top-0 right-3 w-fit h-full z-[2]  absolute">
                            <Button onClick={onClickHandler} className={`mx-2 h-4/6 ${hasNext ? "bg-secondary cursor-pointer" : "bg-secondary/50 cursor-not-allowed"}  `}>
                                <ChevronDoubleRightIcon className="h-6 w-6 text-black"></ChevronDoubleRightIcon>
                            </Button>
                        </div>
                    }
                }
                renderArrowPrev={
                    (onClickHandler, hasPrev) => {
                        return <div
                            className="flex items-center top-0 left-3 w-fit h-full z-[2]  absolute">
                            <Button onClick={onClickHandler} className={`mx-2 h-4/6 ${hasPrev ? "bg-secondary cursor-pointer" : "bg-secondary/50 cursor-not-allowed"}  `}>
                                <ChevronDoubleLeftIcon className="h-6 w-6 text-black"></ChevronDoubleLeftIcon>
                            </Button>
                        </div>
                    }
                }
                showStatus={false} showThumbs={false} showIndicators={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
            >

            </C>


        </div>

    )
}