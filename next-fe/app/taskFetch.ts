export default async function taskFetch (url: string, options?: any) {
  return await fetch('http://localhost:4000' + url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  })
}
