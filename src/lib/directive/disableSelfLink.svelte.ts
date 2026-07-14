import { page } from '$app/state';
import type { Action } from 'svelte/action';

export const disableSelfLink: Action<HTMLAnchorElement> = (node) => {
	const originalHref: string | null = node.getAttribute('href');

	function isActive(currentPath: string): boolean {
		if (!originalHref) return false;
		if (originalHref.includes('#')) return false;
		return currentPath === originalHref;
	}

	function setButtonState(): void {
		node.removeAttribute('href');
		node.setAttribute('aria-current', 'page');
		node.style.cursor = 'default';
	}

	function setLinkState(): void {
		if (originalHref !== null) {
			node.setAttribute('href', originalHref);
		}
		node.removeAttribute('aria-current');
		node.style.cursor = '';
	}

	const cleanup = $effect.root(() => {
		$effect(() => {
			const currentPath = page.url.pathname;

			if (isActive(currentPath)) {
				setButtonState();
			} else {
				setLinkState();
			}
		});
	});

	return {
		destroy() {
			cleanup();
			setLinkState();
		}
	};
};
