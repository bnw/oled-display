import {Canvas} from "./Display";
import {PixelBuffer} from "./PixelBuffer";
import {PixelArea} from "./Pixel";

export class OledLibCanvas implements Canvas {

    constructor(readonly oled: any) {
        this.oled.fillRect(0, 0, this.oled.WIDTH, this.oled.HEIGHT, 0);
    }

    draw_pixels(pixel_colors: PixelBuffer, dirty_area: PixelArea): Promise<void> {
        return new Promise<void>(resolve => {
            let pixels = [];
            for (let pixel of dirty_area.pixels()) {
                pixels.push([pixel.x, pixel.y, pixel_colors.get_color(pixel)]);
            }
            this.oled.drawPixel(pixels);
            resolve();
        });
    }

}