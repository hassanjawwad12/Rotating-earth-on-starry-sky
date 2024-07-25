import * as THREE from "three";

//This defines a Three.js point cloud representing a starfield
export default function getStarfield({ numStars = 500 } = {}) {
  
//This generates a random position within a sphere centered at the origin.
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

//returns an object containing the generated position as a THREE.Vector3 and hue and minDist

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6,
      minDist: radius,
    };
  }

  const verts = [];
  const colors = [];
  const positions = [];
  let col;
  //This loop iterates the desired number of stars (specified by numStars).
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint(); //generate a random position for each star.
    const { pos, hue } = p; //extracts the position (pos) and hue from the returned object.
    positions.push(p);
    //creates a random color using THREE.Color with a slight variation in hue and brightness based on the returned hue value.
    col = new THREE.Color().setHSL(hue, 0.2, Math.random());  
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
    //adds the star's position coordinates (x, y, z) to the verts array and the color components (r, g, b) to the colors array.
  }

  //hold star pos and color 
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load(
      "./textures/stars/circle.png"
    ),
  });
  const points = new THREE.Points(geo, mat);
  return points;
}
