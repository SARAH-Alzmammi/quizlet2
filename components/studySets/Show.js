import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import AddTearmForm from './AddTermForm'
import Router from 'next/router'

export default function Show(props) {

  const [loading, setLoading] = useState(false)
  const [studySet, setStudySet] = useState(null)
  const [sets, setSets] = useState(null)

  async function getStudySet() {
    try {
     setLoading(true) 
      const { data: termAndDefnitions, error } = await supabase
      .from('termAndDefnitions')
      .select('*')
      .eq('set_Id', props.id)
     
      setStudySet(termAndDefnitions)
      if (error && status !== 406) {
        throw error
      }
  
    
    }
    catch (error) {
      console.error(error.message)
    } finally {
     setLoading(false)

    }
 
  }

  async function deleteterm(id) {
    try {
      setLoading(true)
      const { data, error } = await supabase
      .from('termAndDefnitions')
      .delete()
      .eq('id',id)
      if (error && status !== 406) {
        throw error
      }

    }
    catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
      getStudySet()
    }
 
  }

  async function updateSet(e, id) {
    try {
      setLoading(true) 
      const { data, error } = await supabase
    .from('termAndDefnitions')
    .update({set_Id: e.currentTarget.value })
        .eq('id', id)
        if (error && status !== 406) {
          throw error
    }   
    }
    catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
      getStudySet()
    }

    
  }
  
  async function getSets() {
    const user = supabase.auth.user()
  let { data: studySets, error } = await supabase
  .from('studySets')
  .select('id,name')
  .eq('user_id', user.id)
  setSets(studySets)
}

 useEffect(() => {
  getStudySet()
  getSets()

 }, [])
  

    return (

      <div className="flex flex-wrap">
     
        <div className="w-full" >
          <a className=" text-s bg-transparent hover:text-blue-700   border-b-blue-500 mb-10 pb-3 ml-14 cursor-pointer" onClick={Router.back}>Back</a>
          
          < h1 className="block text-black  ml-14 text-xl border-b-2 mb-8 mt-5 pb-3 ">{props.name}</h1>
          
          <AddTearmForm id={props.id} getStudySet={getStudySet}/>
          {loading || !studySet ? <p>Loding</p> :
            studySet.map(set =>
              <div className="mb-5 justify-items-center rounded-lg shadow-lg sm:flex">
                <div className="flex-1 px-6 py-4">
                  {set.term}
                </div>
                <div className="flex-1 px-6 py-4">
                  <p className="leading-normal text-gray-700"> {set.definition}</p>
                </div>
                <div>
                  <div className="inline-block relative w-64">
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => updateSet(e, set.id)}>
                      <option >Move to</option>
                      {sets ? sets.map(wholeset =>
                        <option value={wholeset.id} key={wholeset.id}> {wholeset.name}</option>
                      ) : null}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>

                  <input className="block w-full text-center mt-5 h-6 px-2 text-sm text-white transition-colors bg-gray-600 rounded-lg cursor-pointer focus:shadow-outline hover:bg-red-700" type="submit" value="X" onClick={() => deleteterm(set.id)} />
                </div>
              </div>
            )}
          

      </div>


</div>
    )

}
