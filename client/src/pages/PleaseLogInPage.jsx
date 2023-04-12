import { useNavigate} from "react-router-dom";
import '../styles/pleaseLoginPage.css'

function PleaseLogInPage() {
    const Navigate = useNavigate()

    return (
        <div className="please-login">
            <h1>Please Log In or Register</h1>
            <p>You need to log in or register to access the shopping cart.</p>
            <div className="please-login-buttons">
            <button onClick={() => Navigate('/login')}>Log In</button>
            <button onClick={() => Navigate('/register')}>Register</button>
            </div>
        </div>
    );
}
export default  PleaseLogInPage;