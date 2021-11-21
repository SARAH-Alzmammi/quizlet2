import { useState } from 'react'
import { supabase } from '../../utils/supabaseClient'


export default function AddTermForm(props) {


 const [term, setTerm] = useState(null)
 const [definition, setDefinition] = useState(null)

  function handelTermChange(e){
    setTerm( e.target.value)
 e.preventDefault()
  }

  function handelDefinitionChange(e){
    setDefinition( e.target.value)
 e.preventDefault()
  }


  async function AddTerm(e) {
    e.preventDefault()
   try {
 
     const { data, error } = await supabase
       .from('termAndDefnitions')
       .insert([
         { term: term, definition: definition,set_Id:props.id },
       ])
  
     if (error && status !== 406) {
       throw error
     }
   }
   catch (error) {
     console.log(error.message)
   }
   finally {
     setTerm('')
     setDefinition('')
    props.getStudySet()
   }

 }

    return (
      
      <form className="w-full ">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" >
         Term
          </label>
        </div>   
        <div className="md:w-2/3">
          <input className=" border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="inline-full-name" type="text" value={term?term:""} onChange={handelTermChange}/>
          </div>
          <div className="md:w-1/3">
          <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" >
          Definition          </label>
        </div>  
          <div className="md:w-2/3">
          <textarea className=" border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="inline-full-name" type="text" value={definition?definition:""} onChange={handelDefinitionChange}/>
          </div>
             



           <button className="h-9 px-5 m-2 text-gray-100 transition-colors    bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800" onClick={AddTerm} >Add</button>  
      </div>
    </form>
     )
   

  
}

