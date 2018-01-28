import {Pixel, PixelArea} from "./Pixel";
import {PixelBuffer} from "./PixelBuffer";
import {Shape} from "./shape/Shape";

export enum Color {
    Black = 0,
    White = 1
}

export const Colors = [Color.Black, Color.White];

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

    public draw_pixels(pixels: IterableIterator<Pixel>, color: Color = Color.White) {
        for (const pixel of pixels) {
            this.dirty_area.extend(pixel);
            this.pixel_colors.set_color(pixel, color);
        }
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

    public draw_shape(shape: Shape): Promise<void> {
        return shape.draw(this);
    }

    private dirty_area: PixelArea;
    private pixel_colors: PixelBuffer;

}