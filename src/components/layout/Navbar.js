import {Link} from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'
import logo from '../../img/logo.png'


function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
            <Link to="/Home">
                <img src={logo} alt="ChuteSal" />
            </Link>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to="/newchampionship">Campeonato</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/newunity">Unidade</Link>
                </li>            
                <li className={styles.item}>
                    <Link to="/equipe">Times</Link>
                </li> 
                <li className={styles.item}>
                    <Link to="/Home">Sign In</Link>
                </li><li className={styles.item}>
                    <Link to="/">Sign Out</Link>
                </li>
                
            </ul>
            </Container>
        </nav>
    )
}

export default Navbar