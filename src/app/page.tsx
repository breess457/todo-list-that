"use client"
import React,{useState,useEffect} from "react";
const Data =     [
  {
      type: 'Fruit',
      name: 'Apple',
  },
  {
      type: 'Vegetable',
      name: 'Broccoli',
  },
  {
      type: 'Vegetable',
      name: 'Mushroom',
  },
  {
      type: 'Fruit',
      name: 'Banana',
  },
  {
      type: 'Vegetable',
      name: 'Tomato',
  },
  {
      type: 'Fruit',
      name: 'Orange',
  },
  {
      type: 'Fruit',
      name: 'Mango',
  },
  {
      type: 'Fruit',
      name: 'Pineapple',
  },
  {
      type: 'Vegetable',
      name: 'Cucumber',
  },
  {
      type: 'Fruit',
      name: 'Watermelon',
  },
  {
      type: 'Vegetable',
      name: 'Carrot',
  },
]
export default function Home() {
  const [listItem,setListItem] = useState([])

  useEffect(()=>{
    const setLocalStorage = localStorage.getItem('list_data')
    if(setLocalStorage){
      const storedTodos = JSON.parse(setLocalStorage)
        if(storedTodos){
          setListItem(storedTodos)
        }
    }
  },[])

  const addListItem = (listdata:any)=>{
    const updateList:any = [...listItem,listdata]
    setListItem(updateList)
    localStorage.setItem('list_data',JSON.stringify(updateList))
  }

  const removeListItem = (index:number)=>{
    const updateList = [...listItem]
    updateList.splice(index,1)
    setListItem(updateList)
    localStorage.setItem('list_data',JSON.stringify(updateList))
  }
  
  useEffect(()=>{
    const timer = setInterval(()=>{
      if(listItem.length > 0){
        removeListItem(0)
      }
    },2000)
    return ()=> clearInterval(timer)
  },[listItem])
  
  return (
    <div className="">
      <div className="max-w-screen-xl items-center justify-between mx-auto my-4 bg-white">
        <div className="grid grid-cols-3 gap-4 h-dvh">
          <div className="">
            {Data.filter(
              (data:any)=> !listItem.find((checkda:any)=> checkda.name === data.name)
            ).map((items:any,i:number)=>(
                <div className="w-full flex px-6 my-1" key={i} onClick={()=>addListItem(items)}>
                  <div className="py-3 w-full text-center border hover:bg-gray-300  border border-gray-400 border-4 rounded-xl">
                    {items.name}
                  </div>
                </div>
            ))}
          </div>
          <div className="border border-gray-700 border-4">
              <div className="w-full bg-gray-300 text-center font-bold py-4 border-b-4 border-gray-700">Fruit</div>
              <div className="w-full px-6 my-2">
                {listItem.map((datas:any,i:number)=>(
                  <div key={i} className="my-2 w-full">
                    {datas.type === "Fruit" ? (
                      <div className="w-full text-center py-2 border-4 rounded-xl" onClick={()=>removeListItem(i)}>{datas.name}</div>
                    ):null}
                  </div>
                ))}
              </div>
          </div>
          <div className="border border-gray-700 border-4">
            <div className="w-full bg-gray-300 text-center font-bold py-4 border-b-4 border-gray-700">Vegetable</div>
            <div className="w-full px-6 my-2">
                {listItem.map((datas:any,i:number)=>(
                  <div key={i} className="my-2 w-full">
                    {datas.type === "Vegetable" ? (
                      <div className="w-full text-center py-2 border-4 rounded-xl" onClick={()=>removeListItem(i)}>{datas.name}</div>
                    ):null}
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
