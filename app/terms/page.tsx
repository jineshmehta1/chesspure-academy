"use client"

import { motion } from "framer-motion"
import { FileText, Shield, Users, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const termsSection = [
  {
    id: "general",
    title: "General Terms",
    icon: FileText,
    content: [
      "Chesspure academy reserves all right to change, deny or reschedule any class, both online and offline.",
      "Governing law (jurisdiction): This Agreement shall be governed by and construed in accordance with the laws and the company is based in Andhra Pradesh (Visakhapatnam).",
      "Termination: Classes may be terminated mutually once service agreement has ended.",
      "Intellectual Property: Chesspure academy defends its coaches and employees from intellectual property infringement liabilities.",
    ],
  },
  {
    id: "refunds",
    title: "Refunds & Cancellation Policy",
    icon: CreditCard,
    content: [
      "No refunds or cancellations once fees are paid and classes/tournaments booked.",
      "Attendance is mandatory for booked sessions.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: Shield,
    content: [
      "We collect and use personal data per applicable laws and our Privacy Policy.",
      "Data is used to provide/improve service and communications.",
      "Student data is confidential and can be accessed or modified by users.",
      "We may use photos/videos for promotional purposes unless opted out.",
      "We ensure data security but cannot guarantee absolute security.",
    ],
  },
  // Add more sections per the full shared content...
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <section className="relative py-30 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Terms and Privacy Policy
            </h1>
            <p className="text-green-100 max-w-2xl mx-auto">
              Please read these legal terms carefully before using Chesspure academy services.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl space-y-10">
          {termsSection.map(({ id, title, icon: Icon, content }, i) => (
            <motion.div key={id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.1 }}>
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl text-gray-900">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-md flex items-center justify-center">
                      <Icon className="text-white w-6 h-6" />
                    </div>
                    <span>{title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                    {content.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
