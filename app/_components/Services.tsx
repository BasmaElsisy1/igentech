'use client'
import { useEffect, useState } from 'react';
import ServicesDesktop from './ServicesComps/ServicesDesktop';
import ServicesMobile from './ServicesComps/ServicesMobile';
import { SingleService } from './types';

export interface Props {
    data: {
        services: SingleService[]
    }
}

export default function Services({ data }: Props) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        handleResize(); 
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className=' h-[100vh] content-center max-w-[1440px] xl:px-20 px-4'>
            {isDesktop ?
                <ServicesDesktop data={data} /> :
                <ServicesMobile data={data} />
            }
        </div>
    )
}
