export interface Toast<T extends object = {}> {
	id: string;
	props: T;
}

export interface ToastOptions<T extends object = {}> {
	duration?: number;
	props?: T;
}
