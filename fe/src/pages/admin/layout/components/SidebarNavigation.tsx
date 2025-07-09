import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronRight,
  FileText,
  MapPin,
  ClipboardList,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocation, useNavigate } from "react-router-dom"
import { ROUTES } from "@/utils/route"

interface NavigationItem {
  id: string
  title: string
  icon?: React.ReactNode
  href?: string
  children?: NavigationItem[]
  isExpandable?: boolean
}

const navigationItems: NavigationItem[] = [
  {
    id: "initial-response",
    title: "Initial Response",
    icon: <FileText className="h-4 w-4" />,
    isExpandable: true,
    children: [
      {
        id: "response-management",
        title: "Response Management",
        href: ROUTES.RESPONSE_MANAGEMENT,
      },
      {
        id: "dispatch-time",
        title: "Dispatch Time",
        href: ROUTES.DISPATCH_TIME,
      },
      { id: "arrival-time", title: "Arrival Time", href: ROUTES.ARRIVAL_TIME },
      {
        id: "assigned-officers",
        title: "Assigned Officers",
        href: ROUTES.ASSIGNED_OFFICERS,
      },
      {
        id: "preliminary-assessment",
        title: "Preliminary Assessment",
        href: ROUTES.PRELIMINARY_ASSESSMENT,
      },
      {
        id: "preservation-measures",
        title: "Preservation Measures",
        href: ROUTES.PRESERVATION_MEASURES,
      },
      {
        id: "medical-rescue-info",
        title: "Medical/Rescue Info",
        href: ROUTES.MEDICAL_RESCUE_INFO,
      },
    ],
  },
  {
    id: "scene-information",
    title: "Scene Information",
    icon: <MapPin className="h-4 w-4" />,
    isExpandable: true,
    children: [
      {
        id: "scene-management",
        title: "Scene Management",
        href: ROUTES.SCENE_MANAGEMENT,
      },
      {
        id: "initial-statements",
        title: "Initial Statements",
        href: ROUTES.INITIAL_STATEMENTS,
      },
      {
        id: "images-videos",
        title: "Images & Videos",
        href: ROUTES.IMAGES_VIDEOS,
      },
      {
        id: "preliminary-physical-evidence",
        title: "Preliminary Physical Evidence",
        href: ROUTES.PHYSICAL_EVIDENCE,
      },
    ],
  },
  {
    id: "field-summary",
    title: "Field Report Summary",
    icon: <ClipboardList className="h-4 w-4" />,
    isExpandable: true,
    children: [
      {
        id: "report-summary",
        title: "Summary",
        href: ROUTES.REPORT_SUMMARY,
      },
    ],
  },
]

interface SidebarNavigationProps {
  isCollapsed: boolean
  onToggle: () => void
}

const SidebarNavigation = ({
  isCollapsed,
  onToggle,
}: SidebarNavigationProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleNavigation = (href: string) => {
    navigate(href)
  }
  const isRouteActive = (itemHref: string) => {
    if (!itemHref) return false

    const allRoutes = Object.values(ROUTES)

    if (pathname === itemHref) {
      return true
    }

    if (pathname.startsWith(itemHref + "/")) {
      return allRoutes.includes(pathname)
    }

    return false
  }

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id)
    const hasChildren = item.children && item.children.length > 0
    const isActive = item.href ? isRouteActive(item.href) : false

    return (
      <div key={item.id} className="w-full">
        <Button
          variant="ghost"
          className={cn(
            "w-full h-auto py-2 text-left font-normal",
            isCollapsed ? "justify-center" : "justify-start",
            level === 0 ? "text-sm" : "text-xs ml-2",
            isActive && "bg-blue-300 text-blue-900 font-medium",
            level === 0
              ? "bg-gray-600 text-gray-100 hover:bg-gray-500"
              : "text-white hover:text-white/80 hover:bg-white/10"
          )}
          onClick={() => {
            if (hasChildren && item.isExpandable) {
              toggleExpanded(item.id)
            } else if (item.href) {
              handleNavigation(item.href)
            }
          }}
        >
          <div
            className={`flex items-center justify-between ${!isCollapsed ? "w-full" : ""}`}
          >
            <div
              className={`flex items-center gap-2 ${isCollapsed ? "justify-center" : ""}`}
            >
              {item.icon}
              {!isCollapsed && <span className="truncate">{item.title}</span>}
            </div>
            {!isCollapsed && hasChildren && item.isExpandable && (
              <div className="flex-shrink-0">
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </div>
            )}
          </div>
        </Button>

        {!isCollapsed && hasChildren && isExpanded && (
          <div className="ml-2 mt-1 space-y-1">
            {item.children?.map((child) =>
              renderNavigationItem(child, level + 1)
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "h-full bg-gray-700 text-white transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-full"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-white truncate">
              Case Management
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-gray-300 hover:text-white hover:bg-gray-600 p-1"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="p-4 space-y-1">
        {navigationItems.map((item) => renderNavigationItem(item))}
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-gray-600">
        {!isCollapsed && (
          <div className="text-xs text-gray-400">
            <p>Case ID: #2024-001</p>
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarNavigation
