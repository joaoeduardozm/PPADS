import styles from "./Unidade.module.css"

import  {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Message from "../layout/Message"
import ProjectForm2 from "../project/ProjectForm2"

import Loading from "../layout/Loading"
import Container from "../layout/Container"
 
function Championship() {
    
    const {id} = useParams()
    console.log(id)

    const [campeonato, setCampeonatos] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/campeonatos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }, 
        }).then(resp => resp.json())
        .then((data) => {
            setCampeonatos(data)
        })
        .catch(err => console.log)
        }, 3000)
    }, [id])

    function editPost (campeonato) {
        
        fetch(`http://localhost:5000/campeonatos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campeonato),
        })
        .then(resp => resp.json())
        .then((data) => {

            setCampeonatos(data)
            setShowProjectForm(false)
            setMessage('campeonato atualizado')
            setType('success')

        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }
    
    return (
        <>
            {campeonato.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column"></Container>
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Campeonato: {campeonato.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Campeonato' : 'Fechar'}
                        </button> 
                        {!showProjectForm ? (
                            <div className={styles.project_info}> 
                                <p>
                                    <span>Campeonato:</span> {campeonato.name}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm2 handleSubmit={editPost} btnText="Concluir edição" projectData={campeonato} />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Championship