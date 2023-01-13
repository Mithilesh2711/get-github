import {React, useState, useEffect} from "react";
import "../userStyle.css";

export default (props) => {

    const[page, setPage] = useState(0);

    const renderPagination = [...Array(Math.ceil((props.public_repos-1)/10))].map((k, index) => {
        if(index==page)
        return(
            <li style={{"border":"double"}} class="page-item">
                <a onClick={(e) => {setPage(parseInt(e.target.innerHTML)-1)}} class="page-link" href="#">{index+1}</a>
            </li>
        );
        else 
        return(
            <li class="page-item">
                <a onClick={(e) => {setPage(parseInt(e.target.innerHTML)-1)}} class="page-link" href="#">{index+1}</a>
            </li>
        );

    })


    const renderCards = Object.values(props.repos).map((repo,idx) => {
            if(idx<page*10+11  && idx>=page*10+1)
            return (
            <div key={idx} className="card" style={{ width: "40%", marginBottom: "20px" }}>
                <div class="card-header"><a href={repo.html_url}>{repo.name}</a></div>
                <div class="card-body">
                    <p class="card-title">{repo.description}</p>
                    {repo.topics.map((topic, index) => 
                        <span key={index} class="badge badge-primary mx-1">{topic}</span>
                    )}
                </div>
            </div>
            );
        })

    

    var twitter_url = "https://twitter.com/"+props.twitter_username
    return(
        <>
        <div className="d-flex justify-content-center">
        <div class="card">
        <div class="card_img"> 
            <img src={props.avatar_url} alt="user-image" />
        </div>
        <div class="card_info">
            {props.name
            ?
            <h2>{props.name}</h2>
            :
            <></>
            }
            <a class="link-primary" href={props.html_url}><h4>{props.userId}</h4></a>
            {props.bio?<p><strong>Bio : </strong>{props.bio}</p>:<></>}
            {props.twitter_username?<p><strong>Twitter: <a class="link-primary" href={twitter_url}>{props.twitter_username}</a></strong></p>:<></>}
            <p><strong>Followers: {props.followers} &nbsp;&nbsp; Public Repos: {props.public_repos} &nbsp;&nbsp;   Following: {props.following}</strong></p>
        </div>
        </div>
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderCards}
        </div>
        <div className="my-10">
            <ul style={{"listStyle": "none"}} class="d-flex justify-content-center">
                <li class="page-item">
                    {page==0?
                    <a class="anchors page-link"> &lt; Previous</a>
                    :
                    <a  onClick={(e) => {setPage(parseInt(page)-1)}} class="anchors page-link" href="#"> &lt; Previous</a>
                    }
                </li>

                {renderPagination}

                <li class="page-item">
                    {page==Math.ceil((props.public_repos-1)/10)-1?
                    <a  class="anchors page-link"> Next &gt;</a>
                    :
                    <a onClick={(e) => {setPage(parseInt(page)+1)}} class="anchors page-link" href="#"> Next &gt;</a>                    
                    }
                    
                </li>
            </ul>
        </div>
    </>
    )
}


