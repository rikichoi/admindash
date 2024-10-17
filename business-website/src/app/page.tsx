import PaymentForm from "./components/PaymentForm";

export default function Home() {
  const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY!.toString();
  return (
    <div className="bg-slate-50 border-2 flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <PaymentForm STRIPE_PUBLISHABLE_KEY={STRIPE_PUBLISHABLE_KEY} />
      <div className="text-black">
        <ol>
          <li>4242424242424242</li>
          <li>Any 3 digits</li>
          <li>Any future date</li>
        </ol>
      </div>
    </div>
  );
}
