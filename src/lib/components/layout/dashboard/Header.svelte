<script lang="ts">
	import type { User } from '$lib/schemas';
	import Button from '$lib/components/primitives/Button.svelte';
	import ThemeToggle from '$lib/components/primitives/ThemeToggle.svelte';
	import BurgerIcon from '$lib/components/icons/BurgerIcon.svelte';

	let { user, onMenuClick }: { user: Omit<User, 'password'>; onMenuClick: () => void } = $props();
</script>

<header
	class="h-16 bg-card text-card-foreground border-b border-border flex items-center justify-between px-4 sm:px-6 lg:justify-end shrink-0 w-full"
>
	<Button
		variant="ghost"
		size="icon"
		aria-label="Open Sidemenu"
		class="md:hidden md:mr-0 mr-auto text-muted-foreground hover:text-foreground"
		onclick={onMenuClick}
	>
		<BurgerIcon />
	</Button>

	<ThemeToggle />

	<div class="flex items-center gap-4 md:ml-auto ml-0">
		<div class="flex items-center gap-3">
			<div class="text-right hidden sm:block">
				<p class="text-sm font-medium text-foreground">{user.email}</p>
				<p class="text-xs text-muted-foreground capitalize">{user.role}</p>
			</div>

			<div
				class="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm uppercase border border-primary/20"
			>
				{user.email.charAt(0)}
			</div>
		</div>
	</div>
</header>
