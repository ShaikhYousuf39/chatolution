"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedOption, setSelectedOption] = useState<'portfolio' | 'ecommerce'>('portfolio');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally handle the actual sign up logic (API call)
        // For now, we just redirect to the success page
        router.push("/signup-success");
    };

    return (
        <main className="min-h-screen bg-white overflow-x-hidden lg:h-screen lg:overflow-hidden">
            <div className="mx-auto flex min-h-screen w-full  flex-col items-stretch lg:h-full">
               
                <div className="p-5 flex flex-1 flex-col items-stretch lg:flex-row">
                    <div className="mb-4 flex lg:hidden">
                        <div className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200">
                            <Link href={"/"}>
                                <img src="/assetes/Group.svg" alt="Logo" className="h-full w-full object-contain" />
                            </Link>
                        </div>
                    </div>
                    {/* LEFT: Sign Up Form */}
                    <section className="flex w-full flex-col px-0 py-7 lg:w-[40%] lg:px-10 lg:py-12 items-center order-2 lg:order-1 lg:h-full">
                        <div className="w-full max-w-sm flex flex-col h-full">
                            <div className="mb-6 hidden lg:flex">
                                <div className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200">
                                    <Link href={"/"}>
                                        <img src="/assetes/Group.svg" alt="Logo" className="h-full w-full object-contain" />
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full flex-1 flex flex-col justify-start">
                                <h1 className="text-2xl font-bold text-slate-900">
                                    You're almost there!
                                </h1>
                                <p className="mt-2 text-sm text-slate-500">
                                    You've been invited to join the team. Create your password to access your account and start collaborating.
                                </p>

                                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                    {/* Email Input */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="jessica.hanson@example.com"
                                            className="h-11 w-full rounded-lg border border-slate-100 bg-slate-50 px-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                className="h-11 w-full rounded-lg border border-slate-100 bg-white px-4 pr-10 text-sm text-slate-900 outline-none border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >

                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.9832 9.99998C12.9832 11.65 11.6499 12.9833 9.99987 12.9833C8.34987 12.9833 7.01654 11.65 7.01654 9.99998C7.01654 8.34998 8.34987 7.01664 9.99987 7.01664C11.6499 7.01664 12.9832 8.34998 12.9832 9.99998Z" stroke="#566273" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M9.99987 16.8916C12.9415 16.8916 15.6832 15.1583 17.5915 12.1583C18.3415 10.9833 18.3415 9.00831 17.5915 7.83331C15.6832 4.83331 12.9415 3.09998 9.99987 3.09998C7.0582 3.09998 4.31654 4.83331 2.4082 7.83331C1.6582 9.00831 1.6582 10.9833 2.4082 12.1583C4.31654 15.1583 7.0582 16.8916 9.99987 16.8916Z" stroke="#566273" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                            </button>
                                        </div>
                                    </div>

                                    {/* Password Criteria */}
                                    <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                                        <div className="flex items-start gap-2">

                                            <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0001 1.66675C5.40841 1.66675 1.66675 5.40841 1.66675 10.0001C1.66675 14.5917 5.40841 18.3334 10.0001 18.3334C14.5917 18.3334 18.3334 14.5917 18.3334 10.0001C18.3334 5.40841 14.5917 1.66675 10.0001 1.66675ZM12.8001 11.9167C13.0417 12.1584 13.0417 12.5584 12.8001 12.8001C12.6751 12.9251 12.5167 12.9834 12.3584 12.9834C12.2001 12.9834 12.0417 12.9251 11.9167 12.8001L10.0001 10.8834L8.08341 12.8001C7.95841 12.9251 7.80008 12.9834 7.64175 12.9834C7.48341 12.9834 7.32508 12.9251 7.20008 12.8001C6.95842 12.5584 6.95842 12.1584 7.20008 11.9167L9.11675 10.0001L7.20008 8.08341C6.95842 7.84175 6.95842 7.44175 7.20008 7.20008C7.44175 6.95842 7.84175 6.95842 8.08341 7.20008L10.0001 9.11675L11.9167 7.20008C12.1584 6.95842 12.5584 6.95842 12.8001 7.20008C13.0417 7.44175 13.0417 7.84175 12.8001 8.08341L10.8834 10.0001L12.8001 11.9167Z" fill="#566273" />
                                            </svg>

                                            <span className="text-xs text-slate-500 whitespace-normal sm:whitespace-nowrap">At least 8 characters</span>
                                        </div>
                                        <div className="flex items-start gap-2">

                                            <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0001 1.66675C5.40841 1.66675 1.66675 5.40841 1.66675 10.0001C1.66675 14.5917 5.40841 18.3334 10.0001 18.3334C14.5917 18.3334 18.3334 14.5917 18.3334 10.0001C18.3334 5.40841 14.5917 1.66675 10.0001 1.66675ZM12.8001 11.9167C13.0417 12.1584 13.0417 12.5584 12.8001 12.8001C12.6751 12.9251 12.5167 12.9834 12.3584 12.9834C12.2001 12.9834 12.0417 12.9251 11.9167 12.8001L10.0001 10.8834L8.08341 12.8001C7.95841 12.9251 7.80008 12.9834 7.64175 12.9834C7.48341 12.9834 7.32508 12.9251 7.20008 12.8001C6.95842 12.5584 6.95842 12.1584 7.20008 11.9167L9.11675 10.0001L7.20008 8.08341C6.95842 7.84175 6.95842 7.44175 7.20008 7.20008C7.44175 6.95842 7.84175 6.95842 8.08341 7.20008L10.0001 9.11675L11.9167 7.20008C12.1584 6.95842 12.5584 6.95842 12.8001 7.20008C13.0417 7.44175 13.0417 7.84175 12.8001 8.08341L10.8834 10.0001L12.8001 11.9167Z" fill="#566273" />
                                            </svg>

                                            <span className="text-xs text-slate-500 whitespace-normal sm:whitespace-nowrap">At least one uppercase letter</span>
                                        </div>
                                        <div className="flex items-start gap-2">

                                            <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0001 1.66675C5.40841 1.66675 1.66675 5.40841 1.66675 10.0001C1.66675 14.5917 5.40841 18.3334 10.0001 18.3334C14.5917 18.3334 18.3334 14.5917 18.3334 10.0001C18.3334 5.40841 14.5917 1.66675 10.0001 1.66675ZM12.8001 11.9167C13.0417 12.1584 13.0417 12.5584 12.8001 12.8001C12.6751 12.9251 12.5167 12.9834 12.3584 12.9834C12.2001 12.9834 12.0417 12.9251 11.9167 12.8001L10.0001 10.8834L8.08341 12.8001C7.95841 12.9251 7.80008 12.9834 7.64175 12.9834C7.48341 12.9834 7.32508 12.9251 7.20008 12.8001C6.95842 12.5584 6.95842 12.1584 7.20008 11.9167L9.11675 10.0001L7.20008 8.08341C6.95842 7.84175 6.95842 7.44175 7.20008 7.20008C7.44175 6.95842 7.84175 6.95842 8.08341 7.20008L10.0001 9.11675L11.9167 7.20008C12.1584 6.95842 12.5584 6.95842 12.8001 7.20008C13.0417 7.44175 13.0417 7.84175 12.8001 8.08341L10.8834 10.0001L12.8001 11.9167Z" fill="#566273" />
                                            </svg>

                                            <span className="text-xs text-slate-500 whitespace-normal sm:whitespace-nowrap">At least one number</span>
                                        </div>
                                        <div className="flex items-start gap-2">

                                            <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0001 1.66675C5.40841 1.66675 1.66675 5.40841 1.66675 10.0001C1.66675 14.5917 5.40841 18.3334 10.0001 18.3334C14.5917 18.3334 18.3334 14.5917 18.3334 10.0001C18.3334 5.40841 14.5917 1.66675 10.0001 1.66675ZM12.8001 11.9167C13.0417 12.1584 13.0417 12.5584 12.8001 12.8001C12.6751 12.9251 12.5167 12.9834 12.3584 12.9834C12.2001 12.9834 12.0417 12.9251 11.9167 12.8001L10.0001 10.8834L8.08341 12.8001C7.95841 12.9251 7.80008 12.9834 7.64175 12.9834C7.48341 12.9834 7.32508 12.9251 7.20008 12.8001C6.95842 12.5584 6.95842 12.1584 7.20008 11.9167L9.11675 10.0001L7.20008 8.08341C6.95842 7.84175 6.95842 7.44175 7.20008 7.20008C7.44175 6.95842 7.84175 6.95842 8.08341 7.20008L10.0001 9.11675L11.9167 7.20008C12.1584 6.95842 12.5584 6.95842 12.8001 7.20008C13.0417 7.44175 13.0417 7.84175 12.8001 8.08341L10.8834 10.0001L12.8001 11.9167Z" fill="#566273" />
                                            </svg>

                                            <span className="text-xs text-slate-500 whitespace-normal sm:whitespace-nowrap">At least one lowercase letter</span>
                                        </div>
                                    </div>

                                    {/* Terms */}
                                    <div className="rounded-xl  bg-[#F4F4F4] py-3 px-3 flex items-start gap-3 sm:items-center sm:gap-2">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            className=" h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="terms" className="text-[10px] sm:text-[12px] text-slate-600 sm:whitespace-nowrap">
                                            I agree to the <a href="#" className="font-medium text-blue-600 hover:underline">Services Agreement</a> and the <a href="#" className="font-medium text-blue-600 hover:underline">Privacy Policy</a>
                                        </label>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={!termsAccepted}
                                        className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed ${termsAccepted ? 'bg-black hover:bg-slate-900' : 'bg-slate-200'}`}
                                    >
                                        Create free account
                                    </button>

                                    <div className="text-center">
                                        <span className="text-sm text-slate-600">Already have an account? </span>
                                        <Link href="/signIn" className="text-sm font-semibold text-slate-900 hover:underline">Sign In</Link>
                                    </div>

                                </form>
                            </div>

                            <div className="mt-auto"></div>
                        </div>
                    </section>

                    {/* RIGHT: Selection Cards */}
                    <section className="lg:w-[60%] relative mx-0 my-4 flex w-auto flex-col items-center justify-center overflow-hidden rounded-3xl bg-[#FFF5F5] px-1 py-4 order-1 md:min-h-[88vh] lg:order-2 lg:mx-0 lg:my-0 lg:mr-4 lg:h-full lg:px-0 lg:pt-30 lg:pb-12 lg:justify-start sm:w-full">

                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F5] to-[#F9F6FA]" />

                        <div className="relative z-10 w-full max-w-3xl px-0 text-center sm:px-6 lg:px-10">
                            <h2 className="text-base font-semibold text-slate-900 sm:text-2xl">Lets Build Your Website!</h2>
                            <p className="mt-1 text-xs text-slate-500 sm:mt-2 sm:text-base">Choose an option to get started</p>

                            <div className="mt-6 grid w-full grid-cols-2 gap-2 px-2 md:mt-10 md:grid-cols-[repeat(2,330px)] md:justify-center md:gap-4 md:px-0">
                                {/* Card 1 */}
                                <button
                                    onClick={() => setSelectedOption('portfolio')}
                                    className={`group relative flex w-full min-w-0 flex-col items-center rounded-2xl border-2 p-3 shadow-sm transition hover:shadow-md sm:w-full sm:max-w-[330px] sm:p-6 ${selectedOption === 'portfolio' ? 'border-blue-500 bg-white ring-1 ring-blue-500' : 'border-white bg-white/60 hover:bg-white'}`}
                                >
                                    {selectedOption === 'portfolio' && (
                                        <div className="absolute right-4 top-6 flex h-6 w-6 items-center justify-center   text-white ">
                                            {/* <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> */}
                                        </div>
                                    )}
                                    <h3 className="text-[12px] font-semibold text-slate-900 sm:text-lg"> Portfolio Site</h3>

                                    <div className=" mt-2 aspect-[4/3] w-full max-h-[72px] overflow-hidden rounded-lg bg-slate-50 p-2 sm:mt-6  sm:max-h-[160px]">
                                        <img src="/assetes/portfolio.png" alt="portfolio" className=" h-full w-full object-contain" />
                                    </div>
                                    <p className="mt-2 text-center text-[10px] leading-4 text-slate-500 sm:mt-4 sm:text-sm">
                                        Showcase your work with an interactive portfolio site. Add your services, projects, and contact information.
                                    </p>
                                </button>

                                {/* Card 2 */}
                                <button
                                    onClick={() => setSelectedOption('ecommerce')}
                                    className={`group relative flex w-full min-w-0 flex-col items-center rounded-2xl border-2 p-2 shadow-sm transition hover:shadow-md sm:w-full sm:max-w-[330px] sm:p-6 ${selectedOption === 'ecommerce' ? 'border-blue-500 bg-white ring-1 ring-blue-500' : 'border-white bg-white/60 hover:bg-white'}`}
                                >
                                    {selectedOption === 'ecommerce' && (
                                        <div className="absolute right-4 top-6 flex h-6 w-6 items-center justify-center text-white ">
                                            {/* <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> */}
                                        </div>
                                    )}
                                    <h3 className="text-[12px] font-semibold text-slate-900 sm:text-lg">eCommerce Site</h3>

                                    <div className="mt-2 aspect-[4/3] w-full max-h-[72px] overflow-hidden rounded-lg bg-slate-50 p-2 sm:mt-6 sm:p-4 sm:max-h-[160px]">
                                        <img src="/assetes/e-commerce.png" alt="ecommerce" className="h-full w-full object-contain" />
                                    </div>
                                    <p className="mt-2 text-center text-[10px] leading-4 text-slate-500 sm:mt-4 sm:text-sm">Set up an online store to sell your products. Add and manage your products to start selling online.</p>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
