import type { CollectionBeforeValidateHook } from 'payload'

import formatSlug from './formatSlug'

const slug =
  (
    fieldToSlug: string = 'title',
  ): CollectionBeforeValidateHook =>
  ({ data }) => {
    if (data?.slug || !data?.[fieldToSlug]) {
      return data
    }

    data.slug = formatSlug(data[fieldToSlug])
    return data
  }

export default slug
