import React from 'react';
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''} >
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"></img>
                    <img src="https://logodownload.org/wp-content/uploads/2018/07/prime-video-1.png"></img>
                    <img src="https://logodownload.org/wp-content/uploads/2021/03/paramount-plus-logo.png"></img>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"></img>
                </a>
            </div>
        </header>
    )
}