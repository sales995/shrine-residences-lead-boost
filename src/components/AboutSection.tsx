import { MapPin, GraduationCap, Building2, Heart, Car } from "lucide-react";
import { useInView } from "react-intersection-observer";
import aboutImage from "@/assets/about-connectivity.jpg";

const connectivity = [
  {
    icon: GraduationCap,
    name: "Schools",
    distance: "1.2 km",
    color: "text-blue-600"
  },
  {
    icon: Building2,
    name: "Colleges",
    distance: "2.3 km",
    color: "text-green-600"
  },
  {
    icon: Heart,
    name: "Hospitals",
    distance: "1.8 km",
    color: "text-red-600"
  },
  {
    icon: Building2,
    name: "IT Parks",
    distance: "3.5 km",
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
                alt="Shriram Residences Location"
                className="rounded-2xl shadow-strong w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className={`slide-in-right ${inView ? "visible" : ""}`}>
            <div className="mb-6">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Perfect Location &<br />
                <span className="text-primary">Connectivity</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Strategically located in the heart of the city, Shriram Residences offers unmatched connectivity to all major landmarks. Experience the perfect blend of tranquil living and urban convenience.
              </p>
            </div>

            {/* Connectivity Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {connectivity.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors fade-in ${inView ? "visible" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 ${item.color} bg-current/10 rounded-full flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.distance}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Features */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Location Advantages</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  Direct metro connectivity (500m)
                </li>
                <li className="flex items-center">
                  <Car className="w-4 h-4 mr-2 text-primary" />
                  Major highways within 2km
                </li>
                <li className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-primary" />
                  Shopping malls nearby
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