import {React, useState} from "react";
import Loader from "./loader";
import UserDetails from "./userdetails";
import axios from "axios";

export default () => {

    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [avatar_url, setAvatar_url] = useState('');
    const [html_url, setHtml_url] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [followers, setFollowers] = useState('');
    const [following, setFollowing] = useState('');
    const [twitter_username, setTwitter] = useState('');
    const [public_repos, setPublic_repos] = useState('');
    const [repos, setRepos] = useState([]);
    // const [userdata, setUserdata] = useState(obj);
    const [message, setMessage] = useState("Enter valid github username.");
    const [load, setLoad] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserId('');
        setLoad(true);
        await fetch(`http://localhost:3002/user/${username}`)
        .then((res) => res.json())
        .then((res) => {
            if(res.message==="success"){
                setAvatar_url(res.data.avatar_url);
                setBio(res.data.bio);
                setFollowers(res.data.followers);
                setFollowing(res.data.following);
                setHtml_url(res.data.html_url);
                setName(res.data.name);
                setRepos([...res.data.repos]);
                setTwitter(res.data.twitter_username);
                setUserId(res.data.userId);
                setPublic_repos(res.data.public_repos);
            }
            else{
                setMessage("OOPS... Username not found. Please enter valid github username.")
                setLoad(false)
                setUserId("")
            }
        })
        .catch((err) => {
            console.log(err);
        })
        setUsername('')
    }

    return(
        <>
            <nav className="navbar navbar-light bg-light">
            <a class="navbar-brand">Get Github</a>
            <form onSubmit={handleSubmit} class="form-inline">
                <input value={username} onChange={(e) => setUsername(e.target.value)} class="form-control mr-sm-2" type="search" placeholder="Github Username" aria-label="Search" />
                {username.length>0?
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                :
                <button class="btn btn-outline-success my-2 my-sm-0" disabled type="submit">Search</button>
                }
            </form>
            </nav>

            {
                userId?
                    <UserDetails 
                        userId={userId} 
                        followers={followers} 
                        following={following} 
                        twitter_username={twitter_username}
                        html_url={html_url}
                        bio={bio}
                        avatar_url={avatar_url}
                        name={name}
                        repos={repos}
                        public_repos={public_repos}
                    />
                :
                <div>
                    {
                    load
                    ?
                    <Loader/>
                    :
                    <div className="text-center align-middle py-5">
                        <h3>{message}</h3>
                    </div>
                    }
                </div>

            }
        </>
    )
}

