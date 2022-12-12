import styles from "./Unidade.module.css"

import  {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Message from "../layout/Message"
import ProjectFormTime from "../project/ProjectFormTime"

import Loading from "../layout/Loading"
import Container from "../layout/Container"
 
function Time() {
    
    const {id} = useParams()
    console.log(id)

    const [time, setTimes] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/time/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }, 
        }).then(resp => resp.json())
        .then((data) => {
            setTimes(data)
        })
        .catch(err => console.log)
        }, 200)
    }, [id])

    function editPost (time) {
        
        fetch(`http://localhost:5000/time/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(time),
        })
        .then(resp => resp.json())
        .then((data) => {

            setTimes(data)
            setShowProjectForm(false)
            setMessage('Time atualizado')
            setType('success')

        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }
    
    return (
        <>
            {time.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column"></Container>
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Unidade: {time.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Time' : 'Fechar'}
                        </button> 
                        {!showProjectForm ? (
                            <div className={styles.project_info}> 
                                <p>
                                    <span>Time:</span> {time.name}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectFormTime handleSubmit={editPost} btnText="Concluir edição" projectData={time} />
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

export default Time