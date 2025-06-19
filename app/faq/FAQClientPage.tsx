"use client"

import { useState } from "react"
import SiteHeader from "../components/SiteHeader"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    name: "За платформата",
    emoji: "❓",
    questions: [
      {
        question: "Какво е maths.bg?",
        answer:
          "maths.bg е образователна платформа, създадена да помогне на учениците в изучаването на математика. Предлагаме колекция от задачи, теореми, обучителни материали и ресурси, специално подбрани за българските ученици, с фокус върху подготовката за олимпиади и състезания.",
      },
      {
        question: "За кого е предназначен сайтът?",
        answer:
          "Сайтът е предназначен за ученици, които се подготвят за математически състезания и олимпиади, учители, родители и всеки, който се интересува от математика на по-високо ниво. Имаме съдържание за различни нива - от основни концепции до задачи за национални и международни олимпиади.",
      },
      {
        question: "Как да използвам ресурсите в сайта?",
        answer:
          "В секцията 'Ресурси' можете да намерите книги, учебни материали и полезни връзки, организирани по категории. Можете да използвате тези материали за самостоятелна подготовка или като допълнение към вашето обучение. Задачите в сайта са категоризирани по теми и ниво на трудност, което ви позволява да изберете подходящи за вас.",
      },
    ],
  },
  {
    name: "Задачи и решения",
    emoji: "📝",
    questions: [
      {
        question: "Как са организирани задачите в сайта?",
        answer:
          "Задачите са организирани по математически области (алгебра, геометрия, теория на числата, комбинаторика и др.), по класове и по ниво на трудност. Можете да използвате филтрите, за да намерите задачи, подходящи за вашето ниво на подготовка.",
      },
      {
        question: "Мога ли да предложа своя задача?",
        answer:
          "Да, приветстваме приноса на общността. Можете да изпратите вашите задачи чрез формата за контакт, и нашият екип ще ги прегледа. Ако задачата е подходяща, тя ще бъде добавена към колекцията с подходящо категоризиране.",
      },
      {
        question: "Как да използвам колекциите от задачи?",
        answer:
          "Колекциите ви позволяват да групирате задачи по теми или за конкретна подготовка. Можете да създавате свои колекции, да добавяте задачи към тях и да ги споделяте с други потребители. Това е особено полезно за учители, които искат да създадат специфични учебни материали.",
      },
    ],
  },
  {
    name: "Теореми и методи",
    emoji: "📚",
    questions: [
      {
        question: "Как да използвам секцията с теореми?",
        answer:
          "Секцията с теореми съдържа важни математически теореми и методи, обяснени по достъпен начин. Можете да ги използвате като справочник при решаване на задачи или за задълбочено изучаване на математически концепции. Теоремите са свързани със съответните задачи, което ви помага да видите практическото им приложение.",
      },
      {
        question: "Как теоремите помагат при решаването на задачи?",
        answer:
          "Теоремите предоставят мощни инструменти за решаване на задачи. При разглеждане на задача, често ще виждате препратки към съответните теореми, които могат да помогнат за решаването ѝ. Изучаването на теоремите и техните доказателства ви дава по-дълбоко разбиране на математическите концепции и развива вашето математическо мислене.",
      },
      {
        question: "Как да намеря подходящи теореми за конкретна тема?",
        answer:
          "Теоремите са категоризирани по математически области, подобно на задачите. Можете да използвате търсачката или да разглеждате теоремите по категории. Всяка теорема има тагове, които показват нейната област на приложение, което улеснява намирането на подходящи теореми за конкретна тема или задача.",
      },
    ],
  },
  {
    name: "Ресурси и материали",
    emoji: "📖",
    questions: [
      {
        question: "Какви ресурси предлага сайтът?",
        answer:
          "Сайтът предлага разнообразни ресурси, включително книги и учебници, учебни материали, софтуерни инструменти и връзки към други полезни сайтове. Тези ресурси са внимателно подбрани, за да подпомогнат вашата подготовка за математически състезания и олимпиади.",
      },
      {
        question: "Как да избера подходящи книги за моето ниво?",
        answer:
          "Книгите в секцията 'Ресурси' са маркирани с тагове, които показват тяхната област (алгебра, геометрия, теория на числата и т.н.). Можете да започнете с по-общи книги като 'The Art & Craft of Problem Solving' и постепенно да преминете към по-специализирани ресурси според вашите интереси и ниво на подготовка.",
      },
      {
        question: "Мога ли да предложа ресурс за добавяне към сайта?",
        answer:
          "Да, приветстваме предложения за нови ресурси. Ако знаете за полезна книга, учебен материал или сайт, който би бил полезен за общността, моля, свържете се с нас чрез формата за контакт. Ние ще прегледаме предложението и ако е подходящо, ще го добавим към колекцията.",
      },
    ],
  },
  {
    name: "Технически въпроси",
    emoji: "💻",
    questions: [
      {
        question: "Сайтът поддържа ли мобилни устройства?",
        answer:
          "Да, сайтът е напълно отзивчив и работи добре на всички устройства - компютри, таблети и смартфони. Можете да използвате всички функции на сайта независимо от устройството, което използвате.",
      },
      {
        question: "Как да докладвам технически проблем или грешка в съдържанието?",
        answer:
          "Ако срещнете технически проблем или забележите грешка в съдържанието, моля, изпратете ни подробно описание чрез формата за контакт. Включете информация за вашето устройство, браузър и стъпките, които водят до проблема. За грешки в съдържанието, моля, посочете конкретната страница или задача.",
      },
      {
        question: "Как да използвам математическите формули в сайта?",
        answer:
          "Сайтът използва MathJax за показване на математически формули. Можете да видите формулите в правилния им формат във всички съвременни браузъри. Ако имате проблеми с показването на формули, опитайте да обновите страницата или да използвате друг браузър.",
      },
    ],
  },
]

