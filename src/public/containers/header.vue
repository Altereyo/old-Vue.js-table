<template>
    <nav class="navbar navbar-dark bg-dark">
        <div>
            <button class="btn btn-outline-info my-2 my-sm-0" @click="switchDB()">Switch DB size to {{ switchSizeTo }}</button>
            <button class="btn btn-outline-info my-2 my-sm-0 add" data-toggle="modal" data-target="#addPerson">Add person</button>
        </div>
        <div class="form-inline">
            <input type="search" class="form-control mr-sm-2" @change="searchItem()" v-model="filterValue"/>
            <button class="btn btn-outline-info my-2 my-sm-0" @click="searchItem()">Search</button>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['dbSize'],
    data() {
        return {
            filterValue: '',
            currentDbSize: this.dbSize
        }
    },
    methods: {
        searchItem() {
            if (this.filterValue == '') {
                this.$parent.database = this.$parent.defaultDb
            } else {
                this.$parent.database = this.$parent.defaultDb.filter((person) => {
                    if (person.id == this.filterValue ||
                        person.firstName.includes(this.filterValue) ||
                        person.lastName.includes(this.filterValue) ||   
                        person.email.includes(this.filterValue) ||
                        person.phone.includes(this.filterValue)
                    ) { return true }
                })
            }
            this.$parent.$children.find(child => child.$options._componentTag == 'tableblock').turnToFirstPage()
        },

        switchDB() {
            this.$parent.$children.find(child => child.$options._componentTag == 'tableblock').turnToFirstPage()
            this.$parent.dataLoaded = false
            this.$parent.pageNum = 1

            if (this.dbSize == 'small') {
                this.$parent.currentDbSize = 'big'
                this.$parent.getData('api/big-table')
            }
            else if(this.dbSize == 'big') {
                this.$parent.currentDbSize = 'small'
                this.$parent.getData('api/small-table')
            }
        }
    },
    computed: {
        switchSizeTo() {
            if (this.dbSize == 'small') {
                return 'big'
            }
            else if (this.dbSize == 'big') {
                return 'small'
            } 
        }
    },
};
</script>

<style lang="scss">
    nav {
        padding: 20px 5%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>