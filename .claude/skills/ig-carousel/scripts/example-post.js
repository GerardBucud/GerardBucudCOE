// Post content for "Steal my DJI Osmo Nano settings". ref(name) maps a photo file name to an image reference.
const PHOTOS = [
  ["fc021e49-graded.jpg", "Red, hand from top (your cover grade)"],
  ["74a7b335.png", "Your finished cover"],
  ["7a7713e7.jpg", "Flat lay, screen on (wide)"],
  ["246a69fd.jpg", "Desk flat lay, light bar (wide)"],
  ["3fd740b0.jpg", "Desk flat lay, drone (wide)"],
  ["8c17337b.jpg", "Detail, OSMO on screen"],
  ["1e36b36d.jpg", "Orange spot, black-and-white hand"],
  ["0c19eee1.jpg", "Blue spot"],
  ["82662358.jpg", "Orange spot, hand from left"],
  ["f59142c5.jpg", "Red spot, hand from below"],
  ["bac21051.jpg", "Orange spot, red-lit hand"],
  ["c85d17bd.jpg", "Muted spot, hand"],
  ["209e72e9.jpg", "Red, hand from left (wide)"],
  ["5a082833.jpg", "Red, hand from left 2 (wide)"],
  ["91f4face.jpg", "Red spot, side view (wide)"],
  ["fc021e49.jpg", "Red, hand from top (raw)"],
  ["09341680.png", "Your cover, big title version"],
];
const SIZES = {"09341680.png":[1800,2700],"0c19eee1.jpg":[1717,2576],"1e36b36d.jpg":[1717,2576],"209e72e9.jpg":[2527,1684],"246a69fd.jpg":[2576,1717],"3fd740b0.jpg":[2576,1717],"5a082833.jpg":[2576,1717],"74a7b335.png":[1800,2700],"7a7713e7.jpg":[2576,1717],"82662358.jpg":[1717,2576],"8c17337b.jpg":[1717,2576],"91f4face.jpg":[2576,1717],"bac21051.jpg":[1717,2576],"c85d17bd.jpg":[1717,2576],"f59142c5.jpg":[1717,2576],"fc021e49-graded.jpg":[1717,2576],"fc021e49.jpg":[1717,2576]};
function build(ref) {
  const img = (name, extra = {}) => ({ ...ref(name), fx: 0.5, fy: 0.5, zoom: 1, ...extra });
  const meta = {
    title: "Steal my DJI Osmo Nano settings", series: "STEAL MY SETTINGS", subject: "DJI OSMO NANO", handle: "@GAB.WONDERS",
    order: ["s01", "s02", "s03", "s04", "s05", "s06"], overall: "",
    library: PHOTOS.map(([f, name]) => ({ ...ref(f), name, w: SIZES[f][0], h: SIZES[f][1] })),
  };
  const slides = {
    s01: { type: "cover", img: img("fc021e49-graded.jpg"), layout: {}, status: "review", comment: "",
      text: { left: "STEAL", right: "MY", title: "DJI OSMO NANO", sub: "SETTINGS", section: "CAMERA SETUP", foot: "SWIPE FOR MORE" } },
    s02: { type: "specs", img: img("7a7713e7.jpg"), layout: {}, status: "review", comment: "",
      text: { section: "VIDEO FORMAT", foot: "SAVE FOR LATER", rows: [
        { label: "RESOLUTION", value: "4K", note: "MAX DETAIL + ROOM TO CROP" },
        { label: "FRAME RATE", value: "23.976", note: "THE CINEMATIC 24P LOOK. SMOOTH, NATURAL MOTION" },
        { label: "ASPECT RATIO", value: "16:9", note: "MY DEFAULT FOR MOST SHOOTS" }],
        tipK: "SHOOTING FOR BOTH?", tip: "SWITCH TO 4:3. THE TALLER FRAME LETS YOU CROP PORTRAIT + LANDSCAPE FROM ONE CLIP" } },
    s03: { type: "specs", img: img("1e36b36d.jpg"), layout: {}, status: "review", comment: "",
      text: { section: "COLOR PROFILE", foot: "SAVE FOR LATER", rows: [
        { label: "MODE", value: "PRO", note: "MANUAL CONTROL OVER SHUTTER, ISO + WHITE BALANCE" },
        { label: "COLOR", value: "D-LOG M", note: "FLAT ON PURPOSE. KEEPS MORE HIGHLIGHT + SHADOW DETAIL FOR YOUR GRADE" }],
        tipK: "HEADS UP", tip: "LOG LOOKS GREY OUT OF CAMERA. THAT’S NORMAL. GRADE IT OR ADD A LUT IN POST" } },
    s04: { type: "specs", img: img("246a69fd.jpg"), layout: {}, status: "review", comment: "",
      text: { section: "EXPOSURE", foot: "SAVE FOR LATER", rows: [
        { label: "SHUTTER", value: "1/50", note: "THE 180° RULE: DOUBLE YOUR FRAME RATE FOR NATURAL MOTION BLUR" },
        { label: "EV · NORMAL DAY", value: "−0.3", note: "A TOUCH UNDER TO KEEP YOUR HIGHLIGHTS SAFE" },
        { label: "EV · PEAK SUN", value: "−1.0", note: "HARSH MIDDAY SUN. YOU CAN LIFT SHADOWS, BUT BLOWN HIGHLIGHTS ARE GONE" }],
        tipK: "PRO TIP", tip: "AN ND FILTER LETS YOU HOLD 1/50 IN BRIGHT LIGHT WITHOUT BLOWING OUT YOUR SHOT" } },
    s05: { type: "beforeafter", img: null, img2: null, layout: {}, status: "review", comment: "",
      text: { aValue: "BEFORE", aLabel: "D-LOG M", aNote: "STRAIGHT OUT OF CAMERA. FLAT ON PURPOSE", bValue: "AFTER", bLabel: "GRADED", bNote: "THE SAME CLIP AFTER THE COLOR GRADE", section: "BEFORE / AFTER", foot: "SAVE FOR LATER" } },
    s06: { type: "save", img: img("fc021e49-graded.jpg"), layout: {}, status: "review", comment: "",
      text: { left: "DON’T LOSE", right: "THESE", big: "**SAVE** FOR **LATER**", sub: "FOLLOW **{handle}**", section: "CAMERA SETUP", foot: "SEND TO A FRIEND" } },
  };
  return { meta, slides };
}
module.exports = { build, PHOTOS, SIZES };
