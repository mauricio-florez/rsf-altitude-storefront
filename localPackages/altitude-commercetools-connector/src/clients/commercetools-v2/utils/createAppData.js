import getClient from '../../commercetools/commercetools-client'
// TODO move create data to v-2
export default async function createAppData(req) {
    const client = await getClient(req)
    const { results = [] } = await client.getMenu();  
 
    const data = results.filter(cat => cat.ancestors.length != 0)
    const finalresults = data.filter(cat => cat.ancestors.length == 1)
        .map(cat => {
            return {
                id: cat.id,
                name: cat.name.en,
                childrens: data.filter(subcat => subcat.parent.id === cat.id && cat.ancestors.length != 0)
                    .map(subcat => { return { id: subcat.id, name: subcat.name.en } })
            }
        })
    
    const tabs = finalresults.map(cat => {
        const tab = {
            text: cat.name,
            as: `/s/${cat.id}`,
            href: '/s/[...categorySlug]',
        }
        if (cat.childrens) {
            tab.items = cat.childrens.map(cat => {
                return {
                    text: cat.name,
                    as: `/s/${cat.id}`,
                    href: '/s/[...categorySlug]',
                }
            })
        }
        return tab
    })

    return Promise.resolve({ menu: { items: tabs }, tabs })
}