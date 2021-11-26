import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Link from "next/link";
import CreateSetForm from "./StudySets/CreateSetForm";

interface setInfo {
  id: number;
  name: string;
}
export default function Dashboard() {
  const user = supabase.auth.user();
  const [loading, SetLoading] = useState<boolean>(false);

  const [studySets, SetStudySets] = useState<Array<setInfo>>(null);

  async function GetStudySets() {
    try {
      SetLoading(true);
      let studySets = await supabase
        .from("studySets")
        .select("id,name")
        .eq("user_id", user.id);
      SetStudySets(studySets.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      SetLoading(false);
    }
  }

  async function DeleteStudySets(id: number) {
    try {
      SetLoading(true);
      const TermAndDefinitions = await supabase
        .from("termAndDefinitions")
        .delete()
        .eq("set_Id", id);

      const { data, error } = await supabase
        .from("studySets")
        .delete()
        .eq("id", id);
    } catch (error) {
      console.log(error.message);
    } finally {
      SetLoading(false);
      GetStudySets();
    }
  }

  useEffect(() => {
    GetStudySets();
  }, []);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12 w-full">
      <CreateSetForm />
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {loading || !studySets ? (
          <p>Loading</p>
        ) : (
          studySets.map((set) => (
            <div
              className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
              key={set.id}>
              <article className="overflow-hidden rounded-lg shadow-lg w-full ">
                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">
                    <Link
                      href={{
                        pathname: "/DisplaySet",
                        query: { id: set.id, name: set.name }
                      }}>
                      <a className="no-underline hover:underline text-black">
                        {set.name}
                      </a>
                    </Link>
                  </h1>
                  <input
                    className="h-6 px-2 text-sm text-white transition-colors duration-150 bg-red-600 rounded-lg cursor-pointer focus:shadow-outline hover:bg-red-700"
                    type="submit"
                    value="X"
                    onClick={() => DeleteStudySets(set.id)}
                  />
                </header>
              </article>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
