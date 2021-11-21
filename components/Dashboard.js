import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Link from 'next/link'
import  CreateSetForm from './studySets/CreateSetForm'
export default function Dashboard({ session }) {
  const user = supabase.auth.user()
  const [loading, setLoading] = useState(false)

  const [studySets, setStudySets] = useState(null)


 
  async function getStudySets() {
    try {
      setLoading(true)
      let { data: studySets, error } = await supabase
        .from('studySets')
        .select('id,name')
        .eq('user_id', user.id)
      setStudySets(studySets)
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

  async function deleteStudySets(id) {
    try {
      setLoading(true)
      const { data1, error1 } = await supabase
        .from('termAndDefnitions')
        .delete()
        .eq('set_Id', id)
        
      const { data, error } = await supabase
      .from('studySets')
      .delete()
      .eq('id',id)
      if (error && status !== 406) {
        throw error
      }

    }
    catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
      getStudySets()
    }
 
  }

  useEffect(() => {
    getStudySets()
  }, [session])

  // if (studySets) {
    return (
      <div className="container my-12 mx-auto px-4 md:px-12">
        <CreateSetForm/>
        <div className="flex flex-wrap -mx-1 lg:-mx-4">

          {loading || !studySets ? <p>Loading</p> :
            studySets.map(set =>
    
 
              <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={set.id}>
          
                <article className="overflow-hidden rounded-lg shadow-lg">
                  <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-lg">

                    <Link  href={{pathname: "/displaySet",query: {id: set.id,name : set.name,},}}>
               
               <a className="no-underline hover:underline text-black">{set.name}
                      </a>
                      </Link>
                      
       
                    </h1>
                    <input className="h-6 px-2 text-sm text-white transition-colors duration-150 bg-red-600 rounded-lg cursor-pointer focus:shadow-outline hover:bg-red-700" type="submit" value="X"  onClick={() => deleteStudySets(set.id)}/>
                  </header>
                </article>
              </div>
                  
            )
  
          }
  
        </div>
      </div>
    )
  // }
  // else {
  //   return (
  //     <div>
  //        <CreateSetForm/>
  //        <p>Nothing here Yet</p>
  //    </div>
    
  //   )
  // }
  }
        

        


