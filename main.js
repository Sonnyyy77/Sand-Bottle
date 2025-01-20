// import './style.css'
// import decomp from 'poly-decomp'

// Set Up the Sensor

let permissionGranted = false;
let nonios13device = false;
let cx, cy;

//Sensor permission setting
function setup() {
  // DOM setup
  const permissionModal = document.querySelector(".permission-modal");
  permissionModal.style.display = "none";
  const buttonContainer = document.querySelector(".button-container");
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "CANCEL";
  buttonContainer.appendChild(cancelButton);
  const allowButton = document.createElement("button");
  allowButton.textContent = "ALLOW";
  buttonContainer.appendChild(allowButton);

  cx = window.innerWidth / 2;
  cy = window.innerHeight / 2;

  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    // show modal if device supports motion sensor
    DeviceOrientationEvent.requestPermission()
      .catch((error) => {
        // show permission dialog only the first time
        permissionModal.style.display = "block";
        permissionModal.style.zIndex = "10";

        cancelButton.addEventListener('click', () => {
          permissionModal.style.display = "none";
        });

        // handle first time visit to grant access
        allowButton.addEventListener('click', () => {
          permissionModal.style.display = "none";
          DeviceOrientationEvent.requestPermission()
            .then((res) => {
              permissionGranted = res === "granted" ? true : false;
            })
            .catch(console.error);
        });
        // keep the promise chain as denied
        throw error;
      })
      .then(() => {
        // this runs on subsequent visits
        permissionGranted = true;
      });
  } else {
    nonios13device = true;
    console.log("non iOS device detected.");
  }
}

setup();

// Check if the device supports the DeviceOrientationEvent
if (window.DeviceOrientationEvent) {
  // Listen for the deviceorientation event
  window.addEventListener('deviceorientation', handleOrientation);
} else {
  console.log("Device orientation not supported.");
}

// Load Images

let glass1pic = './bottlepic/glass1.png';
let glass1 = document.createElement("img");
glass1.src = glass1pic;
let glass2pic = './bottlepic/glass2.png';
let glass2 = document.createElement("img");
glass2.src = glass2pic;
let glass3pic = './bottlepic/glass3.png';
let glass3 = document.createElement("img");
glass3.src = glass3pic;
let glass4pic = './bottlepic/glass4.png';
let glass4 = document.createElement("img");
glass4.src = glass4pic;
let glass5pic = './bottlepic/glass5.png';
let glass5 = document.createElement("img");
glass5.src = glass5pic;
let glass6pic = './bottlepic/glass6.png';
let glass6 = document.createElement("img");
glass6.src = glass6pic;


function show_image1(src, width, height, alt) {
    var glasspic1 = document.createElement("img");
    glasspic1.id = "glasspic1";
      glasspic1.src = src;
      glasspic1.width = width;
      glasspic1.height = height;
      glasspic1.alt = alt;
  
    // This next line will just add it to the <body> tag
    document.body.appendChild(glasspic1);
    glasspic1.style.position = "absolute";
    glasspic1.style.left = cx - width / 2 + "px";
    glasspic1.style.bottom = -160 + "px";
    glasspic1.style.zIndex = "2";
    glasspic1.style.pointerEvents = "none";
}

// show_image1(glass1pic, 1000, 1000, "glass1");

function show_image2(src, width, height, alt) {
    var glasspic2 = document.createElement("img");
    glasspic2.id = "glasspic2";
      glasspic2.src = src;
      glasspic2.width = width;
      glasspic2.height = height;
      glasspic2.alt = alt;

    // This next line will just add it to the <body> tag
    document.body.appendChild(glasspic2);
    glasspic2.style.position = "absolute";
    glasspic2.style.left = cx - width / 2 + "px";
    glasspic2.style.bottom = -160 + "px";
    glasspic2.style.zIndex = "2";
    glasspic2.style.pointerEvents = "none";
}

// show_image2(glass2pic, 1000, 1000, "glass2");

function show_image3(src, width, height, alt) {
  var glasspic3 = document.createElement("img");
  glasspic3.id = "glasspic3";
    glasspic3.src = src;
    glasspic3.width = width;
    glasspic3.height = height;
    glasspic3.alt = alt;

  // This next line will just add it to the <body> tag
  document.body.appendChild(glasspic3);
  glasspic3.style.position = "absolute";
  glasspic3.style.left = cx - width / 2 + "px";
  glasspic3.style.bottom = -160 + "px";
  glasspic3.style.zIndex = "2";
  glasspic3.style.pointerEvents = "none";
}

// show_image3(glass3pic, 1000, 1000, "glass3");

function show_image4(src, width, height, alt) {
  var glasspic4 = document.createElement("img");
  glasspic4.id = "glasspic4";
    glasspic4.src = src;
    glasspic4.width = width;
    glasspic4.height = height;
    glasspic4.alt = alt;

  // This next line will just add it to the <body> tag
  document.body.appendChild(glasspic4);
  glasspic4.style.position = "absolute";
  glasspic4.style.left = cx - width / 2 + "px";
  glasspic4.style.bottom = -160 + "px";
  glasspic4.style.zIndex = "2";
  glasspic4.style.pointerEvents = "none";
}

// show_image4(glass4pic, 1000, 1000, "glass4");

