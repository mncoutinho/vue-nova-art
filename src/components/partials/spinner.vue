<template>
  <div>
    <q-inner-loading :visible="showSpinner">
      <q-spinner-tail dark size="50px" color="grey"></q-spinner-tail>
    </q-inner-loading>
  </div>
</template>
<script>
export default {
  props: ['showSpinner']
}
</script>
