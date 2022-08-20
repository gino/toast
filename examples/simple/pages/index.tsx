import { useToast } from "@gino/toast";

interface ToastExtraProps {
	date: Date;
}

export default function Index() {
	const { toast, toasts } = useToast<ToastExtraProps>();

	return (
		<div className="p-4">
			<button
				onClick={() => {
					toast("test", {
						props: {
							date: new Date(),
						},
					});
				}}
			>
				Add toast
			</button>

			<ul className="list-disc list-inside">
				{toasts.map((toast) => (
					<li key={toast.id}>{JSON.stringify(toast, null, 2)}</li>
				))}
			</ul>
		</div>
	);
}
