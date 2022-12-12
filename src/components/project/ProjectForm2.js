import styles from './ProjectForm.module.css'
import Input from '../form/input'
import SubmitButton from '../form/SubmitButton'
import Datas from '../form/SelectDate'
import Selecionar from '../form/Select'

import {useState, useEffect} from 'react'

function ProjectForm2({handleSubmit ,btnText, projectData}) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState([projectData || {}])
    const [status, setStatus] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/unidades", {
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

    useEffect(() => {
      fetch("http://localhost:5000/status", {
      method: "GET",
      headers: {
          'Content-Type': 'application/json'
      },
  })
      .then((resp) => resp.json())
      .then((data) => {
          setStatus(data)
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
            text="Nome do campeonato"
            name="name"
            placeholder="Insira o nome do campeonato"
            handleOnChange={handleChange}
            value={project.name}
          />

          <Selecionar
            name="Unidade"
            text="Unidade"
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}
          />

          <Selecionar
            name="Status"
            text="Status"
            options={status}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}
          />

          <Datas 
            name="category_id"
            text="Periodo de inscriçao"
            placeholder="Insira o Periodo de inscriçao"
            handleOnChange={handleCategory}
            value={project.data}
            />

            <Datas 
            name="category_id"
            text="Periodo do campeonato"
            placeholder="Insira o Periodo do campeonato"
            handleOnChange={handleCategory}
            value={project.data}
            />

          <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm2