import React, { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import {PuffLoader} from 'react-spinners';

function Projects() {
    const [repos, setRepos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const url = 'https://api.github.com/users/christiansons/repos'
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const filteredRepos = data.filter((repo) => {
                    return repo.language === "C#"
                })

                setRepos(filteredRepos);
            })
            .catch((e) => console.log(e));
            
            setTimeout(() => {
            setIsLoading(false);
            }, 3000);
    }, [repos]);

    if (isLoading) {
        return<PuffLoader
            color="#0a98f3"
            size={70}
        />
    }

    return (
        <div>
            {
                repos.map(repo => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{repo.name}</Card.Title>
                                <Card.Text>
                                    <h3>Language:</h3>
                                    <p>{repo.language}</p>
                                    <p>{repo.owner.login}</p>
                                </Card.Text>
                                <Button variant="dark"><Card.Link href={repo.html_url} target="_blank">Go to repo</Card.Link></Button>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default Projects