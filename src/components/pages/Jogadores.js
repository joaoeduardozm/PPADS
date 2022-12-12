import Message from "../layout/Message"
import styles from './Unidades.module.css'

import { useLocation } from 'react-router-dom'
import Container from "../layout/Container"
import LinkButton from '../layout/LinkButton'
import ProjectCardJogadores from "../project/ProjectCardJogadores"
import { useState, useEffect } from "react"
import Loading from "../layout/Loading"

function Jogadores() {

    const [jogadores, setJogadores] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(
            () => {
                fetch('http://localhost:5000/jogadores', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setJogadores(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err)) 
            }, 3000)
    }, [])

    function RemoveProject(id) {
        fetch(`http://localhost:5000/jogadores/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(() => {
                setJogadores(jogadores.filter((jogador) => jogador.id !== id))
                setProjectMessage('Jogador removido com sucesso!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>jogadores</h1>
                <LinkButton to="../RegForm" text="Cadastrar Jogador" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {jogadores.length > 0 &&
                    jogadores.map((jogador) => (
                    <ProjectCardJogadores 
                        id={jogador.id}
                        name={jogador.name}
                        key={jogador.id}
                        handleRemove={RemoveProject}
                     />
                     ))}
                    {!removeLoading && <Loading/>}
                    {removeLoading && jogadores.lenght === 0 && (
                        <p>Não existem jogadores cadastrados</p>
                    )}
            </Container>
        </div>
    )
}

export default Jogadores