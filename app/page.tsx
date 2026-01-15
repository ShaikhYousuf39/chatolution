export default function Home() {
  return (
    <div className="bg-white text-[#1F2937]">
      <header className="w-full bg-gradient-to-r from-white via-[#BFD5FC] to-[#F8DBBD] py-4">
        <div className="mx-auto flex w-full max-w-[1160px] items-center justify-between px-5">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <img src="/assetes/Group.svg" alt="Chatolution logo" className="h-8 w-8" />
            <span>Chatolution</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm font-bold text-[#4F46E5]">
              Benefits
            </a>
            <a href="#" className="text-sm font-bold text-black hover:text-[#4F46E5]">
              Pricing
            </a>
            <a href="#" className="text-sm font-bold text-black hover:text-[#4F46E5]">
              Try Now
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="rounded-md border border-black px-4 py-2 text-sm font-medium text-black transition hover:bg-slate-100">
              Login
            </button>
            <button className="rounded-md bg-[#000003] px-4 py-2 text-sm font-semibold text-white">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="w-full bg-gradient-to-r from-white via-[#BFD5FC] to-[#F8DBBD]">
          <div
            className="relative w-full bg-cover bg-center bg-no-repeat px-5 py-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, white, #BFD5FC, #F8DBBD), url('/assetes/bg_circular_lines.png')",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="mx-auto w-full max-w-[1160px]">
              <div className="mx-auto flex w-fit items-center gap-3 rounded-full bg-white/60 px-4 py-2 shadow-sm">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 overflow-hidden rounded-full border-2 border-white bg-slate-200">
                    <img src="/assetes/profile3.png" alt="Profile 1" className="h-full w-full object-cover" />
                  </div>
                  <div className="h-6 w-6 overflow-hidden rounded-full border-2 border-white bg-slate-200">
                    <img src="/assetes/profile2.png" alt="Profile 2" className="h-full w-full object-cover" />
                  </div>
                  <div className="h-6 w-6 overflow-hidden rounded-full border-2 border-white bg-slate-200">
                    <img src="/assetes/profile1.png" alt="Profile 3" className="h-full w-full object-cover" />
                  </div>
                </div>
                <span className="text-xs text-slate-600">7,000 people have been helped</span>
                <svg className="h-3 w-3 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.5 4.5l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>

              <div className="mx-auto mt-10 max-w-[790px] text-center">
                <h1 className="text-[56px] font-extrabold leading-[1.1] text-black">
                  Build Your Website with Ease
                </h1>
                <p className="mt-6 text-[40px] font-medium italic text-[#F59E0B]">
                  Powered by Chatolution
                </p>
                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  Create your portfolio or eCommerce site in minutes with our AI-driven chatbot. No
                  technical skills required - just follow simple steps and watch your site come to
                  life!
                </p>
                <button className="mt-8 inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 text-base font-semibold text-white">
                  Get Started
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </button>
              </div>

              <div className="mx-auto mt-10 w-full max-w-[600px] overflow-hidden rounded-xl bg-white shadow-lg">
                <div className="border-b border-slate-200 px-4 py-3">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {["Translate", "Calendar", "Document", "Map", "All"].map((tab) => (
                      <button
                        key={tab}
                        className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-200"
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-4">
                  <input
                    className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-[#4F46E5]"
                    placeholder="Ask anything..."
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex rounded-md bg-slate-100 p-1 text-xs">
                      <span className="rounded px-2 py-1 text-slate-500">Mobile</span>
                      <span className="rounded bg-white px-2 py-1 font-medium text-[#4F46E5] shadow-sm">
                        Web
                      </span>
                    </div>
                    <button className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3a3 3 0 013 3v5a3 3 0 01-6 0V6a3 3 0 013-3z" />
                        <path d="M5 11a7 7 0 0014 0h-2a5 5 0 01-10 0H5z" />
                      </svg>
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-md bg-[#4F46E5] text-white">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 12l18-9-6 18-3-6-9-3z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] px-5 py-24 text-center">
            <div className="mx-auto max-w-[900px]">
              <div className="mx-auto w-fit rounded-full bg-[#DFE9FA] px-4 py-1 text-sm font-semibold text-[#00A4FF]">
                Benefits
              </div>
              <h2 className="mt-4 text-4xl font-medium text-[#111827]">
                Why Choose Our <span className="italic text-[#F59E0B]">Website Builder?</span>
                <br />
                Unlock Powerful Features with Ease
              </h2>
              <p className="mx-auto mt-6 max-w-[700px] text-lg text-[#4B5563]">
                Our platform makes building your website effortless. Whether you're showcasing your
                work or selling products, we've got you covered with easy-to-use tools and
                personalized guidance.
              </p>
            </div>
          </div>

          {[
            {
              title: "Step-by-Step Chatbot Guidance",
              copy:
                "Our smart chatbot guides you through every step, making site creation effortless. Whether you're building a portfolio or an online store, no technical skills are needed.",
              cta: "Get Started",
              reverse: false,
            },
            {
              title: "Fully Customizable Designs",
              copy:
                "Choose from a variety of templates and easily customize them to reflect your unique style. Tailor your site without any limitations.",
              cta: "Explore Designs",
              reverse: true,
            },
            {
              title: "Quick and Easy Setup",
              copy:
                "Launch your site in no time! Our streamlined process allows you to add content, images, and products with ease.",
              cta: "Start Now",
              reverse: false,
            },
          ].map((step, index) => (
            <div key={step.title} className="bg-[#F9FAFB] px-5 py-16">
              <div
                className={`mx-auto flex w-full max-w-[1160px] flex-col items-center gap-10 ${
                  step.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <div className="max-w-[480px] text-center lg:text-left">
                  <h3 className="text-[31px] font-semibold text-black">{step.title}</h3>
                  <p className="mt-6 text-lg text-[#4B5563]">{step.copy}</p>
                  <button className="mt-8 inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 text-base font-semibold text-white">
                    {step.cta}
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </button>
                </div>
                <div className="flex w-full max-w-[550px] justify-center">
                  <div className="flex h-[380px] w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#A7C7FF] via-white to-[#F5CEAA]">
                    <div className="h-[80%] w-[85%] overflow-hidden rounded-xl bg-white shadow-sm">
                      <img src="/assetes/2416.jpg" alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              {index === 2 && (
                <div className="mt-16 bg-[radial-gradient(circle,rgba(191,213,252,0.5)_0%,rgba(255,255,255,0.5)_80%)] px-5 py-24 text-center">
                  <div className="mx-auto max-w-[900px]">
                    <div className="mx-auto w-fit rounded-full bg-[#DFE9FA] px-4 py-1 text-sm font-semibold text-[#00A4FF]">
                      Pricing
                    </div>
                    <h2 className="mt-4 text-4xl font-medium text-[#111827]">
                      Affordable <span className="italic text-[#F59E0B]">Pricing</span>
                      <br />
                      For Every Need
                    </h2>
                    <p className="mx-auto mt-6 max-w-[700px] text-lg text-[#4B5563]">
                      Get started with our flexible pricing plans that suit both individual creators and
                      growing businesses. Choose the right plan for you and start building today!
                    </p>
                  </div>
                  <div className="mx-auto mt-14 flex w-full max-w-[800px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.05)] md:flex-row">
                    <div className="flex flex-1 flex-col justify-center rounded-3xl bg-gradient-to-br from-[#FDE6D2] to-[#D8E6FD] p-10 text-left md:m-2">
                      <h4 className="text-lg font-medium text-[#1F2937]">Professional Plan</h4>
                      <div className="mt-4 flex items-end gap-2">
                        <span className="text-[42px] font-extrabold text-black">$30</span>
                        <span className="text-sm font-medium text-[#4B5563]">per month</span>
                      </div>
                      <button className="mt-6 w-full rounded-lg bg-[#111827] px-6 py-3 text-base font-semibold text-white">
                        Get started
                      </button>
                      <a href="#" className="mt-4 text-sm font-semibold text-[#1F2937] underline">
                        Get your free 7-day trail today!
                      </a>
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-10 text-left">
                      <h5 className="text-base font-semibold text-[#1F2937]">What's included</h5>
                      <ul className="mt-6 space-y-4 text-base text-[#4B5563]">
                        {["Up to 3 Websites", "Premium Templates", "eCommerce Features", "Priority Support"].map(
                          (feature) => (
                            <li key={feature} className="flex items-center gap-3">
                              <svg className="h-5 w-5 text-[#4BCFA3]" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7.5 13.5l-3-3 1.4-1.4L7.5 10.7l6.1-6.1 1.4 1.4-7.5 7.5z" />
                              </svg>
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="bg-gradient-to-r from-white via-[#BFD5FC] to-[#F8DBBD] px-5 py-24 text-center">
            <div className="mx-auto max-w-[900px]">
              <div className="mx-auto w-fit rounded-full bg-[#DFE9FA] px-4 py-1 text-sm font-semibold text-[#00A4FF]">
                Try it now
              </div>
              <h2 className="mt-4 text-4xl font-medium text-[#111827]">
                Create your stunning <br />
                <span className="italic text-[#F59E0B]">website Today</span>
              </h2>
              <p className="mx-auto mt-6 max-w-[700px] text-lg text-[#4B5563]">
                Build your portfolio or eCommerce site effortlessly with our AI-powered chatolution.
                Get started in minutes with easy-to-follow steps and customizations tailored to your
                needs.
              </p>
              <button className="mt-8 inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 text-base font-semibold text-white">
                Get Started
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-white px-5 py-10">
        <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4">
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
          <div className="flex flex-col items-start gap-4 text-sm text-slate-500 md:items-end">
            <div className="flex items-center gap-2">
              <a href="#" className="hover:text-slate-900">
                Benefits
              </a>
              <span className="text-slate-300">|</span>
              <a href="#" className="hover:text-slate-900">
                Pricing
              </a>
              <span className="text-slate-300">|</span>
              <a href="#" className="hover:text-slate-900">
                Try Now
              </a>
            </div>
            <a href="mailto:info@chatolution.com" className="hover:text-slate-900">
              info@chatolution.com
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 h-px w-full max-w-[1160px] bg-slate-200" />
        <div className="mx-auto mt-6 text-center text-sm text-slate-500">
          Copyright Ac 2026 Chatolution. All Rights Reserved.
        </div>
      </footer>

      <a
        href="#chatbot"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#DFE9FA] shadow-lg"
      >
        <img src="/assetes/Group.svg" alt="Chatbot Logo" className="h-8 w-8" />
      </a>
    </div>
  );
}
