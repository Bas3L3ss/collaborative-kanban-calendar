import { Bell, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";
import { notifications } from "@/mock-data";
import { ROUTES } from "@/routes/route-paths";
import { useSidebarStore } from "@/store/sidebar-store";
import { useUser } from "@/features/auth/hooks/use-user";
import { getInitials } from "@/utils/get-initials";
import type { User } from "@/features/auth/types";

function UserAvatarMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-8 rounded-full p-0">
          <Avatar size="sm">
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{user.name}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={ROUTES.SETTINGS}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={ROUTES.LOGIN}>Sign out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserAvatarSkeleton() {
  return (
    <Button
      variant="ghost"
      className="relative size-8 rounded-full p-0"
      disabled
    >
      <Avatar size="sm">
        <AvatarFallback>
          <span className="text-xs opacity-50">--</span>
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}

export function Navbar() {
  const { data, isLoading } = useUser();
  const { mobileOpen, setMobileOpen } = useSidebarStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const currentUser: User | undefined = data?.user;

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks, boards, or people..."
            className="pl-9"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to={ROUTES.NOTIFICATIONS}>
              <Bell className="size-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 size-5 justify-center rounded-full p-0 text-[10px]">
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>

          <ModeToggle />

          {isLoading || !currentUser ? (
            <UserAvatarSkeleton />
          ) : (
            <UserAvatarMenu user={currentUser} />
          )}
        </div>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <Sidebar className="w-full border-0" />
        </SheetContent>
      </Sheet>
    </>
  );
}
