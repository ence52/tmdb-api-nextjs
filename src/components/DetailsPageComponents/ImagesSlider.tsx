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
          slidesPerView={1.3}
          modules={[Navigation, Pagination]}
          loop={false}
        >
          {images.backdrops.slice(0, 5).map((image, i) => (
            <SwiperSlide key={i} className="select-none">
              <div
                className="aspect-video relative w-full cursor-pointer"
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
              loading="lazy"
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
