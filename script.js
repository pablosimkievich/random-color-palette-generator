function generateColors() {
    // Clear existing color bars
    document.getElementById('colorBars').innerHTML = '';

    // Generate a random color
    let baseColor = getRandomColor();

    for (let i = 0; i < 7; i++) {
        // Calculate the shade based on the index
        let shade = calculateShade(baseColor, i);

        // Create a color bar element
        let colorBar = document.createElement('div');
        colorBar.style.backgroundColor = shade;
        colorBar.style.flex = '1';

        // Append the color bar to the container
        document.getElementById('colorBars').appendChild(colorBar);
        
        colorBar.innerHTML = colorBar.style.backgroundColor
        let colorsArray = []
        colorsArray.push(colorBar.style.backgroundColor)
        // console.log(colorsArray)

        
    }
}

function calculateShade(baseColor, index) {
    // Calculate the shade based on the index
    let percentage = (index + 1) * 10;

    // Convert the base color to HSL
    let baseColorHSL = rgbToHsl(hexToRgb(baseColor));

    // Adjust the lightness to create shades within the range of 20% to 80%
    let adjustedLightness = Math.max(0.2, Math.min(0.8, baseColorHSL[2] - (percentage / 100)));

    // Convert back to RGB
    let shadedColorRGB = hslToRgb(baseColorHSL[0], baseColorHSL[1], adjustedLightness);

    // Convert RGB to hex
    return rgbToHex(shadedColorRGB);
}

function hslToHex(h, s, l) {
    // Convert HSL to hex
    let rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb);
}


function getRandomColor() {
    // Generate a random hex color code with a lightness between 60% and 80%
    let randomLightness = Math.random() * 10 + 85;
    return hslToHex(Math.random(), Math.random(), randomLightness / 100);
}


function hexToRgb(hex) {
    // Convert hex to RGB
    let bigint = parseInt(hex.substring(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r, g, b];
}

function rgbToHex(rgb) {
    // Convert RGB to hex
    return '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

function rgbToHsl(rgb) {
    // Convert RGB to HSL
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h, s, l];
}

function hslToRgb(h, s, l) {
    // Convert HSL to RGB
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

