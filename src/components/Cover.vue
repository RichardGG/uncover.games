<template>
  <div
    :style="`perspective: 1000px; position: relative; z-index: ${
      hovering ? 2 : 1
    };`"
  >
    <div
      class="game-cover"
      :style="`width: ${width}px; height: ${
        width * 1.5
      }px; background: #eeeeee; display: flex; align-items: center; position: relative; transform: scale(${
        hovering ? 1.1 : 1
      }) rotateY(${rotationX}deg) rotateX(${rotationY}deg);`"
      @mousemove="onHover"
      @mouseout="onOut"
    >
      <div
        :style="`position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; text-align: center; font-size: ${
          width / 9
        }px; padding: ${width / 9}px;`"
      >
        {{ title }}
      </div>
      <img
        :src="url"
        :style="`max-width: ${width}px; transition: opacity .3s; opacity: ${
          url ? 1 : 0
        }; position: relative;`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDriveStore } from 'src/stores/driveStore';
import { useGoogleAuthStore } from 'src/stores/googleAuthStore';

export default defineComponent({
  name: 'CoverImage',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    fileName: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 50,
    },
  },
  setup(props) {
    const driveStore = useDriveStore();
    const googleAuthStore = useGoogleAuthStore();

    const url = ref('');
    const rotationX = ref(0);
    const rotationY = ref(0);
    const hovering = ref(false);

    if (props.fileName) {
      driveStore
        .getImage(googleAuthStore.getToken(), props.fileName)
        .then((dataUri) => {
          if (dataUri) {
            url.value = dataUri;
          }
        });
    }

    const onHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      window.requestAnimationFrame(() => {
        hovering.value = true;
        rotationX.value = (event.layerX / target.clientWidth) * 20 - 10;
        rotationY.value = ((event.layerY / target.clientHeight) * 20 - 10) * -1;
      });
    };

    const onOut = () => {
      rotationX.value = 0;
      rotationY.value = 0;
      hovering.value = false;
    };

    return { url, onHover, onOut, rotationX, rotationY, hovering };
  },
});
</script>
<style>
.game-cover {
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  perspective: 700px;
}
.game-cover img {
  transition: transform 0.4s !important;
}
.game-cover:hover {
  z-index: 10;
  box-shadow: 0 0 10px #000;
}

.game-cover:hover img {
  /* transform: scale(1.1); */
}
</style>
