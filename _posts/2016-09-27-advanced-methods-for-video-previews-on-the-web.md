---
layout: post
title:  Advanced Methods for Video Previews on the Web
date:   2016-09-27
categories: coding
sharing: true
---

[ffmpeg](https://ffmpeg.org/)

[documentation](https://ffmpeg.org/ffmpeg-all.html)

[Big Buck Bunny](https://peach.blender.org/)



## Showing 4 seconds of the original video

~~~ bash
ffmpeg -i video.mp4 \
       -vf "trim='start=4\:31:duration=4',scale=320:-1,setpts=PTS-STARTPTS" -t 4 -sws_flags gauss \
       -vcodec libx264 -preset medium -crf 31  \
       -an -y preview.mp4
~~~

<video width="320" height="180" autoplay controls preload="auto" loop>
    <source src="https://manu.ninja/files/big_buck_bunny_720p_h264_preview.mp4" type="video/mp4">
</video>

<p data-height="340" data-theme-id="light" data-slug-hash="RGABNa" data-default-tab="result" data-user="Lorti" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/Lorti/pen/RGABNa/">Video Thumbnails</a> by Manuel Wieser (<a href="http://codepen.io/Lorti">@Lorti</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

~~~ html
<a href="https://manu.ninja/">
    <img width="320" height="180" src="preview.jpg">
    <video width="320" height="180" preload="auto" loop="loop">
        <source src="preview.mp4" type="video/mp4">
    </video>
</a>
~~~

~~~ js
const videos = document.querySelectorAll('video');
[].forEach.call(videos, vid => {
    vid.addEventListener('mouseenter', () => vid.play());
    vid.addEventListener('mouseout', () => vid.pause());
});
~~~



## Showing 4 frames of the original video

~~~ bash
ffmpeg -i video.mp4 \
        -vf "select=gt(scene\,0.75),scale=320:-1,tile=4x1" -vframes 1 slides.png \
&& convert slides.png -quality 75% slides.jpg \
&& rm slides.png
~~~

![](https://manu.ninja/files/big_buck_bunny_720p_h264_slides.jpg)

<p data-height="240" data-theme-id="light" data-slug-hash="bwqmVo" data-default-tab="result" data-user="Lorti" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/Lorti/pen/bwqmVo/">Video Thumbnails II</a> by Manuel Wieser (<a href="http://codepen.io/Lorti">@Lorti</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

~~~ html
<a href="https://manu.ninja/">
    <img class="thumbnail" width="320" height="180" src="preview.jpg">
    <img class="slides" width="1280" height="180" src="slides.jpg">
</a>
~~~

~~~ css
a {
  float: left;
  position: relative;
  overflow: hidden;
}
a:hover .slides {
  display: block;
  animation: slides 5s steps(5) infinite;
}
.slides {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
}
@keyframes slides {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-320px * 5);
  }
}
~~~