import {assert} from 'chai';
import 'mocha';
import * as sinon from "sinon";
import {Pixel} from "../../src/Pixel";
import {Color} from "../../src/Display";
import {TextLine} from "../../src/shape/TextLine";
import {Letter} from "../../src/shape/Letter";

describe('TextLine class', function () {
    let draw_stub;
    const draw_stub_promise = Promise.resolve();
    const pixel_acceptor = {
        draw_pixels: sinon.spy()
    };

    beforeEach(function () {
        draw_stub = sinon.stub(Letter.prototype, 'draw').returns(draw_stub_promise);
    });

    afterEach(function () {
        draw_stub.restore();
        pixel_acceptor.draw_pixels.reset();
    });

    it('should draw the correct number of letters', function () {
        const text_line = new TextLine("abc");
        text_line.draw(pixel_acceptor);
        assert.equal(3, draw_stub.callCount);
    });
});