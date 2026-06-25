import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/routes/route-paths";
import { SEO } from "@/components/layout/seo";
import { useRegister } from "@/features/auth/hooks/use-register";
import { useAuthStore } from "@/store/auth-store";

// Enhance validation schema to include confirmPassword
const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore.getState();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const registerMutation = useRegister();

  const onSubmit = async (data: RegisterSchema) => {
    try {
      // Remove confirmPassword before sending to API
      const { ...submitData } = data;
      const response = await registerMutation.mutateAsync(submitData);
      setAccessToken(response.accessToken);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      // Ideally show an error toast or error message below the form
      // For simplicity, just log to console
      console.log(error);
    }
  };

  return (
    <>
      <SEO
        title="Register"
        description="Create an account and start organizing projects with collaborative Kanban boards and calendars."
      />
      <Card className="border-0 shadow-none">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>Get started with KanbanCal for free</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                placeholder="Alex Morgan"
                autoComplete="name"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 text-muted-foreground hover:text-primary focus:outline-none"
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Must be at least 6 characters with one number.
              </p>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                  aria-invalid={!!errors.confirmPassword}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 text-muted-foreground hover:text-primary focus:outline-none"
                  onClick={() => setShowConfirmPassword((show) => !show)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={isSubmitting || registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Creating account..."
                : "Create account"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button">
              Google
            </Button>
            <Button variant="outline" type="button">
              GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
