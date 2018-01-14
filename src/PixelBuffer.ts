import {Pixel, PixelArea} from "./Pixel";
import {Color} from "./Display";
import * as assert from "assert";
import {BitBuffer} from 'bitbuffer';

export interface PixelBufferConfiguration {
    readonly width: number;
    readonly height: number;
}

export class PixelBuffer {
    constructor(private readonly config: PixelBufferConfiguration) {
        const num_bits = config.width * config.height;
        this.pixel_colors = new BitBuffer(num_bits);
    }

    get_color(pixel: Pixel): Color {
        if (this.pixel_colors.get(this.get_index(pixel))) {
            return Color.White;
        } else {
            return Color.Black;
        }
    }

    set_color(pixel: Pixel, color: Color) {
        this.pixel_colors.set(this.get_index(pixel), color);
    }

    private get_index(pixel: Pixel) {
        assert(pixel.x < this.config.width, "Pixel " + pixel.to_string() + " is out of range");
        assert(pixel.y < this.config.height, "Pixel " + pixel.to_string() + " is out of range");
        return pixel.x + this.config.width * pixel.y;
    }

    private pixel_colors: BitBuffer;

}