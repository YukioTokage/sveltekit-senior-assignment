export type ErrorState = {
	errorDialogOpen?: boolean;
	errorMessage: string;
	fieldErrors: Record<string, string>;
	isCreateDialogOpen?: boolean;
};
