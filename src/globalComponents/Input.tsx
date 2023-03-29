import { ForwardedRef, forwardRef } from "react";
import type { ChangeEvent } from "react";
type InputProps = {
    type?: string,
    name?: string,
    accept?: string,
    id?: string,
    minLength?: number,
    className?: string
    required?: boolean
    value?: string
    defaultValue?: string
    expand?: boolean
    readonly?: boolean
    autoComplete?: "off" | "on"
    placeholder?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref: ForwardedRef<HTMLInputElement> | undefined) => {
    const REF = ref || null
    const { type, id, minLength, placeholder, className, name, accept, required, value, onChange, defaultValue, expand, autoComplete, readonly } = props;

    return <input ref={REF}
        name={name || ""}
        value={value}
        type={type || "text"}
        id={id || ""}
        accept={accept}
        onChange={(e) => {
            e.stopPropagation();
            if (onChange) {
                onChange(e)
            }
        }}
        required={required || false}
        minLength={minLength || 0}
        readOnly={readonly}
        defaultValue={defaultValue}
        autoComplete={autoComplete || "off"}
        placeholder={placeholder || ""}
        className={`form-control block w-full px-4 py-2 mb-2 md:mb-0 md:mr-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${className}`}></input>
})
Input.displayName = "Input";
export default Input;