export const metadata = {
  title: "Returns"
};

export default function ReturnsPage() {
  return (
    <div className="section-spacing">
      <div className="mx-auto max-w-[960px] space-y-6 px-4 md:px-6">
        <div>
          <h1 className="font-display text-3xl uppercase">Returns</h1>
          <p className="mt-2 text-sm text-white/60">
            Easy returns for items that do not fit the mission.
          </p>
        </div>
        <div className="space-y-4 text-sm text-white/70">
          <p>
            Returns are accepted within 30 days of delivery, provided items are
            unworn, unwashed, and in original condition.
          </p>
          <p>
            To start a return, contact us with your order number and the items
            you would like to send back.
          </p>
          <p>
            Refunds are issued to the original payment method once the return is
            received and inspected.
          </p>
        </div>
      </div>
    </div>
  );
}
