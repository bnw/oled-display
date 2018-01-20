import {assert} from 'chai';
import 'mocha';
import * as sinon from "sinon";
import {Pixel} from "../../src/Pixel";
import {Letter} from "../../src/shape/Letter";

describe('Letter class', function () {

    it('should draw the correct pixels', function () {
        const letter = new Letter('.');
        const pixel_acceptor = {
            draw_pixels: sinon.spy()
        };
        letter.draw(pixel_acceptor);
        assert.equal(pixel_acceptor.draw_pixels.callCount, 4);
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(1, 5)]));
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(2, 5)]));
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(1, 6)]));
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(2, 6)]));
    });

});