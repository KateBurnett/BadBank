function Withdraw(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [amount, setAmount] = React.useState('');

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus} email={props.email} amount={amount} setAmount={setAmount}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        //props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

// function WithdrawMsg(amount, props){
//   if (amount < props.balance){
//   return(<>
//     <h5>Success</h5>
//     <button type="submit" 
//       className="btn btn-light" 
//       onClick={() => {
//         props.setShow(true);
//         props.setStatus('');
//       }}>
//         Withdraw again
//     </button>
//   </>);
//   } else {<>
//     <h5>Cannot withdraw more than balance</h5>
//     <button type="submit" 
//       className="btn btn-light" 
//       onClick={() => {
//         props.setShow(true);
//         props.setStatus('');
//       }}>
//         Withdraw new amount
//     </button>
//     </>
//   }
// }

function WithdrawForm(props){

  function handle(){
    fetch(`/account/update/${props.email}/-${props.amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            //props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Withdrawl failed. Please make sure you are logged in and entered an interger.')
            console.log('err:', text);
        }
    });
  }


  return(<>

    {/* Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/> */}

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={props.amount} 
      onChange={e => props.setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
