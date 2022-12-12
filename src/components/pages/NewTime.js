import styles from './Times.module.css'
import ProjectFormTime from '../project/ProjectFormTime'
import {useNavigate} from  'react-router-dom'

function Times () {

    const navigate = useNavigate()

    function createPost(project) {


        fetch ("http://localhost:5000/times", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            navigate('/equipe', {message: 'Unidade criada com sucesso'})
        })
        .catch(err => console.log(err))
    }

    return (
        <div >
            <h1>Cadastrar Time</h1>
            <p>Cadastre seu Time para adicioná-los aos seus campeonatos</p>
            <ProjectFormTime handleSubmit={createPost} btnText="Cadastrar Time" />   
        </div>
         
    )
}

export default Times