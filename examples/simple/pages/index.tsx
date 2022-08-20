import { useToast } from "@gino/toast";

interface ToastExtraProps {
	date: Date;
}

export default function Index() {
	const { toasts } = useToast<ToastExtraProps>();

	return (
		<div>
			<button>Add toast</button>

			<ul>
				{toasts.map((toast) => (
					<li key={toast.id}>{JSON.stringify(toast, null, 2)}</li>
				))}
			</ul>
		</div>
	);
}
