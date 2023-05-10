{/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}

function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [loggedIn, setloggedIn] = React.useState(true);  

  return (
    <Card
      bgcolor="secondary"
      header="Login / Logout"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} /> :
        <LoginMsg setShow={setShow} setStatus={setStatus} />
      }
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Log out
    </button>
  </>)}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            //props.setLoggedIn(true);
            console.log('JSON:', data);
            console.log('Email', data.email);
        } catch(err) {
            props.setStatus("User does not exist. Please create an account.")
            console.log('err:', text);
        }
    });
  }

  function nav(){
    window.location.href = "#/CreateAccount/";
    };


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-warning" onClick={handle}>Log in</button>
  </>);
}