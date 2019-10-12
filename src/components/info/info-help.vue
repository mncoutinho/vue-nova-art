<template>
  <q-btn icon="far fa-question-circle" flat round dense size="11px" color="grey-10" >
    <q-tooltip style="background-color: #141B29; color: #000;  border-radius: 6px;
 border-style: solid;
  border-width: 1px;
     opacity: 0.95;">
      <div v-for="info in listInfo" :key="info.label">
        <div style="margin-top:3px; color: white;">
          <span style="color: white; text-decoration: underline;"><strong>{{info.label}}</strong></span>:&nbsp;&nbsp;{{info.message}}<br/>
        </div>
      </div>
    </q-tooltip>
  </q-btn>
</template>
<script>
import HelpMessages from '../../assets/help-messages'
export default {
  props: ['tipo'],
  data () {
    return {
      helpMessages: HelpMessages
    }
  },
  computed: {
    listInfo () {
      return this.helpMessages[this.tipo]
    }
  }
}
</script>
