function CreateAccount(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  console.log('Email In CreateAccount: ' + props.email)

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} setEmail={props.setEmail} email={props.email}/> : 
        <CreateMsg setShow={setShow} setEmail={props.setEmail}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success! Welcome to Free Money Bank. Please log into your account</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true); 
        props.setEmail('')
      }}>Log Out</button>
  </>)};

function nav(){
  window.location.href = "#/CreateAccount/";
  };

function ValidateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    return (false)
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    console.log(name,props.email,password);
    if (name.length < 1) {
      alert("You must enter a name.");
      return
    }
    if (ValidateEmail(props.email) === false) {
      alert("Please enter a valid email.");
      return
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return
    }
    else {
    const url = `/account/create/${name}/${props.email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);        
    })();
    props.setShow(false)
    }
  }    

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={props.email} 
      onChange={e => props.setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}