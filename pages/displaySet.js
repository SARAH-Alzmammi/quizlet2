
 import 'tailwindcss/tailwind.css'
 import { useRouter } from 'next/router'
 import Navbar from '../components/Navbar'
 import Show from '../components/studySets/Show'
 
 export default function DisplaySet() {
  const router = useRouter()
   const { id } = router.query
   const { name } = router.query
   return (
     <div className="container" >
             <Navbar/>
       <Show id={id} name={name} />
     </div>
   )
 }