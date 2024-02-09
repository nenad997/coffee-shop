module.exports = {
  "react-native-svgs-to-icon": {
    output: "./src/components", // icon components output destination
    input: "./svgs", // svgs folder input destination
    fontOutput: "./fontOutput", // font output destination could put this folder into .gitingore
    fontName: "MyFont", // font name
    fontOutputCopyTo: "./src/assets/fonts", // copy font to assets/fonts
  },
  assets: ["./src/assets/fonts"],
};
