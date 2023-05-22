function Spa() {

  const [email, setEmail]   = React.useState('');

  return (
    <HashRouter>
      <div>
        <NavBar email={email}/>        
        <UserContext.Provider value={{users:[{name:'kate',email:'kate@mit.edu',password:'password',balance:100}]}}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={() => (<Home email={email}/>)} />          
            <Route path="/CreateAccount/" component={() => (<CreateAccount email={email} setEmail={setEmail}/>)} />
            <Route path="/login/" component={() => (<Login email={email} setEmail={setEmail}/>)} />
            <Route path="/deposit/" component={() => (<Deposit email={email}/>)}/>
            <Route path="/withdraw/" component={() => (<Withdraw email={email}/>)} />
            <Route path="/balance/" component={() => (<Balance email={email}/>)} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Spa/>
);

// ReactDOM.render(
//   <Spa/>,
//   document.getElementById('root')
// );
