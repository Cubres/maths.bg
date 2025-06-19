import SiteHeader from "../components/SiteHeader"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { IconTooltip } from "../components/IconTooltip"

export const metadata: Metadata = {
  title: "Ресурси | maths.bg",
  description: "Полезни ресурси за изучаване на математика",
}

// Complete resources array with emoji icons
const resources = [
  {
    title: "Учебни материали",
    emoji: "📝",
    items: [
      {
        name: "Материалите на Math Zone",
        link: "https://math-zone.net/%d0%bc%d0%b0%d1%82%d0%b5%d1%80%d0%b8%d0%b0%d0%bb%d0%b8/",
        type: "Връзка",
        isPaid: false,
      },
      {
        name: "Материалите на Еван Чен",
        link: "https://web.evanchen.cc/olympiad.html",
        type: "Връзка",
        isPaid: false,
      },
      {
        name: "Материалите на Юфей Жао",
        link: "https://yufeizhao.com/olympiad/",
        type: "Връзка",
        isPaid: false,
      },
      {
        name: "Материалите на Алекс Реморов",
        link: "https://alexanderrem.weebly.com/math-competitions.html",
        type: "Връзка",
        isPaid: false,
      },
      {
        name: "Материалите на math.cmu.edu",
        link: "https://www.math.cmu.edu/~ploh/olympiad.shtml",
        type: "Връзка",
        isPaid: false,
      },
      {
        name: "Материалите на cjquines",
        link: "https://cjquines.com/math/handouts.html",
        type: "Връзка",
        isPaid: false,
      },
      {
        name: "Материалите на Рохан Гоял",
        link: "https://rgtdfg.blogspot.com/p/handouts.html",
        type: "Връзка",
        isPaid: false,
      },
    ],
  },
  {
    title: "Книги и учебници",
    emoji: "📚",
    items: [
      // Paid resources first
      {
        name: "640 задачи или теория на числата за олимпиади",
        tag: "ТЧ",
        tagTooltip: "Теория на числата",
        link: "https://www.book.store.bg/p239524/640-zadachi-ili-teoria-na-chislata-za-olimpiadi.html",
        type: "store.bg",
        isPaid: true,
      },
      {
        name: "555 задачи по геометрия",
        tag: "Г",
        tagTooltip: "Геометрия",
        link: "https://www.book.store.bg/p239510/555-zadachi-po-geometria.html",
        type: "store.bg",
        isPaid: true,
      },
      {
        name: "The Art & Craft of Problem Solving",
        link: "https://www.wiley.com/en-us/The+Art+and+Craft+of+Problem+Solving%2C+3rd+Edition-p-9781119239901",
        type: "wiley.com",
        isPaid: true,
      },
      {
        name: "Euclidean Geometry in Mathematical Olympiads",
        tag: "Г",
        tagTooltip: "Геометрия",
        link: "https://bookstore.ams.org/prb-27/",
        type: "bookstore.ams.org",
        isPaid: true,
      },
      // Free resources next
      {
        name: "OTIS Excerpts",
        link: "https://web.evanchen.cc/textbooks/OTIS-Excerpts.pdf",
        type: "Връзка",
        isPaid: false,
      },
      {
        name: "Modern Olympiad Number Theory",
        tag: "ТЧ",
        tagTooltip: "Теория на числата",
        link: "https://drive.google.com/file/d/1BcJTLjQaelZ4w_70oHKyImC2I8zLfyrt/view?usp=sharing",
        type: "Връзка",
        isPaid: false,
      },
      {
        name: "Olympiad Combinatorics",
        tag: "К",
        tagTooltip: "Комбинаторика",
        link: "https://drive.google.com/file/d/1sQtirXxkEfWYuGSKDZ-d7VGYkR_idebY/view",
        type: "Връзка",
        isPaid: false,
      },
    ],
  },
  {
    title: "Софтуерни инструменти",
    emoji: "🔧",
    items: [],
  },
  {
    title: "Английски сайтове за математика",
    emoji: "🇺🇸",
    items: [],
  },
]

