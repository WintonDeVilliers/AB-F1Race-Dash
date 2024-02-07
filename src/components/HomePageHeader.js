// import styles from '../styles/Header.module.css';
// import styles from '../styles/Scripts.module.css';


// export default function HomePageHeader(){
//     return(
//         <div>
//           <nav className={styles.csnavbar}>
//             <a href="/call_scripts" className={styles.navigation_item} >SCRIPTS</a>
//             <a href="/products" className={styles.navigation_item} >PRODUCTS</a>
//             {/* <a href="/checklist" className={styles.navigation_item} >CHECKLIST</a> */}
//             <a href="/checklist_plain" className={styles.navigation_item} >CHECKLIST</a>
//             <a href="/knowyourstory" className={styles.navigation_item} >SUPPORT</a>
//             <a href="" className={styles.navigation_item} >NOTICE-BOARD</a>
//             {/* <a href="" className={styles.navigation_item} >MISC</a>    */}
//           <img className={styles.csnav_img} src="africanbank.svg" alt="Pichere" />
//           </nav>
//        </div>
//     )
// }
import styles from '../styles/HomeMenu.module.css';

export default function HomePageHeader() {
  return (
    <div>
      <nav className={styles.csnavbar}>
        <input className={`${styles.menu} ${styles._show}`} type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className={styles.menuIcon}>&#9776;</label>
        <ul className={styles.menu}>
          <li><a href="/call_scripts" >SCRIPTS</a></li>
          <li><a href="/products" >PRODUCTS</a></li>
          {/* <li><a href="/checklist" className={styles.navigationItem}>CHECKLIST</a></li> */}
          <li><a href="/checklist_plain">CHECKLIST</a></li>
          <li><a href="/knowyourstory">SUPPORT</a></li>
          <li><a href="">NOTICE-BOARD</a></li>
          {/* <li><a href="" className={styles.navigationItem}>MISC</a></li> */}
        </ul>
        <img className={styles.csnav_img} src="africanbank.svg" alt="Pichere" />
      </nav>
    </div>
  );
}










