import { useToast } from "@gino/toast";
import { ToastExtraProps } from "../components/ToastContainer";
import { useState } from "react";

export default function Index() {
  const { toast } = useToast<ToastExtraProps>();
  const [sticky, setSticky] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <label className="flex items-center space-x-3">
        <span className="text-sm font-semibold">Mark toast as sticky</span>
        <input
          type="checkbox"
          checked={sticky}
          onChange={(e) => setSticky(e.target.checked)}
        />
      </label>
      <button
        className="bg-black text-white font-semibold text-sm px-4 py-2.5 rounded-lg focus:outline-none hover:bg-black/70 active:bg-black/80 transition duration-150 ease-in-out"
        onClick={() => {
          toast("Event created", {
            props: {
              date: new Date(),
              sticky,
            },
          });
        }}
      >
        Add toast
      </button>
    </div>
  );
}
