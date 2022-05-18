import React, { } from 'react';
import { Button, Table } from 'react-bootstrap';


const Task = (props) => {
    const {task} = props;
    const { shouldRemount, setShouldRemount } = props;
    

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
          const url = `http://localhost:5000/task/${id}`;
          fetch(url, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
            
              setShouldRemount(!shouldRemount)
    
            })
        }
      }
    return (
        <div className="container">
        <Table striped bordered hover>
          <thead  >
            <tr>
             
              <th>Task Name</th>
              <th>Delete</th>
             
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{task.task}</td>
             
              <td> <Button className=" text-center" onClick={() => handleDelete(task._id)}>Delete </Button></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
};

export default Task;