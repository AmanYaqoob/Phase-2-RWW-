"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Building, Briefcase } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "instructor",
  })
  const [showDocumentation, setShowDocumentation] = useState(false)
  const [documentSigned, setDocumentSigned] = useState(false)
  const [showApprovalMessage, setShowApprovalMessage] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowDocumentation(true)
  }

  const handleSignDocument = () => {
    setDocumentSigned(true)
  }

  const handleCompleteSignup = () => {
    setShowDocumentation(false)
    setShowApprovalMessage(true)

    // In a real app, you would submit the form data to your backend here
    console.log("Form submitted:", formData)
  }

  const handleCloseApproval = () => {
    router.push("/login")
  }

  const roleIcons = {
    instructor: <User className="h-6 w-6 text-black" />,
    property_owner: <Building className="h-6 w-6 text-black" />,
    vendor: <Briefcase className="h-6 w-6 text-black" />,
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Image with overlay text */}
      <div className="relative hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-gray-900/50 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop"
          alt="Luxury retreat"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-12 z-20">
          <h1 className="text-5xl font-bold text-white mb-4">Join Our Community</h1>
          <p className="text-xl text-white/90">Create an account to start your journey with Retreat World Wide.</p>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-8">
              <span className="text-black">Retreat</span> World Wide
            </Link>
            <h2 className="text-3xl font-bold">Create an account</h2>
            <p className="text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-black hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="h-12 border-2 focus:border-black transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-12 border-2 focus:border-black transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 border-2 focus:border-black transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-12 border-2 focus:border-black transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="h-12 border-2 focus:border-black transition-colors"
              />
            </div>

            <div className="space-y-3">
              <Label>I am a:</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={handleRoleChange}
                className="grid grid-cols-3 gap-4 pt-2"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors
                    ${formData.role === "instructor" ? "bg-black text-white" : "bg-gray-100"}
                  `}
                  >
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="instructor" id="instructor" />
                    <Label htmlFor="instructor" className="text-sm">Instructor</Label>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors
                    ${formData.role === "property_owner" ? "bg-black text-white" : "bg-gray-100"}
                  `}
                  >
                    <Building className="h-6 w-6" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="property_owner" id="property_owner" />
                    <Label htmlFor="property_owner" className="text-sm">Property Owner</Label>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors
                    ${formData.role === "vendor" ? "bg-black text-white" : "bg-gray-100"}
                  `}
                  >
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vendor" id="vendor" />
                    <Label htmlFor="vendor" className="text-sm">Vendor</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-black hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-black hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full h-12 text-base bg-black hover:bg-gray-800 text-white">
              Create Account
            </Button>
          </form>
        </div>
      </div>

      {/* Documentation Dialog */}
      <Dialog open={showDocumentation} onOpenChange={setShowDocumentation}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms of Service & Documentation</DialogTitle>
            <DialogDescription>
              Please review and sign the following documentation to complete your registration.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="border rounded-md p-4 bg-muted/50">
              <h3 className="font-semibold mb-2">Terms of Service</h3>
              <div className="text-sm space-y-2 max-h-40 overflow-y-auto">
                <p>Welcome to Retreat Worldwide. By signing up, you agree to our Terms of Service.</p>
                <p>
                  1. <strong>Account Responsibilities:</strong> You are responsible for maintaining the confidentiality
                  of your account information.
                </p>
                <p>
                  2. <strong>User Conduct:</strong> You agree not to use the service for any illegal or unauthorized
                  purpose.
                </p>
                <p>
                  3. <strong>Content Ownership:</strong> You retain all rights to the content you post on our platform.
                </p>
                <p>
                  4. <strong>Service Changes:</strong> We reserve the right to modify or terminate the service for any
                  reason.
                </p>
                <p>
                  5. <strong>Limitation of Liability:</strong> We shall not be liable for any indirect, incidental,
                  special, consequential or punitive damages.
                </p>
              </div>
            </div>

            <div className="border rounded-md p-4 bg-muted/50">
              <h3 className="font-semibold mb-2">Privacy Policy</h3>
              <div className="text-sm space-y-2 max-h-40 overflow-y-auto">
                <p>
                  Your privacy is important to us. This Privacy Policy explains how we collect, use, and disclose
                  information about you.
                </p>
                <p>
                  1. <strong>Information Collection:</strong> We collect information you provide directly to us when you
                  create an account.
                </p>
                <p>
                  2. <strong>Use of Information:</strong> We use the information we collect to provide, maintain, and
                  improve our services.
                </p>
                <p>
                  3. <strong>Information Sharing:</strong> We do not share your personal information with third parties
                  except as described in this policy.
                </p>
                <p>
                  4. <strong>Data Security:</strong> We take reasonable measures to help protect your personal
                  information from loss, theft, misuse, and unauthorized access.
                </p>
                <p>
                  5. <strong>Your Choices:</strong> You can access, update, or delete your account information at any
                  time.
                </p>
              </div>
            </div>

            {formData.role !== "guest" && (
              <div className="border rounded-md p-4 bg-muted/50">
                <h3 className="font-semibold mb-2">Professional Guidelines</h3>
                <div className="text-sm space-y-2 max-h-40 overflow-y-auto">
                  <p>As a {formData.role.replace("_", " ")}, you agree to follow these professional guidelines:</p>
                  <p>
                    1. <strong>Accurate Information:</strong> Provide accurate and truthful information about your
                    services or properties.
                  </p>
                  <p>
                    2. <strong>Responsiveness:</strong> Respond to inquiries and bookings in a timely manner.
                  </p>
                  <p>
                    3. <strong>Quality Standards:</strong> Maintain high standards of quality and safety for all
                    services provided.
                  </p>
                  <p>
                    4. <strong>Compliance:</strong> Comply with all applicable laws and regulations in your
                    jurisdiction.
                  </p>
                  <p>
                    5. <strong>Reviews:</strong> Accept and respond professionally to all reviews and feedback.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox id="sign" checked={documentSigned} onCheckedChange={() => handleSignDocument()} />
              <label
                htmlFor="sign"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to the Terms of Service, Privacy Policy, and applicable guidelines
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDocumentation(false)}>
              Cancel
            </Button>
            <Button onClick={handleCompleteSignup} disabled={!documentSigned} className="bg-black hover:bg-gray-800 text-white">
              Complete Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admin Approval Message */}
      <Dialog open={showApprovalMessage} onOpenChange={setShowApprovalMessage}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Submitted</DialogTitle>
            <DialogDescription>Thank you for registering with Retreat Worldwide!</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="mb-4">Your account has been created and is pending approval by our administrators.</p>
            <p className="mb-4">
              This process typically takes 24-48 hours. You will receive an email notification once your account has
              been approved.
            </p>
            <p>If you have any questions, please contact our support team at support@retreatworldwide.com</p>
          </div>

          <DialogFooter>
            <Button onClick={handleCloseApproval} className="bg-black hover:bg-gray-800 text-white">
              Go to Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
