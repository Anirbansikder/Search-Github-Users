import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

// Provider , Consumer - GithubContext.Provider

const GithubProvider = ({children}) => {
    const [githubUser,setGithubUser] = useState(mockUser);
    const [repos,setRepos] = useState(mockRepos);
    const [followers,setFollowers] = useState(mockFollowers);
    // request loading
    const [requests , setRequest] = useState(0);
    const [loading,setLoading] = useState(false);
    // error
    const [error,setError] = useState({show : false,msg : ""});

    const searchGithubUser = async(user) => {
        toggleError();
        const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err));
        if(response){
            setGithubUser(response.data)
        } else {
            toggleError(true,"There is no user with the username !");
        }
    }
    // check request
    const checkrequest = () => {
        axios(`${rootUrl}/rate_limit`)
        .then(({data}) => {
            let {rate : {remaining}} = data
            setRequest(remaining);
            if(remaining === 0){
                toggleError(true ,"sorry, you have extended your hourly rate limit !" )
            }
        }).catch(err => {
            console.log(err)
        })
    }
    function toggleError(show = false,msg = ""){
        setError({show , msg})
    }
    // error 
    useEffect(checkrequest, [])
    return <GithubContext.Provider value={{githubUser,repos,followers,requests,error,searchGithubUser}}>{children}</GithubContext.Provider>
}

export { GithubProvider , GithubContext };
