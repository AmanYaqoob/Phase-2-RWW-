"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Info, Shield } from "lucide-react"

export function DocumentationButton({ onClick }) {
  return (
    <Button variant="outline" size="sm" onClick={onClick} className="gap-1">
      <FileText className="h-4 w-4" />
      <span>Documentation</span>
    </Button>
  )
}

export function DocumentationPopup({ open, onOpenChange, onAccept }) {
  const [agreed, setAgreed] = useState(false)
  const [activeTab, setActiveTab] = useState("terms")

  const handleAccept = () => {
    if (agreed) {
      onAccept()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Retreat World Wide Documentation</DialogTitle>
          <DialogDescription>
            Please review and sign the following documentation before creating your account.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="terms" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Terms of Service
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Privacy Policy
            </TabsTrigger>
            <TabsTrigger value="guidelines" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              Guidelines
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4 border rounded-md p-4">
            <TabsContent value="terms" className="mt-0 space-y-4">
              <h3 className="text-lg font-semibold">Terms of Service</h3>
              <p>
                Welcome to Retreat World Wide. By accessing or using our platform, you agree to be bound by these Terms
                of Service.
              </p>
              <h4 className="font-medium mt-4">1. Acceptance of Terms</h4>
              <p>
                By registering for and using Retreat World Wide, you agree to be bound by these Terms, which form a
                legal agreement between you and Retreat World Wide. If you do not agree with any part of these Terms,
                you may not use our services.
              </p>
              <h4 className="font-medium mt-4">2. Description of Service</h4>
              <p>
                Retreat World Wide provides a platform connecting property owners, instructors, and vendors for the
                purpose of organizing and facilitating retreats and workshops. Our services include property listings,
                booking management, payment processing, and communication tools.
              </p>
              <h4 className="font-medium mt-4">3. User Accounts</h4>
              <p>
                To use certain features of our platform, you must register for an account. You agree to provide
                accurate, current, and complete information during the registration process and to update such
                information to keep it accurate, current, and complete.
              </p>
              <h4 className="font-medium mt-4">4. User Responsibilities</h4>
              <p>
                You are responsible for maintaining the confidentiality of your account information, including your
                password, and for all activity that occurs under your account. You agree to notify us immediately of any
                unauthorized use of your account.
              </p>
              <h4 className="font-medium mt-4">5. Fees and Payments</h4>
              <p>
                Retreat World Wide charges fees for certain services. All fees are non-refundable unless otherwise
                specified. We reserve the right to change our fees at any time with notice to users.
              </p>
              <h4 className="font-medium mt-4">6. Cancellation Policy</h4>
              <p>
                Cancellation policies vary depending on the property and booking. Each property listing will specify the
                applicable cancellation policy. Users agree to abide by these policies when making or accepting
                bookings.
              </p>
              <h4 className="font-medium mt-4">7. Intellectual Property</h4>
              <p>
                All content on the Retreat World Wide platform, including text, graphics, logos, and software, is the
                property of Retreat World Wide or its content suppliers and is protected by copyright laws.
              </p>
              <h4 className="font-medium mt-4">8. Limitation of Liability</h4>
              <p>
                Retreat World Wide is not liable for any damages arising from the use of our platform or services. We do
                not guarantee the accuracy, completeness, or usefulness of any information on the platform.
              </p>
              <h4 className="font-medium mt-4">9. Governing Law</h4>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
                Retreat World Wide is registered, without regard to its conflict of law provisions.
              </p>
              <h4 className="font-medium mt-4">10. Changes to Terms</h4>
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
                posting the new Terms on our platform and updating the "Last Updated" date.
              </p>
            </TabsContent>

            <TabsContent value="privacy" className="mt-0 space-y-4">
              <h3 className="text-lg font-semibold">Privacy Policy</h3>
              <p>
                This Privacy Policy describes how Retreat World Wide collects, uses, and shares your personal
                information when you use our platform.
              </p>
              <h4 className="font-medium mt-4">1. Information We Collect</h4>
              <p>
                We collect information you provide directly to us, such as your name, email address, phone number,
                payment information, and any other information you choose to provide. We also automatically collect
                certain information about your device and how you interact with our platform.
              </p>
              <h4 className="font-medium mt-4">2. How We Use Your Information</h4>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              </ul>
              <h4 className="font-medium mt-4">3. Sharing of Information</h4>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Other users of the platform as necessary to facilitate your bookings</li>
                <li>
                  Vendors, consultants, and other service providers who need access to such information to carry out
                  work on our behalf
                </li>
                <li>Law enforcement or other third parties in response to a legal request</li>
              </ul>
              <h4 className="font-medium mt-4">4. Data Retention</h4>
              <p>
                We store the information we collect about you for as long as is necessary for the purpose(s) for which
                we originally collected it. We may retain certain information for legitimate business purposes or as
                required by law.
              </p>
              <h4 className="font-medium mt-4">5. Security</h4>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, and
                unauthorized access, disclosure, alteration, and destruction.
              </p>
              <h4 className="font-medium mt-4">6. Your Rights</h4>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as the
                right to access, correct, or delete your personal information.
              </p>
              <h4 className="font-medium mt-4">7. Changes to this Privacy Policy</h4>
              <p>
                We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising
                the date at the top of the policy and, in some cases, we may provide you with additional notice.
              </p>
              <h4 className="font-medium mt-4">8. Contact Us</h4>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@retreatsworldwide.com.
              </p>
            </TabsContent>

            <TabsContent value="guidelines" className="mt-0 space-y-4">
              <h3 className="text-lg font-semibold">Platform Guidelines</h3>
              <p>
                These guidelines are designed to ensure a positive experience for all users of Retreat World Wide. By
                using our platform, you agree to follow these guidelines.
              </p>
              <h4 className="font-medium mt-4">1. Property Owner Guidelines</h4>
              <p>As a property owner, you agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate and complete information about your property</li>
                <li>Upload high-quality photos that accurately represent your property</li>
                <li>Respond to booking inquiries within 24 hours</li>
                <li>Honor all confirmed bookings</li>
                <li>Maintain your property in a clean, safe, and habitable condition</li>
                <li>Provide all amenities listed in your property description</li>
                <li>Respect the privacy of your guests</li>
                <li>Follow all local laws and regulations regarding short-term rentals</li>
              </ul>
              <h4 className="font-medium mt-4">2. Instructor Guidelines</h4>
              <p>As an instructor, you agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate information about your qualifications and experience</li>
                <li>Clearly describe the content and format of your workshops or retreats</li>
                <li>Communicate any special requirements or preparations to participants</li>
                <li>Respect the property and facilities you use for your events</li>
                <li>Maintain professional conduct with all participants</li>
                <li>Obtain any necessary permits or licenses for your activities</li>
                <li>Carry appropriate insurance for your events</li>
              </ul>
              <h4 className="font-medium mt-4">3. Vendor Guidelines</h4>
              <p>As a vendor, you agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate information about your products or services</li>
                <li>Deliver products or services as described and within the agreed timeframe</li>
                <li>Communicate promptly with customers</li>
                <li>Address any issues or complaints in a professional manner</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Maintain appropriate licenses and permits for your business</li>
              </ul>
              <h4 className="font-medium mt-4">4. General Conduct</h4>
              <p>All users of Retreat World Wide agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Treat others with respect and courtesy</li>
                <li>Communicate honestly and transparently</li>
                <li>Respect the privacy and personal information of others</li>
                <li>Not engage in discriminatory behavior or harassment</li>
                <li>Not use the platform for illegal activities</li>
                <li>Report any violations of these guidelines to Retreat World Wide</li>
              </ul>
              <h4 className="font-medium mt-4">5. Content Guidelines</h4>
              <p>When posting content on Retreat World Wide, you agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Not post false, misleading, or deceptive content</li>
                <li>Not post offensive, abusive, or inappropriate content</li>
                <li>Not infringe on the intellectual property rights of others</li>
                <li>Not post personal information about others without their consent</li>
                <li>Not post spam or engage in commercial solicitation outside the platform's intended use</li>
              </ul>
              <h4 className="font-medium mt-4">6. Enforcement</h4>
              <p>
                Retreat World Wide reserves the right to remove content, suspend accounts, or take other actions against
                users who violate these guidelines. Repeated or severe violations may result in permanent account
                termination.
              </p>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex items-center space-x-2 mt-4">
          <Checkbox id="agree" checked={agreed} onCheckedChange={setAgreed} />
          <label
            htmlFor="agree"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have read and agree to the Terms of Service, Privacy Policy, and Platform Guidelines
          </label>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAccept} disabled={!agreed}>
            Accept & Sign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
