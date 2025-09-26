import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const galleryImages = [
  {
    src: gallery1,
    title: "Exterior View",
    description: "Modern luxury residential complex with premium amenities"
  },
  {
    src: gallery2,
    title: "Interior Design",
    description: "Spacious 3BHK apartment with contemporary furnishing"
  },
  {
    src: gallery3,
    title: "Amenities",
    description: "World-class facilities including pool and clubhouse"
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
              Project Gallery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take a virtual tour of Shriram Residences and discover the luxury that awaits you
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
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
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
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
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
                />
              ))}
            </div>
          </div>

          {/* Gallery Grid - Thumbnails */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative h-24 md:h-32 rounded-lg overflow-hidden hover:scale-105 transition-transform ${
                  index === currentIndex ? "ring-4 ring-primary" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
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