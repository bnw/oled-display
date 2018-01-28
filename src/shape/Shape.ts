import {Color} from "../Display";
import {Pixel} from "../Pixel";


export interface PixelAcceptor {
    draw_pixels(pixels: IterableIterator<Pixel>, color: Color);
}

export interface Shape {
    draw(display: PixelAcceptor): Promise<void>;
}
