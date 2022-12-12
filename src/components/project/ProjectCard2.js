import styles from './ProjectCard.module.css'
import { Link } from 'react-router-dom'

import { BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ProjectCard2({id, name, handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Nome:</span> {name}
            </p>
            <div className={styles.project_card_actions}>
            <Link to={`/campeonato/${id}`}>
                <BsPencil /> Editar
            </Link>
            <button onClick={remove}>
                <BsFillTrashFill /> Excluir
            </button>
            </div>
        </div>
    )
    
}

export default ProjectCard2