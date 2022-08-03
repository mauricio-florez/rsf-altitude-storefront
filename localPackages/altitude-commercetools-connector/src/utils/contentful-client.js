// https://cdn.contentful.com/spaces/dli1gm1g4047/environments/master/entries/2jLon2EdZGfK1jE2V7JKdS?access_token=4dqfDQWPML8tZy2cEfZ_c3umeemW5CbGeUhFD2jvjpQ
const contentful = require("contentful");

const host = process.env.CONTENTFUL_HOST_URL || 'https://cdn.contentful.com/spaces/'
const spaceId = process.env.CONTENTFUL_SPACE_ID || 'dli1gm1g4047'
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || '4dqfDQWPML8tZy2cEfZ_c3umeemW5CbGeUhFD2jvjpQ';


function createUrl(prePath, postPath, query) {   
    return `${host}/${spaceId}/master`
}

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

    return {
        getEntry,
    }
}