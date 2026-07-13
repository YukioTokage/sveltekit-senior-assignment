class HeaderState {
	title = $state('Default Title');
	description = $state('Default Description');

	get titleLength() {
		return this.title.length;
	}
}

export const headerState = new HeaderState();
