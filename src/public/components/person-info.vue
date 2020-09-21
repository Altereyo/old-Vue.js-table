<template>
    <div ref="card" class="card text-white bg-dark mb-3">
        <div class="card-header">
            <p><b>{{ person.firstName + ' ' + person.lastName}}</b></p>
            <button type="button"  @click="closeInfo()" class="close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="card-body">
            <h3 class="card-title"><b>Description:</b></h3>
            <p class="card-text">{{ person.description }}</p>
            <p class="card-text"><b>Street adress:</b> {{ person.address.streetAddress }}</p>
            <p class="card-text"><b>City:</b> {{ person.address.city }}</p>
            <p class="card-text"><b>State:</b> {{ person.address.state }}</p>
            <p class="card-text"><b>Zip:</b> {{ person.address.zip }}</p>
        </div>  
    </div>
</template>

<script>
export default {
    props: ['person'],
    methods: {
        closeInfo() {
            this.$parent.isPersonChosen = false
        }
    },
}
</script>