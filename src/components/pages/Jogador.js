import styles from "./Unidade.module.css"

import  {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Message from "../layout/Message"
import ProjectFormRegister from "../project/ProjectFormRegister"

import Loading from "../layout/Loading"
import Container from "../layout/Container"
 
function Jogador() {
    
    const {id} = useParams()
    console.log(id)

    const [unidade, setUnidades] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/jogadores/${id}`, {
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
        
        fetch(`http://localhost:5000/jogadores/${id}`, {
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
                        <h1>Jogador: {unidade.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Perfil' : 'Fechar'}
                        </button> 
                        {!showProjectForm ? (
                            <div className={styles.project_info}> 
                                <p>
                                    <span>Jogador:</span> {unidade.name}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectFormRegister handleSubmit={editPost} btnText="Concluir edição" projectData={unidade} />
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

export default Jogador