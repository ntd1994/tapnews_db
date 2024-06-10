export default defineEventHandler(async (e) => {
    const $config = useRuntimeConfig(e);
    const sitemap = await $fetch<String[]>(`${$config.public.apiURL}/api/sitemap`);
    return sitemap?.map((p) => {
      return {
        changefreq: 'daily',
        priority: 1,
        loc: p,
        lastmod: new Date(),
      };
    });
  });
  