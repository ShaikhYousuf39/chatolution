
"use client"

import { useRef } from "react"
import Link from "next/link"

const HomeLandingPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("File selected:", e.target.files[0].name)
    }
  }

  return (
    // bg-[#F2F2F2]
    <div className="min-h-screen overflow-x-hidden">
      <div className="min-h-screen w-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_55%,rgba(255,255,255,0.9)_72%,white_100%),linear-gradient(to_right,#ACD1FE4D_0%,#F7D4B34D_100%)]">
        <div className="flex min-h-[calc(100vh-48px)] flex-col items-center justify-between px-4 pt-8 pb-4 sm:pt-8 sm:pb-8 md:px-6 md:py-14">
          <div className="mb-10 flex w-full max-w-3xl flex-col items-center gap-4 sm:mb-16 sm:gap-5 md:mb-[25px] md:gap-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg  ">
              <Link href="/">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0584 8.08642C18.9349 7.54336 18.4521 7.15796 17.8951 7.15796C17.3381 7.15796 16.8553 7.54336 16.7318 8.08642L16.0717 10.9892C15.7664 12.3319 14.718 13.3803 13.3753 13.6856L10.4725 14.3457C9.92945 14.4692 9.54405 14.9521 9.54405 15.509C9.54405 16.066 9.92945 16.5488 10.4725 16.6723L13.3753 17.3324C14.718 17.6377 15.7664 18.6861 16.0717 20.0288L16.7318 22.9316C16.8553 23.4747 17.3381 23.8601 17.8951 23.8601C18.4521 23.8601 18.9349 23.4747 19.0584 22.9316L19.7185 20.0288C20.0238 18.6861 21.0722 17.6377 22.4149 17.3324L25.3177 16.6723C25.8608 16.5488 26.2462 16.066 26.2462 15.509C26.2462 14.9521 25.8608 14.4692 25.3177 14.3457L22.4149 13.6856C21.0722 13.3803 20.0238 12.3319 19.7185 10.9892L19.0584 8.08642ZM15.2934 15.509C16.4123 14.938 17.3241 14.0262 17.8951 12.9073C18.4661 14.0262 19.3779 14.938 20.4968 15.509C19.3779 16.08 18.4661 16.9918 17.8951 18.1107C17.3241 16.9918 16.4123 16.08 15.2934 15.509Z" fill="url(#paint0_linear_35_136)" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.15805 0C3.20476 0 0 3.20476 0 7.15805V23.8602C0 27.8134 3.20476 31.0182 7.15805 31.0182H13.1783L16.9973 35.3828C17.2238 35.6417 17.5511 35.7902 17.8951 35.7902C18.2391 35.7902 18.5664 35.6417 18.793 35.3828L22.612 31.0182H28.6322C32.5855 31.0182 35.7902 27.8134 35.7902 23.8602V7.15805C35.7902 3.20476 32.5855 0 28.6322 0H7.15805ZM2.38602 7.15805C2.38602 4.52253 4.52253 2.38602 7.15805 2.38602H28.6322C31.2677 2.38602 33.4042 4.52253 33.4042 7.15805V23.8602C33.4042 26.4957 31.2677 28.6322 28.6322 28.6322H22.0706C21.7266 28.6322 21.3993 28.7807 21.1728 29.0396L17.8951 32.7855L14.6174 29.0396C14.3909 28.7807 14.0636 28.6322 13.7196 28.6322H7.15805C4.52253 28.6322 2.38602 26.4957 2.38602 23.8602V7.15805Z" fill="url(#paint1_linear_35_136)" />
                <defs>
                  <linearGradient id="paint0_linear_35_136" x1="4.47377" y1="-8.67875e-05" x2="27.4392" y2="29.8251" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#1BA2D8" />
                    <stop offset="0.901177" stop-color="#542CFA" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_35_136" x1="4.47378" y1="-3.42211e-07" x2="27.4392" y2="29.8252" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#1BA2D8" />
                    <stop offset="0.901177" stop-color="#542CFA" />
                  </linearGradient>
                </defs>
              </svg>
</Link>
            </div>
            <div className="text-center px-4">
              <h1 className="text-xl font-semibold text-slate-900">Ask Me Anything</h1>
              <p className="w-full max-w-xs mx-auto mt-2 text-sm text-slate-500">
                Pick a prompt or ask anything to start working smarter with Neo.
              </p>
            </div>
            <div className="mt-4 grid w-full max-w-4xl grid-cols-2 gap-3 px-0 sm:px-4 sm:gap-4 md:w-[88%] md:grid-cols-4 md:gap-0">
              {[
                "Create a new case",
                "Draft a proposal",
                "Summarize a negotiation",
                "Prepare for client meeting",
              ].map((label) => (
                <button
                  key={label}
                  className="w-full min-h-[84px] rounded-2xl border border-slate-200 bg-white px-3 py-3 text-left text-[14px] font-medium text-slate-800 shadow-sm transition hover:border-slate-300 sm:min-h-[92px] sm:px-4 sm:py-4 md:h-[92px] md:w-[150px] md:py-5"
                >
                  {label}
                </button>
              ))}
            </div>
            <button className="mt-2 inline-flex items-center gap-2 text-[14px ] font-bold text-slate-800">
              See prompt library
              <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none">
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <div className="mt-3 mb-[-40px] w-full max-w-3xl px-4 md:mt-0 md:mb-[-70px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <input
                className="w-full border-none bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-300"
                placeholder="Ask anything, use @ to tag cases and users"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex flex-1 flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    onClick={handleFileClick}
                    className="font-bold inline-flex items-center gap-2 rounded-full px-3 py-1.5 hover:cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full">

                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.97396 10V12.9167C9.97396 14.525 11.2823 15.8333 12.8906 15.8333C14.499 15.8333 15.8073 14.525 15.8073 12.9167V8.33333C15.8073 5.10833 13.199 2.5 9.97396 2.5C6.74896 2.5 4.14062 5.10833 4.14062 8.33333V13.3333C4.14062 16.0917 6.38229 18.3333 9.14063 18.3333" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </span>
                    Add
                  </button>
                  <button className="font-bold inline-flex items-center gap-2 rounded-full  px-3 py-1.5">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ">

                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.0515 8.69992L17.2348 12.1833C16.5348 15.1916 15.1515 16.4083 12.5515 16.1583C12.1348 16.1249 11.6848 16.0499 11.2015 15.9333L9.80145 15.5999C6.32645 14.7749 5.25145 13.0583 6.06812 9.57493L6.88479 6.08326C7.05145 5.37493 7.25145 4.75826 7.50145 4.24993C8.47645 2.23326 10.1348 1.69159 12.9181 2.34993L14.3098 2.67493C17.8015 3.49159 18.8681 5.21659 18.0515 8.69992Z" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.5513 16.1583C12.0346 16.5083 11.3846 16.8 10.5929 17.0583L9.27626 17.4917C5.96793 18.5583 4.22626 17.6667 3.15126 14.3583L2.08459 11.0667C1.01793 7.75833 1.90126 6.00833 5.20959 4.94167L6.52626 4.50833C6.86793 4.4 7.19293 4.30833 7.50126 4.25C7.25126 4.75833 7.05126 5.375 6.88459 6.08333L6.06793 9.575C5.25126 13.0583 6.32626 14.775 9.80126 15.6L11.2013 15.9333C11.6846 16.05 12.1346 16.125 12.5513 16.1583Z" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.5352 7.1084L14.5768 8.1334" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9.71484 10.3333L12.1315 10.9499" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </span>
                    Browse Prompts
                  </button>
                </div>
                <button className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-slate-400">

                  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="25" height="25.3333" rx="12.5" fill="#ECEDF0" />
                    <path d="M12.5 19.3333V5.99992M12.5 5.99992L17.5 10.9999M12.5 5.99992L7.5 10.9999" stroke="white" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeLandingPage
