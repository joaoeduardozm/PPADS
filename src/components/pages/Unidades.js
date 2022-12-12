import Message from "../layout/Message"
import styles from './Unidades.module.css'

import { useLocation } from 'react-router-dom'
import Container from "../layout/Container"
import LinkButton from '../layout/LinkButton'
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"
import Loading from "../layout/Loading"

function Unidades() {

    const [unidades, setUnidades] = useState([])
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
                fetch('http://localhost:5000/unidades', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setUnidades(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err)) 
            }, 3000)
    }, [])

    function RemoveProject(id) {
        fetch(`http://localhost:5000/unidades/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(() => {
                setUnidades(unidades.filter((unidade) => unidade.id !== id))
                setProjectMessage('Unidade removida com sucesso!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Unidades</h1>
                <LinkButton to="../newunity" text="Cadastrar Unidade" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {unidades.length > 0 &&
                    unidades.map((unidade) => (
                    <ProjectCard 
                        id={unidade.id}
                        name={unidade.name}
                        cidade={unidade.cidade}
                        bairro={unidade.bairro}
                        endereço={unidade.endereço}
                        key={unidade.id}
                        handleRemove={RemoveProject}
                     />
                     ))}
                    {!removeLoading && <Loading/>}
                    {removeLoading && unidades.lenght === 0 && (
                        <p>Não existem unidades cadastradas</p>
                    )}
            </Container>
        </div>
    )
}

export default Unidades