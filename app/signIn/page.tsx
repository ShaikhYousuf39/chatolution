
"use client";
import Image from "next/image";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/");
  };
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full items-stretch">
        {/* LEFT: Sign in form */}
        {/* LEFT: Sign in form */}
        <section className="flex w-full flex-col px-6 py-4  lg:w-[50%] lg:px-37 items-center">
          {/* Logo at top-left of the container */}
          <div className="relative w-full h-full">
            <div className="absolute top-[30px] left-0 mb-auto flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200">
                <Link href={"/"}>

                  <img src="/assetes/Group.svg" alt="Logo" className="h-full w-full object-contain" />

                </Link>

              </div>
            </div>
          </div>

          <div className="py-15 w-full max-w-md flex flex-col h-full">
            <div className="w-full flex-1 flex flex-col justify-center">
              <h1 className="text-2xl font-semibold text-slate-900">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Sign in to your account.
              </p>

              <form className="mt-2 space-y-2 sm:mt-8" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="chatolution.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'} // Toggle the input type
                      placeholder="••••••••"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
                      name="password"
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={togglePasswordVisibility} // Toggle the visibility on click
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="opacity-80"
                      >
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
                    </button>
                  </div>
                </div>

                {/* Forgot + Sign up */}
                <div className="flex items-center justify-between pt-1">
                  <Link
                    href="/forgetpassword"
                    className="text-sm text-slate-500 hover:text-slate-800"
                  >
                    Forgot your password?
                  </Link>
                  <a
                    href="/signup"
                    className="text-sm font-medium text-slate-900 hover:underline"
                  >
                    Sign Up
                  </a>
                </div>

                {error ? (
                  <p className="text-sm text-red-600">{error}</p>
                ) : null}

                {/* Sign in button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 h-11 w-full rounded-xl bg-black text-sm font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-black/20 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>

                {/* divider */}
                <div className="relative py-3">
                  <div className="h-px w-full bg-slate-200" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-400">
                    or
                  </span>
                </div>

                {/* SSO buttons */}
                <div className="space-y-3">
                  <SocialButton label="Log in with Google" onClick={() => signIn("google", { callbackUrl: "/" })}>
                    <img
                      src="/assetes/google-logo.png"
                      alt="Google"
                      className="h-full w-full object-contain "
                    />
                  </SocialButton>
                  <SocialButton label="Log in with Microsoft" onClick={() => signIn("microsoft-entra-id", { callbackUrl: "/" })}>
                    <MicrosoftIcon />
                  </SocialButton>

                </div>
              </form>
            </div>
          </div>
        </section>

        {/* RIGHT: iPhone mock + background */}
        <section className="relative my-4 mr-5 hidden w-[60%] overflow-hidden lg:flex items-center justify-center rounded-lg">
          <div className="relative w-full h-full rounded-lg">
            {/* Background */}
            <div className="absolute inset-0 bg-[#fbfbfd] rounded-lg"></div>
            <img
              alt="Background"
              decoding="async"
              data-nimg="fill"
              className="object-cover opacity-60 rounded-lg"
              style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
              sizes="100vw"
              src="/assetes/Sign-In-bg.png" />



            {/* Overlay grid effect */}
            {/* <div className="absolute inset-0 opacity-[0.35]" style={{ backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div> */}

            {/* Circle behind iPhone */}
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full "></div>

            {/* iPhone Mockup */}
            <div className="relative z-10 flex h-full items-center justify-center">
              <div className="relative h-[500px] w-[320px]">
                <img
                  alt="iPhone preview"
                  decoding="async"
                  data-nimg="fill"
                  className="object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,0.25)] rounded-lg"
                  style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
                  sizes="100vw"
                  src="/assetes/iphone.png" />
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

/* ---------- Small components/icons ---------- */

function SocialButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 hover:bg-slate-50"
    >
      <span className="grid h-5 w-5 place-items-center">{children}</span>
      {label}
    </button>
  );
}



function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#F25022" d="M2 2h9v9H2z" />
      <path fill="#7FBA00" d="M13 2h9v9h-9z" />
      <path fill="#00A4EF" d="M2 13h9v9H2z" />
      <path fill="#FFB900" d="M13 13h9v9h-9z" />
    </svg>
  );
}





