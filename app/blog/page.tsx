import SiteHeader from "../components/SiteHeader"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Блог | maths.bg",
  description: "Статии и новини от света на математиката",
}

const blogPosts = [
  {
    id: 1,
    title: "Как да се подготвим ефективно за математическа олимпиада",
    excerpt:
      "Съвети и стратегии за успешна подготовка за математически олимпиади от бивши олимпийци и треньори на национални отбори.",
    image: "/placeholder-nfbkw.png",
    date: "15 май 2023",
    author: "Проф. Иван Иванов",
    readTime: "8 мин",
    category: "Олимпиади",
    emoji: "🏆",
  },
  {
    id: 2,
    title: "Красотата на числото π: Отвъд 3.14",
    excerpt:
      "Задълбочен поглед към едно от най-известните трансцендентни числа в математиката и неговите удивителни свойства и приложения.",
    image: "/placeholder-jwyo6.png",
    date: "3 април 2023",
    author: "Д-р Мария Петрова",
    readTime: "6 мин",
    category: "Математически концепции",
    emoji: "🔢",
  },
  {
    id: 3,
    title: "Математика в ежедневието: Приложения, които не подозирате",
    excerpt: "Открийте как математиката е навсякъде около нас - от природата и изкуството до технологиите и финансите.",
    image: "/placeholder-czun3.png",
    date: "21 март 2023",
    author: "Георги Димитров",
    readTime: "5 мин",
    category: "Приложна математика",
    emoji: "🌍",
  },
  {
    id: 4,
    title: "Интервю с български медалист от IMO 2022",
    excerpt:
      "Разговор с Александър Георгиев, който спечели златен медал на Международната математическа олимпиада и неговия път към успеха.",
    image: "/placeholder-e7r0i.png",
    date: "10 февруари 2023",
    author: "Елена Тодорова",
    readTime: "10 мин",
    category: "Интервюта",
    emoji: "🎙️",
  },
  {
    id: 5,
    title: "Топ 10 задачи, които всеки ученик трябва да може да реши",
    excerpt:
      "Колекция от класически математически задачи, които развиват логическо мислене и са основа за по-сложни концепции.",
    image: "/placeholder-7zm99.png",
    date: "5 януари 2023",
    author: "Проф. Иван Иванов",
    readTime: "7 мин",
    category: "Задачи",
    emoji: "📝",
  },
]

const categories = [
  "Всички категории",
  "Олимпиади",
  "Математически концепции",
  "Приложна математика",
  "Интервюта",
  "Задачи",
  "Новини",
  "Събития",
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SiteHeader />

      <main className="mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Блог</h1>

        <div className="max-w-6xl mx-auto mt-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="md:w-3/4">
              {/* Featured Post */}
              <div className="mb-12">
                <div className="relative h-80 rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder-nt4c0.png"
                    alt="Математическо образование"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <span className="text-white bg-[#2F7AE5] px-3 py-1 rounded-full text-xs inline-block mb-3 flex items-center w-fit">
                      <span className="mr-1 filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">📢</span>
                      Акценти
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Новите тенденции в математическото образование през 2023
                    </h2>
                    <p className="text-gray-200 mb-4">
                      Анализ на съвременните подходи в преподаването на математика и как те променят образователната
                      система.
                    </p>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="filter drop-shadow-[0_0_1px_rgba(0,0,0,1)] mr-1">👤</span>
                      <span className="mr-4">Проф. Димитър Петров</span>
                      <span className="filter drop-shadow-[0_0_1px_rgba(0,0,0,1)] mr-1">📅</span>
                      <span className="mr-4">1 юни 2023</span>
                      <span className="filter drop-shadow-[0_0_1px_rgba(0,0,0,1)] mr-1">⏱️</span>
                      <span>12 мин</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                    <div className="relative h-48">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#2F7AE5] text-white px-3 py-1 rounded-full text-xs flex items-center">
                          <span className="mr-1 filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">{post.emoji}</span>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-2 hover:text-[#2F7AE5] transition-colors">
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                        <span className="filter drop-shadow-[0_0_1px_rgba(0,0,0,1)] mr-1">👤</span>
                        <span className="mr-3">{post.author}</span>
                        <span className="filter drop-shadow-[0_0_1px_rgba(0,0,0,1)] mr-1">📅</span>
                        <span className="mr-3">{post.date}</span>
                        <span className="filter drop-shadow-[0_0_1px_rgba(0,0,0,1)] mr-1">⏱️</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="#"
                  className="inline-block bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Зареди още статии
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/4">
              {/* Search */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md mb-6">
                <h3 className="font-bold mb-4 flex items-center">
                  <span className="mr-2 text-xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">🔍</span>
                  Търсене
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Търси в блога..."
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2F7AE5] dark:bg-gray-700 dark:text-white"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-gray-500 filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">🔍</span>
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md mb-6">
                <h3 className="font-bold mb-4 flex items-center">
                  <span className="mr-2 text-xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">📂</span>
                  Категории
                </h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className={`block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          index === 0 ? "text-[#2F7AE5] font-medium" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
                <h3 className="font-bold mb-4 flex items-center">
                  <span className="mr-2 text-xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">🔥</span>
                  Популярни статии
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-start">
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center text-2xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">
                          {post.emoji}
                        </div>
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover opacity-80"
                        />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium hover:text-[#2F7AE5] transition-colors">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
