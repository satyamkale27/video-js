import videojs from "video.js";
const Button = videojs.getComponent("Button");

class QualitySelectorButton extends Button {
  constructor(player, options) {
    super(player, options);
    this.controlText("Quality");
    this.addClass("vjs-quality-selector-button");
  }

  handleClick() {
    // Toggle quality menu visibility
    const qualityMenu = document.getElementById("quality-menu");
    if (qualityMenu) {
      qualityMenu.style.display =
        qualityMenu.style.display === "block" ? "none" : "block";
    }
  }
}
videojs.registerComponent("QualitySelectorButton", QualitySelectorButton);

export default QualitySelectorButton;
