import { Gift, CheckCircle, Banknote } from "lucide-react";
import { useInView } from "react-intersection-observer";

const offers = [
  {
    icon: Gift,
    title: "Fully Furnished Homes",
    description: "Move in ready homes with premium furniture and fittings included",
    highlight: "Special Offer",
    bgColor: "from-primary/10 to-primary/5"
  },
  {
    icon: Banknote,
    title: "Easy Bank Loan Approval",
    description: "Pre-approved loans from all major banks with hassle-free processing",
    highlight: "100% Financing",
    bgColor: "from-secondary/10 to-secondary/5"
  }
];

const OffersSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`fade-in ${inView ? "visible" : ""}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Exclusive Offers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take advantage of our limited-time offers designed to make your dream home more affordable
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`offer-card fade-in ${inView ? "visible" : ""}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Highlight Badge */}
                <div className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  {offer.highlight}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <offer.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-foreground">{offer.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {offer.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    No hidden charges
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Immediate processing
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Expert assistance
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-strong p-8 max-w-4xl mx-auto border">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Limited Time Offers!
              </h3>
              <p className="text-lg mb-6 text-muted-foreground">
                These exclusive offers are available for a limited time. Contact us now to secure your dream home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    const element = document.getElementById("lead-form");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-hero-primary"
                >
                  Claim Offer Now
                </button>
                <a
                  href="tel:9655355525"
                  className="btn-hero-secondary"
                >
                  Call 9655355525
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;