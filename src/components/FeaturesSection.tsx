import { Home, Building2, Trees, MapPin, Shield, Users, Activity, Sparkles } from "lucide-react";
import { useInView } from "react-intersection-observer";

const highlights = [
  {
    icon: Building2,
    title: "57-Acre Township",
    description: "Expansive premium township with world-class infrastructure"
  },
  {
    icon: Trees,
    title: "1350-Acre Forest Reserve",
    description: "Overlooking the serene Vandalur Forest Reserve"
  },
  {
    icon: Home,
    title: "40+ State-of-the-Art Amenities",
    description: "Clubhouse, pool, gym, library, mini theatre, and more"
  },
  {
    icon: MapPin,
    title: "On GST Road",
    description: "Prime location on GST Road, Perungalathur, Chennai"
  },
  {
    icon: Shield,
    title: "RERA Approved",
    description: "TN/01/Building/0072/2018 - Fully compliant project"
  },
  {
    icon: Users,
    title: "1000+ Happy Families",
    description: "Join a thriving community of satisfied residents"
  },
  {
    icon: Activity,
    title: "Ready-to-Move Homes",
    description: "Fully furnished options available for immediate occupation"
  },
  {
    icon: Sparkles,
    title: "3 BED Homes at ₹1.62 CR*",
    description: "Competitive pricing with bank loan approval support"
  }
];

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-16 md:py-24 bg-neutral-bg">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`fade-in ${inView ? "visible" : ""}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Shriram Park 63 Project Highlights
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the exceptional features that make Shriram Park 63 the perfect choice for luxury living
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className={`feature-card fade-in ${inView ? "visible" : ""} bg-white`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <highlight.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-primary">{highlight.title}</h3>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary to-primary-variant text-white rounded-2xl p-8 max-w-4xl mx-auto shadow-strong">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Exclusive Offer: GST Waiver & 90% Bank Loan Approved
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Limited period offer on Shriram Park 63 flats. Don't miss this opportunity!
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById("lead-form-hero");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-hero-primary text-lg"
              >
                Get Latest Price List Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
