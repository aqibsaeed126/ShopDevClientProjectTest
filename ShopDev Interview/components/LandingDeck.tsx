import ImageCard from "./ImageCard"
import { SanityClient } from '@sanity/client'
import dayjs from 'dayjs'
import advanceFormat from 'dayjs/plugin/advancedFormat'
 
dayjs.extend(advanceFormat)

type LandingDeckProps = {
  data: any,
  index: number,
  client: SanityClient,
  switchSide?: boolean,
  rounded?: string,
  baseUrl?: string,
  titlePrefix?: string,
  labelRequired?: boolean,
  label?: any,
  detailLinkText?: string,
  showPublished?: boolean
}

const LandingDeck = ({
  data, 
  index, 
  client, 
  switchSide = false, 
  rounded,
  baseUrl = '/view',
  titlePrefix = '',
  label,
  labelRequired,
  detailLinkText = '',
  showPublished = true
}: LandingDeckProps) => {
  
  const labelBaseURL = label?.baseURL
  let labelText = ''
  let labelURL = ''
  switch (label?.labelType) {
    case 'Document Group Based':
      labelText = data['documentGroup']?.name
      labelURL = data['documentGroup']?.identifier?.current
      break
    case 'Taxonomy Based': 
      labelText = data['taxonomy']?.name
      labelURL = data['taxonomy']?.identifier?.current
      break
    case 'Content Category Based':
      labelText = data['contentCategory']?.name
      break
  }

  return <div key={index} className={`md:flex mt-4 md:col-span-2 border-t-2 border-t-gray-100`}>
    { !switchSide && data.thumbnail && <a href={`${baseUrl}/${data.url}`} className="md:flex-none w-full md:w-48">
      <ImageCard thumbnail={data.thumbnail} client={client} rounded={rounded}/>
    </a> }
    <div className="flex-auto p-2">
      <h2 className="font-bold"><a href={`${baseUrl}/${data.url}`}>{titlePrefix}{data.title}</a></h2> 
      <div>
        { data.authors && data.authors.map((author:any, idx:number) => {
          return <a key={idx} href={`/authors/${author.url}`} className="text-sm text-sky-800">{author.displayName}</a>
        })}
      </div>
      <a href={`${baseUrl}/${data.url}`}>
        { showPublished && <span className="text-sm text-gray-500">{dayjs(data.published).format('MMMM Do YYYY')}</span> }
        { labelRequired && labelURL && <div className="mt-2">
          <a className="bg-primary border rounded-lg text-xs text-white py-1 px-2" href={`${labelBaseURL}/${labelURL}`}>{ labelText }</a>
        </div>}
        { labelRequired && !labelURL && <div>
          <span className="bg-primary border rounded-lg text-xs text-white py-1 px-2">{ labelText }</span>
        </div>}
        <div className="mt-2">
        { data.deckLabels && Object.keys(data.deckLabels).map((key: any, index: number) => {
          const label = data.deckLabels[key]
          if (!label) return null

          return <span className="p-1 text-xs bg-primary text-white mr-2" key={index}>{label}</span>
        })}
        </div>
        { typeof data.summary === 'string' &&  <p className="mt-4 text-gray-800">{data.summary}</p>}
        { data.volume && <p>Volume: {data.volume}</p>}
        { data.number && <p>Issue: {data.number}</p>}
      </a>
      <div className="flex mt-4">
        { detailLinkText && <div className="p-2">
          <a className="py-2 px-4 border border-primary bg-primary text-white hover:bg-white hover:text-primary" href={`${baseUrl}/${data.url}`}>{detailLinkText}</a>
        </div>}
      </div>
      
    </div>
    { switchSide && data.thumbnail && <div className="md:flex-none w-full md:w-48"><ImageCard thumbnail={data.thumbnail} client={client}/></div> }
  </div>
}

export default LandingDeck