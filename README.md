# FaceMesh_Javascript

## This is a function that take in the streaming camera from HTML tag and return a json format including:

<ul>
  <li>The Face Shape</li>
  <li>8 distances on the face:
    <ul>
      <li>Temple distance</li>
      <li>PD distance</li>
      <li>Inner eyetail distance</li>
      <li>Outer eyetail distance</li>
      <li>Forehead distance</li>
      <li>Cheekbone distance</li>
      <li>Facelength distance</li>
      <li>Jawline distance</li>
    </ul>
  </li>
</ul>

## If the function dont recognize any face, it wont return anything.
## Demo:
If you want to run the demo, you can run the index.html file without installing anything else. Make sure your camera device is available.

If you want to run file locally without internet, try to download the cdn file to your folder and change the part to local.

## Run it by your own code:
Chane the video ID in file main.js line 89:

const video = document.querySelector(your video tag ID here);
