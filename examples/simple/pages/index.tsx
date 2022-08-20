import { useToast } from "@gino/toast";
import { ToastExtraProps } from "../components/ToastContainer";

export default function Index() {
	const { toast } = useToast<ToastExtraProps>();

	return (
		<div className="p-4">
			<button
				onClick={() => {
					toast("Event created", {
						props: {
							date: new Date(),
						},
					});
				}}
			>
				Add toast
			</button>
		</div>
	);
}
