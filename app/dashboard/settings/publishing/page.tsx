 'use client'

import { useState } from 'react'

type DnsRecord = {
  type: string
  name: string
  data: string
}

const initialRecords: DnsRecord[] = [
  { type: 'A', name: '@', data: 'Parked' },
  { type: 'NS', name: '@', data: 'ns03.domaincontrol.com.' },
  { type: 'NS', name: '@', data: 'ns04.domaincontrol.com.' },
  { type: 'CNAME', name: 'www', data: 'chatolution.com.' },
]

const PublishingSettingsPage = () => {
  const [records, setRecords] = useState<DnsRecord[]>(initialRecords)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editRecord, setEditRecord] = useState<DnsRecord>({
    type: '',
    name: '',
    data: '',
  })

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index)
    setEditRecord(records[index])
  }

  const handleSaveEdit = () => {
    if (editingIndex === null) return
    setRecords((prev) =>
      prev.map((record, idx) => (idx === editingIndex ? editRecord : record))
    )
    setEditingIndex(null)
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
  }

  return (
  <div className="min-h-screen bg-white text-slate-900">
    <div className="flex">
      <aside className="w-56 border-r border-slate-200 px-6 py-6">
        <a href="/dashboard/content" className="flex items-center gap-2 text-sm text-slate-600">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
              <path d="M12.5 5l-5 5 5 5" stroke="#566273" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Back
        </a>

        <div className="mt-6 space-y-2">
          <a
            href="/dashboard/settings/general"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-slate-400">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
                <path d="M10 4l5 2v5c0 3-2.5 4.5-5 5-2.5-.5-5-2-5-5V6l5-2z" stroke="#94A3B8" strokeWidth="1.5" />
              </svg>
            </span>
            General
          </a>
          <button className="flex w-full items-center gap-2 rounded-lg bg-[#EEF4FF] px-3 py-2 text-sm font-semibold text-[#0F67FD]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F67FD] text-white">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
                <path d="M6 8h8M6 12h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            Publishing
          </button>
        </div>
      </aside>

      <main className="flex-1 px-10 py-8">
        <h1 className="text-xl font-semibold">Publishing</h1>
        <div className="mt-6 rounded-xl shadow bg-white p-3">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Connect Your Domain</h2>
              <p className="mt-1 text-xs text-slate-500">
                Connect your custom domain to our platform to gain control over your site's web address. Configure your domain's DNS settings to point it here.
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-700">
                Configure your domain's DNS records as follows:
              </p>
              <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                <div className="grid grid-cols-[120px_1fr_1fr_64px] bg-[#FAFAFA] px-4 py-2 text-xs font-semibold text-slate-500">
                  <div>Type</div>
                  <div>Name</div>
                  <div>Data</div>
                  <div className="text-right">Edit</div>
                </div>
                {records.map((row, index) => (
                  <div
                    key={`${row.type}-${row.name}-${row.data}`}
                    className="grid grid-cols-[120px_1fr_1fr_64px] border-t border-slate-200 px-4 py-3 text-xs text-slate-600"
                  >
                    <div>{row.type}</div>
                    <div>{row.name}</div>
                    <div>{row.data}</div>
                    <div className="text-right">
                      <button
                        onClick={() => handleOpenEdit(index)}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"
                      >
                        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
                          <path d="M12.5 4.5l3 3L7 16H4v-3l8.5-8.5z" stroke="#566273" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-slate-400">
                DNS changes can take up to 48 hours to propagate and verify.
              </p>
              <div className="mt-4 flex justify-end">
                <button className="rounded-md bg-[#0F67FD] px-4 py-2 text-xs font-semibold text-white">
                  Verify &amp; Connect
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
            Save Changes
          </button>
        </div>
      </main>
    </div>

    {editingIndex !== null && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <h3 className="text-base font-semibold text-slate-900">Edit DNS Record</h3>
          <div className="mt-3 h-px w-full bg-slate-200" />

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600">Type</label>
              <input
                value={editRecord.type}
                onChange={(event) => setEditRecord({ ...editRecord, type: event.target.value })}
                className="mt-2 w-full rounded-lg bg-[#FAFAFA] px-4 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Name</label>
              <input
                value={editRecord.name}
                onChange={(event) => setEditRecord({ ...editRecord, name: event.target.value })}
                className="mt-2 w-full rounded-lg bg-[#FAFAFA] px-4 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Data</label>
              <input
                value={editRecord.data}
                onChange={(event) => setEditRecord({ ...editRecord, data: event.target.value })}
                className="mt-2 w-full rounded-lg bg-[#FAFAFA] px-4 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              onClick={handleCancelEdit}
              className="rounded-md bg-[#ECEDF0] px-4 py-2 text-xs font-semibold text-slate-600 cursor-pointer"
            >
              No, Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="rounded-md bg-[#0F67FD] px-4 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default PublishingSettingsPage
