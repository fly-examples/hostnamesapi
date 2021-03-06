#!/usr/bin/env node
const { request, GraphQLClient } = require('graphql-request')

const argv = require('yargs')
    .demandOption(['appname','hostname'])
    .alias('a','appname')
    .alias('h','hostname')
    .argv;
 
async function main() {
    const endpoint="https://api.fly.io/graphql"

    const FlyAPIClient=new GraphQLClient(endpoint, {
        headers: {
            authorization: 'Bearer '+process.env.FLY_API_TOKEN
        }
    })

    const query= `
    query($appName: String!, $hostname: String!) {
        app(name: $appName) {
            certificate(hostname: $hostname) {
                check
                configured
                acmeDnsConfigured
                acmeAlpnConfigured
                certificateAuthority
                createdAt
                dnsProvider
                dnsValidationInstructions
                dnsValidationHostname
                dnsValidationTarget
                hostname
                id
                source
                clientStatus
                issued {
                    nodes {
                        type
                        expiresAt
                    }
                }
            }
        }
    }`
        
    const variables= { appName: argv.appname, hostname: argv.hostname };

    const data = await FlyAPIClient.request(query, variables)
    console.log(JSON.stringify(data,undefined,2));
}

main().catch(error => console.error(error));
