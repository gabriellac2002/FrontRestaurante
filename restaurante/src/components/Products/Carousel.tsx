import { Carousel } from "@mantine/carousel";

export default function CustomCarousel() {
    return (
      <Carousel
        slideSize="70%"
        height={200}
        slideGap="xs"
        controlsOffset="xs"
        controlSize={14}
        withControls={false}
      >
        <Carousel.Slide>
          
        </Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel>
    );
}