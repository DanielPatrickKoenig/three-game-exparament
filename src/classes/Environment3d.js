import * as THREE from 'three';
export default class Environment3d{
    constructor(element, { width, height, background }){
        const _width = width | 1000;
        const _height = height | 700;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( background | 0xFFFFFF );
        this.camera = new THREE.PerspectiveCamera( 75, _width / _height, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( _width, _height );
        element.appendChild(this.renderer.domElement);
    }
    render(){
        this.renderer.render(this.scene, this.camera);
    }
}