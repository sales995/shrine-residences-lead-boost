import { Button } from "@/components/ui/button";
import { Download, ArrowDown } from "lucide-react";
import { useInView } from "react-intersection-observer";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.7)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <div className={`fade-in ${inView ? "visible" : ""}`}>
          {/* Highlight Strip */}
          <div className="inline-block bg-secondary text-secondary-foreground px-6 py-2 rounded-full mb-6 animate-pulse font-semibold">
            🎉 Get Additional Offers - Limited Time!
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Luxury Living at<br />
            <span className="text-secondary">Shriram Residences</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Spacious 3 & 4 BHK Homes with Premium Amenities
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToForm}
              className="btn-hero-primary text-lg px-8 py-4"
            >
              Enquire Now
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              onClick={() => window.open("#", "_blank")}
              className="btn-hero-secondary text-lg px-8 py-4"
            >
              <Download className="mr-2 w-5 h-5" />
              Download Brochure
            </Button>
            
            <Button
              onClick={scrollToForm}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
            >
              <Download className="mr-2 w-5 h-5" />
              Download Floor Plan
            </Button>
          </div>

          {/* Key Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Premium Location</h3>
              <p className="text-sm opacity-90">Prime connectivity to IT parks & schools</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">World-Class Amenities</h3>
              <p className="text-sm opacity-90">Clubhouse, pool, gym & more</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Ready to Move</h3>
              <p className="text-sm opacity-90">Fully furnished options available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
};

export default HeroSection;