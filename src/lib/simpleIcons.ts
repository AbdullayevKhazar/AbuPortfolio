export const getSimpleIconUrl = (slug: string, color = "111827") =>
  `https://cdn.simpleicons.org/${encodeURIComponent(slug)}/${color.replace("#", "")}`;
