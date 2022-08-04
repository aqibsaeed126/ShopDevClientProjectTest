import { SanityClient } from '@sanity/client' 

const getArticles = async(page: string, client: SanityClient, size: number = 20) => {
  let query = `count(*[
    _type == 'article' && 
    !(_id in path("drafts.**")) && 
    ExcludeFromHomePage != true && 
    passwordLock != true && 
    defined(published) && 
    dateTime(published) <= dateTime(now())
  ]{_id})`
  const totalCount = await client.fetch(query)

  query = `*[
    _type == 'article' && 
    !(_id in path("drafts.**")) && 
    ExcludeFromHomePage != true && 
    passwordLock != true && 
    defined(published) && 
    dateTime(published) <= dateTime(now())
  ] | order(published desc) [$from...$to] {
    _id, 
    title, 
    "url": url.current, 
    summary, 
    thumbnail,
    published
  }`

  const pageSize = size; 
  let pageNumber = isNaN(Number(page)) ? 1 : parseInt(page);
  if (pageNumber < 1) {
    pageNumber = 1
  }

  const from = (pageNumber - 1) * pageSize
  const to = (pageNumber) * pageSize

  const articles = await client.fetch(query, {
    from, 
    to
  })

  return {
    totalCount,
    articles, 
    pageNumber, 
    pageSize
  }
}

export default getArticles