import React from 'react';
import styles from './CommonTable.module.css'

const CommonTableColumn = ({ children }) => {
  return (
    <td className={styles.tablecolumn}>
      {
        children
      }
    </td>
  )
}

export default CommonTableColumn;