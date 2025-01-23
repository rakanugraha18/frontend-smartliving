import Carousel from "../../molecules/Carousel";
import Slider1 from "../../../assets/images/slider/Slider1.png";
import Slider2 from "../../../assets/images/slider/Slider2.png";
import Slider3 from "../../../assets/images/slider/Slider3.png";
import Slider4 from "../../../assets/images/slider/Slider4.png";

const sliders = [Slider1, Slider2, Slider3, Slider4];

export default function Sliders2() {
  return (
    <div className="md:h-full w-full mx-4 mt-3">
      <Carousel autoSlide={true} autoSlideInterval={3000}>
        {sliders.map((slider, index) => (
          <img
            key={index}
            src={slider}
            alt={`Slider ${index + 1}`}
            className="w-full h-auto"
          />
        ))}
      </Carousel>
    </div>
  );
}
