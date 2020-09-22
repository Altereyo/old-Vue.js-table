<template>
    <div>
        <header>
            <headerblock :dbSize="currentDbSize" />
        </header>
        <main>
            <tableblock v-if="sizeChoosed" :database="database" :dataLoaded="dataLoaded" />
            <transition name="fade">
                <choose-size v-if="!sizeChoosed" :smallApi="smallDataAPI" :bigApi="bigDataAPI" />
                <person-info v-if="isPersonChosen" :person="person" />
            </transition>
            <add-person />
        </main>
    </div>
</template>

<script>
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
            isPersonChosen: false,

            currentDbSize: '',
            database: [],
            person: {},

            smallDataAPI: "api/small-table",            
            bigDataAPI:"api/big-table",
        }
    }, 
    methods: {
        getData(api){
            return fetch(api)
            .then(d => d.json())
            .then(d => this.database = d)
            .then(() => { // тут удаляются люди с одинаковыми id, тк сайт filltext.com делает много дубликатов
                let used = {}
                this.database = this.database.filter(function(obj) {
                    return obj.id in used ? 0 : (used[obj.id]=1)
                })
            })
            .then(() => { // а тут делаем бэкап БД для функционала поиска, и сообщаем, что данные загружены
                this.defaultDb = this.database
                this.dataLoaded = true
            })
        }
    },
};
</script>