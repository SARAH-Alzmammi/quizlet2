import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Show from "../components/StudySets/Show";

export default function DisplaySet() {
  const router = useRouter();
  const { name } = router.query;
  const { id } = router.query;

  return (
    <div>
      <Navbar />
      <Show id={Number(id)} name={String(name)} />
    </div>
  );
}
