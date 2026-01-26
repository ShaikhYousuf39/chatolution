const SettingsPage = () => (
  <div className="min-h-screen bg-white text-slate-900">
    <div className="flex">
      <aside className="w-56 border-r border-slate-200 px-6 py-3">
        <a href="/dashboard/e-commerce/content" className="flex items-center gap-2 text-sm text-slate-600">
          <span className="flex h-7 w-7 items-center justify-center rounded-full ">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
              <path d="M12.5 5l-5 5 5 5" stroke="#566273" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Back
        </a>

        <div className="mt-6 space-y-2">
          <button className="flex w-full items-center gap-2 rounded-lg bg-[#EEF4FF] px-3 py-2 text-sm font-semibold text-[#0F67FD]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full  text-white">

              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3834 6.97504L11.6084 2.35837C10.7167 1.6417 9.27506 1.6417 8.39172 2.35004L2.61672 6.97504C1.96672 7.4917 1.55006 8.58337 1.69172 9.40004L2.80006 16.0334C3.00006 17.2167 4.13339 18.175 5.33339 18.175H14.6667C15.8584 18.175 17.0001 17.2084 17.2001 16.0334L18.3084 9.40004C18.4417 8.58337 18.0251 7.4917 17.3834 6.97504ZM10.0001 12.9167C8.85006 12.9167 7.91672 11.9834 7.91672 10.8334C7.91672 9.68337 8.85006 8.75004 10.0001 8.75004C11.1501 8.75004 12.0834 9.68337 12.0834 10.8334C12.0834 11.9834 11.1501 12.9167 10.0001 12.9167Z" fill="#0F67FD" />
              </svg>

            </span>
            General
          </button>
          <a
            href="/dashboard/e-commerce/settings/publishing"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-slate-400">

              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7096 9.99996C17.7096 5.74514 14.2561 2.29163 10.0013 2.29163C5.74648 2.29163 2.29297 5.74514 2.29297 9.99996C2.29297 14.2548 5.74648 17.7083 10.0013 17.7083C10.3465 17.7083 10.6263 17.9881 10.6263 18.3333C10.6263 18.6785 10.3465 18.9583 10.0013 18.9583C5.05612 18.9583 1.04297 14.9451 1.04297 9.99996C1.04297 5.05478 5.05612 1.04163 10.0013 1.04163C14.9465 1.04163 18.9596 5.05478 18.9596 9.99996C18.9596 10.3451 18.6798 10.625 18.3346 10.625C17.9895 10.625 17.7096 10.3451 17.7096 9.99996Z" fill="#566273" />
                <path d="M7.50015 1.875C7.70098 1.8751 7.88975 1.97163 8.00715 2.1346C8.12455 2.29761 8.15617 2.5072 8.09259 2.69775C6.51049 7.43594 6.51049 12.5641 8.09259 17.3022C8.15617 17.4928 8.12455 17.7024 8.00715 17.8654C7.88975 18.0284 7.70098 18.1249 7.50015 18.125H6.66681C6.32164 18.125 6.04181 17.8452 6.04181 17.5C6.04181 17.1607 6.31187 16.8851 6.64891 16.8758C5.32544 12.3883 5.32529 7.61082 6.64891 3.12337C6.31188 3.11404 6.04181 2.83929 6.04181 2.5C6.04181 2.15482 6.32164 1.875 6.66681 1.875H7.50015Z" fill="#566273" />
                <path d="M13.0919 10C13.0919 7.5338 12.6943 5.06689 11.907 2.69694C11.7982 2.3694 11.9758 2.01554 12.3033 1.90674C12.6308 1.798 12.9847 1.97552 13.0935 2.30306C13.9229 4.79973 14.3419 7.39957 14.3419 10C14.3419 10.3452 14.0621 10.625 13.7169 10.625C13.3717 10.625 13.0919 10.3452 13.0919 10Z" fill="#566273" />
                <path d="M2.1346 11.9929C2.29736 11.8756 2.50653 11.8435 2.69694 11.9067C5.06689 12.694 7.5338 13.0916 10 13.0916C10.3452 13.0916 10.625 13.3714 10.625 13.7166C10.625 14.0618 10.3452 14.3416 10 14.3416C7.68329 14.3416 5.36742 14.0078 3.12419 13.3487C3.11597 13.6868 2.84 13.9583 2.5 13.9583C2.15482 13.9583 1.875 13.6784 1.875 13.3333V12.4999C1.875 12.2991 1.97177 12.1104 2.1346 11.9929Z" fill="#566273" />
                <path d="M2.30206 6.90698C7.29708 5.23918 12.7025 5.23918 17.6976 6.90698C18.025 7.01631 18.2016 7.37059 18.0923 7.698C17.9829 8.02521 17.6293 8.20188 17.3021 8.09269C12.5639 6.51059 7.43575 6.51059 2.69757 8.09269C2.37028 8.20188 2.01676 8.02521 1.90736 7.698C1.79804 7.37059 1.97465 7.01631 2.30206 6.90698Z" fill="#566273" />
                <path d="M16.7802 12.0222C17.3326 11.9655 17.8411 12.2132 18.2938 12.6659C18.7493 13.1213 19.0005 13.6313 18.9457 14.1852C18.8941 14.7062 18.5835 15.1106 18.2938 15.4002L15.3438 18.3503L15.343 18.3495C15.2221 18.474 15.0761 18.5663 14.9548 18.627C14.825 18.6919 14.6668 18.7508 14.508 18.7759L14.4974 18.7775V18.7767L13.3728 18.9346L13.3736 18.9354C13.0055 18.9879 12.6257 18.8914 12.3515 18.6172C12.0772 18.343 11.9807 17.9631 12.0333 17.5951L12.1911 16.4712L12.1928 16.4606C12.2183 16.2992 12.2787 16.1424 12.3433 16.0147C12.4079 15.8869 12.4999 15.7434 12.6184 15.6249L15.5684 12.6748C15.8581 12.3851 16.2617 12.0754 16.7802 12.0222ZM16.9079 13.2656C16.818 13.2749 16.6708 13.34 16.4522 13.5586L13.5022 16.5086C13.5003 16.5109 13.4966 16.5165 13.4908 16.5249C13.481 16.5392 13.4697 16.5575 13.459 16.5786C13.4482 16.6 13.4396 16.6207 13.4338 16.6372C13.4304 16.647 13.4288 16.6532 13.4281 16.6559L13.4273 16.6551L13.2824 17.6854L14.3135 17.5397C14.3168 17.5389 14.3243 17.5379 14.3355 17.534C14.3533 17.5279 14.3745 17.5194 14.3957 17.5088C14.4171 17.4981 14.434 17.4874 14.4454 17.4795C14.4512 17.4755 14.4535 17.473 14.4535 17.473L17.41 14.5165C17.6286 14.2979 17.6933 14.1518 17.7022 14.0624C17.7078 14.0059 17.7044 13.8449 17.41 13.5505C17.1218 13.2623 16.9639 13.26 16.9079 13.2656Z" fill="#566273" />
                <path d="M15.4185 12.9393C15.7509 12.847 16.0958 13.0415 16.1883 13.3739C16.3797 14.0627 16.9147 14.5978 17.6035 14.7891C17.9361 14.8815 18.1305 15.2264 18.0381 15.559C17.9456 15.8914 17.6015 16.0858 17.2691 15.9935C16.158 15.6849 15.2927 14.8203 14.9839 13.7092C14.8915 13.3767 15.0861 13.0319 15.4185 12.9393Z" fill="#566273" />
              </svg>

            </span>
            Publishing
          </a>
        </div>
      </aside>

      <main className="flex-1 px-10 py-4">
        <h1 className="text-xl font-semibold">General Settings</h1>
        <div className="mt-3 rounded-xl shadow bg-white p-3">
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
              <p className="mt-2 text-[14px] font-normal text-slate-500">
                In a few words, explain what this site is about.
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Fav icon</label>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e9ebed] text-slate-400">

                  <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.68667C0 1.20286 1.20286 0 2.68667 0H23.7667C25.2505 0 26.4533 1.20286 26.4533 2.68667V19.22C26.4533 20.7038 25.2505 21.9067 23.7667 21.9067H2.68667C1.20286 21.9067 0 20.7038 0 19.22V2.68667ZM2.68667 1.24C1.88769 1.24 1.24 1.8877 1.24 2.68667V19.22C1.24 20.019 1.8877 20.6667 2.68667 20.6667H23.7667C24.5656 20.6667 25.2133 20.019 25.2133 19.22V2.68667C25.2133 1.8877 24.5656 1.24 23.7667 1.24H2.68667Z" fill="#B2B9C4" />
                    <circle cx="6.19839" cy="5.78664" r="2.68667" fill="#B2B9C4" />
                    <path d="M3.51172 16.52V16.1903C3.51172 15.7483 3.68731 15.3244 3.99987 15.0118L6.75783 12.2538C7.37021 11.6415 8.35559 11.618 8.9964 12.2006C9.63068 12.7772 10.6041 12.7609 11.2187 12.1633L16.3868 7.13884C17.0402 6.50357 18.0827 6.51091 18.7271 7.15532L22.8636 11.2918C23.1761 11.6044 23.3517 12.0283 23.3517 12.4703V16.52C23.3517 17.4404 22.6055 18.1866 21.6851 18.1866H5.17839C4.25791 18.1866 3.51172 17.4404 3.51172 16.52Z" fill="#B2B9C4" />
                  </svg>

                </div>
                <label className="flex items-center gap-3 rounded-lg  bg-[#F8FCFF] px-3 py-2 text-sm text-slate-600 cursor-pointer">
                  <span className="rounded-md border border-[#0F67FD] bg-[#F2F6FF] px-3 py-1 text-sm font-semibold text-[#0F67FD]">
                    Choose File
                  </span>
                  <span>No File Chosen</span>
                  <input className="hidden" type="file" accept="image/*" />
                </label>
              </div>
              <p className="mt-2 text-[14px] font-normal text-slate-500">
                The Site Icon is what you see in browser tabs, bookmark bars, mobile apps. It should be square and at least <span className="font-bold">512 by 512</span> pixels.
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

        <div className="mt-4 flex justify-end">
          <button className="rounded-[14px] bg-black px-[30px] py-[15px] text-sm font-semibold text-white">
            Save Changes
          </button>
        </div>
      </main>
    </div>
  </div>
)

export default SettingsPage
