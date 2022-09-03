# IPFS Client Template

This template showcase how to consume [Web3.Storage](https://web3.storage/) and [NFT.Storage](https://nft.storage/) through the usage of their API and SDK.

## How to start

1. cd into the root folder
2. Run `npm install` to install the dependencies
3. Run `cp .env.template .env.development` to copy the environment variable file (this is only for locally, you will set the environment variable directly on platform if you are deploying instead)
4. If required, fill in the `.env.development`
5. Run `npm run dev` to start the website and access it via `localhost:3000`

## How to deploy

1. It is highly recommended to use [Vercel](https://vercel.com/), due to its ease of deployment and in terms of cost to traffic load, it is one of the more effective ones
2. Ensure that no matter what deployment platform that you are using, you are to key in the environment variables, this is the part where you truly control. Without the environment variables, the website will not be interacting with the smart contract
3. Once the deployment is complete, you may proceed to connect your purchased domain
