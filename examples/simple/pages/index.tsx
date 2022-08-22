import { useToast } from "@gino/toast";

export default function Index() {
  const { toast } = useToast();

  return (
    <div>
      <button onClick={() => toast("This is my toast")}>Add toast</button>
    </div>
  );
}
