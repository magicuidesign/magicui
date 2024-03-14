const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "YouTube",
  "Instagram",
  "Uber",
  "Spotify",
  "Airbnb",
  "Adobe",
  "PayPal",
  "Slack",
  "Whatsapp",
  "GitHub",
  "Dropbox",
  "Tesla",
  "Zoom",
  "Tinder",
  "Shopify",
  "Stripe",
  "Atlassian",
  "Trello",
  "Canva",
  "Figma",
  "Docker",
  "Discord",
  "Evernote",
  "Mailchimp",
  "Hubspot",
  "Asana",
  "Monday.com",
  "Notion",
  "Xero",
  "Zapier",
  "ActiveCampaign",
  "Afterpay",
  "Airtable",
  "Airtasker",
  "Airwallex",
  "Amplitude",
  "Attentive",
  "Automattic",
  "Basecamp",
  "Booking.com",
  "Braze",
  "BrowserStack",
  "Calendly",
  "Carta",
  "Classpass",
  "Clearbit",
  "Codecademy",
  "Coinbase",
  "Contentful",
  "Culture Amp",
  "Customer.io",
  "Databricks",
  "Descript",
  "Drips",
  "Dribbble",
  "Elastic",
  "Freshworks",
  "Ghost",
  "Gong",
  "Grammarly",
  "Gumroad",
  "Gusto",
  "HashiCorp",
  "Hellosign",
  "Himalayas",
  "Hopin",
  "Hotjar",
  "InVision",
  "Intercom",
  "Lattice",
  "LaunchDarkly",
  "Linear",
  "Loom",
  "Maze",
  "Medium",
  "Miro",
  "Monzo",
  "Opendoor",
  "Outreach",
  "Pendo",
  "Pipedrive",
  "Plaid",
  "Postman",
];

export default function Companies() {
  return (
    <section id="companies">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500">
            HELPED PEOPLE FROM COMPANIES LIKE
          </h3>
          <div className="relative mt-6">
            <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4 xl:grid-cols-8 xl:gap-4">
              {companies.map((logo, idx) => (
                <img
                  key={idx}
                  src={`https://cdn.magicui.design/companies/${logo}.svg`}
                  className="h-10 w-40 px-2 dark:brightness-0 dark:invert"
                  alt={logo}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full bg-gradient-to-t from-white from-20% dark:from-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
