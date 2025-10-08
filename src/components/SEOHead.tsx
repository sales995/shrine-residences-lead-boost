import React from "react";
import { Helmet } from "react-helmet-async";

type Props = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  additionalSchema?: any;
};

const SITE_URL = "https://shriramproperties-park63.in";
const DEFAULT_IMAGE = "/assets/og-image.jpg";

export default function SEOHead({
  title = "Shriram Park 63 | 3 BHK Flats on GST Road, Perungalathur, Chennai",
  description = "Premium 3 BHK flats at Shriram Park 63, Perungalathur – 57-acre township by Shriram Properties on GST Road, Chennai. RERA approved with modern amenities.",
  path = "/",
  image = DEFAULT_IMAGE,
  additionalSchema = null,
}: Props) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shriram Properties",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/shriram-logo.png`,
    description: "Leading real estate developer offering premium residential projects in Chennai and across India",
    sameAs: [
      "https://www.facebook.com/shriramproperties",
      "https://www.linkedin.com/company/shriramproperties"
    ]
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Shriram Park 63",
    image: `${SITE_URL}${image}`,
    description: "Premium 3 BHK residential apartments in Perungalathur, Chennai",
    address: {
      "@type": "PostalAddress",
      streetAddress: "GST Road",
      addressLocality: "Perungalathur",
      addressRegion: "Tamil Nadu",
      postalCode: "600063",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "12.9103",
      longitude: "80.0897"
    },
    telephone: "+91-9655355525",
    priceRange: "₹₹₹",
    openingHours: "Mo-Su 09:00-18:00"
  };

  const realEstateProject = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: "Shriram Park 63",
    description: "Premium 3 BHK flats in 57-acre integrated township on GST Road, Perungalathur, Chennai with 40+ amenities",
    address: {
      "@type": "PostalAddress",
      streetAddress: "GST Road",
      addressLocality: "Perungalathur",
      addressRegion: "Tamil Nadu",
      postalCode: "600063",
      addressCountry: "IN"
    },
    telephone: "+91-9655355525",
    numberOfRooms: "3",
    floorSize: {
      "@type": "QuantitativeValue",
      value: "1725-1970",
      unitText: "Square Feet"
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Clubhouse" },
      { "@type": "LocationFeatureSpecification", name: "Swimming Pool" },
      { "@type": "LocationFeatureSpecification", name: "Gymnasium" },
      { "@type": "LocationFeatureSpecification", name: "Children's Play Area" },
      { "@type": "LocationFeatureSpecification", name: "Tennis Court" },
      { "@type": "LocationFeatureSpecification", name: "Badminton Court" },
      { "@type": "LocationFeatureSpecification", name: "Library" },
      { "@type": "LocationFeatureSpecification", name: "Mini Theatre" }
    ],
    additionalProperty: {
      "@type": "PropertyValue",
      name: "RERA Number",
      value: "TN/01/Building/0072/2018"
    }
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shriram Park 63",
        item: url
      }
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="flats on GST Road, 3 BHK flats in Perungalathur, Shriram Park 63 Chennai, luxury apartments in South Chennai, Shriram Properties project, apartments in Perungalathur, flats near Tambaram, ready to move flats Chennai" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Shriram Properties" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <meta property="og:site_name" content="Shriram Park 63" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />

      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      <script type="application/ld+json">{JSON.stringify(realEstateProject)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>

      {additionalSchema && (
        <script type="application/ld+json">{JSON.stringify(additionalSchema)}</script>
      )}
    </Helmet>
  );
}
