import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { useInView } from "react-intersection-observer";

const ContactSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-16 md:py-24 bg-dark-grey text-white">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`fade-in ${inView ? "visible" : ""}`}>
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Company Info */}
            <div className={`slide-in-left ${inView ? "visible" : ""}`}>
              <h3 className="text-2xl font-bold mb-6">Shriram Residences</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Creating premium living spaces that blend luxury, comfort, and convenience. Your dream home awaits at Shriram Residences.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className={`fade-in ${inView ? "visible" : ""}`} style={{ animationDelay: "0.2s" }}>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-secondary mr-4 mt-1" />
                  <div>
                    <p className="font-semibold">Call Us</p>
                    <a href="tel:9655355525" className="text-gray-300 hover:text-secondary transition-colors">
                      +91 9655355525
                    </a>
                  </div>
                </div>
                
                {/* <div className="flex items-start">
                  <Mail className="w-6 h-6 text-secondary mr-4 mt-1" />
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <a href="mailto:info@shriramresidences.com" className="text-gray-300 hover:text-secondary transition-colors">
                      info@shriramresidences.com
                    </a>
                  </div>
                </div> */}
                
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-secondary mr-4 mt-1" />
                  <div>
                    <p className="font-semibold">Visit Us</p>
                    <p className="text-gray-300">
                      Shriram Residencies<br />
                      No.16 GST Road, Opp. Perungalathur Railway Station<br />
                      New Perungalathur, Chennai-63
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className={`slide-in-right ${inView ? "visible" : ""}`}>
              <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const element = document.getElementById("hero");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block text-gray-300 hover:text-secondary transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("features");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block text-gray-300 hover:text-secondary transition-colors"
                >
                  Amenities
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("about");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block text-gray-300 hover:text-secondary transition-colors"
                >
                  Location
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("gallery");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block text-gray-300 hover:text-secondary transition-colors"
                >
                  Gallery
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("lead-form");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block text-gray-300 hover:text-secondary transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="mt-16 text-center border-t border-gray-700 pt-8">
            <h3 className="text-xl font-bold mb-4">Office Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-gray-300">
              <div>
                <p className="font-semibold">Monday - Saturday</p>
                <p>9:00 AM - 7:00 PM</p>
              </div>
              <div>
                <p className="font-semibold">Sunday</p>
                <p>10:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
