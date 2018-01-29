import {PixelAcceptor, Shape} from "./Shape";
import {Pixel} from "../Pixel";
import {Letter} from "./Letter";
import {Color} from "../Display";

export class TextLine implements Shape {

    constructor(
        private readonly text: string,
        private readonly position: Pixel = new Pixel(0, 0),
        private readonly color: Color = Color.White
    ) {
    }

    draw(display: PixelAcceptor): Promise<any> {
        const spacing = Letter.letter_width() + TextLine.space_between_letters;

        const letters = this.text.split("");
        const promises = letters.map((letter, index) => {
            const letter_position = new Pixel(this.position.x + index * spacing, this.position.y);
            const letter_shape = new Letter(letter, letter_position, this.color);
            return letter_shape.draw(display);
        });

        return Promise.all(promises);
    }

    width(): number {
        return TextLine.width_of_text(this.text);
    }

    static width_of_text(text: string) {
        return Letter.letter_width() * text.length + TextLine.space_between_letters * (text.length - 1);
    }

    static max_num_chars(width: number): number {
        if (width <= 0) return 0;
        return Math.floor(
            (width + 1) / (Letter.letter_width() + TextLine.space_between_letters)
        );
    }

    private static readonly space_between_letters = 1;
}