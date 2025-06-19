"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import SiteHeader from "../components/SiteHeader"

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Format the email body
    const body = `Име: ${formData.name}

Съобщение:
${formData.message}`

    // Create the mailto URL
    const mailtoUrl = `mailto:ceo@maths.bg?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`

    // Open the user's email client
    window.open(mailtoUrl, "_blank")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SiteHeader />

      <main className="mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Контакт</h1>

        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-[#2F7AE5] flex items-center">
                <span className="mr-2 text-2xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">📞</span>
                Свържете се с нас
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1 flex items-center">
                    <span className="mr-2 text-xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">📧</span>
                    Имейл
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <a href="mailto:ceo@maths.bg" className="hover:text-[#2F7AE5] transition-colors">
                      ceo@maths.bg
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1 flex items-center">
                    <span className="mr-2 text-xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">📱</span>
                    Телефон
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <a href="tel:+359895791769" className="hover:text-[#2F7AE5] transition-colors">
                      +359 895 791 769
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-[#2F7AE5] flex items-center">
                <span className="mr-2 text-2xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">✉️</span>
                Изпратете ни съобщение
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Име
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F7AE5] dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Тема
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F7AE5] dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Съобщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F7AE5] dark:bg-gray-700 dark:border-gray-600"
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#2F7AE5] text-white py-2 px-4 rounded-md hover:bg-[#2F7AE5]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2F7AE5] focus:ring-offset-2"
                  >
                    Изпрати имейл
                  </button>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                  Натискането на бутона ще отвори вашия имейл клиент с предварително попълнено съобщение.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
