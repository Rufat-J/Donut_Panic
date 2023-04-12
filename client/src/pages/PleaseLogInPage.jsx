function PleaseLogInPage() {
    return (
        <div>
            <h1>Please Log In or Register</h1>
            <p>You need to log in or register to access the shopping cart.</p>
            <button onClick={() => window.location.href='/login'}>Log In</button>
            <button onClick={() => window.location.href='/register'}>Register</button>
        </div>
    );
}
export default  PleaseLogInPage;