import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2F7AE5]">За нас</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2F7AE5] dark:hover:text-[#2F7AE5] transition-colors"
                >
                  За нас
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2F7AE5] dark:hover:text-[#2F7AE5] transition-colors"
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2F7AE5] dark:hover:text-[#2F7AE5] transition-colors"
                >
                  Въпроси
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2F7AE5] dark:hover:text-[#2F7AE5] transition-colors"
                >
                  Ресурси
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2F7AE5]">Ресурси</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2F7AE5] dark:hover:text-[#2F7AE5] transition-colors"
                >
                  Задачи
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2F7AE5] dark:hover:text-[#2F7AE5] transition-colors"
                >
                  Теореми
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2F7AE5] dark:hover:text-[#2F7AE5] transition-colors"
                >
                  Колекции
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2F7AE5] dark:hover:text-[#2F7AE5] transition-colors"
                >
                  Методи
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2F7AE5]">Правна информация</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2F7AE5] dark:hover:text-[#2F7AE5] transition-colors"
                >
                  Правна информация
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2F7AE5]">Контакти</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-[#2F7AE5] mr-2 mt-0.5" />
                <a
                  href="mailto:ceo@maths.bg"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2F7AE5] dark:hover:text-[#2F7AE5] transition-colors"
                >
                  ceo@maths.bg
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-[#2F7AE5] mr-2 mt-0.5" />
                <a
                  href="tel:+359895791769"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2F7AE5] dark:hover:text-[#2F7AE5] transition-colors"
                >
                  +359 895 791 769
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-block bg-[#2F7AE5] text-white px-4 py-2 rounded-md hover:bg-[#2F7AE5]/90 transition-colors"
              >
                Свържете се с нас
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} maths.bg. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  )
}
