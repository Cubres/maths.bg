// Utility to get theme colors based on content type
export const getThemeColors = (contentType: "problems" | "theorems") => {
  return {
    // Primary color for buttons, highlights, etc.
    primary: contentType === "theorems" ? "#4CAF50" : "#2F7AE5",
    // Background color for tags
    tagBg: contentType === "theorems" ? "bg-green-100" : "bg-blue-100",
    // Text color for tags
    tagText: contentType === "theorems" ? "text-green-700" : "text-blue-700",
    // Border color for tags
    tagBorder: contentType === "theorems" ? "border-green-200" : "border-blue-200",
    // Hover background for tags
    tagHoverBg: contentType === "theorems" ? "hover:bg-green-200" : "hover:bg-blue-200",
    // Logo and brand text color - always blue for consistency
    brandColor: "#2F7AE5",
  }
}
