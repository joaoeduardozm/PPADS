import styles from './ProjectForm.module.css'
import Input from '../form/input'
import SubmitButton from '../form/SubmitButton'
import Selecionar from '../form/Select'

import {useState, useEffect} from 'react'

function ProjectForm2({handleSubmit ,btnText, projectData}) {

    const [categories, setCategories] = useState([])
    const [times, setTimes] = useState([])
    const [project, setProject] = useState([projectData || {}])

    useEffect(() => {
        fetch("http://localhost:5000/times", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((resp) => resp.json())
        .then((data) => {
            setTimes(data)
        })
        .catch((err) => console.log(err))

    }, [])

    useEffect(() => {
        fetch("http://localhost:5000/campeonatos", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))

    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
      }
    
      function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
      }
    
      function handleCategory(e) {
        setProject({
          ...project,
          category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
          },
        })
      }
    
      return (
        <form onSubmit={submit} className={styles.form}>
          <Input
            type="text"
            text="Nome do jogador"
            name="name"
            placeholder="Insira o nome do jogador"
            handleOnChange={handleChange}
            value={project.name}
          />



          <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm2