<template>
  <div ref="chooseWrapper" class="wrapper">
      <h1>Choose preferred table size:</h1>
      <div class="buttons">
          <button id="smallBtn" @click="chooseDB(smallApi)">Small Table</button>
          <button id="bigBtn" @click="chooseDB(bigApi)">Big Table</button>
      </div>
  </div>
</template>

<script>
export default {
    props: ['smallApi', 'bigApi'],
    methods: {
        chooseDB(size) {
            if (size == this.smallApi) {
                this.$parent.currentDbSize = 'small'
            }
            else if (size == this.bigApi) {
                this.$parent.currentDbSize = 'big'
            }
            
            this.$parent.getData(size)
            this.$parent.sizeChoosed = true
        }
    },
}
</script>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 999;
        width: 100vw;
        height: 100vh;

        h1 {
            margin-bottom: 20px;
        }
        .buttons {
            button {
                height: 50px;
                padding: 10px 15px;
                border-radius: 5px;
                margin: 0 10px;
                border: none;
                outline: none;
                transition: .3s;

                &:hover {
                    transform: scale(1.2);
                    border-radius: 10px;
                }
            }
        }
    }
</style>