import {Canvas, Color} from "./Display";
import {PixelBuffer} from "./PixelBuffer";
import {PixelArea} from "./Pixel";
import Jimp = require("jimp");

export interface ImageFileCanvasConfig {
    readonly width: number;
    readonly height: number;
    readonly filename?: string;
}

export class ImageFileCanvas implements Canvas {

    constructor(private readonly config: ImageFileCanvasConfig) {
        this.image = new Jimp(config.width, config.height, ImageFileCanvas.get_Jimp_color(Color.Black));
    }

    draw_pixels(pixel_colors: PixelBuffer, dirty_area: PixelArea): Promise<void> {
        return new Promise(resolve => {
            for (const pixel of dirty_area.pixels()) {
                this.image.setPixelColor(ImageFileCanvas.get_Jimp_color(pixel_colors.get_color(pixel)), pixel.x, pixel.y);
            }
            this.image.write(this.get_filename(), function (err) {
                if (err) throw err;
                resolve();
            });
        });
    }

    private static get_Jimp_color(color: Color) {
        switch (color) {
            case Color.White:
                return 0xFFFFFFFF;
            case Color.Black:
                return 0x000000FF;
            default:
                throw "Unknown color";
        }
    }

    private get_filename(){
        if('filename' in this.config){
            return this.config.filename
        }else{
            return 'canvas.png';
        }
    }

    private readonly image: Jimp.Jimp;
}