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
        this.env.camera.position.z = 6;
        this.env.camera.position.y = -1;

        const model = await new ModelLoader(glbFile).load();
        this.env.scene.add( model );

        const pg = new THREE.PlaneGeometry( 5, 5 );
        const pm = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( pg, pm );
        this.env.scene.add( plane );

        plane.name = 'tapper';

        const bg = new THREE.BoxGeometry( .5, .5, .5 );
        const bm = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        const cube = new THREE.Mesh( bg, bm );
        this.env.scene.add( cube );
        cube.position.y = 2;
        
        this.env.render();


        this.$refs.stage.addEventListener('mousemove', (e) => {
            const elementX = e.clientX - e.currentTarget.getBoundingClientRect().left;
            const elementY = e.clientY - e.currentTarget.getBoundingClientRect().top;
            const mousePos = new THREE.Vector2(
                ( elementX / window.innerWidth ) * 2 - 1,
                - ( elementY / window.innerHeight ) * 2 + 1); 
            // console.log(mousePos);
            // console.log(this.env.scene.children);
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mousePos, this.env.camera);
            const intersects = raycaster.intersectObjects(this.env.scene.children);
            const tappers = intersects.filter(item => item.object.name === 'tapper');
            console.log(tappers);
            if(tappers.length){
                console.log('move')
                cube.position.x = tappers[0].point.x;
                cube.position.y = tappers[0].point.y;
                cube.position.z = tappers[0].point.z;
                // cube.z = tappers[0].point.z;
                this.env.render();
            }
            // console.log(intersects);
            // let intersects = raycaster.intersectObjects(this.buttons );
        });


        
    }
}
</script>

<style>

</style>