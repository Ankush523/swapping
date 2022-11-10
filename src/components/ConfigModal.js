import React from 'react'

const ConfigModal = props => {
  return (
    <div className='modally' onClick={props.onClose}>
        <div className='modal-content' onClick={e => e.stopPropagation()}>
            <div className='modal-body'>
                <h4 className='titleHeader'>Transaction Settings</h4>

                <div className='row' >
                    <label className='labelField'>Slippage Tolerance</label>
                </div>

                <div className='row' >
                    <div className='fieldcontainer'>
                        <input className='inputfield' placeholder='1.0%' value={props.slippageAmount} onChange={e => props.setSlippageAmount(e.target.value)}/>
                    </div>
                    <div className='inputfieldunitscontainer'>
                        <span>%</span>
                    </div>
                </div>

                <div className='row' >
                <label className='labelField'>Transaction Deadline</label>
                </div>

                <div className='row' >
                <div className='fieldcontainer'>
                        <input className='inputfield' placeholder='10' value={props.deadMinutes} onChange={e => props.setDeadlineMinutes(e.target.value)}/>
                    </div>
                    <div className='inputfieldunitscontainer'>
                        <span>minutes</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfigModal