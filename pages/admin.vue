<template>
    <b-container >
        <b-row>
            <b-col>
   <b-table striped hover :items="items" :fields="fields">
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(edit)="data">
            <b-button @click="edit(data.item)" variant="warning">
              <b-icon icon="pencil-fill"></b-icon>
            </b-button>
          </template>
          <template #cell(remove)="data">
            <b-button variant="danger" @click="remove(data.item)">
              <b-icon icon="archive-fill"></b-icon>
            </b-button>
          </template>
        </b-table>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <input
          multiple
          type="file"
          ref="inputFile1"
          style="display: none"
          @change="addFiles"
        />
        
        <b-button variant="warning" @click="chooseFile"> Фото қосу</b-button>
        <b-button variant="success" @click="saveFile">Сақтау</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    data() {
      return {
        fields: [
          {
            key:"first_name",
            label:"Басғасы"
          },
          {
            key:"last_name",
            label:"Фото"
          },
         {key:"edit",
         label:""},
         { key: "remove",label:""}
        
        ],
        items: [
          {first_name: '', last_name: '' },
        ]
      }
    },
    methods: {
         chooseFile() {
      this.$refs.inputFile1.click();
    },
    }
  }
</script>