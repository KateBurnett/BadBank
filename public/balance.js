function Balance(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [balance, setBalance] = React.useState('');
  console.log('Email In Balance: ' + props.email);  
  console.log('Balance In Balance: ' + balance);  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status} 
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} email={props.email} setBalance={setBalance}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus} email={props.email} balance={balance}/>}
    />
  )

}

function BalanceMsg(props){
  console.log('Balance In BalanceMsg: ' + props.balance)
  return(<>
    <h5>Balance: ${props.balance}</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  console.log('---------------------')
  console.log(props.email)
  console.log('---------------------')
  function handle(){
    fetch(`/account/findOne/${props.email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            console.log('BalanceForm fetch: ' + data.balance);
            //props.setStatus(text);
            props.setShow(false);
            console.log('JSON:', data);
            props.setBalance(data.balance);
        } catch(err) {
            //props.setStatus(text)
            props.setStatus("Balance check failed. Please make sure you are logged in.")
            console.log('err:', text);
        }
    });
  }

  return (<>
    {/* Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={props.email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/> */}

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}