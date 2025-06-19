type EmptyStateProps = {
  type: "archived" | "bookmarked" | "collection" | "search"
  collectionName?: string
}

export default function EmptyState({ type, collectionName }: EmptyStateProps) {
  let icon = null
  let title = ""
  let message = ""

  switch (type) {
    case "archived":
      icon = <span className="emoji text-5xl">🤨</span>
      title = "Няма решени задачи"
      message = "Решете задачи, за да се показват тук и да се скрият от основния екран"
      break
    case "bookmarked":
      icon = <span className="emoji text-5xl">😔</span>
      title = "Няма запазени задачи"
      message = "Разгледайте задачите и ги запазете, за да ги виждате тук"
      break
    case "collection":
      icon = <span className="emoji text-5xl">📁</span>
      title = `Няма задачи в "${collectionName}"`
      message = "Добави задачи в колекцията!"
      break
    case "search":
      icon = <span className="emoji text-5xl">🕵️‍♂️</span>
      title = "Няма открити резултати"
      message = "Опитайте се да промените ключовите думи, чрез които търсите"
      break
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
      {icon}
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  )
}
