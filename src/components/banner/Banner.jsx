import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { images } from "./data";

function Banner() {
	return (
		<div className="relative w-full h-[45vh] overflow-hidden">
			<Carousel
				autoPlay
				infiniteLoop
				showStatus={false}
				showIndicators={false}
				showThumbs={false}
				interval={5000}
				className="relative h-full"
			>
				{images.map((imageItemLink, index) => (
					<div key={index} className="relative w-full">
						<img
							src={imageItemLink}
							alt={`Image ${index + 1}`}
							className="w-full h-full"
						/>
						<div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-100 to-transparent z-20" />
					</div>
				))}
			</Carousel>
		</div>
	);
}

export default Banner;
