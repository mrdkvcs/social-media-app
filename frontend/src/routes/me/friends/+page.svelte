<script lang="ts">
	import Icon from '@iconify/svelte';
	interface FriendRequest {
		request_id: string;
		sender_id: string;
		sender_name: string;
		recipient_id: string;
		recipient_name: string;
		createad_at: string;
	}
	interface PageData {
		friendRequests: FriendRequest[];
	}
	interface Form {
		message: string;
	}
	export let data: PageData;
	export let form: Form;
</script>

<h1 class="text-4xl m-10">Friends Page</h1>

<h2>Incoming friend requests</h2>

{#each data.friendRequests as request}
	<div class="flex justify-between">
		<div class="flex gap-5 mt-10">
			<Icon icon="mdi:user" width="30" />
			<h1>{request.sender_name}</h1>
			{#if form}
				<h2 class="text-green-500">{form.message}</h2>
			{:else}
				<form method="POST" action="/?acceptfriend">
					<input type="hidden" name="sender_id" value={request.sender_id} />
					<input type="hidden" name="recipient_id" value={request.recipient_id} />
					<button type="submit" class="flex gap-5 items-center">
						<h2>ACCEPT</h2>
						<Icon icon="emojione-v1:left-check-mark" />
					</button>
				</form>
				<form method="POST" action="/?declinefriend">
					<button class="flex gap-5 items-center" type="submit">
						<h2>DECLINE</h2>
						<Icon icon="emojione-v1:cross-mark" />
					</button>
				</form>
			{/if}
		</div>
		<div class="absolute right-60 top-40">
			<h2 class="text-2xl">Friends list</h2>
		</div>
	</div>
{/each}
