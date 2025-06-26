import React from 'react'

export default function ServicesDesktopLoading({index, height}:{index:number,height:string,}) {
    return (
        <div 
            className={`${index == 0 ? "lg:w-[893px] w-[700px]" : "w-[64px] justify-center"} transition-all duration-500 flex items-center rounded-[64px] ${height} bg-gray-300 animate-pulse`} >
        </div>
    )
}
