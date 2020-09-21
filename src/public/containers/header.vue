<template>
    <nav class="navbar navbar-dark bg-dark">
        <div>
            <button class="btn btn-outline-info my-2 my-sm-0" @click="switchDB()">Switch DB size to {{ switchSizeTo }}</button>
            <button class="btn btn-outline-info my-2 my-sm-0 add" data-toggle="modal" data-target="#addPerson">Add person</button>
        </div>
        <form class="form-inline" @submit="searchItem()">
            <input type="search" class="form-control mr-sm-2" v-model="filterValue" aria-label="Search" />
            <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
        </form>
    </nav>
</template>

<script>
export default {
    props: ['dbSize', 'smallApi', 'bigApi'],
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
        },

        switchDB() {
            console.log(this.$parent.$children[1])
            this.$parent.$children.find(child => child.$options._componentTag == 'tableblock').turnToFirstPage()
            this.$parent.dataLoaded = false
            this.$parent.pageNum = 1

            if (this.dbSize == 'small') {
                this.$parent.currentDbSize = 'big'
                this.$parent.getData(this.bigApi)
            }
            else if(this.dbSize == 'big') {
                this.$parent.currentDbSize = 'small'
                this.$parent.getData(this.smallApi)
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