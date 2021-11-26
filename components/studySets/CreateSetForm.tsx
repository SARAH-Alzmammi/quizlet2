import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function CreateSetForm() {
  const user = supabase.auth.user();

  const [loading, SetLoading] = useState<boolean>(false);
  const [studySetName, SetStudySetName] = useState<String | null>(null);

  function HandelNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    SetStudySetName(e.target.value);
    e.preventDefault();
  }

  async function CreateStudySets() {
    try {
      SetLoading(true);
      const { data, error } = await supabase
        .from("studySets")
        .insert([{ name: studySetName, user_id: user.id }]);

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      SetLoading(false);
      window.location.reload();
    }
  }
  if (loading) {
    return <p>loading</p>;
  } else {
    return (
      <form className="w-full max-w-sm">
        <div className=" flex flex-col">
          <div className="">
            <p className="block text-black text-lg   pb-6 md:mb-0 ">
              Create a new study set
            </p>
          </div>

          <div>
            <div className="flex flex-col">
              <input
                className=" border-b-2   py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-yellow"
                id="inline-full-name"
                type="text"
                placeholder="Enter a title"
                onChange={HandelNameChange}
              />
            </div>
            <button
              className="h-9 px-5 m-2 text-white transition-colors    bg-cyan rounded-lg focus:shadow-outline hover:bg-yellow"
              onClick={CreateStudySets}>
              Create
            </button>
          </div>
        </div>
      </form>
    );
  }
}
