'use client'

import React, { useState } from 'react'
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

type CardData = {
  id: string
  title: string
  description: string
  imageName: string
  imageUrl: string | null
}

const createCard = (): CardData => ({
  id: Math.random().toString(36).slice(2),
  title: '',
  description: '',
  imageName: '',
  imageUrl: null,
})

const Page = () => {
  const [accreditationCards, setAccreditationCards] = useState<CardData[]>([
    createCard(),
    createCard(),
  ])
  const [saveStatus, setSaveStatus] = useState('')

  const updateCard = (id: string, patch: Partial<CardData>) => {
    setAccreditationCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...patch } : card))
    )
  }

  const handleCardImageChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAccreditationCards((prev) =>
      prev.map((card) => {
        if (card.id !== id) return card
        if (card.imageUrl) URL.revokeObjectURL(card.imageUrl)
        return { ...card, imageName: file.name, imageUrl: url }
      })
    )
    event.target.value = ''
  }

  const addCard = () => {
    setAccreditationCards((prev) => [...prev, createCard()])
  }

  const handleSave = () => {
    setSaveStatus('Saved just now')
    window.setTimeout(() => setSaveStatus(''), 2000)
  }

  return (
    <div className={`${jakarta.className} min-h-screen bg-white text-slate-900`}>
      <div className="flex min-h-screen flex-col px-10 py-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Accreditation</span>
        </div>

        <div className="mt-6">
          <h1 className="text-2xl font-semibold">Create Accreditation Cards</h1>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {accreditationCards.map((card) => (
              <div
                key={card.id}
                className="space-y-4 flex flex-col justify-center rounded-xl border border-[#DFE9FA] bg-white p-4"
              >
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 px-4 py-6 text-center text-xs text-slate-500">
                  {card.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={card.imageUrl}
                      alt="Card upload"
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <UploadCloudIcon className="h-7 w-7 text-blue-500" />
                  )}
                  <div>
                    <span className="font-semibold text-blue-600">Click to upload</span> or drag
                    and drop
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {card.imageName || 'JPG, JPEG, PNG less than 5MB'}
                  </div>
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleCardImageChange(card.id, event)}
                  />
                </label>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Accreditation title
                  </label>
                  <input
                    value={card.title}
                    onChange={(event) => updateCard(card.id, { title: event.target.value })}
                    placeholder="Write title..."
                    className="w-full rounded-xl border mt-2 border-none bg-[#FAFAFA] px-3 py-3 text-sm text-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Accreditation description
                  </label>
                  <textarea
                    value={card.description}
                    onChange={(event) => updateCard(card.id, { description: event.target.value })}
                    placeholder="Write description..."
                    className="min-h-22.5 w-full mt-2 rounded-xl border border-none bg-[#FAFAFA] px-3 py-3 text-sm text-slate-600"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addCard}
              className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-3 border-dashed border-[#0F67FD] bg-white p-6 text-center text-base text-slate-500 transition hover:border-blue-500 hover:bg-blue-50/40"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-blue-600">
                <AddFileIcon className="h-8 w-8" />
              </div>
              <p className="text-lg font-semibold text-slate-600">Want to showcase more?</p>
              <p className="text-sm text-slate-400">Add another Accreditation!</p>
            </button>
          </div>
        </div>

        <div className="mt-auto flex justify-end pt-12">
          <div className="flex items-center gap-4">
            {saveStatus && (
              <span className="text-xs font-semibold text-green-600">{saveStatus}</span>
            )}
            <button
              onClick={handleSave}
              className="cursor-pointer rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Save Content
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const UploadCloudIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M6.66602 14.1654V11.6654"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 14.1654V9.16537"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13.3327 14.1654V11.6654"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12.9167 6.66667C12.9167 4.82572 11.4243 3.33333 9.58333 3.33333C7.74238 3.33333 6.25 4.82572 6.25 6.66667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12.9167 6.66667H13.75C15.5909 6.66667 17.0833 8.15905 17.0833 10C17.0833 11.8409 15.5909 13.3333 13.75 13.3333H12.9167"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M2.91602 10C2.91602 8.15905 4.4084 6.66667 6.24935 6.66667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6.66602 18.3346H13.3327C16.0941 18.3346 18.3327 16.096 18.3327 13.3346V10.0013C18.3327 7.23984 16.0941 5.0013 13.3327 5.0013H6.66602C3.90459 5.0013 1.66602 7.23984 1.66602 10.0013V13.3346C1.66602 16.096 3.90459 18.3346 6.66602 18.3346Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)

const AddFileIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path
      d="M24 28H8C5.79086 28 4 26.2091 4 24V8C4 5.79086 5.79086 4 8 4H24C26.2091 4 28 5.79086 28 8V24C28 26.2091 26.2091 28 24 28Z"
      fill="#F0F6FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 10C16.5523 10 17 10.4477 17 11V15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H17V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V17H11C10.4477 17 10 16.5523 10 16C10 15.4477 10.4477 15 11 15H15V11C15 10.4477 15.4477 10 16 10Z"
      fill="#0F67FD"
    />
  </svg>
)

export default Page
