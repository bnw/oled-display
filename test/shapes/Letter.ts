import {assert} from 'chai';
import 'mocha';
import * as sinon from "sinon";
import {Pixel} from "../../src/Pixel";
import {Letter} from "../../src/shape/Letter";
import {Color} from "../../src/Display";

describe('Letter class', function () {

    it('should draw the correct pixels', function () {
        const letter = new Letter('.');
        const pixel_acceptor = {
            draw_pixels: sinon.spy()
        };
        letter.draw(pixel_acceptor);
        assert.equal(pixel_acceptor.draw_pixels.callCount, 7*5);
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(1, 5)], Color.White));
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(2, 5)], Color.White));
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(1, 6)], Color.White));
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(2, 6)], Color.White));
    });

    it('should draw the correct pixels when called with offset', function () {
        const letter = new Letter('.', new Pixel(10,100));
        const pixel_acceptor = {
            draw_pixels: sinon.spy()
        };
        letter.draw(pixel_acceptor);
        assert.equal(pixel_acceptor.draw_pixels.callCount, 7*5);
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(11, 105)], Color.White));
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(12, 105)], Color.White));
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(11, 106)], Color.White));
        assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(12, 106)], Color.White));
    });

    it('should resolve the promise', function () {
        const letter = new Letter('.', new Pixel(10,100));
        const pixel_acceptor = {
            draw_pixels: sinon.spy()
        };
        return letter.draw(pixel_acceptor);
    });

});