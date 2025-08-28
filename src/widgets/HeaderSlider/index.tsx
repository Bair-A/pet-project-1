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
    title: 'Заголовок 1',
    text: 'Текст слайда 1'
  },
  {
    image: slideImg2.src,
    title: 'Заголовок 2',
    text: 'Текст слайда 2'
  },
  {
    image: slideImg3.src,
    title: 'Заголовок 3',
    text: 'Текст слайда 3'
  }
];

const HeaderSlider = () => {
  return (
    <div style={{ width: '100%', maxHeight: '500px', overflow: 'hidden' }}>
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
