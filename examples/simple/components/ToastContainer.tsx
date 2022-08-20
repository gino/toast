import { useToast } from "@gino/toast";

export interface ToastExtraProps {
	date: Date;
}

export function ToastContainer() {
	const { toasts } = useToast<ToastExtraProps>();

	return (
		<div className="absolute w-full max-w-md bottom-8 right-8">
			<ul className="flex flex-col-reverse gap-2">
				{toasts.map((toast) => (
					<li
						key={toast.id}
						className="px-5 py-4 text-white bg-black rounded-lg"
					>
						<div className="text-sm font-medium">{toast.message}</div>
						<div className="mt-1 text-xs text-white/50">
							{toast.props.date.toLocaleDateString("en-us", {
								weekday: "long",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
