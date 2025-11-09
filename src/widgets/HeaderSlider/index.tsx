import React from 'react';

import styles from './index.module.scss';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import slideImg1 from '@/shared/assets/images/headerSlider/slide_1.webp';
import slideImg2 from '@/shared/assets/images/headerSlider/slide_2.webp';
import slideImg3 from '@/shared/assets/images/headerSlider/slide_3.webp';

const slides = [
  {
    image: slideImg1.src,
    title: 'Up to 50% off new arrivals',
    text: 'This week only — don’t miss out'
  },
  {
    image: slideImg2.src,
    title: 'Electronics −30%',
    text: 'Phones, laptops and accessories at great prices'
  },
  {
    image: slideImg3.src,
    title: 'Bonus points & cashback',
    text: 'Earn up to 10% back on every purchase'
  }
];

const HeaderSlider = () => {
  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        loop
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className={styles.swiperSlide}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '500px'
            }}
          >
            <div className={styles.overlay}></div>
            <div className={styles.content}>
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeaderSlider;
