export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <div className="section-spacing">
      <div className="mx-auto max-w-[960px] space-y-6 px-4 md:px-6">
        <div>
          <h1 className="font-display text-3xl uppercase">Contact</h1>
          <p className="mt-2 text-sm text-white/60">
            We are here to help with orders, sizing, and partnerships.
          </p>
        </div>
        <div className="space-y-4 text-sm text-white/70">
          <p>
            Email: support@primaltrend.com
          </p>
          <p>
            We aim to respond within 24-48 hours during business days.
          </p>
          <p>
            For collaborations or media inquiries, include your brand and a
            short brief so we can route your request quickly.
          </p>
        </div>
      </div>
    </div>
  );
}
