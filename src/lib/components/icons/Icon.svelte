<script>
	let { children, class: className = '', size = 20 } = $props();
</script>

<span
	class="inline-flex items-center justify-center {className}"
	style="width: {size}px; height: {size}px;"
>
	{@render children()}
</span>
