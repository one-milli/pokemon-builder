<script setup>
const handleDelete = () => {
    console.log('delete')
}
</script>
<template>
    <div>
        <button type="button"
            class="bg-red-500 rounded-full p-1 inline-flex items-center justify-center text-gray-100 hover:hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            @click="handleDelete">
            <span class="sr-only">Close menu</span>
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
</template>