import React, {useState, useEffect} from "react";
import axios from 'axios';

const Projects = (props) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4444/api/projects")
        .then(response => {
            console.log(response)
            // setProjects(response)
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    return(
        <div>
            <h2>Testing Projects Comp</h2>
            {/* {projects.map(projectList => {
                
            })} */}
        </div>
    );
};

export default Projects;