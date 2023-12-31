import type { MouseEvent, PropsWithChildren } from "react";
type buttonProps = {
    id?: string,
    type?: "submit" | "button" | "reset",
    className?: string,
    onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void,
    expand?: boolean
}
const Button = (props: PropsWithChildren<buttonProps>) => {
    const { id, type, className, onClick, expand } = props;
    return <button  type={type || "button"} id={id || ""} className={`px-2 py-1 font-bold text-white rounded-md  ${expand && "hover:scale-110"} duration-100 ${className}`} onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
            onClick(e)
        }
    }}
    >{props.children}</button>
}

export default Button