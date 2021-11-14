<template>
    <div ref="stage">

    </div>
</template>

<script>
import * as THREE from 'three';
export default {
    data () {
        return {
            camera: null,
            scene: null,
            renderer: null

        }
    },
    mounted () {
        const width = 1000;
        const height = 700;
        console.log(this.$refs.stage);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, width );
        this.$refs.stage.appendChild( this.renderer.domElement );

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

        this.camera.position.z = 5;

        console.log(this.renderer);

        this.renderer.render(this.scene, this.camera);
    }
}
</script>

<style>

</style>