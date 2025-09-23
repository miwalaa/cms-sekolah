export type NavItem = {
  link: {
    type?: 'reference' | 'custom' | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: string | number | { slug: string }
    } | null
    url?: string | null
    label: string
  }
  children?: NavItem[]
  id?: string | null
}
