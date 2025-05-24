import { User, Building, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function UserRoleBadge({ role, className }) {
  const roleConfig = {
    instructor: {
      label: "Property Owner",
      icon: User,
      className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    },
    "property-owner": {
      label: "Property Owner",
      icon: Building,
      className: "bg-green-100 text-green-800 hover:bg-green-200",
    },
    vendor: {
      label: "Vendor",
      icon: Briefcase,
      className: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    },
  }

  const config = roleConfig[role] || roleConfig.instructor

  return (
    <Badge variant="outline" className={cn("gap-1 py-1.5", config.className, className)}>
      <config.icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  )
}
