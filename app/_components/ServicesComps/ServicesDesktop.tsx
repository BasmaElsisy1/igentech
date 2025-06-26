'use client';
import React, { useEffect, useState } from 'react'
import Arrow from '../svgs/Arrow'
import { AnimatePresence, motion } from 'framer-motion'
import { SingleService } from '../types'
import { Props } from '../Services'
import ServicesDesktopLoading from './ServicesDesktopLoading';

export default function ServicesDesktop({ data: { services } }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

    const getHeightClass = (index: number) => {
        if (index === activeIndex) return "h-[595px]";
        if (index === activeIndex - 1 || index === activeIndex + 1) return "h-[480px]";
        return "h-[400px]";
    };
    const handleNextClick = () => {
        setActiveIndex((prev) => (prev + 1) % services.length);
    };
    const handlePrevClick = () => {
        setActiveIndex((prev) =>
            prev === 0 ? services.length - 1 : prev - 1
        );
    };
    useEffect(() => {
        setHasRenderedOnce(true);
    }, []);
    return (
        <div className='relative'>
            <div className='flex flex-row gap-4 items-center justify-center h-[595px]'>
                {services.length > 0 ?
                    services.map((service: SingleService, index: number) => (
                        <div key={index}
                            role="button"
                            tabIndex={0}
                            onClick={() => setActiveIndex(index)}
                            className={`${activeIndex == index ? "lg:w-[893px] w-[700px]" : "w-[64px] justify-center"} transition-all duration-500 flex items-center rounded-[64px] ${getHeightClass(index)}`} style={{ background: `${service.service_color}` }}>
                            <h2 className={`${activeIndex == index ? " hidden" : "block"} transition-all duration-500 text-xl font-semibold text-primary -rotate-90 whitespace-nowrap p-4`}>{service.service_title}</h2>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        className="lg:p-[56px] p-10 space-y-10 "
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.6, delay: hasRenderedOnce ? 0.5 : 0 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
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
                    )) :
                    <>
                        <ServicesDesktopLoading index={0} height={getHeightClass(0)} />
                        <ServicesDesktopLoading index={1} height={getHeightClass(1)} />
                        <ServicesDesktopLoading index={2} height={getHeightClass(2)} />
                    </>
                }
            </div>
            <div className='flex lg:gap-3 gap-2 items-center justify-end absolute bottom-0 end-0'>
                <button
                    onClick={handlePrevClick}
                    className={`${activeIndex === 0 ? " pointer-events-none opacity-40" : ""} lg:w-12 lg:h-12 w-10 h-10 rotate-180`}>
                    <Arrow />
                </button>
                <button className={`${activeIndex === services.length - 1 ? " pointer-events-none opacity-40" : ""} lg:w-12 lg:h-12 w-10 h-10`}
                    onClick={handleNextClick}
                >
                    <Arrow />
                </button>
            </div>

        </div>

    )
}
