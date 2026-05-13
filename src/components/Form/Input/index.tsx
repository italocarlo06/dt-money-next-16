import { InputHTMLAttributes ,forwardRef } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string  
}

export const Input = forwardRef<HTMLInputElement,IInputProps>(({ error, className, ...rest }, ref) => {
    return (
        <div className="flex flex-col gap-1">
           <input 
              ref={ref} 
              {...rest} 
              className={`w-full h-16 px-6 py-5 bg-background text-input text-normal border border-input-border rounded-md placeholder-input focus:border-primary ${error? "border-red-500": ""} ${className || ""} ` }
            /> 
            {error && <span className="text-red-500 text-sm px-2">{error}</span>}
        </div>
    )
})

Input.displayName = "Input"