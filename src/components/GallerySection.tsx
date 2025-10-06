import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { OptimizedImage } from "./OptimizedImage";
import buildingAerial1 from "@/assets/building-aerial-1.jpg";
import buildingAerial2 from "@/assets/building-aerial-2.jpg";
import buildingForestView from "@/assets/building-forest-view.jpg";
import buildingEvening from "@/assets/building-evening.jpg";
import amenitiesPlayground from "@/assets/amenities-playground.jpg";

const galleryImages = [
  {
    src: buildingAerial1,
    title: "Shriram Park 63 Aerial View",
    description: "Premium residential towers with solar panels on GST Road, Perungalathur",
    alt: "Shriram Park 63 Perungalathur aerial view showing residential towers with solar panels and amenities"
  },
  {
    src: buildingAerial2,
    title: "Township & Sports Facilities",
    description: "57-acre integrated township with tennis and badminton courts",
    alt: "Shriram Park 63 aerial view showcasing sports facilities including tennis courts and residential towers"
  },
  {
    src: buildingForestView,
    title: "Vandalur Forest Reserve View",
    description: "Apartments overlooking 1350-acre Vandalur Forest Reserve",
    alt: "Shriram Park 63 residential towers with stunning view of Vandalur Forest Reserve from balconies"
  },
  {
    src: buildingEvening,
    title: "GST Road Connectivity",
    description: "Prime location on GST Road with excellent connectivity",
    alt: "Shriram Park 63 evening view showing location on GST Road Perungalathur with highway connectivity"
  },
  {
    src: amenitiesPlayground,
    title: "Children's Play Area & Landscaping",
    description: "Dedicated children's play area with colorful equipment and landscaped gardens",
    alt: "Shriram Park 63 children's play area with slides, swings and landscaped gardens"
  }
];

const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`fade-in ${inView ? "visible" : ""}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Shriram Park 63 Amenities Gallery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the premium amenities and world-class infrastructure at Shriram Park 63 Perungalathur
            </p>
          </div>

          {/* Gallery Slider */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-strong">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                  }`}
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    priority={index === 0}
                    width={1200}
                    height={600}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Image Info */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{image.title}</h3>
                    <p className="text-lg opacity-90">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Previous gallery image"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Next gallery image"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`View gallery image ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : "false"}
                />
              ))}
            </div>
          </div>

          {/* Gallery Grid - Thumbnails */}
          <div className="mt-12 grid grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative h-24 md:h-32 rounded-lg overflow-hidden hover:scale-105 transition-transform ${
                  index === currentIndex ? "ring-4 ring-primary" : ""
                }`}
                aria-label={`View ${image.title}`}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={200}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;