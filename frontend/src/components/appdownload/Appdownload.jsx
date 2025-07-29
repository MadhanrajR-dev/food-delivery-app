import React from 'react'
import './appdownload.css'
import {assets} from '../../assets/assets'

const Appdownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better look For</p>
        <div className='app-download-plateform'>
            <img src={assets.play_store} alt=''/>
            
            <img src={assets.app_store} alt=''/>
        </div>
    
      
    </div>
  )
}

export default Appdownload
