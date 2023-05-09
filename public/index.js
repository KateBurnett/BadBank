function Spa() {
  const [email, setEmail]   = React.useState('CHECKING');

  return (
    <HashRouter>
      <div>
        <NavBar/>        
        <UserContext.Provider value={{users:[{name:'kate',email:'kate@mit.edu',password:'password',balance:100}]}}>
          <div className="container" style={{padding: "20px"}}>
           
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" element={<Deposit email={email}/>} />
            <Route path="/withdraw/" component={Withdraw} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/" component={Balance} />
            <Route path="/" exact component={() => (<Home email={email}/>)} />
            {/* <Route path="/alldata/" component={AllData} /> */}
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
