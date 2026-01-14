
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const initialTabs = ['Welcome message', 'About', 'Portfolio', 'Services', 'How It Works', 'Resources', 'FAQs', 'Privacy', 'T&C']

const defaultEditorContent: Record<string, string> = {
  'Welcome message': 'Start writing your welcome message here.',
  'About': 'Start writing about your about section here.',
  'Portfolio': 'Start writing about your portfolio section here.',
  'Services': 'Start writing about your services section here.',
  'How It Works': 'Start writing about how it works here.',
  'FAQs': '',
  'Resources': '',
  'Privacy': 'Start writing your privacy policy here.',
  'T&C': 'Start writing your terms and conditions here.',
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

type TestimonialData = {
  id: string
  customerName: string
  title: string
  testimonial: string
  rating: string
  imageName: string
  imageUrl: string | null
}

type CustomFieldData = {
  id: string
  type: 'checkboxes' | 'radio' | 'number' | 'address'
  label: string
  options: string[]
}

type FAQData = {
  id: string
  question: string
  answer: string
}

type ResourceData = {
  id: string
  title: string
  fileName: string
  fileUrl: string | null
}

const renameKey = <T,>(
  source: Record<string, T>,
  fromKey: string,
  toKey: string
): Record<string, T> => {
  const { [fromKey]: value, ...rest } = source
  return { ...rest, [toKey]: value }
}

const removeKey = <T,>(source: Record<string, T>, key: string): Record<string, T> => {
  const { [key]: _value, ...rest } = source
  return rest
}

const createCard = (): CardData => ({
  id: Math.random().toString(36).slice(2),
  title: '',
  description: '',
  imageName: '',
  imageUrl: null,
})

const createTestimonial = (): TestimonialData => ({
  id: Math.random().toString(36).slice(2),
  customerName: '',
  title: '',
  testimonial: '',
  rating: '',
  imageName: '',
  imageUrl: null,
})

const createCustomField = (type: CustomFieldData['type']): CustomFieldData => ({
  id: Math.random().toString(36).slice(2),
  type,
  label: '',
  options: type === 'checkboxes' || type === 'radio' ? ['Option 1', 'Option 2', 'Option 3'] : [],
})

const createFAQ = (): FAQData => ({
  id: Math.random().toString(36).slice(2),
  question: '',
  answer: '',
})

const createResource = (): ResourceData => ({
  id: Math.random().toString(36).slice(2),
  title: '',
  fileName: '',
  fileUrl: null,
})

const Page = () => {
  const [contentTabs, setContentTabs] = useState(initialTabs)
  const [activeTab, setActiveTab] = useState('Welcome message')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [contentOpen, setContentOpen] = useState(true)
  const [colorMenuOpen, setColorMenuOpen] = useState(false)
  const [highlightMenuOpen, setHighlightMenuOpen] = useState(false)
  const [editingTab, setEditingTab] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [showResourceModal, setShowResourceModal] = useState(false)
  const [newResourceTitle, setNewResourceTitle] = useState('')
  const [newResourceFile, setNewResourceFile] = useState<File | null>(null)
  const [showEditResourceModal, setShowEditResourceModal] = useState(false)
  const [editResourceId, setEditResourceId] = useState<string | null>(null)
  const [editResourceTitle, setEditResourceTitle] = useState('')
  const [editResourceFile, setEditResourceFile] = useState<File | null>(null)
  const [editResourceFileName, setEditResourceFileName] = useState('')
  const [editResourceFileUrl, setEditResourceFileUrl] = useState<string | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [editorContent, setEditorContent] = useState(defaultEditorContent)
  const [sectionFiles, setSectionFiles] = useState<Record<string, File[]>>({
    'Welcome message': [],
    'About': [],
    'Portfolio': [],
    'Services': [],
    'How It Works': [],
    'FAQs': [],
    'Resources': [],
    'Privacy': [],
    'T&C': [],
  })
  const [sectionPreview, setSectionPreview] = useState<Record<string, string | null>>({
    'Welcome message': null,
    'About': null,
    'Portfolio': null,
    'Services': null,
    'How It Works': null,
    'FAQs': null,
    'Resources': null,
    'Privacy': null,
    'T&C': null,
  })
  const [cardsByTab, setCardsByTab] = useState<Record<string, CardData[]>>({
    'Welcome message': [],
    'About': [],
    'Portfolio': [createCard(), createCard()],
    'Services': [createCard(), createCard()],
    'How It Works': [],
    'FAQs': [],
    'Resources': [],
    'Privacy': [],
    'T&C': [],
  })
  const [saveStatus, setSaveStatus] = useState('')

  // Accreditation state
  const [activeSidebarSection, setActiveSidebarSection] = useState('Content')
  const [accreditationEditorContent, setAccreditationEditorContent] = useState('Start writing about your accreditation section here.')
  const [accreditationCards, setAccreditationCards] = useState<CardData[]>([createCard(), createCard()])

  // Testimonials state
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([createTestimonial()])

  // Forms state
  const [customFields, setCustomFields] = useState<CustomFieldData[]>([])
  const [formNotifications, setFormNotifications] = useState(false)
  const [showFieldMenu, setShowFieldMenu] = useState(false)

  // FAQs state
  const [faqs, setFaqs] = useState<FAQData[]>([
    createFAQ(),
    createFAQ(),
    createFAQ()
  ])
  const [showFAQModal, setShowFAQModal] = useState(false)
  const [newFAQQuestion, setNewFAQQuestion] = useState('')
  const [newFAQAnswer, setNewFAQAnswer] = useState('')
  const [showEditFAQModal, setShowEditFAQModal] = useState(false)
  const [editFAQId, setEditFAQId] = useState<string | null>(null)
  const [editFAQQuestion, setEditFAQQuestion] = useState('')
  const [editFAQAnswer, setEditFAQAnswer] = useState('')

  // Resources state
  const [resources, setResources] = useState<ResourceData[]>([
    {
      id: Math.random().toString(36).slice(2),
      title: 'Company Brochure',
      fileName: 'company-brochure.pdf',
      fileUrl: null,
    },
    {
      id: Math.random().toString(36).slice(2),
      title: '2026 Annual Report',
      fileName: '2026-annual-report.docx',
      fileUrl: null,
    }
  ])

  // How It Works state
  const [howItWorksFiles, setHowItWorksFiles] = useState<File[]>([])
  const [howItWorksPreview, setHowItWorksPreview] = useState<string | null>(null)

  const tabHeadingMap: Record<string, string> = {
    FAQs: 'Frequently Ask Question',
    'T&C': 'Term and Conditions',
  }
  const cardTitleLabel = activeTab === 'Portfolio' ? 'Project name' : 'Service name'
  const cardDescLabel =
    activeTab === 'Portfolio' ? 'Project description' : 'Service description'
  const activeTabHeading = tabHeadingMap[activeTab] ?? activeTab


  const handleStartEdit = (tab: string) => {
    setEditingTab(tab)
    setEditValue(tab)
  }

  const handleCancelEdit = () => {
    setEditingTab(null)
    setEditValue('')
  }

  const handleSaveEdit = () => {
    if (!editingTab) return
    const trimmed = editValue.trim()
    if (!trimmed || contentTabs.includes(trimmed)) return
    setContentTabs((prev) => prev.map((tab) => (tab === editingTab ? trimmed : tab)))
    setEditorContent((prev) => renameKey(prev, editingTab, trimmed))
    setSectionFiles((prev) => renameKey(prev, editingTab, trimmed))
    setSectionPreview((prev) => renameKey(prev, editingTab, trimmed))
    setCardsByTab((prev) => renameKey(prev, editingTab, trimmed))
    if (activeTab === editingTab) setActiveTab(trimmed)
    setEditingTab(null)
    setEditValue('')
  }

  const handleDeleteTab = (tab: string) => {
    if (contentTabs.length === 1) return
    setDeleteTarget(tab)
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    const tab = deleteTarget
    setContentTabs((prev) => prev.filter((item) => item !== tab))
    setEditorContent((prev) => removeKey(prev, tab))
    setSectionFiles((prev) => removeKey(prev, tab))
    setSectionPreview((prev) => removeKey(prev, tab))
    setCardsByTab((prev) => removeKey(prev, tab))
    if (activeTab === tab) {
      const remaining = contentTabs.filter((item) => item !== tab)
      setActiveTab(remaining[0] ?? 'About')
    }
    if (editingTab === tab) handleCancelEdit()
    setDeleteTarget(null)
  }

  const handleCancelDelete = () => {
    setDeleteTarget(null)
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

  // Accreditation card functions
  const updateAccreditationCard = (id: string, patch: Partial<CardData>) => {
    setAccreditationCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...patch } : card))
    )
  }

  const handleAccreditationCardImageChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAccreditationCards((prev) =>
      prev.map((card) => {
        if (card.id !== id) return card
        return { ...card, imageName: file.name, imageUrl: url }
      })
    )
    event.target.value = ''
  }

  const addAccreditationCard = () => {
    setAccreditationCards((prev) => [...prev, createCard()])
  }

  // Testimonial functions
  const updateTestimonial = (id: string, patch: Partial<TestimonialData>) => {
    setTestimonials((prev) =>
      prev.map((testimonial) => (testimonial.id === id ? { ...testimonial, ...patch } : testimonial))
    )
  }

  const handleTestimonialImageChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setTestimonials((prev) =>
      prev.map((testimonial) => {
        if (testimonial.id !== id) return testimonial
        return { ...testimonial, imageName: file.name, imageUrl: url }
      })
    )
    event.target.value = ''
  }

  const addTestimonial = () => {
    setTestimonials((prev) => [...prev, createTestimonial()])
  }

  // Forms functions
  const addCustomField = (type: CustomFieldData['type']) => {
    setCustomFields((prev) => [...prev, createCustomField(type)])
    setShowFieldMenu(false)
  }

  const updateCustomField = (id: string, patch: Partial<CustomFieldData>) => {
    setCustomFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, ...patch } : field))
    )
  }

  const updateFieldOption = (fieldId: string, optionIndex: number, value: string) => {
    setCustomFields((prev) =>
      prev.map((field) => {
        if (field.id !== fieldId) return field
        const newOptions = [...field.options]
        newOptions[optionIndex] = value
        return { ...field, options: newOptions }
      })
    )
  }

  const deleteCustomField = (id: string) => {
    setCustomFields((prev) => prev.filter((field) => field.id !== id))
  }

  // FAQ functions
  const updateFAQ = (id: string, patch: Partial<FAQData>) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, ...patch } : faq))
    )
  }

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((faq) => faq.id !== id))
  }

  const addFAQ = () => {
    setFaqs((prev) => [...prev, createFAQ()])
  }

  const handleAddFAQFromModal = () => {
    const newFAQ: FAQData = {
      id: Math.random().toString(36).substring(7),
      question: newFAQQuestion,
      answer: newFAQAnswer
    }
    setFaqs((prev) => [...prev, newFAQ])
    setShowFAQModal(false)
    setNewFAQQuestion('')
    setNewFAQAnswer('')
  }

  const handleOpenEditFAQModal = (faq: FAQData) => {
    setEditFAQId(faq.id)
    setEditFAQQuestion(faq.question)
    setEditFAQAnswer(faq.answer)
    setShowEditFAQModal(true)
  }

  const handleSaveFAQFromModal = () => {
    if (!editFAQId) return
    updateFAQ(editFAQId, {
      question: editFAQQuestion,
      answer: editFAQAnswer
    })
    setShowEditFAQModal(false)
    setEditFAQId(null)
    setEditFAQQuestion('')
    setEditFAQAnswer('')
  }

  const handleCancelEditFAQModal = () => {
    setShowEditFAQModal(false)
    setEditFAQId(null)
    setEditFAQQuestion('')
    setEditFAQAnswer('')
  }

  // Resources functions
  const updateResource = (id: string, patch: Partial<ResourceData>) => {
    setResources((prev) =>
      prev.map((resource) => (resource.id === id ? { ...resource, ...patch } : resource))
    )
  }

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((resource) => resource.id !== id))
  }

  const addResource = () => {
    setShowResourceModal(true)
  }

  const handleResourceFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setNewResourceFile(file)
  }

  const handleAddResourceFromModal = () => {
    const newResource: ResourceData = {
      id: Math.random().toString(36).slice(2),
      title: newResourceTitle.trim() || 'Untitled Resource',
      fileName: newResourceFile?.name ?? '',
      fileUrl: newResourceFile ? URL.createObjectURL(newResourceFile) : null,
    }
    setResources((prev) => [...prev, newResource])
    setShowResourceModal(false)
    setNewResourceTitle('')
    setNewResourceFile(null)
  }

  const handleCancelResourceModal = () => {
    setShowResourceModal(false)
    setNewResourceTitle('')
    setNewResourceFile(null)
  }

  const handleOpenEditResourceModal = (resource: ResourceData) => {
    setEditResourceId(resource.id)
    setEditResourceTitle(resource.title)
    setEditResourceFile(null)
    setEditResourceFileName(resource.fileName)
    setEditResourceFileUrl(resource.fileUrl)
    setShowEditResourceModal(true)
  }

  const handleEditResourceFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setEditResourceFile(file)
    setEditResourceFileName(file.name)
  }

  const handleSaveResourceFromModal = () => {
    if (!editResourceId) return
    const nextUrl = editResourceFile ? URL.createObjectURL(editResourceFile) : editResourceFileUrl
    updateResource(editResourceId, {
      title: editResourceTitle.trim() || 'Untitled Resource',
      fileName: editResourceFileName,
      fileUrl: nextUrl,
    })
    setShowEditResourceModal(false)
    setEditResourceId(null)
    setEditResourceTitle('')
    setEditResourceFile(null)
    setEditResourceFileName('')
    setEditResourceFileUrl(null)
  }

  const handleCancelEditResourceModal = () => {
    setShowEditResourceModal(false)
    setEditResourceId(null)
    setEditResourceTitle('')
    setEditResourceFile(null)
    setEditResourceFileName('')
    setEditResourceFileUrl(null)
  }

  const handleResourceFileChange = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      updateResource(id, { fileName: file.name, fileUrl })
    }
  }

  // How It Works file handling
  const handleHowItWorksFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    setHowItWorksFiles(files)
    const previousPreview = howItWorksPreview
    if (previousPreview) URL.revokeObjectURL(previousPreview)
    const nextPreview = files[0] ? URL.createObjectURL(files[0]) : null
    setHowItWorksPreview(nextPreview)
  }

  const handleSave = () => {
    setSaveStatus('Saved just now')
    window.setTimeout(() => setSaveStatus(''), 2000)
  }

  return (
    <div className={`${inter.className} min-h-screen bg-white text-slate-900`}>
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

          <div className="mt-6 space-y-2">
            <button
              onClick={() => {
                if (activeSidebarSection === 'Content') {
                  setContentOpen((prev) => !prev)
                } else {
                  setActiveSidebarSection('Content')
                  setContentOpen(true)
                }
              }}
              className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition ${activeSidebarSection === 'Content'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-white text-slate-500 hover:bg-slate-50'
                }`}
            >
              <span className="flex items-center gap-2">
                {activeSidebarSection === 'Content' ? (
                  <ContentActiveIcon className="h-5 w-5" />
                ) : (
                  <ContentIcon className="h-5 w-5" />
                )}
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
                  <div
                    key={tab}
                    className={`group flex w-full items-center rounded-lg px-2 py-1.5 text-sm font-medium transition hover:bg-slate-50 ${
                      activeTab === tab && activeSidebarSection === 'Content'
                        ? 'text-blue-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {editingTab === tab ? (
                      <div className="flex w-full items-center gap-2">
                        <input
                          value={editValue}
                          onChange={(event) => setEditValue(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') handleSaveEdit()
                            if (event.key === 'Escape') handleCancelEdit()
                          }}
                          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600"
                        />
                        <button
                          onClick={handleSaveEdit}
                          className="rounded-md bg-blue-600 p-1.5 text-white"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="rounded-md border border-slate-200 p-1.5 text-slate-500"
                        >
                          <CloseIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setActiveTab(tab)
                            setActiveSidebarSection('Content')
                          }}
                          className="flex flex-1 cursor-pointer items-center text-left"
                        >
                          {tab}
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStartEdit(tab)}
                            className="cursor-pointer text-slate-400 hover:text-slate-600"
                          >
                            <EditIcon className="h-3 w-3" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="my-2 h-px w-full bg-slate-100" />

          <div className="text-sm text-slate-600">
            {sidebarLinks.map((item, index) => {
              const Icon =
                activeSidebarSection === item.label && item.activeIcon
                  ? item.activeIcon
                  : item.icon
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setActiveSidebarSection(item.label)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-slate-50 ${activeSidebarSection === item.label
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-500'
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    {sidebarOpen && item.label}
                  </button>
                  {index < sidebarLinks.length - 1 && (
                    <div className="my-2 h-px w-full bg-slate-100" />
                  )}
                </div>
              )
            })}
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
          {activeSidebarSection === 'Content' && (
            <>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{activeSidebarSection}</span>
              </div>
              <div className="mt-7">
                <h1 className="text-xl font-medium">{activeTabHeading}</h1>

                {activeTab !== 'FAQs' && activeTab !== 'Resources' && (
                  <>
                    <div className="mt-6 overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
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

                    {activeTab !== 'Privacy' && activeTab !== 'T&C' && (
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
                    )}
                  </>
                )}

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

                {activeTab === 'FAQs' && (
                  <div className="mt-6">
                    <div className="space-y-4 flex flex-col justify-center rounded-xl shadow bg-white p-3">
                      {faqs.map((faq) => (
                        <div key={faq.id} className="rounded-xl border border-slate-200 bg-white p-6">
                          <div className="flex items-start gap-4">
                            <div className="shrink-0 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <g clipPath="url(#clip0_296_1299)">
                                  <path d="M11.5006 2.30398L9.34414 0.147534C9.24639 0.04978 9.116 -0.000267834 8.98122 2.4844e-05C8.84396 -0.00129221 8.71064 0.04978 8.61289 0.147534L6.50093 2.2595C6.30308 2.45735 6.30308 2.779 6.50093 2.9767L6.77326 3.24904C6.96424 3.44001 7.29759 3.44001 7.48871 3.24904L8.29724 2.43876V5.41632C8.29724 5.42539 8.3025 5.43285 8.30411 5.44134C8.32606 5.7008 8.54367 5.90611 8.80898 5.90611H9.19385C9.47351 5.90611 9.7034 5.67899 9.7034 5.39934V5.06686C9.7034 5.0654 9.7034 5.06437 9.7034 5.0632V2.48296L10.5122 3.29338C10.7101 3.49123 11.031 3.49123 11.2287 3.29338L11.5006 3.02134C11.6984 2.82334 11.6984 2.50154 11.5006 2.30398Z" fill="#566273" />
                                  <path d="M11.4995 14.9791L11.2273 14.7063C11.0363 14.5151 10.7028 14.5151 10.5116 14.7063L9.70276 15.5168V12.9479C9.70276 12.9465 9.70276 12.9456 9.70276 12.9443V12.6118C9.70276 12.332 9.47271 12.0938 9.19335 12.0938H8.80819C8.54317 12.0938 8.32556 12.3043 8.30347 12.5641C8.30186 12.5727 8.29659 12.5859 8.29659 12.5948V15.5612L7.48807 14.751C7.29695 14.5599 6.96286 14.5599 6.77174 14.751L6.49955 15.0233C6.30199 15.221 6.30228 15.5428 6.50013 15.7407L8.61224 17.8525C8.70751 17.948 8.83468 18 8.96594 18H8.98497C9.12091 18 9.24779 17.9482 9.3432 17.8525L11.4995 15.6962C11.6974 15.4985 11.6974 15.1768 11.4995 14.9791Z" fill="#566273" />
                                  <path d="M5.38665 8.29665H5.34333H5.05256C5.05154 8.29665 5.05051 8.29665 5.04934 8.29665H2.4928L3.30323 7.49062C3.39878 7.39521 3.45132 7.26994 3.45132 7.13429C3.45132 6.99848 3.39878 6.87219 3.30323 6.77693L3.03089 6.50517C2.83304 6.30732 2.51124 6.30762 2.31368 6.50547L0.157234 8.66177C0.0594797 8.75938 0.00723678 8.89035 0.00987088 9.02469C0.00709044 9.16444 0.0594797 9.29527 0.157234 9.39302L2.2692 11.5051C2.36812 11.6041 2.49792 11.6535 2.62787 11.6535C2.75782 11.6535 2.88762 11.6041 2.98655 11.5051L3.25874 11.2329C3.3543 11.1375 3.40698 11.0101 3.40698 10.8744C3.40698 10.7386 3.35444 10.6098 3.25874 10.5146L2.44861 9.70297H5.40202C5.41094 9.70297 5.42558 9.70077 5.43406 9.69917C5.69367 9.67721 5.90571 9.46254 5.90571 9.19737V8.81191C5.90571 8.53255 5.6663 8.29665 5.38665 8.29665Z" fill="#566273" />
                                  <path d="M17.8421 8.66197L15.6856 6.50581C15.4879 6.30796 15.1661 6.30796 14.9684 6.50581L14.6964 6.77815C14.6008 6.87341 14.5481 7.00087 14.5481 7.13653C14.5481 7.27233 14.6007 7.39526 14.6964 7.49067L15.5067 8.2967H12.9337C12.9324 8.2967 12.9314 8.2967 12.9302 8.2967H12.5979C12.3182 8.2967 12.0938 8.53246 12.0938 8.81196V9.19742C12.0938 9.46258 12.2973 9.67697 12.5571 9.69907C12.5657 9.70082 12.572 9.70302 12.5808 9.70302H15.551L14.7404 10.5145C14.645 10.6097 14.5923 10.7382 14.5923 10.8736C14.5923 11.0095 14.6449 11.1373 14.7404 11.2327L15.0129 11.505C15.1117 11.604 15.2415 11.6536 15.3714 11.6536C15.5014 11.6536 15.6311 11.6041 15.73 11.5052L17.8422 9.39307C17.9397 9.29561 17.9919 9.16464 17.9896 9.03015C17.9918 8.8904 17.9395 8.75943 17.8421 8.66197Z" fill="#566273" />
                                  <path d="M9.00065 7.59277C8.22491 7.59277 7.59375 8.22393 7.59375 8.99982C7.59375 9.77556 8.22491 10.4069 9.00065 10.4069C9.77639 10.4069 10.4077 9.77556 10.4077 8.99982C10.4077 8.22393 9.77639 7.59277 9.00065 7.59277Z" fill="#566273" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_296_1299">
                                    <rect width="18" height="18" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="flex-1 space-y-4">
                              <div className="w-full text-base font-medium text-slate-900">
                                {faq.question || 'What is your return policy?'}
                              </div>
                              <div className="w-full text-sm text-slate-600">
                                {faq.answer || 'Write a short description here to highlight your certifications or achievements. This content will appear at the top of your page as a hero banner description.'}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenEditFAQModal(faq)}
                                className="flex h-6 w-6 items-center cursor-pointer justify-center rounded-md hover:bg-green-50"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                  <path d="M0 11.5116V6.48837C0 4.33342 0.427193 2.66165 1.54442 1.54442C2.66165 0.427193 4.33342 0 6.48837 0H8.16279C8.50957 0 8.7907 0.281124 8.7907 0.627907C8.7907 0.97469 8.50957 1.25581 8.16279 1.25581H6.48837C4.45728 1.25581 3.19881 1.66583 2.43232 2.43232C1.66583 3.19881 1.25581 4.45728 1.25581 6.48837V11.5116C1.25581 13.5427 1.66583 14.8012 2.43232 15.5677C3.19881 16.3342 4.45728 16.7442 6.48837 16.7442H11.5116C13.5427 16.7442 14.8012 16.3342 15.5677 15.5677C16.3342 14.8012 16.7442 13.5427 16.7442 11.5116V9.83721C16.7442 9.49043 17.0253 9.2093 17.3721 9.2093C17.7189 9.2093 18 9.49043 18 9.83721V11.5116C18 13.6666 17.5728 15.3383 16.4556 16.4556C15.3383 17.5728 13.6666 18 11.5116 18H6.48837C4.33342 18 2.66165 17.5728 1.54442 16.4556C0.427193 15.3383 0 13.6666 0 11.5116Z" fill="#566273" />
                                  <path d="M14.1161 0.0120885C15.016 -0.0762555 15.9082 0.31942 16.7944 1.20573C17.6806 2.09207 18.0762 2.98429 17.9879 3.88431C17.9027 4.75246 17.3787 5.4717 16.7944 6.05607L10.418 12.4332C10.236 12.6093 9.99861 12.7639 9.7691 12.8792C9.54088 12.994 9.27155 13.0952 9.01527 13.1319L6.58246 13.4792H6.57931C5.97948 13.5618 5.4056 13.3979 5.00296 12.9969C4.59978 12.5951 4.43511 12.0217 4.52303 11.4188L4.87034 8.98728C4.90666 8.72746 5.00655 8.45631 5.12215 8.22625C5.23793 7.99587 5.39444 7.75657 5.57524 7.57575L11.9446 1.20573C12.5289 0.621373 13.2481 0.0973869 14.1161 0.0120885ZM14.2345 1.21915C13.7852 1.26337 13.3166 1.54818 12.8018 2.06306L6.43248 8.43309C6.3708 8.49478 6.28415 8.61535 6.20594 8.77097C6.12769 8.9267 6.08317 9.06787 6.07096 9.15543L6.07017 9.15701L5.72285 11.5901L5.72206 11.5924C5.68136 11.8698 5.76329 12.043 5.85862 12.1379C5.95477 12.2337 6.1316 12.3162 6.41117 12.2785L8.84398 11.9311C8.92718 11.9192 9.06672 11.8746 9.22445 11.7953C9.37632 11.719 9.49891 11.6328 9.56861 11.5672L15.9372 5.19873C16.452 4.68382 16.7368 4.21529 16.781 3.76589C16.822 3.34824 16.6675 2.7935 15.9372 2.06306C15.2068 1.33267 14.6521 1.17815 14.2345 1.21915Z" fill="#566273" />
                                  <path d="M12.3826 1.51957C12.6613 1.44151 12.9501 1.60395 13.0282 1.88263C13.4469 3.37603 14.6163 4.54627 16.119 4.97203C16.3974 5.05099 16.5589 5.34053 16.48 5.61899C16.401 5.8974 16.1115 6.05889 15.833 5.98C13.9815 5.45533 12.5373 4.01198 12.0196 2.16516C11.9415 1.88648 12.1039 1.59769 12.3826 1.51957Z" fill="#566273" />
                                </svg>
                              </button>
                              <button
                                onClick={() => deleteFAQ(faq.id)}
                                className="flex h-6 w-6 items-center justify-center rounded-md cursor-pointer hover:bg-red-50"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                                  <path d="M14.3767 6.00131C14.7437 6.0236 15.0221 6.32115 14.9986 6.66641L14.4218 15.0817L14.4209 15.085C14.3972 15.4036 14.3721 15.7559 14.3021 16.083C14.2307 16.4166 14.1051 16.7688 13.8502 17.0811C13.3163 17.7352 12.4068 18 11.1006 18H5.3985C4.09253 18 3.1837 17.7351 2.64979 17.0811C2.39482 16.7688 2.26929 16.4166 2.19789 16.083C2.12786 15.7559 2.10191 15.4036 2.07819 15.085V15.0817L1.50138 6.66641C1.4779 6.32114 1.75628 6.0236 2.12329 6.00131C2.49027 5.97922 2.80651 6.24113 2.8302 6.58643L3.40787 14.9977L3.44604 15.4555C3.46072 15.5938 3.47919 15.7192 3.50415 15.8358C3.55261 16.062 3.61945 16.2108 3.70625 16.3173C3.85619 16.5009 4.22683 16.7465 5.3985 16.7465H11.1006C12.2725 16.7465 12.6429 16.5009 12.7929 16.3173C12.8798 16.2108 12.9473 16.0622 12.9958 15.8358C13.0457 15.6027 13.067 15.335 13.0921 14.9977L13.6689 6.58643C13.6926 6.24108 14.0097 5.97913 14.3767 6.00131Z" fill="#C53434" />
                                  <path d="M9.40549 0C10.2304 0 10.8682 0.137801 11.284 0.501985C11.6602 0.831656 11.7383 1.26674 11.7967 1.54003L11.9906 2.41228C12.0516 2.68635 11.809 2.94653 11.4486 2.99291C11.0883 3.0392 10.747 2.85406 10.686 2.58005L10.4912 1.7078V1.70518C10.4174 1.36091 10.3702 1.23704 10.2844 1.16191C10.2367 1.12019 10.0707 1.00659 9.40549 1.00659H7.09438C6.41838 1.00659 6.25731 1.11718 6.21457 1.15404C6.13337 1.22415 6.08806 1.34193 6.00862 1.70059L5.81388 2.57939C5.75336 2.85346 5.4125 3.03884 5.05213 2.99291C4.69168 2.94687 4.44872 2.68706 4.50925 2.41294L4.70313 1.53413V1.53348C4.76479 1.25504 4.84229 0.815632 5.22188 0.488223C5.64019 0.127478 6.27913 0 7.09438 0H9.40549Z" fill="#C53434" />
                                  <path d="M11.3077 9C11.69 9 12 9.33579 12 9.75C12 10.1642 11.69 10.5 11.3077 10.5H6.69231C6.30996 10.5 6 10.1642 6 9.75C6 9.33579 6.30996 9 6.69231 9H11.3077Z" fill="#C53434" />
                                  <path d="M9.80125 12C10.1871 12 10.5 12.3358 10.5 12.75C10.5 13.1642 10.1871 13.5 9.80125 13.5H6.69875C6.31284 13.5 6 13.1642 6 12.75C6 12.3358 6.31284 12 6.69875 12H9.80125Z" fill="#C53434" />
                                  <path d="M7.38727 3C10.2348 3.00001 13.0905 3.12868 15.9283 3.37797C16.277 3.40871 16.5314 3.68415 16.4969 3.99326C16.4622 4.30233 16.1514 4.52785 15.8027 4.49721C13.0054 4.25149 10.1918 4.12512 7.38727 4.12511C5.73325 4.12511 4.0786 4.19893 2.42426 4.34705L2.42261 4.34779L0.696377 4.49721C0.34758 4.52753 0.037315 4.3017 0.00307674 3.99253C-0.0311191 3.68334 0.223643 3.40832 0.572426 3.37797L2.297 3.22854V3.22781C3.99345 3.07591 5.6905 3 7.38727 3Z" fill="#C53434" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={() => setShowFAQModal(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-blue-600 bg-white px-4 py-4 text-sm cursor-pointer font-semibold text-blue-600 transition hover:bg-blue-50"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add New FAQ
                      </button>
                    </div>

                    {/* Add New FAQ Modal */}
                    {showFAQModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
                        <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-900">Add New FAQ</h2>
                            <button
                              onClick={() => setShowFAQModal(false)}
                              className="flex h-8 w-8 items-center justify-center cursor-pointer rounded-lg hover:bg-slate-100"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.1395 6.87411C12.412 6.60172 12.8536 6.60167 13.126 6.87411C13.3984 7.14655 13.3984 7.58822 13.126 7.86066L7.86078 13.1259C7.58834 13.3983 7.14667 13.3983 6.87423 13.1259C6.6018 12.8535 6.60184 12.4118 6.87423 12.1394L12.1395 6.87411Z" fill="#566273" />
                                <path d="M6.87427 6.87414C7.14672 6.60169 7.58836 6.60169 7.86082 6.87414L13.1261 12.1394C13.3984 12.4119 13.3985 12.8535 13.1261 13.126C12.8537 13.3984 12.412 13.3983 12.1395 13.126L6.87427 7.8607C6.60181 7.58824 6.60181 7.1466 6.87427 6.87414Z" fill="#566273" />
                                <path d="M18.6047 7.2093C18.6047 4.95253 18.1491 3.55424 17.2974 2.70258C16.4458 1.85092 15.0475 1.39535 12.7907 1.39535H7.2093C4.95253 1.39535 3.55424 1.85092 2.70258 2.70258C1.85092 3.55424 1.39535 4.95253 1.39535 7.2093V12.7907C1.39535 15.0475 1.85092 16.4458 2.70258 17.2974C3.55424 18.1491 4.95253 18.6047 7.2093 18.6047H12.7907C15.0475 18.6047 16.4458 18.1491 17.2974 17.2974C18.1491 16.4458 18.6047 15.0475 18.6047 12.7907V7.2093ZM20 12.7907C20 15.1851 19.5253 17.0426 18.284 18.284C17.0426 19.5253 15.1851 20 12.7907 20H7.2093C4.81491 20 2.95739 19.5253 1.71602 18.284C0.474658 17.0426 0 15.1851 0 12.7907V7.2093C0 4.81491 0.474658 2.95739 1.71602 1.71602C2.95739 0.474658 4.81491 0 7.2093 0H12.7907C15.1851 0 17.0426 0.474658 18.284 1.71602C19.5253 2.95739 20 4.81491 20 7.2093V12.7907Z" fill="#566273" />
                              </svg>
                            </button>
                          </div>

                          <div className="border-t border-slate-200 mb-6"></div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Question</label>
                              <input
                                type="text"
                                value={newFAQQuestion}
                                onChange={(e) => setNewFAQQuestion(e.target.value)}
                                placeholder="Are your products eco-friendly?"
                                className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Answer</label>
                              <textarea
                                value={newFAQAnswer}
                                onChange={(e) => setNewFAQAnswer(e.target.value)}
                                placeholder="Yes, we offer eco-friendly products made from sustainable materials. Check the product description for more details on eco-certifications."
                                rows={2}
                                className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200 resize-none"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-3 mt-6">
                            <button
                              onClick={() => setShowFAQModal(false)}
                              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium cursor-pointer text-slate-700 hover:bg-slate-50"
                            >
                              No, Cancel
                            </button>
                            <button
                              onClick={handleAddFAQFromModal}
                              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm cursor-pointer text-white hover:bg-blue-700"
                            >
                              Add FAQ
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Edit FAQ Modal */}
                    {showEditFAQModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
                        <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-900">Edit FAQ</h2>
                            <button
                              onClick={handleCancelEditFAQModal}
                              className="flex h-8 w-8 items-center justify-center cursor-pointer rounded-lg hover:bg-slate-100"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.1395 6.87411C12.412 6.60172 12.8536 6.60167 13.126 6.87411C13.3984 7.14655 13.3984 7.58822 13.126 7.86066L7.86078 13.1259C7.58834 13.3983 7.14667 13.3983 6.87423 13.1259C6.6018 12.8535 6.60184 12.4118 6.87423 12.1394L12.1395 6.87411Z" fill="#566273" />
                                <path d="M6.87427 6.87414C7.14672 6.60169 7.58836 6.60169 7.86082 6.87414L13.1261 12.1394C13.3984 12.4119 13.3985 12.8535 13.1261 13.126C12.8537 13.3984 12.412 13.3983 12.1395 13.126L6.87427 7.8607C6.60181 7.58824 6.60181 7.1466 6.87427 6.87414Z" fill="#566273" />
                                <path d="M18.6047 7.2093C18.6047 4.95253 18.1491 3.55424 17.2974 2.70258C16.4458 1.85092 15.0475 1.39535 12.7907 1.39535H7.2093C4.95253 1.39535 3.55424 1.85092 2.70258 2.70258C1.85092 3.55424 1.39535 4.95253 1.39535 7.2093V12.7907C1.39535 15.0475 1.85092 16.4458 2.70258 17.2974C3.55424 18.1491 4.95253 18.6047 7.2093 18.6047H12.7907C15.0475 18.6047 16.4458 18.1491 17.2974 17.2974C18.1491 16.4458 18.6047 15.0475 18.6047 12.7907V7.2093ZM20 12.7907C20 15.1851 19.5253 17.0426 18.284 18.284C17.0426 19.5253 15.1851 20 12.7907 20H7.2093C4.81491 20 2.95739 19.5253 1.71602 18.284C0.474658 17.0426 0 15.1851 0 12.7907V7.2093C0 4.81491 0.474658 2.95739 1.71602 1.71602C2.95739 0.474658 4.81491 0 7.2093 0H12.7907C15.1851 0 17.0426 0.474658 18.284 1.71602C19.5253 2.95739 20 4.81491 20 7.2093V12.7907Z" fill="#566273" />
                              </svg>
                            </button>
                          </div>

                          <div className="border-t border-slate-200 mb-6"></div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Question</label>
                              <input
                                type="text"
                                value={editFAQQuestion}
                                onChange={(e) => setEditFAQQuestion(e.target.value)}
                                placeholder="Are your products eco-friendly?"
                                className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Answer</label>
                              <textarea
                                value={editFAQAnswer}
                                onChange={(e) => setEditFAQAnswer(e.target.value)}
                                placeholder="Yes, we offer eco-friendly products made from sustainable materials. Check the product description for more details on eco-certifications."
                                rows={2}
                                className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200 resize-none"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-3 mt-6">
                            <button
                              onClick={handleCancelEditFAQModal}
                              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium cursor-pointer text-slate-700 hover:bg-slate-50"
                            >
                              No, Cancel
                            </button>
                            <button
                              onClick={handleSaveFAQFromModal}
                              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm cursor-pointer text-white hover:bg-blue-700"
                            >
                              Save FAQ
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'Resources' && (
                  <div className="mt-6">
                    <div className="space-y-4 flex flex-col justify-center rounded-xl shadow bg-white p-3">
                      {resources.map((resource) => (
                        <div key={resource.id} className="rounded-xl border border-slate-200 bg-white p-6">
                          <div className="flex items-start gap-4">
                            <div className="shrink-0 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <g clipPath="url(#clip0_296_1299)">
                                  <path d="M11.5006 2.30398L9.34414 0.147534C9.24639 0.04978 9.116 -0.000267834 8.98122 2.4844e-05C8.84396 -0.00129221 8.71064 0.04978 8.61289 0.147534L6.50093 2.2595C6.30308 2.45735 6.30308 2.779 6.50093 2.9767L6.77326 3.24904C6.96424 3.44001 7.29759 3.44001 7.48871 3.24904L8.29724 2.43876V5.41632C8.29724 5.42539 8.3025 5.43285 8.30411 5.44134C8.32606 5.7008 8.54367 5.90611 8.80898 5.90611H9.19385C9.47351 5.90611 9.7034 5.67899 9.7034 5.39934V5.06686C9.7034 5.0654 9.7034 5.06437 9.7034 5.0632V2.48296L10.5122 3.29338C10.7101 3.49123 11.031 3.49123 11.2287 3.29338L11.5006 3.02134C11.6984 2.82334 11.6984 2.50154 11.5006 2.30398Z" fill="#566273" />
                                  <path d="M11.4995 14.9791L11.2273 14.7063C11.0363 14.5151 10.7028 14.5151 10.5116 14.7063L9.70276 15.5168V12.9479C9.70276 12.9465 9.70276 12.9456 9.70276 12.9443V12.6118C9.70276 12.332 9.47271 12.0938 9.19335 12.0938H8.80819C8.54317 12.0938 8.32556 12.3043 8.30347 12.5641C8.30186 12.5727 8.29659 12.5859 8.29659 12.5948V15.5612L7.48807 14.751C7.29695 14.5599 6.96286 14.5599 6.77174 14.751L6.49955 15.0233C6.30199 15.221 6.30228 15.5428 6.50013 15.7407L8.61224 17.8525C8.70751 17.948 8.83468 18 8.96594 18H8.98497C9.12091 18 9.24779 17.9482 9.3432 17.8525L11.4995 15.6962C11.6974 15.4985 11.6974 15.1768 11.4995 14.9791Z" fill="#566273" />
                                  <path d="M5.38665 8.29665H5.34333H5.05256C5.05154 8.29665 5.05051 8.29665 5.04934 8.29665H2.4928L3.30323 7.49062C3.39878 7.39521 3.45132 7.26994 3.45132 7.13429C3.45132 6.99848 3.39878 6.87219 3.30323 6.77693L3.03089 6.50517C2.83304 6.30732 2.51124 6.30762 2.31368 6.50547L0.157234 8.66177C0.0594797 8.75938 0.00723678 8.89035 0.00987088 9.02469C0.00709044 9.16444 0.0594797 9.29527 0.157234 9.39302L2.2692 11.5051C2.36812 11.6041 2.49792 11.6535 2.62787 11.6535C2.75782 11.6535 2.88762 11.6041 2.98655 11.5051L3.25874 11.2329C3.3543 11.1375 3.40698 11.0101 3.40698 10.8744C3.40698 10.7386 3.35444 10.6098 3.25874 10.5146L2.44861 9.70297H5.40202C5.41094 9.70297 5.42558 9.70077 5.43406 9.69917C5.69367 9.67721 5.90571 9.46254 5.90571 9.19737V8.81191C5.90571 8.53255 5.6663 8.29665 5.38665 8.29665Z" fill="#566273" />
                                  <path d="M17.8421 8.66197L15.6856 6.50581C15.4879 6.30796 15.1661 6.30796 14.9684 6.50581L14.6964 6.77815C14.6008 6.87341 14.5481 7.00087 14.5481 7.13653C14.5481 7.27233 14.6007 7.39526 14.6964 7.49067L15.5067 8.2967H12.9337C12.9324 8.2967 12.9314 8.2967 12.9302 8.2967H12.5979C12.3182 8.2967 12.0938 8.53246 12.0938 8.81196V9.19742C12.0938 9.46258 12.2973 9.67697 12.5571 9.69907C12.5657 9.70082 12.572 9.70302 12.5808 9.70302H15.551L14.7404 10.5145C14.645 10.6097 14.5923 10.7382 14.5923 10.8736C14.5923 11.0095 14.6449 11.1373 14.7404 11.2327L15.0129 11.505C15.1117 11.604 15.2415 11.6536 15.3714 11.6536C15.5014 11.6536 15.6311 11.6041 15.73 11.5052L17.8422 9.39307C17.9397 9.29561 17.9919 9.16464 17.9896 9.03015C17.9918 8.8904 17.9395 8.75943 17.8421 8.66197Z" fill="#566273" />
                                  <path d="M9.00065 7.59277C8.22491 7.59277 7.59375 8.22393 7.59375 8.99982C7.59375 9.77556 8.22491 10.4069 9.00065 10.4069C9.77639 10.4069 10.4077 9.77556 10.4077 8.99982C10.4077 8.22393 9.77639 7.59277 9.00065 7.59277Z" fill="#566273" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_296_1299">
                                    <rect width="18" height="18" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="bg-[#FAFAFA] border border-[#ECEDF0] rounded px-3 py-2">
                                {resource.title || 'Company Brochure'}
                              </div>
                              {resource.fileName && (
                                <div className="flex bg-[#FAFAFA] border border-[#ECEDF0] rounded px-3 py-2 items-center gap-2 text-sm text-slate-600">
                                  {resource.fileName.endsWith('.pdf') ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24" fill="none">
                                      <path d="M18.8445 7.44448V21.1301C18.8445 22.4044 17.8114 23.4375 16.5371 23.4375H2.30742C1.03306 23.4375 1.73085e-09 22.4044 1.73085e-09 21.1301V2.30742C-4.88264e-05 1.03306 1.03301 0 2.30742 0H11.8381L18.8445 7.44448Z" fill="#E5252A" />
                                      <path d="M18.8443 7.44448H13.3762C12.5266 7.44448 11.8379 6.75576 11.8379 5.9062V0L18.8443 7.44448Z" fill="#ED676A" />
                                      <path d="M4.91768 16.4593V18.0187H3.81055V13.4248H5.64326C5.99478 13.4248 6.30576 13.4894 6.57617 13.6186C6.84658 13.7478 7.05537 13.9326 7.2041 14.1714C7.35132 14.4103 7.42642 14.6807 7.42642 14.9841C7.42642 15.4318 7.26567 15.7894 6.94419 16.0583C6.62422 16.3256 6.18403 16.4593 5.62373 16.4593H4.91768ZM4.91768 15.6045H5.64326C5.85811 15.6045 6.02183 15.552 6.13447 15.4438C6.24712 15.3372 6.30273 15.1854 6.30273 14.9901C6.30273 14.7753 6.24414 14.6041 6.12847 14.4749C6.01279 14.3472 5.85508 14.2826 5.65527 14.2795H4.91768V15.6045Z" fill="white" />
                                      <path d="M8.01562 18.0187V13.4248H9.49531C9.90093 13.4248 10.266 13.5165 10.5904 13.7012C10.9134 13.8845 11.1673 14.1444 11.3491 14.4809C11.5309 14.8159 11.6225 15.1915 11.624 15.6076V15.8194C11.624 16.24 11.5354 16.6171 11.3581 16.9506C11.1808 17.2841 10.9299 17.544 10.6069 17.7333C10.2839 17.921 9.92339 18.0157 9.52681 18.0187H8.01562V18.0187ZM9.1228 14.2796V17.1669H9.50737C9.82583 17.1669 10.0692 17.0542 10.239 16.8274C10.4102 16.6021 10.4959 16.2656 10.4959 15.8194V15.6211C10.4959 15.1764 10.4102 14.8429 10.239 14.6176C10.0692 14.3922 9.82134 14.2796 9.49536 14.2796H9.1228Z" fill="white" />
                                      <path d="M15.0867 16.1889H13.3005V18.0187H12.1934V13.4248H15.2654V14.2796H13.3005V15.3372H15.0867V16.1889Z" fill="white" />
                                    </svg>
                                  ) : resource.fileName.endsWith('.docx') || resource.fileName.endsWith('.doc') ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24" fill="none">
                                      <path d="M3.12212 0H11.1523L17.9499 7.09195V20.8779C17.9499 22.6023 16.5522 24 14.8277 24H3.12212C1.39766 24 0 22.6023 0 20.8779V3.12212C0 1.39769 1.39766 0 3.12212 0Z" fill="#0263D1" />
                                      <path opacity="0.302" fillRule="evenodd" clipRule="evenodd" d="M11.1426 0V7.0337H17.9498L11.1426 0Z" fill="white" />
                                      <path d="M2.89844 17.1248V13.1517H4.30583C4.5873 13.1517 4.84939 13.1938 5.09204 13.2715C5.33469 13.3523 5.55469 13.4688 5.75207 13.6241C5.94942 13.7794 6.10474 13.9865 6.21797 14.2453C6.3312 14.5041 6.38945 14.8018 6.38945 15.1383C6.38945 15.4747 6.3312 15.7724 6.21797 16.0312C6.10474 16.29 5.94942 16.4971 5.75207 16.6524C5.55472 16.8077 5.33469 16.9242 5.09204 17.0051C4.84939 17.0827 4.58733 17.1248 4.30583 17.1248H2.89844ZM3.8917 16.261H4.18611C4.34465 16.261 4.49348 16.2415 4.62611 16.2059C4.76199 16.1671 4.88493 16.1057 5.0014 16.0248C5.11788 15.9439 5.20845 15.8274 5.27317 15.6753C5.34112 15.5265 5.37345 15.3453 5.37345 15.1383C5.37345 14.9312 5.34109 14.75 5.27317 14.598C5.20845 14.4491 5.11788 14.3327 5.0014 14.2518C4.88493 14.1677 4.76199 14.1094 4.62611 14.0706C4.49348 14.035 4.34465 14.0156 4.18611 14.0156H3.8917V16.261ZM8.79978 17.1701C8.20124 17.1701 7.70624 16.976 7.31475 16.591C6.92327 16.2059 6.72914 15.7206 6.72914 15.1383C6.72914 14.5559 6.92327 14.0706 7.31475 13.6856C7.70624 13.3006 8.20124 13.1065 8.79978 13.1065C9.38861 13.1065 9.87716 13.3006 10.2686 13.6856C10.6569 14.0707 10.851 14.556 10.851 15.1383C10.851 15.7206 10.6569 16.206 10.2686 16.591C9.87716 16.976 9.38861 17.1701 8.79978 17.1701ZM8.03622 15.9762C8.23357 16.1962 8.48593 16.3063 8.79329 16.3063C9.10065 16.3063 9.34976 16.1962 9.54714 15.9762C9.74449 15.753 9.84156 15.4747 9.84156 15.1383C9.84156 14.8018 9.74449 14.5235 9.54714 14.3003C9.34979 14.0803 9.10065 13.9703 8.79329 13.9703C8.48593 13.9703 8.23357 14.0803 8.03622 14.3003C7.83887 14.5235 7.73856 14.8018 7.73856 15.1383C7.73856 15.4747 7.83887 15.753 8.03622 15.9762ZM13.2128 17.1701C12.6337 17.1701 12.1516 16.9889 11.7699 16.633C11.3848 16.2739 11.194 15.7756 11.194 15.1383C11.194 14.5041 11.3881 14.0059 11.7763 13.6468C12.1678 13.2876 12.6434 13.1064 13.2129 13.1064C13.7273 13.1064 14.1479 13.2326 14.4811 13.4882C14.8111 13.7406 15.002 14.0771 15.0505 14.4976L14.0476 14.7015C14.0055 14.4815 13.9052 14.3035 13.7499 14.1709C13.5946 14.0382 13.4134 13.9703 13.2064 13.9703C12.9216 13.9703 12.6855 14.0706 12.4946 14.2744C12.3037 14.4815 12.2066 14.7662 12.2066 15.1382C12.2066 15.5103 12.3037 15.795 12.4913 15.9989C12.6822 16.2059 12.9184 16.3062 13.2063 16.3062C13.4134 16.3062 13.5914 16.248 13.7369 16.1315C13.8825 16.0151 13.9731 15.8598 14.0119 15.6656L15.0376 15.8986C14.9437 16.2998 14.7367 16.6104 14.4131 16.8336C14.0928 17.0569 13.6917 17.1701 13.2128 17.1701Z" fill="white" />
                                    </svg>
                                  ) : null}
                                  <span>{resource.fileName}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenEditResourceModal(resource)}
                                className="flex h-6 w-6 items-center justify-center rounded-md cursor-pointer hover:bg-green-50"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                  <path d="M0 11.5116V6.48837C0 4.33342 0.427193 2.66165 1.54442 1.54442C2.66165 0.427193 4.33342 0 6.48837 0H8.16279C8.50957 0 8.7907 0.281124 8.7907 0.627907C8.7907 0.97469 8.50957 1.25581 8.16279 1.25581H6.48837C4.45728 1.25581 3.19881 1.66583 2.43232 2.43232C1.66583 3.19881 1.25581 4.45728 1.25581 6.48837V11.5116C1.25581 13.5427 1.66583 14.8012 2.43232 15.5677C3.19881 16.3342 4.45728 16.7442 6.48837 16.7442H11.5116C13.5427 16.7442 14.8012 16.3342 15.5677 15.5677C16.3342 14.8012 16.7442 13.5427 16.7442 11.5116V9.83721C16.7442 9.49043 17.0253 9.2093 17.3721 9.2093C17.7189 9.2093 18 9.49043 18 9.83721V11.5116C18 13.6666 17.5728 15.3383 16.4556 16.4556C15.3383 17.5728 13.6666 18 11.5116 18H6.48837C4.33342 18 2.66165 17.5728 1.54442 16.4556C0.427193 15.3383 0 13.6666 0 11.5116Z" fill="#566273" />
                                  <path d="M14.1161 0.0120885C15.016 -0.0762555 15.9082 0.31942 16.7944 1.20573C17.6806 2.09207 18.0762 2.98429 17.9879 3.88431C17.9027 4.75246 17.3787 5.4717 16.7944 6.05607L10.418 12.4332C10.236 12.6093 9.99861 12.7639 9.7691 12.8792C9.54088 12.994 9.27155 13.0952 9.01527 13.1319L6.58246 13.4792H6.57931C5.97948 13.5618 5.4056 13.3979 5.00296 12.9969C4.59978 12.5951 4.43511 12.0217 4.52303 11.4188L4.87034 8.98728C4.90666 8.72746 5.00655 8.45631 5.12215 8.22625C5.23793 7.99587 5.39444 7.75657 5.57524 7.57575L11.9446 1.20573C12.5289 0.621373 13.2481 0.0973869 14.1161 0.0120885ZM14.2345 1.21915C13.7852 1.26337 13.3166 1.54818 12.8018 2.06306L6.43248 8.43309C6.3708 8.49478 6.28415 8.61535 6.20594 8.77097C6.12769 8.9267 6.08317 9.06787 6.07096 9.15543L6.07017 9.15701L5.72285 11.5901L5.72206 11.5924C5.68136 11.8698 5.76329 12.043 5.85862 12.1379C5.95477 12.2337 6.1316 12.3162 6.41117 12.2785L8.84398 11.9311C8.92718 11.9192 9.06672 11.8746 9.22445 11.7953C9.37632 11.719 9.49891 11.6328 9.56861 11.5672L15.9372 5.19873C16.452 4.68382 16.7368 4.21529 16.781 3.76589C16.822 3.34824 16.6675 2.7935 15.9372 2.06306C15.2068 1.33267 14.6521 1.17815 14.2345 1.21915Z" fill="#566273" />
                                  <path d="M12.3826 1.51957C12.6613 1.44151 12.9501 1.60395 13.0282 1.88263C13.4469 3.37603 14.6163 4.54627 16.119 4.97203C16.3974 5.05099 16.5589 5.34053 16.48 5.61899C16.401 5.8974 16.1115 6.05889 15.833 5.98C13.9815 5.45533 12.5373 4.01198 12.0196 2.16516C11.9415 1.88648 12.1039 1.59769 12.3826 1.51957Z" fill="#566273" />
                                </svg>
                              </button>
                              <button
                                onClick={() => deleteResource(resource.id)}
                                className="flex h-6 w-6 items-center cursor-pointer justify-center rounded-md hover:bg-red-50"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                                  <path d="M14.3767 6.00131C14.7437 6.0236 15.0221 6.32115 14.9986 6.66641L14.4218 15.0817L14.4209 15.085C14.3972 15.4036 14.3721 15.7559 14.3021 16.083C14.2307 16.4166 14.1051 16.7688 13.8502 17.0811C13.3163 17.7352 12.4068 18 11.1006 18H5.3985C4.09253 18 3.1837 17.7351 2.64979 17.0811C2.39482 16.7688 2.26929 16.4166 2.19789 16.083C2.12786 15.7559 2.10191 15.4036 2.07819 15.085V15.0817L1.50138 6.66641C1.4779 6.32114 1.75628 6.0236 2.12329 6.00131C2.49027 5.97922 2.80651 6.24113 2.8302 6.58643L3.40787 14.9977L3.44604 15.4555C3.46072 15.5938 3.47919 15.7192 3.50415 15.8358C3.55261 16.062 3.61945 16.2108 3.70625 16.3173C3.85619 16.5009 4.22683 16.7465 5.3985 16.7465H11.1006C12.2725 16.7465 12.6429 16.5009 12.7929 16.3173C12.8798 16.2108 12.9473 16.0622 12.9958 15.8358C13.0457 15.6027 13.067 15.335 13.0921 14.9977L13.6689 6.58643C13.6926 6.24108 14.0097 5.97913 14.3767 6.00131Z" fill="#C53434" />
                                  <path d="M9.40549 0C10.2304 0 10.8682 0.137801 11.284 0.501985C11.6602 0.831656 11.7383 1.26674 11.7967 1.54003L11.9906 2.41228C12.0516 2.68635 11.809 2.94653 11.4486 2.99291C11.0883 3.0392 10.747 2.85406 10.686 2.58005L10.4912 1.7078V1.70518C10.4174 1.36091 10.3702 1.23704 10.2844 1.16191C10.2367 1.12019 10.0707 1.00659 9.40549 1.00659H7.09438C6.41838 1.00659 6.25731 1.11718 6.21457 1.15404C6.13337 1.22415 6.08806 1.34193 6.00862 1.70059L5.81388 2.57939C5.75336 2.85346 5.4125 3.03884 5.05213 2.99291C4.69168 2.94687 4.44872 2.68706 4.50925 2.41294L4.70313 1.53413V1.53348C4.76479 1.25504 4.84229 0.815632 5.22188 0.488223C5.64019 0.127478 6.27913 0 7.09438 0H9.40549Z" fill="#C53434" />
                                  <path d="M11.3077 9C11.69 9 12 9.33579 12 9.75C12 10.1642 11.69 10.5 11.3077 10.5H6.69231C6.30996 10.5 6 10.1642 6 9.75C6 9.33579 6.30996 9 6.69231 9H11.3077Z" fill="#C53434" />
                                  <path d="M9.80125 12C10.1871 12 10.5 12.3358 10.5 12.75C10.5 13.1642 10.1871 13.5 9.80125 13.5H6.69875C6.31284 13.5 6 13.1642 6 12.75C6 12.3358 6.31284 12 6.69875 12H9.80125Z" fill="#C53434" />
                                  <path d="M7.38727 3C10.2348 3.00001 13.0905 3.12868 15.9283 3.37797C16.277 3.40871 16.5314 3.68415 16.4969 3.99326C16.4622 4.30233 16.1514 4.52785 15.8027 4.49721C13.0054 4.25149 10.1918 4.12512 7.38727 4.12511C5.73325 4.12511 4.0786 4.19893 2.42426 4.34705L2.42261 4.34779L0.696377 4.49721C0.34758 4.52753 0.037315 4.3017 0.00307674 3.99253C-0.0311191 3.68334 0.223643 3.40832 0.572426 3.37797L2.297 3.22854V3.22781C3.99345 3.07591 5.6905 3 7.38727 3Z" fill="#C53434" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={addResource}
                        className="flex w-full items-center justify-center cursor-pointer gap-2 rounded-xl border-2 border-dashed border-blue-600 bg-white px-4 py-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Resources
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {activeSidebarSection === 'Accreditation' && (
            <div className="">
              <h1 className="text-xl font-medium">Accreditation</h1>
              <p className="text-sm text-slate-500 mt-5">Write a short description here to highlight your certifications or achievements. This content will appear at the top of your page as a hero banner description.</p>

              <div className="mt-6 overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
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
                  contentEditable
                  suppressContentEditableWarning
                  className="min-h-55 px-4 py-4 text-sm text-slate-700 outline-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1"
                  dangerouslySetInnerHTML={{ __html: accreditationEditorContent }}
                  onInput={(e) => setAccreditationEditorContent(e.currentTarget.innerHTML)}
                />
              </div>

              <h2 className="mt-10 text-lg font-semibold">Create Accreditation Cards</h2>
              <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                {accreditationCards[1] && (
                  <CardForm
                    key={accreditationCards[1].id}
                    titleLabel="Accreditation title"
                    descLabel="Accreditation description"
                    card={accreditationCards[1]}
                    onTitleChange={(value) =>
                      updateAccreditationCard(accreditationCards[1].id, { title: value })
                    }
                    onDescriptionChange={(value) =>
                      updateAccreditationCard(accreditationCards[1].id, { description: value })
                    }
                    onImageChange={(event) =>
                      handleAccreditationCardImageChange(accreditationCards[1].id, event)
                    }
                  />
                )}
                <AddCard onAdd={addAccreditationCard} text="Add another Accreditation!" />
              </div>
            </div>
          )}

          {activeSidebarSection === 'Testimonials' && (
            <div className="">
              <h1 className="text-xl font-medium">Testimonials</h1>
              <h2 className="mt-5 text-xl font-medium">Add New Testimonial</h2>

              <div className="mt-5 grid gap-6 lg:grid-cols-[2fr_1fr]">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="rounded-xl shadow shadow-gray-200 bg-white p-3">
                    <div className="grid gap-6 ">
                      <div className="space-y-4">
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 px-4 py-6 text-center text-xs text-slate-500">
                          {testimonial.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={testimonial.imageUrl}
                              alt="Customer"
                              className="h-20 w-20 rounded-lg object-cover"
                            />
                          ) : (
                            <UploadCloudIcon className="h-7 w-7 text-blue-500" />
                          )}
                          <div>
                            <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {testimonial.imageName || 'JPG, JPEG, PNG less than 5MB'}
                          </div>
                          <input
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleTestimonialImageChange(testimonial.id, event)}
                          />
                        </label>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-600">Customer Name</label>
                          <input
                            value={testimonial.customerName}
                            onChange={(event) => updateTestimonial(testimonial.id, { customerName: event.target.value })}
                            placeholder="John Doe"
                            className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-600">Title</label>
                          <input
                            value={testimonial.title}
                            onChange={(event) => updateTestimonial(testimonial.id, { title: event.target.value })}
                            placeholder="Freelancer"
                            className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-600">Testimonials</label>
                          <textarea
                            value={testimonial.testimonial}
                            onChange={(event) => updateTestimonial(testimonial.id, { testimonial: event.target.value })}
                            placeholder="This website builder made setting up my portfolio so easy and professional. Highly recommend!"
                            className="min-h-32 w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-600">Rating</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={testimonial.rating}
                            onChange={(event) => updateTestimonial(testimonial.id, { rating: event.target.value })}
                            placeholder="4.5"
                            className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addTestimonial}
                  className="flex flex-col w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#0F67FD] bg-white p-6 text-center transition hover:border-blue-500 hover:bg-blue-50/40"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl text-blue-600">
                    <AddFileIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm max-w-42.5 text-slate-400">Want to showcase more? Add another Testimonial!</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeSidebarSection === 'Forms' && (
            <div>

              <h1 className="text-xl font-medium">Forms</h1>
              <div className="mt-7 rounded-xl shadow shadow-gray-200 bg-white p-3">

                <div className=" space-y-6">
                  {/* Default Fields */}
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-600">Name</label>
                      <input
                        readOnly
                        value="John Doe"
                        placeholder="John Doe"
                        className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-600">Email</label>
                      <input
                        readOnly
                        value="johndoe@gmail.com"
                        placeholder="johndoe@gmail.com"
                        className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-600">Message</label>
                      <textarea
                        readOnly
                        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        placeholder="Your message..."
                        className="min-h-32 w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                      />
                    </div>
                  </div>

                  {/* Custom Fields */}
                  {customFields.map((field) => (
                    <div key={field.id} className="rounded-xl border border-slate-200 bg-white p-6">
                      <div className="flex items-center justify-between mb-4">
                        <input
                          value={field.label}
                          onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                          placeholder="Select Your Preferences"
                          className="text-sm font-semibold text-slate-700 bg-transparent border-none outline-none flex-1"
                        />
                        <div className="flex items-center gap-2">
                          <button className="flex h-6 w-6 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" strokeWidth="2" />
                              <path strokeWidth="2" d="M12 16v-4m0-4h.01" />
                            </svg>
                          </button>
                          <button className="flex h-6 w-6 items-center justify-center rounded-md text-green-600 hover:bg-green-50">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteCustomField(field.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-md text-red-600 hover:bg-red-50"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {(field.type === 'checkboxes' || field.type === 'radio') && (
                        <div className="space-y-3">
                          {field.options.map((option, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <input
                                type={field.type === 'checkboxes' ? 'checkbox' : 'radio'}
                                className="h-4 w-4 text-blue-600"
                                disabled
                              />
                              <input
                                value={option}
                                onChange={(e) => updateFieldOption(field.id, index, e.target.value)}
                                className="flex-1 text-sm text-slate-600 bg-transparent border-none outline-none"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {field.type === 'number' && (
                        <input
                          type="number"
                          placeholder="Enter number"
                          className="w-full rounded-xl border border-slate-200 bg-[#FAFAFA] px-3 py-3 text-sm text-slate-600"
                          disabled
                        />
                      )}

                      {field.type === 'address' && (
                        <textarea
                          placeholder="Enter address"
                          className="min-h-24 w-full rounded-xl border border-slate-200 bg-[#FAFAFA] px-3 py-3 text-sm text-slate-600"
                          disabled
                        />
                      )}
                    </div>
                  ))}

                  {/* Add Custom Field Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShowFieldMenu(!showFieldMenu)}
                      className="flex mb-16 items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer border-blue-600 bg-white px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Add Custom Field
                    </button>

                    {showFieldMenu && (
                      <div className="absolute left-0 top-full z-10 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                        <button
                          onClick={() => addCustomField('checkboxes')}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          Checkboxes
                        </button>
                        <button
                          onClick={() => addCustomField('radio')}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                            <circle cx="12" cy="12" r="3" fill="currentColor" />
                          </svg>
                          Radio buttons
                        </button>
                        <button
                          onClick={() => addCustomField('number')}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                          Number Field
                        </button>
                        <button
                          onClick={() => addCustomField('address')}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Address Field
                        </button>
                        <div className="my-1 border-t border-slate-200"></div>
                        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
                          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          More
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Notifications Toggle */}
                </div>
              </div>
              <div className="flex mt-7 items-center gap-3">
                <button
                  onClick={() => setFormNotifications(!formNotifications)}
                  className={`relative inline-flex h-8 w-13 items-center rounded-full transition-colors ${formNotifications ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${formNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
                <span className="text-sm text-slate-600">Receive notifications for new submissions</span>
              </div>
            </div>
          )}

          {activeSidebarSection === 'Contact' && (
            <div>
              <h1 className="text-xl font-medium">Contact</h1>
              <p className="mt-2 text-sm text-slate-500">
                Get in touch with us for any inquiries or support requests.
              </p>
              <div className="mt-6 rounded-xl shadow bg-white p-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Name</label>
                    <input
                      placeholder="John Doe"
                      className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Email</label>
                    <input
                      placeholder="johndoe@gmail.com"
                      className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">
                      Phone Number
                    </label>
                    <input
                      placeholder="+1 234 567 890"
                      className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Location</label>
                    <input
                      placeholder="123 Main Street, Cityville"
                      className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">
                      Calendly Link
                    </label>
                    <input
                      placeholder="https://calendly.com/"
                      className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-auto flex justify-end pt-12">
            <div className="flex items-center gap-4">
              {saveStatus && (
                <span className="text-xs font-semibold text-green-600">
                  {saveStatus}
                </span>
              )}
              <button
                onClick={handleSave}
                className="cursor-pointer rounded-2xl bg-black px-10 py-4 text-lg text-white shadow transition hover:bg-slate-800 active:scale-[0.98]"
              >
                Save Content
              </button>
            </div>
          </div>
        </main>
      </div>
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">
              Are you sure you want to delete this page?
            </h3>
            <div className="mt-3 h-px w-full bg-slate-200" />
            <p className="mt-2 text-sm text-slate-500">
              Once deleted, this page cannot be recovered. Please make sure you want
              to permanently remove this page from your site.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleConfirmDelete}
                className="rounded-md bg-[#C53434] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="rounded-md bg-[#ECEDF0] px-5 py-2.5 text-sm font-semibold text-slate-600"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showResourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Add New Resource</h3>
              <button
                onClick={handleCancelResourceModal}
                className="flex h-8 w-8 items-center justify-center rounded cursor-pointer  text-slate-500 hover:bg-slate-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.1395 6.87411C12.412 6.60172 12.8536 6.60167 13.126 6.87411C13.3984 7.14655 13.3984 7.58822 13.126 7.86066L7.86078 13.1259C7.58834 13.3983 7.14667 13.3983 6.87423 13.1259C6.6018 12.8535 6.60184 12.4118 6.87423 12.1394L12.1395 6.87411Z" fill="#566273" />
                  <path d="M6.87427 6.87414C7.14672 6.60169 7.58836 6.60169 7.86082 6.87414L13.1261 12.1394C13.3984 12.4119 13.3985 12.8535 13.1261 13.126C12.8537 13.3984 12.412 13.3983 12.1395 13.126L6.87427 7.8607C6.60181 7.58824 6.60181 7.1466 6.87427 6.87414Z" fill="#566273" />
                  <path d="M18.6047 7.2093C18.6047 4.95253 18.1491 3.55424 17.2974 2.70258C16.4458 1.85092 15.0475 1.39535 12.7907 1.39535H7.2093C4.95253 1.39535 3.55424 1.85092 2.70258 2.70258C1.85092 3.55424 1.39535 4.95253 1.39535 7.2093V12.7907C1.39535 15.0475 1.85092 16.4458 2.70258 17.2974C3.55424 18.1491 4.95253 18.6047 7.2093 18.6047H12.7907C15.0475 18.6047 16.4458 18.1491 17.2974 17.2974C18.1491 16.4458 18.6047 15.0475 18.6047 12.7907V7.2093ZM20 12.7907C20 15.1851 19.5253 17.0426 18.284 18.284C17.0426 19.5253 15.1851 20 12.7907 20H7.2093C4.81491 20 2.95739 19.5253 1.71602 18.284C0.474658 17.0426 0 15.1851 0 12.7907V7.2093C0 4.81491 0.474658 2.95739 1.71602 1.71602C2.95739 0.474658 4.81491 0 7.2093 0H12.7907C15.1851 0 17.0426 0.474658 18.284 1.71602C19.5253 2.95739 20 4.81491 20 7.2093V12.7907Z" fill="#566273" />
                </svg>
              </button>
            </div>
            <div className="mt-4 h-px w-full bg-slate-200" />
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Title</label>
                <input
                  value={newResourceTitle}
                  onChange={(event) => setNewResourceTitle(event.target.value)}
                  placeholder="Enter resources title"
                  className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-blue-200 bg-white px-6 py-10 text-center">
                <UploadCloudIcon className="h-10 w-10 text-blue-600" />
                <div className="mt-3 text-sm">
                  <span className="font-semibold text-blue-600">Click to upload</span> or
                  drag and drop
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  Accepted: PDF, DOCX, XLS, etc.
                </div>
                <div className="text-sm text-slate-500">Maximum file size: 5MB</div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleResourceFileSelect}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                />
              </label>
              {newResourceFile && (
                <div className="text-sm text-slate-500">
                  Selected file: <span className="font-semibold">{newResourceFile.name}</span>
                </div>
              )}
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={handleCancelResourceModal}
                className="rounded-lg bg-[#ECEDF0] px-5 py-2.5 text-sm font-semibold text-slate-700"
              >
                No, Cancel
              </button>
              <button
                onClick={handleAddResourceFromModal}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditResourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Edit Resource</h3>
              <button
                onClick={handleCancelEditResourceModal}
                className="flex h-8 w-8 items-center justify-center rounded cursor-pointer text-slate-500 hover:bg-slate-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.1395 6.87411C12.412 6.60172 12.8536 6.60167 13.126 6.87411C13.3984 7.14655 13.3984 7.58822 13.126 7.86066L7.86078 13.1259C7.58834 13.3983 7.14667 13.3983 6.87423 13.1259C6.6018 12.8535 6.60184 12.4118 6.87423 12.1394L12.1395 6.87411Z" fill="#566273" />
                  <path d="M6.87427 6.87414C7.14672 6.60169 7.58836 6.60169 7.86082 6.87414L13.1261 12.1394C13.3984 12.4119 13.3985 12.8535 13.1261 13.126C12.8537 13.3984 12.412 13.3983 12.1395 13.126L6.87427 7.8607C6.60181 7.58824 6.60181 7.1466 6.87427 6.87414Z" fill="#566273" />
                  <path d="M18.6047 7.2093C18.6047 4.95253 18.1491 3.55424 17.2974 2.70258C16.4458 1.85092 15.0475 1.39535 12.7907 1.39535H7.2093C4.95253 1.39535 3.55424 1.85092 2.70258 2.70258C1.85092 3.55424 1.39535 4.95253 1.39535 7.2093V12.7907C1.39535 15.0475 1.85092 16.4458 2.70258 17.2974C3.55424 18.1491 4.95253 18.6047 7.2093 18.6047H12.7907C15.0475 18.6047 16.4458 18.1491 17.2974 17.2974C18.1491 16.4458 18.6047 15.0475 18.6047 12.7907V7.2093ZM20 12.7907C20 15.1851 19.5253 17.0426 18.284 18.284C17.0426 19.5253 15.1851 20 12.7907 20H7.2093C4.81491 20 2.95739 19.5253 1.71602 18.284C0.474658 17.0426 0 15.1851 0 12.7907V7.2093C0 4.81491 0.474658 2.95739 1.71602 1.71602C2.95739 0.474658 4.81491 0 7.2093 0H12.7907C15.1851 0 17.0426 0.474658 18.284 1.71602C19.5253 2.95739 20 4.81491 20 7.2093V12.7907Z" fill="#566273" />
                </svg>
              </button>
            </div>
            <div className="mt-4 h-px w-full bg-slate-200" />
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Title</label>
                <input
                  value={editResourceTitle}
                  onChange={(event) => setEditResourceTitle(event.target.value)}
                  placeholder="Enter resources title"
                  className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-blue-200 bg-white px-6 py-10 text-center">
                <UploadCloudIcon className="h-10 w-10 text-blue-600" />
                <div className="mt-3 text-sm">
                  <span className="font-semibold text-blue-600">Click to upload</span> or
                  drag and drop
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  Accepted: PDF, DOCX, XLS, etc.
                </div>
                <div className="text-sm text-slate-500">Maximum file size: 5MB</div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleEditResourceFileSelect}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                />
              </label>
              {editResourceFileName && (
                <div className="text-sm text-slate-500">
                  Selected file: <span className="font-semibold">{editResourceFileName}</span>
                </div>
              )}
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={handleCancelEditResourceModal}
                className="rounded-lg bg-[#ECEDF0] px-5 py-2.5 text-sm font-semibold text-slate-700"
              >
                No, Cancel
              </button>
              <button
                onClick={handleSaveResourceFromModal}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Save Resource
              </button>
            </div>
          </div>
        </div>
      )}
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
  <div className="space-y-4 flex flex-col justify-center rounded-xl shadow bg-white p-3">
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

const AddCard = ({ onAdd, text = 'Add another project!' }: { onAdd: () => void; text?: string }) => (
  <button
    onClick={onAdd}
    className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-3 border-dashed border-[#0F67FD] bg-white p-6 text-center text-base text-slate-500 transition hover:border-blue-500 hover:bg-blue-50/40"
  >
    <div className="flex h-20 w-20 items-center justify-center rounded-2xl text-blue-600">
      <AddFileIcon className="h-8 w-8" />
    </div>
    <p className="text-sm max-w-42.5 text-slate-400">Want to showcase more? Add another Testimonial!</p>
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

const EditIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M0 7.67442V4.32558C0 2.88895 0.284795 1.77443 1.02961 1.02961C1.77443 0.284795 2.88895 0 4.32558 0H5.44186C5.67305 0 5.86047 0.187416 5.86047 0.418605C5.86047 0.649794 5.67305 0.837209 5.44186 0.837209H4.32558C2.97152 0.837209 2.13254 1.11055 1.62155 1.62155C1.11055 2.13254 0.837209 2.97152 0.837209 4.32558V7.67442C0.837209 9.02848 1.11055 9.86746 1.62155 10.3785C2.13254 10.8894 2.97152 11.1628 4.32558 11.1628H7.67442C9.02848 11.1628 9.86746 10.8894 10.3785 10.3785C10.8894 9.86746 11.1628 9.02848 11.1628 7.67442V6.55814C11.1628 6.32695 11.3502 6.13953 11.5814 6.13953C11.8126 6.13953 12 6.32695 12 6.55814V7.67442C12 9.11105 11.7152 10.2256 10.9704 10.9704C10.2256 11.7152 9.11105 12 7.67442 12H4.32558C2.88895 12 1.77443 11.7152 1.02961 10.9704C0.284795 10.2256 0 9.11105 0 7.67442Z" fill="#566273" />
    <path d="M9.41074 0.00805899C10.0107 -0.050837 10.6054 0.212947 11.1963 0.803818C11.7871 1.39472 12.0508 1.98953 11.9919 2.58954C11.9351 3.16831 11.5858 3.6478 11.1963 4.03738L6.94531 8.2888C6.82399 8.40621 6.66574 8.50923 6.51274 8.58616C6.36058 8.66264 6.18103 8.73016 6.01018 8.75457L4.38831 8.98614H4.3862C3.98632 9.04118 3.60374 8.93195 3.3353 8.66458C3.06652 8.39676 2.95674 8.01446 3.01535 7.61251L3.2469 5.99152C3.2711 5.81831 3.3377 5.63754 3.41477 5.48417C3.49195 5.33058 3.59629 5.17105 3.71683 5.0505L7.96305 0.803818C8.35258 0.414249 8.83206 0.0649246 9.41074 0.00805899ZM9.48967 0.812766C9.19013 0.842245 8.87777 1.03212 8.53455 1.37538L4.28832 5.62206C4.2472 5.66319 4.18943 5.74356 4.13729 5.84731C4.08513 5.95113 4.05545 6.04524 4.04731 6.10362L4.04678 6.10467L3.81523 7.72672L3.81471 7.72829C3.78757 7.91317 3.8422 8.02865 3.90575 8.09196C3.96985 8.15581 4.08774 8.21081 4.27411 8.18565L5.89598 7.95408C5.95145 7.94615 6.04448 7.91641 6.14963 7.86355C6.25088 7.81264 6.33261 7.75521 6.37907 7.71145L10.6248 3.46582C10.968 3.12254 11.1579 2.81019 11.1873 2.5106C11.2146 2.23216 11.1117 1.86233 10.6248 1.37538C10.1379 0.888449 9.76807 0.785435 9.48967 0.812766Z" fill="#566273" />
    <path d="M8.25509 1.01305C8.44087 0.961005 8.6334 1.0693 8.68548 1.25509C8.96461 2.25069 9.7442 3.03085 10.746 3.31469C10.9316 3.36733 11.0393 3.56035 10.9867 3.74599C10.934 3.9316 10.741 4.03926 10.5554 3.98666C9.32103 3.63688 8.3582 2.67466 8.01305 1.44344C7.96101 1.25765 8.0693 1.06513 8.25509 1.01305Z" fill="#566273" />
  </svg>
)
const DeleteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
    <path d="M9.58447 4.00087C9.82914 4.01573 10.0147 4.2141 9.99908 4.44427L9.61454 10.0545L9.61396 10.0567C9.59815 10.2691 9.58142 10.504 9.53474 10.722C9.48715 10.9444 9.40343 11.1792 9.23347 11.3874C8.8775 11.8234 8.27118 12 7.40042 12H3.599C2.72835 12 2.12247 11.8234 1.76653 11.3874C1.59655 11.1792 1.51286 10.9444 1.46526 10.722C1.41858 10.504 1.40128 10.2691 1.38546 10.0567V10.0545L1.00092 4.44427C0.985269 4.21409 1.17085 4.01573 1.41553 4.00087C1.66018 3.98615 1.87101 4.16076 1.8868 4.39096L2.27192 9.99845L2.29736 10.3037C2.30715 10.3958 2.31946 10.4795 2.3361 10.5572C2.3684 10.708 2.41297 10.8072 2.47083 10.8782C2.57079 11.0006 2.81789 11.1643 3.599 11.1643H7.40042C8.18165 11.1643 8.42861 11.0006 8.52859 10.8782C8.58653 10.8072 8.63157 10.7081 8.6639 10.5572C8.69715 10.4018 8.71134 10.2234 8.72808 9.99845L9.11262 4.39096C9.12842 4.16072 9.33977 3.98609 9.58447 4.00087Z" fill="#C53434" />
    <path d="M6.27032 0C6.82027 0 7.24546 0.0918676 7.52268 0.334657C7.77345 0.554437 7.8255 0.844492 7.86449 1.02669L7.99374 1.60819C8.0344 1.7909 7.87265 1.96435 7.6324 1.99527C7.3922 2.02613 7.16464 1.90271 7.12399 1.72003L6.99416 1.13853V1.13678C6.94495 0.907273 6.91344 0.824694 6.85629 0.774604C6.82449 0.746796 6.71378 0.671061 6.27032 0.671061H4.72959C4.27892 0.671061 4.17154 0.744789 4.14305 0.769361C4.08891 0.816099 4.05871 0.89462 4.00575 1.13373L3.87592 1.71959C3.83557 1.90231 3.60833 2.0259 3.36808 1.99527C3.12778 1.96458 2.96581 1.79137 3.00617 1.60862L3.13542 1.02276V1.02232C3.17652 0.836697 3.22819 0.543755 3.48126 0.325482C3.76013 0.0849854 4.18609 0 4.72959 0H6.27032Z" fill="#C53434" />
    <path d="M7.53846 6C7.79336 6 8 6.22386 8 6.5C8 6.77614 7.79336 7 7.53846 7H4.46154C4.20664 7 4 6.77614 4 6.5C4 6.22386 4.20664 6 4.46154 6H7.53846Z" fill="#C53434" />
    <path d="M6.53417 8C6.79142 8.00003 7 8.22388 7 8.5C7 8.77613 6.79142 8.99997 6.53417 9H4.46583C4.20856 9 4 8.77614 4 8.5C4 8.22386 4.20856 8 4.46583 8H6.53417Z" fill="#C53434" />
    <path d="M4.92484 2C6.82322 2.00001 8.72699 2.08579 10.6189 2.25198C10.8513 2.27247 11.0209 2.4561 10.9979 2.66217C10.9748 2.86822 10.7676 3.01856 10.5352 2.99814C8.67027 2.83433 6.79454 2.75008 4.92484 2.75007C3.82217 2.75007 2.71907 2.79928 1.61617 2.89804L1.61507 2.89852L0.464252 2.99814C0.23172 3.01835 0.0248766 2.8678 0.00205116 2.66168C-0.020746 2.45556 0.149095 2.27221 0.381617 2.25198L1.53133 2.15236V2.15187C2.6623 2.05061 3.79366 2 4.92484 2Z" fill="#C53434" />
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

const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M5 10.5l3.2 3.2L15 6.9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CloseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M6 6l8 8M14 6l-8 8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ContentIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M9.32542 1.70608C10.3706 1.34538 11.616 1.40118 13.0575 1.74189L13.0583 1.74107L14.4499 2.06659C16.256 2.48901 17.5941 3.17973 18.3253 4.35826C19.0563 5.53668 19.0804 7.04078 18.6581 8.84231L17.841 12.3238L17.8419 12.3246C17.4792 13.8831 16.9158 15.0927 16.01 15.8679C15.0831 16.661 13.8982 16.9156 12.4895 16.7801V16.7793C12.0383 16.7426 11.5596 16.6627 11.0548 16.5409V16.5417L9.65501 16.208C7.85789 15.7814 6.52341 15.0904 5.79271 13.9139C5.06157 12.7368 5.03483 11.2348 5.45742 9.43232L6.27448 5.9411V5.94029C6.42565 5.29783 6.60722 4.70719 6.83682 4.19062L6.93854 3.97414C7.48147 2.85299 8.252 2.07662 9.32542 1.70608ZM12.7719 2.95852C11.4311 2.64142 10.4561 2.6382 9.73314 2.88772C9.03939 3.12724 8.49424 3.62875 8.0624 4.52183L8.05996 4.5259C7.83826 4.97676 7.65167 5.54438 7.49111 6.22675L6.67487 9.71715V9.71796C6.28089 11.3986 6.38302 12.4966 6.85391 13.2547C7.32528 14.0137 8.26605 14.5939 9.94391 14.9922L11.3445 15.3251L11.3461 15.3259C11.689 15.4086 12.0095 15.4676 12.308 15.5049L12.5993 15.535L12.6091 15.5358C13.8001 15.6504 14.6073 15.4227 15.197 14.9182C15.8079 14.3954 16.2862 13.4912 16.6236 12.0414L16.6244 12.0406L17.4407 8.55748C17.8349 6.87593 17.7341 5.7756 17.2632 5.01663C16.7923 4.25774 15.8506 3.67745 14.1651 3.28323L12.7743 2.95852H12.7719Z"
      fill="#566273"
    />
    <path
      d="M7.38552 3.63558C7.61806 3.59173 7.85583 3.68323 7.99912 3.87158C8.14236 4.05999 8.16701 4.31348 8.0626 4.52588C7.84085 4.97677 7.65352 5.54425 7.49294 6.22672L6.6767 9.71712V9.71794C6.28269 11.3986 6.38563 12.4965 6.85655 13.2547C7.32797 14.0136 8.26804 14.5939 9.94574 14.9922L11.3463 15.325L11.3479 15.3258C11.8052 15.4362 12.2226 15.5047 12.6012 15.535C12.8656 15.5561 13.0877 15.7424 13.1554 15.9989C13.223 16.2554 13.1219 16.5271 12.9023 16.6759C12.3204 17.0701 11.6108 17.3837 10.7872 17.6525L10.7864 17.6517L9.47211 18.0854L9.46804 18.0863C7.75582 18.6383 6.29465 18.7377 5.09141 18.1221C3.88849 17.5065 3.11346 16.2629 2.55723 14.5511H2.55642L1.49033 11.2593L1.48952 11.2585C0.937691 9.54689 0.83682 8.0843 1.44964 6.88021C2.06261 5.67595 3.30289 4.89992 5.0141 4.34766L6.33083 3.91471L6.33734 3.91227C6.68845 3.80094 7.04123 3.70071 7.38552 3.63558ZM5.40472 5.53499L5.40147 5.53662C3.80628 6.05095 2.95242 6.68381 2.56374 7.44743C2.17471 8.21194 2.16474 9.27814 2.6793 10.8743L3.74619 14.1654H3.74538C4.26412 15.7618 4.89744 16.6189 5.66107 17.0096C6.37682 17.3757 7.35685 17.4082 8.79177 16.9868L9.08474 16.8965L10.3974 16.4644H10.399C10.4453 16.4492 10.4907 16.4324 10.5357 16.4172L9.65684 16.208C7.85978 15.7813 6.52522 15.0903 5.79453 13.9139C5.06345 12.7367 5.03666 11.2348 5.45925 9.43229L6.2763 5.94108V5.94027C6.33793 5.67836 6.40428 5.42491 6.47731 5.1818L5.40472 5.53499Z"
      fill="#566273"
    />
    <path
      d="M9.92755 6.95453C10.0125 6.62008 10.3523 6.41803 10.6868 6.50287L14.7282 7.52744C15.0627 7.61227 15.2653 7.95222 15.1806 8.28672C15.0958 8.6212 14.7558 8.82384 14.4214 8.73919L10.3792 7.7138C10.0448 7.62885 9.84272 7.28903 9.92755 6.95453Z"
      fill="#566273"
    />
    <path
      d="M9.7168 10.3334L12.1335 10.95"
      stroke="#566273"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ContentActiveIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
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

const AccreditationActiveIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M17.7085 15.3917L16.3335 15.7167C16.0252 15.7917 15.7835 16.025 15.7169 16.3333L15.4252 17.5583C15.2669 18.225 14.4169 18.4333 13.9752 17.9083L11.4835 15.0417C11.2835 14.8083 11.3919 14.4417 11.6919 14.3667C13.1669 14.0083 14.4919 13.1833 15.4669 12.0083C15.6252 11.8167 15.9085 11.7917 16.0835 11.9667L17.9335 13.8167C18.5669 14.45 18.3419 15.2417 17.7085 15.3917Z"
      fill="#0F67FD"
    />
    <path
      d="M2.25062 15.3917L3.62562 15.7167C3.93396 15.7917 4.17562 16.025 4.24229 16.3333L4.53396 17.5583C4.69229 18.225 5.54229 18.4333 5.98396 17.9083L8.47562 15.0417C8.67562 14.8083 8.56729 14.4417 8.26729 14.3667C6.79229 14.0083 5.46729 13.1833 4.49229 12.0083C4.33396 11.8167 4.05062 11.7917 3.87562 11.9667L2.02562 13.8167C1.39229 14.45 1.61729 15.2417 2.25062 15.3917Z"
      fill="#0F67FD"
    />
    <path
      d="M10.0003 1.66663C6.77533 1.66663 4.16699 4.27496 4.16699 7.49996C4.16699 8.70829 4.52533 9.81663 5.14199 10.7416C6.04199 12.075 7.46699 13.0166 9.12533 13.2583C9.40866 13.3083 9.70033 13.3333 10.0003 13.3333C10.3003 13.3333 10.592 13.3083 10.8753 13.2583C12.5337 13.0166 13.9587 12.075 14.8587 10.7416C15.4753 9.81663 15.8337 8.70829 15.8337 7.49996C15.8337 4.27496 13.2253 1.66663 10.0003 1.66663ZM12.5503 7.31663L11.8587 8.00829C11.742 8.12496 11.6753 8.34996 11.717 8.51663L11.917 9.37496C12.0753 10.05 11.717 10.3166 11.117 9.95829L10.2837 9.46663C10.1337 9.37496 9.88366 9.37496 9.73366 9.46663L8.90033 9.95829C8.30033 10.3083 7.94199 10.05 8.10033 9.37496L8.30033 8.51663C8.33366 8.35829 8.27533 8.12496 8.15866 8.00829L7.45033 7.31663C7.04199 6.90829 7.17533 6.49996 7.74199 6.40829L8.63366 6.25829C8.78366 6.23329 8.95866 6.09996 9.02533 5.96663L9.51699 4.98329C9.78366 4.44996 10.217 4.44996 10.4837 4.98329L10.9753 5.96663C11.042 6.09996 11.217 6.23329 11.3753 6.25829L12.267 6.40829C12.8253 6.49996 12.9587 6.90829 12.5503 7.31663Z"
      fill="#0F67FD"
    />
  </svg>
)

const TestimonialActiveIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M15 1.66663H5C3.61667 1.66663 2.5 2.77496 2.5 4.14163V13.2333C2.5 14.6 3.61667 15.7083 5 15.7083H5.63333C6.3 15.7083 6.93333 15.9666 7.4 16.4333L8.825 17.8416C9.475 18.4833 10.5333 18.4833 11.1833 17.8416L12.6083 16.4333C13.075 15.9666 13.7167 15.7083 14.375 15.7083H15C16.3833 15.7083 17.5 14.6 17.5 13.2333V4.14163C17.5 2.77496 16.3833 1.66663 15 1.66663ZM10 4.79163C11.075 4.79163 11.9417 5.65829 11.9417 6.73329C11.9417 7.80829 11.075 8.67496 10 8.67496C8.925 8.67496 8.05833 7.79996 8.05833 6.73329C8.05833 5.65829 8.925 4.79163 10 4.79163ZM12.2333 12.55H7.76667C7.09167 12.55 6.7 11.8 7.075 11.2416C7.64167 10.4 8.74167 9.83329 10 9.83329C11.2583 9.83329 12.3583 10.4 12.925 11.2416C13.3 11.8 12.9 12.55 12.2333 12.55Z"
      fill="#0F67FD"
    />
  </svg>
)

const FormActiveIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M13.3337 10.575V15.0666C13.3337 17.0166 12.0337 18.3083 10.092 18.3083H4.90866C2.96699 18.3083 1.66699 17.0166 1.66699 15.0666V8.59164C1.66699 6.64164 2.96699 5.34998 4.90866 5.34998H8.10033C8.95866 5.34998 9.78366 5.69164 10.392 6.29998L12.3837 8.28331C12.992 8.89164 13.3337 9.71664 13.3337 10.575Z"
      fill="#0F67FD"
    />
    <path
      d="M18.3336 6.87506V11.3667C18.3336 13.3084 17.0336 14.6084 15.0919 14.6084H14.1669V10.5751C14.1669 9.50006 13.7336 8.45006 12.9753 7.69172L10.9836 5.70839C10.2253 4.95006 9.17526 4.51672 8.10026 4.51672H6.68359C6.83359 2.78339 8.09193 1.64172 9.90859 1.64172H13.1003C13.9586 1.64172 14.7836 1.98339 15.3919 2.59172L17.3836 4.58339C17.9919 5.19172 18.3336 6.01672 18.3336 6.87506Z"
      fill="#0F67FD"
    />
  </svg>
)

const ContactActiveIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M14.166 2.02502H5.83268C3.33268 2.02502 1.66602 3.69169 1.66602 6.19169V11.1917C1.66602 13.6917 3.33268 15.3584 5.83268 15.3584V17.1334C5.83268 17.8 6.57435 18.2 7.12435 17.825L10.8327 15.3584H14.166C16.666 15.3584 18.3327 13.6917 18.3327 11.1917V6.19169C18.3327 3.69169 16.666 2.02502 14.166 2.02502ZM9.99935 12.1667C9.64935 12.1667 9.37435 11.8834 9.37435 11.5417C9.37435 11.2 9.64935 10.9167 9.99935 10.9167C10.3493 10.9167 10.6243 11.2 10.6243 11.5417C10.6243 11.8834 10.3493 12.1667 9.99935 12.1667ZM11.0493 8.70836C10.7243 8.92502 10.6243 9.06669 10.6243 9.30002V9.47502C10.6243 9.81669 10.341 10.1 9.99935 10.1C9.65768 10.1 9.37435 9.81669 9.37435 9.47502V9.30002C9.37435 8.33336 10.0827 7.85836 10.3493 7.67502C10.6577 7.46669 10.7577 7.32502 10.7577 7.10836C10.7577 6.69169 10.416 6.35002 9.99935 6.35002C9.58268 6.35002 9.24102 6.69169 9.24102 7.10836C9.24102 7.45002 8.95768 7.73336 8.61602 7.73336C8.27435 7.73336 7.99102 7.45002 7.99102 7.10836C7.99102 6.00002 8.89102 5.10002 9.99935 5.10002C11.1077 5.10002 12.0077 6.00002 12.0077 7.10836C12.0077 8.05836 11.3077 8.53336 11.0493 8.70836Z"
      fill="#0F67FD"
    />
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
  { label: 'Accreditation', icon: AwardIcon, activeIcon: AccreditationActiveIcon },
  { label: 'Testimonials', icon: QuoteIcon, activeIcon: TestimonialActiveIcon },
  { label: 'Forms', icon: FormIcon, activeIcon: FormActiveIcon },
  { label: 'Contact', icon: ContactIcon, activeIcon: ContactActiveIcon },
]

export default Page
