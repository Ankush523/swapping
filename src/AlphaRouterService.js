import React from 'react'
const { AlphaRouter } = require('@uniswap/smart-order-router')
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core') 
const { ethers, BigNumber } = require('ethers')
const JSBI = require('jsbi')
const WethABI = require('./ABIs/WethABI.json')
const MaticABI = require('./ABIs/MaticABI.json')

const V3_SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
const REACT_APP_ALCHEMY_URL_TESTNET = process.env.REACT_APP_ALCHEMY_URL_TESTNET

const chainId = 137
const web3Provider = new ethers.providers.JsonRpcProvider(REACT_APP_ALCHEMY_URL_TESTNET)
const router = new AlphaRouter({chainId: chainId, provider: web3Provider})

const name0 = 'Wrapped Ether'
const symbol0 = 'WETH'
const decimals0 = 18
const address0 = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'

const name1 = 'MATIC Token'
const symbol1 = 'MATIC'
const decimals1 = 18
const address1 = '0x0000000000000000000000000000000000001010'

const WETH = new Token(chainId, address0, decimals0, symbol0, name0)
const MATIC = new Token(chainId, address1, decimals1, symbol1, name1)

export const getWethContract = () => new ethers.Contract(address0, WethABI, web3Provider)
export const getMaticContract = () => new ethers.Contract(address1, MaticABI, web3Provider)

export const getPrice = async(inputAmount, slippageAmount, deadline, walletAddress) => {
    const percentSlippage = new Percent(slippageAmount, 100)
    const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0)
    const currencyAmount = CurrencyAmount.fromFractionalAmount(WETH, JSBI.BigInt(wei))

    const route = await router.route(
        currencyAmount, MATIC, TradeType.EXACT_INPUT, {
            recipient: walletAddress,
            slippageTolerance : percentSlippage,
            deadline :  deadline,
        }
    )

    const transaction = {
        data: route.methodParameters.calldata,
        to: V3_SWAP_ROUTER_ADDRESS,
        value: BigNumber.from(route.methodParameters.value),
        from: walletAddress,
        gasPrice: BigNumber.from(route.gasPriceWei),
        gasLimit: ethers.utils.hexlify(1000000)
    }

    const quoteAmountOut = route.quote.toFixed(6)
    const ratio = (quoteAmountOut/inputAmount).toFixed(3)

    return [
        transaction,
        quoteAmountOut,
        ratio
    ]
}

export const runSwap = async(transaction, signer) => {
    const approvalAmount = ethers.utils.parseUnits('10',18).toString()
    const contract0 = getWethContract()
    await contract0.connect(signer).approve(V3_SWAP_ROUTER_ADDRESS,approvalAmount)
    signer.sendTransaction(transaction)
}