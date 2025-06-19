import SiteHeader from "../components/SiteHeader"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "За нас | maths.bg",
  description: "Научете повече за екипа и мисията на maths.bg",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SiteHeader />

      <main className="mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">За нас</h1>

        <div className="max-w-3xl mx-auto">
          <div className="mb-12 relative h-64 md:h-80 rounded-xl overflow-hidden">
            <Image src="/placeholder-tw93w.png" alt="Екипът на maths.bg" fill className="object-cover" />
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#2F7AE5] flex items-center">
              <span className="mr-2 text-2xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">🚀</span>
              Нашата мисия
            </h2>
            <p className="text-lg mb-4">
              Мисията на maths.bg е да направи математиката достъпна, разбираема и вълнуваща за всички ученици в
              България. Вярваме, че всеки има потенциала да разбере и оцени красотата на математиката, когато тя е
              представена по правилния начин.
            </p>
            <p className="text-lg">
              Стремим се да създадем общност от млади математици, които се подкрепят взаимно в своето обучение и
              развитие, и да подготвим следващото поколение български математици за успех на международната сцена.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#2F7AE5] flex items-center">
              <span className="mr-2 text-2xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">👥</span>
              Нашият екип
            </h2>
            <p className="text-lg mb-6">
              Екипът на maths.bg се състои от страстни математици и технологични ентусиасти, обединени от общата цел да
              подобрят математическото образование в България.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Пресиян Ивайлов Георгиев",
                  role: "Основател и главен разработчик",
                  bio: "Създател на платформата maths.bg и основен разработчик на всички функционалности. Страстен математик с визия за достъпно и качествено математическо образование.",
                  image: "/placeholder-esdwi.png",
                  emoji: "💻",
                },
                {
                  name: "Светлозар Светлозаров Стойков",
                  role: "Идеен вдъхновител",
                  bio: "Допринесъл с ценни идеи и концепции за развитието на платформата. Помогнал за оформянето на визията и мисията на maths.bg.",
                  image: "/placeholder-n1d38.png",
                  emoji: "💡",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-5xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">
                      {member.emoji}
                    </div>
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover opacity-80"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-[#2F7AE5] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#2F7AE5] flex items-center">
              <span className="mr-2 text-2xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">📜</span>
              Нашата история
            </h2>
            <p className="text-lg mb-4">
              maths.bg започна като малък проект през 2020 година, когато пандемията от COVID-19 принуди много ученици
              да учат от вкъщи. Виждайки нуждата от качествени онлайн ресурси за математика на български език, нашият
              екип се зае да създаде платформа, която да запълни тази празнина.
            </p>
            <p className="text-lg mb-4">
              От тогава насам, maths.bg се разрасна до пълноценна образователна платформа с хиляди задачи, теореми и
              ресурси, обслужваща ученици от цяла България.
            </p>
            <p className="text-lg">
              Днес продължаваме да се развиваме, добавяйки нови функционалности и съдържание, за да отговорим на нуждите
              на нашите потребители и да поддържаме високо качество на математическото образование.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#2F7AE5] flex items-center">
              <span className="mr-2 text-2xl filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">🤝</span>
              Присъединете се към нас
            </h2>
            <p className="text-lg mb-4">
              Вярваме в силата на общността и винаги търсим нови начини да си сътрудничим с учители, ученици и
              математически ентусиасти.
            </p>
            <p className="text-lg">
              Ако споделяте нашата страст към математиката и образованието, свържете се с нас, за да обсъдим как можем
              да работим заедно за по-добро математическо бъдеще за България.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
