import Message from "../layout/Message"
import styles from './Times.module.css'

import { useLocation } from 'react-router-dom'
import Container from "../layout/Container"
import LinkButton from '../layout/LinkButton'
import ProjectCardTime from "../project/ProjectCardTime"
import { useState, useEffect } from "react"
import Loading from "../layout/Loading"

function Equipe() {

    const [times, setTimes] = useState([])
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
                fetch('http://localhost:5000/times', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setTimes(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err)) 
            }, 3000)
    }, [])

    function RemoveProject(id) {
        fetch(`http://localhost:5000/times/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(() => {
                setTimes(times.filter((time) => time.id !== id))
                setProjectMessage('Time removido com sucesso!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Times</h1>
                <LinkButton to="../newtime" text="Cadastrar Time" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {times.length > 0 &&
                    times.map((time) => (
                    <ProjectCardTime 
                        id={time.id}
                        name={time.name}
                        handleRemove={RemoveProject}
                     />
                     ))}
                    {!removeLoading && <Loading/>}
                    {removeLoading && times.lenght === 0 && (
                        <p>Não existem times cadastrados</p>
                    )}
            </Container>
        </div>
    )
}

export default Equipe