
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const initialTabs = ['Welcome message', 'About', 'FAQs', 'Privacy', 'T&C', 'Returns & Refunds']

const defaultEditorContent: Record<string, string> = {
  'Welcome message': '',
  'About': '',
  'Portfolio': '',
  'Services': '',
  'How It Works': '',
  'FAQs': '',
  'Resources': '',
  'Privacy': '',
  'T&C': '',
  'Returns & Refunds': '',
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

type PromptData = {
  id: string
  title: string
  answer: string
}

type SidebarLink = {
  label: string
  icon: ({ className }: { className?: string }) => React.ReactElement
  activeIcon?: ({ className }: { className?: string }) => React.ReactElement
}

type DashboardSidebarProps = {
  activeSidebarSection: string
  activeTab: string
  contentTabs: string[]
  contentRoute: string
  currentPath?: string
  onNavigate: (route: string) => void
  onTabSelect?: (tab: string) => void
  onTabEditStart?: (tab: string) => void
  editingTab?: string | null
  editValue?: string
  onEditValueChange?: (value: string) => void
  onEditSave?: () => void
  onEditCancel?: () => void
  sidebarLinks?: SidebarLink[]
  sidebarRoutes: Record<string, string>
  showTabEdit?: boolean
}

const productSubItems = [
  { label: 'All Products', route: '/dashboard/e-commerce/products' },
  { label: 'Add new product', route: '/dashboard/e-commerce/products/new' },
]

export const DashboardSidebar = ({
  activeSidebarSection,
  activeTab,
  contentTabs,
  contentRoute,
  currentPath,
  onNavigate,
  onTabSelect,
  onTabEditStart,
  editingTab,
  editValue,
  onEditValueChange,
  onEditSave,
  onEditCancel,
  sidebarLinks = dashboardSidebarLinks,
  sidebarRoutes,
  showTabEdit = true,
}: DashboardSidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [contentOpen, setContentOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    const stored = window.localStorage.getItem('dashboardContentOpen')
    if (stored === 'true') return true
    if (stored === 'false') return false
    return true
  })
  const [productOpen, setProductOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    const stored = window.localStorage.getItem('dashboardProductOpen')
    if (stored === 'true') return true
    if (stored === 'false') return false
    return true
  })

  useEffect(() => {
    window.localStorage.setItem('dashboardContentOpen', String(contentOpen))
  }, [contentOpen])
  useEffect(() => {
    window.localStorage.setItem('dashboardProductOpen', String(productOpen))
  }, [productOpen])

  return (
    <aside
      className={`flex h-screen flex-col overflow-y-auto border-r border-slate-200 bg-white px-4 py-4 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'items-center w-20'
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
                className="absolute inset-0 flex items-center justify-center text-slate-500 cursor-pointer opacity-0 transition hover:bg-slate-50 active:scale-95 group-hover:opacity-100"
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

      <div className="mt-4 space-y-1">
        <button
          onClick={() => {
            onNavigate(contentRoute)
            if (activeSidebarSection === 'Content') {
              setContentOpen((prev) => !prev)
            }
          }}
          className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-1.5 text-sm font-semibold transition ${activeSidebarSection === 'Content'
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
          <div className="rounded-xl border border-slate-200 bg-white px-2 py-1.5">
            {contentTabs.map((tab) => (
              <div
                key={tab}
                className={`group flex w-full items-center rounded-lg px-2 py-1 text-sm font-medium transition hover:bg-slate-50 ${activeTab === tab && activeSidebarSection === 'Content'
                  ? 'text-blue-600'
                  : 'text-slate-500'
                  }`}
              >
                {editingTab === tab && showTabEdit ? (
                  <div className="flex w-full items-center gap-2">
                    <input
                      value={editValue ?? ''}
                      onChange={(event) => onEditValueChange?.(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') onEditSave?.()
                        if (event.key === 'Escape') onEditCancel?.()
                      }}
                      className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600"
                    />
                    <button
                      onClick={onEditSave}
                      className="rounded-md bg-blue-600 p-1.5 text-white"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={onEditCancel}
                      className="rounded-md border border-slate-200 p-1.5 text-slate-500"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => onTabSelect?.(tab)}
                      className="flex flex-1 cursor-pointer items-center text-left"
                    >
                      {tab}
                    </button>
                    {showTabEdit && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onTabEditStart?.(tab)}
                          className="cursor-pointer text-slate-400 hover:text-slate-600"
                        >
                          <EditIcon className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => {
            setProductOpen((prev) => !prev)
          }}
          className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-1.5 text-sm font-semibold transition ${activeSidebarSection === 'Product'
            ? 'bg-blue-50 text-blue-600'
            : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
        >
          <span className="flex items-center gap-2">
            <ProductIcon className="h-5 w-5" />
            {sidebarOpen && 'Product'}
          </span>
          {sidebarOpen && (
            <ChevronIcon
              className={`h-6 w-6 transition ${productOpen ? '' : '-rotate-90'}`}
            />
          )}
        </button>

        {sidebarOpen && productOpen && (
          <div className="rounded-xl border border-slate-200 bg-white px-2 py-1.5">
            {productSubItems.map((item) => {
              const isNewRoute = currentPath?.startsWith('/dashboard/e-commerce/products/new')
              const isActive =
                item.route.endsWith('/new')
                  ? isNewRoute
                  : !isNewRoute && currentPath?.startsWith(item.route)
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.route)}
                  className={`flex w-full items-center rounded-lg px-2 py-1 text-left text-sm font-medium transition hover:bg-slate-50 ${isActive
                    ? 'text-blue-600'
                    : 'text-slate-500'
                    }`}
                >
                  {item.label}
                </button>
              )
            })}
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
                onClick={() => {
                  const route = sidebarRoutes[item.label]
                  if (route) onNavigate(route)
                }}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-1.5 text-sm font-semibold transition hover:bg-slate-50 ${activeSidebarSection === item.label
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

      <div className="mt-auto space-y-3 pt-4 text-sm text-slate-500">
        <button
          onClick={() => onNavigate('/dashboard/e-commerce/settings/general')}
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-slate-50"
        >
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
  )
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

const createPrompt = (): PromptData => ({
  id: Math.random().toString(36).slice(2),
  title: '',
  answer: '',
})

const DashboardPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [contentTabs, setContentTabs] = useState(initialTabs)
  const [activeTab, setActiveTab] = useState('Welcome message')
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
  const [deleteFAQTarget, setDeleteFAQTarget] = useState<string | null>(null)
  const [deleteResourceTarget, setDeleteResourceTarget] = useState<string | null>(null)
  const [productImages, setProductImages] = useState<{ file: File; url: string }[]>([])
  const [productCategories, setProductCategories] = useState(['Men', 'Women', 'Kids'])
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [categoryRows, setCategoryRows] = useState([
    {
      name: 'Men',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      count: 3,
    },
    {
      name: 'Women',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, labore et dolore magna aliqua.',
      count: 2,
    },
    {
      name: 'Kids',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, labore et dolore magna aliqua.',
      count: 4,
    },
  ])
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [editingCategoryName, setEditingCategoryName] = useState<string | null>(null)
  const [readyPrompts, setReadyPrompts] = useState<PromptData[]>([
    createPrompt(),
    createPrompt(),
  ])
  const editorRef = useRef<HTMLDivElement | null>(null)
  const returnsPolicyRef = useRef<HTMLDivElement | null>(null)
  const refundsPolicyRef = useRef<HTMLDivElement | null>(null)
  const productDescriptionRef = useRef<HTMLDivElement | null>(null)
  const productImagesInputRef = useRef<HTMLInputElement | null>(null)
  const [editorContent, setEditorContent] = useState(defaultEditorContent)
  const [returnsPolicyContent, setReturnsPolicyContent] = useState('')
  const [refundsPolicyContent, setRefundsPolicyContent] = useState('')
  const [productDescriptionContent, setProductDescriptionContent] = useState('')
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
    'Returns & Refunds': [],
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
    'Returns & Refunds': null,
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
    'Returns & Refunds': [],
  })
  const [saveStatus, setSaveStatus] = useState('')

  const activeSidebarSection = (() => {
    if (pathname?.startsWith('/dashboard/e-commerce/products')) return 'Product'
    if (pathname?.startsWith('/dashboard/e-commerce/categories')) return 'Categories'
    if (pathname?.startsWith('/dashboard/e-commerce/accreditation')) return 'Accreditation'
    if (pathname?.startsWith('/dashboard/e-commerce/testimonials')) return 'Testimonials'
    if (pathname?.startsWith('/dashboard/e-commerce/forms')) return 'Forms'
    if (pathname?.startsWith('/dashboard/e-commerce/contact')) return 'Contact'
    return 'Content'
  })()
  const sidebarRoutes: Record<string, string> = {
    Content: '/dashboard/e-commerce/content',
    Categories: '/dashboard/e-commerce/categories',
    Accreditation: '/dashboard/e-commerce/accreditation',
    Testimonials: '/dashboard/e-commerce/testimonials',
    Forms: '/dashboard/e-commerce/forms',
    Contact: '/dashboard/e-commerce/contact',
  }

  const isProductNew = pathname?.startsWith('/dashboard/e-commerce/products/new')
  const [productRows, setProductRows] = useState([
    {
      name: 'Green hoodie',
      sku: 'SKHOODIE123',
      price: '$49.99',
      category: 'Men',
      stock: 145,
      date: 'January 26, 2026',
      status: 'Published',
      imageUrl: '/assetes/green-hoodie.png',
      imageAlt: 'Green hoodie',
    },
    {
      name: 'Black hoodie',
      sku: 'SKHOODIE124',
      price: '$59.99',
      category: 'Men',
      stock: 518,
      date: 'January 26, 2026',
      status: 'Published',
      imageUrl: null,
      imageAlt: 'Black hoodie',
    },
  ])

  const handleProductEdit = (sku: string) => {
    router.push(`/dashboard/e-commerce/products/new?sku=${encodeURIComponent(sku)}`)
  }

  const handleProductDelete = (sku: string) => {
    setProductRows((prev) => prev.filter((row) => row.sku !== sku))
  }

  const handleProductImagesUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return
    setProductImages((prev) => {
      const remainingSlots = Math.max(0, 4 - prev.length)
      const selected = Array.from(files).slice(0, remainingSlots)
      const next = selected.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }))
      return [...prev, ...next]
    })
  }

  const addReadyPrompt = () => {
    setReadyPrompts((prev) => [...prev, createPrompt()])
  }

  const updateReadyPrompt = (id: string, updates: Partial<PromptData>) => {
    setReadyPrompts((prev) => prev.map((prompt) => (prompt.id === id ? { ...prompt, ...updates } : prompt)))
  }

  // Accreditation state
  const [accreditationEditorContent, setAccreditationEditorContent] = useState('')
  const [accreditationCards, setAccreditationCards] = useState<CardData[]>([createCard()])

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
      const nextTab = remaining[0] ?? 'Welcome message'
      setActiveTab(nextTab)
      router.push(`/dashboard/e-commerce/content?tab=${encodeURIComponent(nextTab)}`)
    }
    if (editingTab === tab) handleCancelEdit()
    setDeleteTarget(null)
  }

  const handleCancelDelete = () => {
    setDeleteTarget(null)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  useEffect(() => {
    if (activeSidebarSection !== 'Content') return
    const tabParam = searchParams.get('tab')
    if (tabParam && contentTabs.includes(tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam)
      return
    }
    if (!contentTabs.includes(activeTab) && contentTabs.length > 0) {
      setActiveTab(contentTabs[0])
    }
  }, [activeSidebarSection, activeTab, contentTabs, searchParams])

  useEffect(() => {
    if (!editorRef.current) return
    editorRef.current.innerHTML = editorContent[activeTab] ?? ''
  }, [activeTab])

  const handleEditorInput = () => {
    if (!editorRef.current) return
    const value = editorRef.current.innerHTML
    setEditorContent((prev) => ({ ...prev, [activeTab]: value }))
  }

  const handlePolicyInput = (
    ref: React.RefObject<HTMLDivElement | null>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!ref.current) return
    setValue(ref.current.innerHTML)
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

  const ensureEditorSelectionFor = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return
    const selection = window.getSelection()
    if (!selection) return
    const hasFocus =
      selection.rangeCount > 0 &&
      ref.current.contains(selection.getRangeAt(0).commonAncestorContainer)
    if (hasFocus) return
    const range = document.createRange()
    range.selectNodeContents(ref.current)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const runEditorCommandFor = (
    ref: React.RefObject<HTMLDivElement | null>,
    command: string,
    value?: string
  ) => {
    if (!ref.current) return
    ref.current.focus()
    ensureEditorSelectionFor(ref)
    document.execCommand(command, false, value)
  }

  const handleFontSizeChange = (value: string) => {
    const sizeMap: Record<string, string> = { '16': '3', '18': '4', '20': '5' }
    runEditorCommand('fontSize', sizeMap[value] ?? '3')
  }

  const handleFontSizeChangeFor = (
    ref: React.RefObject<HTMLDivElement | null>,
    value: string
  ) => {
    const sizeMap: Record<string, string> = { '16': '3', '18': '4', '20': '5' }
    runEditorCommandFor(ref, 'fontSize', sizeMap[value] ?? '3')
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

  const handleConfirmDeleteFAQ = () => {
    if (!deleteFAQTarget) return
    setFaqs((prev) => prev.filter((faq) => faq.id !== deleteFAQTarget))
    setDeleteFAQTarget(null)
  }

  const handleCancelDeleteFAQ = () => {
    setDeleteFAQTarget(null)
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

  const handleConfirmDeleteResource = () => {
    if (!deleteResourceTarget) return
    setResources((prev) => prev.filter((resource) => resource.id !== deleteResourceTarget))
    setDeleteResourceTarget(null)
  }

  const handleCancelDeleteResource = () => {
    setDeleteResourceTarget(null)
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
    <div className={`${inter.className} h-screen bg-white text-slate-900`}>
      <div className="flex h-screen">
        <DashboardSidebar
          activeSidebarSection={activeSidebarSection}
          activeTab={activeTab}
          contentTabs={contentTabs}
          contentRoute="/dashboard/e-commerce/content"
          currentPath={pathname ?? undefined}
          onNavigate={(route) => router.push(route)}
          onTabSelect={(tab) => router.push(`/dashboard/e-commerce/content?tab=${encodeURIComponent(tab)}`)}
          onTabEditStart={handleStartEdit}
          editingTab={editingTab}
          editValue={editValue}
          onEditValueChange={setEditValue}
          onEditSave={handleSaveEdit}
          onEditCancel={handleCancelEdit}
          sidebarLinks={dashboardSidebarLinks}
          sidebarRoutes={sidebarRoutes}
        />

        <main className="flex flex-1 flex-col overflow-y-auto px-10 py-4">
          {activeSidebarSection === 'Content' && (
            <>
              <div className="hidden flex items-center gap-2 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{activeSidebarSection}</span>
              </div>
              <div className="mt-7">
                <h1 className="text-xl font-medium">{activeTabHeading}</h1>

                {activeTab === 'Returns & Refunds' ? (
                  <div className="mt-6 space-y-6">
                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                        Returns Policy
                      </div>
                      <div className="relative flex flex-wrap items-center gap-1 border-b border-slate-200 text-slate-600">
                        <select
                          className="cursor-pointer bg-white px-2 py-1 text-[16px]"
                          onChange={(event) =>
                            handleFontSizeChangeFor(returnsPolicyRef, event.target.value)
                          }
                        >
                          <option>16</option>
                          <option>18</option>
                          <option>20</option>
                        </select>
                        <div className="mx h-10 w-px bg-slate-200" />
                        <ToolButton
                          icon={<BoldIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(returnsPolicyRef, 'bold')}
                        />
                        <ToolButton
                          icon={<ItalicIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(returnsPolicyRef, 'italic')}
                        />
                        <ToolButton
                          icon={<UnderlineIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(returnsPolicyRef, 'underline')}
                        />
                        <ToolButton
                          icon={<OverlineIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(returnsPolicyRef, 'strikeThrough')}
                        />
                        <div className="mx-2 h-10 w-px bg-slate-200" />
                        <ToolButton
                          icon={<AlignLeftIcon className="h-5 w-5" />}
                          onClick={() => runEditorCommandFor(returnsPolicyRef, 'justifyLeft')}
                        />
                        <ToolButton
                          icon={<AlignCenterIcon className="h-5 w-5" />}
                          onClick={() => runEditorCommandFor(returnsPolicyRef, 'justifyCenter')}
                        />
                        <ToolButton
                          icon={<AlignRightIcon className="h-5 w-5" />}
                          onClick={() => runEditorCommandFor(returnsPolicyRef, 'justifyRight')}
                        />
                        <div className="mx-2 h-10 w-px bg-slate-200" />
                        <ToolButton
                          icon={<NumberListIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(returnsPolicyRef, 'insertOrderedList')}
                        />
                        <ToolButton
                          icon={<DotListIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(returnsPolicyRef, 'insertUnorderedList')}
                        />
                        <ToolButton icon={<ImageToolbarIcon className="h-4 w-4" />} />
                        <ToolButton icon={<UploadToolbarIcon className="h-4 w-4" />} />
                        <ToolButton icon={<TextToolbarIcon className="h-4 w-4" />} />

                        <button className="ml-auto shrink-0 whitespace-nowrap px-3 py-2 text-xs font-semibold text-slate-500">
                          <span className="inline-flex items-center gap-2">
                            <TagIcon className="h-4 w-4 shrink-0 text-slate-500" />
                            Tags
                          </span>
                        </button>
                      </div>
                      <div
                        ref={returnsPolicyRef}
                        contentEditable
                        suppressContentEditableWarning
                        className="min-h-55 px-4 py-4 text-sm text-slate-700 outline-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1"
                        onInput={() => handlePolicyInput(returnsPolicyRef, setReturnsPolicyContent)}
                      />
                      <div className="flex justify-end px-4 pb-4">
                        <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                          Save
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                        Refunds Policy
                      </div>
                      <div className="relative flex flex-wrap items-center gap-1 border-b border-slate-200 text-slate-600">
                        <select
                          className="cursor-pointer bg-white px-2 py-1 text-[16px]"
                          onChange={(event) =>
                            handleFontSizeChangeFor(refundsPolicyRef, event.target.value)
                          }
                        >
                          <option>16</option>
                          <option>18</option>
                          <option>20</option>
                        </select>
                        <div className="mx h-10 w-px bg-slate-200" />
                        <ToolButton
                          icon={<BoldIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(refundsPolicyRef, 'bold')}
                        />
                        <ToolButton
                          icon={<ItalicIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(refundsPolicyRef, 'italic')}
                        />
                        <ToolButton
                          icon={<UnderlineIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(refundsPolicyRef, 'underline')}
                        />
                        <ToolButton
                          icon={<OverlineIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(refundsPolicyRef, 'strikeThrough')}
                        />
                        <div className="mx-2 h-10 w-px bg-slate-200" />
                        <ToolButton
                          icon={<AlignLeftIcon className="h-5 w-5" />}
                          onClick={() => runEditorCommandFor(refundsPolicyRef, 'justifyLeft')}
                        />
                        <ToolButton
                          icon={<AlignCenterIcon className="h-5 w-5" />}
                          onClick={() => runEditorCommandFor(refundsPolicyRef, 'justifyCenter')}
                        />
                        <ToolButton
                          icon={<AlignRightIcon className="h-5 w-5" />}
                          onClick={() => runEditorCommandFor(refundsPolicyRef, 'justifyRight')}
                        />
                        <div className="mx-2 h-10 w-px bg-slate-200" />
                        <ToolButton
                          icon={<NumberListIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(refundsPolicyRef, 'insertOrderedList')}
                        />
                        <ToolButton
                          icon={<DotListIcon className="h-4 w-4" />}
                          onClick={() => runEditorCommandFor(refundsPolicyRef, 'insertUnorderedList')}
                        />
                        <ToolButton icon={<ImageToolbarIcon className="h-4 w-4" />} />
                        <ToolButton icon={<UploadToolbarIcon className="h-4 w-4" />} />
                        <ToolButton icon={<TextToolbarIcon className="h-5 w-5" />} />
                        <button className="ml-auto shrink-0 whitespace-nowrap px-3 py-2 text-xs font-semibold text-slate-500">
                          <span className="inline-flex items-center gap-2">
                            <TagIcon className="h-4 w-4 shrink-0 text-slate-500" />
                            Tags
                          </span>
                        </button>
                      </div>
                      <div
                        ref={refundsPolicyRef}
                        contentEditable
                        suppressContentEditableWarning
                        className="min-h-55 px-4 py-4 text-sm text-slate-700 outline-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1"
                        onInput={() => handlePolicyInput(refundsPolicyRef, setRefundsPolicyContent)}
                      />
                      <div className="flex justify-end px-4 pb-4">
                        <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  activeTab !== 'FAQs' &&
                  activeTab !== 'Resources' && (
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
                  )
                )}

                {(activeTab === 'Welcome message' || activeTab === 'Portfolio') && (
                  <div className="mt-8">
                    <h2 className="text-sm font-semibold text-slate-900">Ready Prompt</h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Select a ready-made prompt or add a custom one to define your chatbot’s behavior.
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {readyPrompts.map((prompt) => (
                        <div
                          key={prompt.id}
                          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                          <label className="text-xs font-semibold text-slate-600">Prompt title</label>
                          <input
                            value={prompt.title}
                            onChange={(event) =>
                              updateReadyPrompt(prompt.id, { title: event.target.value })
                            }
                            placeholder="Write title..."
                            className="mt-2 h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700"
                          />
                          <label className="mt-4 block text-xs font-semibold text-slate-600">
                            Prompt answer
                          </label>
                          <textarea
                            value={prompt.answer}
                            onChange={(event) =>
                              updateReadyPrompt(prompt.id, { answer: event.target.value })
                            }
                            placeholder="Write answer..."
                            className="mt-2 min-h-[96px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700"
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addReadyPrompt}
                        className="flex h-full min-h-[190px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-blue-300 bg-white p-4 text-xs font-semibold text-slate-500 transition hover:bg-blue-50"
                      >
                        <div className="grid h-10 w-10 place-items-center rounded-full  text-blue-600">
                          <AddTabIcon className="h-5 w-5" />
                        </div>
                        <span className="text-center text-[11px] font-medium text-slate-500">
                          Want to showcase more?
                          <br />
                          Add another prompt!
                        </span>
                      </button>
                    </div>
                  </div>
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
                                onClick={() => setDeleteFAQTarget(faq.id)}
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
                            <div className="shrink-0 mt-3">
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
                            <div className="flex mt-2 items-center gap-2">
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
                                onClick={() => setDeleteResourceTarget(resource.id)}
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

          {activeSidebarSection === 'Product' && (
            <div className="space-y-6">
              {!isProductNew && (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-xl font-semibold text-slate-900">Products</h1>
                    <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
                      <button
                        className={`rounded-md px-2 py-1 text-sm font-medium ${!isProductNew ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                        onClick={() => router.push('/dashboard/e-commerce/products')}
                      >
                        All (2)
                      </button>
                      <button className="text-sm text-slate-500 hover:text-slate-700">
                        Published (2)
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push('/dashboard/e-commerce/products/new')}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Add new Product
                  </button>
                </div>
              )}

              {isProductNew ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Add Product</h2>
                      <p className=" mt-5 text-lg font-semibold text-slate-900">Product Information</p>
                    </div>
                    <button className="rounded-md bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white mt-[-45px]">
                      Preview
                    </button>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                      <div className="space-y-5">
                        <div>
                          <label className="text-sm font-semibold text-slate-600">Product Name</label>
                          <input
                            placeholder="Green hoodie"
                            className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-slate-600">Description</label>
                          <div className="mt-2 rounded-lg border border-slate-200 bg-white">
                            <div className="relative flex flex-wrap items-center gap-1 border-b border-slate-200 text-slate-600">
                              <select
                                className="cursor-pointer bg-white px-2 py-1 text-[16px]"
                                onChange={(event) =>
                                  handleFontSizeChangeFor(productDescriptionRef, event.target.value)
                                }
                              >
                                <option>16</option>
                                <option>18</option>
                                <option>20</option>
                              </select>
                              <div className="mx h-10 w-px bg-slate-200" />
                              <ToolButton
                                icon={<BoldIcon className="h-4 w-4" />}
                                onClick={() => runEditorCommandFor(productDescriptionRef, 'bold')}
                              />
                              <ToolButton
                                icon={<ItalicIcon className="h-4 w-4" />}
                                onClick={() => runEditorCommandFor(productDescriptionRef, 'italic')}
                              />
                              <ToolButton
                                icon={<UnderlineIcon className="h-4 w-4" />}
                                onClick={() => runEditorCommandFor(productDescriptionRef, 'underline')}
                              />
                              <ToolButton
                                icon={<OverlineIcon className="h-4 w-4" />}
                                onClick={() => runEditorCommandFor(productDescriptionRef, 'strikeThrough')}
                              />
                              <div className="mx-2 h-10 w-px bg-slate-200" />
                              <ToolButton
                                icon={<AlignLeftIcon className="h-5 w-5" />}
                                onClick={() => runEditorCommandFor(productDescriptionRef, 'justifyLeft')}
                              />
                              <ToolButton
                                icon={<AlignCenterIcon className="h-5 w-5" />}
                                onClick={() => runEditorCommandFor(productDescriptionRef, 'justifyCenter')}
                              />
                              <ToolButton
                                icon={<AlignRightIcon className="h-5 w-5" />}
                                onClick={() => runEditorCommandFor(productDescriptionRef, 'justifyRight')}
                              />
                              <div className="mx-2 h-10 w-px bg-slate-200" />
                              <ToolButton
                                icon={<NumberListIcon className="h-4 w-4" />}
                                onClick={() =>
                                  runEditorCommandFor(productDescriptionRef, 'insertOrderedList')
                                }
                              />
                              <ToolButton
                                icon={<DotListIcon className="h-4 w-4" />}
                                onClick={() =>
                                  runEditorCommandFor(productDescriptionRef, 'insertUnorderedList')
                                }
                              />
                              <ToolButton icon={<ImageToolbarIcon className="h-4 w-4" />} />
                              <ToolButton icon={<UploadToolbarIcon className="h-4 w-4" />} />
                              <ToolButton icon={<TextToolbarIcon className="h-4 w-4" />} />
                              <button className="ml-auto shrink-0 whitespace-nowrap px-3 py-2 text-xs font-semibold text-slate-500">
                                <span className="inline-flex items-center gap-2">
                                  <TagIcon className="h-4 w-4 shrink-0 text-slate-500" />
                                  Tags
                                </span>
                              </button>
                            </div>
                            <div
                              ref={productDescriptionRef}
                              contentEditable
                              suppressContentEditableWarning
                              className="min-h-55 px-4 py-4 text-sm text-slate-700 outline-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1"
                              onInput={() =>
                                handlePolicyInput(
                                  productDescriptionRef,
                                  setProductDescriptionContent
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <label className="text-sm font-semibold text-slate-600">Product Images</label>
                          <div className="mt-2 rounded-lg border border-slate-200 bg-[#ECEDF0] p-4 text-center">
                            <div className="mx-auto grid h-24 w-24 place-items-center rounded-lg bg-white bg-slate-50">
                              <img
                                src={productImages[0]?.url ?? '/assetes/hoodie.png'}
                                alt="Green hoodie"
                                className="h-20 w-20 object-contain"
                              />
                            </div>
                            <p className="mt-3 text-[11px] text-slate-600">
                              Upload up to 4 images or videos (max 5MB each, 1000 x 1000 pixels).
                            </p>
                            <input
                              ref={productImagesInputRef}
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(event) => {
                                handleProductImagesUpload(event.target.files)
                                event.currentTarget.value = ''
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => productImagesInputRef.current?.click()}
                              className="mt-3 rounded-md bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white"
                            >
                              Upload
                            </button>
                          </div>
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {productImages.slice(0, 3).map((image, index) => (
                              <div
                                key={`thumb-${index}`}
                                className="grid h-14 w-full place-items-center overflow-hidden rounded-lg border-2 border-dashed border-slate-200 bg-slate-50"
                              >
                                <img
                                  src={image.url}
                                  alt="Thumbnail"
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                            ))}
                            {productImages.length < 3 && (
                              <button
                                type="button"
                                onClick={() => productImagesInputRef.current?.click()}
                                className="grid h-14 w-full place-items-center overflow-hidden rounded-lg border-2 border-dashed border-slate-200 bg-slate-50"
                              >
                                <svg
                                  width="35"
                                  height="35"
                                  viewBox="0 0 35 35"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M17.4998 2.9165C9.46442 2.9165 2.9165 9.46442 2.9165 17.4998C2.9165 25.5353 9.46442 32.0832 17.4998 32.0832C25.5353 32.0832 32.0832 25.5353 32.0832 17.4998C32.0832 9.46442 25.5353 2.9165 17.4998 2.9165ZM23.3332 18.5936H18.5936V23.3332C18.5936 23.9311 18.0978 24.4269 17.4998 24.4269C16.9019 24.4269 16.4061 23.9311 16.4061 23.3332V18.5936H11.6665C11.0686 18.5936 10.5728 18.0978 10.5728 17.4998C10.5728 16.9019 11.0686 16.4061 11.6665 16.4061H16.4061V11.6665C16.4061 11.0686 16.9019 10.5728 17.4998 10.5728C18.0978 10.5728 18.5936 11.0686 18.5936 11.6665V16.4061H23.3332C23.9311 16.4061 24.4269 16.9019 24.4269 17.4998C24.4269 18.0978 23.9311 18.5936 23.3332 18.5936Z"
                                    fill="#566273"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-slate-600">Product Categories</label>
                          <div className="mt-2 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600">
                            {productCategories.map((item) => (
                              <label key={item} className="flex items-center gap-2 py-1">
                                <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300" />
                                {item}
                              </label>
                            ))}
                            {showAddCategory ? (
                              <div className="mt-2 flex items-center gap-2">
                                <input
                                  value={newCategoryName}
                                  onChange={(event) => setNewCategoryName(event.target.value)}
                                  placeholder="Category name"
                                  className="h-8 flex-1 rounded-md border border-slate-200 px-2 text-xs text-slate-700"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const trimmed = newCategoryName.trim()
                                    if (!trimmed) return
                                    setProductCategories((prev) =>
                                      prev.includes(trimmed) ? prev : [...prev, trimmed]
                                    )
                                    setNewCategoryName('')
                                    setShowAddCategory(false)
                                  }}
                                  className="h-8 rounded-md bg-blue-600 px-3 text-xs font-semibold text-white"
                                >
                                  Add
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNewCategoryName('')
                                    setShowAddCategory(false)
                                  }}
                                  className="h-8 rounded-md border border-slate-200 px-3 text-xs text-slate-600"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setShowAddCategory(true)}
                                className="mt-1 text-xs text-blue-600"
                              >
                                + Add new category
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">Price, Stock & Variants</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      You can add variants to a product that has more than one option, such as size or color.
                    </p>

                    <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-slate-900">
                          Variants 1 <span className="text-red-500">*</span>
                        </h4>
                        {/* <button className="text-xs text-blue-600">Add size</button> */}
                      </div>
                      <div className="mt-3">
                        <label className="text-xs text-slate-900">
                          Variants Name <span className="text-slate-400">(It can be size, color etc)</span>
                        </label>
                        <div className="mt-2 flex items-center gap-2">
                          <input
                            placeholder="Size"
                            className="h-9 w-[40%] rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700"
                          />
                          <button className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500">
                            <EditIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="text-xs text-slate-900">Total Variants</label>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {['10-14 yrs', '18-24 yrs'].map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-900"
                            >
                              {tag} x
                            </span>
                          ))}
                          <button className="inline-flex items-center gap-1 text-[11px] text-blue-600">
                            Add size
                            <span className="grid h-4 w-4 place-items-center rounded bg-blue-600 text-white">
                              +
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-slate-900">
                          Variants 2 <span className="text-red-500">*</span>
                        </h4>
                      </div>
                      <div className="mt-3">
                        <label className="text-xs font-medium text-slate-900">
                          Variants Name <span className="text-slate-400">(It can be size, color etc)</span>
                        </label>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <input
                            placeholder="Color Family"
                            className="h-10 w-[40%] min-w-[240px] rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 placeholder:text-slate-400"
                          />
                          <button className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
                            <EditIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="text-xs font-semibold text-slate-900">Total Variants</label>
                      </div>
                      <div className="mt-2 text-sm text-slate-700">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" defaultChecked />
                          <span>
                            Add Image{' '}
                            <span className="text-xs text-slate-400">Max 4 images for each variant.</span>
                          </span>
                        </label>
                      </div>
                      <div className="mt-4 space-y-3">
                        {['Green', 'Black'].map((color) => (
                          <div
                            key={color}
                            className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                          >
                            <input
                              defaultValue={color}
                              className="h-9 w-[40%] min-w-[220px] rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700"
                            />
                            <div className="flex items-center gap-2">
                              <label
                                htmlFor={`variant-upload-${color.toLowerCase()}`}
                                className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-blue-500 text-blue-600"
                              >
                                +
                              </label>
                              <input
                                id={`variant-upload-${color.toLowerCase()}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                              />
                              {color === 'Green' && (
                                <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-slate-200 bg-white">
                                  <img src="/assetes/green-hoodie.png" alt="Green hoodie" className="h-7 w-7 object-cover" />
                                </div>
                              )}
                              <span className="text-sm font-medium text-slate-800">Upload Image</span>
                            </div>
                            <div className="ml-auto flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1">
                              <button className="grid h-8 w-8 place-items-center rounded-lg text-red-500 hover:bg-red-50">
                                <TrashIcon className="h-3.5 w-3.5" />
                              </button>
                              <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-50">
                                <DragIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-3">
                          <input
                            placeholder="Please type or select"
                            className="h-9 w-[40%] min-w-[220px] rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Price & Stock <span className="text-red-500">*</span>
                    </h3>
                    <div className="mt-4 overflow-x-auto rounded-lg border bg-[#F6F6F6] border-slate-200">
                      <table className="w-full border-separate border-spacing-0 text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 text-slate-800">
                          <tr className="border border-slate-200">
                            <th className="border border-slate-200 px-4 py-2 text-center font-semibold">Color Family</th>
                            <th className="border border-slate-200 px-4 py-2 text-center font-semibold">Size</th>
                            <th className="border border-slate-200 px-4 py-2 text-center font-semibold">Price</th>
                            <th className="border border-slate-200 px-4 py-2 text-center font-semibold">Stock</th>
                            <th className="px-4 py-2 text-center font-semibold">Seller SKU</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {[
                            {
                              color: 'Green',
                              image: '/assetes/green-hoodie.png',
                              rows: [
                                { size: '10-14 yrs', price: '49.99', stock: '145', sku: 'HOODIE123' },
                                { size: '20-24 yrs', price: '59.99', stock: '518', sku: 'HOODIE124' },
                              ],
                            },
                            {
                              color: 'Black',
                              image: null,
                              rows: [
                                { size: '10-14 yrs', price: '', stock: '', sku: '' },
                                { size: '20-24 yrs', price: '', stock: '', sku: '' },
                              ],
                            },
                          ].map((group) =>
                            group.rows.map((row, rowIndex) => (
                              <tr key={`${group.color}-${row.size}`} className="border border-slate-100">
                                {rowIndex === 0 && (
                                  <td
                                    rowSpan={group.rows.length}
                                    className="border border-slate-100 px-4 py-3 align-middle text-center"
                                  >
                                    <div className="flex items-center justify-center gap-2">
                                      {group.image && (
                                        <img
                                          src={group.image}
                                          alt={`${group.color} hoodie`}
                                          className="h-8 w-8 rounded bg-slate-50 object-contain"
                                        />
                                      )}
                                      <span className="font-medium text-slate-800">{group.color}</span>
                                    </div>
                                  </td>
                                )}
                                <td className="border border-slate-100 px-4 py-3 text-center">{row.size}</td>
                                <td className="border border-slate-100 px-4 py-3 text-center">
                                  <div className="mx-auto flex h-7 w-28 items-center gap-1 rounded-md border border-slate-200 bg-white px-2">
                                    <span className="text-slate-400">$</span>
                                    <input
                                      defaultValue={row.price}
                                      placeholder="."
                                      className="w-full bg-transparent text-xs text-slate-700 outline-none"
                                    />
                                  </div>
                                </td>
                                <td className="border border-slate-100 px-4 py-3 text-center">
                                  <input
                                    defaultValue={row.stock}
                                    className="mx-auto h-7 w-24 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700"
                                  />
                                </td>
                                <td className="border border-slate-100 px-4 py-3 text-center">
                                  <div className="mx-auto flex w-40 items-center gap-2 rounded-md border border-slate-200 bg-white px-2">
                                    <input
                                      defaultValue={row.sku}
                                      placeholder="Seller SKU"
                                      className="h-7 w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                                    />
                                    <span className="text-[10px] text-slate-400">9/100</span>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-slate-900">Shipping</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Configure the shipping details for your product. You can specify shipping methods, shipping rates,
                      and set restrictions based on quantity, weight, or destination.
                    </p>
                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div>
                        <label className="text-xs font-semibold text-slate-600">Weight (g)</label>
                        <input
                          defaultValue="0"
                          className="mt-2 h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="text-xs font-semibold text-slate-600">Dimensions (cm)</label>
                        <div className="mt-2 grid grid-cols-3 gap-3">
                          <input
                            placeholder="Length"
                            className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700"
                          />
                          <input
                            placeholder="Width"
                            className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700"
                          />
                          <input
                            placeholder="Height"
                            className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="rounded-xl bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow">
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <div className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-400">
                      <SearchIcon className="h-4 w-4" />
                      <input
                        placeholder="Search..."
                        className="w-40 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
                      />
                    </div>
                    <button className="h-9 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm">
                      Search Products
                    </button>
                    <select className="h-9 rounded-lg border border-slate-200 bg-white px-3 pl-2 text-sm text-slate-400">
                      <option>Select a category</option>
                    </select>
                    <select className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-400">
                      <option>Filter by stock status</option>
                    </select>
                    <select className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-400">
                      <option>Filter by brand</option>
                    </select>
                    <button className="ml-2 text-sm text-slate-500 underline-offset-2 hover:text-slate-700 hover:underline">
                      Reset
                    </button>
                    <button className="ml-auto flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm">
                      Filter <FilterIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="p-4">
                      <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-100 text-xs font-semibold text-slate-700">
                            <tr>
                              <th className="px-4 py-3">Image</th>
                              <th className="px-4 py-3">Name</th>
                              <th className="px-4 py-3">SKU</th>
                              <th className="px-4 py-3">Price</th>
                              <th className="px-4 py-3">Categories</th>
                              <th className="px-4 py-3">Stock</th>
                              <th className="px-4 py-3">Date</th>
                              <th className="px-4 py-3">Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-slate-600">
                            {productRows.map((row) => (
                              <tr key={row.sku} className="border-t border-slate-200">
                                <td className="px-4 py-3">
                                  <div className="grid h-10 w-10 place-items-center  rounded-lg bg-slate-100">
                                    {row.imageUrl ? (
                                      <img
                                        src={row.imageUrl}
                                        alt={row.imageAlt ?? row.name}
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <ImageIcon className="h-5 w-5" />
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
                                <td className="px-4 py-3">{row.sku}</td>
                                <td className="px-4 py-3">{row.price}</td>
                                <td className="px-4 py-3">{row.category}</td>
                                <td className="px-4 py-3">{row.stock}</td>
                                <td className="px-4 py-3">
                                  <div className="text-xs text-slate-500">{row.date}</div>
                                  <div className="text-xs text-slate-400">{row.status}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1">
                                    <button
                                      onClick={() => handleProductEdit(row.sku)}
                                      className="grid h-7 w-7 place-items-center rounded-md  text-slate-500 transition "
                                    >
                                      <EditIcon className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleProductDelete(row.sku)}
                                      className="grid h-7 w-7 place-items-center rounded-md   text-red-500 transition "
                                    >
                                      <TrashIcon className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeSidebarSection === 'Categories' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Categories</h1>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold text-slate-900">Add New Category</h2>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={categoryName}
                      onChange={(event) => setCategoryName(event.target.value)}
                      placeholder="Unisex"
                      className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Description</label>
                    <textarea
                      value={categoryDescription}
                      onChange={(event) => setCategoryDescription(event.target.value)}
                      placeholder="Add description for this category..."
                      className="mt-2 min-h-[90px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        const trimmed = categoryName.trim()
                        if (!trimmed) return
                        if (editingCategoryName) {
                          setCategoryRows((prev) =>
                            prev.map((row) =>
                              row.name === editingCategoryName
                                ? {
                                  ...row,
                                  name: trimmed,
                                  description: categoryDescription.trim(),
                                }
                                : row
                            )
                          )
                          setProductCategories((prev) =>
                            prev.map((item) => (item === editingCategoryName ? trimmed : item))
                          )
                          setEditingCategoryName(null)
                        } else {
                          setCategoryRows((prev) => [
                            ...prev,
                            {
                              name: trimmed,
                              description: categoryDescription.trim(),
                              count: 0,
                            },
                          ])
                          setProductCategories((prev) =>
                            prev.includes(trimmed) ? prev : [...prev, trimmed]
                          )
                        }
                        setCategoryName('')
                        setCategoryDescription('')
                      }}
                      className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white"
                    >
                      {editingCategoryName ? 'Save' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-xs font-semibold text-slate-700">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Count</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      {categoryRows.map((row, index) => (
                        <tr key={row.name} className="border-t border-slate-200">
                          <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
                          <td className="px-4 py-3 text-xs text-slate-500">
                            <div className="max-w-[360px] whitespace-normal">
                              {row.description}
                            </div>
                          </td>
                          <td className="px-4 py-3">{row.count}</td>
                          <td className="px-4 py-3">
                            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setCategoryName(row.name)
                                  setCategoryDescription(row.description)
                                  setEditingCategoryName(row.name)
                                }}
                                className="grid h-7 w-7 place-items-center rounded-md text-slate-500"
                              >
                                <EditIcon className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setCategoryRows((prev) => prev.filter((item) => item.name !== row.name))
                                  setProductCategories((prev) =>
                                    prev.filter((item) => item !== row.name)
                                  )
                                  if (editingCategoryName === row.name) {
                                    setEditingCategoryName(null)
                                    setCategoryName('')
                                    setCategoryDescription('')
                                  }
                                }}
                                className="grid h-7 w-7 place-items-center rounded-md text-red-500"
                              >
                                <TrashIcon className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (index === 0) return
                                  setCategoryRows((prev) => {
                                    const next = [...prev]
                                    const [moved] = next.splice(index, 1)
                                    next.splice(index - 1, 0, moved)
                                    return next
                                  })
                                }}
                                className="grid h-7 w-7 place-items-center rounded-md text-slate-400"
                              >
                                <DragIcon className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
              <div className="mt-4 grid gap-6 lg:grid-cols-[2fr_1fr]">
                {accreditationCards.map((card) => (
                  <CardForm
                    key={card.id}
                    titleLabel="Accreditation title"
                    descLabel="Accreditation description"
                    card={card}
                    onTitleChange={(value) =>
                      updateAccreditationCard(card.id, { title: value })
                    }
                    onDescriptionChange={(value) =>
                      updateAccreditationCard(card.id, { description: value })
                    }
                    onImageChange={(event) =>
                      handleAccreditationCardImageChange(card.id, event)
                    }
                  />
                ))}
                <div className="w-full self-start">
                  <AddCard
                    onAdd={addAccreditationCard}
                    text="Want to showcase more? Add another Accreditation!"
                  />
                </div>
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
                        placeholder="John Doe"
                        className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-600">Email</label>
                      <input
                        readOnly
                        placeholder="johndoe@gmail.com"
                        className="w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-600">Message</label>
                      <textarea
                        readOnly
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        className="min-h-16 w-full rounded-lg  bg-[#FAFAFA] px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-200"
                      />
                    </div>
                  </div>

                  {/* Custom Fields */}
                  {customFields.map((field) => (
                    <div className="mt-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-medium text-xl">Select Your Preferences</div>
                        <div className="flex items-center gap-2">
                          <button className="flex h-6 w-6 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                              <path d="M18.425 10.0411C18.4248 5.43237 14.6498 1.65822 10.0411 1.65822C5.43249 1.65842 1.65842 5.43249 1.65822 10.0411C1.65822 14.6498 5.43237 18.4248 10.0411 18.425C14.65 18.425 18.425 14.65 18.425 10.0411ZM20.0833 10.0411C20.0833 15.5658 15.5658 20.0833 10.0411 20.0833C4.51656 20.0831 0 15.5657 0 10.0411C0.000196011 4.51668 4.51668 0.000196007 10.0411 0C15.5657 0 20.0831 4.51656 20.0833 10.0411Z" fill="#0F67FD" />
                              <path d="M13.7267 9.21216C14.1844 9.21235 14.5558 9.58348 14.5558 10.0413C14.5558 10.4991 14.1844 10.8702 13.7267 10.8704H6.35645C5.89855 10.8704 5.52734 10.4992 5.52734 10.0413C5.52734 9.58336 5.89855 9.21216 6.35645 9.21216H13.7267Z" fill="#0F67FD" />
                              <path d="M9.21484 13.7267V6.35645C9.21484 5.89855 9.58605 5.52734 10.044 5.52734C10.5019 5.52734 10.8731 5.89855 10.8731 6.35645V13.7267C10.8729 14.1844 10.5017 14.5558 10.044 14.5558C9.58617 14.5558 9.21504 14.1844 9.21484 13.7267Z" fill="#0F67FD" />
                            </svg>
                          </button>
                          <button className="flex h-6 w-6 items-center justify-center rounded-md text-green-600 hover:bg-green-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M0 12.7905V7.20922C0 4.81485 0.474653 2.95736 1.716 1.716C2.95736 0.474653 4.81485 0 7.20922 0H9.06966C9.45497 0 9.76733 0.312356 9.76733 0.697666C9.76733 1.08298 9.45497 1.39533 9.06966 1.39533H7.20922C4.95247 1.39533 3.55419 1.8509 2.70255 2.70255C1.8509 3.55419 1.39533 4.95247 1.39533 7.20922V12.7905C1.39533 15.0473 1.8509 16.4456 2.70255 17.2972C3.55419 18.1489 4.95247 18.6044 7.20922 18.6044H12.7905C15.0473 18.6044 16.4456 18.1489 17.2972 17.2972C18.1489 16.4456 18.6044 15.0473 18.6044 12.7905V10.9301C18.6044 10.5448 18.9168 10.2324 19.3021 10.2324C19.6874 10.2324 19.9998 10.5448 19.9998 10.9301V12.7905C19.9998 15.1849 19.5251 17.0424 18.2838 18.2838C17.0424 19.5251 15.1849 19.9998 12.7905 19.9998H7.20922C4.81485 19.9998 2.95736 19.5251 1.716 18.2838C0.474653 17.0424 0 15.1849 0 12.7905Z" fill="#566273" />
                              <path d="M15.6844 0.0134315C16.6843 -0.0847273 17.6756 0.354907 18.6603 1.33968C19.645 2.3245 20.0845 3.31584 19.9864 4.31585C19.8917 5.28045 19.3095 6.07959 18.6603 6.72889L11.5754 13.8145C11.3732 14.0102 11.1095 14.1819 10.8545 14.3101C10.6009 14.4376 10.3017 14.5501 10.0169 14.5908L7.31382 14.9767H7.31031C6.64384 15.0685 6.00622 14.8864 5.55883 14.4408C5.11087 13.9944 4.9279 13.3573 5.02558 12.6874L5.41149 9.98574C5.45184 9.69706 5.56283 9.39578 5.69127 9.14017C5.81991 8.88419 5.99381 8.61831 6.1947 8.4174L13.2717 1.33968C13.9209 0.690407 14.72 0.108206 15.6844 0.0134315ZM15.816 1.35459C15.3168 1.40373 14.7962 1.72018 14.2241 2.29227L7.14718 9.36999C7.07864 9.43853 6.98236 9.57249 6.89546 9.74541C6.80852 9.91844 6.75906 10.0753 6.74549 10.1726L6.74461 10.1743L6.35871 12.8777L6.35783 12.8803C6.31261 13.1885 6.40364 13.3809 6.50956 13.4864C6.61639 13.5929 6.81287 13.6845 7.1235 13.6426L9.82658 13.2566C9.91903 13.2434 10.0741 13.1939 10.2493 13.1058C10.4181 13.0209 10.5543 12.9252 10.6317 12.8523L17.7078 5.7763C18.2799 5.20418 18.5963 4.6836 18.6454 4.18428C18.6909 3.72022 18.5193 3.10385 17.7078 2.29227C16.8963 1.48073 16.28 1.30904 15.816 1.35459Z" fill="#566273" />
                              <path d="M13.7591 1.68831C14.0688 1.60157 14.3896 1.78206 14.4764 2.0917C14.9416 3.75102 16.2409 5.05127 17.9106 5.52433C18.2199 5.61206 18.3994 5.93377 18.3117 6.24316C18.224 6.55251 17.9023 6.73194 17.5929 6.64428C15.5357 6.06132 13.931 4.45763 13.3557 2.40562C13.269 2.09598 13.4495 1.77511 13.7591 1.68831Z" fill="#566273" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteCustomField(field.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-md text-red-600 hover:bg-red-50"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                              <path d="M15.9753 6.6682C16.383 6.69297 16.6923 7.02357 16.6663 7.40719L16.0254 16.7574L16.0244 16.7611C15.998 17.1151 15.9702 17.5066 15.8924 17.87C15.813 18.2406 15.6735 18.6319 15.3903 18.9789C14.797 19.7057 13.7865 19.9999 12.3352 19.9999H5.99959C4.54852 19.9999 3.53873 19.7056 2.9455 18.9789C2.6622 18.6319 2.52272 18.2406 2.44339 17.87C2.36559 17.5066 2.33676 17.1151 2.31039 16.7611V16.7574L1.6695 7.40719C1.64342 7.02357 1.95272 6.69297 2.36051 6.6682C2.76825 6.64366 3.11963 6.93467 3.14595 7.31833L3.7878 16.664L3.83021 17.1727C3.84652 17.3264 3.86705 17.4657 3.89478 17.5953C3.94862 17.8466 4.02289 18.012 4.11933 18.1302C4.28593 18.3343 4.69775 18.6071 5.99959 18.6072H12.3352C13.6372 18.6072 14.0488 18.3343 14.2155 18.1302C14.312 18.0119 14.3871 17.8468 14.441 17.5953C14.4964 17.3363 14.52 17.0389 14.548 16.664L15.1888 7.31833C15.2152 6.93461 15.5674 6.64356 15.9753 6.6682Z" fill="#C53434" />
                              <path d="M10.4505 0C11.367 0 12.0757 0.153111 12.5377 0.557755C12.9557 0.924051 13.0424 1.40747 13.1074 1.71113L13.3228 2.68028C13.3906 2.98479 13.121 3.27388 12.7206 3.32541C12.3202 3.37684 11.941 3.17114 11.8732 2.86668L11.6569 1.89753V1.89462C11.5748 1.5121 11.5223 1.37447 11.4271 1.29099C11.3741 1.24465 11.1896 1.11842 10.4505 1.11842H7.88261C7.13151 1.11842 6.95255 1.2413 6.90506 1.28225C6.81483 1.36015 6.76449 1.49102 6.67623 1.88952L6.45985 2.86596C6.3926 3.17048 6.01388 3.37645 5.61347 3.32541C5.21297 3.27426 4.94302 2.98559 5.01028 2.68101L5.2257 1.70457V1.70385C5.2942 1.39448 5.38032 0.906247 5.80208 0.542464C6.26686 0.141641 6.97679 0 7.88261 0H10.4505Z" fill="#C53434" />
                              <path d="M12.5653 10C12.9902 10 13.3346 10.3731 13.3346 10.8333C13.3346 11.2936 12.9902 11.6666 12.5653 11.6666H7.43719C7.01236 11.6666 6.66797 11.2936 6.66797 10.8333C6.66797 10.3731 7.01236 10 7.43719 10H12.5653Z" fill="#C53434" />
                              <path d="M10.8915 13.333C11.3203 13.3331 11.6679 13.7061 11.6679 14.1663C11.6679 14.6265 11.3203 14.9996 10.8915 14.9997H7.44434C7.01556 14.9997 6.66797 14.6266 6.66797 14.1663C6.66797 13.7061 7.01556 13.333 7.44434 13.333H10.8915Z" fill="#C53434" />
                              <path d="M8.20798 3.3335C11.3719 3.33351 14.5448 3.47647 17.6979 3.75345C18.0853 3.78761 18.368 4.09366 18.3296 4.4371C18.2911 4.78051 17.9458 5.03108 17.5584 4.99705C14.4503 4.72403 11.3241 4.58362 8.20798 4.5836C6.3702 4.5836 4.53172 4.66562 2.69359 4.8302L2.69175 4.83102L0.773744 4.99705C0.386195 5.03073 0.0414606 4.77981 0.00341856 4.43629C-0.0345763 4.09276 0.248489 3.78717 0.636022 3.75345L2.55219 3.58742V3.58661C4.43711 3.41784 6.3227 3.3335 8.20798 3.3335Z" fill="#C53434" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div key={field.id} className="rounded-xl shadow shadow-gray-100 p-6">

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
                    </div>
                  ))}

                  {/* Add Custom Field Button */}
                  <div className={`relative ${showFieldMenu || customFields.length === 0 ? 'mb-16' : ''}`}>
                    <button
                      onClick={() => setShowFieldMenu(!showFieldMenu)}
                      className="flex items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer border-blue-600 bg-white pr-5 pl-6  py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M7.99918 16C7.39868 16 6.91211 15.5134 6.91211 14.9129V1.08707C6.91211 0.486575 7.39868 0 7.99918 0C8.59968 0 9.08626 0.486575 9.08626 1.08707V14.9129C9.08626 15.5134 8.59968 16 7.99918 16Z" fill="#0F67FD" />
                        <path d="M14.9129 9.08717H1.08707C0.486575 9.08717 0 8.6006 0 8.0001C0 7.3996 0.486575 6.91302 1.08707 6.91302H14.9129C15.5134 6.91302 16 7.3996 16 8.0001C16 8.6006 15.5134 9.08717 14.9129 9.08717Z" fill="#0F67FD" />
                      </svg>
                      <span className='text-lg'>Add Custom Field</span>
                      {showFieldMenu && <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path d="M5.6554 16.9702C5.23078 16.5456 5.23078 15.8575 5.6554 15.4328L15.4317 5.6565C15.8564 5.23188 16.5445 5.23188 16.9691 5.6565C17.3937 6.08111 17.3937 6.76923 16.9691 7.19385L7.19275 16.9702C6.76813 17.3948 6.08001 17.3948 5.6554 16.9702Z" fill="#A9A9A9" />
                        <path d="M15.4327 16.9708L5.65636 7.19446C5.23174 6.76984 5.23174 6.08172 5.65636 5.65711C6.08098 5.23249 6.7691 5.23249 7.19371 5.65711L16.9701 15.4335C17.3947 15.8581 17.3947 16.5462 16.9701 16.9708C16.5454 17.3954 15.8573 17.3954 15.4327 16.9708Z" fill="#A9A9A9" />
                      </svg>}
                    </button>

                    {showFieldMenu && (
                      <div className="absolute left-0 top-full z-10 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                        <button
                          onClick={() => addCustomField('checkboxes')}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17.7096 7.50008C17.7096 5.47839 17.3015 4.22575 16.5386 3.46281C15.7756 2.69987 14.523 2.29175 12.5013 2.29175H7.5013C5.47961 2.29175 4.22697 2.69987 3.46403 3.46281C2.70109 4.22575 2.29297 5.47839 2.29297 7.50008V12.5001C2.29297 14.5218 2.70109 15.7744 3.46403 16.5374C4.22697 17.3003 5.47961 17.7084 7.5013 17.7084H12.5013C14.523 17.7084 15.7756 17.3003 16.5386 16.5374C17.3015 15.7744 17.7096 14.5218 17.7096 12.5001V7.50008ZM18.9596 12.5001C18.9596 14.6451 18.5344 16.3091 17.4224 17.4211C16.3103 18.5332 14.6463 18.9584 12.5013 18.9584H7.5013C5.35633 18.9584 3.6923 18.5332 2.58024 17.4211C1.46818 16.3091 1.04297 14.6451 1.04297 12.5001V7.50008C1.04297 5.3551 1.46818 3.69108 2.58024 2.57902C3.6923 1.46696 5.35633 1.04175 7.5013 1.04175H12.5013C14.6463 1.04175 16.3103 1.46696 17.4224 2.57902C18.5344 3.69108 18.9596 5.3551 18.9596 7.50008V12.5001Z" fill="#566273" />
                            <path d="M13.0984 7.199C13.3427 6.95516 13.7392 6.95553 13.983 7.19981C14.2269 7.44411 14.2265 7.84056 13.9822 8.08442L9.25645 12.8004C9.01234 13.044 8.61739 13.0442 8.37347 12.8004L6.01507 10.442C5.77101 10.1979 5.77103 9.80229 6.01507 9.55821C6.25915 9.31414 6.65478 9.31414 6.89886 9.55821L8.81455 11.4739L13.0984 7.199Z" fill="#566273" />
                          </svg>
                          Checkboxes
                        </button>
                        <button
                          onClick={() => addCustomField('radio')}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M16.0002 8.62467C16 4.55172 12.6977 1.25 8.62467 1.25C4.55183 1.25018 1.25018 4.55183 1.25 8.62467C1.25 12.6977 4.55172 16 8.62467 16.0002C12.6978 16.0002 16.0002 12.6978 16.0002 8.62467ZM17.2502 8.62467C17.2502 13.3881 13.3881 17.2502 8.62467 17.2502C3.86137 17.25 0 13.388 0 8.62467C0.000176091 3.86148 3.86148 0.000176088 8.62467 0C13.388 0 17.25 3.86137 17.2502 8.62467Z" fill="#566273" />
                            <path d="M9.59831 8.62508C9.59827 8.08663 9.16183 7.65015 8.62337 7.65015C8.08495 7.65018 7.64847 8.08666 7.64844 8.62508C7.64844 9.16354 8.08492 9.59998 8.62337 9.60002C9.16185 9.60002 9.59831 9.16356 9.59831 8.62508ZM10.8483 8.62508C10.8483 9.85391 9.85221 10.85 8.62337 10.85C7.39457 10.85 6.39844 9.85389 6.39844 8.62508C6.39847 7.3963 7.39459 6.40018 8.62337 6.40015C9.85218 6.40015 10.8483 7.39628 10.8483 8.62508Z" fill="#566273" />
                          </svg>
                          Radio buttons
                        </button>
                        <button
                          onClick={() => addCustomField('number')}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                            <path d="M9.2432 1.87912C9.62047 1.91733 9.89206 2.22622 9.85013 2.56923L8.0168 17.5692C7.97477 17.9122 7.63499 18.1591 7.25769 18.121C6.88042 18.0828 6.60883 17.7739 6.65075 17.4309L8.48409 2.43088C8.52611 2.08791 8.86589 1.84101 9.2432 1.87912Z" fill="#566273" />
                            <path d="M14.7432 1.87912C15.1205 1.91733 15.3921 2.22622 15.3501 2.56923L13.5168 17.5692C13.4748 17.9122 13.135 18.1591 12.7577 18.121C12.3804 18.0828 12.1088 17.7739 12.1508 17.4309L13.9841 2.43088C14.0261 2.08791 14.3659 1.84101 14.7432 1.87912Z" fill="#566273" />
                            <path d="M19.707 6.875C20.0867 6.875 20.3945 7.15482 20.3945 7.5C20.3945 7.84518 20.0867 8.125 19.707 8.125H3.20703C2.82734 8.125 2.51953 7.84518 2.51953 7.5C2.51953 7.15482 2.82734 6.875 3.20703 6.875H19.707Z" fill="#566273" />
                            <path d="M18.793 11.875C19.1727 11.875 19.4805 12.1548 19.4805 12.5C19.4805 12.8452 19.1727 13.125 18.793 13.125H2.29297C1.91327 13.125 1.60547 12.8452 1.60547 12.5C1.60547 12.1548 1.91327 11.875 2.29297 11.875H18.793Z" fill="#566273" />
                          </svg>
                          Number Field
                        </button>
                        <button
                          onClick={() => addCustomField('address')}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M12.5735 8.5918C12.5735 7.50107 11.6449 6.61675 10.4996 6.6167C9.35433 6.6167 8.42578 7.50103 8.42578 8.5918C8.42584 9.68251 9.35437 10.5669 10.4996 10.5669C11.6449 10.5668 12.5734 9.68248 12.5735 8.5918ZM13.886 8.5918C13.8859 10.3728 12.3697 11.8168 10.4996 11.8169C8.62949 11.8169 7.11334 10.3729 7.11328 8.5918C7.11328 6.81068 8.62946 5.3667 10.4996 5.3667C12.3698 5.36675 13.886 6.81071 13.886 8.5918Z" fill="#566273" />
                            <path d="M10.5042 1.04175C13.987 1.04399 17.5355 3.00018 18.4731 6.94507C19.5606 11.5202 16.562 15.3205 14.105 17.5676C12.0913 19.4174 8.9075 19.4156 6.88709 17.5676L6.88623 17.5668C4.4382 15.3198 1.44096 11.5115 2.52832 6.93693V6.93612C3.47076 2.99129 7.02122 1.03953 10.5042 1.04175ZM10.5033 2.29175C7.51402 2.28983 4.58949 3.94146 3.8075 7.212L3.80835 7.21281C2.88333 11.1044 5.41455 14.4796 7.79627 16.6659C9.31043 18.0509 11.6911 18.0491 13.1949 16.6667L13.1958 16.6659C15.5862 14.4798 18.1179 11.1131 17.1931 7.22176C16.4157 3.95022 13.4931 2.29367 10.5033 2.29175Z" fill="#566273" />
                          </svg>
                          Address Field
                        </button>
                        <div className=" "></div>
                        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M5.20833 9.99998C5.20833 9.42849 4.73816 8.95831 4.16667 8.95831C3.59518 8.95831 3.125 9.42849 3.125 9.99998C3.125 10.5715 3.59518 11.0416 4.16667 11.0416C4.73816 11.0416 5.20833 10.5715 5.20833 9.99998ZM6.45833 9.99998C6.45833 11.2618 5.42851 12.2916 4.16667 12.2916C2.90482 12.2916 1.875 11.2618 1.875 9.99998C1.875 8.73814 2.90482 7.70831 4.16667 7.70831C5.42851 7.70831 6.45833 8.73814 6.45833 9.99998Z" fill="#566273" />
                            <path d="M16.8763 9.99992C16.8763 9.42843 16.4061 8.95825 15.8346 8.95825C15.2631 8.95825 14.793 9.42843 14.793 9.99992C14.793 10.5714 15.2631 11.0416 15.8346 11.0416C16.4061 11.0416 16.8763 10.5714 16.8763 9.99992ZM18.1263 9.99992C18.1263 11.2618 17.0965 12.2916 15.8346 12.2916C14.5728 12.2916 13.543 11.2618 13.543 9.99992C13.543 8.73807 14.5728 7.70825 15.8346 7.70825C17.0965 7.70825 18.1263 8.73807 18.1263 9.99992Z" fill="#566273" />
                            <path d="M11.0404 9.99992C11.0404 9.42843 10.5702 8.95825 9.9987 8.95825C9.42721 8.95825 8.95703 9.42843 8.95703 9.99992C8.95703 10.5714 9.42721 11.0416 9.9987 11.0416C10.5702 11.0416 11.0404 10.5714 11.0404 9.99992ZM12.2904 9.99992C12.2904 11.2618 11.2605 12.2916 9.9987 12.2916C8.73685 12.2916 7.70703 11.2618 7.70703 9.99992C7.70703 8.73807 8.73685 7.70825 9.9987 7.70825C11.2605 7.70825 12.2904 8.73807 12.2904 9.99992Z" fill="#566273" />
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

          {activeSidebarSection !== 'Product' &&
            activeSidebarSection !== 'Categories' &&
            activeTab !== 'Returns & Refunds' && (
              <div className="mt-auto flex justify-end pt-12">
                <div className="flex items-center gap-4">
                  {saveStatus && (
                    <span className="text-xs font-semibold text-green-600">
                      {saveStatus}
                    </span>
                  )}
                  <button
                    onClick={handleSave}
                    className=" cursor-pointer rounded-2xl bg-black px-10 py-4 text-lg text-white shadow transition hover:bg-slate-800 active:scale-[0.98]"
                  >
                    Save Content
                  </button>
                </div>
              </div>
            )}
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
      {deleteFAQTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">
              Are you sure you want to delete this FAQ?
            </h3>
            <div className="mt-3 h-px w-full bg-slate-200" />
            <p className="mt-2 text-sm text-slate-500">
              Once deleted, this FAQ cannot be recovered. Please make sure you want
              to permanently remove it.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleConfirmDeleteFAQ}
                className="rounded-md bg-[#C53434] px-5 py-2.5 text-sm font-semibold text-white cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDeleteFAQ}
                className="rounded-md bg-[#ECEDF0] px-5 py-2.5 text-sm font-semibold text-slate-600 cursor-pointer"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteResourceTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">
              Are you sure you want to delete this resource?
            </h3>
            <div className="mt-3 h-px w-full bg-slate-200" />
            <p className="mt-2 text-sm text-slate-500">
              Once deleted, this resource cannot be recovered. Please make sure you want
              to permanently remove it.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleConfirmDeleteResource}
                className="rounded-md bg-[#C53434] px-5 py-2.5 text-sm font-semibold text-white cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDeleteResource}
                className="rounded-md bg-[#ECEDF0] px-5 py-2.5 text-sm font-semibold text-slate-600 cursor-pointer"
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
        onChange={(event) => onDescriptionChange(event.target.value)}
        placeholder="Write details..."
        className="min-h-22.5 w-full mt-2 rounded-xl border border-none bg-[#FAFAFA] px-3 py-3 text-sm text-slate-600"
      />
    </div>
  </div>
)

const AddCard = ({ onAdd, text = 'Add another project!' }: { onAdd: () => void; text?: string }) => (
  <button
    type="button"
    onClick={onAdd}
    className="flex w-full min-h-[320px] cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-3 border-dashed border-[#0F67FD] bg-white p-6 text-center text-base text-slate-500 transition hover:border-blue-500 hover:bg-blue-50/40"
  >
    <div className="flex h-20 w-20 items-center justify-center rounded-2xl text-blue-600">
      <AddFileIcon className="h-8 w-8" />
    </div>
    <p className="text-sm max-w-46.5 text-slate-400">{text}</p>
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

  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_754_1479)">
      <path d="M40.625 50H9.375C4.19688 50 0 45.8031 0 40.625V9.375C0 4.19688 4.19688 0 9.375 0H40.625C45.8031 0 50 4.19688 50 9.375V40.625C50 45.8031 45.8031 50 40.625 50Z" fill="#0F67FD" fill-opacity="0.05" />
      <path d="M27.3437 12.5H15.3641C13.7813 12.5 12.5 13.7813 12.5 15.3641V31.5094C12.5 33.0938 13.7813 34.375 15.3641 34.375H22.2281C21.6656 33.1875 21.3531 31.8641 21.3531 30.4688C21.3531 29.2703 21.5828 28.125 22.0094 27.0734C21.9672 27.0844 21.9266 27.0844 21.8734 27.0844H16.6656C16.0922 27.0844 15.6234 26.6156 15.6234 26.0422C15.6234 25.4688 16.0937 25 16.6672 25H21.875C22.2703 25 22.625 25.2297 22.7922 25.5625C23.4687 24.5109 24.3437 23.6141 25.375 22.9172H16.6672C16.0937 22.9172 15.625 22.4484 15.625 21.875C15.625 21.3016 16.0937 20.8328 16.6672 20.8328H26.0422C26.6156 20.8328 27.0844 21.3016 27.0844 21.875C27.0844 21.9266 27.0844 21.9688 27.0734 22.0109C28.0422 21.6156 29.1047 21.3859 30.2094 21.3656V15.3656C30.2078 13.7812 28.9266 12.5 27.3437 12.5ZM20.8328 18.75H16.6656C16.0938 18.75 15.625 18.2813 15.625 17.7078C15.625 17.1344 16.0937 16.6656 16.6672 16.6656H20.8344C21.4078 16.6656 21.8766 17.1344 21.8766 17.7078C21.8766 18.2813 21.4062 18.75 20.8328 18.75Z" fill="#0F67FD" />
      <path d="M30.4688 23.4375C26.5922 23.4375 23.4375 26.5922 23.4375 30.4688C23.4375 34.3453 26.5922 37.5 30.4688 37.5C34.3453 37.5 37.5 34.3453 37.5 30.4688C37.5 26.5922 34.3453 23.4375 30.4688 23.4375ZM33.3328 31.5109H31.5094V33.3344C31.5094 33.9094 31.0422 34.3766 30.4672 34.3766C29.8922 34.3766 29.425 33.9094 29.425 33.3344V31.5109H27.6016C27.0297 31.5109 26.5625 31.0437 26.5625 30.4688C26.5625 29.8938 27.0297 29.4266 27.6047 29.4266H29.4281V27.6031C29.4281 27.0281 29.8953 26.5609 30.4703 26.5609C31.0453 26.5609 31.5125 27.0281 31.5125 27.6031V29.4266H33.3359C33.9109 29.4266 34.3781 29.8938 34.3781 30.4688C34.3781 31.0437 33.9094 31.5109 33.3328 31.5109Z" fill="#0F67FD" fill-opacity="0.5" />
    </g>
    <defs>
      <clipPath id="clip0_754_1479">
        <rect width="50" height="50" fill="white" />
      </clipPath>
    </defs>
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

const SearchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const FilterIcon = ({ className }: { className?: string }) => (

  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6667 3.8335C14.9429 3.8335 15.1667 4.05735 15.1667 4.3335C15.1667 4.60964 14.9429 4.8335 14.6667 4.8335H10.6667C10.3906 4.8335 10.1667 4.60964 10.1667 4.3335C10.1667 4.05735 10.3906 3.8335 10.6667 3.8335H14.6667Z" fill="white" />
    <path d="M3.99992 3.8335C4.27606 3.8335 4.49992 4.05735 4.49992 4.3335C4.49992 4.60964 4.27606 4.8335 3.99992 4.8335H1.33325C1.05711 4.8335 0.833252 4.60964 0.833252 4.3335C0.833252 4.05735 1.05711 3.8335 1.33325 3.8335H3.99992Z" fill="white" />
    <path d="M8.49992 4.33333C8.49992 3.32081 7.67911 2.5 6.66659 2.5C5.65406 2.5 4.83325 3.32081 4.83325 4.33333C4.83325 5.34586 5.65406 6.16667 6.66659 6.16667C7.67911 6.16667 8.49992 5.34586 8.49992 4.33333ZM9.49992 4.33333C9.49992 5.89814 8.23139 7.16667 6.66659 7.16667C5.10178 7.16667 3.83325 5.89814 3.83325 4.33333C3.83325 2.76853 5.10178 1.5 6.66659 1.5C8.23139 1.5 9.49992 2.76853 9.49992 4.33333Z" fill="white" />
    <path d="M14.6667 11.1665C14.9428 11.1665 15.1667 11.3904 15.1667 11.6665C15.1667 11.9426 14.9428 12.1665 14.6667 12.1665H12C11.7239 12.1665 11.5 11.9426 11.5 11.6665C11.5 11.3904 11.7239 11.1665 12 11.1665H14.6667Z" fill="white" />
    <path d="M5.33325 11.1665C5.60939 11.1665 5.83325 11.3904 5.83325 11.6665C5.83325 11.9426 5.60939 12.1665 5.33325 12.1665H1.33325C1.05711 12.1665 0.833252 11.9426 0.833252 11.6665C0.833252 11.3904 1.05711 11.1665 1.33325 11.1665H5.33325Z" fill="white" />
    <path d="M11.1667 11.6668C11.1667 10.6543 10.3459 9.8335 9.33333 9.8335C8.32081 9.8335 7.5 10.6543 7.5 11.6668C7.5 12.6794 8.32081 13.5002 9.33333 13.5002C10.3459 13.5002 11.1667 12.6794 11.1667 11.6668ZM12.1667 11.6668C12.1667 13.2316 10.8981 14.5002 9.33333 14.5002C7.76853 14.5002 6.5 13.2316 6.5 11.6668C6.5 10.102 7.76853 8.8335 9.33333 8.8335C10.8981 8.8335 12.1667 10.102 12.1667 11.6668Z" fill="white" />
  </svg>

)

const TrashIcon = ({ className }: { className?: string }) => (

  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7794 5.33417C13.1057 5.35399 13.3531 5.61848 13.3322 5.92538L12.8195 13.4058L12.8187 13.4087C12.7977 13.6919 12.7754 14.0051 12.7131 14.2959C12.6497 14.5924 12.538 14.9054 12.3114 15.1831C11.8368 15.7645 11.0283 15.9999 9.8673 15.9999H4.79865C3.63776 15.9998 2.8299 15.7644 2.3553 15.1831C2.12866 14.9054 2.01708 14.5924 1.95361 14.2959C1.89136 14.0051 1.8683 13.6919 1.84721 13.4087V13.4058L1.33448 5.92538C1.31361 5.61847 1.56106 5.35399 1.8873 5.33417C2.2135 5.31454 2.49462 5.54735 2.51568 5.85429L3.02917 13.3311L3.0631 13.738C3.07615 13.861 3.09257 13.9724 3.11475 14.0761C3.15783 14.2772 3.21724 14.4095 3.2944 14.5041C3.42768 14.6673 3.75715 14.8856 4.79865 14.8856H9.8673C10.909 14.8856 11.2382 14.6673 11.3716 14.5041C11.4488 14.4094 11.5089 14.2774 11.552 14.0761C11.5963 13.8689 11.6152 13.631 11.6376 13.3311L12.1503 5.85429C12.1713 5.5473 12.4532 5.31445 12.7794 5.33417Z" fill="#C53434" />
    <path d="M8.36051 0C9.09379 0 9.66072 0.122492 10.0303 0.446217C10.3647 0.739263 10.4341 1.12601 10.4861 1.36894L10.6584 2.14429C10.7127 2.38791 10.497 2.61918 10.1766 2.66041C9.85637 2.70156 9.55296 2.53699 9.49876 2.29342L9.32564 1.51807V1.51574C9.26004 1.20972 9.21802 1.09961 9.14181 1.03282C9.09942 0.995746 8.9518 0.894765 8.36051 0.894765H6.30616C5.70526 0.894765 5.56208 0.99307 5.52409 1.02583C5.45191 1.08815 5.41164 1.19285 5.34102 1.51166L5.16791 2.29283C5.11411 2.53646 4.81113 2.70124 4.49079 2.66041C4.17038 2.61949 3.95441 2.38854 4.00822 2.14487L4.18057 1.3637V1.36312C4.23537 1.11562 4.30426 0.72502 4.64169 0.433984C5.01352 0.113316 5.58148 0 6.30616 0H8.36051Z" fill="#C53434" />
    <path d="M10.0515 8C10.3914 8 10.6669 8.29848 10.6669 8.66668C10.6669 9.03488 10.3914 9.33336 10.0515 9.33336H5.94889C5.60902 9.33336 5.3335 9.03488 5.3335 8.66668C5.3335 8.29848 5.60902 8 5.94889 8H10.0515Z" fill="#C53434" />
    <path d="M8.71245 10.667C9.05546 10.667 9.33357 10.9655 9.33357 11.3337C9.33357 11.7018 9.05546 12.0003 8.71245 12.0004H5.95462C5.61158 12.0004 5.3335 11.7019 5.3335 11.3337C5.3335 10.9655 5.61158 10.667 5.95462 10.667H8.71245Z" fill="#C53434" />
    <path d="M6.56658 2.6665C9.09779 2.66651 11.6362 2.78089 14.1588 3.00248C14.4687 3.02981 14.6949 3.27465 14.6641 3.54942C14.6333 3.82415 14.3571 4.02461 14.0471 3.99739C11.5606 3.77896 9.05955 3.66663 6.56658 3.66662C5.09632 3.66662 3.62549 3.73224 2.15494 3.86391L2.15347 3.86456L0.619014 3.99739C0.308966 4.02433 0.0331695 3.82359 0.00273493 3.54877C-0.0276619 3.27393 0.198797 3.02946 0.508833 3.00248L2.04182 2.86965V2.869C3.5498 2.73398 5.05831 2.6665 6.56658 2.6665Z" fill="#C53434" />
  </svg>

)

const DragIcon = ({ className }: { className?: string }) => (

  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_975_5885)">
      <path d="M10.2225 2.04798L8.30569 0.131142C8.2188 0.0442489 8.1029 -0.000238074 7.98309 2.20835e-05C7.86108 -0.00114863 7.74258 0.0442489 7.65568 0.131142L5.77838 2.00844C5.60252 2.18431 5.60252 2.47022 5.77838 2.64596L6.02046 2.88803C6.19021 3.05779 6.48653 3.05779 6.65642 2.88803L7.3751 2.16779V4.8145C7.3751 4.82257 7.37979 4.8292 7.38122 4.83675C7.40073 5.06738 7.59416 5.24988 7.82999 5.24988H8.1721C8.42068 5.24988 8.62503 5.048 8.62503 4.79941V4.50387C8.62503 4.50257 8.62503 4.50166 8.62503 4.50062V2.20707L9.34398 2.92745C9.51984 3.10332 9.80511 3.10332 9.98084 2.92745L10.2225 2.68563C10.3984 2.50963 10.3984 2.22359 10.2225 2.04798Z" fill="#566273" />
      <path d="M10.2219 13.3148L9.98 13.0723C9.81024 12.9023 9.51379 12.9023 9.34378 13.0723L8.62484 13.7927V11.5093C8.62484 11.508 8.62484 11.5072 8.62484 11.506V11.2105C8.62484 10.9618 8.42035 10.75 8.17203 10.75H7.82966C7.59409 10.75 7.40066 10.9372 7.38102 11.1681C7.37959 11.1757 7.37491 11.1875 7.37491 11.1954V13.8322L6.65622 13.112C6.48634 12.9421 6.18937 12.9421 6.01949 13.112L5.77754 13.354C5.60193 13.5298 5.60219 13.8158 5.77806 13.9917L7.65549 15.8689C7.74017 15.9538 7.85321 16 7.96989 16H7.9868C8.10764 16 8.22042 15.9539 8.30523 15.8689L10.2219 13.9522C10.3978 13.7764 10.3978 13.4905 10.2219 13.3148Z" fill="#566273" />
      <path d="M4.78873 7.37508H4.75023H4.49176C4.49085 7.37508 4.48994 7.37508 4.4889 7.37508H2.21642L2.9368 6.6586C3.02174 6.57379 3.06844 6.46244 3.06844 6.34186C3.06844 6.22115 3.02174 6.10889 2.9368 6.02421L2.69472 5.78265C2.51885 5.60678 2.23281 5.60704 2.0572 5.78291L0.14036 7.69962C0.0534676 7.78638 0.00702948 7.90281 0.0093709 8.02222C0.0068994 8.14644 0.0534676 8.26273 0.14036 8.34963L2.01766 10.2271C2.10559 10.315 2.22097 10.359 2.33648 10.359C2.45199 10.359 2.56737 10.315 2.65531 10.2271L2.89725 9.98511C2.98219 9.9003 3.02902 9.787 3.02902 9.66642C3.02902 9.5457 2.98232 9.43123 2.89725 9.34655L2.17714 8.62513H4.80239C4.81032 8.62513 4.82333 8.62318 4.83088 8.62175C5.06164 8.60224 5.25012 8.41141 5.25012 8.17571V7.83308C5.25012 7.58476 5.03731 7.37508 4.78873 7.37508Z" fill="#566273" />
      <path d="M15.8596 7.69936L13.9428 5.78278C13.7671 5.60691 13.481 5.60691 13.3053 5.78278L13.0635 6.02486C12.9785 6.10954 12.9317 6.22284 12.9317 6.34342C12.9317 6.46413 12.9784 6.5734 13.0635 6.65821L13.7837 7.37469H11.4967C11.4955 7.37469 11.4946 7.37469 11.4935 7.37469H11.1981C10.9495 7.37469 10.75 7.58424 10.75 7.83269V8.17532C10.75 8.41102 10.9309 8.60159 11.1618 8.62123C11.1695 8.62279 11.1751 8.62474 11.1829 8.62474H13.8231L13.1026 9.34603C13.0178 9.43071 12.971 9.54492 12.971 9.66525C12.971 9.78609 13.0177 9.89965 13.1026 9.98446L13.3448 10.2265C13.4326 10.3145 13.548 10.3586 13.6635 10.3586C13.779 10.3586 13.8943 10.3146 13.9822 10.2267L15.8598 8.34924C15.9464 8.2626 15.9928 8.14618 15.9907 8.02664C15.9927 7.90242 15.9463 7.78599 15.8596 7.69936Z" fill="#566273" />
      <path d="M8.00009 6.74902C7.31054 6.74902 6.74951 7.31005 6.74951 7.99973C6.74951 8.68928 7.31054 9.25044 8.00009 9.25044C8.68964 9.25044 9.2508 8.68928 9.2508 7.99973C9.2508 7.31005 8.68964 6.74902 8.00009 6.74902Z" fill="#566273" />
    </g>
    <defs>
      <clipPath id="clip0_975_5885">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
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

const ImageToolbarIcon = ({ className }: { className?: string }) => (

  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.75 8.23438H22.25C22.652 8.23438 23.0371 8.39448 23.3213 8.67871C23.6055 8.96295 23.7656 9.34803 23.7656 9.75V22.25C23.7656 22.652 23.6055 23.0371 23.3213 23.3213C23.0371 23.6055 22.652 23.7656 22.25 23.7656H9.75C9.34803 23.7656 8.96295 23.6055 8.67871 23.3213C8.39448 23.0371 8.23438 22.652 8.23438 22.25V9.75C8.23438 9.34803 8.39448 8.96295 8.67871 8.67871C8.96295 8.39448 9.34803 8.23438 9.75 8.23438ZM10.0156 22.0283L10.0957 21.9492L18.3662 13.6787C18.6504 13.3946 19.0356 13.2344 19.4375 13.2344C19.8394 13.2344 20.2246 13.3946 20.5088 13.6787L21.9043 15.0742L21.9844 15.1533V10.0156H10.0156V22.0283ZM12.9199 12.0996C13.1969 11.9849 13.5019 11.9552 13.7959 12.0137C14.0898 12.0722 14.3594 12.2168 14.5713 12.4287C14.7832 12.6406 14.9278 12.9102 14.9863 13.2041C15.0448 13.4981 15.0151 13.8031 14.9004 14.0801C14.7857 14.357 14.591 14.5932 14.3418 14.7598C14.0926 14.9263 13.7998 15.0156 13.5 15.0156C13.098 15.0156 12.7129 14.8555 12.4287 14.5713C12.1445 14.2871 11.9844 13.902 11.9844 13.5C11.9844 13.2002 12.0737 12.9074 12.2402 12.6582C12.4068 12.409 12.643 12.2143 12.9199 12.0996ZM21.9844 17.6729L19.4375 15.126L12.5791 21.9844H21.9844V17.6729Z" fill="#475569" stroke="#475569" stroke-width="0.09375" />
  </svg>

)

const UploadToolbarIcon = ({ className }: { className?: string }) => (

  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 15.1094H11.9375C12.1737 15.1094 12.4004 15.2031 12.5674 15.3701C12.7343 15.5371 12.8281 15.7638 12.8281 16C12.8281 16.2361 12.7344 16.4629 12.5674 16.6299C12.4004 16.7968 12.1737 16.8906 11.9375 16.8906H8.76562V21.3594H23.2344V16.8906H20.0625C19.8263 16.8906 19.5996 16.7968 19.4326 16.6299C19.2656 16.4629 19.1719 16.2361 19.1719 16C19.1719 15.7638 19.2657 15.5371 19.4326 15.3701C19.5996 15.2031 19.8263 15.1094 20.0625 15.1094H23.5C23.9018 15.1094 24.2871 15.2687 24.5713 15.5527C24.8555 15.837 25.0156 16.223 25.0156 16.625V21.625C25.0156 22.0269 24.8555 22.4121 24.5713 22.6963C24.2871 22.9805 23.9019 23.1406 23.5 23.1406H8.5C8.09809 23.1406 7.71293 22.9805 7.42871 22.6963C7.14453 22.4121 6.98444 22.0269 6.98438 21.625V16.625C6.98438 16.223 7.14448 15.837 7.42871 15.5527C7.71291 15.2687 8.09821 15.1094 8.5 15.1094ZM20.4531 17.9443C20.6863 17.898 20.9278 17.9227 21.1475 18.0137C21.3672 18.1047 21.5553 18.2584 21.6875 18.4561C21.8197 18.6539 21.8906 18.887 21.8906 19.125C21.8906 19.444 21.7637 19.75 21.5381 19.9756C21.3125 20.2011 21.0065 20.3281 20.6875 20.3281C20.4496 20.3281 20.2173 20.2571 20.0195 20.125C19.8217 19.9928 19.6672 19.8048 19.5762 19.585C19.4851 19.3651 19.4614 19.123 19.5078 18.8896C19.5543 18.6565 19.6688 18.4425 19.8369 18.2744C20.0052 18.1062 20.2197 17.9908 20.4531 17.9443ZM16.001 6.9834C16.1181 6.98342 16.2346 7.00683 16.3428 7.05176C16.4508 7.0967 16.5492 7.16222 16.6318 7.24512L20.3818 10.9951C20.4647 11.078 20.5304 11.1769 20.5752 11.2852C20.6199 11.3932 20.6425 11.509 20.6426 11.626C20.6426 11.7431 20.62 11.8595 20.5752 11.9678C20.5304 12.0759 20.4646 12.174 20.3818 12.2568C20.299 12.3397 20.2 12.4054 20.0918 12.4502C19.9837 12.495 19.868 12.5185 19.751 12.5186C19.6338 12.5186 19.5174 12.495 19.4092 12.4502C19.301 12.4054 19.2029 12.3396 19.1201 12.2568L16.8906 10.0273V16C16.8906 16.2361 16.7969 16.4629 16.6299 16.6299C16.4629 16.7968 16.2362 16.8906 16 16.8906C15.7638 16.8906 15.5371 16.7968 15.3701 16.6299C15.2031 16.4629 15.1094 16.2361 15.1094 16V10.0273L15.0293 10.1074L12.8799 12.2549L12.8525 12.2822C12.6884 12.4329 12.4747 12.5185 12.251 12.5186C12.0143 12.5186 11.7874 12.4242 11.6201 12.2568C11.4528 12.0895 11.3584 11.8626 11.3584 11.626C11.3584 11.509 11.382 11.3933 11.4268 11.2852C11.4716 11.1769 11.5373 11.078 11.6201 10.9951L15.3701 7.24512C15.4528 7.16223 15.5511 7.09667 15.6592 7.05176C15.7674 7.00681 15.8838 6.9834 16.001 6.9834Z" fill="#475569" stroke="#475569" stroke-width="0.09375" />
  </svg>

)

const TextToolbarIcon = ({ className }: { className?: string }) => (

  <svg width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1010_7680)">
      <path d="M16.5625 4.375V6.875C16.5625 7.12364 16.4637 7.3621 16.2879 7.53791C16.1121 7.71373 15.8736 7.8125 15.625 7.8125C15.3764 7.8125 15.1379 7.71373 14.9621 7.53791C14.7863 7.3621 14.6875 7.12364 14.6875 6.875V5.3125H10.9375V14.6875H12.5C12.7486 14.6875 12.9871 14.7863 13.1629 14.9621C13.3387 15.1379 13.4375 15.3764 13.4375 15.625C13.4375 15.8736 13.3387 16.1121 13.1629 16.2879C12.9871 16.4637 12.7486 16.5625 12.5 16.5625H7.5C7.25136 16.5625 7.0129 16.4637 6.83709 16.2879C6.66127 16.1121 6.5625 15.8736 6.5625 15.625C6.5625 15.3764 6.66127 15.1379 6.83709 14.9621C7.0129 14.7863 7.25136 14.6875 7.5 14.6875H9.0625V5.3125H5.3125V6.875C5.3125 7.12364 5.21373 7.3621 5.03791 7.53791C4.8621 7.71373 4.62364 7.8125 4.375 7.8125C4.12636 7.8125 3.8879 7.71373 3.71209 7.53791C3.53627 7.3621 3.4375 7.12364 3.4375 6.875V4.375C3.4375 4.12636 3.53627 3.8879 3.71209 3.71209C3.8879 3.53627 4.12636 3.4375 4.375 3.4375H15.625C15.8736 3.4375 16.1121 3.53627 16.2879 3.71209C16.4637 3.8879 16.5625 4.12636 16.5625 4.375Z" fill="#475569" />
      <path d="M30.856 16V7.25H28.154V5.57H35.434V7.25H32.774V16H30.856ZM37.8339 16.168C37.3019 16.168 36.8399 16.0793 36.4479 15.902C36.0559 15.7247 35.7526 15.4727 35.5379 15.146C35.3232 14.81 35.2159 14.4227 35.2159 13.984C35.2159 13.564 35.3092 13.1907 35.4959 12.864C35.6826 12.528 35.9719 12.248 36.3639 12.024C36.7559 11.8 37.2506 11.6413 37.8479 11.548L40.3399 11.142V12.542L38.1979 12.906C37.8339 12.9713 37.5632 13.088 37.3859 13.256C37.2086 13.424 37.1199 13.6433 37.1199 13.914C37.1199 14.1753 37.2179 14.3853 37.4139 14.544C37.6192 14.6933 37.8712 14.768 38.1699 14.768C38.5526 14.768 38.8886 14.6887 39.1779 14.53C39.4766 14.362 39.7052 14.1333 39.8639 13.844C40.0319 13.5547 40.1159 13.2373 40.1159 12.892V10.932C40.1159 10.6053 39.9852 10.3347 39.7239 10.12C39.4719 9.896 39.1359 9.784 38.7159 9.784C38.3239 9.784 37.9739 9.89133 37.6659 10.106C37.3672 10.3113 37.1479 10.5867 37.0079 10.932L35.5099 10.204C35.6592 9.80267 35.8926 9.45733 36.2099 9.168C36.5366 8.86933 36.9192 8.636 37.3579 8.468C37.7966 8.3 38.2726 8.216 38.7859 8.216C39.4112 8.216 39.9619 8.33267 40.4379 8.566C40.9139 8.79 41.2826 9.10733 41.5439 9.518C41.8146 9.91933 41.9499 10.3907 41.9499 10.932V16H40.2139V14.698L40.6059 14.67C40.4099 14.9967 40.1766 15.272 39.9059 15.496C39.6352 15.7107 39.3272 15.8787 38.9819 16C38.6366 16.112 38.2539 16.168 37.8339 16.168ZM47.257 19.08C46.6877 19.08 46.1603 18.9867 45.675 18.8C45.1897 18.6133 44.7697 18.352 44.415 18.016C44.0697 17.6893 43.8177 17.302 43.659 16.854L45.367 16.21C45.479 16.5647 45.6983 16.8493 46.025 17.064C46.361 17.288 46.7717 17.4 47.257 17.4C47.6303 17.4 47.957 17.33 48.237 17.19C48.5263 17.05 48.7503 16.8447 48.909 16.574C49.0677 16.3127 49.147 15.9953 49.147 15.622V13.886L49.497 14.306C49.2357 14.7633 48.8857 15.1087 48.447 15.342C48.0083 15.5753 47.509 15.692 46.949 15.692C46.2397 15.692 45.605 15.5287 45.045 15.202C44.485 14.8753 44.0463 14.4273 43.729 13.858C43.4117 13.2887 43.253 12.6493 43.253 11.94C43.253 11.2213 43.4117 10.582 43.729 10.022C44.0463 9.462 44.4803 9.02333 45.031 8.706C45.5817 8.37933 46.207 8.216 46.907 8.216C47.4763 8.216 47.9757 8.33733 48.405 8.58C48.8437 8.81333 49.2077 9.154 49.497 9.602L49.245 10.064V8.384H50.981V15.622C50.981 16.2847 50.8177 16.8773 50.491 17.4C50.1737 17.9227 49.735 18.3333 49.175 18.632C48.6243 18.9307 47.985 19.08 47.257 19.08ZM47.173 13.998C47.565 13.998 47.9057 13.914 48.195 13.746C48.4937 13.5687 48.727 13.326 48.895 13.018C49.063 12.71 49.147 12.3553 49.147 11.954C49.147 11.562 49.0583 11.212 48.881 10.904C48.713 10.5867 48.4797 10.3393 48.181 10.162C47.8917 9.98467 47.5557 9.896 47.173 9.896C46.7903 9.896 46.445 9.98467 46.137 10.162C45.829 10.3393 45.5863 10.5867 45.409 10.904C45.241 11.212 45.157 11.562 45.157 11.954C45.157 12.346 45.241 12.696 45.409 13.004C45.5863 13.312 45.8243 13.5547 46.123 13.732C46.431 13.9093 46.781 13.998 47.173 13.998ZM55.5078 16.168C54.6958 16.168 53.9865 15.9767 53.3798 15.594C52.7825 15.202 52.3718 14.6747 52.1478 14.012L53.5198 13.354C53.7158 13.7833 53.9865 14.1193 54.3318 14.362C54.6865 14.6047 55.0785 14.726 55.5078 14.726C55.8438 14.726 56.1098 14.6513 56.3058 14.502C56.5018 14.3527 56.5998 14.1567 56.5998 13.914C56.5998 13.7647 56.5578 13.6433 56.4738 13.55C56.3991 13.4473 56.2918 13.3633 56.1518 13.298C56.0211 13.2233 55.8765 13.1627 55.7178 13.116L54.4718 12.766C53.8278 12.5793 53.3378 12.2947 53.0018 11.912C52.6751 11.5293 52.5118 11.0767 52.5118 10.554C52.5118 10.0873 52.6285 9.68133 52.8618 9.336C53.1045 8.98133 53.4358 8.706 53.8558 8.51C54.2851 8.314 54.7751 8.216 55.3258 8.216C56.0445 8.216 56.6791 8.38867 57.2298 8.734C57.7805 9.07933 58.1725 9.56467 58.4058 10.19L57.0058 10.848C56.8751 10.5027 56.6558 10.2273 56.3478 10.022C56.0398 9.81667 55.6945 9.714 55.3118 9.714C55.0038 9.714 54.7611 9.784 54.5838 9.924C54.4065 10.064 54.3178 10.246 54.3178 10.47C54.3178 10.61 54.3551 10.7313 54.4298 10.834C54.5045 10.9367 54.6071 11.0207 54.7378 11.086C54.8778 11.1513 55.0365 11.212 55.2138 11.268L56.4318 11.632C57.0571 11.8187 57.5378 12.0987 57.8738 12.472C58.2191 12.8453 58.3918 13.3027 58.3918 13.844C58.3918 14.3013 58.2705 14.7073 58.0278 15.062C57.7851 15.4073 57.4491 15.678 57.0198 15.874C56.5905 16.07 56.0865 16.168 55.5078 16.168Z" fill="#475569" />
    </g>
    <defs>
      <clipPath id="clip0_1010_7680">
        <rect width="59" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>

)


const TagIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M3 6a2 2 0 0 1 2-2h4.6a2 2 0 0 1 1.4.6l5 5a2 2 0 0 1 0 2.8l-2.6 2.6a2 2 0 0 1-2.8 0l-5-5A2 2 0 0 1 5 9.6V6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="7" cy="7" r="1" fill="currentColor" />
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

const ProductIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M3.33337 6.66667L10 3.33334L16.6667 6.66667V13.3333L10 16.6667L3.33337 13.3333V6.66667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M3.33337 6.66667L10 10L16.6667 6.66667" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 10V16.6667" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const CategoriesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className}>
    <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

export const dashboardSidebarLinks = [
  { label: 'Categories', icon: CategoriesIcon, activeIcon: CategoriesIcon },
  { label: 'Accreditation', icon: AwardIcon, activeIcon: AccreditationActiveIcon },
  { label: 'Testimonials', icon: QuoteIcon, activeIcon: TestimonialActiveIcon },
  { label: 'Forms', icon: FormIcon, activeIcon: FormActiveIcon },
  { label: 'Contact', icon: ContactIcon, activeIcon: ContactActiveIcon },
]

export default DashboardPage
