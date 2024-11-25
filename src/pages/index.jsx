import React from 'react'
import './index.css'

class Home extends React.Component{
    render(){
        return(
            <><div class="header">
                <div class="recruiter">
                    <a href="#">Recruiter</a>
                </div>
                <div class="searcher">
                    <a href="#">Searcher</a>
                </div>
            </div><div class="filter">
                    <img src="./src/pages/img/filter.png"/>
                        <label>Filter Your Desire</label>
                    </div><div class="meetpage">

                </div><div class="swipebuttons">
                    <div class="swipeleft">
                        <img src="./src/pages/img/left.png"/>
                        </div>
                    <div class="swipemid">
                        <img src="./src/pages/img/idea.png"/>
                        </div>
                    <div class="swiperight">
                        <img src="./src/pages/img/right.png"/>
                        </div>
                </div><div class="navbar">
                    <div class="homebutton">
                        <img src="./src/pages/img/h.png" />
                    </div>
                    <div class="heartbutton">
                        <img src="./src/pages/img/heart.png" />
                    </div>
                    <div class="chatbutton">
                        <img src="./src/pages/img/chat.png" />
                    </div>
                    <div class="profilebutton">
                        <img src="./src/pages/img/p.png" />
                    </div>
                </div></>
        )
    }
}

export default Home