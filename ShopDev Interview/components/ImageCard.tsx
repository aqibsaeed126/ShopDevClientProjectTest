import Image from 'next/image'
import { urlFor } from '../lib/urlFor'
import { SanityClient } from '@sanity/client'
import { getImageDimensions } from '@sanity/asset-utils'

type ImageCardProp = {
  thumbnail: any, 
  client: SanityClient,
  rounded?: string,
  width?: number, 
  height?: number
}

const ImageCard = (props: ImageCardProp) => {
  let { thumbnail, client, rounded = 'rounded-bl-2xl', width = 100, height = 100} = props

  if (thumbnail && thumbnail.asset) {
    const dims = getImageDimensions(thumbnail)
    width = dims.width
    height = dims.height
  }
  
  return <div className={`relative md:w-full`}>
    { thumbnail && thumbnail.asset && <Image className={ rounded } src={thumbnail && thumbnail.asset && urlFor(client, thumbnail.asset)} width={width} height={height} layout="responsive" objectFit="contain" alt=""/>}
  </div>
}

export default ImageCard