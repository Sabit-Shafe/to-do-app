import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Task from './Task';


const TodoHome = () => {
    const { register, handleSubmit } = useForm();
    const [tasks, setTasks] = useState([]);
    const [shouldRemount, setShouldRemount] = useState(false)


    
    useEffect(() => {
        fetch('http://localhost:5000/task')
            .then(res => res.json())
            .then(data => setTasks(data));
    }, [shouldRemount])

    const onSubmit = data => {
        console.log(data);
        const url = `http://localhost:5000/addtask`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setShouldRemount(!shouldRemount)
                
            })

    };
    return (
        <div className="d-flex justify-content-evenly container mt-5 ">
            <div className=" w-25 mx-5 ">
                <h2>Task add</h2>
                <form className='d-flex flex-column ' onSubmit={handleSubmit(onSubmit)}>
                    <input className='mb-2' placeholder='Task Name' {...register("task", { required: true, maxLength: 100 })} />
                    <textarea className='mb-2' placeholder='Description' {...register("description")} />
                    <input className="bg-info rounded" type="submit" value="Add Task" />
                </form>
            </div>
            <div className="w-75 mt-5">
                {
                    tasks.map(tasks => <Task
                    key = {tasks._id}
                    task = {tasks}
                    shouldRemount={shouldRemount}
                    setShouldRemount={setShouldRemount}
                    ></Task> )
                }
            </div>
        </div>
    );
};

export default TodoHome;