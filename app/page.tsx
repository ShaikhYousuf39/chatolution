'use client';
import Link from 'next/link';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css';
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
export default function Home() {
  return (
    <div className={`${inter.className} bg-white text-[#1F2937]`}>
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

      <main>
        <section className="w-full">
          {/* hero section */}
          <div
            className="relative w-full min-h-[600px] pt-32 md:pt-[150px] px-5 py-20 bg-gradient-to-tr from-white via-[#e8f1ff] to-[#f0e8d8] bg-cover bg-center hero-banner"
            style={{
              backgroundImage: "linear-gradient(to bottom, transparent 0%, transparent 70%, #F9FAFB 100%), linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(232, 241, 255, 0.75) 25%, rgba(191, 213, 252, 0.75) 50%, rgba(248, 219, 189, 0.75) 75%, rgba(250, 232, 216, 0.75) 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
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

              <div className="w-full mt-10 text-center">
                <h1 className="text-4xl md:text-6xl lg:text-[72px] font-extrabold leading-[1.1] text-black">
                  Contentful Static Pages Are Old
                </h1>
                <p className="mt-2 text-2xl md:text-5xl lg:text-[72px] font-medium italic text-[#F59E0B]">
                  Direct Chat Builds Trust,
                </p>
                <p className="mt-2 text-2xl md:text-5xl lg:text-[72px] font-medium italic text-[#F59E0B]">
                  Saves Time, and Converts
                </p>
                <p className="px-4 md:px-16 mt-6 text-base md:text-[18px] leading-[1.7] text-slate-600 font-normal max-w-[900px] mx-auto text-center">
                  Build trust with real answers, not long pages.<br />
                  Guide visitors to action through chat.
                </p>

                <button className="mt-8 inline-flex items-center gap-2 rounded-[14px] bg-black px-10 py-4 text-base font-semibold text-white">
                  Start Your Chatolution Now!

                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_40_93)">
                      <path d="M5.5 16.5L16.5 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M7.5625 5.5H16.5V14.4375" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_40_93">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                </button>
              </div>

              <div className="mx-auto mt-10 w-full max-w-[600px] overflow-hidden rounded-xl bg-white shadow-lg relative z-10">

                <div className="border-b border-slate-200 px-4 py-3">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    <button className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-200">Translate</button>
                    <button className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-200">Calendar</button>
                    <button className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-200">Document</button>
                    <button className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-200">Map</button>
                    <button className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-200">All</button>
                  </div>
                </div>


                <div className="flex flex-col md:flex-row items-center gap-3 px-4 py-4">

                  <input className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-[#4F46E5] w-full md:w-auto" placeholder="Ask anything..." />


                  <div className="flex items-center gap-2 mt-3 md:mt-0">

                    <div className="flex rounded-md bg-slate-100 p-1 text-xs">
                      <span className="rounded px-2 py-1 text-slate-500">Mobile</span>
                      <span className="rounded bg-white px-2 py-1 font-medium text-[#4F46E5] shadow-sm">Web</span>
                    </div>


                    <button className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-slate-100 text-slate-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3a3 3 0 013 3v5a3 3 0 01-6 0V6a3 3 0 013-3z"></path>
                        <path d="M5 11a7 7 0 0014 0h-2a5 5 0 01-10 0H5z"></path>
                      </svg>
                    </button>

                    <button className="flex h-9 w-9 items-center justify-center rounded-md bg-[#4F46E5] text-white">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 12l18-9-6 18-3-6-9-3z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>




          <div id='benifits' className="bg-[#F9FAFB] px-5 py-24 text-center">
            <div className="mx-auto max-w-[900px]">
              <div className="mx-auto w-fit rounded-full bg-[#DFE9FA] px-4 py-1 text-sm font-semibold text-[#00A4FF]">
                Benefits
              </div>
              <h2 className="mt-6 text-4xl font-medium text-[#111827]">
                Why Conversations Beat  <span className="italic text-[#F59E0B]">Static Websites</span>

              </h2>
              <p className="mx-auto mt-6 max-w-[700px] text-lg text-[#4B5563]">
                Traditional websites make visitors search, scroll, and guess. Chatolution flips that experience by giving users direct answers, real interaction, and clear next steps. Instead of losing visitors in pages, you guide them through a conversation that builds trust and drives action.
              </p>
            </div>
          </div>

          {[
            {
              title: "Get Users to What They Want Faster",
              copy:
                "Stop making visitors click through menus and long pages. With chat, users simply ask what they need and get a direct answer instantly. Faster paths mean less confusion, lower bounce rates, and a smoother experience that keeps people engaged.",
              cta: "Get Started",
              reverse: false,
              image: "/assetes/chatbot-guidence.jpg"
            },
            {
              title: "Build Trust While You Talk",
              copy:
                "Conversations feel natural and personal. Instead of reading cold content, users interact with a system that responds to them in real time. Helpful replies, clear options, and guided steps make your business feel more reliable and easier to trust.",
              cta: "Explore Designs",
              reverse: true,
              image: "/assetes/customizable-design.jpg"
            },
            {
              title: "Turn Conversations Into Customers",
              copy:
                "Chat doesn’t just share information, it moves people to action. Whether it’s booking a call, filling a form, or buying a product, every message is designed to guide visitors toward a clear next step. Less browsing, more converting.",
              cta: "Start Now",
              reverse: false,
              image: "/assetes/easy-setup.jpg"
            },
          ].map((step, index) => (
            <div key={step.title} className="bg-[#F9FAFB] px-5 py-16">
              <div
                className={`mx-auto flex w-full max-w-[1160px] flex-col items-center justify-center gap-12 lg:gap-17 ${step.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                  }`}
              >
                <div className="flex flex-1 flex-col items-center justify-center max-w-[557px] lg:items-start">
                  <h3 className="text-[31px] font-semibold text-black text-center lg:text-left">{step.title}</h3>
                  <p className="mt-6 text-lg text-[#4B5563] text-center lg:text-left">{step.copy}</p>
                  <button className="mt-8 inline-flex items-center gap-2 rounded-[14px] bg-black px-10 py-4 text-base font-semibold text-white">
                    {step.cta}

                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_40_93)">
                        <path d="M5.5 16.5L16.5 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.5625 5.5H16.5V14.4375" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_40_93">
                          <rect width="22" height="22" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                  </button>
                </div>
                <div className="flex flex-1 w-full max-w-[550px] justify-center">
                  <div className="flex h-[380px] w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#A7C7FF] via-white to-[#F5CEAA]">
                    <div className="h-[80%] w-[85%] overflow-hidden rounded-xl bg-white shadow-sm">
                      <img src={step.image} alt={step.title} className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              {index === 2 && (
                <div className="mt-16 bg-[radial-gradient(circle,#bfd5fc80_0%,#f9fafb_55%)] px-5 pt-20 pb-0 text-center">
                  <div id='pricing' className="mx-auto max-w-[900px]">
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
                  <div className="mx-auto mt-14 grid w-full max-w-[920px] gap-6 md:grid-cols-2">
                    {[
                      {
                        name: "Portfolio Plan",
                        price: "$9.99",
                        accent: "from-[#FDE6D2] to-[#D8E6FD]",
                        features: [
                          "Chat-based portfolio instead of static pages",
                          "Add and manage services or work categories",
                          "Built-in CTAs like Contact, Book a Call, or Fill a Form",
                          "FAQs, Terms & Conditions, and Privacy Policy inside chat",
                          "Simple owner dashboard to manage all content",
                          "Mobile-friendly chat experience",
                        ],
                        showMore: false,
                      },
                      {
                        name: "eCommerce Plan",
                        price: "$9.99",
                        accent: "from-[#E3ECFF] to-[#FADBC0]",
                        features: [
                          "Chat-based product store instead of traditional product pages",
                          "Add and manage products and categories",
                          "Product cards displayed directly inside chat",
                          "Chat-based shopping flow (Learn, Add to Cart, Buy)",
                          "Cart and checkout inside the conversation",
                        ],
                        showMore: true,
                      },
                    ].map((plan) => (
                      <div
                        key={plan.name}
                        className="flex w-full flex-col overflow-hidden rounded-3xl bg-white p-3 shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
                      >
                        <div
                          className={`rounded-2xl bg-gradient-to-br ${plan.accent} p-6 text-left`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="text-base font-semibold text-[#1F2937] md:text-lg">{plan.name}</h4>
                            <div className="flex items-end gap-2 ">
                              <div className="text-2xl font-extrabold text-black md:text-[28px]">{plan.price}</div>
                              <div className="text-xs font-medium text-[#4B5563]">per month</div>
                            </div>
                          </div>
                          <button className="mt-4 w-full rounded-[12px] bg-[#111827] px-6 py-3 text-sm font-semibold text-white">
                            Get started
                          </button>
                          <div className="mt-4 flex items-center gap-2 text-sm text-[#1F2937]">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#1F2937] text-[11px] font-semibold">
                              !
                            </span>
                            <span>Get your free 7-day trail today!</span>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-center px-4 pb-4 pt-6 text-left">
                          <h5 className="text-base font-semibold text-[#1F2937]">What's included</h5>
                          <ul className="mt-4 space-y-3 text-sm text-[#4B5563]">
                            {plan.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-3">

                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#48C2AB" />
                                </svg>

                                {feature}
                              </li>
                            ))}
                          </ul>
                          {plan.showMore && (
                            <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1F2937] underline">
                              Show More
                              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 8l4 4 4-4" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div id='trynow' className="bg-gradient-to-r from-white via-[#BFD5FC] to-[#F8DBBD] px-5 py-24 text-center">
            <div  className="mx-auto max-w-[900px]">
              <div className="mx-auto w-fit rounded-full bg-[#DFE9FA] px-4 py-1 text-sm font-semibold text-[#00A4FF]">
                Try it now
              </div>
              <h2 className="mt-4 text-4xl font-medium text-[#111827]">
                Start Turning Visitors Into  <br />
                <span className="italic text-[#F59E0B]">Converting Conversations</span>
              </h2>
              <p className="mx-auto mt-6 max-w-[700px] text-lg text-[#4B5563]">
                Stop losing users on long pages and confusing menus. Give them instant answers, build trust, and guide them to take action through chat. Set up your chat-based website in minutes and see the difference.
              </p>
              <button className="mt-8 inline-flex items-center gap-2 rounded-[14px] bg-black px-10 py-4 text-base font-semibold text-white">
                Start Your Chatolution Now!

                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_40_93)">
                      <path d="M5.5 16.5L16.5 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M7.5625 5.5H16.5V14.4375" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_40_93">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-[#ECEDF0] px-5 py-8">
        <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xl font-bold">
              <img src="/assetes/Group.svg" alt="Chatolution Logo" className="h-8 w-8" />
              <span>Chatolution</span>
            </div>
            <div className="hidden items-center gap-4 text-slate-500 md:flex">
              <a href="#" aria-label="X">
               
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3331 7.93367L15.5458 2H14.3114L9.78322 7.15122L6.16889 2H2L7.46622 9.79022L2 16.0117H3.23511L8.01378 10.5711L11.8311 16.0117H16M3.68078 2.91156H5.57778L14.3099 15.1444H12.4129" fill="#566273"/>
</svg>

              </a>
              <a href="#" aria-label="Facebook">
                
<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.70343 10.1603C2.63584 10.1603 1.14897 10.1603 0.473125 10.1603C0.112672 10.1603 3.05176e-05 10.0251 3.05176e-05 9.68717C3.05176e-05 8.78604 3.05176e-05 7.86238 3.05176e-05 6.96125C3.05176e-05 6.6008 0.1352 6.48815 0.473125 6.48815H2.70343C2.70343 6.42057 2.70343 5.11393 2.70343 4.50566C2.70343 3.60453 2.86113 2.74845 3.31169 1.95996C3.78479 1.14894 4.46064 0.608264 5.31671 0.292868C5.87992 0.0901131 6.44313 0 7.05139 0H9.25917C9.57456 0 9.70973 0.13517 9.70973 0.450566V3.01879C9.70973 3.33419 9.57456 3.46936 9.25917 3.46936C8.6509 3.46936 8.04264 3.46936 7.43437 3.49189C6.82611 3.49189 6.51071 3.78476 6.51071 4.41555C6.48818 5.0914 6.51071 5.74472 6.51071 6.4431H9.124C9.48445 6.4431 9.61962 6.57827 9.61962 6.93872V9.66465C9.61962 10.0251 9.50698 10.1377 9.124 10.1377C8.31298 10.1377 6.5783 10.1377 6.51071 10.1377V17.482C6.51071 17.865 6.39807 18.0001 5.99256 18.0001C5.04637 18.0001 4.12271 18.0001 3.17652 18.0001C2.8386 18.0001 2.70343 17.865 2.70343 17.527C2.70343 15.1616 2.70343 10.2279 2.70343 10.1603Z" fill="#566273"/>
</svg>

              </a>
              <a href="#" aria-label="LinkedIn">
              

<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.6 18.5999V11.7877C18.6 8.4397 17.8792 5.8822 13.9732 5.8822C12.09 5.8822 10.8345 6.9052 10.323 7.8817H10.2765V6.18445H6.57976V18.5999H10.4393V12.4387C10.4393 10.8112 10.7415 9.25345 12.741 9.25345C14.7172 9.25345 14.7405 11.0902 14.7405 12.5317V18.5767H18.6V18.5999Z" fill="#566273"/>
<path d="M0.302261 6.18445H4.16176V18.5999H0.302261V6.18445Z" fill="#566273"/>
<path d="M2.23201 0C0.999764 0 1.52588e-05 0.999749 1.52588e-05 2.232C1.52588e-05 3.46425 0.999764 4.48724 2.23201 4.48724C3.46426 4.48724 4.46401 3.46425 4.46401 2.232C4.46401 0.999749 3.46426 0 2.23201 0Z" fill="#566273"/>
</svg>


              </a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 text-sm text-slate-500 md:items-end">
            <div className="flex items-center gap-2">
              <a href="#benifits" className="hover:text-slate-900">
                Benefits
              </a>
              <span className="text-slate-300">·</span>
              <a href="#pricing" className="hover:text-slate-900">
                Pricing
              </a>
              <span className="text-slate-300">·</span>
              <a href="#trynow" className="hover:text-slate-900">
                Try Now
              </a>
            </div>
            <a href="mailto:info@chatolution.com" className="hover:text-slate-900">
              info@chatolution.com
            </a>
            <div className="mt-2 flex items-center gap-4 text-slate-500 md:hidden">
              <a href="#" aria-label="X">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3331 7.93367L15.5458 2H14.3114L9.78322 7.15122L6.16889 2H2L7.46622 9.79022L2 16.0117H3.23511L8.01378 10.5711L11.8311 16.0117H16M3.68078 2.91156H5.57778L14.3099 15.1444H12.4129" fill="#566273"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.70343 10.1603C2.63584 10.1603 1.14897 10.1603 0.473125 10.1603C0.112672 10.1603 3.05176e-05 10.0251 3.05176e-05 9.68717C3.05176e-05 8.78604 3.05176e-05 7.86238 3.05176e-05 6.96125C3.05176e-05 6.6008 0.1352 6.48815 0.473125 6.48815H2.70343C2.70343 6.42057 2.70343 5.11393 2.70343 4.50566C2.70343 3.60453 2.86113 2.74845 3.31169 1.95996C3.78479 1.14894 4.46064 0.608264 5.31671 0.292868C5.87992 0.0901131 6.44313 0 7.05139 0H9.25917C9.57456 0 9.70973 0.13517 9.70973 0.450566V3.01879C9.70973 3.33419 9.57456 3.46936 9.25917 3.46936C8.6509 3.46936 8.04264 3.46936 7.43437 3.49189C6.82611 3.49189 6.51071 3.78476 6.51071 4.41555C6.48818 5.0914 6.51071 5.74472 6.51071 6.4431H9.124C9.48445 6.4431 9.61962 6.57827 9.61962 6.93872V9.66465C9.61962 10.0251 9.50698 10.1377 9.124 10.1377C8.31298 10.1377 6.5783 10.1377 6.51071 10.1377V17.482C6.51071 17.865 6.39807 18.0001 5.99256 18.0001C5.04637 18.0001 4.12271 18.0001 3.17652 18.0001C2.8386 18.0001 2.70343 17.865 2.70343 17.527C2.70343 15.1616 2.70343 10.2279 2.70343 10.1603Z" fill="#566273"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.6 18.5999V11.7877C18.6 8.4397 17.8792 5.8822 13.9732 5.8822C12.09 5.8822 10.8345 6.9052 10.323 7.8817H10.2765V6.18445H6.57976V18.5999H10.4393V12.4387C10.4393 10.8112 10.7415 9.25345 12.741 9.25345C14.7172 9.25345 14.7405 11.0902 14.7405 12.5317V18.5767H18.6V18.5999Z" fill="#566273"/>
                  <path d="M0.302261 6.18445H4.16176V18.5999H0.302261V6.18445Z" fill="#566273"/>
                  <path d="M2.23201 0C0.999764 0 1.52588e-05 0.999749 1.52588e-05 2.232C1.52588e-05 3.46425 0.999764 4.48724 2.23201 4.48724C3.46426 4.48724 4.46401 3.46425 4.46401 2.232C4.46401 0.999749 3.46426 0 2.23201 0Z" fill="#566273"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-6 h-px w-full max-w-[1160px] bg-slate-200" />
        <div className="mx-auto mt-4 flex w-full max-w-[1160px] flex-col gap-2 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>Copyright © 2026 Chatolution. All Rights Reserved.</span>
          <div className="flex items-center gap-2">
            <Link href="/privacy-policy" className="hover:text-slate-900">
              Privacy Policy
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/services-agreement" className="hover:text-slate-900">
              Services Agreement
            </Link>
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