// Complete external resources array with updated descriptions
const externalResources = [
  {
    name: "klasirane.com",
    url: "https://klasirane.com",
    description: "Всеобхватен архив",
    favicon: "https://www.google.com/s2/favicons?domain=klasirane.com&sz=128",
  },
  {
    name: "mathematicalmail.com",
    url: "https://mathematicalmail.com",
    description: "Математика без граници",
    favicon: "https://www.google.com/s2/favicons?domain=mathematicalmail.com&sz=128",
  },
  {
    name: "mathsbg.com",
    url: "https://mathsbg.com",
    description: "Архив на школа Олимпийци",
    favicon: "https://www.google.com/s2/favicons?domain=mathsbg.com&sz=128",
  },
  {
    name: "math-zone.net",
    url: "https://math-zone.net",
    description: "Школа по математика",
    favicon: "https://www.google.com/s2/favicons?domain=math-zone.net&sz=128",
  },
  {
    name: "matematika.bg",
    url: "http://matematika.bg",
    description: "Форум по математика",
    favicon: "https://www.google.com/s2/favicons?domain=matematika.bg&sz=128",
  },
  {
    name: "Интензивна математика",
    url: "http://www.math.bas.bg/smb/izmat/",
    description: "Програма на СМБ",
    favicon: "https://www.google.com/s2/favicons?domain=math.bas.bg&sz=128",
  },
  {
    name: "JBMO Материали",
    url: "https://tiny.cc/JBMO_drive",
    description: "Материали за МБОМ",
    favicon: "https://www.google.com/s2/favicons?domain=tiny.cc&sz=128",
  },
  {
    name: "olympicbg.org",
    url: "https://olympicbg.org",
    description: "Сдружение на отборите",
    favicon: "https://www.google.com/s2/favicons?domain=olympicbg.org&sz=128",
  },
]

// Software tools with category tags
const softwareTools = [
  {
    name: "wolframalpha.com",
    url: "https://www.wolframalpha.com/",
    description: "Обща полезна програма",
    category: null,
    categoryTooltip: null,
    favicon: "https://www.google.com/s2/favicons?domain=wolframalpha.com&sz=128",
  },
  {
    name: "oeis.org",
    url: "https://oeis.org/",
    description: "Библиотека с целочислени редици",
    category: "А",
    categoryTooltip: "Алгебра",
    favicon: "https://www.google.com/s2/favicons?domain=oeis.org&sz=128",
  },
  {
    name: "desmos.com",
    url: "https://www.desmos.com/",
    description: "Програма за чертаене на графики на функции",
    category: "А",
    categoryTooltip: "Алгебра",
    favicon: "https://www.google.com/s2/favicons?domain=desmos.com&sz=128",
  },
  {
    name: "mathpapa.com",
    url: "https://www.mathpapa.com/",
    description: "Програма за разлагане на полиноми",
    category: "А",
    categoryTooltip: "Алгебра",
    favicon: "https://www.google.com/s2/favicons?domain=mathpapa.com&sz=128",
  },
  {
    name: "geogebra.org",
    url: "https://www.geogebra.org/",
    description: "Програма за визуализация на геометрични построения",
    category: "Г",
    categoryTooltip: "Геометрия",
    favicon: "https://www.google.com/s2/favicons?domain=geogebra.org&sz=128",
  },
  {
    name: "alpertron.com.ar",
    url: "https://www.alpertron.com.ar/JAVAPROG.HTM",
    description: "Полезни програми за делимост на числата",
    category: "ТЧ",
    categoryTooltip: "Теория на числата",
    favicon: "https://www.google.com/s2/favicons?domain=alpertron.com.ar&sz=128",
  },
  {
    name: "visualpatterns.org",
    url: "https://www.visualpatterns.org/",
    description: "Библиотека с визуални структури",
    category: "К",
    categoryTooltip: "Комбинаторика",
    favicon: "https://www.google.com/s2/favicons?domain=visualpatterns.org&sz=128",
  },
]

