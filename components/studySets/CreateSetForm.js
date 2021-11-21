import { useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

export default function CreateSetForm({ session }) {

  const user = supabase.auth.user()
  
 const [loading, setLoading] = useState(false)
 const [studySetName, setStudySetName] = useState(null)

  function handelNameChange(e){
   setStudySetName( e.target.value)
  e.preventDefault()
  }
  
  async function createStudySets(e) {
    e.preventDefault()
   try {
     setLoading(true)
     const { data, error } = await supabase
       .from('studySets')
       .insert([
         { name: studySetName, user_id: user.id },
       ])
  
     if (error && status !== 406) {
        console.error(error)
     }
   }
   catch (error) {
     console.log(error.message)
   }
   finally {
     setLoading(false)
     window.location.reload();
   }

 }
  if (loading) {
  return (<p>Loding</p>)
  } else {
    return (
      
      <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-black  md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
           Name
          </label>
        </div>   
        <div className="md:w-2/3">
          <input className=" border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="inline-full-name" type="text" value={studySetName?studySetName:""} onChange={handelNameChange}/>
           </div>
           <button className="h-9 px-5 m-2 text-gray-100 transition-colors    bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800" onClick={createStudySets} >Create</button>  
      </div>
    </form>
     )
   
}
  
}

