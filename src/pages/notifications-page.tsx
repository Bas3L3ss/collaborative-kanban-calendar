import type { ComponentType } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  AlertCircle,
  AtSign,
  Bell,
  CheckCheck,
  ClipboardList,
  UserPlus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications } from "@/mock-data";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/layout/seo";
import type { NotificationItem } from "@/features/notifications/types";

const typeIcons: Record<
  NotificationItem["type"],
  ComponentType<{ className?: string }>
> = {
  mention: AtSign,
  assignment: UserPlus,
  deadline: AlertCircle,
  update: ClipboardList,
};

function NotificationRow({ notification }: { notification: NotificationItem }) {
  const Icon = typeIcons[notification.type];

  return (
    <div
      className={cn(
        "flex gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50",
        !notification.read && "border-primary/20 bg-primary/5",
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          notification.read ? "bg-muted" : "bg-primary/10",
        )}
      >
        <Icon
          className={cn(
            "size-4",
            notification.read ? "text-muted-foreground" : "text-primary",
          )}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium">{notification.title}</p>
          {!notification.read && (
            <span className="size-2 shrink-0 rounded-full bg-primary" />
          )}
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {notification.message}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {formatDistanceToNow(parseISO(notification.timestamp), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
}

export function NotificationsPage() {
  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  return (
    <>
      <SEO
        title="Notifications"
        description="Stay updated with task assignments, mentions, workspace updates, and team activity."
      />

      <div className="space-y-6 p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated on mentions, assignments, and deadlines.
            </p>
          </div>
          <Button variant="outline" size="sm">
            <CheckCheck className="size-4" />
            Mark all as read
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-1.5">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge variant="secondary" className="ml-1.5">
                {unread.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="size-5" />
                  Notification Feed
                </CardTitle>
                <CardDescription>
                  Recent activity and alerts from your workspace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <NotificationRow
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread" className="mt-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Unread Notifications</CardTitle>
                <CardDescription>
                  {unread.length} notification{unread.length !== 1 && "s"}{" "}
                  require your attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {unread.length > 0 ? (
                  unread.map((notification) => (
                    <NotificationRow
                      key={notification.id}
                      notification={notification}
                    />
                  ))
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    You&apos;re all caught up!
                  </p>
                )}
              </CardContent>
            </Card>

            {read.length > 0 && (
              <Card className="mt-4 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base text-muted-foreground">
                    Earlier
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {read.map((notification) => (
                    <NotificationRow
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