// Set Up the Canvas and Engine
let openPage = document.getElementById("openPage");
let color1 = document.getElementById('paint1');
let color2 = document.getElementById('paint2');
let color3 = document.getElementById('paint3');
let color4 = document.getElementById('paint4');
let color5 = document.getElementById('paint5');
let color6 = document.getElementById('paint6');
let color7 = document.getElementById('paint7');
let bottle1 = document.getElementById('bottle1');
let bottle2 = document.getElementById('bottle2');
let bottle3 = document.getElementById('bottle3');
let bottle4 = document.getElementById('bottle4');
let continueButton = document.getElementById('continue');
let save = document.getElementById('save');
// let canvas = document.querySelector('canvas');
let reset = document.getElementById('reset');

const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Common = Matter.Common,
  Svg = Matter.Svg,
  Vertices = Matter.Vertices,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Composite = Matter.Composite,
  Constraint = Matter.Constraint;

// Common.setDecomp(decomp);

const iEngine = Engine.create({ gravity: { y: 0.2 } });
const World = iEngine.world;
const iRunner = Runner.create();
const iRender = Render.create({
element: document.body,
engine: iEngine,
options: {
  width: window.innerWidth,
  height: window.innerHeight,
  wireframes: false,
  background: "white"
}
});

// Set up the Buttons
let activeBottle = 0;
let activeCtnButton = false;
let openPageDisplay = true;

bottle1.addEventListener("click", picked1);
bottle2.addEventListener("click", picked2);
bottle3.addEventListener("click", picked3);
bottle4.addEventListener("click", picked4);

function activeContinue(){
  continueButton.style.backgroundColor = "#6CE26A";
  continueButton.style.border = "2px solid #54B34E";
  continueButton.style.color = "white";
  continueButton.style.cursor = "pointer";
  activeCtnButton = true;
}

function picked1(){
  bottle1.style.backgroundColor = "#6682ff";
  bottle1.style.border = "2px solid #3750be";
  bottle2.style.backgroundColor = "#3c4158";
  bottle2.style.border = "2px solid #212430";
  bottle3.style.backgroundColor = "#3c4158";
  bottle3.style.border = "2px solid #212430";
  bottle4.style.backgroundColor = "#3c4158";
  bottle4.style.border = "2px solid #212430";
  activeContinue();
  activeBottle = 1;
}

function picked2(){
  bottle2.style.backgroundColor = "#6682ff";
  bottle2.style.border = "2px solid #3750be";
  bottle1.style.backgroundColor = "#3c4158";
  bottle1.style.border = "2px solid #212430";
  bottle3.style.backgroundColor = "#3c4158";
  bottle3.style.border = "2px solid #212430";
  bottle4.style.backgroundColor = "#3c4158";
  bottle4.style.border = "2px solid #212430";
  activeContinue();
  activeBottle = 2;
}

function picked3(){
  bottle3.style.backgroundColor = "#6682ff";
  bottle3.style.border = "2px solid #3750be";
  bottle1.style.backgroundColor = "#3c4158";
  bottle1.style.border = "2px solid #212430";
  bottle2.style.backgroundColor = "#3c4158";
  bottle2.style.border = "2px solid #212430";
  bottle4.style.backgroundColor = "#3c4158";
  bottle4.style.border = "2px solid #212430";
  activeContinue();
  activeBottle = 3;
}

function picked4(){
  bottle4.style.backgroundColor = "#6682ff";
  bottle4.style.border = "2px solid #3750be";
  bottle1.style.backgroundColor = "#3c4158";
  bottle1.style.border = "2px solid #212430";
  bottle2.style.backgroundColor = "#3c4158";
  bottle2.style.border = "2px solid #212430";
  bottle3.style.backgroundColor = "#3c4158";
  bottle3.style.border = "2px solid #212430";
  activeContinue();
  activeBottle = 4;
}

continueButton.addEventListener("click", continueButtonClick);

function continueButtonClick(){
  if (activeCtnButton == true) {
    openPage.style.display = "none";

    if (activeBottle == 1){
      show_image1(glass1pic, 1000, 1000, "glass1")
      drawWalls1()
    }
    if (activeBottle == 2){
      show_image2(glass2pic, 1000, 1000, "glass2")
      drawWalls2()
    }
    if (activeBottle == 3){
      show_image3(glass3pic, 1000, 1000, "glass3")
      drawWalls3()
    }
    if (activeBottle == 4){
      show_image4(glass4pic, 1000, 1000, "glass4")
      drawWalls4()
    }

    openPageDisplay = false;
  }
  else {
    return;
  }
}

color1.addEventListener("click", function () {
  ballColor = "#FA897B";
  color1.style.transform = "scale(1.2)";
  color2.style.transform = "scale(1)";
  color3.style.transform = "scale(1)";
  color4.style.transform = "scale(1)";
  color5.style.transform = "scale(1)";
  color6.style.transform = "scale(1)";
  color7.style.transform = "scale(1)";
})

color2.addEventListener("click", function () {
  ballColor = "#FFB350";
  color1.style.transform = "scale(1)";
  color2.style.transform = "scale(1.2)";
  color3.style.transform = "scale(1)";
  color4.style.transform = "scale(1)";
  color5.style.transform = "scale(1)";
  color6.style.transform = "scale(1)";
  color7.style.transform = "scale(1)";
})

color3.addEventListener("click", function () {
  ballColor = "#FFDD94";
  color1.style.transform = "scale(1)";
  color2.style.transform = "scale(1)";
  color3.style.transform = "scale(1.2)";
  color4.style.transform = "scale(1)";
  color5.style.transform = "scale(1)";
  color6.style.transform = "scale(1)";
  color7.style.transform = "scale(1)";
})

