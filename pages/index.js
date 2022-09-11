import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'


export default function Home() {
  const router = useRouter()
  function newText(event) {
    event.currentTarget.disabled = true
    axios.post('/api/new_text').then(res => {
      router.push(`/edit/${res.data.token}`)
    })
  }
  return (
    <div className={styles.container}>
      <button onClick={newText}>
        new text note
      </button>
    </div>
  )
}
