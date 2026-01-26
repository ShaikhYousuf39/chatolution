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
          <a href="/dashboard/e-commerce/content" className="flex items-center gap-2 text-sm text-slate-600">
            <span className="flex h-7 w-7 items-center justify-center rounded-full ">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                <path d="M12.5 5l-5 5 5 5" stroke="#566273" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Back
          </a>

          <div className="mt-6 space-y-2">
            <a
              href="/dashboard/e-commerce/settings/general"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-slate-400">

                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.96162 0.667374C8.07467 -0.224841 9.84166 -0.223043 10.9606 0.676325H10.9598L16.7338 5.29221L16.7362 5.29384C17.164 5.63848 17.4847 6.1433 17.681 6.65777C17.8773 7.1724 17.9747 7.76268 17.8861 8.30572L17.8853 8.30816L16.7769 14.9415V14.9431C16.5259 16.4174 15.1248 17.6049 13.6275 17.605H4.29397C2.78893 17.605 1.39553 16.4268 1.14456 14.9431L1.14375 14.9415L0.0353468 8.30816L0.0361606 8.30735C-0.057099 7.76326 0.0375338 7.17262 0.233914 6.65777C0.430949 6.14131 0.755066 5.63511 1.1885 5.29058L6.96162 0.667374ZM10.1769 1.65045C9.51268 1.11689 8.39637 1.11908 7.74287 1.64312L1.96813 6.26796L1.9665 6.26959C1.74996 6.44171 1.5401 6.74024 1.40172 7.10292C1.28066 7.42025 1.23298 7.73664 1.25442 7.99241L1.26826 8.0982L1.26907 8.10227H1.26826L2.37666 14.7348L2.41328 14.8983C2.63551 15.7067 3.45516 16.355 4.29397 16.355H13.6275C14.5127 16.3549 15.394 15.6103 15.544 14.7356L16.6524 8.10227C16.6964 7.82909 16.6518 7.46629 16.5132 7.10292C16.3745 6.73936 16.1663 6.441 15.9533 6.26877L10.1786 1.65207L10.1769 1.65045Z" fill="#566273" />
                  <path d="M10.4206 9.63851C10.4206 8.83309 9.76765 8.18018 8.96224 8.18018C8.15682 8.18018 7.50391 8.83309 7.50391 9.63851C7.50391 10.4439 8.15682 11.0968 8.96224 11.0968C9.76765 11.0968 10.4206 10.4439 10.4206 9.63851ZM11.6706 9.63851C11.6706 11.1343 10.458 12.3468 8.96224 12.3468C7.46647 12.3468 6.25391 11.1343 6.25391 9.63851C6.25391 8.14274 7.46647 6.93018 8.96224 6.93018C10.458 6.93018 11.6706 8.14274 11.6706 9.63851Z" fill="#566273" />
                </svg>

              </span>
              General
            </a>
            <button className="flex w-full items-center gap-2 rounded-lg bg-[#EEF4FF] px-3 py-2 text-sm font-semibold text-[#0F67FD]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full  text-white">

                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.6064 12.225L12.1481 15.6833C12.0147 15.8166 11.8897 16.075 11.8564 16.2583L11.6647 17.5833C11.5981 18.0583 11.9314 18.4 12.4064 18.325L13.7314 18.1333C13.9147 18.1083 14.1731 17.975 14.3064 17.8416L17.7647 14.3833C18.3564 13.7916 18.6397 13.0916 17.7647 12.2166C16.8981 11.35 16.2064 11.625 15.6064 12.225Z" fill="#0F67FD" />
                  <path d="M15.1172 12.7167C15.4089 13.7667 16.2339 14.5833 17.2839 14.8833L15.1172 12.7167Z" fill="#0F67FD" />
                  <path d="M1.69245 12.1917C1.69245 12.2167 1.67578 12.25 1.67578 12.275C2.44245 13.8083 3.69245 15.0666 5.22578 15.825C5.25078 15.825 5.28411 15.8083 5.30911 15.8083C5.02578 14.8416 4.80911 13.85 4.65078 12.8583C3.65078 12.6917 2.65911 12.475 1.69245 12.1917Z" fill="#0F67FD" />
                  <path d="M15.8901 5.35837C15.1068 3.7167 13.7818 2.3917 12.1484 1.6167C12.4484 2.60837 12.6984 3.62503 12.8651 4.6417C13.8818 4.80837 14.8984 5.05003 15.8901 5.35837Z" fill="#0F67FD" />
                  <path d="M1.60938 5.35835C2.60938 5.05835 3.62604 4.80835 4.64271 4.64168C4.80938 3.65002 5.01771 2.66668 5.30104 1.70002C5.27604 1.70002 5.24271 1.68335 5.21771 1.68335C3.65104 2.45835 2.37604 3.76668 1.60938 5.35835Z" fill="#0F67FD" />
                  <path d="M11.5177 4.46671C11.3177 3.38337 11.0677 2.30004 10.7094 1.25004C10.6927 1.19171 10.6927 1.14171 10.6844 1.07504C10.0677 0.925041 9.41771 0.833374 8.75104 0.833374C8.07604 0.833374 7.43438 0.925041 6.80938 1.08337C6.80104 1.14171 6.80937 1.19171 6.79271 1.25837C6.44271 2.30837 6.18438 3.38337 5.98438 4.46671C7.82604 4.26671 9.67604 4.26671 11.5177 4.46671Z" fill="#0F67FD" />
                  <path d="M4.46536 5.98328C3.3737 6.18328 2.30703 6.44161 1.2487 6.79161C1.19036 6.80828 1.14036 6.80828 1.08203 6.81661C0.923698 7.43328 0.832031 8.08328 0.832031 8.74994C0.832031 9.42494 0.923698 10.0666 1.08203 10.6916C1.14036 10.6999 1.19036 10.6916 1.25703 10.7083C2.30703 11.0583 3.38203 11.3166 4.4737 11.5166C4.26536 9.67494 4.26536 7.82494 4.46536 5.98328Z" fill="#0F67FD" />
                  <path d="M16.4151 6.81661C16.3568 6.81661 16.3068 6.80828 16.2401 6.79161C15.1901 6.44161 14.1068 6.18328 13.0234 5.98328C13.2318 7.82494 13.2318 9.67494 13.0234 11.5083C14.1068 11.3083 15.1901 11.0583 16.2401 10.6999C16.2984 10.6833 16.3484 10.6916 16.4151 10.6833C16.5651 10.0583 16.6651 9.41661 16.6651 8.74161C16.6651 8.08328 16.5734 7.44161 16.4151 6.81661Z" fill="#0F67FD" />
                  <path d="M5.98438 13.0334C6.18438 14.125 6.43437 15.2 6.79271 16.25C6.80937 16.3084 6.80104 16.3584 6.80938 16.425C7.43438 16.575 8.07604 16.6667 8.75104 16.6667C9.41771 16.6667 10.0677 16.575 10.6844 16.4167C10.6927 16.3584 10.6927 16.3084 10.7094 16.2417C11.0594 15.1917 11.3177 14.1167 11.5177 13.025C10.601 13.125 9.67604 13.2 8.75104 13.2C7.82604 13.2 6.90104 13.1334 5.98438 13.0334Z" fill="#0F67FD" />
                  <path d="M5.79297 5.79163C5.54297 7.75829 5.54297 9.74163 5.79297 11.7166C7.75964 11.9666 9.74297 11.9666 11.718 11.7166C11.968 9.74996 11.968 7.76663 11.718 5.79163C9.74297 5.54163 7.75964 5.54163 5.79297 5.79163Z" fill="#0F67FD" />
                </svg>

              </span>
              Publishing
            </button>
          </div>
        </aside>

        <main className="flex-1 px-10 py-6">
          <h1 className="text-xl font-semibold">Publishing</h1>
          <div>
            <h2 className="mt-7 text-xl font-semibold ">Connect Your Domain</h2>
            <p className="mt-5 text-[16px] font-normal text-slate-500">
              Connect your custom domain to our platform to gain control over your site's web address. Configure your domain's DNS settings to point it here.
            </p>
          </div>
          <div className="mt-6 rounded-xl shadow bg-white p-3">
            <div className="space-y-4">


              <div className="mt-4">
                <p className="text-[18px] font-normal text-slate-700">
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
                <p className="mt-3 text-[14px] text-slate-400">
                  DNS changes can take up to 48 hours to propagate and verify.
                </p>
                <div className="mt-4 flex justify-end">
                  <button className="rounded-[12px] bg-[#0F67FD] py-[15px] px-[30px] text-[12px] font-semibold text-white">
                    Verify &amp; Connect
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button className="rounded-[12px] bg-black py-[15px] px-[30px] mr-[12px]  text-sm font-semibold text-white">
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
