const modules = import.meta.glob('../images/bg/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
})

export const MenuIcons = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const key = path
      .replace(/^.*\/|\.webp$|\.png$|\.jpg$|\.jpeg$|\.svg$/g, '')
    return [key, url]
  })
) as Record<string, string>
