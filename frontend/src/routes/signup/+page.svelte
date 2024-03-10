<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const { form, errors, constraints } = superForm(data.form);
</script>

<SuperDebug data={$form} />
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="text-4xl mb-32 italic text-center">Welcome to OTB's private social media app!</h1>
		<form method="POST" action="?/register" class="border-4 border-white p-20 rounded">
			<label class="label">
				<h1 class="text-4xl mb-5">Create your account</h1>
				<h2>Enter your first name</h2>
				<input
					{...$constraints.firstName}
					bind:value={$form.firstName}
					id="firstName"
					name="firstName"
					class="input"
					type="text"
					placeholder="Enter your first name here"
				/>
				{#if $errors.firstName}
					<p class="text-red-500">{$errors.firstName}</p>
				{/if}
				<h2>Enter your last name</h2>
				<input
					{...$constraints.lastName}
					bind:value={$form.lastName}
					id="lastName"
					name="lastName"
					class="input"
					type="text"
					placeholder="Enter your last name here"
				/>
				{#if $errors.lastName}
					<p class="text-red-500">{$errors.lastName}</p>
				{/if}
				<h2>Enter your email</h2>
				<input
					{...$constraints.email}
					bind:value={$form.email}
					id="email"
					name="email"
					class="input"
					type="text"
					placeholder="Enter your email here"
				/>
				{#if $errors.email}
					<p class="text-red-500">{$errors.email}</p>
				{/if}
				<h2>Enter your username</h2>
				<input
					{...$constraints.username}
					bind:value={$form.username}
					id="username"
					name="username"
					class="input"
					type="text"
					placeholder="Enter your username here"
				/>
				{#if $errors.username}
					<p class="text-red-500">{$errors.username}</p>
				{/if}
				<h2>Enter your password</h2>
				<input
					bind:value={$form.password}
					{...$constraints.password}
					id="password"
					name="password"
					class="input"
					type="password"
					placeholder="Enter your password here"
				/>
				{#if $errors.password}
					<p class="text-red-500">{$errors.password}</p>
				{/if}
			</label>
			<button type="submit" class="btn bg-purple-500 mt-10">CREATE MY ACCOUNT</button>
			<p class="italic mt-10">
				Already have an account? <a class="font-bold text-blue-500 underline" href="/signin"
					>Sign in</a
				>
			</p>
		</form>
	</div>
</div>
