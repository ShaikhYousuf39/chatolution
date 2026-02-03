import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-[#1F2937]">
      <header className="absolute top-0 w-full z-10 bg-transparent py-4">
        <div className="mx-auto flex w-full max-w-[1160px] items-center justify-between px-5">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <img src="/assetes/Group.svg" alt="Chatolution logo" className="h-8 w-8" />
            <span className="hidden md:block">Chatolution</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#benifits" className="text-sm font-bold text-[#4F46E5]">
              Benefits
            </Link>
            <Link href="#pricing" className="text-sm font-bold text-black hover:text-[#4F46E5]">
              Pricing
            </Link>
            <Link href="#trynow" className="text-sm font-bold text-black hover:text-[#4F46E5]">
              Try Now
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/signIn" className="rounded-md border border-black px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm font-medium text-black transition hover:bg-slate-100">
              Login
            </Link>
            <Link href="/signup" className="rounded-md bg-[#000003] px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm font-semibold text-white">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="px-5 pb-20 pt-28 md:pt-32">
        <div className="mx-auto w-full max-w-[820px]">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-[#111827] md:text-4xl">Privacy Policy</h1>
            <p className="mt-2 text-xs text-slate-400">Last updated: 02/02/2026</p>
          </div>

          <div className="mx-auto mt-6 h-px w-full max-w-[760px] bg-slate-100" />

          <div className="prose prose-slate mt-8 max-w-none text-sm leading-6">
            <p>
              At Enso Cotton, we respect your privacy and are committed to protecting your personal information.
              This policy explains how we collect, use, and store your information when you visit our website or use our services.
            </p>

            <h2 className="mt-8 text-base font-semibold text-[#111827]">Information We Collect</h2>
            <p>We collect the following information when you interact with us:</p>
            <ul className="list-disc pl-5">
              <li>Personal details (name, address, email, phone number) provided at checkout or sign-up.</li>
              <li>Payment details (processed securely through Shopify and not stored by us).</li>
              <li>Order history and preferences.</li>
              <li>Website usage data (via cookies, analytics, and pixels).</li>
            </ul>

            <h2 className="mt-8 text-base font-semibold text-[#111827]">How We Use Your Information</h2>
            <ul className="list-disc pl-5">
              <li>Process and deliver your orders.</li>
              <li>Send order updates, confirmations, and relevant notifications.</li>
              <li>Improve our products and customer experience.</li>
              <li>Send occasional marketing emails (only if you've opted in).</li>
              <li>Comply with Australian consumer and privacy laws.</li>
            </ul>

            <h2 className="mt-8 text-base font-semibold text-[#111827]">Sharing of Information</h2>
            <p>
              We never sell or rent your personal data. We only share limited information with trusted partners who help us
              run our store -- such as:
            </p>
            <ul className="list-disc pl-5">
              <li>Shopify (our e-commerce platform).</li>
              <li>Payment processors (Shop Pay, PayPal, Afterpay, etc.).</li>
              <li>Delivery partners (Australia Post and couriers).</li>
            </ul>
            <p>
              These partners are required to keep your data secure and only use it for order fulfillment or store operations.
            </p>

            <h2 className="mt-8 text-base font-semibold text-[#111827]">Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience, analyze traffic, and remember preferences.
              You can adjust your browser settings to refuse cookies if you prefer.
            </p>

            <h2 className="mt-8 text-base font-semibold text-[#111827]">Marketing Emails</h2>
            <p>
              If you subscribe to our newsletter, you may receive occasional updates about new products and offers.
              You can unsubscribe at any time using the link in our emails.
            </p>

            <h2 className="mt-8 text-base font-semibold text-[#111827]">Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data by emailing
              info@ensocotton.com.au. We will respond within a reasonable timeframe in line with the Australian Privacy Principles.
            </p>

            <h2 className="mt-8 text-base font-semibold text-[#111827]">Contact</h2>
            <p>For any privacy-related concerns, please contact:</p>
            <p>Email: info@ensocotton.com.au</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-100 bg-[#ECEDF0] px-5 py-8">
        <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xl font-bold">
              <img src="/assetes/Group.svg" alt="Chatolution Logo" className="h-8 w-8" />
              <span>Chatolution</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <a href="#" aria-label="X">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 4l14 16M19 4L5 20" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 3h-3a4 4 0 00-4 4v3H6v4h2v7h4v-7h3l1-4h-4V7a1 1 0 011-1h2V3z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 3a2 2 0 110 4 2 2 0 010-4zm1 6h-2v12h2V9zm5 0h-2v12h2v-6a2 2 0 114 0v6h2v-7a4 4 0 00-6-3.4V9z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 text-sm text-slate-500 md:items-end">
            <div className="flex items-center gap-2">
              <a href="/#benifits" className="hover:text-slate-900">
                Benefits
              </a>
              <span className="text-slate-300">·</span>
              <a href="/#pricing" className="hover:text-slate-900">
                Pricing
              </a>
              <span className="text-slate-300">·</span>
              <a href="/#trynow" className="hover:text-slate-900">
                Try Now
              </a>
            </div>
            <a href="mailto:info@chatolution.com" className="hover:text-slate-900">
              info@chatolution.com
            </a>
          </div>
        </div>
        <div className="mx-auto mt-6 h-px w-full max-w-[1160px] bg-slate-200" />
        <div className="mx-auto mt-4 flex w-full max-w-[1160px] flex-col gap-2 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>Copyright © 2026 Chatolution. All Rights Reserved.</span>
          <div className="flex items-center gap-2">
            <a href="#" className="hover:text-slate-900">
              Privacy Policy
            </a>
            <span className="text-slate-300">·</span>
            <a href="/services-agreement" className="hover:text-slate-900">
              Services Agreement
            </a>
          </div>
        </div>
      </footer>
      <Link
        href="/chatbot"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#DFE9FA] shadow-lg"
      >
        <img src="/assetes/Group.svg" alt="Chatbot Logo" className="h-8 w-8" />
      </Link>
    </div>
  );
}
