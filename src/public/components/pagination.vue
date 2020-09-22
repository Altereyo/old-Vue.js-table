<template>
    <div class="pagination">
        <button class="prevBtn" @click="prevPage()" :disabled="pageNumber == 1"><span>&laquo;</span></button>
        <button @click="changePage(page)" @reloadpages="pageNum = 1" v-for="page of setPages" :disabled="page == pageNumber" :key="page">
            <span>{{ page }}</span>
        </button>
        <button class="nextBtn" @click="nextPage()" :disabled="pageNumber == maxPagesCount"><span>&raquo;</span></button>
    </div>
</template>

<script>
export default {
    props: ['pageNumber', 'maxPagesCount'],
    data() {
        return {
            pageNum: this.pageNumber
        }
    },
    methods: {
        nextPage() {
            this.$parent.pageNumber++
        },
        prevPage() {
            this.$parent.pageNumber--
        },
        changePage(num) {
            this.$parent.pageNumber = num
        },
    },
    computed: {
        setPages() {
            let fivePages = []

            if (this.maxPagesCount < 5) {
                for (let i = 1; i <= this.maxPagesCount; i++) {
                    fivePages.push(i)
                }
            }
            else if (this.pageNumber <= 3) {
                for(let i = 1; i <= 5; i++) {
                    fivePages.push(i)
                }
            }
            else if (this.pageNumber >= this.maxPagesCount - 3) {
                for(let i = this.maxPagesCount - 5; i <= this.maxPagesCount; i++) {
                    fivePages.push(i)
                }
            }
            else {
                for(let i = this.pageNumber - 2; i <= this.pageNumber + 2; i++) {
                    fivePages.push(i)
                }
            }
            return fivePages
        }
    },
}
</script>