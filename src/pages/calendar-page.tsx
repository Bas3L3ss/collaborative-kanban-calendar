import { formatDistanceToNow, parseISO } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { upcomingDeadlines } from "@/mock-data";
import { SEO } from "@/components/layout/seo";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mockEvents = [
  { date: 3, title: "Sprint planning", color: "bg-blue-500" },
  { date: 8, title: "Design review", color: "bg-violet-500" },
  { date: 12, title: "Release cutoff", color: "bg-destructive" },
  { date: 15, title: "Team retro", color: "bg-emerald-500" },
  { date: 22, title: "Q2 demo", color: "bg-amber-500" },
  { date: 28, title: "Auth deadline", color: "bg-destructive" },
];

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 25));
  const today = new Date(2026, 5, 25);

  const daysInMonth = new Date(2026, 6, 0).getDate();
  const firstDayOffset = (new Date(2026, 5, 1).getDay() + 6) % 7;

  return (
    <>
      <SEO
        title="Calendar"
        description="Track deadlines, upcoming events, and project schedules in a unified calendar view."
      />
      <div className="space-y-6 p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              View deadlines and scheduled events across your workspace.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="size-4" />
            </Button>
            <span className="min-w-32 text-center text-sm font-medium">
              June 2026
            </span>
            <Button variant="outline" size="icon">
              <ChevronRight className="size-4" />
            </Button>
            <Button variant="outline" size="sm">
              Today
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="size-5" />
                Month View
              </CardTitle>
              <CardDescription>
                Task due dates and team events for June 2026
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-px rounded-lg border bg-border overflow-hidden">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="bg-muted/50 px-2 py-2 text-center text-xs font-medium text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
                {Array.from({ length: firstDayOffset }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="min-h-24 bg-background p-2"
                  />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = mockEvents.filter((e) => e.date === day);
                  const isToday = day === today.getDate();

                  return (
                    <div
                      key={day}
                      className={`min-h-24 border-t bg-background p-2 ${
                        isToday ? "ring-2 ring-inset ring-primary" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex size-6 items-center justify-center rounded-full text-xs ${
                          isToday
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {day}
                      </span>
                      <div className="mt-1 space-y-1">
                        {dayEvents.map((event) => (
                          <div
                            key={event.title}
                            className="flex items-center gap-1 truncate rounded px-1 py-0.5 text-[10px]"
                          >
                            <span
                              className={`size-1.5 shrink-0 rounded-full ${event.color}`}
                            />
                            <span className="truncate">{event.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Date Picker</CardTitle>
                <CardDescription>Jump to a specific date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg border"
                />
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>
                  Tasks due in the next two weeks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDeadlines.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start justify-between gap-2 rounded-lg border p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {task.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {task.dueDate &&
                          formatDistanceToNow(parseISO(task.dueDate), {
                            addSuffix: true,
                          })}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0 capitalize">
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
