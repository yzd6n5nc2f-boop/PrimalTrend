export const metadata = {
  title: "Shipping"
};

export default function ShippingPage() {
  return (
    <div className="section-spacing">
      <div className="mx-auto max-w-[960px] space-y-6 px-4 md:px-6">
        <div>
          <h1 className="font-display text-3xl uppercase">Shipping</h1>
          <p className="mt-2 text-sm text-white/60">
            Fast, tracked delivery for every order.
          </p>
        </div>
        <div className="space-y-4 text-sm text-white/70">
          <p>
            Orders are processed within 1-2 business days. You will receive a
            tracking link as soon as your order ships.
          </p>
          <p>
            Free UK shipping is available on orders over £60. Standard shipping
            is a flat rate below the threshold.
          </p>
          <p>
            International shipping options will be added soon. For urgent
            delivery or bulk orders, contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