export default function FAQClientPage() {
  const [openCategory, setOpenCategory] = useState<string | null>("За платформата")
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({})

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName)
  }

  const toggleQuestion = (categoryName: string, questionIndex: number) => {
    const key = `${categoryName}-${questionIndex}`
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const isQuestionOpen = (categoryName: string, questionIndex: number) => {
    const key = `${categoryName}-${questionIndex}`
    return openQuestions[key] || false
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <SiteHeader />

        <main className="mt-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center dark:text-white">Често задавани въпроси</h1>

          <div className="max-w-3xl mx-auto mt-12">
            <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300">
              Намерете отговори на често задавани въпроси за maths.bg. Ако не откриете отговора, който търсите, моля,
              свържете се с нас.
            </p>

            <div className="space-y-6">
              {faqCategories.map((category) => (
                <div key={category.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <button
                    className="w-full p-6 flex items-center justify-between text-left focus:outline-none dark:text-white"
                    onClick={() => toggleCategory(category.name)}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3 filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">{category.emoji}</span>
                      <h2 className="text-xl font-bold">{category.name}</h2>
                    </div>
                    {openCategory === category.name ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>

                  {openCategory === category.name && (
                    <div className="px-6 pb-6">
                      <div className="space-y-4">
                        {category.questions.map((faq, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                          >
                            <button
                              className="w-full p-4 flex items-center justify-between text-left focus:outline-none bg-gray-50 dark:bg-gray-700 dark:text-white"
                              onClick={() => toggleQuestion(category.name, index)}
                            >
                              <h3 className="font-medium">{faq.question}</h3>
                              {isQuestionOpen(category.name, index) ? (
                                <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              )}
                            </button>

                            {isQuestionOpen(category.name, index) && (
                              <div className="p-4 bg-white dark:bg-gray-800">
                                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">Не намерихте отговора, който търсите?</p>
              <Link
                href="/contact"
                className="inline-block bg-[#2F7AE5] text-white py-2 px-6 rounded-full hover:bg-[#2F7AE5]/90 transition-colors"
              >
                Свържете се с нас
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
