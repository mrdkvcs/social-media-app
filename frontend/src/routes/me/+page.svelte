<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	export function getLikedFeeds() {
		let likedFeedsJSON = localStorage.getItem('likedFeeds');
		return likedFeedsJSON ? JSON.parse(likedFeedsJSON) : [];
	}

	export function updateLikedfeeds(feedId: string, isLiked: boolean) {
		let likedFeeds = getLikedFeeds();
		if (isLiked) {
			likedFeeds = likedFeeds.filter((feed: any) => feed !== feedId);
		} else {
			likedFeeds.push(feedId);
		}
		localStorage.setItem('likedFeeds', JSON.stringify(likedFeeds));
	}

	interface User {
		id: string;
		createdAt: string;
		updatedAt: string;
		firstName: string;
		lastName: string;
		email: string;
		password_hash: string;
		api_key: string;
		username: string;
	}
	interface Feed {
		id: string;
		created_at: string;
		updated_at: string;
		user_id: string;
		liked: boolean;
		content: string;
		likes: number;
		comments: number;
		username: string;
	}
	interface PageData {
		props: {
			user: User;
			feeds: Feed[];
		};
	}
	interface Form {
		success: boolean;
		message: string;
		name: string;
	}
	export let data: PageData;
	export let form: Form;
	if (typeof localStorage !== 'undefined') {
		const likedFeeds = getLikedFeeds();

		const newFeeds = data.props.feeds.map((feed) => {
			if (likedFeeds.includes(feed.id)) {
				return { ...feed, liked: true };
			} else {
				return { ...feed, liked: false };
			}
		});
		data.props.feeds = newFeeds;
	}
</script>

{#if data.props}
	<h1 class="text-4xl">Hey welcome , {data.props.user.firstName} {data.props.user.lastName}</h1>
{/if}
<form
	method="POST"
	action="?/createfeed"
	class="flex align-center justify-center items-center gap-5"
>
	<Avatar
		initials={data.props.user.firstName[0] + data.props.user.lastName[0]}
		background="bg-purple-500"
		width="w-14"
	/>
	<input
		type="text"
		id="content"
		name="content"
		class="w-64 rounded-full bg-purple-800 color-white p-4"
		placeholder={'What is in your mind, ' + data.props.user.firstName + '?'}
	/>
	<input id="username" name="username" type="hidden" value={data.props.user.username} />
</form>
<div class="flex flex-col gap-5 align-center items-center justify-center mt-20">
	{#if form}
		{#if form.success}
			<p class="text-white-500 bg-green-500 p-5 rounded italic">
				{form.message + ' ' + 'to' + ' ' + form.name}
			</p>
		{:else}
			<p class="text-white-500 bg-red-500 p-5 rounded italic">
				{form.message + ' ' + 'to' + ' ' + form.name}
			</p>
		{/if}
	{/if}

	{#each data.props.feeds as feed (feed.id)}
		<div class="flex items-start gap-2.5 items-center">
			<div
				class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-purple-200 rounded-e-xl rounded-es-xl bg-purple-600"
			>
				<div class="flex items-center space-x-2 rtl:space-x-reverse">
					<form method="POST" action="?/friendrequest" class="flex gap-2 items-center">
						<span class="text-sm font-semibold text-gray-900 dark:text-white">{feed.username}</span>
						{#if feed.user_id != data.props.user.id}
							<input type="hidden" value={data.props.user.id} name="senderID" />
							<input type="hidden" value={feed.username} name="recipientName" />
							<input type="hidden" value={data.props.user.username} name="senderName" />
							<input type="hidden" value={feed.user_id} name="recipientID" />
							<button type="submit">
								<Icon color="white" icon="fluent-mdl2:message-friend-request" />
							</button>
						{/if}
					</form>
					<span class="text-sm font-normal text-gray-500 dark:text-gray-400"></span>
				</div>
				<p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
					{feed.content}
				</p>
				<form method="POST" action="?/likefeed" class="flex items-center gap-2">
					<span class="text-sm font-normal text-gray-500 dark:text-gray-400">Likes</span>
					<input type="hidden" value={feed.id} name="id" />
					<input type="hidden" value={feed.liked} name="liked" />
					<button on:click={() => updateLikedfeeds(feed.id, feed.liked)} type="submit">
						{#if feed.liked}
							<Icon icon="mdi:heart" />
						{:else}
							<Icon icon="el:heart-empty" />
						{/if}
					</button>
					<p>{feed.likes}</p>
				</form>
			</div>
			{#if feed.user_id == data.props.user.id}
				<form method="POST" action="?/delete">
					<input type="hidden" value={feed.id} name="id" />
					<button class="bg-red-500 rounded p-2" type="submit">Delete</button>
				</form>
			{/if}
		</div>
	{/each}
</div>
