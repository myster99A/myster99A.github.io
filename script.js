'use strict';
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let radius = 40;
let stillCheck = [];
let direction = 'left';
let bgRenderer, bgScene, bgCamera;
let cameraAngle = 0;
let sphereMaterial = {};
let heightY = 0;
let path, format, urls;
document.addEventListener(
    'mousemove', onDocumentMouseMove, false);

init();
animate();

function init() {
    //set up bg scene

    bgScene = new THREE.Scene();
    bgRenderer = new THREE.WebGLRenderer({
        alpha: true
    });
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(window.devicePixelRatio);

    //place in full screen container

    document.getElementById("canvas-container").appendChild(bgRenderer.domElement);

    //bgtexture

    path = "./images/";
    format = 'jpg';
    urls = [
        path + 'dark-s_px.' + format, path + 'dark-s_nx.' + format,
        path + 'dark-s_py.' + format, path + 'dark-s_ny.' + format,
        path + 'dark-s_pz.' + format, path + 'dark-s_nz.' + format
    ];
    console.log(urls)
    var load = new THREE.CubeTextureLoader().load(urls, setupBgAndSphere);

    //callback from loader method

    function setupBgAndSphere() {
        //disable loader text
        document.getElementById("loading").style.display = "none";
        // show hover text
        document.getElementById("text-container").style.display = "grid";
        // load cubemap to background and sphere
        bgScene.background = load;
        let sphereMaterial = new THREE.MeshBasicMaterial({ envMap: load, });
        var sphereGeometry = new THREE.SphereBufferGeometry(10, 30, 30);
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        bgScene.add(sphere);
    }
    //set up bg camera

    bgCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);

    //add window resize event listener

    window.addEventListener('resize', onWindowResize, false);
}

//resize function

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    bgCamera.aspect = window.innerWidth / window.innerHeight;
    bgCamera.updateProjectionMatrix();

    bgRenderer.setSize(window.innerWidth, window.innerHeight);

}

// camera mousemove

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

//animate function

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    bgRenderer.render(bgScene, bgCamera);
    bgCamera.lookAt(bgScene.position);
    checkMouse();

}
function checkMouse() {
    //make array to check if mouse moving or not, and in which direction
    stillCheck.push(mouseX);
    if (stillCheck.length >= 250)
        stillCheck.shift();
    // console.log(stillCheck);
    if (stillCheck[0] > stillCheck[48]) direction = "left";
    if (stillCheck[0] < stillCheck[48]) direction = "right";
    if (mouseX == 0) steadyOrbit(direction);
    if (stillCheck.every(
        (value, index, array) => value === array[0]))
        steadyOrbit(direction);
    else mouseOrbit();
}

//function for mouse - hover orbit

function mouseOrbit() {

    cameraAngle += (-mouseX - cameraAngle) * .01;
    heightY += (-mouseY - heightY) * .04;
    updateCamera();
}

//function for independent orbit

function steadyOrbit(direction = "left") {
    if (direction == "right")
        cameraAngle -= 0.6;
    if (direction == 'left')
        cameraAngle += 0.6;

    updateCamera();
}

// function to udate camera position

function updateCamera() {
    bgCamera.position.x = Math.cos(cameraAngle * .005) * radius;
    bgCamera.position.z = Math.sin(cameraAngle * .005) * radius;
    bgCamera.position.y = (heightY * .005) * 30;
}


