import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between items-between'>
        <div>
            <label>Logo</label>
        </div>

        <div className='flex flex-row justify-between'>
            <label>Swap</label>
            <label>Pool</label>
            <label>Vote</label>
            <label>Charts</label>
        </div>

        <div>
            <ConnectButton/>
        </div>
    </div>
  )
}

export default Navbar