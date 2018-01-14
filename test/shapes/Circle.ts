import {assert} from 'chai';
import 'mocha';
import * as sinon from "sinon";
import {Pixel} from "../../src/Pixel";
import {Circle} from "../../src/shape/Circle";

describe('Circle class', function () {

        it('should draw the correct pixels', function () {
            const line = new Circle(new Pixel(10, 10), 1);
            const pixel_acceptor = {
                draw_pixels: sinon.spy()
            };
            line.draw(pixel_acceptor);
            assert.equal(pixel_acceptor.draw_pixels.callCount, 4);
            assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(10, 11)]));
            assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(11, 10)]));
            assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(10, 9)]));
            assert(pixel_acceptor.draw_pixels.calledWithMatch([new Pixel(9, 10)]));
        });

});