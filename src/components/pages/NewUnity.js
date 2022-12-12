import ProjectForm from '../project/ProjectForm'
import styles from './NewUnity.module.css'

import {useNavigate} from  'react-router-dom'

function NewUnity() {

    const navigate = useNavigate()

    function createPost(project) {

        // initialize
        project.services = []

        fetch ("http://localhost:5000/unidades", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            navigate('/unidades', {message: 'Unidade criada com sucesso'})
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Cadastrar Unidade</h1>
            <p>Cadastre sua unidade para adiciona-las ao seu campeonato</p>
            <ProjectForm handleSubmit={createPost} btnText="Cadastrar Unidade"/>
        </div>
    )
}

export default NewUnity