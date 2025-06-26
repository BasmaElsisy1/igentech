import React from 'react'

export default function ServicesMobileLoading({ index, width }: { index: number, width: string, }) {
    return (
        <div
            className={` ${index == 0 ? "h-[220px]" : "h-[56px]"} transition-all duration-500 flex items-center flex-col rounded-[27px] ${width}`}>
        </div>
    )
}
