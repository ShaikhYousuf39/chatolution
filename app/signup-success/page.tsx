"use client";

import Image from "next/image";
import Link from "next/link";

export default function SignupSuccessPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white px-6 py-12">
            {/* Logo at top-left */}
            <div className="absolute left-6 top-6 lg:left-10 lg:top-10">
                <div className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200">
                    <Link href={"/"}>
                        <img src="/assetes/Group.svg" alt="Logo" className="h-full w-full object-contain" />
                    </Link>
                </div>
            </div>

            <div className="flex w-full flex-1 flex-col items-center justify-center max-w-lg mx-auto text-center">
                {/* Illustration */}
                <div className="mb-8 w-full max-w-[200px]">
                    {/* Using Frame 10.png as the rocket illustration based on file list */}
                    <img
                        src="/assetes/startup.png"
                        alt="Rocket Launch"
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-slate-900">
                    You're all set!
                </h1>

                {/* Subtext */}
                <p className="mt-3 text-sm text-slate-500 max-w-sm">
                    Your account has been successfully verified. Click below to access your admin panel and get started.
                </p>

                {/* Action Button */}
                <Link
                    href="#"
                    className="mt-8 w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                    Let's get started
                </Link>
            </div>
        </main>
    );
}