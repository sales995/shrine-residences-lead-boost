import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        title="Privacy Policy | Shriram Park 63 Perungalathur"
        description="Read the privacy policy for Shriram Park 63. Learn how we collect, use, and protect your personal information."
        path="/privacy-policy"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  Welcome to Shriram Park 63 ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.
                </p>
                <p className="text-muted-foreground mb-4">
                  By using our website or providing us with your information, you consent to the practices described in this Privacy Policy. Please read this policy carefully to understand our practices regarding your personal data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Personal Information</h3>
                <p className="text-muted-foreground mb-4">
                  We may collect the following personal information from you:
                </p>
                <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                  <li>Full name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Mailing address</li>
                  <li>Preferred contact time</li>
                  <li>Specific property interests</li>
                  <li>Budget preferences</li>
                  <li>Any other information you voluntarily provide</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Automatically Collected Information</h3>
                <p className="text-muted-foreground mb-4">
                  When you visit our website, we may automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website</li>
                  <li>Device information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the collected information for various purposes, including:
                </p>
                <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                  <li>To respond to your inquiries and provide information about our properties</li>
                  <li>To schedule site visits and property viewings</li>
                  <li>To send you brochures, floor plans, and pricing information</li>
                  <li>To communicate special offers, promotions, and updates</li>
                  <li>To process your property booking or purchase</li>
                  <li>To improve our website and customer service</li>
                  <li>To analyze user behavior and preferences</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect against fraud and unauthorized activities</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                  <li><strong>Shriram Properties Limited:</strong> As the parent company and developer of Shriram Park 63</li>
                  <li><strong>Service Providers:</strong> Third-party companies that assist us with marketing, analytics, customer support, and other business operations</li>
                  <li><strong>Legal Authorities:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business Partners:</strong> Real estate agents, brokers, and channel partners involved in property sales</li>
                  <li><strong>Financial Institutions:</strong> Banks and housing finance companies for loan processing purposes</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  We do not sell your personal information to third parties for their marketing purposes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and audits</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection</li>
                  <li>Secure data storage systems</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience and collect information about how you use our website. Cookies are small text files stored on your device.
                </p>
                <p className="text-muted-foreground mb-4">
                  You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights and Choices</h2>
                <p className="text-muted-foreground mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                  <li><strong>Access:</strong> Request access to your personal data</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Data Portability:</strong> Request a copy of your data in a structured format</li>
                  <li><strong>Withdrawal of Consent:</strong> Withdraw consent for data processing</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Data Retention</h2>
                <p className="text-muted-foreground mb-4">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Third-Party Links</h2>
                <p className="text-muted-foreground mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Children's Privacy</h2>
                <p className="text-muted-foreground mb-4">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it promptly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a new "Last Updated" date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Compliance with Indian Laws</h2>
                <p className="text-muted-foreground mb-4">
                  We comply with applicable Indian data protection laws, including the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">13. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                  <p className="text-foreground">
                    <strong>Shriram Park 63</strong>
                  </p>
                  <p className="text-muted-foreground">
                    GST Road, Perungalathur<br />
                    Chennai, Tamil Nadu, India
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Phone:</strong> <a href="tel:+919655355525" className="text-accent hover:underline">+91 96553 55525</a>
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> <a href="mailto:info@shrirampark63.com" className="text-accent hover:underline">info@shrirampark63.com</a>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">14. Consent</h2>
                <p className="text-muted-foreground mb-4">
                  By using our website and services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with any part of this policy, please do not use our website or provide us with your personal information.
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;