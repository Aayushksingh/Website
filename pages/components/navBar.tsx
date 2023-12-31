import Link from 'next/link';
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/navbar.module.css'


function NavBar({ buttonText }) {
const {logOut} = useAuth();

  return (
    <div className={styles.navbar}>
        <Link href="/"><h1>Slate</h1></Link>
        <div className={styles.buttonContainer}>
        {buttonText == "login" &&
        <Link href="/login">
          <div className={styles.but}>{buttonText}</div>
        </Link>
        }
      { buttonText != "login" && 
      <>
        <Link href="/dashboard">
          <div className={styles.but}>
            {buttonText}
            </div>
          </Link>
        <Link href="/login">
          <div className={styles.but} onClick={()=>{logOut()}}>logout</div>
          </Link>
      </>
      }
      </div>
        
    </div>
  )
}


export default NavBar