// English math websites
const englishMathSites = [
  {
    name: "math.stackexchange.com",
    url: "https://math.stackexchange.com/",
    description: "Форум за математика",
    favicon: "https://www.google.com/s2/favicons?domain=math.stackexchange.com&sz=128",
  },
  {
    name: "artofproblemsolving.com",
    url: "https://artofproblemsolving.com/community/c6_high_school_olympiads",
    description: "AoPS - най-популярният сайт за олимпийска математика",
    favicon: "https://www.google.com/s2/favicons?domain=artofproblemsolving.com&sz=128",
  },
  {
    name: "web.evanchen.cc",
    url: "https://web.evanchen.cc/",
    description: "Личният блог на Еван Чен за олимпийска математика",
    favicon: "https://www.google.com/s2/favicons?domain=evanchen.cc&sz=128",
  },
  {
    name: "imogeometry.blogspot.com",
    url: "https://imogeometry.blogspot.com/p/blog-page_2.html",
    description: "Най-богата колекция в света на задачи по геометрия",
    favicon: "https://www.google.com/s2/favicons?domain=blogspot.com&sz=128",
  },
  {
    name: "prase.cz/kalva",
    url: "https://prase.cz/kalva/",
    description: "Библиотека със задачи от олимпиади",
    favicon: "https://www.google.com/s2/favicons?domain=prase.cz&sz=128",
  },
  {
    name: "dgrozev.wordpress.com",
    url: "https://dgrozev.wordpress.com/",
    description: "Личният блог на Драгомир Грозев за олимпийска математика",
    favicon: "https://www.google.com/s2/favicons?domain=wordpress.com&sz=128",
  },
  {
    name: "imo-official.org",
    url: "https://www.imo-official.org/",
    description: "Официален сайт на международната олимпиада по математика",
    favicon: "https://www.google.com/s2/favicons?domain=imo-official.org&sz=128",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <SiteHeader />

        <main className="mt-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center dark:text-white">Ресурси</h1>

          <div className="max-w-4xl mx-auto mt-8">
            <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300">
              Тук ще намерите колекция от полезни ресурси, които ще ви помогнат в приключенията ви в света на
              олимпийската математика - учебни материали, книги, сайтове и софтуерни инструменти.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((category, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <span className="text-2xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">{category.emoji}</span>
                    <h2 className="text-xl font-bold ml-3 dark:text-white">{category.title}</h2>
                  </div>

                  {category.title === "Софтуерни инструменти" ? (
                    <div className="p-4 grid grid-cols-1 gap-3">
                      {softwareTools.map((tool, toolIndex) => (
                        <a
                          key={toolIndex}
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                            <Image
                              src={tool.favicon || "/placeholder.svg"}
                              alt={`${tool.name} favicon`}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                          <div className="ml-3 overflow-hidden flex-grow">
                            <h3 className="font-semibold text-[#2F7AE5] text-sm line-clamp-1">{tool.name}</h3>
                            <div className="flex items-center">
                              <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1 mr-1">
                                {tool.description}
                              </p>
                              {tool.category && (
                                <IconTooltip
                                  icon={<span className="text-xs text-[#2F7AE5] font-medium">({tool.category})</span>}
                                  tooltip={tool.categoryTooltip}
                                  className="inline-flex"
                                />
                              )}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : category.title === "Английски сайтове за математика" ? (
                    <div className="p-4 grid grid-cols-1 gap-3">
                      {englishMathSites.map((site, siteIndex) => (
                        <a
                          key={siteIndex}
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                            <Image
                              src={site.favicon || "/placeholder.svg"}
                              alt={`${site.name} favicon`}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                          <div className="ml-3 overflow-hidden flex-grow">
                            <h3 className="font-semibold text-[#2F7AE5] text-sm line-clamp-1 dark:text-[#5B9AEA]">
                              {site.name}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">{site.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center flex-grow pr-2">
                              <span
                                className={`font-medium dark:text-white ${
                                  item.name === "Euclidean Geometry in Mathematical Olympiads"
                                    ? "text-xs"
                                    : item.name.length > 30
                                      ? "text-sm"
                                      : ""
                                }`}
                              >
                                {item.name}
                              </span>
                              {item.tag && (
                                <IconTooltip
                                  icon={
                                    <span className="ml-2 text-xs text-[#2F7AE5] dark:text-[#5B9AEA] font-medium">
                                      ({item.tag})
                                    </span>
                                  }
                                  tooltip={item.tagTooltip}
                                  className="inline-flex"
                                />
                              )}
                            </div>
                            <div className="flex items-center flex-shrink-0">
                              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{item.type}</span>
                              <span className="text-gray-400 filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">
                                {item.isPaid ? "💸" : "🔗"}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 bg-[#2F7AE5]/10 dark:bg-[#2F7AE5]/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center dark:text-white">
                <span className="text-2xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)] mr-2">🇧🇬</span>
                Български сайтове за математика
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {externalResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-800 rounded-lg p-2 flex items-center hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 h-auto"
                  >
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <Image
                        src={resource.favicon || "/placeholder.svg"}
                        alt={`${resource.name} favicon`}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <h3 className="font-semibold text-[#2F7AE5] dark:text-[#5B9AEA] text-xs line-clamp-1">
                        {resource.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">{resource.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Някой от линковете не работи?{" "}
              <Link href="/contact" className="text-[#2F7AE5] dark:text-[#5B9AEA] hover:underline">
                Моля, свържете се с нас на страницата за контакти
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
