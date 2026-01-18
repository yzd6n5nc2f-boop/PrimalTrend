export const journalPosts = Array.from({ length: 9 }).map((_, index) => ({
  slug: `field-notes-${index + 1}`,
  title: `Field Notes ${index + 1}`,
  excerpt:
    "Training rituals, recovery discipline, and the mindset required to stay relentless.",
  date: `2024-0${(index % 9) + 1}-18`,
  tag: "Training",
  image: "/placeholders/lifestyle/run.svg"
}));
