<script>
	export let form;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="text-4xl mb-32 italic text-center">Welcome to OTB's private social media app!</h1>
		<form method="POST" action="?/login" class="border-4 border-white p-20 rounded">
			<label class="label">
				<h1 class="text-4xl mb-5">Log in</h1>
				{#if form}
					<h2 class="text-red-500">{form.error}</h2>
				{/if}
				<span>Enter your email</span>
				<input
					required
					id="email"
					name="email"
					class="input"
					type="text"
					placeholder="Enter your email here"
				/>
				<span>Enter your password</span>
				<input
					required
					id="password"
					name="password"
					class="input"
					type="password"
					placeholder="Enter your password here"
				/>
			</label>
			<button type="submit" class="btn bg-purple-500 mt-10">Log in</button>
		</form>
	</div>
</div>
