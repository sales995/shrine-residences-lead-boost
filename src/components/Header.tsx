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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-primary">
              Shriram Residences
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button & Phone */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:9655355525"
              className="flex items-center text-primary hover:text-primary-hover transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              9655355525
            </a>
            <Button
              onClick={() => scrollToSection("lead-form")}
              className="btn-hero-primary"
            >
              Enquire Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Amenities
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
              <a 
                href="tel:9655355525"
                className="flex items-center text-primary hover:text-primary-hover transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                9655355525
              </a>
              <Button
                onClick={() => scrollToSection("lead-form")}
                className="btn-hero-primary w-full"
              >
                Enquire Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;