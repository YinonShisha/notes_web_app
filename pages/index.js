import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <button onClick={() => router.push('/edit/abc')}>
        new text note
      </button>
    </div>
  )
}
