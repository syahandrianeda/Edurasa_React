import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

export function Fields({className,  ...props}:ComponentProps<'div'>){
    return (
        <div 
            className={cn("relative", className)}
            {...props}
            />
    )
}

export function SelectField({ labelSelect,className, children,...props}:ComponentProps<'select'>&{
    labelSelect: string
}){
    return (   
        <>
            <select
                    className={cn("mb-2 peer bg-white dark:bg-gray-700 focus:peer-text-sky-100 focus-visible:ring-0 ring-0 outline-0 border-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 scrol-h-custom", className)}
                    {...props}
                    >
                        {children}
            </select>
            <label htmlFor={props.id as string} className={cn("absolute text-sm bg-white dark:text-gray-400 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 duration-300 transform -translate-y-4 rounded-3xl scale-75 top-2 z-10 origin-left  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",className)}>
                    {labelSelect}
            </label>
        </>         
    )
}

export function InputText ({ label, labelClassName, className, type='text', children, ...props}:ComponentProps<'input'>&{
    label: string,
    labelClassName?: string
}){
    return (
        <>
            <input 
                type={type}
                className={cn("block px-2.5 pb-2 pt-2 w-full text-sm text-gray-900 rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer",className)}
                {...props}
            />
            <label htmlFor={props.id} className={cn("absolute rounded-t-xl text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-left bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-[calc(100%-12px)] peer-focus:w-auto peer-focus:top-1 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",labelClassName)}>
                {label} 
            </label>
        </>
    )
}

