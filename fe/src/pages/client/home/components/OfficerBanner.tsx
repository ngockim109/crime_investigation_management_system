import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { OFFICER_BANNER_IMAGES } from "@/constants/home.constants"

const OfficerBanner: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() || 0)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() || 0)
    })
  }, [api])
  return (
    <div className="relative">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto mt-28 cursor-pointer"
      >
        <CarouselContent>
          {OFFICER_BANNER_IMAGES.map((_, index) => (
            <CarouselItem key={index}>
              <img
                src={OFFICER_BANNER_IMAGES[index]}
                alt={`Slide ${index + 1}`}
                className="object-cover rounded-2xl w-full h-[325px] md:h-[370px] lg:h-[415px] transition-transform duration-500 ease-in-out"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {OFFICER_BANNER_IMAGES.map((_, index) => (
            <div
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 cursor-pointer rounded-full ${current === index ? "bg-gray-500" : "bg-white"}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

export default OfficerBanner
