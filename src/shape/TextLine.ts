import {PixelAcceptor, Shape} from "./Shape";
import {Pixel} from "../Pixel";
import {Letter} from "./Letter";

export class TextLine implements Shape {

    constructor(private readonly text: string, private readonly position: Pixel = new Pixel(0, 0)) {
    }

    draw(display: PixelAcceptor): Promise<any> {
        const spacing = Letter.letter_width() + 1;

        const letters = this.text.split("");
        const promises = letters.map((letter, index) => {
            const letter_position = new Pixel(this.position.x + index * spacing, this.position.y);
            const letter_shape = new Letter(letter, letter_position);
            return letter_shape.draw(display);
        });

        return Promise.all(promises);
    }
}