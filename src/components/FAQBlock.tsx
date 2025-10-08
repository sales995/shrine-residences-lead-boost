import React from "react";

export default function FAQBlock() {
  const faqs = [
    {
      question: "Is Shriram Park 63 close to major office locations?",
      answer: "Shriram Park 63 is on GST Road, Perungalathur, with easy access to Tambaram, MEPZ IT Park and OMR via ORR — ideal for professionals."
    },
    {
      question: "Are there reputed schools and colleges nearby?",
      answer: "Nearby institutions include SRM Institute of Science & Technology, Crescent Institute, Velammal schools — convenient for families."
    },
    {
      question: "Is the project suitable for elderly parents?",
      answer: "Yes — senior-friendly walking paths, healthcare tie-ups, easy transport access, supermarkets and temples nearby."
    },
    {
      question: "Is it a good choice for families where one partner works elsewhere?",
      answer: "Yes — 24x7 security, gated amenities and family-friendly infrastructure make it safe and comfortable for families."
    },
    {
      question: "Is it a good option for NRIs and investors?",
      answer: "Yes — RERA approval, rental demand, and GST Road location make it attractive for NRIs and investors seeking appreciation."
    },
    {
      question: "What amenities are available?",
      answer: "40+ amenities including clubhouse, pool, gym, sports courts, landscaped gardens and retail spaces."
    }
  ];

  return (
    <section className="max-w-5xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      
      <h2 className="text-3xl font-bold mb-8 text-foreground">
        Frequently Asked Questions – Shriram Park 63
      </h2>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-border pb-6 last:border-0">
            <h3 className="font-semibold text-lg mb-2 text-foreground">
              {faq.question}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
