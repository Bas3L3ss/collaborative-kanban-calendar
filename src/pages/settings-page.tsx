import { Bell, Globe, Lock, Palette, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { currentUser, workspaceSettings } from "@/mock-data";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function SettingsPage() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile and workspace preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="size-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="workspace">
            <Globe className="size-4" />
            Workspace
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="size-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="size-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change avatar
                  </Button>
                  <p className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" defaultValue={currentUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={currentUser.email}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={currentUser.role} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell your team a little about yourself..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspace">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Workspace Settings</CardTitle>
              <CardDescription>
                Configure your team workspace preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">Workspace name</Label>
                <Input
                  id="workspace-name"
                  defaultValue={workspaceSettings.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workspace-slug">Workspace URL</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    kanbancal.app/
                  </span>
                  <Input
                    id="workspace-slug"
                    defaultValue={workspaceSettings.slug}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    defaultValue={workspaceSettings.timezone}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="week-start">Week starts on</Label>
                  <Input
                    id="week-start"
                    defaultValue={workspaceSettings.weekStartsOn}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm font-medium">Team members</p>
                  <p className="text-sm text-muted-foreground">
                    12 members in this workspace
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage members
                </Button>
              </div>

              <div className="flex justify-end">
                <Button>Save workspace</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Task assignments",
                  description: "When a task is assigned to you",
                  enabled: true,
                },
                {
                  title: "Mentions",
                  description: "When someone mentions you in a comment",
                  enabled: true,
                },
                {
                  title: "Deadline reminders",
                  description: "Reminders for upcoming due dates",
                  enabled: true,
                },
                {
                  title: "Board updates",
                  description: "When boards you follow are updated",
                  enabled: false,
                },
                {
                  title: "Weekly digest",
                  description: "Summary of workspace activity each week",
                  enabled: false,
                },
              ].map((pref) => (
                <div
                  key={pref.title}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="text-sm font-medium">{pref.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {pref.description}
                    </p>
                  </div>
                  <Badge variant={pref.enabled ? "default" : "secondary"}>
                    {pref.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how KanbanCal looks for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {["Light", "Dark", "System"].map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    className="flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div
                      className={`size-12 rounded-lg border ${
                        theme === "Light"
                          ? "bg-white"
                          : theme === "Dark"
                            ? "bg-zinc-900"
                            : "bg-gradient-to-br from-white to-zinc-900"
                      }`}
                    />
                    <span className="text-sm font-medium">{theme}</span>
                  </button>
                ))}
              </div>

              <Separator />

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Lock className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Compact mode</p>
                    <p className="text-sm text-muted-foreground">
                      Reduce spacing for a denser layout
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Disabled</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
