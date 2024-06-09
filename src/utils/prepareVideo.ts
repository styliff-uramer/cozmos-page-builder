const prepareVideo = (url: string): HTMLVideoElement => {
  const video = document.createElement("video");
  video.src = url;
  video.loop = true;
  video.muted = true;
  video.crossOrigin = "anonymous";
  video.play();
  return video;
};

export default prepareVideo;
