// working but rerenders the SPA when anything is entered in email input. Add new set state and set equal to props.setEmail?

function Login(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');   
  const [password, setPassword] = React.useState('');

  return (
    <Card
      bgcolor="secondary"
      header="Login / Logout"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} setEmail={props.setEmail} email={props.email} setPassword={setPassword} password={password}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus} email={props.email} setEmail={props.setEmail}/>
      }
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success! Logged in as {props.email}</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true); 
        props.setEmail('')
      }
      }>
        Log out
    </button>
  </>)}

function LoginForm(props){

  function handle(){
    fetch(`/account/login/${props.email}/${props.password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            props.setEmail(data.email)
            console.log('JSON:', data);
            console.log('Email', data.email);
        } catch(err) {
            props.setStatus("User does not exist. Please create an account.")
            console.log('err:', text);
        }
    });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={props.email} 
      onChange={e => props.setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={props.password} 
      onChange={e => props.setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-warning" onClick={handle}>Log in</button>
  </>);
}