import {Color} from "../Display";
import {Pixel} from "../Pixel";


export interface PixelAcceptor {
    draw_pixels(pixels: Pixel[], color: Color);
}

export interface Shape {
    draw(display: PixelAcceptor): Promise<void>;
}
