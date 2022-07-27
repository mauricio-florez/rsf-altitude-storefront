import fetch from 'node-fetch'
import querystring from 'querystring'
import { COOKIES } from './constants'

const auth = process.env.AUTH_URL
const host = process.env.HOST_URL
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const projectKey = process.env.PROJECT_KEY
// const customerId = 'f9a1f254-437d-4e94-937c-4dee4393d0b8';


function createUrl(prePath, postPath, query) {   
    return `${host}/${projectKey}/${prePath}`
}

function createAuthUrl(prePath, postPath) {
    return `${auth}/${prePath}`
}

function decodeUser(req) {
    try {
        const buff = new Buffer(req.cookies[COOKIES.USER], 'base64')
        const text = buff.toString('ascii')
        return JSON.parse(text)
    } catch {
        return {}
    }
}

export function encodeUser(user) {
    const buff = new Buffer(JSON.stringify(user))
    return buff.toString('base64')
}

async function authToken() {   
    var basicAuth = Buffer.from("".concat(clientId, ":").concat(clientSecret)).toString('base64');
    const url = createAuthUrl('oauth/token?grant_type=client_credentials', '', {
            Username: clientId,
            Password: clientSecret
        })
        
    const res = await fetch(url, {
        method: 'post',
        body: JSON.stringify({
            type: 'guest',
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '.concat(basicAuth)
        },
    })
    const data = await res.json()
    const token = data.access_token; 
    
    return {
        token,
        // customerId,
        ...data,
    }
}

export default function getClient(req) {

    let user = decodeUser(req)
      
    async function refreshAuth() {
        user = await authToken()
    }

    async function fetchWithToken(url, options) {
       
        if (!user.token) {
            await refreshAuth()
        }

        const opt = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
        }

       
        let res = await fetch(url, opt)
           
        if (res.statusText === 'Unauthorized') {
            // Token expired
          
            await refreshAuth()
            return fetchWithToken(url, options)
        } else {
            if (res.statusText === 'OK') {
                return await res.json()
            } else {
                throw new Error(await res.text())
            }
        }
    }

    function api(prePath, postPath, query) {
        const url = createUrl(prePath, postPath, query)
     
        return fetchWithToken(url)
    }

    function getProduct(id, query = {}) {
        return api(`products/${id}`, `products/${id}`, query)
    }

    function getProducts(query = {}) {
        return api('products', `products`, query)
    }

    function getCategory(id, query = {}) {

        return api('categories?limit=200', `categories/${id}`, query)
    }

    function findProducts(catid) {
        return api(`product-projections/search?filter=categories.id:"${catid}"`, 'product-search', catid)
    }

    // TODO: increase to 3 levels and update menu
    function getMenu(levels = 2) {
        return getCategory('root', {})
    }

    function getSuggestions(catid) {
        return api(`product-projections/search?filter=categories.id:"${catid}"`, 'product-search', catid)
            //return api('search/shopper-search', 'search-suggestions', query)
    }

    async function session() {
        if (!user.token) {
            //'No token or cust id')
            await refreshAuth()
        }
    }

    async function getCart() {
        try {
            // console.log('carts: ', user)
            const carts = await api(`carts/customer-id=${user.customerId}`, `customers/${user.customerId}/baskets`)
          
            if (carts.lineItems.length === 0) {
                return await createCart()
            } else {
                return carts
            }

        } catch {
            // If something goes wrong, just make a new one
            console.log('catch');
            return await createCart()
        }
    }

    function createCart() {
        const url = createUrl('carts', 'baskets')
       
        return fetchWithToken(url, {
            method: 'post',
            body: JSON.stringify({
                currency: "EUR"                   
            }),
        })
    }

    async function addToCart({ productId, quantity }) {
        const cart = await getCart()
        const url = createUrl('carts', `baskets/${cart.basketId}/items`)
        return fetchWithToken(url, {
            method: 'post',
            body: JSON.stringify([{ productId, quantity }]),
        })
    }

    async function removeFromCart(itemId) {
        const cart = await getCart()
        const url = createUrl('carts', `baskets/${cart.basketId}/items/${itemId}`)
        return fetchWithToken(url, {
            method: 'delete',
        })
    }

    async function updateCart(itemId, quantity) {
        const cart = await getCart()
        const url = createUrl('carts', `baskets/${cart.basketId}/items/${itemId}`)
        return fetchWithToken(url, {
            method: 'patch',
            body: JSON.stringify({ quantity }),
        })
    }

    function signUp({ email, firstName, lastName, password, login }) {
        const url = createUrl('customers', 'customers')
        return fetchWithToken(url, {
            method: 'post',
            body: JSON.stringify({
                customer: {
                    email,
                    firstName,
                    lastName,
                    login,
                },
                password,
            }),
        })
    }

    async function signIn(email, password) {
        const url = createUrl('customers', 'customers/actions/login', { clientId })
        const buff = new Buffer(`${email}:${password}`)
        const opt = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${buff.toString('base64')}`,
            },
            body: JSON.stringify({
                type: 'credentials',
            }),
        }
        const res = await fetch(url, opt)
        if (res.statusText === 'Unauthorized') {
            throw new Error(await res.text())
        }
        const token = res.headers.get('authorization')
        const data = await res.json()
        user = {
            token,
            authType: data.authType,
            customerId: data.customerId,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            login: data.login,
        }
        return user
    }

    return {
        getCategory,
        getCart,
        session,
        getProduct,
        getProducts,
        getSuggestions,
        getMenu,
        findProducts,
        createCart,
        addToCart,
        removeFromCart,
        updateCart,
        signUp,
        signIn,
        get user() {
            return user
        },
    }
}