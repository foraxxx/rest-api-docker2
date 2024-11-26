import React from 'react'
import styles from './Layout.module.scss'

const Layout = (props) => {
  const {children} = props

  return (
    <div className={styles.grid}>
      {children}
    </div>
  )
}

export default Layout