// Define the mapping between tags and emoji characters
export type IconConfig = {
  emoji: string
  backgroundColor: string
  vibrantBackgroundColor: string
}

export type IconMapping = {
  [tag: string]: IconConfig
}

// Background color options - using both pale and vibrant versions
export const backgroundColors = {
  red: {
    pale: "rgba(255, 74, 0, 0.2)",
    vibrant: "rgba(255, 74, 0, 0.8)",
  },
  orange: {
    pale: "rgba(227, 116, 0, 0.2)",
    vibrant: "rgba(227, 116, 0, 0.8)",
  },
  yellow: {
    pale: "rgba(255, 224, 27, 0.2)",
    vibrant: "rgba(255, 224, 27, 0.8)",
  },
  green: {
    pale: "rgba(150, 191, 72, 0.2)",
    vibrant: "rgba(150, 191, 72, 0.8)",
  },
  blue: {
    pale: "rgba(47, 122, 229, 0.2)",
    vibrant: "rgba(47, 122, 229, 0.8)",
  },
  purple: {
    pale: "rgba(156, 39, 176, 0.2)",
    vibrant: "rgba(156, 39, 176, 0.8)",
  },
  pink: {
    pale: "rgba(242, 47, 70, 0.2)",
    vibrant: "rgba(242, 47, 70, 0.8)",
  },
  teal: {
    pale: "rgba(0, 177, 224, 0.2)",
    vibrant: "rgba(0, 177, 224, 0.8)",
  },
  gray: {
    pale: "rgba(96, 125, 139, 0.2)",
    vibrant: "rgba(96, 125, 139, 0.8)",
  },
}

// Default mapping with emoji characters
export const iconMapping: IconMapping = {
  //algebra
  неравенства: {
    emoji: "⚖️",
    backgroundColor: backgroundColors.gray.pale,
    vibrantBackgroundColor: backgroundColors.gray.vibrant,
  },
  тригонометрия: {
    emoji: "🌊",
    backgroundColor: backgroundColors.blue.pale,
    vibrantBackgroundColor: backgroundColors.blue.vibrant,
  },
  редици: {
    emoji: "🔢",
    backgroundColor: backgroundColors.orange.pale,
    vibrantBackgroundColor: backgroundColors.orange.vibrant,
  },
  полиноми: {
    emoji: "📈",
    backgroundColor: backgroundColors.red.pale,
    vibrantBackgroundColor: backgroundColors.red.vibrant,
  },
  параметри: {
    emoji: "📊",
    backgroundColor: backgroundColors.green.pale,
    vibrantBackgroundColor: backgroundColors.green.vibrant,
  },
  "уравнения от високи степени": {
    emoji: "🔺",
    backgroundColor: backgroundColors.red.pale,
    vibrantBackgroundColor: backgroundColors.red.vibrant,
  },
  //geometry
  "изразяване на ъгли": {
    emoji: "📐",
    backgroundColor: backgroundColors.blue.pale,
    vibrantBackgroundColor: backgroundColors.blue.vibrant,
  },
  "изразяване на страни": {
    emoji: "📏",
    backgroundColor: backgroundColors.blue.pale,
    vibrantBackgroundColor: backgroundColors.blue.vibrant,
  },
  четириъгълници: {
    emoji: "♦️",
    backgroundColor: backgroundColors.red.pale,
    vibrantBackgroundColor: backgroundColors.red.vibrant,
  },
  //number theory
  "числа на Фибоначи": {
    emoji: "🐇",
    backgroundColor: backgroundColors.gray.pale,
    vibrantBackgroundColor: backgroundColors.gray.vibrant,
  },
  "модулни сравнения": {
    emoji: "♻️",
    backgroundColor: backgroundColors.teal.pale,
    vibrantBackgroundColor: backgroundColors.teal.vibrant,
  },
  делимост: {
    emoji: "🧱",
    backgroundColor: backgroundColors.orange.pale,
    vibrantBackgroundColor: backgroundColors.orange.vibrant,
  },

  //kombiiii
  оцветявания: {
    emoji: "🎨",
    backgroundColor: backgroundColors.orange.pale,
    vibrantBackgroundColor: backgroundColors.orange.vibrant,
  },
  графи: {
    emoji: "🌐",
    backgroundColor: backgroundColors.blue.pale,
    vibrantBackgroundColor: backgroundColors.blue.vibrant,
  },
  конструкции: {
    emoji: "🏗️",
    backgroundColor: backgroundColors.yellow.pale,
    vibrantBackgroundColor: backgroundColors.yellow.vibrant,
  },
  "игри и стратегии": {
    emoji: "🎲",
    backgroundColor: backgroundColors.red.pale,
    vibrantBackgroundColor: backgroundColors.red.vibrant,
  },

  множества: {
    emoji: "🧺",
    backgroundColor: backgroundColors.red.pale,
    vibrantBackgroundColor: backgroundColors.red.vibrant,
  },
}

// Function to get icon configs for a list of tags
export function getIconsForTags(tags: string[]): IconConfig[] {
  const icons: IconConfig[] = []

  // Find matching icons for tags
  for (const tag of tags) {
    if (iconMapping[tag]) {
      icons.push(iconMapping[tag])
      // Limit to 3 icons
      if (icons.length >= 3) break
    }
  }

  return icons
}
