import type { Integration } from "./integrations"

export type Theorem = {
  id: string
  name: string
  description: string
  tags: string[]
  category: string
  type: "теорема" | "метод"
  difficulty: number
  usefulness: number
  proof: string
}

// List of important mathematical theorems and formulas
export const theorems: Theorem[] = [
  {
    id: "t1",
    name: "Тригонометрични тъждества",
    description:
      "За основните тригонометрични функции са в сила следните тъждества:\\\ $\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\sin\\beta\\cos\\alpha$\\\ $\\\sin(\\alpha-\\beta)=\\sin\\alpha\\cos\\beta-\\sin\\beta\\cos\\alpha$\\\ $\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\beta\\sin\\alpha$\\\$\\cos(\\alpha-\\beta)=\\cos\\alpha\\cos\\beta+\\sin\\beta\\sin\\alpha$\\\$\\sin \\alpha + \\sin \\beta = 2\\sin(\\frac{a+b}{2})\\cos(\\frac{a-b}{2})$\\\ $\\sin \\alpha - \\sin \\beta = 2\\cos(\\frac{a+b}{2})\\sin(\\frac{a-b}{2})$\\\$\\cos \\alpha + \\cos \\beta = 2\\cos(\\frac{a+b}{2})\\cos(\\frac{a-b}{2})$\n$\\cos \\alpha - \\cos \\beta = -2\\sin(\\frac{a+b}{2})\\sin(\\frac{a-b}{2})$\n\n$\\tan(a - b) = \\frac{\\tan a - \\tan b}{1 + \\tan a \\tan b}$\n$\\tan(a + b) = \\frac{\\tan a + \\tan b}{1 - \\tan a \\tan b}$\ncotg$(a - b) = \\frac{cotg a cotg b + 1}{cotg b - cotg a}$\ncotg$(a + b) = \\frac{cotg a cotg b - 1}{cotg a + cotg b}$\n$1-\\cos(2\\alpha)=2\\sin^2\\alpha$\n$1+\\cos(2\\alpha)=2\\cos^2\\alpha$\n$\\sin^2\\alpha-\\sin^2\\beta=\\sin(\\alpha+\\beta)\\sin(\\alpha-\\beta)$\n$(\\sin\\theta \\pm \\cos\\theta)^2=1\\pm 2\\sin\\theta\\cos\\theta$\\\$\\sin3\\theta=3\\sin\\theta-4\\sin^3\\theta$\n$\\cos3\\theta=4\\cos^3\\theta-3\\cos\\theta$",
    tags: ["теорема", "алгебра", "геометрия", "тригонометрия"],
    category: "алгебра",
    type: "теорема",
    difficulty: 1,
    usefulness: 3,
    proof:
      "Подобно на другите теореми с ниска трудност, няма да доказваме директно горните твърдения - първо, понеже това не се изисква в състезателна обстановка, и второ, понеже заинтересованият читател може сам да изнамери геометрична интерпретатация на тъждествата. Тук ще покажем начин, по който показаните тъждества могат да бъдат извеждани, известен като тъждество на Ойлер: \\ За краткост ще въведем записа $cis(\\theta)=\\cos\\theta+i\\sin\\theta$. Ако се абстрахираме от стойностите на $e$ и $i$ засега, от свойства на степени знаем, че $e^{a+b}=e^a.e^b$ и други. Това е особено полезно, тъй като \\textit{тъждеството на Ойлер} е вярно за всеки един ъгъл, или, ако в оригиналната формулировка заместим $\\theta$ с $2\\theta$ например, имаме: $$cis(2\\theta)=e^{i2\\theta}=e^{i\\theta}.e^{i\theta}=(cis(\\theta))^2\] или \[cos(2\theta)+isin(2\theta)=(cos\theta+isin\theta)^2=cos^2\\theta+i^2sin^2\\theta+2isin\\theta\\cos\\theta.$$ Разделяйки на реална и имагинерна част, това са тъждествата $$cos(2\\theta)=cos^2\\theta-sin^2\\theta\] и \[sin(2\\theta)=2sin\\theta \\cos\\theta$$. Отново, подобни разсъждения можем да направим, ако в оригиналната формулировка имаме $cis (\\alpha + \\beta), \\,cis (3 \\theta)$ и т.н.",
  },
  {
    id: "t2",
    name: "Неравенство на Коши-Шварц",
    description:
      "$$\\left(\\sum a_i b_i\\right)^2 \\leq\\left(\\sum a_i^2\\right)\\left(\\sum b_i^2\\right)$$\n\nФундаментално неравенство с приложения в линейната алгебра, анализа и теорията на вероятностите.",
    tags: ["неравенства", "алгебра", "линейна алгебра", "теорема"],
    category: "неравенства",
    type: "теорема",
    difficulty: 4,
    usefulness: 5,
    proof:
      "Нека $\\vec{a} = (a_1, a_2, \\ldots, a_n)$ и $\\vec{b} = (b_1, b_2, \\ldots, b_n)$ са два вектора. Разглеждаме квадратния тричлен $f(t) = ||\\vec{a} - t\\vec{b}||^2 = \\sum (a_i - tb_i)^2$. Тъй като $f(t) \\geq 0$ за всяко $t$, дискриминантата на този тричлен трябва да е неположителна, което води до неравенството на Коши-Шварц.",
  },
  {
    id: "t3",
    name: "AM-GM Inequality",
    description:
      "$$\\frac{a_1+a_2+\\cdots+a_n}{n} \\geq \\sqrt[n]{a_1 a_2 \\cdots a_n}$$\n\nСредното аритметично на неотрицателни реални числа е по-голямо или равно на средното геометрично.",
    tags: ["неравенства", "алгебра", "метод"],
    category: "неравенства",
    type: "метод",
    difficulty: 2,
    usefulness: 5,
    proof:
      "Доказателството използва метода на Йенсен и свойствата на изпъкналите функции. Тъй като $\\ln(x)$ е вдлъбната функция, от неравенството на Йенсен следва, че $\\ln\\left(\\frac{a_1+a_2+\\cdots+a_n}{n}\\right) \\geq \\frac{\\ln(a_1)+\\ln(a_2)+\\cdots+\\ln(a_n)}{n} = \\ln\\left(\\sqrt[n]{a_1 a_2 \\cdots a_n}\\right)$. Прилагайки експоненциалната функция към двете страни, получаваме исканото неравенство.",
  },
  {
    id: "t4",
    name: "Sum of Roots of Unity",
    description: "$$1+\\omega+\\omega^2+\\cdots+\\omega^{n-1}=0$$\n\nКъдето ω е примитивен n-ти корен от единицата.",
    tags: ["алгебра", "комплексни числа", "теорема"],
    category: "алгебра",
    type: "теорема",
    difficulty: 2,
    usefulness: 3,
    proof:
      "Нека $S = 1+\\omega+\\omega^2+\\cdots+\\omega^{n-1}$. Умножаваме двете страни по $\\omega$: $\\omega S = \\omega + \\omega^2 + \\cdots + \\omega^n = \\omega + \\omega^2 + \\cdots + \\omega^{n-1} + 1 = S$ (тъй като $\\omega^n = 1$). Следователно $\\omega S = S$, което означава $S(\\omega - 1) = 0$. Тъй като $\\omega \\neq 1$ (защото $\\omega$ е примитивен корен), следва че $S = 0$.",
  },
  {
    id: "t5",
    name: "Fermat's Little Theorem",
    description: "$$a^{p-1} \\equiv 1 \\pmod{p}$$\n\nЗа всяко цяло число a и просто число p, което не дели a.",
    tags: ["теория на числата", "модулни сравнения", "теорема"],
    category: "теория на числата",
    type: "теорема",
    difficulty: 3,
    usefulness: 4,
    proof:
      "Разглеждаме множеството $S = \\{1, 2, \\ldots, p-1\\}$ и множеството $T = \\{a \\cdot 1, a \\cdot 2, \\ldots, a \\cdot (p-1)\\}$ по модул $p$. Може да се покаже, че $T$ е пермутация на $S$. Следователно, произведението на елементите в $S$ е равно на произведението на елементите в $T$ по модул $p$: $(p-1)! \\equiv a^{p-1} \\cdot (p-1)! \\pmod{p}$. Съкращавайки с $(p-1)!$, получаваме $a^{p-1} \\equiv 1 \\pmod{p}$.",
  },
  {
    id: "t6",
    name: "Vieta's Formulas",
    description:
      "За полином $P(x) = x^n + a_{n-1}x^{n-1} + \\ldots + a_1x + a_0$ с корени $r_1, r_2, \\ldots, r_n$:\n\n$$r_1 + r_2 + \\ldots + r_n = -a_{n-1}$$\n$$r_1r_2 + r_1r_3 + \\ldots + r_{n-1}r_n = a_{n-2}$$\n$$\\vdots$$\n$$r_1r_2\\ldots r_n = (-1)^n a_0$$",
    tags: ["алгебра", "полиноми", "метод"],
    category: "алгебра",
    type: "метод",
    difficulty: 3,
    usefulness: 4,
    proof:
      "Полиномът може да се запише като $P(x) = (x-r_1)(x-r_2)\\cdots(x-r_n)$. Разкривайки скобите и сравнявайки коефициентите с оригиналния полином, получаваме формулите на Виета.",
  },
  {
    id: "t7",
    name: "Möbius Inversion Formula",
    description:
      "$$f(n)=\\sum_{d \\mid n} \\mu(d) \\cdot g\\left(\\frac{n}{d}\\right)$$\n\nКъдето μ е функцията на Мьобиус и g(n) = ∑_{d|n} f(d).",
    tags: ["теория на числата", "комбинаторика", "метод"],
    category: "теория на числата",
    type: "метод",
    difficulty: 5,
    usefulness: 4,
    proof:
      "Доказателството използва свойството на функцията на Мьобиус: $\\sum_{d|n} \\mu(d) = [n=1]$, където $[n=1]$ е 1 ако $n=1$ и 0 иначе. Заместваме $g(n) = \\sum_{d|n} f(d)$ в дясната страна на формулата и разменяме реда на сумиране, за да получим оригиналната функция $f(n)$.",
  },
  {
    id: "t8",
    name: "Pick's Theorem",
    description:
      "$$A = I + \\frac{B}{2} - 1$$\n\nКъдето A е лицето на многоъгълник с целочислени върхове, I е броят на целочислените точки във вътрешността, а B е броят на целочислените точки по границата.",
    tags: ["геометрия", "комбинаторика", "теорема"],
    category: "геометрия",
    type: "теорема",
    difficulty: 3,
    usefulness: 4,
    proof:
      "Доказателството използва триангулация на многоъгълника и индукция по броя на вътрешните точки. За триъгълник без вътрешни точки, формулата се проверява директно. След това се показва, че добавянето на вътрешна точка увеличава лицето с 1, а добавянето на гранична точка увеличава лицето с 1/2, което запазва валидността на формулата.",
  },
  {
    id: "t9",
    name: "Pythagorean Theorem",
    description:
      "$$a^2 + b^2 = c^2$$\n\nВ правоъгълен триъгълник, квадратът на хипотенузата е равен на сумата от квадратите на двата катета.",
    tags: ["геометрия", "тригонометрия", "теорема"],
    category: "геометрия",
    type: "теорема",
    difficulty: 1,
    usefulness: 5,
    proof:
      "Съществуват над 100 различни доказателства. Едно елегантно доказателство използва подобни триъгълници: ако спуснем височина от правия ъгъл към хипотенузата, получаваме два триъгълника, подобни на оригиналния. От свойствата на подобните триъгълници следва, че $a^2 = c \\cdot p$ и $b^2 = c \\cdot q$, където $p$ и $q$ са проекциите на катетите върху хипотенузата. Тъй като $p + q = c$, следва че $a^2 + b^2 = c \\cdot p + c \\cdot q = c \\cdot (p + q) = c^2$.",
  },
  {
    id: "t10",
    name: "Law of Cosines",
    description: "$$c^2 = a^2 + b^2 - 2ab\\cos(C)$$\n\nОбобщение на Питагоровата теорема за произволни триъгълници.",
    tags: ["геометрия", "тригонометрия", "теорема"],
    category: "геометрия",
    type: "теорема",
    difficulty: 2,
    usefulness: 5,
    proof:
      "Нека имаме триъгълник с върхове A, B и C, и страни a, b и c. Използваме координатна система, в която A е в началото, а B е на положителната x-ос. Тогава координатите на C са (b·cos(C), b·sin(C)). Прилагайки формулата за разстояние между две точки за страната c (между A и C), получаваме: $c^2 = (b\\cos(C))^2 + (b\\sin(C))^2 = b^2\\cos^2(C) + b^2\\sin^2(C) = b^2(\\cos^2(C) + \\sin^2(C)) = b^2$. За страната a (между B и C): $a^2 = (a - b\\cos(C))^2 + (b\\sin(C))^2 = a^2 + b^2\\cos^2(C) - 2ab\\cos(C) + b^2\\sin^2(C) = a^2 + b^2 - 2ab\\cos(C)$.",
  },
  {
    id: "t11",
    name: "Binomial Theorem",
    description: "$$(x+y)^n = \\sum_{k=0}^{n} {n \\choose k} x^{n-k} y^k$$\n\nФормула за разлагане на биномна степен.",
    tags: ["алгебра", "комбинаторика", "метод"],
    category: "алгебра",
    type: "метод",
    difficulty: 2,
    usefulness: 5,
    proof:
      "Доказателството може да се направи чрез математическа индукция по n. За n = 1 имаме $(x+y)^1 = x+y = {1 \\choose 0}x^1y^0 + {1 \\choose 1}x^0y^1$, което е вярно. Предполагаме, че формулата е вярна за n и доказваме за n+1: $(x+y)^{n+1} = (x+y)(x+y)^n = (x+y)\\sum_{k=0}^{n} {n \\choose k} x^{n-k} y^k = x\\sum_{k=0}^{n} {n \\choose k} x^{n-k} y^k + y\\sum_{k=0}^{n} {n \\choose k} x^{n-k} y^k$. След преобразуване и използване на свойствата на биномните коефициенти, получаваме исканата формула за n+1.",
  },
  {
    id: "t12",
    name: "Chinese Remainder Theorem",
    description:
      "Ако $m_1, m_2, \\ldots, m_k$ са взаимно прости числа, тогава системата:\n\n$$x \\equiv a_1 \\pmod{m_1}$$\n$$x \\equiv a_2 \\pmod{m_2}$$\n$$\\vdots$$\n$$x \\equiv a_k \\pmod{m_k}$$\n\nима единствено решение по модул $M = m_1 \\cdot m_2 \\cdot \\ldots \\cdot m_k$.",
    tags: ["теория на числата", "модулни сравнения", "метод"],
    category: "теория на числата",
    type: "метод",
    difficulty: 4,
    usefulness: 5,
    proof:
      "Конструктивно доказателство: За всяко i дефинираме $M_i = M/m_i$ и намираме $t_i$ такова, че $M_i \\cdot t_i \\equiv 1 \\pmod{m_i}$ (това е възможно, защото $M_i$ и $m_i$ са взаимно прости). Тогава решението е $x = \\sum_{i=1}^{k} a_i M_i t_i \\pmod{M}$. Може да се провери, че това решение удовлетворява всички сравнения в системата.",
  },
  {
    id: "t13",
    name: "Euler's Formula",
    description: "$$e^{ix} = \\cos x + i\\sin x$$\n\nСвързва експоненциалната функция с тригонометричните функции.",
    tags: ["алгебра", "комплексни числа", "тригонометрия", "теорема"],
    category: "алгебра",
    type: "теорема",
    difficulty: 3,
    usefulness: 5,
    proof:
      "Доказателството използва разлагането на $e^x$, $\\cos x$ и $\\sin x$ в степенни редове:\n\n$e^{ix} = 1 + ix + \\frac{(ix)^2}{2!} + \\frac{(ix)^3}{3!} + \\ldots$\n\n$= 1 + ix - \\frac{x^2}{2!} - i\\frac{x^3}{3!} + \\frac{x^4}{4!} + i\\frac{x^5}{5!} - \\ldots$\n\n$= (1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\ldots) + i(x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\ldots)$\n\n$= \\cos x + i\\sin x$",
  },
  {
    id: "t14",
    name: "Stirling's Approximation",
    description:
      "$$n! \\sim \\sqrt{2\\pi n}\\left(\\frac{n}{e}\\right)^n$$\n\nАсимптотична формула за факториел при големи стойности на n.",
    tags: ["комбинаторика", "факториели", "метод"],
    category: "комбинаторика",
    type: "метод",
    difficulty: 5,
    usefulness: 4,
    proof:
      "Доказателството използва интегрално смятане и метода на Лаплас за асимптотично оценяване на интеграли. Започваме с представянето на $\\ln(n!)$ като сума и приближаваме тази сума с интеграл. След това използваме формулата на Стирлинг за приближение на този интеграл.",
  },
  {
    id: "t15",
    name: "Bayes' Theorem",
    description: "$$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$$\n\nФормула за изчисляване на условна вероятност.",
    tags: ["вероятности", "комбинаторика", "метод"],
    category: "вероятности",
    type: "метод",
    difficulty: 2,
    usefulness: 5,
    proof:
      "Доказателството следва директно от дефиницията на условна вероятност. По дефиниция, $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ и $P(B|A) = \\frac{P(A \\cap B)}{P(A)}$. От второто уравнение получаваме $P(A \\cap B) = P(B|A) \\cdot P(A)$. Заместваме това в първото уравнение и получаваме $P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$.",
  },
]

// Convert theorems to Integration format for compatibility
export function convertTheoremsToIntegrations(): Integration[] {
  return theorems.map((theorem) => ({
    id: theorem.id,
    name: theorem.name,
    description: theorem.description,
    category: theorem.category,
    icon: () => null, // Placeholder for icon
    color: "#4CAF50", // Green color for theorems
    solution: theorem.proof, // Use proof as solution
    class: "", // Theorems don't have classes
    competition: "", // Theorems don't have competitions
    tags: [...theorem.tags], // Make sure to create a new array
    difficulty: theorem.difficulty,
    usefulness: theorem.usefulness,
    proof: theorem.proof,
  }))
}
