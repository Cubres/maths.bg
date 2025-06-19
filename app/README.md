# Custom Icons for Math Problems

This application supports custom icons for math problems based on their tags. Here's how to set up and use this feature:

## Icon Directory Structure

Place your custom icons in the `/public/icons/` directory. The icons should be PNG images, ideally 160x160px.

## Icon Mapping

The mapping between tags and icons is defined in `app/data/iconMapping.ts`. Each tag can be associated with:
- A filename (the icon image in the `/public/icons/` directory)
- A background color (predefined color options are available)

## Example Mapping

\`\`\`typescript
// Example mapping
export const iconMapping: IconMapping = {
  "алгебра": {
    filename: "algebra.png",
    backgroundColor: backgroundColors.blue
  },
  "геометрия": {
    filename: "geometry.png",
    backgroundColor: backgroundColors.green
  },
  // Add more mappings as needed
};