color4.addEventListener("click", function () {
  ballColor = "#D0E6A5";
  color1.style.transform = "scale(1)";
  color2.style.transform = "scale(1)";
  color3.style.transform = "scale(1)";
  color4.style.transform = "scale(1.2)";
  color5.style.transform = "scale(1)";
  color6.style.transform = "scale(1)";
  color7.style.transform = "scale(1)";
})

color5.addEventListener("click", function () {
  ballColor = "#86E3CE";
  color1.style.transform = "scale(1)";
  color2.style.transform = "scale(1)";
  color3.style.transform = "scale(1)";
  color4.style.transform = "scale(1)";
  color5.style.transform = "scale(1.2)";
  color6.style.transform = "scale(1)";
  color7.style.transform = "scale(1)";
})

color6.addEventListener("click", function () {
  ballColor = "#66A5D8";
  color1.style.transform = "scale(1)";
  color2.style.transform = "scale(1)";
  color3.style.transform = "scale(1)";
  color4.style.transform = "scale(1)";
  color5.style.transform = "scale(1)";
  color6.style.transform = "scale(1.2)";
  color7.style.transform = "scale(1)";
})

color7.addEventListener("click", function () {
  ballColor = "#CCABD8";
  color1.style.transform = "scale(1)";
  color2.style.transform = "scale(1)";
  color3.style.transform = "scale(1)";
  color4.style.transform = "scale(1)";
  color5.style.transform = "scale(1)";
  color6.style.transform = "scale(1)";
  color7.style.transform = "scale(1.2)";
})

reset.addEventListener("click", function() {
  balls.forEach(ball => {
    Composite.remove(iEngine.world, ball);
  });
  balls = [];
  isDrawing = false;
})

save.addEventListener("click", function() {
  document.getElementById('saveButton').style.visibility = 'hidden';
  // Get the colorMenu's boundaries
  const colorMenu = document.getElementById('colorMenu').getBoundingClientRect();
  const startX = 0;
  const startY = colorMenu.bottom + 10; // Start immediately below the colorMenu
  const captureHeight = window.innerHeight - startY;
  const captureWidth = window.innerWidth;
  // Use html2canvas with specific x, y, width, and height
  html2canvas(document.body, {
    x: startX,
    y: startY,
    width: captureWidth,
    height: captureHeight,
    windowWidth: document.documentElement.innerWidth,
    windowHeight: document.documentElement.innerHeight
  }).then(canvas => {
    // Create an image from the canvas
    var img = canvas.toDataURL("image/png");
    // Create a link to download the image
    var link = document.createElement('a');
    link.download = 'your-sand-art-bottle.png';
    link.href = img;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    document.getElementById('saveButton').style.visibility = 'visible';
  });

  setTimeout(function() {
      // Existing html2canvas call here
  }, 100); // Adjust delay as necessary
});

function handleOrientation(event) {
  //*****
  // // Get the rotation data from the event
  // // const alpha = event.alpha || 0; // rotation around z-axis
  // // const beta = event.beta || 0; // rotation around x-axis
  // // const gamma = event.gamma || 0; // rotation around y-axis

  // // // Use the rotation data as needed
  // // console.log("Alpha:", alpha, "Beta:", beta, "Gamma:", gamma);

  // const beta = event.beta || 0; // rotation around x-axis
  // const gamma = event.gamma || 0; // rotation around y-axis

  // // Map the rotation values to the gravity vector range (-1 to 1)
  // const mappedX = map(gamma, -90, 90, -0.7, 0.7);
  // const mappedY = map(beta, -90, 90, -0.7, 0.7);

  // // Set the gravity based on the mapped values
  // iEngine.world.gravity.x = mappedX;
  // iEngine.world.gravity.y = mappedY;
  //*****

  if (!permissionGranted) return;

  const beta = event.beta || 0; // rotation around x-axis
  const gamma = event.gamma || 0; // rotation around y-axis

  const mappedX = map(gamma, -90, 90, -0.7, 0.7);
  const mappedY = map(beta, -90, 90, -0.7, 0.7);

  iEngine.world.gravity.x = mappedX;
  iEngine.world.gravity.y = mappedY;
}

// Update the gravity based on the device orientation

// function update() {
//   Matter.Engine.update(iEngine, 1000 / 60);
//   requestAnimationFrame(update);
// }

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

// update();

// Set Up the Particles

let balls=[];
let isDrawing = false;
let ballColor = "#FA897B";

function drawShape(e) {
  if (!isDrawing) return; // Exit if not in drawing mode
  let posX = e.clientX;
  let posY = e.clientY;
  // Randomly decide the shape to draw
  const shapeType = getRandomShapeType(); // This will decide the shape type
  // Common options for all shapes
  let options = {
    friction: 0.9,
    restitution: 0,
    chamfer: { radius: 2 },
    render: { fillStyle: ballColor }
  };
  let shape;
  switch(shapeType) {
    case 'circle':
      shape = Bodies.circle(posX, posY, 6, options);
      break;
    case 'rectangle':
      shape = Bodies.rectangle(posX, posY, 12, 12, options);
      break;
    case 'triangle':
      shape = Bodies.polygon(posX, posY, 3, 8, options);
      break;
  }
  if (shape) {
    if (posY > 70 && posY < (window.innerHeight - 100)){
        Composite.add(iEngine.world, shape);
        balls.push(shape);
    }
  }
  // Keep shapes within the viewport
  cleanupShapes();
}

