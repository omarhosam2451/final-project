interface productData{
  title:string
  imageCover:string
  description:string
  price:number
  images:string[]
  ratingsAverage:number
  priceAfterDiscount:number
  brand:brand
  category:category
  _id:string
}

interface category{
  id:string
  name:string
  slug:string
  image:string
}

interface brand{
  id:string
  name:string
  slug:string
  image:string
}

export async function getProductById(id:string): Promise<productData> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`,{
    cache:"force-cache"
  })
  const finalRes = await res.json()
  console.log(finalRes)
  return finalRes.data
}