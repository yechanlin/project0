import React from 'react'
import { Link } from 'react-router-dom'
import "./signup.css"

class Signup extends React.Component{
    render(){
        return(
            <div class="main">  	
            <input type="checkbox" id="chk" aria-hidden="true"/>
    
                <div class="signup">
                    <form>
                        <label for="chk" class="signlogin-label" aria-hidden="true">Sign up</label>
                        <input type="text" name="txt" placeholder="Username" required=""/>
                        <input type="email" name="email" placeholder="Email" required=""/>
                        <input type="password" name="pswd" placeholder="Password" required=""/>
                        <input type="password" name="pswd" placeholder="Retype Password" required=""/>
                        <input type="checkbox" id="checkBox" name="checkBox"/>
                        <label for="checkBox" class="labelforchk">I confirm that I have read and agree to Terms of Service and Privacy Policy.</label>
                        <Link to="/home"><button>Sign up</button></Link>
                    </form>
                </div>
    
                <div class="login">
                    <form>
                        <label for="chk" class="signlogin-label" aria-hidden="true">Login</label>
                        <input type="email" name="email" placeholder="Email" required=""/>
                        <input type="password" name="pswd" placeholder="Password" required=""/>
                        <Link to="/home"><button>Login</button></Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default Signup