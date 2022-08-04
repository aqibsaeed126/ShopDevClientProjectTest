import { isMobileOnly } from 'react-device-detect'

type PaginationProps = {
  totalCount: number, 
  pageSize: number, 
  pageNumber: number,
  queryString: any
}

const Pagination = (props: PaginationProps) =>  {
  
  const { totalCount, pageSize, pageNumber, queryString } = props
  const start = 1 
  const end = Math.ceil(totalCount / pageSize)

  const cutoffLimit = isMobileOnly ? 1 : 4

  const loopStart = (pageNumber - cutoffLimit) < start ? start : (pageNumber - cutoffLimit)
  const loopEndToAdd = (pageNumber - cutoffLimit) < start ? (pageNumber - cutoffLimit) * -1 : 0
  const loopEnd = (pageNumber + cutoffLimit + loopEndToAdd) > end ? end : (pageNumber + cutoffLimit + loopEndToAdd)

  const showStart = (pageNumber - cutoffLimit) > start && loopStart !== start
  const showEnd = (pageNumber + cutoffLimit) < end && loopEnd !== end

  const showStartElipsis = (pageNumber - cutoffLimit - 1) > start && loopStart !== start
  const showEndElipsis = (pageNumber + cutoffLimit + 1) < end && loopEnd !== end

  let midPages = []
  for (let i=loopStart; i<=loopEnd; i++) {
    midPages.push(i)
  }

  const buildPaginationQueryString = (value:number) => {
    let queryStringFilter = ''
    for (var key of Object.keys(queryString)) {
      if (key !== 'page' && key !== 'slug') {
        queryStringFilter += (queryStringFilter ? '&' : '?') + `${key}=${queryString[key]}`  
      }
    }

    queryStringFilter += (queryStringFilter ? '&' : '?') + `page=${value}`  

    return queryStringFilter
  }

  if (totalCount === 0) {
    return <div className="w-full text-center flex justify-center">New contents coming up soon.</div>
  }

  if (end === 1) {
    return null
  }

  return <div className="w-full text-center flex justify-center pb-24">
    { pageNumber !== start && <a className="px-4 py-2 border" href={`${buildPaginationQueryString(pageNumber - 1)}`}>{`<`}</a> }
    { showStart && <a className="px-4 py-2 border-y border-r" href={`${buildPaginationQueryString(start)}`}>{start}</a> }
    { showStartElipsis && <div className="px-4 py-2 border-y border-r">...</div> }
    { midPages && midPages.map((page, index) => <a key={index} className={`px-4 py-2 border-y border-r ${page === pageNumber ? `bg-primary text-white` : ``}`} href={`${buildPaginationQueryString(page)}`}>{page}</a>)}
    { showEndElipsis && <div className="px-4 py-2 border-y border-r">...</div> }
    { showEnd && <a className="px-4 py-2 border-y border-r" href={`${buildPaginationQueryString(end)}`}>{end}</a>}
    { pageNumber !== end && <a className="px-4 py-2 border-y border-r" href={`${buildPaginationQueryString(pageNumber + 1)}`}>{`>`}</a> }
  </div>
}

export default Pagination