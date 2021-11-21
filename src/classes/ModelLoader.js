import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {nextTick} from '../utils/Utilities.js';
export default class ModelLoader{
    constructor(file){
        this.file = file;
        
    }
    async load(){
        const loader = new GLTFLoader();
        let model = null;
        loader.load( this.file, ( gltf ) => {
            model = gltf.scene;
            // console.log(gltf.scene.children);
            // const item   = gltf.scene;
            // this.env.scene.add( item );
            // let rot = 1;
            // setInterval(() => {
            //     // rot += .1;
            //     item.rotateY( rot * (Math.PI/180) );
            //     this.env.render();
            // });
            
            // // this.styleMeshes(this.scene);
            // this.env.render();

        }, undefined, ( error ) => {
            model = error;
            console.error( error );

        } );
        while (model === null){
            await nextTick();
        }
        
        return model;
    }
}