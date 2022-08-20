import { useToast } from "@gino/toast";

export default function Index() {
	const { toasts } = useToast();

	return (
		<div>
			<button onClick={() => console.log(toasts[0].id)}>Add toast</button>
		</div>
	);
}
