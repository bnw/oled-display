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

    public flush(): Promise<void> {
        if (!this.dirty_area.empty()) {
            const actually_dirty_area = this.dirty_area;
            this.dirty_area = new PixelArea(); // clear dirty area
            return this.config.canvas.draw_pixels(this.pixel_colors, actually_dirty_area);
        } else {
            return new Promise<void>(resolve => resolve());
        }
    }

    private dirty_area: PixelArea;
    private pixel_colors: PixelBuffer;

}