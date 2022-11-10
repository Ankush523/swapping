import React from 'react'

const CurrencyField = props => {
    const getPrice = (value) => {
        props.getSwapPrice(value)
    }
  return (
    <div className='row currencyinput'>
        <div className='numbercontainer'>
            {props.loading ? (
                <div className='spinnercontainer'>
                    <props.spinner/>
                </div>
            ):(
                <input className='currencyinputfield' placeholder='0.0' value={props.value} onBlur={e => (props.field === 'input ?' ? getPrice(e.target.value) : null)}/>
            )}
        </div>

        <div className='tokencontainer'>
            <span className='tokenname'>{props.tokenName}</span>
            <div className='balancecontainer'>
                <span className='balanceamount'>Balance : {props.balance?.toFixed(3)}</span>
            </div>
        </div>
    </div>
  )
}

export default CurrencyField