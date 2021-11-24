import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import AddTearmForm from "./AddTermForm";
import Router from "next/router";

interface setInfo {
  id: number;
  name: string;
}
interface Set {
  id?: number;
  set_Id?: number;
  term?: string;
  definition?: string;
}

export default function Show({ id, name }: setInfo) {
  const [loading, setLoading] = useState<boolean>(false);
  const [studySet, setStudySet] = useState<Array<Set | null>>(null);
  const [sets, setSets] = useState<Array<setInfo | null>>(null);

  async function getStudySet() {
    try {
      setLoading(true);
      const termAndDefnitions = await supabase
        .from<Set>("termAndDefnitions")
        .select("*")
        .eq("set_Id", id);
      setStudySet(termAndDefnitions.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteterm(id: number) {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("termAndDefnitions")
        .delete()
        .eq("id", id);
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      getStudySet();
    }
  }

  async function updateSet(e, id) {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("termAndDefnitions")
        .update({ set_Id: e.currentTarget.value })
        .eq("id", id);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
      getStudySet();
    }
  }

  async function getSets() {
    const user = supabase.auth.user();
    let { data: studySets, error } = await supabase
      .from("studySets")
      .select("id,name")
      .eq("user_id", user.id);
    setSets(studySets);
  }

  useEffect(() => {
    getStudySet();
    getSets();
    console.log(id);
  }, []);

  return (
    <div className=" container flex flex-wrap">
      <div className="w-full">
        <a
          className=" text-s bg-transparent hover:text-primary   cursor-pointer"
          onClick={Router.back}>
          Back
        </a>

        <h1 className="block text-black  ml-14 text-xl  mb-8 mt-5 pb-3 font-bold">
          {name}
        </h1>

        <AddTearmForm id={id} getStudySet={getStudySet} />
        {loading || !studySet ? (
          <p>Loding</p>
        ) : (
          studySet.map((set) => (
            <div
              key={set.id}
              className="mb-5 justify-items-center rounded-lg shadow-lg sm:flex">
              <div className="flex-1 px-6 py-4 font-bold border-r">
                {set.term}
              </div>
              <div className="flex-1 px-6 py-4">
                <p className="leading-normal text-gray-700">
                  {" "}
                  {set.definition}
                </p>
              </div>
              <div>
                <div className="inline-block relative w-50">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => updateSet(e, set.id)}>
                    <option>Move to</option>
                    {sets
                      ? sets.map((wholeset) => (
                          <option value={wholeset.id} key={wholeset.id}>
                            {" "}
                            {wholeset.name}
                          </option>
                        ))
                      : null}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>

                <input
                  className="block w-full text-center mt-5 h-6 px-2 text-sm text-white transition-colors bg-gray-600 rounded-lg cursor-pointer focus:shadow-outline hover:bg-red-700"
                  type="submit"
                  value="X"
                  onClick={() => deleteterm(set.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
