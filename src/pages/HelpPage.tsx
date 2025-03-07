"use client"

import { useState } from "react"
import { HelpCircle, Book, MessageSquare, Video, ChevronDown, Search, ExternalLink } from "lucide-react"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "How do I create a new task?",
      answer:
        "To create a new task, click on the 'Add New' button in the top right corner of the dashboard. Fill in the task details in the form that appears and click 'Save'.",
    },
    {
      question: "How do I assign a task to someone?",
      answer:
        "When creating or editing a task, you'll see an 'Assignees' field where you can select one or more team members to assign the task to.",
    },
    {
      question: "How do I change the status of a task?",
      answer:
        "You can change the status of a task by dragging it from one column to another in the Kanban board view, or by editing the task and changing the status field.",
    },
    {
      question: "Can I set due dates for tasks?",
      answer: "Yes, when creating or editing a task, you can set a due date using the date picker in the task form.",
    },
    {
      question: "How do I filter tasks?",
      answer:
        "You can filter tasks using the filter options at the top of the dashboard. You can filter by status, assignee, priority, and more.",
    },
    {
      question: "How do I export my tasks?",
      answer:
        "To export your tasks, go to the Settings page and look for the 'Export Data' option. You can export your tasks in CSV or JSON format.",
    },
  ]

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of using the Kanban Dashboard",
      icon: Book,
      link: "#",
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step tutorials on how to use the dashboard",
      icon: Video,
      link: "#",
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      icon: ExternalLink,
      link: "#",
    },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Help & Support</h1>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search for help..."
            className="pl-10 py-6 text-lg dark:bg-gray-800 dark:border-gray-700"
          />
          <Button className="absolute right-2 top-2">Search</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <resource.icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">{resource.title}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{resource.description}</p>
          </a>
        ))}
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left font-medium"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span>{faq.question}</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
              </button>

              {openFaq === index && (
                <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-10 bg-primary/5 rounded-xl border border-primary/20 p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">Still need help?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our support team is ready to assist you with any questions or issues.
          </p>
          <Button>Contact Support</Button>
        </div>
      </div>
    </div>
  )
}

