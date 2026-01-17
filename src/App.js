import './output.css';
import {useState} from 'react';

function App() {
  const[player,setPlayer]=useState('O');
  const[board,setBoard]=useState([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
  const[winner,setWinner]=useState();
  function Game(board,player,square){
    const newBoard = board.map((x,index)=>{
      if(index===square&&x===' '){
        return player;
      }
      else return x;
    });
    setBoard(newBoard);
    setPlayer(player==='O'?'X':'O');
    CalculateWinner(newBoard,player);
  }
  function CalculateWinner(board,player){
    const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let line of lines){
      const[a,b,c]=line;
      if(board[a]===player&&board[b]===player&&board[c]===player){
        setWinner(player);
      }
    }
    let j=0;
    for(let x of board){
      if(x==='X'||x==='O'){
        j++;
      }
    }
    if(j===9){
      setWinner("DRAW")
    }
  }
  function ResetGame(){
    setPlayer('O');
    setWinner();
    setBoard([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
  }
  return (
    <>
      <p className='text-center text-3xl mt-[200px] text-gray-600'>{winner===undefined?`Next Player: ${player}`:``}</p>
      <div className='flex mt-[50px] justify-center ml-[7px]' >
        <ul className="grid grid-cols-3 gap-4 p-4 grid-rows-3 w-[300px]">
          {board.map((x,index)=>(
            <li className='p-[40px] cursor-pointer rounded-xl bg-pink-500 w-5 h-[100px] flex items-center justify-center' onClick={winner===undefined?()=>{Game(board,player,index);}:null} key={index}><p className="text-center text-xl">{x}</p></li>
          ))}
        </ul>
      </div>
      <p className='text-center text-3xl mt-[50px] text-yellow-500'>{winner!==undefined?(winner==="DRAW"?"DRAW":`Winner is ${winner}`):''}</p>
      <button className='mx-auto mt-[75px] cursor-pointer p-5 bg-yellow-300 block text-xl rounded-xl' onClick={ResetGame}>Reset Game</button>
    </>
  );
}
export default App;
