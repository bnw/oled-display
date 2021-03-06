import {PixelAcceptor, Shape} from "./Shape";
import * as assert from "assert";
import {Pixel, PixelInterface} from "../Pixel";
import font = require('oled-font-5x7');
import {Color, other_color} from "../Display";

export class Letter implements Shape {

    constructor(
        private readonly letter: string,
        private readonly position: PixelInterface = new Pixel(0, 0),
        private readonly color: Color = Color.White
    ) {
        assert(letter.length == 1);
    }

    draw(display: PixelAcceptor): Promise<void> {
        return new Promise<void>(resolve => {
            const letter_bytes = this.get_letter_bytes();
            for (let pixel_column = 0; pixel_column < Letter.letter_width(); pixel_column++) {
                const column_byte = letter_bytes[pixel_column];
                for (let pixel_row = 0; pixel_row < Letter.letter_height(); pixel_row++) {
                    const pixel_value = (column_byte & Math.pow(2, pixel_row)) != 0;
                    const pixel_to_update = new Pixel(pixel_column + this.position.x, pixel_row + this.position.y);
                    if (pixel_value) {
                        display.draw_pixels([pixel_to_update], this.color);
                    } else {
                        display.draw_pixels([pixel_to_update], other_color(this.color));
                    }
                }
            }
            resolve();
        });
    }

    public static letter_width() {
        return font.width;
    }

    public static letter_height() {
        return font.height;
    }

    private get_letter_bytes(): number[] {
        let index_of_letter = font.lookup.indexOf(this.letter);
        if (index_of_letter == -1) {
            index_of_letter = font.lookup.indexOf('?');
        }
        assert(index_of_letter != -1);
        return font.fontData.slice(
            index_of_letter * font.width,
            (index_of_letter + 1) * font.width
        );

    }
}