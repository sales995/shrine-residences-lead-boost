import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-grey text-white py-12 border-t border-gray-700">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Shriram Park 63</h3>
            <p className="text-sm text-gray-300 mb-4">
              Premium 3 BHK flats in a 57-acre integrated township on GST Road, Perungalathur, Chennai.
            </p>
            <p className="text-xs text-gray-400">
              RERA: TN/01/Building/0072/2018
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-gray-300 hover:text-secondary transition-colors">About Project</a>
              </li>
              <li>
                <a href="#features" className="text-gray-300 hover:text-secondary transition-colors">Features</a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-secondary transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-secondary transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+919655355525" className="text-gray-300 hover:text-secondary transition-colors">
                    +91 96553 55525
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:info@shrirampark63.com" className="text-gray-300 hover:text-secondary transition-colors">
                    info@shrirampark63.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  GST Road, Perungalathur,<br />Chennai, Tamil Nadu
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed hover:opacity-60 transition-opacity" aria-label="Shriram Properties Facebook page">
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed hover:opacity-60 transition-opacity" aria-label="Shriram Properties Instagram page">
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed hover:opacity-60 transition-opacity" aria-label="Shriram Properties LinkedIn page">
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
            <p className="text-xs text-gray-400">
              Stay updated with our latest offers and news.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 p-6 bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2 text-secondary">Important Disclaimer</h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong>Disclaimer:</strong> Images and dimensions are indicative and for representational purposes only. 
            Offers, prices, and specifications are subject to change without notice. Please contact our sales team at 
            <a href="tel:+919655355525" className="text-secondary hover:text-secondary-hover mx-1">+91 96553 55525</a> 
            for the latest updates, accurate pricing, and current availability. All information should be verified before making any purchase decisions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Shriram Park 63. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link to="/privacy-policy" className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-secondary transition-colors">RERA Information</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
