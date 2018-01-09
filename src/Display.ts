import {Pixel, PixelArea} from "./Pixel";
import {PixelBuffer} from "./PixelBuffer";

export enum Color {
    Black = 0,
    White = 1
}

export interface Canvas {
    draw_pixels(pixel_colors: PixelBuffer, dirty_area: PixelArea): Promise<void>;
}

export interface DisplayConfiguration {
    readonly width: number;
    readonly height: number;
    readonly canvas: Canvas;
}

export class Display {

    constructor(private readonly config: DisplayConfiguration) {
        this.dirty_area = new PixelArea();
        this.pixel_colors = new PixelBuffer(config);
    }

    public draw_pixels(pixels: Pixel[], color: Color = Color.White) {
        pixels.forEach(pixel => {
            this.dirty_area.extend(pixel);
            this.pixel_colors.set_color(pixel, color);
        });
        return this;
    }

    public flush() {
        if (!this.dirty_area.empty()) {
            this.config.canvas.draw_pixels(this.pixel_colors, this.dirty_area);
        }
    }

    private dirty_area: PixelArea;
    private pixel_colors: PixelBuffer;

}