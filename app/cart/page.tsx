'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  imageAlt: string
}

const CartPage = () => {
  const router = useRouter()
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 'green-hoodie',
      name: 'Green hoodie',
      price: 49.99,
      quantity: 2,
      imageUrl: '/assetes/green-hoodie.png',
      imageAlt: 'Green hoodie',
    },
    {
      id: 'black-hoodie',
      name: 'Black hoodie',
      price: 49.99,
      quantity: 1,
      imageUrl: '/assetes/green-hoodie.png',
      imageAlt: 'Black hoodie',
    },
  ])
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = items.length > 0 ? 5 : 0
  const estimatedTax = items.length > 0 ? 8 : 0
  const total = subtotal + shipping + estimatedTax

  const handleQuantityChange = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const nextQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: nextQty }
      })
    )
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    setItems((prev) => prev.filter((item) => item.id !== deleteTarget))
    setDeleteTarget(null)
  }

  const handleCancelDelete = () => {
    setDeleteTarget(null)
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900">
      <header className="bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <g clipPath="url(#clip0_1328_2523)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.1678 8.1341C19.0436 7.58786 18.5579 7.2002 17.9977 7.2002C17.4374 7.2002 16.9517 7.58786 16.8275 8.1341L16.1636 11.0539C15.8565 12.4045 14.8019 13.459 13.4514 13.7661L10.5316 14.4301C9.98532 14.5543 9.59766 15.04 9.59766 15.6002C9.59766 16.1604 9.98532 16.6461 10.5316 16.7703L13.4514 17.4343C14.8019 17.7414 15.8565 18.7959 16.1636 20.1465L16.8275 23.0663C16.9517 23.6125 17.4374 24.0002 17.9977 24.0002C18.5579 24.0002 19.0436 23.6125 19.1678 23.0663L19.8317 20.1465C20.1388 18.7959 21.1934 17.7414 22.5439 17.4343L25.4638 16.7703C26.01 16.6461 26.3977 16.1604 26.3977 15.6002C26.3977 15.04 26.01 14.5543 25.4638 14.4301L22.5439 13.7661C21.1934 13.459 20.1388 12.4045 19.8317 11.0539L19.1678 8.1341ZM15.3807 15.6002C16.5062 15.0258 17.4233 14.1087 17.9977 12.9832C18.572 14.1087 19.4891 15.0258 20.6146 15.6002C19.4891 16.1746 18.572 17.0917 17.9977 18.2172C17.4233 17.0917 16.5062 16.1746 15.3807 15.6002Z"
                  fill="url(#paint0_linear_1328_2523)"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.2 0C3.22355 0 0 3.22355 0 7.2V24C0 27.9764 3.22355 31.2 7.2 31.2H13.2555L17.0969 35.5902C17.3248 35.8506 17.654 36 18 36C18.346 36 18.6752 35.8506 18.9031 35.5902L22.7445 31.2H28.8C32.7764 31.2 36 27.9764 36 24V7.2C36 3.22355 32.7764 0 28.8 0H7.2ZM2.4 7.2C2.4 4.54903 4.54903 2.4 7.2 2.4H28.8C31.451 2.4 33.6 4.54903 33.6 7.2V24C33.6 26.651 31.451 28.8 28.8 28.8H22.2C21.854 28.8 21.5248 28.9494 21.2969 29.2098L18 32.9777L14.7031 29.2098C14.4752 28.9494 14.146 28.8 13.8 28.8H7.2C4.54903 28.8 2.4 26.651 2.4 24V7.2Z"
                  fill="url(#paint1_linear_1328_2523)"
                />
              </g>
              <defs>
                <linearGradient id="paint0_linear_1328_2523" x1="4.49766" y1="0.000195499" x2="27.5977" y2="30.0002" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1BA2D8" />
                  <stop offset="0.901177" stopColor="#542CFA" />
                </linearGradient>
                <linearGradient id="paint1_linear_1328_2523" x1="4.5" y1="-0.000000344217" x2="27.6" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1BA2D8" />
                  <stop offset="0.901177" stopColor="#542CFA" />
                </linearGradient>
                <clipPath id="clip0_1328_2523">
                  <rect width="36" height="36" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M2.49023 0C3.6794 0.000102597 4.66576 0.800703 4.97949 1.87012H17.4805C19.5831 1.87037 21.1894 3.58712 21.0381 5.68359L20.498 13.1836V13.1875C20.3583 15.0043 18.7759 16.49 16.9404 16.4902H6.29004C4.21307 16.4902 2.5751 14.716 2.75293 12.6455L3.58301 2.6875L3.58594 2.56934C3.57188 1.98655 3.09003 1.50012 2.49023 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75C0 0.335786 0.335786 0 0.75 0H2.49023ZM4.24707 12.7725V12.7744C4.14506 13.9638 5.0871 14.9902 6.29004 14.9902H16.9404C17.9846 14.99 18.9217 14.1152 19.002 13.0723L19.542 5.57617C19.6304 4.35318 18.7172 3.37037 17.4805 3.37012H5.03027L4.24707 12.7725Z" fill="#566273" />
              <path d="M15.5 19.5C15.5 19.2239 15.2761 19 15 19C14.7239 19 14.5 19.2239 14.5 19.5C14.5 19.7761 14.7239 20 15 20C15.2761 20 15.5 19.7761 15.5 19.5ZM17 19.5C17 20.6046 16.1046 21.5 15 21.5C13.8954 21.5 13 20.6046 13 19.5C13 18.3954 13.8954 17.5 15 17.5C16.1046 17.5 17 18.3954 17 19.5Z" fill="#566273" />
              <path d="M7.5 19.5C7.5 19.2239 7.27614 19 7 19C6.72386 19 6.5 19.2239 6.5 19.5C6.5 19.7761 6.72386 20 7 20C7.27614 20 7.5 19.7761 7.5 19.5ZM9 19.5C9 20.6046 8.10457 21.5 7 21.5C5.89543 21.5 5 20.6046 5 19.5C5 18.3954 5.89543 17.5 7 17.5C8.10457 17.5 9 18.3954 9 19.5Z" fill="#566273" />
              <path d="M19.75 6C20.1642 6 20.5 6.33579 20.5 6.75C20.5 7.16421 20.1642 7.5 19.75 7.5H7.75C7.33579 7.5 7 7.16421 7 6.75C7 6.33579 7.33579 6 7.75 6H19.75Z" fill="#566273" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-end gap-2.5">
            <h1 className="text-lg font-semibold">Cart</h1>
            <p className="mt-1 text-sm text-slate-500">({cartCount}) items in your cart</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-700" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M10 7l-5 5 5 5" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="underline">Continue Shopping</span>
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1.6fr_0.6fr_0.7fr_0.6fr_40px] gap-4 bg-slate-100 px-6 py-3 text-xs font-semibold text-slate-600">
              <span>Products</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span />
            </div>

            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[1.6fr_0.6fr_0.7fr_0.6fr_40px] items-center gap-4 px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
                      <img src={item.imageUrl} alt={item.imageAlt} className="h-12 w-12 object-contain" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">${item.price.toFixed(2)}</p>
                  <div className="flex items-center">
                    <div className="flex items-center overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="flex h-8 w-8 items-center justify-center text-slate-600"
                        type="button"
                      >
                        -
                      </button>
                      <span className="flex h-8 w-10 items-center justify-center bg-white text-sm font-semibold text-slate-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="flex h-8 w-8 items-center justify-center text-slate-600"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => setDeleteTarget(item.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-rose-500"
                    type="button"
                  >
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" aria-hidden="true">
                      <path d="M12.7792 5.33417C13.1054 5.35399 13.3529 5.61848 13.332 5.92538L12.8193 13.4058L12.8185 13.4087C12.7974 13.6919 12.7751 14.0051 12.7129 14.2959C12.6494 14.5924 12.5378 14.9054 12.3112 15.1831C11.8365 15.7645 11.0281 15.9999 9.86706 15.9999H4.79841C3.63752 15.9998 2.82966 15.7644 2.35506 15.1831C2.12842 14.9054 2.01683 14.5924 1.95336 14.2959C1.89112 14.0051 1.86805 13.6919 1.84696 13.4087V13.4058L1.33424 5.92538C1.31337 5.61847 1.56082 5.35399 1.88705 5.33417C2.21326 5.31454 2.49437 5.54735 2.51543 5.85429L3.02893 13.3311L3.06285 13.738C3.0759 13.861 3.09232 13.9724 3.11451 14.0761C3.15758 14.2772 3.217 14.4095 3.29416 14.5041C3.42744 14.6673 3.75691 14.8856 4.79841 14.8856H9.86706C10.9087 14.8856 11.238 14.6673 11.3713 14.5041C11.4486 14.4094 11.5086 14.2774 11.5517 14.0761C11.5961 13.8689 11.615 13.631 11.6373 13.3311L12.15 5.85429C12.1711 5.5473 12.4529 5.31445 12.7792 5.33417Z" fill="#C53434" />
                      <path d="M8.36051 0C9.09379 0 9.66072 0.122492 10.0303 0.446217C10.3647 0.739263 10.4341 1.12601 10.4861 1.36894L10.6584 2.14429C10.7127 2.38791 10.497 2.61918 10.1766 2.66041C9.85637 2.70156 9.55296 2.53699 9.49876 2.29342L9.32564 1.51807V1.51574C9.26004 1.20972 9.21802 1.09961 9.14181 1.03282C9.09942 0.995746 8.9518 0.894765 8.36051 0.894765H6.30616C5.70526 0.894765 5.56208 0.99307 5.52409 1.02583C5.45191 1.08815 5.41164 1.19285 5.34102 1.51166L5.16791 2.29283C5.11411 2.53646 4.81113 2.70124 4.49079 2.66041C4.17038 2.61949 3.95441 2.38854 4.00822 2.14487L4.18057 1.3637V1.36312C4.23537 1.11562 4.30426 0.72502 4.64169 0.433984C5.01352 0.113316 5.58148 0 6.30616 0H8.36051Z" fill="#C53434" />
                      <path d="M10.051 8C10.3909 8 10.6664 8.29848 10.6664 8.66668C10.6664 9.03488 10.3909 9.33336 10.051 9.33336H5.9484C5.60853 9.33336 5.33301 9.03488 5.33301 8.66668C5.33301 8.29848 5.60853 8 5.9484 8H10.051Z" fill="#C53434" />
                      <path d="M8.71196 10.667C9.05497 10.667 9.33308 10.9655 9.33308 11.3337C9.33308 11.7018 9.05497 12.0003 8.71196 12.0004H5.95413C5.61109 12.0004 5.33301 11.7019 5.33301 11.3337C5.33301 10.9655 5.61109 10.667 5.95413 10.667H8.71196Z" fill="#C53434" />
                      <path d="M6.56658 2.66699C9.09779 2.667 11.6362 2.78137 14.1588 3.00297C14.4687 3.0303 14.6949 3.27514 14.6641 3.54991C14.6333 3.82464 14.3571 4.0251 14.0471 3.99787C11.5606 3.77945 9.05955 3.66712 6.56658 3.66711C5.09632 3.66711 3.62549 3.73272 2.15494 3.8644L2.15347 3.86505L0.619014 3.99787C0.308966 4.02482 0.0331695 3.82408 0.00273493 3.54925C-0.0276619 3.27442 0.198797 3.02995 0.508833 3.00297L2.04182 2.87014V2.86949C3.5498 2.73447 5.05831 2.66699 6.56658 2.66699Z" fill="#C53434" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Order Summary</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-700">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-slate-700">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated Tax</span>
                <span className="font-semibold text-slate-700">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="my-3 h-px w-full bg-slate-100" />
              <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              type="button"
              onClick={() => router.push('/checkout')}
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </main>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">
              Are you sure you want to delete this item?
            </h3>
            <div className="mt-3 h-px w-full bg-slate-200" />
            <p className="mt-2 text-sm text-slate-500">
              This item will be removed from your cart.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleConfirmDelete}
                className="rounded-md bg-[#C53434] px-5 py-2.5 text-sm font-semibold text-white"
                type="button"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="rounded-md bg-[#ECEDF0] px-5 py-2.5 text-sm font-semibold text-slate-600"
                type="button"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
