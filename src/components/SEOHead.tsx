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
  title = "Shriram Park 63 — 2 & 3 BHK Apartments in Perungalathur",
  description = "2 & 3 BHK apartments at Shriram Park 63, Perungalathur. 57-acre gated community with 40+ amenities. RERA approved.",
  path = "/",
  image = DEFAULT_IMAGE,
  additionalSchema = null,
}: Props) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shriram Properties - Park 63",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.png`,
    sameAs: [
      "https://www.facebook.com/shriramproperties",
      "https://www.linkedin.com/company/shriramproperties"
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />

      <script type="application/ld+json">{JSON.stringify(organization)}</script>

      {additionalSchema && (
        <script type="application/ld+json">{JSON.stringify(additionalSchema)}</script>
      )}
    </Helmet>
  );
}
