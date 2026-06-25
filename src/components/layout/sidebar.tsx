import type { ComponentType } from "react";
import {
  Activity,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Kanban,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { boards } from "@/mock-data";
import { boardPath, ROUTES } from "@/routes/route-paths";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { label: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: "Calendar", href: ROUTES.CALENDAR, icon: Calendar },
  { label: "Notifications", href: ROUTES.NOTIFICATIONS, icon: Bell },
  { label: "Activity", href: ROUTES.ACTIVITY, icon: Activity },
  { label: "Settings", href: ROUTES.SETTINGS, icon: Settings },
];

interface SidebarProps {
  className?: string;
}

function NavLink({
  href,
  label,
  icon: Icon,
  collapsed,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  collapsed: boolean;
}) {
  const location = useLocation();
  const isActive =
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  const linkContent = (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-2",
      )}
    >
      <Icon className="size-4 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return linkContent;
}

export function Sidebar({ className }: SidebarProps) {
  const { collapsed, toggleCollapsed } = useSidebarStore();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center border-b border-sidebar-border px-4",
          collapsed ? "justify-center px-2" : "justify-between",
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Kanban className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">KanbanCal</p>
              <p className="text-xs text-muted-foreground">Acme Workspace</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Kanban className="size-4" />
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <Separator className="my-4" />

        {!collapsed && (
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Boards
          </p>
        )}
        <nav className="space-y-1">
          {boards.map((board) => {
            const href = boardPath(board.id);
            const isActive = location.pathname === href;

            const boardLink = (
              <Link
                key={board.id}
                to={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center px-2",
                )}
              >
                <span
                  className={cn("size-2.5 shrink-0 rounded-full", board.color)}
                />
                {!collapsed && (
                  <span className="truncate font-medium">{board.name}</span>
                )}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={board.id}>
                  <TooltipTrigger asChild>{boardLink}</TooltipTrigger>
                  <TooltipContent side="right">{board.name}</TooltipContent>
                </Tooltip>
              );
            }

            return boardLink;
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          className={cn("w-full", !collapsed && "justify-start")}
          onClick={toggleCollapsed}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <>
              <ChevronLeft className="size-4" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
