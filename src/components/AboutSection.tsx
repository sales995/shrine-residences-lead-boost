import { MapPin, Plane, Train, Bus, Building2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import aboutImage from "@/assets/about-connectivity.jpg";

const connectivity = [
  {
    icon: Train,
    name: "Tambaram Railway Station",
    distance: "3.7 km",
    color: "text-green-600"
  },
  {
    icon: MapPin,
    name: "Outer Ring Road",
    distance: "5.8 km",
    color: "text-blue-600"
  },
  {
    icon: Bus,
    name: "Kilambakkam Bus Terminus",
    distance: "7.5 km",
    color: "text-orange-600"
  },
  {
    icon: Plane,
    name: "Chennai International Airport",
    distance: "11.8 km",
    color: "text-purple-600"
  }
];

const AboutSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`slide-in-left ${inView ? "visible" : ""}`}>
            <div className="relative">
              <img
                src={aboutImage}
                alt="Shriram Park 63 Perungalathur location map showing connectivity to GST Road, Tambaram, and major transport hubs in Chennai"
                className="rounded-2xl shadow-strong w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className={`slide-in-right ${inView ? "visible" : ""}`}>
            <div className="mb-6">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Shriram Park 63<br />
                <span className="text-accent">Location Advantages</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Strategically located on GST Road in Perungalathur, Chennai, Shriram Park 63 offers unparalleled connectivity to all major business hubs, educational institutions, and entertainment zones. Experience the perfect balance of peaceful living and urban accessibility.
              </p>
            </div>

            {/* Connectivity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {connectivity.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors fade-in ${inView ? "visible" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 ${item.color} bg-current/10 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.distance}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Features */}
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-6 border-2 border-accent/20">
              <h3 className="text-xl font-semibold mb-4 text-primary">Key Location Benefits</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-accent flex-shrink-0 mt-0.5" />
                  <span>Direct access to GST Road - Chennai's major arterial road</span>
                </li>
                <li className="flex items-start">
                  <Building2 className="w-5 h-5 mr-2 text-accent flex-shrink-0 mt-0.5" />
                  <span>Close to IT corridor and business districts</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-accent flex-shrink-0 mt-0.5" />
                  <span>Surrounded by top schools, colleges, and hospitals</span>
                </li>
                <li className="flex items-start">
                  <Building2 className="w-5 h-5 mr-2 text-accent flex-shrink-0 mt-0.5" />
                  <span>Shopping malls and entertainment centers nearby</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
