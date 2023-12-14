import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';

function App() {

  const[count, setCount]=useState(0);

  let data1, data2, swap=0;

  let rows = 4;
  let cols = 4;
  let arr = new Array(rows)
  for (let i = 0; i < rows; i++)
    arr[i] = new Array(cols);

  function grp(n) {
    const permutation = Array.from({ length: n }, (_, index) => index);

    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }
    return permutation;
  }

  const random = grp(rows*cols);
  let k=0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++)
    {
      arr[i][j] = random[k];
      k+=1;
    }
  }

  const[grid, setGrid]=useState(arr);

  function randomHandler()
  {
    arr=[...grid];
    const random = grp(rows*cols);
    let k=0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++)
      {
        arr[i][j] = random[k];
        k+=1;
      }
    }

    setGrid(arr);
  }

  function clickHandler(ir, ic)
  {
    if(swap===0)
    {
      data1=[ir, ic];
      swap=1;
      console.log(data1);
    }
    else
    {
      data2=[ir, ic];
      console.log(data2);

      arr=[...grid];
      let temp=arr[data1[0]][data1[1]];
      arr[data1[0]][data1[1]]=arr[data2[0]][data2[1]];
      arr[data2[0]][data2[1]]=temp;

      console.log("swapped");
      setGrid(arr);

      setCount((prev) => prev+1);
    }
  }

  return (
    <div className="App">
      <Navbar />
      <div className='bottom'>
        <div className='left'>
          UPLOAD IMAGE
        </div>
        <div className='right' onClick={randomHandler}>
          GENERATE RANDOM
        </div>
      </div>
      
      <div className='top'>
        <div className='left'>
          <div className='img' style={{ "backgroundImage": `url(${require(`./components/preview/image.jpeg`)})` }} />
        </div>
        <div className='right'>
          <div className="grid">
            {grid.map((row, ir) => {
              return (
                <div key={ir} className="row">
                  {row.map((val, ic) => {
                    return <div
                      key={ir*4 + ic}
                      style={{ "backgroundImage": `url(${require(`./components/preview_split/${Math.floor(val/4)}${val%4}.jpeg`)})` }}
                      className="square"
                      onClick={() => clickHandler(ir, ic)}
                    >
                      {val}, {ir*4+ic}
                    </div>;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className='bottom'>
        <div className='left'>
          left
        </div>
        <div className='right'>
          right
        </div>
      </div>
    </div>
  );
}

export default App;
