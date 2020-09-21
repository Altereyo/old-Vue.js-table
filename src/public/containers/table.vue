<template>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col" v-for="header of tHeaders" @click="handleHeader(header)" :key="header">{{ header + showArrow(header) }}</th>
            </tr>
        </thead>
        
        <transition name="fade" mode="out-in">
            <spinner v-if="!dataLoaded" :countTableHeight="countTableHeight" />
            <tbody v-else-if="dataLoaded" :style="countTableHeight">
                <tr v-for="person of displayedPersons" @click="choosePerson(person)" :key="person.id">
                    <td>{{ person.id }}</td>
                    <td>{{ person.firstName }}</td>
                    <td>{{ person.lastName }}</td>
                    <td>{{ person.email }}</td>
                    <td>{{ person.phone }}</td>
                </tr>
                <div class="pagination">
                    <button class="prevBtn" @click="prevPage()" :disabled="pageNumber == 1"><span>&laquo;</span></button>
                    <button :class="calcBtnClass(page)" @click="changePage(page)" @reloadpages="pageNumber = 1" v-for="page of setPages" :disabled="page == pageNumber" :key="page">
                        <span>{{ page }}</span>
                    </button>
                    <button class="nextBtn" @click="nextPage()" :disabled="pageNumber == maxPagesCount"><span>&raquo;</span></button>
                </div>
            </tbody>
        </transition>
    </table>
</template>

<script>
// TODO добавить компонент рендера каждой персоны, но закешированной для каждой БД через vue keep-alive
import spinner from "../components/spinner.vue"

export default {
    props: ['database', 'dataLoaded'],
    components: { spinner },
    data() {
        return {
            tHeaders: ["id", "firstName", "lastName", "email", "phone"],
            
            paginatedDb: [],

            pageNumber: 1,
            pageSize: 10,
            pages: [],

            currentSortBy: '',
            isCurrentSortReversed: false
        };
    },
    methods: {
        choosePerson(person) {
            this.$parent.isPersonChosen = true
            this.$parent.person = person
        },
        paginatePersons() {
            let start = this.pageNumber * this.pageSize - this.pageSize
            let end = this.pageNumber * this.pageSize
            this.paginatedDb = this.database.slice(start, end)
        },
        nextPage() {
            this.pageNumber++
        },
        prevPage() {
            this.pageNumber--
        },
        changePage(num) {
            this.pageNumber = num
        },
        calcBtnClass(page) {
            if (page == this.pageNumber) return 
        },
        showArrow(header) {
            if (this.currentSortBy == header) {
                if (this.isCurrentSortReversed) {
                    return ' ∧'
                }
                if (!this.isCurrentSortReversed) {
                    return ' ∨'
                }
            }
            else {
                return ''
            }
        },
        handleHeader(header) {
            if (this.currentSortBy == header) { // если клик пришёл на уже сортированный столбец, данные таблицы переворачиваются
                this.isCurrentSortReversed = !this.isCurrentSortReversed
                this.database.reverse()
            }
            else { // если клик пришёлся на ныне не сортируемый столбец - сортируем
                this.currentSortBy = header
                this.isCurrentSortReversed = false
                this.turnToFirstPage()
                this.sortTable(header)
            }
        },
        turnToFirstPage() {
            this.pageNumber = 1
        },
        sortTable(header) {
            if (header == "id") { // столбец id состоит только из чисел, его сортируем по-простому
                this.database.sort((a, b) => a.id - b.id)
            }
            else { // остальные столбцы строчные, и в некоторых есть спец.символы, их сортируем через localCompare
                this.database.sort((a, b) => a[header].localeCompare(b[header]))
            }
        },
    },
    computed: {
        maxPagesCount() {
            let l = this.database.length
            let s = this.pageSize
            return Math.ceil(l/s)
        },
        displayedPersons() {
            this.paginatePersons()
            return this.paginatedDb
        },
        countTableHeight() {
            let px = this.pageSize * 48.8
            return 'height: ' + px + 'px;' 
        },
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
    }
}
</script>