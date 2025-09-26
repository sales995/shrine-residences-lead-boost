import { Star } from "lucide-react";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "IT Professional",
    text: "Absolutely love living at Shriram Residences. The amenities are world-class and the location is perfect for my daily commute. The management is very responsive and professional.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Marketing Manager",
    text: "The fully furnished apartment saved us so much time and effort. Everything is of premium quality and the community is very welcoming. Highly recommend Shriram Residences!",
    rating: 5
  },
  {
    name: "Amit Patel",
    role: "Business Owner",
    text: "The investment has been excellent. Great appreciation in property value and the rental demand is very high due to the prime location and amazing facilities.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 md:py-24 bg-light-grey">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`fade-in ${inView ? "visible" : ""}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              What Our Residents Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our happy residents have to say about their experience
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 fade-in ${inView ? "visible" : ""}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground text-lg leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-foreground text-lg">{testimonial.name}</h4>
                  <p className="text-primary text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-soft">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Happy Families</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">4.8/5</div>
                  <p className="text-muted-foreground">Average Rating</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-muted-foreground">Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;