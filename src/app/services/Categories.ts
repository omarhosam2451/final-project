

interface category{
  id:string
  name:string
  slug:string
  image:string
}
export async function getAllCategories(): Promise<category[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    cache: 'force-cache'
  })
  const finalRes = await res.json()
  console.log(finalRes) 
  return finalRes.data  
}