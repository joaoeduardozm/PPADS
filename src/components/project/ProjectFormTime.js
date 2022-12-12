import styles from './ProjectForm.module.css'
import Input from '../form/input'
import SubmitButton from '../form/SubmitButton'

import Multiselect from 'multiselect-react-dropdown'

import {useEffect, useState, useRef } from 'react'
import { LakeFormation } from 'aws-sdk'


function ProjectFormTime({handleSubmit, btnText, projectData}) {

    const [times, setTimes] = useState(projectData || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(times)
    }

    function handleChange(e) {
        setTimes({ ...times, [e.target.name]: e.target.value})
    }

    const [options, setOptions] = useState(['Option 1', 'Option2']);

    const [jogadores, setJogador] = useState([])

    useEffect(() => {
        const getjogadordata = async() => {

            const getjogadordata = [];
            const reqData = await fetch("http://localhost:5000/jogadores");
            const resData = await reqData.json();
            console.log(resData);

            for (let i=0; i<resData.lenght; i++)
            {
                getjogadordata.push(resData[i].name);
            }
            setJogador(getjogadordata)
        }
        getjogadordata();
    },[]);

    return (
        <form onSubmit={submit} className={styles.form}>

            <Input 
                type="text"
                text="Nome do Time"
                name="name"
                placeholder="Insira o nome do time"
                handleOnChange={handleChange}
                value={times.name }
            />

            <div>
                <label> </label>
                <Multiselect 
                    isObject={false}
                    options={jogadores}
                    onRemove={(event) => {console.log(event)}}
                    onSelect={(event) => {console.log(event)}}
                    showCheckbox
                />
            </div>
            
            <SubmitButton 
                text={btnText}/>
        </form>
    )
}


export default ProjectFormTime