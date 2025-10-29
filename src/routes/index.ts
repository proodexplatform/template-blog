// routes/index.ts
export const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
  schedule: '/schedule',
  blog: {
    index: '/blog',
    post: (slug: string) => `/blog/${slug}`,
  },
};