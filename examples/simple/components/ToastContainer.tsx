import { useToast } from "@gino/toast";
import { AnimatePresence, motion } from "framer-motion";

export interface ToastExtraProps {
	date: Date;
}

export function ToastContainer() {
	const { toasts, removeToast } = useToast<ToastExtraProps>();

	return (
		<div className="absolute w-full max-w-md bottom-8 right-8">
			<ul className="flex flex-col-reverse gap-2">
				<AnimatePresence>
					{toasts.map((toast) => (
						<motion.li
							key={toast.id}
							layout
							initial={{ opacity: 0, y: 50, scale: 0.7 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.3 } }}
							drag="x"
							dragSnapToOrigin={true}
							dragConstraints={{ left: 0, right: 10 }}
							onDragEnd={(_event, info) => {
								const offset = info.offset.x;

								if (offset >= 130) {
									removeToast(toast.id);
								}
							}}
							whileTap={{ scale: 0.95 }}
							className="px-5 py-4 text-white bg-black border rounded-lg border-white/[0.07] relative group"
						>
							<div className="text-sm mb-0.5 font-medium">{toast.message}</div>
							<div className="text-xs text-white/50">
								{toast.props.date.toLocaleDateString("en-us", {
									weekday: "long",
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</div>

							<div className="absolute transition duration-150 ease-in-out opacity-0 -top-2 -left-2 group-hover:opacity-100">
								<button
									onClick={() => removeToast(toast.id)}
									className="flex items-center justify-center w-5 h-5 text-xs bg-black border-white/[0.07] border text-white/50 hover:text-white/100 rounded-full transition duration-150 ease-in-out focus:outline-none"
									aria-label="Dismiss toast"
									title="Dismiss toast"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-2 h-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={3}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</motion.li>
					))}
				</AnimatePresence>
			</ul>
		</div>
	);
}
