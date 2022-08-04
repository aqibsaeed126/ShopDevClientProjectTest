import imageUrlBuilder from '@sanity/image-url'
import { FitMode, SanityClientLike } from '@sanity/image-url/lib/types/types'
import { SanityClient, SanityAssetDocument} from '@sanity/client'

// Sanity image auto formating

export const urlFor = (client: SanityClient, source: SanityAssetDocument, imageWidth: number|null = null, imageHeight:number|null = null, imageMaxHeight:number|null = null, imageFit: FitMode = 'crop') => {
 
  // when imageFit value = null and it's specifically provided, it's value not gets defaulted to 'crop'
  if (!imageFit) {
    imageFit = 'crop'
  }

  // checks for old usage so it wont break view pages
  // All view pages are using  urlFor(client, thumbnail.asset).url()
  //will need to update to urlFor({client, source: thumbnail.asset})
  //All framework components are using new format
  const builderOptions : SanityClientLike = { clientConfig: client.config() }

  if(imageWidth && imageHeight){
    imageMaxHeight = imageHeight
    imageHeight = null
  }

  const builder = imageUrlBuilder(builderOptions)
  let url = builder.image(source)
  if (imageWidth) url = url.width(imageWidth)
  if (imageHeight) url = url.height(imageHeight)
  if (imageMaxHeight) url = url.maxHeight(imageMaxHeight)
  if (imageFit) url = url.fit(imageFit)
  let assetUrl = url.auto('format').url()

  // Appending file name in URL : 2
  let originalFilename = source && source.originalFilename ? source.originalFilename : source && source.asset && source.asset.originalFilename && source.asset.originalFilename
  if (originalFilename) {
    const [path, queryString] = assetUrl.split('?')
    originalFilename = encodeURIComponent(originalFilename)
    assetUrl = queryString ? `${path}/${originalFilename}?${queryString}` : `${path}/${originalFilename}`
  }

  return assetUrl
}

export const urlForFile = ({ asset } : { asset: any }, baseUrl = '') => {
  let { url, originalFilename } = asset
  
  // Appending file name in URL
  if (url && originalFilename) {
    const [path, queryString] = url.split('?')
    originalFilename = encodeURIComponent(originalFilename)
    url = queryString ? `${path}/${originalFilename}?${queryString}` : `${path}/${originalFilename}`
    if (baseUrl) {
      url = queryString ? `${baseUrl}/${asset.path}/${originalFilename}?${queryString}` : `${baseUrl}/${asset.path}/${originalFilename}`
    }
  }
  return url
}
