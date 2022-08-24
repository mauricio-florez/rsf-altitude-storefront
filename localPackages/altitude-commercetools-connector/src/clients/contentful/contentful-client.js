import { spaceId, accessToken } from "./config/config.js"
import Axios from 'axios'
import {arrayToTree} from 'performant-array-to-tree';
const contentful = require("contentful");

export default function getContentFulClient(req) {

    const client = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: spaceId,
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken
    });

    async function getEntry(entry_id) {
        let response
        await client
        .getEntry(entry_id || "2jLon2EdZGfK1jE2V7JKdS")
        .then(entry => response = entry)
        .catch(err => response = err);
        return response
    }

    const getCategoryTree = async () => {
        // We want to load the collection tree only once the first time
        // we have to investigate how to load the application and keep it cached after.
        const {data} = await Axios.post(`https://graphql.contentful.com/content/v1/spaces/${spaceId}?access_token=${accessToken}`, {
            query: `query {
                categoryCollection {
                    items {
                        sys { id }
                        nameFr: name(locale: "fr-CA")
                        nameEn: name(locale: "en-US")
                        slug
                        parentCategoriesCollection{
                            items{
                                sys { id }
                            }
                        }
                    }
                }
            }`
        })

        const categories = [];

        for(const category of data.data.categoryCollection.items){
            const baseCategory = {
                id: category.sys.id,
                name: {
                    fr: category.nameFr,
                    en: category.nameEn
                },
                slug: category.slug,
            }


            if(category.parentCategoriesCollection.items.length === 0){ 
            categories.push(baseCategory)
            }else {
            for(const parentCategory of category.parentCategoriesCollection.items){
                categories.push({
                    ...baseCategory,
                    parentId: parentCategory.sys.id
                })
            }
            }
        }

        const _categoryTree = arrayToTree(categories, {dataField: null})

        console.log(_categoryTree)
        return _categoryTree;
    }

    let _collectionPaths = new Map();
    const getCollectionPaths = async () => {
        if(_collectionPaths.size === 0){
            const tree = await getCategoryTree();

            const recursivelyProcessChildren = (c, parentPath = '') => {
                for(const category of c){
                    const path = `${parentPath}/${category.slug}`;
                    collection.set(path, category);
                    
                    if(category.children && category.children.length > 0){
                        recursivelyProcessChildren(category.children, path)
                    }
                }
            }

            recursivelyProcessChildren(tree)
        }

        return _collectionPaths;
    }

    return {
        getEntry,
        getCategoryTree,
        getCollectionPaths,
    }
}
