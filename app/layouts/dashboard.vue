<template>
  <div>
    <div id="gt-el" style="height:0; overflow:hidden;"></div>
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <!-- sidebar -->
        <div class="col-sm-2">
          <Sidebar />
        </div>
        <main class="col-sm-10" style="padding-top:75px;padding-bottom:75px;">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>