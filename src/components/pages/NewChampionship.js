import ProjectForm2 from "../project/ProjectForm2"
import styles from "./NewChampionship.module.css"

import {useNavigate} from  'react-router-dom'


function NewChampionship() {
    
    const navigate = useNavigate()

    function createPost(project) {


        fetch ("http://localhost:5000/campeonatos", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            navigate('/championships', {message: 'Unidade criada com sucesso'})
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}> 
            <h1>Criar Campeonato</h1>
            <p>Crie e gerencie seu campeonato</p>
            <ProjectForm2 handleSubmit={createPost} btnText="Criar Campeonato"/>
        </div>
    )
}

export default NewChampionship