// working but rerenders the SPA when anything is entered in email input. Add new set state and set equal to props.setEmail?
// changed onChange to onSubmit - Err: "Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
// Memoization enables your code to re-render components only if there’s a change in the props, which wouldn't help us here.
// Assigned new variable to onChange then used it in the onClick fetch - solved rerender but now setShow doesn't work (doesn't show success msg)
// Moved emailValue to parent, show still not working

function Login(props){

  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');   
  const [password, setPassword] = React.useState('');
//  const [emailValue, setEmailValue]     = React.useState('');



  return (
    <Card
      bgcolor="secondary"
      header="Login / Logout"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} setEmail={props.setEmail} email={props.email} setPassword={setPassword} password={password} 
        //emailValue={emailValue} setEmailValue={setEmailValue}
        //auth={props.auth} GoogleOAuthProvider={props.GoogleOAuthProvider} Google={props.Google}
        /> :
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
    //props.setShow(false);
    fetch(`/account/login/${props.email}/${props.password}`)
    .then(response => response.text())
    .then(text => {
      const data = JSON.parse(text);
      if(data._id){
        props.setShow(false);
        const data = JSON.parse(text);
        props.setStatus('');
        props.setEmail(data.email)
        console.log('JSON:', data);
        console.log('Email', data.email);
      }else{
        props.setStatus("User does not exist. Please create an account.")
        console.log('err:', text);
      }
    })
    ;
  }

// ----------------- Firebase OAuth --------------------------------------------
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCKC0b-30an2MAuBmuJ4a0fzcVJB5E1-5s",
  //   authDomain: "kateburnett-bankingapp.firebaseapp.com",
  //   projectId: "kateburnett-bankingapp",
  //   storageBucket: "kateburnett-bankingapp.appspot.com",
  //   messagingSenderId: "757422570697",
  //   appId: "1:757422570697:web:94bfb2e30458712769e118"
  // };

  // const app = initializeApp(firebaseConfig);

  // const auth = getAuth(app);

  // // TODO: initialize provider for google auth
  // const provider = new GoogleAuthProvider();

  // function googleLogin () {
  //   console.log("google sign in clicked");
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log("google user: ", user);
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       console.error(error);
  //     });
  // };

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={props.email} 
      onChange={e => props.setEmail(e.currentTarget.value)}
      /><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={props.password} 
      onChange={e => props.setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-warning" onClick={handle}>Log in</button><br/>

    {/* <GoogleOAuthProvider clientId="48029543749-c7il3kljvfqltoae4as4apn3t5ebo4ij.apps.googleusercontent.com">
        <Google />
    </GoogleOAuthProvider> */}
  </>);
}