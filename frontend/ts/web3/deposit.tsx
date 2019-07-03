import * as ethers from 'ethers'
const mixerAbi = require('../abis/Mixer-abi.json')
const deployedAddresses = require('../deployedAddresses.json')
const config = require('../exported_config')

/*
 * Perform a web3 transaction to make a deposit
 * @param context The web3-react context
 * @param identityCommitment A hex string of the user's identity commitment
 * @param mixAmt The amount to mix
 */
const deposit = async (
    context: any,
    identityCommitment: string,
    mixAmt: ethers.utils.BigNumber,
) => {

    const library = context.library
    const connector = context.connector
    if (library && connector) {
        const provider = new ethers.providers.Web3Provider(
            await connector.getProvider(config.chain.chainId),
        )
        const signer = provider.getSigner()

        const mixerContract = new ethers.Contract(
            deployedAddresses.Mixer,
            mixerAbi,
            signer,
        )

        const tx = await mixerContract.deposit(identityCommitment, { value: mixAmt })
        return tx
    }
}

export { deposit }