function getRandomShapeType() {
  const types = ['circle', 'rectangle', 'triangle']; // Extend with more shapes as needed
  const index = Math.floor(Math.random() * types.length);
  return types[index];
}

function cleanupShapes() {
  // balls = balls.filter(ball => {
  //   return ball.position.y < window.innerHeight && ball.position.y > 0 && ball.position.x < window.innerWidth && ball.position.x > 0;
  // });
  balls = balls.filter(ball => {
    const isWithinViewport =
      ball.position.y < window.innerHeight &&
      ball.position.y > 0 &&
      ball.position.x < window.innerWidth &&
      ball.position.x > 0;

    if (!isWithinViewport) {
      Composite.remove(iEngine.world, ball); // Remove from world
    }

    return isWithinViewport;
  });
}

function startDrawing(e){
  if (openPageDisplay == false){
    isDrawing = true;
    drawShape(e);
  }
}

function stopDrawing(){
  isDrawing = false;
}

let wallOpacity = 0;

function drawWalls1(){
  let verticesLeft1 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 20 , y : 20},
    {x : 10 , y : 20}
  ]
  let verticesLeft2 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 12 , y : 50},
    {x : 2 , y : 50}
  ]
  let verticesLeft3 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 7 , y : 50},
    {x : -3 , y : 50}
  ]
  let verticesLeft4 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : -10 , y : 110},
    {x : -20 , y : 110}
  ]
  let verticesLeft5 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : -20 , y : 60},
    {x : -30 , y : 60}
  ]
  let verticesLeft6 = [
    {x : 0 , y : 0},
    {x : 10 , y : 5},
    {x : -25 , y : 35},
    {x : -35 , y : 30}
  ]
  let verticesLeft7 = [
    {x : -10 , y : -15},
    {x : 8 , y : -2},
    {x : 5 , y : 17},
    {x : -15 , y : 25}
  ]
  let verticesLeft8 = [
    {x : 0 , y : 0},
    {x : 30 , y : -5},
    {x : 15 , y : 25},
    {x : -5 , y : 25}
  ]
    
  let verticesRight1 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 0 , y : 20},
    {x : -10 , y : 20}
  ]
  let verticesRight2 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 8 , y : 50},
    {x : -2 , y : 50}
  ]
  let verticesRight3 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 13 , y : 50},
    {x : 3 , y : 50}
  ]
  let verticesRight4 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 30 , y : 110},
    {x : 20 , y : 110}
  ]
  let verticesRight5 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 40 , y : 60},
    {x : 30 , y : 60}
  ]
  let verticesRight6 = [
    {x : 0 , y : 5},
    {x : 10 , y : 0},
    {x : 45 , y : 30},
    {x : 35 , y : 35}
  ]
  let verticesRight7 = [
    {x : -10 , y : -2},
    {x : 8 , y : -15},
    {x : 13 , y : 25},
    {x : -7 , y : 17}
  ]
  let verticesRight8 = [
    {x : 0 , y : -5},
    {x : 30 , y : 0},
    {x : 35 , y : 25},
    {x : 15 , y : 25}
  ]

  let bottomleft = [
    {x : 0 , y : 0},
    {x : 90 , y : 10},
    {x : 90 , y : 20},
    {x : 0 , y : 10}
  ]
  let bottomright = [
    {x : 0 , y : 10},
    {x : 90 , y : 0},
    {x : 90 , y : 10},
    {x : 0 , y : 20}
  ]
  
  let optionSideWall = {
    isStatic: true, 
    render: {fillStyle: '#060a19', strokeStyle: '#060a19', lineWidth: 1},
    friction: 0.8
  };
  const leftWall1 = Bodies.fromVertices(window.innerWidth/2-132, window.innerHeight-150, verticesLeft1, optionSideWall, true);
  const leftWall2 = Bodies.fromVertices(window.innerWidth/2-137, window.innerHeight-180, verticesLeft2, optionSideWall, true);
  const leftWall3 = Bodies.fromVertices(window.innerWidth/2-137, window.innerHeight-225, verticesLeft3, optionSideWall, true);
  const leftWall4 = Bodies.fromVertices(window.innerWidth/2-127, window.innerHeight-300, verticesLeft4, optionSideWall, true);
  const leftWall5 = Bodies.fromVertices(window.innerWidth/2-107, window.innerHeight-365, verticesLeft5, optionSideWall, true);
  const leftWall6 = Bodies.fromVertices(window.innerWidth/2-82, window.innerHeight-400, verticesLeft6, optionSideWall, true);
  const leftWall7 = Bodies.fromVertices(window.innerWidth/2-64, window.innerHeight-420, verticesLeft7, optionSideWall, true);
  const leftWall8 = Bodies.fromVertices(window.innerWidth/2-57, window.innerHeight-445, verticesLeft8, optionSideWall, true);
  const rightWall1 = Bodies.fromVertices(window.innerWidth/2+132, window.innerHeight-150, verticesRight1, optionSideWall, true);
  const rightWall2 = Bodies.fromVertices(window.innerWidth/2+137, window.innerHeight-180, verticesRight2, optionSideWall, true);
  const rightWall3 = Bodies.fromVertices(window.innerWidth/2+137, window.innerHeight-225, verticesRight3, optionSideWall, true);
  const rightWall4 = Bodies.fromVertices(window.innerWidth/2+127, window.innerHeight-300, verticesRight4, optionSideWall, true);
  const rightWall5 = Bodies.fromVertices(window.innerWidth/2+107, window.innerHeight-365, verticesRight5, optionSideWall, true);
  const rightWall6 = Bodies.fromVertices(window.innerWidth/2+82, window.innerHeight-400, verticesRight6, optionSideWall, true);
  const rightWall7 = Bodies.fromVertices(window.innerWidth/2+64, window.innerHeight-420, verticesRight7, optionSideWall, true);
  const rightWall8 = Bodies.fromVertices(window.innerWidth/2+57, window.innerHeight-445, verticesRight8, optionSideWall, true);

  const ground1 = Bodies.rectangle(window.innerWidth/2, window.innerHeight-133, 100, 10, { isStatic: true, friction: 0.8 });
  const ground2 = Bodies.fromVertices(window.innerWidth/2 - 90, window.innerHeight-138, bottomleft, { isStatic: true, friction: 0.8 }, true);
  const ground3 = Bodies.fromVertices(window.innerWidth/2 + 90, window.innerHeight-138, bottomright, { isStatic: true, friction: 0.8 }, true);
  
  leftWall1.render.opacity = wallOpacity;
  leftWall2.render.opacity = wallOpacity;
  leftWall3.render.opacity = wallOpacity;
  leftWall4.render.opacity = wallOpacity;
  leftWall5.render.opacity = wallOpacity;
  leftWall6.render.opacity = wallOpacity;
  leftWall7.render.opacity = wallOpacity;
  leftWall8.render.opacity = wallOpacity;
  rightWall1.render.opacity = wallOpacity;
  rightWall2.render.opacity = wallOpacity;
  rightWall3.render.opacity = wallOpacity;
  rightWall4.render.opacity = wallOpacity;
  rightWall5.render.opacity = wallOpacity;
  rightWall6.render.opacity = wallOpacity;
  rightWall7.render.opacity = wallOpacity;
  rightWall8.render.opacity = wallOpacity;

  ground1.render.opacity = wallOpacity;
  ground2.render.opacity = wallOpacity;
  ground3.render.opacity = wallOpacity;
  
  Composite.add(iEngine.world, [leftWall1, leftWall2, leftWall3, leftWall4, leftWall5, leftWall6, leftWall7, leftWall8, rightWall1, rightWall2, rightWall3, rightWall4, rightWall5, rightWall6, rightWall7, rightWall8, ground1, ground2, ground3]);
}

