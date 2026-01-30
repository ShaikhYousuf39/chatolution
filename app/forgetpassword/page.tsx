'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

export default function ForgetPasswordPage() {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
    const otpRefs = useRef<Array<HTMLInputElement | null>>([])
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto flex min-h-screen w-full items-stretch">
                <section className="flex w-full flex-col px-6 lg:px-37 items-center">
                    <div className="relative w-full">
                        <div className="absolute top-[20px] left-0 mb-auto flex items-center gap-2">
                            <div className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200">
                                <Link href="/">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/assetes/Group.svg" alt="Logo" className="h-full w-full object-contain" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="py-15 w-full max-w-sm flex flex-col h-full">
                        <div className="w-full flex-1 flex flex-col justify-center">
                            {step < 4 && (
                                <div className="w-full">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[11px] font-semibold text-white">
                                            {step > 1 ? (
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M10 3.5L4.75 8.75L2 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            ) : (
                                                '1'
                                            )}
                                        </div>
                                        <div className={`h-[2px] flex-1 ${step > 1 ? 'bg-black' : 'bg-slate-200'}`} />
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold ${step >= 2 ? 'bg-black text-white' : 'bg-slate-200 text-slate-500'}`}>
                                            {step > 2 ? (
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M10 3.5L4.75 8.75L2 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            ) : (
                                                '2'
                                            )}
                                        </div>
                                        <div className={`h-[2px] flex-1 ${step > 2 ? 'bg-black' : 'bg-slate-200'}`} />
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold ${step >= 3 ? 'bg-black text-white' : 'bg-slate-200 text-slate-500'}`}>
                                            {step > 3 ? (
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M10 3.5L4.75 8.75L2 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            ) : (
                                                '3'
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 1 && (
                                <>
                                    <h1 className="mt-5 text-xl font-semibold text-slate-900">Forgot Password?</h1>
                                    <p className="mt-5 text-xs text-slate-500 max-w-xs">
                                        Enter your email for the verification process, we will send 4
                                        digits code to your email.
                                    </p>

                                    <div className="mt-5 space-y-2">
                                        <label htmlFor="email" className="text-xs font-medium text-slate-700">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="chatolution@gmail.com"
                                            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                        />
                                    </div>

                                    <div className="mt-5 flex items-center gap-3">
                                        <Link
                                            href="/signIn"
                                            className="h-9 w-20 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-center justify-center hover:bg-slate-50"
                                        >
                                            Back
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="h-9 flex-1 rounded-lg bg-black text-xs font-medium text-white hover:bg-slate-900"
                                        >
                                            Reset password
                                        </button>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <h1 className="mt-5 text-xl font-semibold text-slate-900">Verification</h1>
                                    <p className="mt-5 text-xs text-slate-500 max-w-xs">
                                        An authentication code has been sent to your email.
                                    </p>

                                    <div className="mt-6 flex items-center justify-center gap-3">
                                        {['', '', '', ''].map((value, index) => (
                                            <input
                                                key={`${value}-${index}`}
                                                ref={(el) => {
                                                    otpRefs.current[index] = el
                                                }}
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={1}
                                                defaultValue={value}
                                                onChange={(event) => {
                                                    const nextValue = event.target.value.replace(/\D/g, '').slice(0, 1)
                                                    event.target.value = nextValue
                                                    if (nextValue && otpRefs.current[index + 1]) {
                                                        otpRefs.current[index + 1]?.focus()
                                                    }
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Backspace' && !event.currentTarget.value && otpRefs.current[index - 1]) {
                                                        otpRefs.current[index - 1]?.focus()
                                                    }
                                                }}
                                                className="h-11 w-11 rounded-xl border border-slate-200 bg-white text-center text-base font-semibold text-slate-900 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                            />
                                        ))}
                                    </div>

                                    <div className="mt-5 flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="h-9 w-20 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-center justify-center hover:bg-slate-50"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setStep(3)}
                                            className="h-9 flex-1 rounded-lg bg-black text-xs font-medium text-white hover:bg-slate-900"
                                        >
                                            Verify
                                        </button>
                                    </div>

                                    <div className="mt-3 text-xs text-slate-500 text-center">
                                        No email in your inbox or spam folder?{' '}
                                        <span className="font-semibold text-slate-900">00:58</span>{' '}
                                        <button type="button" className="font-semibold text-slate-900 underline">
                                            Resend
                                        </button>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <h1 className="mt-5 text-xl font-semibold text-slate-900">Set New Password</h1>
                                    <p className="mt-5 text-xs text-slate-500 max-w-xs">
                                        Create a strong password for your account
                                    </p>

                                    <div className="mt-5 space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-700">New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    placeholder="Password!@#123"
                                                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                                />
                                                <button
                                                    type="button"
                                                    aria-label="Toggle password visibility"
                                                    onClick={() => setShowNewPassword((prev) => !prev)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                                                >
                                                    {showNewPassword ? (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                            <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                                            <path
                                                                d="M10.2 5.1c.6-.1 1.2-.1 1.8-.1 6.5 0 10 7 10 7-.6 1.1-1.5 2.3-2.7 3.3"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                strokeLinecap="round"
                                                            />
                                                            <path
                                                                d="M6.5 6.5C3.6 8.6 2 12 2 12s3.5 7 10 7c1.1 0 2.1-.2 3-.5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                strokeLinecap="round"
                                                            />
                                                            <path d="M14.1 14.1a3 3 0 0 1-4.2-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                            <path
                                                                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-700">Confirm Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="••••••••"
                                                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                                />
                                                <button
                                                    type="button"
                                                    aria-label="Toggle password visibility"
                                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                                                >
                                                    {showConfirmPassword ? (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                            <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                                            <path
                                                                d="M10.2 5.1c.6-.1 1.2-.1 1.8-.1 6.5 0 10 7 10 7-.6 1.1-1.5 2.3-2.7 3.3"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                strokeLinecap="round"
                                                            />
                                                            <path
                                                                d="M6.5 6.5C3.6 8.6 2 12 2 12s3.5 7 10 7c1.1 0 2.1-.2 3-.5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                strokeLinecap="round"
                                                            />
                                                            <path d="M14.1 14.1a3 3 0 0 1-4.2-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                            <path
                                                                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setStep(4)}
                                        className="mt-6 h-9 w-full rounded-lg bg-black text-xs font-medium text-white hover:bg-slate-900"
                                    >
                                        Set Password
                                    </button>
                                </>
                            )}

                            {step === 4 && (
                                <div className="mt-6 flex flex-col items-center text-center">
                                    <div className="flex h-14 w-20 py-10 items-center justify-center rounded-full  text-white">

                                        <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1438_3026)">
                                                <path d="M89.5467 38.9083C88.0111 37.058 86.8052 34.9574 85.9817 32.6983C85.354 30.7786 84.5853 28.908 83.6817 27.1016C82.656 24.9295 82.0202 22.5939 81.8034 20.2016C81.51 17.6494 80.3616 15.2716 78.545 13.455C76.7284 11.6384 74.3506 10.49 71.7984 10.1966C69.4061 9.97978 67.0705 9.34399 64.8984 8.3183C63.0981 7.4015 61.2264 6.63231 59.3017 6.0183C57.0386 5.20337 54.9366 3.99665 53.0917 2.4533C51.0592 0.88747 48.5657 0.0383301 46 0.0383301C43.4344 0.0383301 40.9408 0.88747 38.9084 2.4533C37.0725 4.00017 34.9673 5.19567 32.6984 5.97997C30.7888 6.61688 28.9306 7.39859 27.14 8.3183C24.9525 9.33873 22.6053 9.97415 20.2017 10.1966C17.6495 10.49 15.2716 11.6384 13.4551 13.455C11.6385 15.2716 10.4901 17.6494 10.1967 20.2016C9.97422 22.6052 9.33879 24.9524 8.31836 27.14C7.4084 28.9302 6.6394 30.7886 6.01836 32.6983C5.19488 34.9574 3.98897 37.058 2.45336 38.9083C0.863998 40.9305 0 43.4279 0 46C0 48.572 0.863998 51.0695 2.45336 53.0916C3.98897 54.9419 5.19488 57.0425 6.01836 59.3016C6.64605 61.2213 7.41481 63.092 8.31836 64.8983C9.34406 67.0704 9.97985 69.406 10.1967 71.7983C10.4901 74.3505 11.6385 76.7284 13.4551 78.5449C15.2716 80.3615 17.6495 81.5099 20.2017 81.8033C22.594 82.0202 24.9296 82.6559 27.1017 83.6816C28.902 84.5984 30.7737 85.3676 32.6984 85.9816C34.9614 86.7966 37.0635 88.0033 38.9084 89.5466C40.9305 91.136 43.428 92 46 92C48.5721 92 51.0695 91.136 53.0917 89.5466C54.9276 87.9998 57.0327 86.8043 59.3017 86.02C61.2113 85.3831 63.0694 84.6013 64.86 83.6816C67.0476 82.6612 69.3948 82.0258 71.7984 81.8033C74.3506 81.5099 76.7284 80.3615 78.545 78.5449C80.3616 76.7284 81.51 74.3505 81.8034 71.7983C82.0258 69.3947 82.6613 67.0475 83.6817 64.86C84.5917 63.0698 85.3607 61.2114 85.9817 59.3016C86.8052 57.0425 88.0111 54.9419 89.5467 53.0916C91.1361 51.0695 92.0001 48.572 92.0001 46C92.0001 43.4279 91.1361 40.9305 89.5467 38.9083ZM60.2102 41.0435L50.2976 50.9565C48.1391 53.1088 45.2153 54.3175 42.1671 54.3179C39.1189 54.3182 36.1949 53.1102 34.0358 50.9584L31.7899 48.7101C31.0916 47.9872 30.7052 47.0189 30.7139 46.0138C30.7227 45.0087 31.1258 44.0472 31.8366 43.3365C32.5473 42.6258 33.5087 42.2226 34.5138 42.2139C35.5189 42.2052 36.4872 42.5915 37.2102 43.2898L39.4565 45.5358C40.1756 46.2541 41.1506 46.6575 42.1671 46.6571C43.1836 46.6568 44.1583 46.2527 44.8769 45.5338L54.7899 35.6231C55.5128 34.9249 56.4812 34.5385 57.4862 34.5472C58.4913 34.556 59.4528 34.9591 60.1635 35.6698C60.8742 36.3806 61.2774 37.342 61.2861 38.3471C61.2949 39.3522 60.9085 40.3205 60.2102 41.0435Z" fill="black" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1438_3026">
                                                    <rect width="92" height="92" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>
                                    <h1 className="mt-5 text-lg font-semibold text-slate-800">Password Reset Successfully!</h1>
                                    <p className="mt-3 text-xs text-slate-500">Redirecting to login...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
