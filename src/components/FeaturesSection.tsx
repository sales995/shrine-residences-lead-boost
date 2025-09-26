import { Home, Waves, Shield, Trees, Car, Dumbbell, Users, Gamepad2 } from "lucide-react";
import { useInView } from "react-intersection-observer";

const features = [
  {
    icon: Home,
    title: "Clubhouse",
    description: "Premium clubhouse with modern amenities and social spaces"
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Olympic-size swimming pool with separate kids pool"
  },
  {
    icon: Shield,
    title: "24x7 Security",
    description: "Round-the-clock security with CCTV surveillance"
  },
  {
    icon: Trees,
    title: "Green Spaces",
    description: "Beautifully landscaped gardens and open spaces"
  },
  {
    icon: Car,
    title: "Covered Parking",
    description: "Secure covered parking for all residents"
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "State-of-the-art gymnasium with modern equipment"
  },
  {
    icon: Users,
    title: "Community Hall",
    description: "Spacious hall for events and gatherings"
  },
  {
    icon: Gamepad2,
    title: "Kids Play Area",
    description: "Safe and fun play area for children"
  }
];

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-16 md:py-24 bg-light-grey">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`fade-in ${inView ? "visible" : ""}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Premium Amenities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience luxury living with world-class facilities designed for your comfort and convenience
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card fade-in ${inView ? "visible" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary to-primary-hover text-white rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Experience Luxury Living?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Book your site visit today and explore these amazing amenities in person
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById("lead-form");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Site Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;