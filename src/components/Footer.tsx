import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-grey text-white py-8 border-t border-gray-700">
      <div className="container mx-auto px-4">
        {/* Disclaimer */}
        <div className="mb-8 p-6 bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2 text-secondary">Important Disclaimer</h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong>Disclaimer:</strong> Images and dimensions are indicative and for representational purposes only. 
            Offers, prices, and specifications are subject to change without notice. Please contact our sales team at 
            <a href="tel:+91 96553 55525" className="text-secondary hover:text-secondary-hover mx-1">+91 96553 55525</a> 
            for the latest updates, accurate pricing, and current availability. All information should be verified before making any purchase decisions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Copyright */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
            <div className="text-xl font-bold text-white">Shriram Residences</div>
            <div className="text-sm text-gray-400">
              © {currentYear} Shriram Residences. All rights reserved.
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 mr-2">Follow us:</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed">
              <Facebook className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed">
              <Instagram className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed">
              <Linkedin className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-400">
            <button className="hover:text-secondary transition-colors">Privacy Policy</button>
            <button className="hover:text-secondary transition-colors">Terms of Service</button>
            <button className="hover:text-secondary transition-colors">RERA Information</button>
            <a href="tel:=91 96553 55525" className="hover:text-secondary transition-colors">
              Contact: +91 96553 55525
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
