import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Post } from "types/blog";
import { NavigationButton } from "./NavigationButton";
import { CardComponent } from "./CardComponent";
import styles from "./CarouselComponent.module.css";

interface CarouselComponentProps {
  posts: Post[];
  detailPath: string;
}

/**
 * CarouselComponent
 *
 * Shared carousel wrapper using Swiper 10.x.
 * Accepts posts array and detail path for link generation.
 * Handles responsive breakpoints, autoplay, loop, and custom navigation.
 * Transparent background for Wix dark theme iframe embedding.
 */
export const CarouselComponent: React.FC<CarouselComponentProps> = ({
  posts,
  detailPath,
}) => {
  if (posts.length === 0) {
    return <div className={styles.emptyContainer} />;
  }

  return (
    <div className={styles.container}>
      <NavigationButton direction="prev" className={`carousel-prev ${styles.navPrev}`} />

      <Swiper
        modules={[Navigation, Autoplay, A11y]}
        loop={posts.length > 4}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        spaceBetween={16}
        slidesPerView={4}
        navigation={{
          nextEl: ".carousel-next",
          prevEl: ".carousel-prev",
        }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 8 },
          640: { slidesPerView: 2, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1280: { slidesPerView: 4, spaceBetween: 16 },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <CardComponent post={post} detailPath={detailPath} />
          </SwiperSlide>
        ))}
      </Swiper>

      <NavigationButton direction="next" className={`carousel-next ${styles.navNext}`} />
    </div>
  );
};

export default CarouselComponent;
