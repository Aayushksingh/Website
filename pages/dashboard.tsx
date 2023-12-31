import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/clientApp';
import styles from '../styles/Dashboard.module.css';
import Search from './components/search';
import initialDetails from '../lib/searchDetails';
import {Settings} from '@carbon/icons-react'
import Link from 'next/link';
import {Logout} from '@carbon/icons-react'
import barChart from './components/BarChart';



const Dashboard = () =>{
    const {user, logOut} = useAuth();

    const [User, setUser] = useState<any>({userData: null, id:"initial"})
  
    useEffect(()=> onSnapshot(collection(db, "users"), (snapshot)=> {
      if(user){
          snapshot.docs.map(doc => {if(doc.data().uid == user.uid)
          setUser({ userData: doc.data(), id: (doc.id)});      
          })
      }
  }) , [])    
    return(
        <>
        {User.userData ? (
        <div className={styles.mainContainer}>
        <div className={styles.sideBar}>
            <Link href="/"><h1>Slate</h1></Link>
            <div className={styles.sideBarContainer}>
                <div className={styles.profilePic}>
                    <img src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
                </div>
                <p>{User.userData.displayName}</p>
                <p>{User.userData.email}</p>
                {/* <Settings size={24} /> */}
                <div className={styles.sideBarLinks}>
                </div>
            </div>
            <Link href="/"><button className={styles.logoutButton} onClick={()=> logOut()}><Logout size={16} />Logout</button></Link>
        </div>
        <section className={styles.content}>
            <h1>Welcome Back, {User.userData.displayName}</h1>
            <div className={styles.banner}>
                <h1>Start Learning with Slate</h1>
            </div>
           <Search details={initialDetails} />
           <div className={styles.cardsContainer}>
                <div className={styles.cardsRow1}>
                    <Link href="/achievements">
                        <div className={styles.achievementCard}>
                            <div className={styles.achievementHead}>
                                <p className={styles.achievementTitle}>Achievements</p>
                            </div>
                            <div className={styles.achievementBody}>
                                <img src="https://cdn.discordapp.com/attachments/795685111692918806/964083692848959488/unknown.png" style={{width: "100px"}} />
                                <h2>Physics</h2>
                            </div>
                            <div className={styles.achievementFooter}>
                                feature <b>Coming Soon</b>
                            </div>
                        </div>
                    </Link>
                    <Link href="/maths">
                    <div className={styles.mathsCard}>
                        <p>Mathematics</p>
                        <img className={styles.mathImg} src="/pages/dashboard/math.svg" />
                    </div>
                    </Link>
                    <div className={styles.progressCardsContainer}>
                        <Link href={`/${User.userData.progress1}`}>
                        <div className={styles.progressCard1}>
                            <h2>{User.userData.progress1} Progress</h2>
                            <p className="progress"><b>{User.userData.courses[User.userData.progress1].completed}</b> out of <b>2</b> done</p>
                        </div>
                        </Link>
                        <Link href={`/${User.userData.progress2}`}>
                        <div className={styles.progressCard2}>
                            <h2>{User.userData.progress2} Progress</h2>
                            <p className="progress"><b>{User.userData.courses[User.userData.progress2].completed}</b> out of <b>2</b> done</p>
                        </div>
                        </Link>
                    </div>
               </div>
               <div className={styles.cardsRow2}>
                   <Link href="/physics">
                        <div className={styles.physicsCard}>
                                    <p>Physics</p>
                                    <img className={styles.phyImg} src="/pages/dashboard/phy.svg" />
                        </div>
                    </Link>
                    <div className={styles.discoverCard}>
                        <p>Discover</p>
                        <div className={styles.discoverSubject}>
                                <div className={styles.discoverText}>
                                    <h1>Biology</h1>
                                    <p>Human Body</p>
                                </div>
                                <img src="/pages/biology/courses/HumanBody.svg" style={{width:"60px", height:"60px"}} />
                        </div>
                    </div>
                </div>
           </div>
        </section>
        <section className={styles.rightSection}>
            <div className={styles.suggestionsContainer}>
                <p>Suggesions</p>
                <div className={styles.suggestions}>
                    <Link href="/maths/pythagoras_theorem">
                        <div className={styles.suggestion}>
                        <h1>Maths</h1>
                        <p>Pythagoras Theorem</p>
                    </div></Link>
                    <Link href="/physics/ray_optics">
                    <div className={styles.suggestion}>
                        <h1>Physics</h1>
                        <p>Ray Optics</p>
                    </div></Link>
                    <Link href="/biology/cell">
                    <div className={styles.suggestion}>
                        <h1>Biology</h1>
                        <p>Cell</p>
                    </div>
                    </Link>
                </div>
            </div>
            <div className={styles.graphContainer}>
                <p>Analytics</p>
            {barChart({userData: User.userData})}
                
                
            </div>
        </section>
        </div>
        ): <div>loading</div>
    }
        </>
    )
}

export default Dashboard