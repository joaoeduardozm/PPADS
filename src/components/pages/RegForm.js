import styles from  './Home.module.css'
import fute from '../../img/fute.png'
import ProjectFormRegister from '../project/ProjectFormRegister'

import {useNavigate} from  'react-router-dom'

function RegForm() {

    const navigate = useNavigate()

    function createPost(project) {

        // initialize
        project.services = []

        fetch ("http://localhost:5000/jogadores", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            navigate('/jogadores', {message: 'Jogador cadastrado com sucesso'})
        })
        .catch(err => console.log(err))
    }

    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>ChuteSal</span></h1>
            <p>Cadastre-se para criar e gerenciar campeonatos de futebol</p>
            <img src={fute} alt="ChuteSal" />
            <ProjectFormRegister handleSubmit={createPost} btnText="Cadastrar Jogador"/>
        </section>
    )
}

export default RegForm