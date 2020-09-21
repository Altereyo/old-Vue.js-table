<template>
    <div>
        <header>
            <headerblock :dbSize="currentDbSize" :smallApi="smallDataAPI" :bigApi="bigDataAPI" />
        </header>
        <main>
            <tableblock :database="database" :dataLoaded="dataLoaded" />
            <transition name="fade">
                <chooseSize v-if="!sizeChoosed" :smallApi="smallDataAPI" :bigApi="bigDataAPI" />
                <personInfo v-if="isPersonChosen" :person="person" />
            </transition>
            <addPerson />
        </main>
    </div>
</template>

<script>
// TODO сделать подгрузку из файлов json (с сервера) так, чтобы не было одинаковых ключей

import headerblock from "./containers/header.vue"
import tableblock from "./containers/table.vue"
import chooseSize from "./components/choose-size.vue"
import personInfo from "./components/person-info.vue"
import addPerson from "./components/add-person.vue"

export default {
    components: { headerblock, tableblock, chooseSize, personInfo, addPerson },
    data() {
        return {
            sizeChoosed: false,
            dataLoaded: false,
            currentDbSize: '',
            database: [],

            isPersonChosen: false,
            person: {},

            smallDataAPI: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",            
            bigDataAPI:"http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
        }
    },
    methods: {
        getData(api){
            // if (api == this.smallDataAPI) {
            //     this.currentDbSize = small
            // }
            return fetch(api)
            .then(d => d.json())
            .then(d => this.database = d)
            .then(() => {
                this.dataLoaded = true
                this.defaultDb = this.database
            })
        }
    },
    // mounted() {
    //     // ТАК МОЖНО!
    //     this.getData(this.smallDataAPI).then(() => console.log('then succesful!'))
    // },
};
</script>