function drawWalls2(){
  let verticesLeft1 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 59 , y : 60},
    {x : 49 , y : 60}
  ]
  let verticesLeft2 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 40 , y : 50},
    {x : 30 , y : 50}
  ]
  let verticesLeft3 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 10 , y : 30},
    {x : 0 , y : 30}
  ]
  let verticesLeft4 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : -10 , y : 30},
    {x : -20 , y : 30}
  ]
  let verticesLeft5 = [
    {x : 0 , y : 0},
    {x : 10 , y : 5},
    {x : -45 , y : 55},
    {x : -55 , y : 50}
  ]
  let verticesLeft6 = [
    {x : 0 , y : 0},
    {x : 10 , y : 5},
    {x : -15 , y : 45},
    {x : -25 , y : 40}
  ]
  let verticesLeft7 = [
    {x : -10 , y : -15},
    {x : 8 , y : -7},
    {x : 12 , y : 60},
    {x : 0 , y : 65}
  ]
  let verticesLeft8 = [
    {x : 0 , y : 0},
    {x : 30 , y : -5},
    {x : 15 , y : 25},
    {x : -5 , y : 25}
  ]

  let verticesRight1 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : -39 , y : 60},
    {x : -49 , y : 60}
  ]
  let verticesRight2 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : -20 , y : 50},
    {x : -30 , y : 50}
  ]
  let verticesRight3 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 10 , y : 30},
    {x : 0 , y : 30}
  ]
  let verticesRight4 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 30 , y : 30},
    {x : 20 , y : 30}
  ]
  let verticesRight5 = [
    {x : 0 , y : 5},
    {x : 10 , y : 0},
    {x : 65 , y : 50},
    {x : 55 , y : 55}
  ]
  let verticesRight6 = [
    {x : 0 , y : 5},
    {x : 10 , y : 0},
    {x : 35 , y : 40},
    {x : 25 , y : 45}
  ]
  let verticesRight7 = [
    {x : -10 , y : -7},
    {x : 8 , y : -15},
    {x : -2 , y : 65},
    {x : -14 , y : 60}
  ]
  let verticesRight8 = [
    {x : 0 , y : -5},
    {x : 30 , y : 0},
    {x : 35 , y : 25},
    {x : 15 , y : 25}
  ]

  let bottomleft = [
    {x : 0 , y : 0},
    {x : 30 , y : 10},
    {x : 30 , y : 20},
    {x : 0 , y : 10}
  ]
  let bottomright = [
    {x : 0 , y : 10},
    {x : 30 , y : 0},
    {x : 30 , y : 10},
    {x : 0 , y : 20}
  ]

  let optionSideWall = {
    isStatic: true, 
    render: {fillStyle: '#060a19', strokeStyle: '#060a19', lineWidth: 1},
    friction: 0.8
  };
  const leftWall1 = Bodies.fromVertices(window.innerWidth/2-92, window.innerHeight-165, verticesLeft1, optionSideWall, true);
  const leftWall2 = Bodies.fromVertices(window.innerWidth/2-129, window.innerHeight-215, verticesLeft2, optionSideWall, true);
  const leftWall3 = Bodies.fromVertices(window.innerWidth/2-145, window.innerHeight-250, verticesLeft3, optionSideWall, true);
  const leftWall4 = Bodies.fromVertices(window.innerWidth/2-135, window.innerHeight-275, verticesLeft4, optionSideWall, true);
  const leftWall5 = Bodies.fromVertices(window.innerWidth/2-100, window.innerHeight-310, verticesLeft5, optionSideWall, true);
  const leftWall6 = Bodies.fromVertices(window.innerWidth/2-65, window.innerHeight-350, verticesLeft6, optionSideWall, true);
  const leftWall7 = Bodies.fromVertices(window.innerWidth/2-57, window.innerHeight-400, verticesLeft7, optionSideWall, true);
  const leftWall8 = Bodies.fromVertices(window.innerWidth/2-57, window.innerHeight-445, verticesLeft8, optionSideWall, true);
  const rightWall1 = Bodies.fromVertices(window.innerWidth/2+92, window.innerHeight-165, verticesRight1, optionSideWall, true);
  const rightWall2 = Bodies.fromVertices(window.innerWidth/2+129, window.innerHeight-215, verticesRight2, optionSideWall, true);
  const rightWall3 = Bodies.fromVertices(window.innerWidth/2+145, window.innerHeight-250, verticesRight3, optionSideWall, true);
  const rightWall4 = Bodies.fromVertices(window.innerWidth/2+135, window.innerHeight-275, verticesRight4, optionSideWall, true);
  const rightWall5 = Bodies.fromVertices(window.innerWidth/2+100, window.innerHeight-310, verticesRight5, optionSideWall, true);
  const rightWall6 = Bodies.fromVertices(window.innerWidth/2+65, window.innerHeight-350, verticesRight6, optionSideWall, true);
  const rightWall7 = Bodies.fromVertices(window.innerWidth/2+57, window.innerHeight-400, verticesRight7, optionSideWall, true);
  const rightWall8 = Bodies.fromVertices(window.innerWidth/2+57, window.innerHeight-445, verticesRight8, optionSideWall, true);

  const ground1 = Bodies.rectangle(window.innerWidth/2, window.innerHeight-130, 100, 10, { isStatic: true, friction: 0.8 });
  const ground2 = Bodies.fromVertices(window.innerWidth/2 - 60, window.innerHeight-133, bottomleft, { isStatic: true, friction: 0.8 }, true);
  const ground3 = Bodies.fromVertices(window.innerWidth/2 + 60, window.innerHeight-133, bottomright, { isStatic: true, friction: 0.8 }, true);

  leftWall1.render.opacity = wallOpacity;
  leftWall2.render.opacity = wallOpacity;
  leftWall3.render.opacity = wallOpacity;
  leftWall4.render.opacity = wallOpacity;
  leftWall5.render.opacity = wallOpacity;
  leftWall6.render.opacity = wallOpacity;
  leftWall7.render.opacity = wallOpacity;
  leftWall8.render.opacity = wallOpacity;
  rightWall1.render.opacity = wallOpacity;
  rightWall2.render.opacity = wallOpacity;
  rightWall3.render.opacity = wallOpacity;
  rightWall4.render.opacity = wallOpacity;
  rightWall5.render.opacity = wallOpacity;
  rightWall6.render.opacity = wallOpacity;
  rightWall7.render.opacity = wallOpacity;
  rightWall8.render.opacity = wallOpacity;

  ground1.render.opacity = wallOpacity;
  ground2.render.opacity = wallOpacity;
  ground3.render.opacity = wallOpacity;

  Composite.add(iEngine.world, [leftWall1, leftWall2, leftWall3, leftWall4, leftWall5, leftWall6, leftWall7, leftWall8, rightWall1, rightWall2, rightWall3, rightWall4, rightWall5, rightWall6, rightWall7, rightWall8, ground1, ground2, ground3]);
}

