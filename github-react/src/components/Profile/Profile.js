import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './Profile.css'
import ProjectsList from '../Project/ProjectsList.js'

const Profile = (props) => {
    //state to save the fetched data
    const [projectInfo, setProjectInfo] = useState([])
    const [userInfo, setUserInfo] = useState([])
    // let userURL = useRef(props.location.search.split('=')[1])
    const url = new URL (window.location.href)
    let userURL = url.searchParams.get("user").toString()

    useEffect(() => {
        //pass object values to the state
        const getUserInfo = async () => {
            const infoFromServer = await fetchUser()
            setProjectInfo(infoFromServer.projects)
            setUserInfo({
                name: infoFromServer.name,
                id: infoFromServer.id,
            })
        }

        //Fetch user information from the server
        const fetchUser = async () => {
            const fetchData = await fetch(
                `https://github-nodejs.herokuapp.com/projects/${userURL}`
            )
            const data = await fetchData.json()

            console.log('this is data')
            console.log(data)

            return data
        }

        getUserInfo()
    }, [userURL])


    return (
        <div>
            <section className="center">
                <article className="review">
                    <div className="img-container">
                        <img
                            src={`https://github.com/${userURL}.png`}
                            id="person-img"
                            alt=" not found"
                        />
                    </div>
                    <h4 id="name">{userInfo.name}</h4>
                    <h4 id="username">{userURL.current}</h4>
                    <p id="id">{userInfo.id}</p>
                </article>
            </section>

            <ProjectsList
                userProjects={projectInfo}
                username={userURL}
            />
        </div>
    )
}

export default Profile
