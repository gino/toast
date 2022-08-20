export interface Toast<T extends object = {}> {
	id: string;
	message: string;
	props: T;
}

export interface ToastOptions<T extends object = {}> {
	/**
	 * Amount of seconds a toast should stay visible before disappearing.
	 * If `null` provided, toast will stay permanently.
	 */
	duration?: number | null;
	props?: T;
}
