import React from 'react'
const { AlphaRouter } = require('@uniswap/smart-order-router')
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core') 
const { ethers, BigNumber } = require('ethers')
const JSBI = require('jsbi')
const ERC20ABI = require('./abi.json')
const AlphaRouterService = () => {
  return (
    <div>AlphaRouterService</div>
  )
}

export default AlphaRouterService