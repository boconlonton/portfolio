import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME.replace(".dev", ""),
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      jobTitle: "Software developer & designer",
    },
  ],
};

export function JsonLdWebsite() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
