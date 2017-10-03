import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "brand-logo": {
        "fontFamily": "\"Pacifico\", cursive"
    },
    "hero": {
        "width": "auto",
        "height": 45,
        "backgroundImage": "url(\"./images/cat.jpeg\")",
        "backgroundRepeat": "no-repeat",
        "backgroundSize": "cover",
        "backgroundPosition": "center"
    },
    "html": {
        "height": "100%"
    },
    "body": {
        "background": "#bdbdbd"
    },
    "join": {
        "fontFamily": "\"Permanent Marker\", cursive"
    }
});