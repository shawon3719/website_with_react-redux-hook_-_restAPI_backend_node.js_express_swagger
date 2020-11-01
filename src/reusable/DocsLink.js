import React from 'react'
import { CLink } from '@coreui/react'

const DocsLink = props => {
  const {
    name,
    text,
    ...rest
  } = props

  const href = name ? `http://localhost:3002/${name}` : props.href

  return (
    <div className="card-header-actions">
      <CLink 
        {...rest}
        href={href}
        rel="noreferrer noopener" 
        target="_blank" 
        className="card-header-action"  
      >
        <small className="text-muted">{ text || 'docs' }</small>
      </CLink>
    </div>
  )
}

export default React.memo(DocsLink)