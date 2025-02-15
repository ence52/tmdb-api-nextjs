import React, { FC, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { API_W780_PHOTO_URL } from "@/services/Constants";
import { MediaImages } from "@/types/MediaImages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ImagesSlider: FC<{ images: MediaImages }> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {images && (
        <Swiper
          spaceBetween={2}
          slidesPerView={4.3}
          modules={[Navigation, Pagination]}
          loop={false}
          breakpoints={{
            320: { slidesPerView: 2.3, spaceBetween: 10 },
            480: { slidesPerView: 2.6, spaceBetween: 15 },
            640: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 3.8, spaceBetween: 20 },
            1280: { slidesPerView: 4.3, spaceBetween: 20 },
          }}
        >
          {images.posters.slice(0, 5).map((image, i) => (
            <SwiperSlide key={i} className="select-none">
              <div
                className="aspect-[2/3] relative h-full cursor-pointer"
                onClick={() =>
                  setSelectedImage(API_W780_PHOTO_URL + image.file_path)
                }
              >
                <Image
                  src={API_W780_PHOTO_URL + image.file_path}
                  fill
                  unoptimized
                  loading="lazy"
                  className="contrast-125 object-cover blur-0 transition-all duration-500 rounded-xl"
                  alt={`photo-${i}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 modal-overlay">
          <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full z-50 pointer-events-auto"
              onClick={handleCloseModal}
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>

            <Image
              src={selectedImage}
              alt="Selected"
              layout="fill"
              unoptimized
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesSlider;
