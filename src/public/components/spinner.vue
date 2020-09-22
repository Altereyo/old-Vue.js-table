<template>
    <div>
        <div class="spinner">
            <!-- архитектура блока взята с loading.io -->
            <div class="spinnerFirstWrapper">
                <div class="spinnerSecondWrapper">
                    <div></div><div><div></div></div>
                </div>
            </div>
        </div>
        <div class="clearfix" :style="countTableHeight"></div>
    </div>
</template>

<script>
export default {
    props: ['countTableHeight']
}
</script>