function drawWalls3(){
  let verticesLeft1 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 15 , y : 30},
    {x : 5 , y : 30}
  ]
  let verticesLeft2 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 35 , y : 30},
    {x : 25 , y : 30}
  ]
  let verticesLeft3 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 23 , y : 40},
    {x : 13 , y : 40}
  ]
  let verticesLeft4 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 10 , y : 80},
    {x : 0 , y : 80}
  ]
  let verticesLeft5 = [
    {x : 0 , y : 0},
    {x : 10 , y : 5},
    {x : -30 , y : 75},
    {x : -40 , y : 70}
  ]
  let verticesLeft6 = [
    {x : 0 , y : 0},
    {x : 10 , y : 5},
    {x : -35 , y : 45},
    {x : -45 , y : 40}
  ]
  let verticesLeft7 = [
    {x : 0 , y : 0},
    {x : 10 , y : 5},
    {x : -5 , y : 30},
    {x : -15 , y : 25}
  ]
  let verticesLeft8 = [
    {x : 0 , y : 0},
    {x : 15 , y : 0},
    {x : 15 , y : 35},
    {x : 5 , y : 35}
  ]
  let verticesLeft9 = [
    {x : 0 , y : 0},
    {x : 25 , y : -5},
    {x : 18 , y : 25},
    {x : 0 , y : 25}
  ]

  let verticesRight1 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 5 , y : 30},
    {x : -5 , y : 30}
  ]
  let verticesRight2 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : -15 , y : 30},
    {x : -25 , y : 30}
  ]
  let verticesRight3 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : -3 , y : 40},
    {x : -13 , y : 40}
  ]
  let verticesRight4 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 10 , y : 80},
    {x : 0 , y : 80}
  ]
  let verticesRight5 = [
    {x : 0 , y : 5},
    {x : 10 , y : 0},
    {x : 50 , y : 70},
    {x : 40 , y : 75}
  ]
  let verticesRight6 = [
    {x : 0 , y : 5},
    {x : 10 , y : 0},
    {x : 55 , y : 40},
    {x : 45 , y : 45}
  ]
  let verticesRight7 = [
    {x : 0 , y : 5},
    {x : 10 , y : 0},
    {x : 25 , y : 25},
    {x : 15 , y : 30}
  ]
  let verticesRight8 = [
    {x : 0 , y : 0},
    {x : 15 , y : 0},
    {x : 10 , y : 35},
    {x : 0 , y : 35}
  ]
  let verticesRight9 = [
    {x : 0 , y : -5},
    {x : 25 , y : 0},
    {x : 25 , y : 25},
    {x : 7 , y : 25}
  ]

  let bottomleft = [
    {x : 0 , y : 0},
    {x : 70 , y : 20},
    {x : 70 , y : 30},
    {x : 0 , y : 10}
  ]
  let bottomright = [
    {x : 0 , y : 20},
    {x : 70 , y : 0},
    {x : 70 , y : 10},
    {x : 0 , y : 30}
  ]

  let optionSideWall = {
    isStatic: true, 
    render: {fillStyle: '#060a19', strokeStyle: '#060a19', lineWidth: 1},
    friction: 0.8
  };
  const leftWall1 = Bodies.fromVertices(window.innerWidth/2-108, window.innerHeight-150, verticesLeft1, optionSideWall, true);
  const leftWall2 = Bodies.fromVertices(window.innerWidth/2-121, window.innerHeight-175, verticesLeft2, optionSideWall, true);
  const leftWall3 = Bodies.fromVertices(window.innerWidth/2-137, window.innerHeight-205, verticesLeft3, optionSideWall, true);
  const leftWall4 = Bodies.fromVertices(window.innerWidth/2-143, window.innerHeight-260, verticesLeft4, optionSideWall, true);
  const leftWall5 = Bodies.fromVertices(window.innerWidth/2-125, window.innerHeight-320, verticesLeft5, optionSideWall, true);
  const leftWall6 = Bodies.fromVertices(window.innerWidth/2-85, window.innerHeight-370, verticesLeft6, optionSideWall, true);
  const leftWall7 = Bodies.fromVertices(window.innerWidth/2-57, window.innerHeight-400, verticesLeft7, optionSideWall, true);
  const leftWall8 = Bodies.fromVertices(window.innerWidth/2-55, window.innerHeight-425, verticesLeft8, optionSideWall, true);
  const leftWall9 = Bodies.fromVertices(window.innerWidth/2-57, window.innerHeight-453, verticesLeft9, optionSideWall, true);
  const rightWall1 = Bodies.fromVertices(window.innerWidth/2+108, window.innerHeight-150, verticesRight1, optionSideWall, true);
  const rightWall2 = Bodies.fromVertices(window.innerWidth/2+121, window.innerHeight-175, verticesRight2, optionSideWall, true);
  const rightWall3 = Bodies.fromVertices(window.innerWidth/2+137, window.innerHeight-205, verticesRight3, optionSideWall, true);
  const rightWall4 = Bodies.fromVertices(window.innerWidth/2+143, window.innerHeight-260, verticesRight4, optionSideWall, true);
  const rightWall5 = Bodies.fromVertices(window.innerWidth/2+125, window.innerHeight-320, verticesRight5, optionSideWall, true);
  const rightWall6 = Bodies.fromVertices(window.innerWidth/2+85, window.innerHeight-370, verticesRight6, optionSideWall, true);
  const rightWall7 = Bodies.fromVertices(window.innerWidth/2+57, window.innerHeight-400, verticesRight7, optionSideWall, true);
  const rightWall8 = Bodies.fromVertices(window.innerWidth/2+55, window.innerHeight-425, verticesRight8, optionSideWall, true);
  const rightWall9 = Bodies.fromVertices(window.innerWidth/2+57, window.innerHeight-453, verticesRight9, optionSideWall, true);

  const ground1 = Bodies.rectangle(window.innerWidth/2, window.innerHeight-120, 100, 10, { isStatic: true, friction: 0.8 });
  const ground2 = Bodies.fromVertices(window.innerWidth/2 - 80, window.innerHeight-130, bottomleft, { isStatic: true, friction: 0.8 }, true);
  const ground3 = Bodies.fromVertices(window.innerWidth/2 + 80, window.innerHeight-130, bottomright, { isStatic: true, friction: 0.8 }, true);

  leftWall1.render.opacity = wallOpacity;
  leftWall2.render.opacity = wallOpacity;
  leftWall3.render.opacity = wallOpacity;
  leftWall4.render.opacity = wallOpacity;
  leftWall5.render.opacity = wallOpacity;
  leftWall6.render.opacity = wallOpacity;
  leftWall7.render.opacity = wallOpacity;
  leftWall8.render.opacity = wallOpacity;
  leftWall9.render.opacity = wallOpacity;
  rightWall1.render.opacity = wallOpacity;
  rightWall2.render.opacity = wallOpacity;
  rightWall3.render.opacity = wallOpacity;
  rightWall4.render.opacity = wallOpacity;
  rightWall5.render.opacity = wallOpacity;
  rightWall6.render.opacity = wallOpacity;
  rightWall7.render.opacity = wallOpacity;
  rightWall8.render.opacity = wallOpacity;
  rightWall9.render.opacity = wallOpacity;

  ground1.render.opacity = wallOpacity;
  ground2.render.opacity = wallOpacity;
  ground3.render.opacity = wallOpacity;

  Composite.add(iEngine.world, [leftWall1, leftWall2, leftWall3, leftWall4, leftWall5, leftWall6, leftWall7, leftWall8, leftWall9, rightWall1, rightWall2, rightWall3, rightWall4, rightWall5, rightWall6, rightWall7, rightWall8, rightWall9, ground1, ground2, ground3]);
}

