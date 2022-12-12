import Message from "../layout/Message"
import styles from './Unidades.module.css'

import { useLocation } from 'react-router-dom'
import Container from "../layout/Container"
import LinkButton from '../layout/LinkButton'
import ProjectCard2 from "../project/ProjectCard2"
import { useState, useEffect } from "react"
import Loading from "../layout/Loading"

function Championships() {

    const [campeonatos, setCampeonatos] = useState([])
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
                fetch('http://localhost:5000/campeonatos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setCampeonatos(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err)) 
            }, 3000)
    }, [])

    function RemoveProject(id) {
        fetch(`http://localhost:5000/campeonatos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(() => {
                setCampeonatos(campeonatos.filter((campeonato) => campeonato.id !== id))
                setProjectMessage('Campeonato removida com sucesso!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Campeonatos</h1>
                <LinkButton to="../newchampionship" text="Cadastrar Campeonato" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {campeonatos.length > 0 &&
                    campeonatos.map((campeonato) => (
                    <ProjectCard2
                        id={campeonato.id}
                        name={campeonato.name}
                        data={campeonato.data}
                        key={campeonato.id}
                        handleRemove={RemoveProject}
                     />
                     ))}
                    {!removeLoading && <Loading/>}
                    {removeLoading && campeonatos.lenght === 0 && (
                        <p>Não existem campeonatos cadastrados</p>
                    )}
            </Container>
        </div>
    )
}

export default Championships