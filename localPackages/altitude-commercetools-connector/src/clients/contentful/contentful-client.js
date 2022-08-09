import { spaceId, accessToken } from "./config/config.js"
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

    return {
        getEntry,
    }
}
