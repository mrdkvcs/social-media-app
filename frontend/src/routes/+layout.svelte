<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	export let data: PageData;
</script>

<AppShell slotSidebarLeft="w-52 bg-surface-500/10 p-4">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<h1 class="text-4xl font-bold">OTB SOCIAL MEDIA APP</h1>
			</svelte:fragment>
			{#if data.state.loggedIn}
				<a href="/signout" class="btn bg-purple-500">Sign Out</a>
			{:else}
				<a href="/signup" class="btn bg-purple-500">Sign Up</a>
			{/if}
			<svelte:fragment slot="trail">
				<div class="flex gap-10 items-center">
					{#if data.state.loggedIn}
						<a href="/me/friends">
							<Icon icon="fa-solid:user-friends" width="25" />
						</a>
					{/if}
					{#if data.state.loggedIn}
						<Avatar initials={data.initials} background="bg-purple-500" width="w-14" />
					{:else}
						<Avatar initials={'?'} background="bg-gray-500" width="w-14" />
					{/if}
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft"></svelte:fragment>
	<div class="container p-10 mx-auto">
		<slot />
	</div>
	<svelte:fragment slot="sidebarRight"></svelte:fragment>
	<svelte:fragment slot="pageHeader"></svelte:fragment>
	<!-- Router Slot -->
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"></svelte:fragment>
	<!-- (footer) -->
</AppShell>
