import React from 'react'
import { CFooter } from '@coreui/react'

function backToTop(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://kyanc.edu.bd/" target="_blank" rel="noopener noreferrer">KYANC Admin Panel</a>
        <span className="ml-1">&copy; 2020 Khwaja Yunus Ali Nursing College.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="http://www.atilimited.net" target="_blank" rel="noopener noreferrer">ATI Limited</a>
      </div>
      <button onClick={()=>backToTop()} className="back-to-top fa fa-chevron-up" />
    </CFooter>
  )
}

export default React.memo(TheFooter)

