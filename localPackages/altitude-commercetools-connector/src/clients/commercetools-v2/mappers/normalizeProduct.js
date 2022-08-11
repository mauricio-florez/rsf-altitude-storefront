export default function normalizeProduct(data, color, size) { 
  // Filter for images supporting type and variations
  const ProductVarients=[];
  if(data.masterVariant)
    ProductVarients.push(data.masterVariant);
  if(data.variants.length > 0)
    ProductVarients.push(data.variants);

  function getImages( variation) {
    return data.masterVariant.images.map(image=> {
       return {
         src:image.url,
         alt:data.name.en,
         magnify:{ 
          height: 1200,
          width: 800,
          src: image.url
        }}
     })
  }
  
  function getVariationsSize(type) { 
   
    if(!data.masterVariant)
    return []

    const res=[];
    const mastervarient=data.masterVariant.attributes.find(attr => attr.name===type)
    res.push({
      id:mastervarient.value,
            text: mastervarient.value,
            image:[]
      }
    )
    for(let variant of data.variants)
    {
    const result=variant.attributes.find(attr => attr.name===type)
    const resdata ={
      id:result.value,
            text: result.value,
            image:[]
      }
      if(!res.some(item => item.text === result.value))
    res.push(resdata)
    }

    return res
  }

  function getvarientImages(variant){
    return  variant.images.map(image=> {
      return {
        src:image.url,
        alt:data.name.en,
        magnify:{ 
         height: 1200,
         width: 800,
         src: image.url
       }}
    }) 
  }

  function getVariationsColor() { 
   
   
    if(!data.masterVariant)
    return []
    //let variant =ProductVarients.reduce((prev, variant) => prev || variant.attributes.find(item => item.name === 'color'), undefined)
   
    
    const colors = ProductVarients.filter(item => item).map(variant => {
    
      if(!variant.attributes)
      return
      let obj =variant.attributes.find(item => item.name === 'color');
      let Images =getvarientImages(variant)
    
      return {text:obj.value.key,id:obj.value.key.toLowerCase(),image:{src:variant.images[0].url,alt:obj.value.key.toLowerCase()},
      media: { full: Images , thumbnails: Images, thumbnail: Images}
    }
    })   
    return colors.filter(item => item);    
  }

  function getImages2(type) { 
   
    if(!data.masterVariant)
    return []

    const mastervarient=data.masterVariant.attributes.find(attr => attr.name===type)
    return {
      src:mastervarient.value,
      alt:mastervarient.name,
      magnify:{ 
       height: 1200,
       width: 800,
       src: mastervarient.value
     }
    }
  }
  // const colors: {} = getVariationsColor()
  const sizes = getVariationsSize('brandSize1')
  const media = {
    full:[getImages2('mainImage')],
    thumbnails: [getImages2('mainImage')]//getImages('medium'),
  }


  data['price']= 100;// (data.masterVariant.prices[0].value.centAmount)/100 || 100;
  const id = data.id;// data.id || data.productId || 12321;
  const specs = {}  
  return {
    id,
    url: `/p/${id}`,
    name: data.name['en-CA'],//|| data.productName,
    price: data.price,
    priceText: `$${data.price}.00`, // n/a
    // rating: n/a
    description:'Ex proident nisi laborum et sint aliquip dolor cupidatat pariatur sint reprehenderit incididunt duis. Ipsum fugiat adipisicing excepteur non id aliquip cupidatat culpa ex. Aliquip consectetur tempor voluptate nulla excepteur magna non. Enim enim sunt ea labore ex aliqua qui. Velit sint irure duis excepteur fugiat elit voluptate anim sint. Anim voluptate duis aliqua duis excepteur in labore aliqua. Deserunt dolore incididunt aliquip duis. Fugiat nulla sint esse in et nisi enim sit. Reprehenderit in non labore est sit voluptate ipsum sit. Proident culpa ex mollit minim laboris ipsum incididunt dolore quis proident esse ea.',
    specs: 'Ut ullamco dolor dolor velit nisi consectetur. Exercitation sint eu labore dolore nostrud nostrud occaecat ex nulla. Velit culpa ex quis minim Lorem quis consequat anim excepteur. Irure anim ea dolor minim aute quis anim duis ea duis irure sit Lorem irure. Ad duis officia exercitation aute aute incididunt tempor non in sunt nisi ut. Dolor consequat et sint tempor amet irure voluptate id. Dolore non cupidatat Lorem minim. Velit consectetur id eiusmod ad ea sint voluptate tempor duis quis excepteur. Dolore sunt ullamco est incididunt sit et. Sint aute nulla excepteur exercitation velit non.',// data.longDescription,
    media,
    thumbnail:media.thumbnails[0],
    colors: {},
    sizes,    
    quantity: data.quantity || 1,
    // TODO: Remove later
    raw: data,
  }
}
