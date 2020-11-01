import React from 'react'
import { CFooter } from '@coreui/react'
import { Link } from 'react-router-dom'
function backToTop(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
const TheFooter = () => {
  return (
    <div>
  <button onClick={()=>backToTop()} className="back-to-top fa fa-chevron-up" />
</div>

  )
}

export default React.memo(TheFooter)