function drawWalls4(){
  let verticesLeft1 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 35 , y : 40},
    {x : 25 , y : 40}
  ]
  let verticesLeft2 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 5 , y : 210},
    {x : -5 , y : 210}
  ]
  let verticesLeft3 = [
    {x : 0 , y : 0},
    {x : 10 , y : 5},
    {x : -20 , y : 45},
    {x : -30 , y : 40}
  ]
  let verticesLeft4 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 10 , y : 40},
    {x : 0 , y : 40}
  ]
  let verticesLeft5 = [
    {x : 0 , y : 0},
    {x : 40 , y : -10},
    {x : 20 , y : 35},
    {x : 10 , y : 35}
  ]

  let verticesRight1 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : -15 , y : 40},
    {x : -25 , y : 40}
  ]
  let verticesRight2 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 15 , y : 210},
    {x : 5 , y : 210}
  ]
  let verticesRight3 = [
    {x : 0 , y : 5},
    {x : 10 , y : 0},
    {x : 40 , y : 40},
    {x : 30 , y : 45}
  ]
  let verticesRight4 = [
    {x : 0 , y : 0},
    {x : 10 , y : 0},
    {x : 10 , y : 40},
    {x : 0 , y : 40}
  ]
  let verticesRight5 = [
    {x : 0 , y : -10},
    {x : 40 , y : 0},
    {x : 30 , y : 35},
    {x : 20 , y : 35}
  ]

  let bottomleft = [
    {x : 0 , y : 0},
    {x : 70 , y : 7},
    {x : 70 , y : 17},
    {x : 0 , y : 10}
  ]
  let bottomright = [
    {x : 0 , y : 7},
    {x : 70 , y : 0},
    {x : 70 , y : 10},
    {x : 0 , y : 17}
  ]

  let optionSideWall = {
    isStatic: true, 
    render: {fillStyle: '#060a19', strokeStyle: '#060a19', lineWidth: 1},
    friction: 0.8
  };
  const leftWall1 = Bodies.fromVertices(window.innerWidth/2-122, window.innerHeight-145, verticesLeft1, optionSideWall, true);
  const leftWall2 = Bodies.fromVertices(window.innerWidth/2-130, window.innerHeight-265, verticesLeft2, optionSideWall, true);
  const leftWall3 = Bodies.fromVertices(window.innerWidth/2-113, window.innerHeight-385, verticesLeft3, optionSideWall, true);
  const leftWall4 = Bodies.fromVertices(window.innerWidth/2-97, window.innerHeight-420, verticesLeft4, optionSideWall, true);
  const leftWall5 = Bodies.fromVertices(window.innerWidth/2-93, window.innerHeight-455, verticesLeft5, optionSideWall, true);
  const rightWall1 = Bodies.fromVertices(window.innerWidth/2+122, window.innerHeight-145, verticesRight1, optionSideWall, true);
  const rightWall2 = Bodies.fromVertices(window.innerWidth/2+130, window.innerHeight-265, verticesRight2, optionSideWall, true);
  const rightWall3 = Bodies.fromVertices(window.innerWidth/2+113, window.innerHeight-385, verticesRight3, optionSideWall, true);
  const rightWall4 = Bodies.fromVertices(window.innerWidth/2+97, window.innerHeight-420, verticesRight4, optionSideWall, true);
  const rightWall5 = Bodies.fromVertices(window.innerWidth/2+93, window.innerHeight-455, verticesRight5, optionSideWall, true);

  const ground1 = Bodies.rectangle(window.innerWidth/2, window.innerHeight-123, 100, 10, { isStatic: true, friction: 0.8 });
  const ground2 = Bodies.fromVertices(window.innerWidth/2 - 80, window.innerHeight-126, bottomleft, { isStatic: true, friction: 0.8 }, true);
  const ground3 = Bodies.fromVertices(window.innerWidth/2 + 80, window.innerHeight-126, bottomright, { isStatic: true, friction: 0.8 }, true);

  leftWall1.render.opacity = wallOpacity;
  leftWall2.render.opacity = wallOpacity;
  leftWall3.render.opacity = wallOpacity;
  leftWall4.render.opacity = wallOpacity;
  leftWall5.render.opacity = wallOpacity;
  rightWall1.render.opacity = wallOpacity;
  rightWall2.render.opacity = wallOpacity;
  rightWall3.render.opacity = wallOpacity;
  rightWall4.render.opacity = wallOpacity;
  rightWall5.render.opacity = wallOpacity;

  ground1.render.opacity = wallOpacity;
  ground2.render.opacity = wallOpacity;
  ground3.render.opacity = wallOpacity;

  Composite.add(iEngine.world, [leftWall1, leftWall2, leftWall3, leftWall4, leftWall5, rightWall1, rightWall2, rightWall3, rightWall4, rightWall5, ground1, ground2, ground3]);
}

Render.run(iRender);
Runner.run(iRunner, iEngine);
document.addEventListener('pointerdown', startDrawing);
document.addEventListener('pointermove', drawShape);
document.addEventListener('pointerup', stopDrawing);