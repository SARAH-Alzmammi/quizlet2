import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

import { SetInfo } from "./Show";

export default function AddTermForm({ id, GetStudySet }: SetInfo) {
  const [term, SetTerm] = useState<string | null>(null);
  const [definition, SetDefinition] = useState<string | null>(null);

  function HandelTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    SetTerm(e.target.value);
  }

  function HandelDefinitionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    SetDefinition(e.target.value);
  }

  async function AddTerm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("termAndDefinitions")
        .insert([{ term: term, definition: definition, set_Id: id }]);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      SetTerm("");
      SetDefinition("");
      GetStudySet();
    }
  }

  return (
    <form className="w-full ">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
            Term
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="border-b-2   py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-yellow"
            id="inline-full-name"
            type="text"
            value={term}
            onChange={HandelTermChange}
          />
        </div>
        <div className="md:w-1/3">
          <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
            Definition{" "}
          </label>
        </div>
        <div className="md:w-2/3">
          <textarea
            className=" border-b-2   py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-yellow"
            id="inline-full-name"
            value={definition}
            onChange={HandelDefinitionChange}
          />
        </div>

        <button
          className="h-9 px-5 m-2 text-gray-100 transition-colors    bg-cyan rounded-lg focus:shadow-outline hover:bg-gray-800"
          onClick={AddTerm}>
          Add
        </button>
      </div>
    </form>
  );
}
