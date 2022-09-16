import React from 'react';
import styles from './CommonTable.module.css'

const CommonTableRow = ({ children }) => {
  return (
    <tr className={styles.tablerow}>
      {
        children
      }
    </tr>
  )
}

export default CommonTableRow;