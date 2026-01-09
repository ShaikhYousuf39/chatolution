
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const initialTabs = ['About', 'Portfolio', 'Services', 'Blog']

const defaultEditorContent: Record<string, string> = {
  About: 'Start writing about your about section here.',
  Portfolio: 'Start writing about your portfolio section here.',
  Services: 'Start writing about your services section here.',
  Blog: 'Start writing about your blog section here.',
}

const themeColors = [
  '#ffffff',
  '#1f2937',
  '#374151',
  '#6b7280',
  '#9ca3af',
  '#d1d5db',
  '#e5e7eb',
  '#2563eb',
  '#22c55e',
  '#f97316',
  '#ef4444',
  '#facc15',
  '#14b8a6',
  '#0ea5e9',
  '#8b5cf6',
  '#ec4899',
  '#111827',
  '#334155',
  '#64748b',
  '#cbd5f5',
]

const standardColors = [
  '#000000',
  '#7f1d1d',
  '#b91c1c',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#06b6d4',
  '#0ea5e9',
  '#2563eb',
  '#4f46e5',
  '#7c3aed',
  '#a855f7',
  '#db2777',
  '#ec4899',
  '#f472b6',
  '#fb7185',
  '#f9a8d4',
]

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
  const [contentTabs, setContentTabs] = useState(initialTabs)
  const [activeTab, setActiveTab] = useState('About')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [contentOpen, setContentOpen] = useState(true)
  const [colorMenuOpen, setColorMenuOpen] = useState(false)
  const [highlightMenuOpen, setHighlightMenuOpen] = useState(false)
  const [newTabOpen, setNewTabOpen] = useState(false)
  const [newTabName, setNewTabName] = useState('')
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [editorContent, setEditorContent] = useState(defaultEditorContent)
  const [sectionFiles, setSectionFiles] = useState<Record<string, File[]>>({
    About: [],
    Portfolio: [],
    Services: [],
    Blog: [],
  })
  const [sectionPreview, setSectionPreview] = useState<Record<string, string | null>>({
    About: null,
    Portfolio: null,
    Services: null,
    Blog: null,
  })
  const [cardsByTab, setCardsByTab] = useState<Record<string, CardData[]>>({
    About: [],
    Portfolio: [createCard(), createCard()],
    Services: [createCard(), createCard()],
    Blog: [],
  })
  const [saveStatus, setSaveStatus] = useState('')

  const cardTitleLabel = activeTab === 'Portfolio' ? 'Project name' : 'Service name'
  const cardDescLabel =
    activeTab === 'Portfolio' ? 'Project description' : 'Service description'

  const handleAddTab = () => {
    const trimmed = newTabName.trim()
    if (!trimmed || contentTabs.includes(trimmed)) return
    setContentTabs((prev) => [...prev, trimmed])
    setEditorContent((prev) => ({ ...prev, [trimmed]: '' }))
    setSectionFiles((prev) => ({ ...prev, [trimmed]: [] }))
    setSectionPreview((prev) => ({ ...prev, [trimmed]: null }))
    setCardsByTab((prev) => ({ ...prev, [trimmed]: [] }))
    setActiveTab(trimmed)
    setNewTabName('')
    setNewTabOpen(false)
  }

  useEffect(() => {
    if (!editorRef.current) return
    editorRef.current.innerHTML = editorContent[activeTab] ?? ''
  }, [activeTab])

  const handleEditorInput = () => {
    if (!editorRef.current) return
    const value = editorRef.current.innerHTML
    setEditorContent((prev) => ({ ...prev, [activeTab]: value }))
  }

  const ensureEditorSelection = () => {
    if (!editorRef.current) return
    const selection = window.getSelection()
    if (!selection) return
    const hasFocus =
      selection.rangeCount > 0 &&
      editorRef.current.contains(selection.getRangeAt(0).commonAncestorContainer)
    if (hasFocus) return
    const range = document.createRange()
    range.selectNodeContents(editorRef.current)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const runEditorCommand = (command: string, value?: string) => {
    if (!editorRef.current) return
    editorRef.current.focus()
    ensureEditorSelection()
    document.execCommand(command, false, value)
    handleEditorInput()
  }

  const handleFontSizeChange = (value: string) => {
    const sizeMap: Record<string, string> = { '16': '3', '18': '4', '20': '5' }
    runEditorCommand('fontSize', sizeMap[value] ?? '3')
  }

  const handleColorPick = () => {
    setColorMenuOpen((prev) => !prev)
    setHighlightMenuOpen(false)
  }

  const handlePalettePick = (value: string) => {
    runEditorCommand('foreColor', value)
    setColorMenuOpen(false)
  }

  const handleHighlightToggle = () => {
    setHighlightMenuOpen((prev) => !prev)
    setColorMenuOpen(false)
  }

  const handleHighlightSelect = (value: string) => {
    runEditorCommand('hiliteColor', value)
    setHighlightMenuOpen(false)
  }

  

  const handleSectionFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    setSectionFiles((prev) => ({ ...prev, [activeTab]: files }))
    setSectionPreview((prev) => {
      const previous = prev[activeTab]
      if (previous) URL.revokeObjectURL(previous)
      const nextPreview = files[0] ? URL.createObjectURL(files[0]) : null
      return { ...prev, [activeTab]: nextPreview }
    })
  }

  const activeCards = cardsByTab[activeTab] ?? []

  const updateCard = (id: string, patch: Partial<CardData>) => {
    setCardsByTab((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] ?? []).map((card) =>
        card.id === id ? { ...card, ...patch } : card
      ),
    }))
  }

  const handleCardImageChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setCardsByTab((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] ?? []).map((card) => {
        if (card.id !== id) return card
        if (card.imageUrl) URL.revokeObjectURL(card.imageUrl)
        return { ...card, imageName: file.name, imageUrl: url }
      }),
    }))
    event.target.value = ''
  }

  const addCard = () => {
    setCardsByTab((prev) => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] ?? []), createCard()],
    }))
  }

  const handleSave = () => {
    setSaveStatus('Saved just now')
    window.setTimeout(() => setSaveStatus(''), 2000)
  }

  return (
    <div className={`${jakarta.className} min-h-screen bg-white text-slate-900`}>
      <div className="flex min-h-screen">
        <aside
          className={`flex flex-col border-r border-slate-200 bg-white px-5 py-5 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-20'
            }`}
        >
          <div className="flex items-center justify-between">
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div
                className={`flex h-9 w-9 items-center justify-center text-blue-600 transition ${sidebarOpen ? '' : 'group'
                  }`}
              >
                <div className={`transition ${sidebarOpen ? '' : 'group-hover:opacity-0'}`}>
                  <SparkIcon className="h-7 w-7" />
                </div>
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="absolute inset-0 flex items-center justify-center text-slate-500 opacity-0 transition hover:bg-slate-50 active:scale-95 group-hover:opacity-100"
                  >
                    <SplitIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="flex h-7 w-7 cursor-pointer items-center justify-center text-slate-500 transition  active:scale-95"
              >
                <SplitIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <button
              onClick={() => setContentOpen((prev) => !prev)}
              className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition"
            >
              <span className="flex items-center gap-2">
                <ContentIcon className="h-4 w-4" />
                {sidebarOpen && 'Content'}
              </span>
              {sidebarOpen && (
                <ChevronIcon
                  className={`h-6 w-6 transition ${contentOpen ? '' : '-rotate-90'}`}
                />
              )}
            </button>

            {sidebarOpen && contentOpen && (
              <div className="rounded-xl border border-slate-200 bg-white px-2 py-2">
                {contentTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex w-full cursor-pointer items-center rounded-lg px-2 py-1.5 text-left text-sm font-medium transition hover:bg-slate-50 ${activeTab === tab ? 'text-blue-600' : 'text-slate-500'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
                <button
                  onClick={() => setNewTabOpen((prev) => !prev)}
                  className="mt-1 flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-left text-sm font-medium text-slate-500 transition hover:bg-slate-50"
                >
                  Add new page
                  <AddTabIcon className="h-4 w-4 text-blue-600" />
                </button>
                {newTabOpen && (
                  <div className="mt-2 space-y-2 rounded-lg border border-slate-200 bg-[#F8FCFF] px-2 py-2">
                    <input
                      value={newTabName}
                      onChange={(event) => setNewTabName(event.target.value)}
                      placeholder="Page name"
                      className="w-full rounded-md border border-slate-200 bg-white px-2 py-2 text-xs text-slate-600"
                    />
                    <button
                      onClick={handleAddTab}
                      className="w-full rounded-md bg-blue-600 px-2 py-2 text-xs font-semibold text-white"
                    >
                      Add Page
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-2 space-y-2 border-t border-slate-100 pt-2 text-sm text-slate-600">
            {sidebarLinks.map((item) => (
              <button
                key={item.label}
                className="flex w-full cursor-pointer items-center gap-3  border-b border-slate-100 px-2 py-2 text-left text-slate-500 transition hover:bg-slate-50 last:border-b-0"
              >
                <item.icon className="h-4 w-4 text-slate-400" />
                {sidebarOpen && item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-4 pt-6 text-sm text-slate-500">
            <button className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-slate-50">
              <SettingsIcon className="h-4 w-4 text-slate-400" />
              {sidebarOpen && 'Settings'}
            </button>
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C7E3EC] text-xs font-semibold text-[#1C7089]">
                j
              </div>
              {sidebarOpen && 'Joel'}
            </div>
          </div>
        </aside>

        <main className="flex min-h-screen flex-1 flex-col px-10 py-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">Content</span>
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-semibold">{activeTab}</h1>

            <div className="mt-4 overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="relative flex flex-wrap items-center gap-1 border-b border-slate-200 text-slate-600">
                <select
                  className="cursor-pointer bg-white px-2 py-1 text-[16px]"
                  onChange={(event) => handleFontSizeChange(event.target.value)}
                >
                  <option>16</option>
                  <option>18</option>
                  <option>20</option>
                </select>
                <div className="mx h-10 w-px bg-slate-200" />
                <div className="relative">
                  <ToolButton icon={<ColorIcon className="h-4 w-4" />} onClick={handleColorPick} />
                  {colorMenuOpen && (
                    <div className="absolute left-0 top-full z-30 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
                      <button
                        onClick={() => handlePalettePick('#111827')}
                        className="mb-3 flex w-full items-center justify-between text-xs text-slate-600"
                      >
                        <span>Automatic</span>
                        <span className="h-4 w-4 rounded border border-slate-200 bg-slate-900" />
                      </button>
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Theme Colors
                      </div>
                      <div className="mt-2 grid grid-cols-10 gap-1">
                        {themeColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handlePalettePick(color)}
                            className="h-4 w-4 rounded border border-slate-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Standard Colors
                      </div>
                      <div className="mt-2 grid grid-cols-10 gap-1">
                        {standardColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handlePalettePick(color)}
                            className="h-4 w-4 rounded border border-slate-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <ToolButton
                    icon={<HighlightIcon className="h-4 w-4" />}
                    onClick={handleHighlightToggle}
                  />
                  {highlightMenuOpen && (
                    <div className="absolute left-0 top-full z-30 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
                      <button
                        onClick={() => handleHighlightSelect('#fef08a')}
                        className="mb-3 flex w-full items-center justify-between text-xs text-slate-600"
                      >
                        <span>Automatic</span>
                        <span className="h-4 w-4 rounded border border-slate-200 bg-yellow-200" />
                      </button>
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Highlight Colors
                      </div>
                      <div className="mt-2 grid grid-cols-10 gap-1">
                        {standardColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleHighlightSelect(color)}
                            className="h-4 w-4 rounded border border-slate-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <ToolButton icon={<BoldIcon className="h-4 w-4" />} onClick={() => runEditorCommand('bold')} />
                <ToolButton icon={<ItalicIcon className="h-4 w-4" />} onClick={() => runEditorCommand('italic')} />
                <ToolButton
                  icon={<UnderlineIcon className="h-4 w-4" />}
                  onClick={() => runEditorCommand('underline')}
                />
                <ToolButton
                  icon={<OverlineIcon className="h-4 w-4" />}
                  onClick={() => runEditorCommand('strikeThrough')}
                />
                <div className="mx-2 h-10 w-px bg-slate-200" />
                <ToolButton
                  icon={<AlignLeftIcon className="h-5 w-5" />}
                  onClick={() => runEditorCommand('justifyLeft')}
                />
                <ToolButton
                  icon={<AlignCenterIcon className="h-5 w-5" />}
                  onClick={() => runEditorCommand('justifyCenter')}
                />
                <ToolButton
                  icon={<AlignRightIcon className="h-5 w-5" />}
                  onClick={() => runEditorCommand('justifyRight')}
                />
                <div className="mx-2 h-10 w-px bg-slate-200" />
                <ToolButton
                  icon={<NumberListIcon className="h-4 w-4" />}
                  onClick={() => runEditorCommand('insertOrderedList')}
                />
                <ToolButton
                  icon={<DotListIcon className="h-4 w-4" />}
                  onClick={() => runEditorCommand('insertUnorderedList')}
                />
                
              </div>
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="min-h-55 px-4 py-4 text-sm text-slate-700 outline-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1"
                onInput={handleEditorInput}
              />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-26 w-26 items-center justify-center rounded-md border border-slate-200 bg-[#E2E6EC] text-slate-400">
                {sectionPreview[activeTab] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sectionPreview[activeTab] ?? ''}
                    alt="Uploaded preview"
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <ImageIcon className="h-6 w-6" />
                )}
              </div>
              <div className="flex-1 px-2">
                <p className="text-xs italic text-slate-500">
                  Upload upto 3 images, each less than 5MB (1240 x 600)
                </p>
                <div className="mt-3 py-2 px-2 rounded-sm max-w-95.75 flex items-center bg-[#F8FCFF] gap-3">
                  <label className="cursor-pointer rounded-md border border-[#0F67FD] bg-[#F8FCFF] px-4 py-2 text-sm font-semibold text-[#0F67FD]">
                    Choose File
                    <input
                      className="hidden"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleSectionFileChange}
                    />
                  </label>
                  <span className="text-sm text-slate-500">
                    {sectionFiles[activeTab]?.length
                      ? sectionFiles[activeTab].map((file) => file.name).join(', ')
                      : 'No File Chosen'}
                  </span>
                </div>
              </div>
            </div>

            {(activeTab === 'Portfolio' || activeTab === 'Services') && (
              <>
                <h2 className="mt-10 text-lg font-semibold">
                  Create {activeTab} Cards
                </h2>
                <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                  {activeTab === 'Portfolio' && activeCards[0] && (
                    <div className="lg:col-span-2">
                      <CardForm
                        key={activeCards[0].id}
                        titleLabel={cardTitleLabel}
                        descLabel={cardDescLabel}
                        card={activeCards[0]}
                        onTitleChange={(value) =>
                          updateCard(activeCards[0].id, { title: value })
                        }
                        onDescriptionChange={(value) =>
                          updateCard(activeCards[0].id, { description: value })
                        }
                        onImageChange={(event) =>
                          handleCardImageChange(activeCards[0].id, event)
                        }
                      />
                    </div>
                  )}
                  {activeCards[1] && (
                    <CardForm
                      key={activeCards[1].id}
                      titleLabel={cardTitleLabel}
                      descLabel={cardDescLabel}
                      card={activeCards[1]}
                      onTitleChange={(value) =>
                        updateCard(activeCards[1].id, { title: value })
                      }
                      onDescriptionChange={(value) =>
                        updateCard(activeCards[1].id, { description: value })
                      }
                      onImageChange={(event) =>
                        handleCardImageChange(activeCards[1].id, event)
                      }
                    />
                  )}
                  <AddCard onAdd={addCard} />
                </div>
              </>
            )}
          </div>

          <div className="mt-auto flex justify-end pt-12">
            <div className="flex items-center gap-4">
              {saveStatus && (
                <span className="text-xs font-semibold text-green-600">
                  {saveStatus}
                </span>
              )}
              <button
                onClick={handleSave}
                className="cursor-pointer rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow transition hover:bg-slate-800 active:scale-[0.98]"
              >
                Save Content
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const ToolButton = ({
  label,
  icon,
  onClick,
}: {
  label?: string
  icon?: React.ReactNode
  onClick?: () => void
}) => (
  <button
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
    className="flex h-5 w-8 cursor-pointer items-center justify-center rounded-md bg-white text-xs font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-95"
  >
    {label ?? icon}
  </button>
)

const CardForm = ({
  titleLabel,
  descLabel,
  card,
  onTitleChange,
  onDescriptionChange,
  onImageChange,
}: {
  titleLabel: string
  descLabel: string
  card: CardData
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <div className="space-y-4 flex flex-col justify-center rounded-xl border border-[#DFE9FA] bg-white p-4">
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200  px-4 py-6 text-center text-xs text-slate-500">
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
        <span className="font-semibold text-blue-600">Click to upload</span> or drag and
        drop
      </div>
      <div className="text-[11px] text-slate-400">
        {card.imageName || 'JPG, JPEG, PNG less than 5MB'}
      </div>
      <input className="hidden" type="file" accept="image/*" onChange={onImageChange} />
    </label>
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-600">{titleLabel}</label>
      <input
        value={card.title}
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder="Write title..."
        className="w-full rounded-xl border mt-2 border-none bg-[#FAFAFA] px-3 py-3 text-sm text-slate-600"
      />
    </div>
    <div className="space-y-2">
      <label className="text-xs  font-semibold text-slate-600">{descLabel}</label>
      <textarea
        value={card.description}
        onChange={(event) => onDescriptionChange(event.target.value)}
        placeholder="Write details..."
        className="min-h-22.5 w-full mt-2 rounded-xl border border-none bg-[#FAFAFA] px-3 py-3 text-sm text-slate-600"
      />
    </div>
  </div>
)

const AddCard = ({ onAdd }: { onAdd: () => void }) => (
  <button
    onClick={onAdd}
    className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-3 border-dashed border-[#0F67FD] bg-white p-6 text-center text-base text-slate-500 transition hover:border-blue-500 hover:bg-blue-50/40"
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-blue-600">
      <AddFileIcon className="h-8 w-8" />
    </div>
    <p className="text-lg font-semibold text-slate-600">Want to showcase more?</p>
    <p className="text-sm text-slate-400">Add another project!</p>
  </button>
)

const SparkIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 28 28" fill="none" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9101 6.32634C14.8135 5.90149 14.4357 5.59998 14 5.59998C13.5643 5.59998 13.1865 5.90149 13.0899 6.32634L12.5735 8.59733C12.3347 9.64775 11.5144 10.468 10.464 10.7068L8.19304 11.2232C7.76819 11.3198 7.46667 11.6976 7.46667 12.1333C7.46667 12.569 7.76819 12.9468 8.19304 13.0434L10.464 13.5598C11.5144 13.7987 12.3347 14.6189 12.5735 15.6693L13.0899 17.9403C13.1865 18.3651 13.5643 18.6666 14 18.6666C14.4357 18.6666 14.8135 18.3651 14.9101 17.9403L15.4265 15.6693C15.6654 14.6189 16.4856 13.7987 17.536 13.5598L19.807 13.0434C20.2318 12.9468 20.5333 12.569 20.5333 12.1333C20.5333 11.6976 20.2318 11.3198 19.807 11.2232L17.536 10.7068C16.4856 10.468 15.6654 9.64775 15.4265 8.59733L14.9101 6.32634ZM11.9646 12.1333C12.84 11.6866 13.5533 10.9733 14 10.0979C14.4467 10.9733 15.16 11.6866 16.0354 12.1333C15.16 12.58 14.4467 13.2933 14 14.1687C13.5533 13.2933 12.84 12.58 11.9646 12.1333Z"
      fill="url(#paint0_linear_65_904)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.6 0C2.5072 0 0 2.5072 0 5.6V18.6667C0 21.7595 2.5072 24.2667 5.6 24.2667H10.3098L13.2976 27.6813C13.4748 27.8838 13.7309 28 14 28C14.2691 28 14.5252 27.8838 14.7024 27.6813L17.6902 24.2667H22.4C25.4928 24.2667 28 21.7595 28 18.6667V5.6C28 2.5072 25.4928 0 22.4 0H5.6ZM1.86667 5.6C1.86667 3.53814 3.53814 1.86667 5.6 1.86667H22.4C24.4619 1.86667 26.1333 3.53814 26.1333 5.6V18.6667C26.1333 20.7285 24.4619 22.4 22.4 22.4H17.2667C16.9975 22.4 16.7415 22.5162 16.5642 22.7187L14 25.6493L11.4358 22.7187C11.2585 22.5162 11.0025 22.4 10.7333 22.4H5.6C3.53814 22.4 1.86667 20.7285 1.86667 18.6667V5.6Z"
      fill="url(#paint1_linear_65_904)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_65_904"
        x1="3.50001"
        y1="-2.40871e-05"
        x2="21.4667"
        y2="23.3333"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1BA2D8" />
        <stop offset="0.901177" stopColor="#542CFA" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_65_904"
        x1="3.5"
        y1="-2.67724e-07"
        x2="21.4667"
        y2="23.3333"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1BA2D8" />
        <stop offset="0.901177" stopColor="#542CFA" />
      </linearGradient>
    </defs>
  </svg>
)

const SplitIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path d="M7.49935 18.3346H12.4993C16.666 18.3346 18.3327 16.668 18.3327 12.5013V7.5013C18.3327 3.33464 16.666 1.66797 12.4993 1.66797H7.49935C3.33268 1.66797 1.66602 3.33464 1.66602 7.5013V12.5013C1.66602 16.668 3.33268 18.3346 7.49935 18.3346Z" stroke="black" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7.5 1.66797V18.3346" stroke="black" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

const ColorIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 17"
    fill="none"
    className={className}
  >
    <path
      d="M0.9375 14.4219H14.6875C14.9237 14.4219 15.1504 14.5166 15.3174 14.6836C15.4841 14.8505 15.578 15.0766 15.5781 15.3125C15.5781 15.5486 15.4843 15.7754 15.3174 15.9424C15.1504 16.1094 14.9237 16.2031 14.6875 16.2031H0.9375C0.701292 16.2031 0.474642 16.1094 0.307617 15.9424C0.140717 15.7754 0.046875 15.5486 0.046875 15.3125C0.0469801 15.0766 0.140867 14.8505 0.307617 14.6836C0.474642 14.5166 0.701292 14.4219 0.9375 14.4219ZM7.8125 0.046875C7.98157 0.046875 8.14731 0.0949268 8.29004 0.185547C8.43268 0.276134 8.54625 0.405686 8.61816 0.558594L13.6182 11.1836C13.7187 11.3973 13.7303 11.642 13.6504 11.8643C13.5704 12.0865 13.4052 12.2686 13.1914 12.3691C12.9778 12.4695 12.7329 12.4813 12.5107 12.4014C12.2886 12.3214 12.1075 12.156 12.0068 11.9424L10.7891 9.35547L10.7764 9.32812H4.84863L4.83594 9.35547L3.62109 11.9424C3.57131 12.0485 3.50073 12.1437 3.41406 12.2227C3.3274 12.3015 3.22552 12.3627 3.11523 12.4023C3.00512 12.4418 2.88833 12.4588 2.77148 12.4531C2.65449 12.4474 2.53947 12.4192 2.43359 12.3691C2.32773 12.3194 2.23206 12.2486 2.15332 12.1621C2.07472 12.0757 2.01419 11.9742 1.97461 11.8643C1.93505 11.7543 1.91734 11.6373 1.92285 11.5205C1.92842 11.4038 1.95708 11.2893 2.00684 11.1836L7.00684 0.558594C7.07875 0.405686 7.19232 0.276134 7.33496 0.185547C7.47769 0.0949268 7.64343 0.046875 7.8125 0.046875ZM7.77051 3.11914L5.71777 7.48047L5.68652 7.54688H9.93848L9.90723 7.48047L7.85449 3.11914L7.8125 3.0293L7.77051 3.11914Z"
      fill="#475569"
      stroke="#475569"
      stroke-width="0.09375"
    />
  </svg>
)

const HighlightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 18"
    fill="none"
    className={className}
  >
    <path
      d="M10.627 0.046875C10.8635 0.0469215 11.0905 0.141306 11.2578 0.308594C11.425 0.475899 11.5186 0.702932 11.5186 0.939453C11.5185 1.17597 11.4251 1.40306 11.2578 1.57031L7.85742 4.96973L7.82422 5.00195L14.0625 11.2402L17.4932 7.80957C17.5759 7.72654 17.6749 7.66116 17.7832 7.61621C17.8913 7.57135 18.007 7.54791 18.124 7.54785C18.2412 7.54785 18.3576 7.57126 18.4658 7.61621C18.574 7.66111 18.6722 7.72667 18.7549 7.80957H18.7559C18.839 7.89231 18.9042 7.99132 18.9492 8.09961C18.9942 8.20789 19.0176 8.32415 19.0176 8.44141C19.0175 8.5586 18.9942 8.67498 18.9492 8.7832C18.9042 8.89126 18.8388 8.98966 18.7559 9.07227H18.7549L15.1338 12.6924C14.9935 12.8336 14.8265 12.9462 14.6426 13.0225C14.4588 13.0985 14.2614 13.1373 14.0625 13.1367C13.8925 13.136 13.724 13.1067 13.5635 13.0508L13.5352 13.041L13.5146 13.0625L12.0088 14.5674C11.7246 14.8515 11.3394 15.0117 10.9375 15.0117C10.5357 15.0117 10.1504 14.8515 9.86621 14.5674L9.7207 14.4229L9.6875 14.3896L9.6543 14.4229L7.19238 16.8818C7.10972 16.9645 7.01133 17.0304 6.90332 17.0752C6.79532 17.1199 6.6794 17.1426 6.5625 17.1426C6.46699 17.1427 6.37174 17.1272 6.28125 17.0967L0.65625 15.2217C0.512342 15.1738 0.382688 15.0904 0.280273 14.9785C0.177781 14.8665 0.105267 14.7298 0.0703125 14.582C0.03536 14.4343 0.03961 14.2799 0.0810547 14.1338C0.122507 13.9877 0.200297 13.8544 0.307617 13.7471L4.64258 9.41016L4.67578 9.37793L4.64258 9.34473L4.5 9.19922L4.39941 9.08789C4.17841 8.81818 4.05566 8.47869 4.05566 8.12695C4.05578 7.72523 4.21597 7.33978 4.5 7.05566L6.00586 5.5498L6.02637 5.52832L6.01758 5.50098C5.92363 5.23208 5.90646 4.94178 5.96973 4.66406C6.03302 4.38646 6.17393 4.13226 6.375 3.93066L9.99609 0.308594C10.1634 0.141264 10.3903 0.046875 10.627 0.046875ZM5.9043 10.6729L2.63965 13.9346L2.58594 13.9883L2.6582 14.0127L6.29492 15.2246L6.32227 15.2334L6.34277 15.2129L8.39258 13.1602L8.42578 13.127L8.39258 13.0947L5.9375 10.6396L5.9043 10.6729ZM5.98242 8.09473L5.94922 8.12695L5.98242 8.16016L6.56738 8.74805L10.9043 13.082L10.9375 13.1152L12.1758 11.877L12.1426 11.8447L7.1875 6.88965L5.98242 8.09473Z"
      fill="#475569"
      stroke="#475569"
      stroke-width="0.09375"
    />
  </svg>
)

const BoldIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 14"
    fill="none"
    className={className}
  >
    <path
      d="M0.9375 0.046875H6.25C6.95133 0.0471268 7.63804 0.24672 8.23047 0.62207C8.82296 0.997533 9.29697 1.53378 9.59668 2.16797C9.8963 2.80204 10.0098 3.50809 9.92383 4.2041C9.83778 4.90022 9.55545 5.55751 9.11035 6.09961L9.0752 6.14355L9.12402 6.1709C9.90403 6.60084 10.5189 7.27805 10.8721 8.0957C11.2251 8.91329 11.297 9.82499 11.0752 10.6875C10.8534 11.55 10.3511 12.3145 9.64746 12.8604C8.94374 13.4063 8.07814 13.7027 7.1875 13.7031H0.9375C0.701292 13.7031 0.474642 13.6094 0.307617 13.4424C0.140593 13.2754 0.046875 13.0487 0.046875 12.8125V0.9375C0.046875 0.701292 0.140593 0.474642 0.307617 0.307617C0.474642 0.140593 0.701292 0.046875 0.9375 0.046875ZM1.82812 11.9219H7.1875C7.78009 11.9219 8.34855 11.6866 8.76758 11.2676C9.1866 10.8486 9.42188 10.2801 9.42188 9.6875C9.42188 9.09491 9.1866 8.52645 8.76758 8.10742C8.34855 7.6884 7.78009 7.45313 7.1875 7.45312H1.82812V11.9219ZM1.82812 5.67188H6.25C6.75971 5.67187 7.24895 5.4698 7.60938 5.10938C7.9698 4.74895 8.17187 4.25971 8.17188 3.75C8.17187 3.24029 7.9698 2.75105 7.60938 2.39062C7.24895 2.0302 6.75971 1.82813 6.25 1.82812H1.82812V5.67188Z"
      fill="#475569"
      stroke="#475569"
      stroke-width="0.09375"
    />
  </svg>
)

const ItalicIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 14"
    fill="none"
    className={className}
  >
    <path
      d="M4.6875 0.046875H10.9375C11.1737 0.046875 11.4004 0.140593 11.5674 0.307617C11.7344 0.474642 11.8281 0.701292 11.8281 0.9375C11.8281 1.17371 11.7344 1.40036 11.5674 1.56738C11.4004 1.73441 11.1737 1.82812 10.9375 1.82812H8.4541L5.29785 11.2969H7.1875C7.42371 11.2969 7.65036 11.3906 7.81738 11.5576C7.98441 11.7246 8.07812 11.9513 8.07812 12.1875C8.07812 12.4237 7.98441 12.6504 7.81738 12.8174C7.65036 12.9844 7.42371 13.0781 7.1875 13.0781H0.9375C0.701292 13.0781 0.474642 12.9844 0.307617 12.8174C0.140593 12.6504 0.046875 12.4237 0.046875 12.1875C0.046875 11.9513 0.140593 11.7246 0.307617 11.5576C0.474642 11.3906 0.701292 11.2969 0.9375 11.2969H3.4209L6.57715 1.82812H4.6875C4.45129 1.82812 4.22464 1.73441 4.05762 1.56738C3.89059 1.40036 3.79688 1.17371 3.79688 0.9375L3.80078 0.849609C3.82099 0.645658 3.91143 0.453807 4.05762 0.307617C4.22464 0.140593 4.45129 0.046875 4.6875 0.046875Z"
      fill="#475569"
      stroke="#475569"
      stroke-width="0.09375"
    />
  </svg>
)

const UnderlineIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 15"
    fill="none"
    className={className}
  >
    <path
      d="M0.9375 13.1719H10.9375C11.1737 13.1719 11.4004 13.2656 11.5674 13.4326C11.7344 13.5996 11.8281 13.8263 11.8281 14.0625C11.8281 14.2987 11.7344 14.5254 11.5674 14.6924C11.4004 14.8594 11.1737 14.9531 10.9375 14.9531H0.9375C0.701292 14.9531 0.474642 14.8594 0.307617 14.6924C0.140593 14.5254 0.046875 14.2987 0.046875 14.0625C0.046875 13.8263 0.140593 13.5996 0.307617 13.4326C0.474642 13.2656 0.701292 13.1719 0.9375 13.1719ZM10.3125 0.046875C10.5487 0.046875 10.7754 0.140593 10.9424 0.307617C11.1094 0.474642 11.2031 0.701292 11.2031 0.9375V6.5625L11.1963 6.82324C11.1305 8.12435 10.5847 9.35863 9.65918 10.2842C8.672 11.2714 7.33359 11.8267 5.9375 11.8281L5.67676 11.8213C4.37565 11.7555 3.14137 11.2097 2.21582 10.2842C1.22864 9.297 0.673323 7.95859 0.671875 6.5625V0.9375C0.671875 0.701292 0.765593 0.474642 0.932617 0.307617C1.09964 0.140593 1.32629 0.046875 1.5625 0.046875C1.79871 0.046875 2.02536 0.140593 2.19238 0.307617C2.35941 0.474642 2.45312 0.701292 2.45312 0.9375V6.5625C2.45312 7.48661 2.82019 8.37292 3.47363 9.02637C4.12708 9.67981 5.01339 10.0469 5.9375 10.0469C6.86161 10.0469 7.74792 9.67981 8.40137 9.02637C9.05481 8.37292 9.42188 7.48661 9.42188 6.5625V0.9375C9.42188 0.701292 9.51559 0.474642 9.68262 0.307617C9.84964 0.140593 10.0763 0.046875 10.3125 0.046875Z"
      fill="#475569"
      stroke="#475569"
      stroke-width="0.09375"
    />
  </svg>
)

const OverlineIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 15"
    fill="none"
    className={className}
  >
    <path
      d="M0.9375 6.29688H14.6875C14.9237 6.29688 15.1504 6.39059 15.3174 6.55762C15.4844 6.72464 15.5781 6.95129 15.5781 7.1875C15.5781 7.42371 15.4844 7.65036 15.3174 7.81738C15.1504 7.98441 14.9237 8.07812 14.6875 8.07812H12.2305L12.2979 8.15527C12.816 8.75247 13.0937 9.52106 13.0781 10.3115V10.3125C13.0781 11.4237 12.4777 12.4941 11.4238 13.2471C10.4508 13.9438 9.16655 14.3281 7.8125 14.3281C6.45845 14.3281 5.17422 13.9438 4.20117 13.2471C3.1473 12.4941 2.54688 11.4237 2.54688 10.3125C2.54688 10.0763 2.64059 9.84964 2.80762 9.68262C2.97464 9.51559 3.20129 9.42188 3.4375 9.42188C3.67371 9.42188 3.90036 9.51559 4.06738 9.68262C4.23441 9.84964 4.32812 10.0763 4.32812 10.3125C4.32812 10.9276 4.73624 11.4873 5.37012 11.8906C6.00491 12.2945 6.87309 12.5469 7.8125 12.5469C8.75191 12.5469 9.62009 12.2945 10.2549 11.8906C10.8888 11.4873 11.2969 10.9276 11.2969 10.3125C11.2969 9.7994 11.1081 9.39167 10.6611 9.03711C10.2177 8.68546 9.52013 8.38574 8.50195 8.08008L8.48828 8.125L8.50195 8.07812H0.9375C0.701292 8.07812 0.474642 7.98441 0.307617 7.81738C0.140593 7.65036 0.046875 7.42371 0.046875 7.1875C0.046875 6.95129 0.140593 6.72464 0.307617 6.55762C0.474642 6.39059 0.701292 6.29688 0.9375 6.29688ZM7.8125 0.046875C9.72296 0.046875 11.3285 0.817518 12.1797 2.11621L12.3398 2.38379C12.4393 2.58873 12.4564 2.82376 12.3877 3.04102C12.3187 3.25896 12.169 3.44243 11.9688 3.55273C11.7684 3.66302 11.5327 3.6921 11.3115 3.63379C11.0905 3.57543 10.9001 3.43392 10.7803 3.23926C10.2911 2.35079 9.17753 1.82812 7.8125 1.82812C6.8945 1.82812 6.08607 2.06407 5.50586 2.46094C4.92529 2.85811 4.57129 3.41852 4.57129 4.0625C4.57129 4.29866 4.47751 4.52537 4.31055 4.69238C4.14357 4.85936 3.9168 4.95307 3.68066 4.95312C3.4445 4.95312 3.2178 4.85935 3.05078 4.69238C2.88376 4.52536 2.79004 4.29871 2.79004 4.0625C2.79004 1.78114 4.93754 0.046875 7.8125 0.046875Z"
      fill="#475569"
      stroke="#475569"
      stroke-width="0.09375"
    />
  </svg>
)

const NumberListIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 15"
    fill="none"
    className={className}
  >
    <path
      d="M1.85156 8.19434C2.41644 8.11663 2.9897 8.26076 3.45117 8.5957C3.68235 8.76301 3.87737 8.97517 4.02441 9.21973C4.17153 9.46443 4.26734 9.73672 4.30664 10.0195C4.34679 10.2979 4.33131 10.5815 4.25977 10.8535C4.18824 11.1254 4.06245 11.38 3.89062 11.6025V11.6035L2.77441 13.0967L2.71875 13.1709H3.4375C3.67355 13.171 3.89948 13.2657 4.06641 13.4326C4.23332 13.5995 4.328 13.8255 4.32812 14.0615C4.32812 14.2977 4.23343 14.5244 4.06641 14.6914C3.89948 14.8583 3.67354 14.952 3.4375 14.9521H0.9375C0.772308 14.9521 0.61027 14.9061 0.469727 14.8193C0.329212 14.7325 0.215611 14.6086 0.141602 14.4609C0.0676015 14.3132 0.0361953 14.1479 0.0507812 13.9834C0.0653693 13.8189 0.12489 13.6616 0.223633 13.5293L2.46387 10.5322L2.47363 10.5195C2.50148 10.4847 2.52321 10.4453 2.53516 10.4023C2.54119 10.3806 2.54439 10.3583 2.5459 10.3359L2.54395 10.2686L2.52637 10.2002C2.51827 10.1778 2.50771 10.1561 2.49512 10.1357C2.47009 10.0954 2.43652 10.0602 2.39746 10.0332C2.3112 9.97098 2.20421 9.94371 2.09863 9.95703C1.99257 9.97051 1.89524 10.024 1.82715 10.1064V10.1074C1.81634 10.1211 1.80655 10.1354 1.79785 10.1504L1.77441 10.1973C1.69148 10.4163 1.52543 10.5948 1.3125 10.6924C1.09965 10.7899 0.856708 10.7998 0.636719 10.7197C0.416618 10.6396 0.237041 10.4753 0.136719 10.2637C0.0489566 10.0784 0.0281132 9.86938 0.0761719 9.67188L0.100586 9.58887C0.157217 9.43329 0.232294 9.28535 0.323242 9.14746L0.418945 9.0127C0.77275 8.56534 1.28654 8.27218 1.85156 8.19434ZM6.875 11.9209H14.6875C14.9235 11.921 15.1495 12.0157 15.3164 12.1826C15.4833 12.3495 15.578 12.5755 15.5781 12.8115C15.5781 13.0477 15.4834 13.2744 15.3164 13.4414C15.1495 13.6083 14.9235 13.702 14.6875 13.7021H6.875C6.63879 13.7021 6.41214 13.6084 6.24512 13.4414C6.07812 13.2744 5.98438 13.0477 5.98438 12.8115C5.9845 12.5755 6.07824 12.3495 6.24512 12.1826C6.41214 12.0156 6.63879 11.9209 6.875 11.9209ZM6.875 6.9209H14.6875C14.9235 6.921 15.1495 7.01571 15.3164 7.18262C15.4833 7.34953 15.578 7.57549 15.5781 7.81152C15.5781 8.04773 15.4834 8.27438 15.3164 8.44141C15.1495 8.6083 14.9235 8.70205 14.6875 8.70215H6.875C6.63879 8.70215 6.41214 8.60843 6.24512 8.44141C6.07812 8.27439 5.98438 8.04771 5.98438 7.81152C5.9845 7.57551 6.07824 7.34952 6.24512 7.18262C6.41214 7.01559 6.63879 6.9209 6.875 6.9209ZM2.22754 0.0478516C2.37901 0.0547343 2.52628 0.0999987 2.65527 0.179688C2.78434 0.25946 2.89093 0.371403 2.96484 0.503906C3.02026 0.603307 3.05592 0.712022 3.07031 0.824219L3.07812 0.9375V5.93652C3.07812 6.17273 2.98343 6.39938 2.81641 6.56641C2.64948 6.7333 2.42354 6.82705 2.1875 6.82715C1.95129 6.82715 1.72464 6.73343 1.55762 6.56641C1.39062 6.39939 1.29688 6.17271 1.29688 5.93652V2.37793L1.23535 2.39746C1.02357 2.46643 0.793573 2.45353 0.59082 2.36133C0.388059 2.26911 0.226853 2.10438 0.139648 1.89941C0.0526277 1.69467 0.0451781 1.4647 0.119141 1.25488C0.193101 1.04542 0.342311 0.86951 0.538086 0.764648L0.539062 0.765625L1.78906 0.140625C1.92481 0.0728538 2.07597 0.0409825 2.22754 0.0478516ZM6.875 1.9209H14.6875C14.9235 1.921 15.1495 2.01571 15.3164 2.18262C15.4833 2.34953 15.578 2.57549 15.5781 2.81152C15.5781 3.04773 15.4834 3.27438 15.3164 3.44141C15.1495 3.6083 14.9235 3.70205 14.6875 3.70215H6.875C6.63879 3.70215 6.41214 3.60843 6.24512 3.44141C6.07812 3.27439 5.98438 3.04771 5.98438 2.81152C5.9845 2.57551 6.07824 2.34952 6.24512 2.18262C6.41214 2.01559 6.63879 1.9209 6.875 1.9209Z"
      fill="#475569"
      stroke="#475569"
      stroke-width="0.09375"
    />
  </svg>
)

const DotListIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 13"
    fill="none"
    className={className}
  >
    <path
      d="M1.25 10.0469C1.56909 10.0469 1.87496 10.1738 2.10059 10.3994C2.32622 10.625 2.45312 10.9309 2.45312 11.25C2.45312 11.4879 2.38214 11.7201 2.25 11.918C2.1178 12.1158 1.9298 12.2703 1.70996 12.3613C1.49029 12.4522 1.24881 12.476 1.01562 12.4297C0.782242 12.3833 0.567674 12.2688 0.399414 12.1006C0.231154 11.9323 0.116735 11.7178 0.0703125 11.4844C0.0239837 11.2512 0.0477521 11.0097 0.138672 10.79C0.229734 10.5702 0.384178 10.3822 0.582031 10.25C0.779853 10.1179 1.0121 10.0469 1.25 10.0469ZM4.6875 10.3594H14.6875C14.9237 10.3594 15.1504 10.4531 15.3174 10.6201C15.4844 10.7871 15.5781 11.0138 15.5781 11.25C15.5781 11.4862 15.4844 11.7129 15.3174 11.8799C15.1504 12.0469 14.9237 12.1406 14.6875 12.1406H4.6875C4.45129 12.1406 4.22464 12.0469 4.05762 11.8799C3.89059 11.7129 3.79688 11.4862 3.79688 11.25C3.79688 11.0138 3.89059 10.7871 4.05762 10.6201C4.22464 10.4531 4.45129 10.3594 4.6875 10.3594ZM1.25 5.04688C1.56909 5.04688 1.87496 5.17378 2.10059 5.39941C2.32622 5.62504 2.45312 5.93091 2.45312 6.25C2.45312 6.4879 2.38214 6.72015 2.25 6.91797C2.1178 7.11582 1.9298 7.27027 1.70996 7.36133C1.49029 7.45225 1.24881 7.47602 1.01562 7.42969C0.782242 7.38326 0.567674 7.26885 0.399414 7.10059C0.231154 6.93233 0.116735 6.71776 0.0703125 6.48438C0.0239836 6.25119 0.047752 6.00971 0.138672 5.79004C0.229734 5.5702 0.384178 5.3822 0.582031 5.25C0.779853 5.11786 1.0121 5.04688 1.25 5.04688ZM4.6875 5.35938H14.6875C14.9237 5.35938 15.1504 5.45309 15.3174 5.62012C15.4844 5.78714 15.5781 6.01379 15.5781 6.25C15.5781 6.48621 15.4844 6.71286 15.3174 6.87988C15.1504 7.04691 14.9237 7.14062 14.6875 7.14062H4.6875C4.45129 7.14062 4.22464 7.04691 4.05762 6.87988C3.89059 6.71286 3.79688 6.48621 3.79688 6.25C3.79688 6.01379 3.89059 5.78714 4.05762 5.62012C4.22464 5.45309 4.45129 5.35938 4.6875 5.35938ZM1.25 0.046875C1.56909 0.046875 1.87496 0.173785 2.10059 0.399414C2.32622 0.625044 2.45312 0.930911 2.45312 1.25C2.45312 1.4879 2.38214 1.72015 2.25 1.91797C2.1178 2.11582 1.9298 2.27027 1.70996 2.36133C1.49029 2.45225 1.24881 2.47602 1.01562 2.42969C0.782242 2.38326 0.567674 2.26885 0.399414 2.10059C0.231154 1.93233 0.116735 1.71776 0.0703125 1.48438C0.0239835 1.25119 0.0477521 1.00971 0.138672 0.790039C0.229734 0.570197 0.384178 0.382201 0.582031 0.25C0.779853 0.117861 1.0121 0.0468751 1.25 0.046875ZM4.6875 0.359375H14.6875C14.9237 0.359375 15.1504 0.453093 15.3174 0.620117C15.4844 0.787142 15.5781 1.01379 15.5781 1.25C15.5781 1.48621 15.4844 1.71286 15.3174 1.87988C15.1504 2.04691 14.9237 2.14062 14.6875 2.14062H4.6875C4.45129 2.14062 4.22464 2.04691 4.05762 1.87988C3.89059 1.71286 3.79688 1.48621 3.79688 1.25C3.79688 1.01379 3.89059 0.787142 4.05762 0.620117C4.22464 0.453093 4.45129 0.359375 4.6875 0.359375Z"
      fill="#475569"
      stroke="#475569"
      stroke-width="0.09375"
    />
  </svg>
)

const AddTabIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const ContentIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10.5648 16.6309C10.7937 16.6842 10.8147 16.9841 10.5917 17.0584L9.27504 17.4917C5.96671 18.5584 4.22504 17.6667 3.15004 14.3584L2.08337 11.0667C1.01671 7.75839 1.90004 6.00839 5.20837 4.94172L5.4757 4.85319C5.87857 4.71978 6.27416 5.12514 6.16525 5.53531C6.13457 5.65086 6.10457 5.76966 6.07504 5.89172L5.25837 9.38339C4.34171 13.3084 5.68337 15.4751 9.60837 16.4084L10.5648 16.6309Z" fill="#0F67FD" />
    <path d="M14.3083 2.67505L12.9167 2.35005C10.1333 1.69171 8.47499 2.23338 7.49999 4.25005C7.24999 4.75838 7.04999 5.37505 6.88332 6.08338L6.06665 9.57505C5.24999 13.0584 6.32499 14.775 9.79999 15.6L11.2 15.9334C11.6833 16.05 12.1333 16.125 12.55 16.1584C15.15 16.4084 16.5333 15.1917 17.2333 12.1834L18.05 8.70005C18.8667 5.21671 17.8 3.49171 14.3083 2.67505ZM12.7417 11.1084C12.6667 11.3917 12.4167 11.575 12.1333 11.575C12.0833 11.575 12.0333 11.5667 11.975 11.5584L9.54999 10.9417C9.21665 10.8584 9.01665 10.5167 9.09999 10.1834C9.18332 9.85005 9.52499 9.65005 9.85832 9.73338L12.2833 10.35C12.625 10.4334 12.825 10.775 12.7417 11.1084ZM15.1833 8.29171C15.1083 8.57505 14.8583 8.75838 14.575 8.75838C14.525 8.75838 14.475 8.75005 14.4167 8.74171L10.375 7.71671C10.0417 7.63338 9.84165 7.29171 9.92499 6.95838C10.0083 6.62505 10.35 6.42505 10.6833 6.50838L14.725 7.53338C15.0667 7.60838 15.2667 7.95005 15.1833 8.29171Z" fill="#0F67FD" />
  </svg>
)

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const AwardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15.8333 7.49996C15.8333 8.70829 15.475 9.81664 14.8583 10.7416C13.9583 12.075 12.5333 13.0166 10.875 13.2583C10.5916 13.3083 10.3 13.3333 9.99996 13.3333C9.69996 13.3333 9.40829 13.3083 9.12496 13.2583C7.46663 13.0166 6.04163 12.075 5.14163 10.7416C4.52496 9.81664 4.16663 8.70829 4.16663 7.49996C4.16663 4.27496 6.77496 1.66663 9.99996 1.66663C13.225 1.66663 15.8333 4.27496 15.8333 7.49996Z" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M17.7084 15.3917L16.3334 15.7167C16.025 15.7917 15.7834 16.025 15.7167 16.3333L15.425 17.5583C15.2667 18.225 14.4167 18.425 13.975 17.9L10 13.3333L6.02503 17.9083C5.58336 18.4333 4.73336 18.2333 4.57502 17.5667L4.28336 16.3417C4.20836 16.0333 3.96669 15.7917 3.66669 15.725L2.29169 15.4C1.65836 15.25 1.43336 14.4583 1.89169 14L5.14169 10.75C6.04169 12.0833 7.46669 13.025 9.12503 13.2667C9.40836 13.3167 9.70003 13.3417 10 13.3417C10.3 13.3417 10.5917 13.3167 10.875 13.2667C12.5334 13.025 13.9584 12.0833 14.8584 10.75L18.1084 14C18.5667 14.45 18.3417 15.2417 17.7084 15.3917Z" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10.4834 4.98337L10.9751 5.9667C11.0417 6.10003 11.2167 6.23337 11.3751 6.25837L12.2667 6.40837C12.8334 6.50003 12.9667 6.91671 12.5584 7.32504L11.8667 8.01669C11.7501 8.13336 11.6834 8.35837 11.7251 8.52504L11.9251 9.38337C12.0834 10.0584 11.7251 10.325 11.1251 9.96669L10.2917 9.47503C10.1417 9.38336 9.89173 9.38336 9.74173 9.47503L8.90839 9.96669C8.30839 10.3167 7.95006 10.0584 8.10839 9.38337L8.30839 8.52504C8.34173 8.36671 8.28339 8.13336 8.16673 8.01669L7.47506 7.32504C7.06673 6.91671 7.20006 6.50837 7.76673 6.40837L8.65839 6.25837C8.80839 6.23337 8.98339 6.10003 9.05006 5.9667L9.54173 4.98337C9.78339 4.45004 10.2167 4.45004 10.4834 4.98337Z" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15 15.7167H14.3667C13.7 15.7167 13.0667 15.975 12.6 16.4417L11.175 17.85C10.525 18.4917 9.46668 18.4917 8.81668 17.85L7.39166 16.4417C6.925 15.975 6.28333 15.7167 5.625 15.7167H5C3.61667 15.7167 2.5 14.6084 2.5 13.2417V4.15002C2.5 2.78336 3.61667 1.67505 5 1.67505H15C16.3833 1.67505 17.5 2.78336 17.5 4.15002V13.2417C17.5 14.6001 16.3833 15.7167 15 15.7167Z" stroke="#566273" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.99991 8.33338C11.0723 8.33338 11.9416 7.46406 11.9416 6.3917C11.9416 5.31935 11.0723 4.45007 9.99991 4.45007C8.92756 4.45007 8.05823 5.31935 8.05823 6.3917C8.05823 7.46406 8.92756 8.33338 9.99991 8.33338Z" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M13.3333 13.05C13.3333 11.55 11.8416 10.3334 9.99996 10.3334C8.15829 10.3334 6.66663 11.55 6.66663 13.05" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

const FormIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M13.3333 10.5751V15.0668C13.3333 17.0168 12.0333 18.3084 10.0916 18.3084H4.90829C2.96663 18.3084 1.66663 17.0168 1.66663 15.0668V8.59176C1.66663 6.64176 2.96663 5.3501 4.90829 5.3501H8.09996C8.95829 5.3501 9.78329 5.69176 10.3916 6.3001L12.3833 8.28343C12.9916 8.89176 13.3333 9.71676 13.3333 10.5751Z" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.3333 6.87493V11.3666C18.3333 13.3083 17.0333 14.6083 15.0916 14.6083H13.3333V10.5749C13.3333 9.7166 12.9916 8.8916 12.3833 8.28327L10.3916 6.29994C9.78329 5.6916 8.95829 5.34993 8.09996 5.34993H6.66663V4.88327C6.66663 2.9416 7.96663 1.6416 9.90829 1.6416H13.1C13.9583 1.6416 14.7833 1.98327 15.3916 2.5916L17.3833 4.58327C17.9916 5.1916 18.3333 6.0166 18.3333 6.87493Z" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18.3333 8.75008V12.9167C18.3333 15.8334 16.6666 17.0834 14.1666 17.0834H5.83329C3.33329 17.0834 1.66663 15.8334 1.66663 12.9167V7.08341C1.66663 4.16675 3.33329 2.91675 5.83329 2.91675H11.6666" stroke="#566273" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M5.83337 7.5L8.44171 9.58333C9.30004 10.2667 10.7084 10.2667 11.5667 9.58333L12.55 8.8" stroke="#566273" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16.25 6.66667C17.4006 6.66667 18.3333 5.73393 18.3333 4.58333C18.3333 3.43274 17.4006 2.5 16.25 2.5C15.0994 2.5 14.1666 3.43274 14.1666 4.58333C14.1666 5.73393 15.0994 6.66667 16.25 6.66667Z" stroke="#566273" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

const ContactIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M14.1666 15.3583H10.8333L7.12495 17.8249C6.57495 18.1916 5.83329 17.8 5.83329 17.1333V15.3583C3.33329 15.3583 1.66663 13.6916 1.66663 11.1916V6.19157C1.66663 3.69157 3.33329 2.0249 5.83329 2.0249H14.1666C16.6666 2.0249 18.3333 3.69157 18.3333 6.19157V11.1916C18.3333 13.6916 16.6666 15.3583 14.1666 15.3583Z" stroke="#566273" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10 9.46655V9.29159C10 8.72492 10.35 8.4249 10.7 8.18324C11.0417 7.9499 11.3833 7.64991 11.3833 7.09991C11.3833 6.33325 10.7667 5.71655 10 5.71655C9.23334 5.71655 8.6167 6.33325 8.6167 7.09991" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.99629 11.4584H10.0038" stroke="#566273" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M8.99854 11.0327C10.3792 11.0327 11.4985 9.91343 11.4985 8.53271C11.4985 7.152 10.3792 6.03271 8.99854 6.03271C7.61782 6.03271 6.49854 7.152 6.49854 8.53271C6.49854 9.91343 7.61782 11.0327 8.99854 11.0327Z" stroke="#566273" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M0.665039 9.26461V7.79794C0.665039 6.93128 1.37337 6.21461 2.24837 6.21461C3.75671 6.21461 4.37337 5.14794 3.61504 3.83961C3.18171 3.08961 3.44004 2.11461 4.19837 1.68128L5.64004 0.856278C6.29837 0.464612 7.14837 0.697945 7.54004 1.35628L7.63171 1.51461C8.38171 2.82294 9.61504 2.82294 10.3734 1.51461L10.465 1.35628C10.8567 0.697945 11.7067 0.464612 12.365 0.856278L13.8067 1.68128C14.565 2.11461 14.8234 3.08961 14.39 3.83961C13.6317 5.14794 14.2484 6.21461 15.7567 6.21461C16.6234 6.21461 17.34 6.92294 17.34 7.79794V9.26461C17.34 10.1313 16.6317 10.8479 15.7567 10.8479C14.2484 10.8479 13.6317 11.9146 14.39 13.2229C14.8234 13.9813 14.565 14.9479 13.8067 15.3813L12.365 16.2063C11.7067 16.5979 10.8567 16.3646 10.465 15.7063L10.3734 15.5479C9.62337 14.2396 8.39004 14.2396 7.63171 15.5479L7.54004 15.7063C7.14837 16.3646 6.29837 16.5979 5.64004 16.2063L4.19837 15.3813C3.44004 14.9479 3.18171 13.9729 3.61504 13.2229C4.37337 11.9146 3.75671 10.8479 2.24837 10.8479C1.37337 10.8479 0.665039 10.1313 0.665039 9.26461Z" stroke="#566273" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

const AlignLeftIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 24" fill="none" className={className}>
    <path d="M5 7h14M5 12h10M5 17h14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const AlignCenterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 24" fill="none" className={className}>
    <path d="M6 7h12M4 12h16M6 17h12" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const AlignRightIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 24" fill="none" className={className}>
    <path d="M5 7h14M9 12h10M5 17h14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const ListIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 7h11M8 12h11M8 17h11" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5" cy="7" r="1" fill="currentColor" />
    <circle cx="5" cy="12" r="1" fill="currentColor" />
    <circle cx="5" cy="17" r="1" fill="currentColor" />
  </svg>
)

const ListOrderedIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 7h10M9 12h10M9 17h10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 7h.01M5 12h.01M5 17h.01" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const ImageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="43" height="36" viewBox="0 0 43 36" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 4.33333C0 1.9401 1.9401 0 4.33333 0H38.3333C40.7266 0 42.6667 1.9401 42.6667 4.33333V31C42.6667 33.3932 40.7266 35.3333 38.3333 35.3333H4.33333C1.9401 35.3333 0 33.3932 0 31V4.33333ZM4.33333 2C3.04467 2 2 3.04467 2 4.33333V31C2 32.2887 3.04467 33.3333 4.33333 33.3333H38.3333C39.622 33.3333 40.6667 32.2887 40.6667 31V4.33333C40.6667 3.04467 39.622 2 38.3333 2H4.33333Z" fill="#B2B9C4" />
    <circle cx="9.99996" cy="9.33333" r="4.33333" fill="#B2B9C4" />
    <path d="M5.66663 27.6667V25.6904C5.66663 25.2484 5.84222 24.8245 6.15478 24.5119L11.5429 19.1238C12.172 18.4947 13.1842 18.4706 13.8425 19.0691L15.1739 20.2794C15.8254 20.8717 16.8254 20.855 17.4568 20.2411L27.155 10.8123C27.8084 10.177 28.8509 10.1844 29.4953 10.8288L37.1785 18.5119C37.491 18.8245 37.6666 19.2484 37.6666 19.6904V27.6667C37.6666 28.5872 36.9204 29.3334 36 29.3334H7.33329C6.41282 29.3334 5.66663 28.5872 5.66663 27.6667Z" fill="#B2B9C4" />
  </svg>
)

const UploadIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 16V6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 9l4-4 4 4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 18h16" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const UploadCloudIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="24" viewBox="0 0 36 24" fill="none">
    <path d="M29.025 9.06C28.005 3.885 23.46 0 18 0C13.665 0 9.9 2.46 8.025 6.06C3.51 6.54 0 10.365 0 15C0 19.965 4.035 24 9 24H28.5C32.64 24 36 20.64 36 16.5C36 12.54 32.925 9.33 29.025 9.06ZM28.5 21H9C5.685 21 3 18.315 3 15C3 11.925 5.295 9.36 8.34 9.045L9.945 8.88L10.695 7.455C12.12 4.71 14.91 3 18 3C21.93 3 25.32 5.79 26.085 9.645L26.535 11.895L28.83 12.06C31.17 12.21 33 14.175 33 16.5C33 18.975 30.975 21 28.5 21ZM12 13.5H15.825V18H20.175V13.5H24L18 7.5L12 13.5Z" fill="#0F67FD" />
  </svg>
)

const AddFileIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
    <g clip-path="url(#clip0_147_485)">
      <path d="M65 80H15C6.715 80 0 73.285 0 65V15C0 6.715 6.715 0 15 0H65C73.285 0 80 6.715 80 15V65C80 73.285 73.285 80 65 80Z" fill="#0F67FD" fill-opacity="0.05" />
      <path d="M43.75 20H24.5825C22.05 20 20 22.05 20 24.5825V50.415C20 52.95 22.05 55 24.5825 55H35.565C34.665 53.1 34.165 50.9825 34.165 48.75C34.165 46.8325 34.5325 45 35.215 43.3175C35.1475 43.335 35.0825 43.335 34.9975 43.335H26.665C25.7475 43.335 24.9975 42.585 24.9975 41.6675C24.9975 40.75 25.75 40 26.6675 40H35C35.6325 40 36.2 40.3675 36.4675 40.9C37.55 39.2175 38.95 37.7825 40.6 36.6675H26.6675C25.75 36.6675 25 35.9175 25 35C25 34.0825 25.75 33.3325 26.6675 33.3325H41.6675C42.585 33.3325 43.335 34.0825 43.335 35C43.335 35.0825 43.335 35.15 43.3175 35.2175C44.8675 34.585 46.5675 34.2175 48.335 34.185V24.585C48.3325 22.05 46.2825 20 43.75 20ZM33.3325 30H26.665C25.75 30 25 29.25 25 28.3325C25 27.415 25.75 26.665 26.6675 26.665H33.335C34.2525 26.665 35.0025 27.415 35.0025 28.3325C35.0025 29.25 34.25 30 33.3325 30Z" fill="#0F67FD" />
      <path d="M48.75 37.5C42.5475 37.5 37.5 42.5475 37.5 48.75C37.5 54.9525 42.5475 60 48.75 60C54.9525 60 60 54.9525 60 48.75C60 42.5475 54.9525 37.5 48.75 37.5ZM53.3325 50.4175H50.415V53.335C50.415 54.255 49.6675 55.0025 48.7475 55.0025C47.8275 55.0025 47.08 54.255 47.08 53.335V50.4175H44.1625C43.2475 50.4175 42.5 49.67 42.5 48.75C42.5 47.83 43.2475 47.0825 44.1675 47.0825H47.085V44.165C47.085 43.245 47.8325 42.4975 48.7525 42.4975C49.6725 42.4975 50.42 43.245 50.42 44.165V47.0825H53.3375C54.2575 47.0825 55.005 47.83 55.005 48.75C55.005 49.67 54.255 50.4175 53.3325 50.4175Z" fill="#0F67FD" fill-opacity="0.5" />
    </g>
    <defs>
      <clipPath id="clip0_147_485">
        <rect width="80" height="80" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const sidebarLinks = [
  { label: 'Accreditation', icon: AwardIcon },
  { label: 'Testimonials', icon: QuoteIcon },
  { label: 'Forms', icon: FormIcon },
  { label: 'Emailing', icon: MailIcon },
  { label: 'Contact', icon: ContactIcon },
]

export default Page
