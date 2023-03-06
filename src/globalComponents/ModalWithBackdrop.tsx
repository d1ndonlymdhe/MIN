import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createContext } from "react";


type modalContextType = {
    isShown : boolean
}
const modalContext = createContext<modalContextType>({isShown:false})
const modalUpdateContext = createContext((newState:modalContextType)=> { })

export function useModalContext(){
    return useContext(modalContext);
}
export function useModalUpdateContext(){
    return useContext(modalUpdateContext);
}



type ModalWithBackdropProps = {
    onClick?: () => void,
    title: string,
    className?: string,
    isShown:boolean
}


export function ModalContextProvider(props: React.PropsWithChildren) {
    const { children } = props;
    const [modalState,setModalState] = useState<modalContextType>({isShown:false});

    function updateState(newState: any) {
        console.log("called")
        setModalState(newState);
    }
    return <modalContext.Provider value={modalState}>
        <modalUpdateContext.Provider value={(newState: typeof modalState) => { updateState(newState) }}>
            {children}
        </modalUpdateContext.Provider>
    </modalContext.Provider>
}



export default function ModalWithBackdrop(props: PropsWithChildren<ModalWithBackdropProps>) {
    const { onClick, title, className,isShown } = props;
    // const [modalState,setModalState] = useState<modalContextType>({isShown:iSh});
    const modalState = useModalContext()
    const setModalState = useModalUpdateContext()
    useEffect(()=>{
        console.log("changed")
        setModalState({isShown})
    },[isShown])
    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.keyCode == 27) {
                onClick && onClick()
                window.removeEventListener("keydown", onEsc);
            }
        };
        window.addEventListener("keydown", onEsc);
    }, []);


    return <>
            {
                isShown && <div className={`absolute h-screen w-screen left-0 bottom-0 z-[100] flex justify-center items-center backdrop-blur-sm overflow-hidden`} onClick={() => { onClick && onClick() }}>
                <div className={`bg-[#282828] flex flex-col justify-center items-center px-2 pb-2 rounded-xl ${className}`} onClick={(e) => { e.stopPropagation() }}>
                    <div className="flex flex-col px-4 py-2 my-2 w-full gap-5">
                        <div className="text-left text-white text-2xl font-bold mb-2">{title}</div>
                        {
                            props.children
                        }
                    </div>
                </div>
            </div>
            }  
        </>
}