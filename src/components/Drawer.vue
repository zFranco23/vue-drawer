<template>
    <div class="container__content">
        <div class="container__canvas">
            <canvas height="500" width="400" ref="canvasRef" class="canvas"></canvas>
        </div>
        <!-- <input type="color" :value="color" @input="handleChangeColor" /> -->
        <!-- El v-bind es para enlazar atributos html a atributos reactivosm
            o tambien para insertar codigo javascript
        -->
        <div class="container__preview-image">
            <div class="container__actions">
                <ColorPicker :color="color" :handleSelect="handleChangeColor" />
                <button className="btn" @click="resetDraw">
                    Reset draw
                </button>
                <button class="btn" @click="saveFavorite">Save as Favorite</button>
                <button className="btn" @click="handleDownload">Download</button>
                <button className="btn" @click="enablePreview">
                    See Preview
                </button>
            </div>

            <div v-if="preview" class="container__preview">
                <img :src="preview" alt="canvas preview" class="img_preview" />
            </div>
        </div>
    </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue';

export default {
    data() {
        return {
            isDrawing: false,
            color: "#FF323A",
            ctx: null,
            preview: undefined,
        };
    },
    computed : {
        favorites(){
            return this.$store.state.favorites;
        }
    },
    methods: {
        handleChangeColor(e) {
            this.color = e.target.value;
        },
        initDrawConfig() {
            this.ctx.strokeStyle = this.color;
        },
        drawLine(e) {
            if (!this.isDrawing) return;
            this.ctx.lineWidth = 5;
            this.ctx.lineCap = "round";
            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();
            this.ctx.moveTo(e.offsetX, e.offsetY);
        },
        startDrawing(e) {
            // this.preview=undefined;
            this.isDrawing = true;
            this.drawLine(e);
        },
        endDrawing() {
            this.isDrawing = false;
        },
        handleDownload() {
            this.preview = undefined;
            const imageURI = this.$refs.canvasRef.toDataURL("image/png");
            const link = document.createElement("a");
            const date = new Date().getTime();
            link.download = `Draw-${date}.png`;
            link.href = imageURI;
            link.click();
        },
        enablePreview() {
            const imageURI = this.$refs.canvasRef.toDataURL("image/png");
            this.preview = imageURI;
        },
        resetDraw() {
            this.ctx.clearRect(0, 0, this.$refs.canvasRef.width, this.$refs.canvasRef.height);
        },
        saveFavorite(){
            if(!this.$confetti) return;
            this.$confetti.start();
            setTimeout(()=>{
                    if(this.$confetti){
                        this.$confetti.stop();
                    }
            },[1000])
            const imageURI = this.$refs.canvasRef.toDataURL("image/png");
           const newFavorite = {
            id : new Date().getTime(),
            src: imageURI
           };

           const favorites = [...this.favorites,newFavorite ]
           this.$store.commit('updateFavorites',favorites);
        }
    },
    watch: {
        color(curr, prev) {
            this.ctx.closePath();
            this.ctx.strokeStyle = curr;
        },
        favorites(curr,prev){
            localStorage.setItem('FAV_DRAWS',JSON.stringify(curr));
        }
    },
    mounted() {
        if (this.$refs.canvasRef) {
            const el = this.$refs.canvasRef;
            this.ctx = el.getContext("2d");
            this.initDrawConfig();
            el.addEventListener("mousedown", this.startDrawing);
            el.addEventListener("mouseup", (e) => {
                this.endDrawing();
                this.ctx.beginPath();
            });
            el.addEventListener("mousemove", this.drawLine);
        }
    },
    components: { ColorPicker }
}
</script>

<style scoped>
.container__canvas {
    border: 2px solid #333333;
    width: fit-content;
    max-width: 100%;
    width: 400px;
    overflow: hidden;
    margin: 0 auto;
}

.btn {
    background: none;
    cursor: pointer;
    border: 2px solid #333333;
    padding: 1rem 1.5rem;
    font-weight: 500;
    font-family: Poppins;
    border-radius: 10px;
}

.container__actions {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    gap: 16px;
    max-width: 100%;
    flex-wrap: wrap;
}

.container__preview {
    border: 2px dashed bisque;
    margin: 0 auto;
    width: fit-content;
}

.img_preview {
    width: 145px;
    height: 200px;
}


@media (min-width : 768px) {
    .container__canvas {
        margin: unset;
    }

    .container__content {
        display: flex;
        gap: 16px;
    }

    .container__actions {
        max-height: 5rem;
    }

    .container__preview-image {
        display: flex;
        flex-direction: column;
    }
}
</style>