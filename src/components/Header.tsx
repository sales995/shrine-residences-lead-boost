import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <div className="text-xl md:text-2xl font-bold text-white">
                SHRIRAM PARK 63
              </div>
              <div className="text-xs text-accent">
                Perungalathur, Chennai
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-white hover:text-accent transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-white hover:text-accent transition-colors font-medium"
            >
              Project Highlights
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-accent transition-colors font-medium"
            >
              Location Advantages
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-white hover:text-accent transition-colors font-medium"
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-accent transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button & Phone */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="tel:+919655355525"
              className="flex items-center text-accent hover:text-white transition-colors font-semibold"
            >
              <Phone className="w-4 h-4 mr-2" />
              +91 9655355525
            </a>
            <Button
              onClick={() => scrollToSection("lead-form-hero")}
              className="btn-hero-primary"
            >
              Get Price List
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-accent/20">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-left text-white hover:text-accent transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-left text-white hover:text-accent transition-colors font-medium"
              >
                Project Highlights
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-white hover:text-accent transition-colors font-medium"
              >
                Location Advantages
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-left text-white hover:text-accent transition-colors font-medium"
              >
                Amenities
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-white hover:text-accent transition-colors font-medium"
              >
                Contact
              </button>
              <a 
                href="tel:+919655355525"
                className="flex items-center text-accent hover:text-white transition-colors font-semibold"
              >
                <Phone className="w-4 h-4 mr-2" />
                +91 9655355525
              </a>
              <Button
                onClick={() => scrollToSection("lead-form-hero")}
                className="btn-hero-primary w-full"
              >
                Get Price List
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;