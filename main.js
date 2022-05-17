// Distance 2 điểm Oxyz
function distance(a,b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2))
}
  
// Function xác định faceshape
function face_shape(a,b,c,d) {
    if (c > b > a) {
        return 'Triangle'
    }
    else if (a > b) {
        return 'Heart'
    }
    else if (Math.abs(a-b) <= 20 && Math.abs(b-c) <= 20 && d > a && d > b && d > c) {
        return 'Oblong'
    }
    else if (Math.abs(b-d) <= 20 && b > a && b > c) {
        return 'Round'
    }
    else if (d > b > a > c) {
        return 'Diamond'
    }
    else if (d > b && a > c) {
        return 'Oval'
    }
    else {
        return "Undifined"
    }
}


// main
function main(results) {
    if (results.multiFaceLandmarks.length > 0) {
        let lst = results.multiFaceLandmarks[0]
        let left_radius = distance(lst[473], lst[474])
        let ratio = 5.5/ left_radius
        
        // các giá trị tính kính
        let temple_distance_mm = distance(lst[46], lst[276]) * ratio
        let pd_distance_mm = distance(lst[468], lst[473]) * ratio
        let inner_eyetail_distance_mm = distance(lst[243], lst[463]) * ratio
        let outer_eyetail_distance_mm = distance(lst[130], lst[359]) * ratio

        // các giá trị tính face_shape
        let forehead_distance = distance(lst[70], lst[300])
        let cheekbone_distance = distance(lst[111], lst[340])
        let facelength_distance = distance(lst[152], lst[10]) * 0.87
        let jawline_distance = (distance(lst[172], lst[136]) + distance(lst[136], lst[150]) 
        + distance(lst[150], lst[149]) + distance(lst[149], lst[176]) + distance(lst[176], lst[148])
        + distance(lst[148], lst[152]) + distance(lst[152], lst[377]) + distance(lst[377], lst[400])
        + distance(lst[400], lst[378]) + distance(lst[378], lst[379]) + distance(lst[379], lst[365])
        + distance(lst[365], lst[397]))
        
        // faceshape
        let shape = face_shape(forehead_distance, cheekbone_distance, jawline_distance, facelength_distance)

        // console ra giá trị
        let json_return = {
            "face_shape": shape,
            "distance": {
                "temple": temple_distance_mm,
                "pd": pd_distance_mm,
                "inner_eyetail": inner_eyetail_distance_mm,
                "outer_eyetail": outer_eyetail_distance_mm,
                "forehead": forehead_distance,
                "cheekbone": cheekbone_distance,
                "face_length": facelength_distance,
                "jawline": jawline_distance
            }
        }
        return json_return
    }
}


const faceMesh = new FaceMesh({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
}});
faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

faceMesh.onResults(main);

const video = document.querySelector("#videoElement");
const camera = new Camera(video, {
    onFrame: async () => {
    await faceMesh.send({image: video});
    }
});
camera.start();