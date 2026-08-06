<x-layouts.app :title="__('Dashboard')">
    @livewireStyles

    <div class="flex h-full w-full flex-1 flex-col gap-4 rounded-xl">

        <div id="app" data-token="{{ $apiToken }}"></div>

    </div>

    @livewireScripts
</x-layouts.app>
