import { useNavigate} from "react-router-dom";

function PleaseLogInPage() {
    const Navigate = useNavigate()

    return (
        <div>
            <h1>Please Log In or Register</h1>
            <p>You need to log in or register to access the shopping cart.</p>
            <button onClick={() => Navigate('/login')}>Log In</button>
            <button onClick={() => Navigate('/register')}>Register</button>
        </div>
    );
}
export default  PleaseLogInPage;