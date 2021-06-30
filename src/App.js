import './App.css';
import {friendList} from "./mockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashAlt, faSearch} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
function App() {
  const [friendInput, setFriendInput] = useState("");
  const [friendListState, setFriendListState] = useState(friendList['friends']);
  const [favouriteList, setFavouriteList] = useState(friendList['favorites']);
  const [page, setPage] = useState(1);
  const displayFriendList=()=>{
      let sortedArray = [];
      friendListState.forEach((item,index)=>{
        if(favouriteList.includes(item))
        sortedArray.push(item);
      })
      friendListState.forEach((item)=>{
        if(!sortedArray.includes(item))
        sortedArray.push(item);
      })
          return (
            <div style={{
            height: "auto",
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "324px"
            }}
        >
            {sortedArray.slice((page-1)*10,(page*10)).map((item,index)=>
            {
              let isFavourite = favouriteList.includes(item);
              return (
                <div key={index} style={{width:"29vw", display:"flex", padding:"10px", borderBottom:"0.5px solid lightgray"}}>
                  <div style={{flex:"1 1 auto", textAlign:"left"}}><div>{item}</div>
                  <span style={{fontSize: "small", color: "gray"}}>is your friend</span>
                  </div>
                  <button style={{marginRight:"10px", background:"none", border:"none"}} onClick={()=>editFavourite(item)}><FontAwesomeIcon icon={faStar} color={isFavourite?"black":"lightgray"}/></button>
                  <button style={{background:"none", border:"none"}} onClick={()=>deleteFriend(item)}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </div>
              )
            })
            }
            </div>
          )
  }

  useEffect(()=>{
    if(!friendInput)
    setFriendListState(friendList['friends'])
  }, [friendInput])

  const editFavourite = (value) => {
    let result = [...favouriteList];
    if(favouriteList.includes(value))
    {
      result = favouriteList.filter(x => {
        return (x!==value)
      })
    friendList['favorites'] = result;
    }
    if(!favouriteList.includes(value)) {
      result.push(value);
    friendList['favorites'].push(value);
    }
    setFavouriteList(result);
  }

  const handleChange = (event) => {
    if(!Number(event.target.value) && !event.target.value.match(/[&?:'"%#+,$!*@()=\\[\];/]/g))
    {
      setFriendInput(event.target.value);
      searchFriend();
    }
  }

  const enterPress = (event) => {
    let list = [...friendListState];
    if (event.key === 'Enter')
    {
      if(!friendListState.includes(friendInput))
      {
        friendList['friends'].push(friendInput)
        list.push(friendInput);
        setFriendListState(list);
      }
      setFriendInput("");
    }
  }

  const deleteFriend = (value) => {
    let choice = window.confirm("You really want to delete  "+value+"?")
    if (choice===true)
    {
    let result = friendListState.filter(x =>{
      return (x!==value)
    })
    friendList['friends']=result;
    setFriendListState(result);
  }
  }

  const searchFriend = () => {
    let result=[];
    result = friendListState.filter(x =>{
      return x.toLowerCase().indexOf(friendInput.toLowerCase()) !== -1;
    })
    if(result && friendInput)
    setFriendListState(result)
  }

  const showPagination=()=>{
    let arr=[];
    for(let i=1;i<=Math.ceil(friendListState.length/10);i++)
      arr.push(i);
    return arr.map((item,index)=>{
      let isActive = item===page;
      return <button className="paginationButtons" style={{backgroundColor: isActive?"blue":"white",color:isActive?"white":"black"}} key={index} onClick={()=>setPage(item)}>{item}</button>
    })
  }

  return (
    <div className="App">
      <div style={{width:"32vw", border:"1px solid lightgray", backgroundColor:"white"}}>
        <div style={{backgroundColor:"lightgray", width:"auto", textAlign:"left", padding:"5px 10px",fontWeight:"bold"}}>Friend List</div>
        <div style={{width: "29vw", display: "flex", borderBottom:"1px solid lightgray"}}>
          <input placeholder="Enter your friend's name" 
          style={{width:"inherit", border:"none",padding:"7px", flex: "1 1 auto"}}
          value={friendInput} 
          onChange={handleChange}
          onKeyPress={enterPress}
        />
        <button style={{background:"none", border:"none"}} onClick={()=>searchFriend()}><FontAwesomeIcon icon={faSearch}/></button>
        </div>
        {friendListState && displayFriendList()}
      </div>
      <div style={{margin:"20px auto", width:"50%"}}>{friendListState && showPagination()}</div>
    </div>
  );
}

export default App;
