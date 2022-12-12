import styles from  './Home.module.css'
import fute from '../../img/fute.png'
import LinkButton from '../layout/LinkButton'

function Register() {

    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>ChuteSal</span></h1>
            <p>Cadastre-se para criar e gerenciar campeonatos de futebol</p>
            <img src={fute} alt="ChuteSal" />
            <LinkButton to="./RegForm" text="Cadastrar jogador" />
        </section>
    )
}

export default Register