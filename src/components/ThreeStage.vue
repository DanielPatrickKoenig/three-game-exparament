<template>
    <div ref="stage">

    </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const glbFile = 'https://danielpatrickkoenig.github.io/three-game-exparament/public/Xbot.glb';
// const glbFile = 'https://danielpatrickkoenig.github.io/three-game-exparament/public/pencil/source/pencil.glb';
export default {
    data () {
        return {
            camera: null,
            scene: null,
            renderer: null

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
    mounted () {
        const width = 1000;
        const height = 700;
        console.log(this.$refs.stage);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xEEEEEE );
        this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, width );
        this.$refs.stage.appendChild( this.renderer.domElement );

        // const geometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // const cube = new THREE.Mesh( geometry, material );
        // this.scene.add( cube );

        this.camera.position.z = 4;

        const loader = new GLTFLoader();

        loader.load( glbFile, ( gltf ) => {
            console.log(gltf.scene.children);
            const item   = gltf.scene;
            this.scene.add( item );
            let rot = 1;
            setInterval(() => {
                // rot += .1;
                item.rotateY( rot * (Math.PI/180) );
                this.renderer.render(this.scene, this.camera);
            });
            item.rotateY( 1.2 );
            console.log(this.scene);
            
            // this.styleMeshes(this.scene);
            this.renderer.render(this.scene, this.camera);

        }, undefined, ( error ) => {

            console.error( error );

        } );

        console.log(this.renderer);

        this.renderer.render(this.scene, this.camera);
    }
}
</script>

<style>

</style>