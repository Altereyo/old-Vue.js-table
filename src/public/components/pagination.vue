<template>
    <div class="pagination">
        <button class="prevBtn" @click="prevPage()" :disabled="$parent.pageNumber == 1">&laquo;</button>
        <button class="pageBtn" v-for="page in setPages()" :key="page" @click="changePage(page)"> {{ page }}</button>
        <button class="nextBtn" @click="nextPage()" :disabled="$parent.pageNumber >= pageCount -1">&raquo;</button>
    </div>
</template>

<script>
export default {
    props: ['dbLength', 'pageSize'],
    data() {
        return {
            pages: []
        }
    },
    methods: {
        nextPage() {
            pageNumber++
        },
        prevPage() {
            pageNumber--
        },
        changePage(num) {
            pageNumber = num
        },
        setPages() {
            let numberOfPages = Math.ceil(this.dbLength / this.pageSize)
            for (let i = 1; i <= numberOfPages; i++) {
                this.pages.push(i)
            }
            return this.pages
        },
    },
    // computed: {
        // },
    mounted() {
        console.log(this.dbLength)
    }
}
</script>