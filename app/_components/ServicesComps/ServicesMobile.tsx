'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Props } from '../Services';
import { SingleService } from '../types';
import ServicesMobileLoading from './ServicesMobileLoading';

export default function ServicesMobile({ data: { services } }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

    const getWidth = (index: number) => {
        if (index === activeIndex) return "w-full";
        if (index === activeIndex - 1 || index === activeIndex + 1) return "w-[90%]";
        return "w-[80%]";
    };
    useEffect(() => {
        setHasRenderedOnce(true);
    }, []);
    return (
        <div className='relative'>
            <div className='flex gap-2 items-center justify-center flex-col'>
                {services.length > 0 ? services.map((service: SingleService, index: number) => (
                    <motion.div key={index}
                        layout
                        transition={{ duration: 0.5, type: 'spring' }}
                        onClick={() => setActiveIndex(index)}
                        role="button"
                        tabIndex={0}
                        aria-expanded={activeIndex === index}
                        className={` transition-all duration-500 flex items-center flex-col rounded-[27px] ${getWidth(index)}`} style={{ background: `${service.service_color}` }}>
                        <h2
                            className={`
                                transition-all duration-500 text-center w-full text-base font-semibold text-primary whitespace-nowrap overflow-hidden p-4
                                ${activeIndex === index ? " absolute opacity-0" : " opacity-100"}
                            `}
                        >
                            {service.service_title}
                        </h2>

                        <motion.div
                            className={`overflow-hidden`}
                            initial={false}
                            animate={activeIndex === index ? { height: "auto" } : { height: 0 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
                        >
                            <div className='space-y-6 p-6 w-full'>
                                <motion.h3
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 0.2, delay: hasRenderedOnce ? 0.2 : 0.1 } }}
                                    exit={{ opacity: 0, transition: { duration: 0.01 } }}
                                    className="text-primary text-lg font-bold"
                                >
                                    {service.service_title}
                                </motion.h3>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 0.2, delay: hasRenderedOnce ? 0.2 : 0.2 } }}
                                    exit={{ opacity: 0, transition: { duration: 0.01 } }}
                                    className=" text-primary text-base"
                                    dangerouslySetInnerHTML={{ __html: service.service_description }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )) :
                    <>
                        <ServicesMobileLoading index={0} width={getWidth(0)} />
                        <ServicesMobileLoading index={1} width={getWidth(1)} />
                        <ServicesMobileLoading index={2} width={getWidth(2)} />
                    </>
                }
            </div>
        </div>

    )
}
