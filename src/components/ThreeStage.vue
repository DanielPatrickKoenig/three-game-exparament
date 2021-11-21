<template>
    <div ref="stage">

    </div>
</template>

<script>
import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Environment3d from '../classes/Environment3d.js';
import ModelLoader from '../classes/ModelLoader.js';
// const glbFile = 'https://danielpatrickkoenig.github.io/three-game-exparament/public/Xbot.glb';
const glbFile = 'https://danielpatrickkoenig.github.io/three-game-exparament/public/testThing.glb';
// const glbFile = '../assets/testThing.txt';

// const glbFile = 'https://danielpatrickkoenig.github.io/three-game-exparament/public/pencil/source/pencil.glb';
export default {
    data () {
        return {
            env: null

        }
    },
    methods: {
        styleMeshes (scope) {
            scope.children.forEach(item => {
                if(item.children.length){
                    this.styleMeshes(item);
                }
                else{
                    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                    item.material = material;
                    console.log(item);
                }
            });
        }
    },
    async mounted () {
        this.env = new Environment3d(this.$refs.stage, {width: 1000, height: 700})
        
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 ); 
        this.env.scene.add( directionalLight );
        this.env.camera.position.z = 4;

        const model = await new ModelLoader(glbFile).load();
        this.env.scene.add( model );
        this.env.render();
    }
}
</script>

<style>

</style>