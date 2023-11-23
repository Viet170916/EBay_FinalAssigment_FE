"use client"

import {Carousel} from 'react-responsive-carousel'
import  "react-responsive-carousel/lib/styles/carousel.min.css"
import Banner1 from '../../../public/images/banner/1.png'
import Banner2 from '../../../public/images/banner/2.png'
import Banner3 from '../../../public/images/banner/3.png'
import Image from 'next/image'
export default function CarouselComp(){
    return(
        <>
            <div className='max-w-[1200px] mx-auto'>
                <Carousel showArrows={true} autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false} showIndicators={false} showStatus={false}>
                    <div>
                        <Image src={Banner1}/>
                    </div>
                    <div>
                        <Image src={Banner2}/>
                    </div>
                    <div>
                        <Image src={Banner3}/>
                    </div>
                </Carousel>
            </div>
        </>
    )
}