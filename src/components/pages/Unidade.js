import styles from "./Unidade.module.css"

import  {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Message from "../layout/Message"
import ProjectForm from "../project/ProjectForm"

import Loading from "../layout/Loading"
import Container from "../layout/Container"
 
function Unidade() {
    
    const {id} = useParams()
    console.log(id)

    const [unidade, setUnidades] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/unidades`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }, 
        }).then(resp => resp.json())
        .then((data) => {
            setUnidades(data)
        })
        .catch(err => console.log)
        }, 3000)
    }, [id])

    function editPost (unidade) {
        
        fetch(`http://localhost:5000/unidades/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(unidade),
        })
        .then(resp => resp.json())
        .then((data) => {

            setUnidades(data)
            setShowProjectForm(false)
            setMessage('Unidade atualizada')
            setType('success')

        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }
    
    return (
        <>
            {unidade.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column"></Container>
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Unidade: {unidade.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Unidade' : 'Fechar'}
                        </button> 
                        {!showProjectForm ? (
                            <div className={styles.project_info}> 
                                <p>
                                    <span>Unidade:</span> {unidade.name}
                                </p>
                                <p>
                                    <span>Bairro:</span> {unidade.bairro}
                                </p>
                                <p>
                                    <span>Endereço:</span> {unidade.endereço}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={unidade} />
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

export default Unidade