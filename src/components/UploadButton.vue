<template>
  <div>
    <input type="file" @change="handleFileUpload" accept="video/*" />
    <button @click="seedFile">Subir y compartir video</button>
  </div>
</template>

<script>
import magnetController from '../controllers/magnetController';
export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async seedFile() {
      if (this.file) {
        try {
          const magnet = await magnetController.seedFile(this.file);
          
          await this.saveMagnetToDatabase(magnet);
          
          alert('Video subido y compartido exitosamente.');
        } catch (error) {
          console.error('Error al subir y compartir video:', error);
          alert('Error al subir el video.');
        }
      } else {
        alert('Por favor selecciona un archivo.');
      }
    },

    async saveMagnetToDatabase(magnet) {
      try {
        await fetch('http://localhost:3000/api/magnets/test-save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.file.name,
            magnetURI: magnet,
          }),
        });
      } catch (error) {
        console.error('Error al guardar el Magnet URI:', error);
      }
    },
  },
};
</script>
