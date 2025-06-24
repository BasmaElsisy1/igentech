'use client';
import React, { useEffect, useState } from 'react'
import Arrow from '../svgs/Arrow'
import { AnimatePresence, motion } from 'framer-motion'
import { SingleService } from '../types'
import { Props } from '../Services'

export default function ServicesDesktop({ data }: Props) {
    const [Active, setActive] = useState(0);
    const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

    const getHeightClass = (index: number) => {
        if (index === Active) return "h-[595px]";
        if (index === Active - 1 || index === Active + 1) return "h-[480px]";
        return "h-[320px]";
    };
    const NextClick = () => {
        setActive((prev) => (prev + 1) % data.services.length);
    };
    const PrevClick = () => {
        setActive((prev) =>
            prev === 0 ? data.services.length - 1 : prev - 1
        );
    };
    useEffect(() => {
        setHasRenderedOnce(true);
    }, []);
    return (
        <div className='relative'>
            <div className='flex gap-4 items-center justify-center h-[595px]'>
                {data.services.map((service: SingleService, index: number) => (
                    <div key={index}
                        className={`${Active == index ? "lg:w-[893px] w-[700px]" : "w-[64px] justify-center"} transition-all duration-500 flex items-center rounded-[64px] ${getHeightClass(index)}`} style={{ background: `${service.service_color}` }}>
                        <h2 className={`${Active == index ? " hidden" : "block"} transition-all duration-500 text-xl font-semibold text-primary -rotate-90 whitespace-nowrap p-4`}>{service.service_title}</h2>
                        <AnimatePresence>
                            {Active === index && (
                                <motion.div
                                    className="lg:p-[56px] p-10 space-y-10 "
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: hasRenderedOnce ? 0.5 : 0 } }}
                                    exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                                >
                                    <motion.h3
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.5, delay: hasRenderedOnce ? 0.6 : 0.1 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                        className="text-primary lg:text-[40px] text-3xl font-bold">
                                        {service.service_title}
                                    </motion.h3>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.4, delay: hasRenderedOnce ? 0.7 : 0.2 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                        className="max-w-[464px] text-primary text-lg"
                                        dangerouslySetInnerHTML={{ __html: service.service_description }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
            <div className='flex lg:gap-3 gap-2 items-center justify-end absolute bottom-0 end-0'>
                <button
                    onClick={PrevClick}
                    className={`${Active === 0 ? " pointer-events-none opacity-40" : ""} lg:w-12 lg:h-12 w-10 h-10 rotate-180`}>
                    <Arrow />
                </button>
                <button className={`${Active === data.services.length - 1 ? " pointer-events-none opacity-40" : ""} lg:w-12 lg:h-12 w-10 h-10`}
                    onClick={NextClick}
                >
                    <Arrow />
                </button>
            </div>

        </div>

    )
}
