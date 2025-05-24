"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Predefined user credentials
    const users = [
      {
        email: "admin123@gmail.com",
        password: "Admin123",
        name: "John Instructor",
        role: "instructor",
      },
      {
        email: "admin1234@gmail.com",
        password: "Admin1234",
        name: "Sarah Property",
        role: "property-owner",
      },
      {
        email: "admin12345@gmail.com",
        password: "Admin12345",
        name: "Mike Vendor",
        role: "vendor",
      },
    ]

    // Find matching user
    const user = users.find((u) => u.email === email && u.password === password)

    setTimeout(() => {
      if (user) {
        // Store user in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: user.name,
            email: user.email,
            role: user.role,
            approved: true,
          }),
        )
        router.push("/dashboard")
      } else {
        setError("Invalid email or password. Please try again.")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Image with overlay text */}
      <div className="relative hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-red-900/50 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury retreat"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-12 z-20">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome Back</h1>
          <p className="text-xl text-white/90">Sign in to continue your journey with us.</p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-8">
              <span className="text-red-600">Retreat</span> World Wide
            </Link>
            <h2 className="text-3xl font-bold">Sign in to your account</h2>
            <p className="text-muted-foreground mt-2">
              Or{" "}
              <Link href="/signup" className="text-red-600 hover:underline">
                create a new account
              </Link>
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com or yourusername"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-red-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <Button type="submit" className="w-full h-12 text-base bg-red-600 hover:bg-red-700" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="p-2 border rounded-md">
                <p>
                  <strong>Instructor:</strong> admin123@gmail.com / Admin123
                </p>
              </div>
              <div className="p-2 border rounded-md">
                <p>
                  <strong>Property Owner:</strong> admin1234@gmail.com / Admin1234
                </p>
              </div>
              <div className="p-2 border rounded-md">
                <p>
                  <strong>Vendor:</strong> admin12345@gmail.com / Admin12345
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-red-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-red-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  )
}
