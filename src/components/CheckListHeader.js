import styles from '../styles/Scripts.module.css';
import Link from 'next/link';

export default function CheckListHeader() {
  return (
  <div className={styles.csnavbar}>
    <div className={styles.dropdown}>
        {/* <div className={styles.dropbtn}>
          <Link  href="#">HOME</Link>
        </div>
        <div className={styles.dropdown_content}>
            <Link href="/">Home Page</Link>
            <Link href="/call_scripts">Call Scripts</Link>
            <Link href="/checklist">Check-List</Link>
            <Link href="/knowyourstory">Know Your Story</Link>
        </div> */}
    </div>
      <Link href="/">HOME</Link>
      <Link href="/call_scripts">SCRIPTS</Link>
      <Link href="/products">PRODUCTS</Link>
      <Link href="#">SUPPORT</Link>
      {/* <Link href="#">NOTICE-BOARD</Link> */}
    <img className={styles.csnav_img} src="africanbank.svg" alt="Pichere" />
</div>        
  )
}
