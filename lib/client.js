import sanityClient from '@sanity/client'
// import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: '3obq201m',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

// export const client = createClient({
//   projectId: '3obq201m',
//   dataset: 'production',
//   apiVersion: '2022-03-10',
//   useCdn: true,
//   token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
// })

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
