import { Kanban } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-muted p-10 lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Kanban className="size-5" />
          </div>
          <span className="text-xl font-semibold">KanbanCal</span>
        </div>
        <div className="space-y-4">
          <blockquote className="space-y-2">
            <p className="text-lg leading-relaxed">
              &ldquo;KanbanCal helped our team ship faster by keeping tasks,
              deadlines, and collaboration in one place.&rdquo;
            </p>
            <footer className="text-sm text-muted-foreground">
              — Alex Morgan, Product Manager at Acme
            </footer>
          </blockquote>
        </div>
        <p className="text-sm text-muted-foreground">
          Trusted by 2,000+ teams worldwide
        </p>
      </div>
      <div className="flex flex-col items-center justify-center p-6 md:p-10">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Kanban className="size-5" />
          </div>
          <span className="text-xl font-semibold">KanbanCal</span>
        </div>
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
