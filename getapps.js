#!/usr/bin/env node
const { request, GraphQLClient } = require('graphql-request')

const argv = require('yargs').argv;

async function main() {
    const endpoint="https://api.fly.io/graphql"

    const FlyAPIClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: 'Bearer ' + process.env.FLY_API_TOKEN
        }
    })

    const query = `
        query {
            apps {
                nodes {
                    id
                    name
                    }
                }
            }`

    const variables = {};

    const data = await FlyAPIClient.request(query, variables)
    console.log(JSON.stringify(data, undefined, 2));
}

main().catch(error => console.error(error));
