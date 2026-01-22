const SettingsPage = () => (
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
          <button className="flex w-full items-center gap-2 rounded-lg bg-[#EEF4FF] px-3 py-2 text-sm font-semibold text-[#0F67FD]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F67FD] text-white">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
                <path d="M10 4l5 2v5c0 3-2.5 4.5-5 5-2.5-.5-5-2-5-5V6l5-2z" fill="white" />
              </svg>
            </span>
            General
          </button>
          <a
            href="/dashboard/settings/publishing"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-slate-400">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
                <path d="M6 8h8M6 12h6" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            Publishing
          </a>
        </div>
      </aside>

      <main className="flex-1 px-10 py-8">
        <h1 className="text-xl font-semibold">General Settings</h1>
        <div className="mt-6 rounded-xl shadow bg-white p-3">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-slate-700">Site Title</label>
              <input
                placeholder="Chatolution"
                className="mt-2 w-full rounded-lg bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Tagline</label>
              <input
                placeholder="Just another site"
                className="mt-2 w-full rounded-lg bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-200"
              />
              <p className="mt-2 text-xs text-slate-500">
                In a few words, explain what this site is about.
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Fav icon</label>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-[#F8FAFC] text-slate-400">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                    <path d="M4 6h16v12H4z" stroke="#94A3B8" strokeWidth="1.5" />
                    <path d="M8 10h8v6H8z" stroke="#94A3B8" strokeWidth="1.5" />
                  </svg>
                </div>
                <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 cursor-pointer">
                  <span className="rounded-md border border-[#0F67FD] bg-[#F2F6FF] px-3 py-1 text-sm font-semibold text-[#0F67FD]">
                    Choose File
                  </span>
                  <span>No File Chosen</span>
                  <input className="hidden" type="file" accept="image/*" />
                </label>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                The Site Icon is what you see in browser tabs, bookmark bars, mobile apps. It should be square and at least 512 by 512 pixels.
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Site Language</label>
              <select className="mt-2 w-full rounded-lg bg-[#FAFAFA] px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-200">
                <option>English (United States)</option>
                <option>English (United Kingdom)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Timezone</label>
              <select className="mt-2 w-full rounded-lg bg-[#FAFAFA] px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-200">
                <option>(GMT-5:00) America/New_York</option>
                <option>(GMT+0:00) UTC</option>
                <option>(GMT+5:00) Asia/Karachi</option>
              </select>
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
  </div>
)

export default SettingsPage
