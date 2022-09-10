import styles from '../../styles/Home.module.css'

function Editor() {
    return (
        <div contentEditable="true" className={styles.editor}>
        </div>
    )
  }
  
  export default Editor