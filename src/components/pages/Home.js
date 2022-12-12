import styles from  './Home.module.css'
import fute from '../../img/fute.png'
import { Link } from 'react-router-dom'
import LinkButton from '../layout/LinkButton'

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>ChuteSal</span></h1>
            <p>Gerencie seus campeonatos</p>
            <LinkButton to="../newchampionship" text="Criar Campeonato" />
            <LinkButton to="../newunity" text="Cadastrar Unidade" />
            <LinkButton to="../newtime" text="Cadastrar Time" />
            <img src={fute} alt="ChuteSal" />
            <LinkButton to="../championships" text="Visualizar campeonatos" />
            <LinkButton to="../unidades" text="Visualizar unidades" />
            <LinkButton to="../equipe" text="Visualizar Times" />
            <LinkButton to="../jogadores" text="Visualizar Jogadores" />
        </section>
    )
}

export default Home