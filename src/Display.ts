import {Pixel, PixelArea} from "./Pixel";
import {BitBuffer} from 'bitbuffer';
import * as assert from "assert";

export enum Color {
    Black = 0,
    White = 1
}

export interface Canvas {
    draw_pixels(pixel_colors: BitBuffer, dirty_area: PixelArea): Promise<void>;
}

export interface DisplayConfiguration {
    readonly width: number;
    readonly height: number;
    readonly canvas: Canvas;
}

export class Display {

    constructor(private readonly config: DisplayConfiguration) {
        const num_bits = config.width * config.height;
        this.pixel_colors = new BitBuffer(num_bits);
        this.dirty_area = new PixelArea();
    }

    public draw_pixels(pixels: Pixel[], color: Color = Color.White) {
        pixels.forEach(pixel => {
            this.dirty_area.extend(pixel);
            this.pixel_colors.set(this.get_index(pixel), color);
        });
        return this;
    }

    public flush() {
        if (!this.dirty_area.empty()) {
            this.config.canvas.draw_pixels(this.pixel_colors, this.dirty_area);
        }
    }

    private get_index(pixel: Pixel) {
        assert(pixel.x < this.config.width);
        assert(pixel.y < this.config.height);
        return pixel.x + this.config.width * pixel.y;
    }

    private pixel_colors: BitBuffer;
    private dirty_area: PixelArea;

}