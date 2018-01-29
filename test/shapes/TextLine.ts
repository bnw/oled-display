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

    describe('TextLine.max_num_chars', function(){
        it('should give the correct number of chars that fit', function(){
            for(let width = 0; width < 17; width++){
                const max_num_chars = TextLine.max_num_chars(width);
                if(width <= 4){
                    assert.equal(max_num_chars, 0, "width = " + width);
                }else if(width <= 10){
                    assert.equal(max_num_chars, 1, "width = " + width);
                }else if(width <= 16){
                    assert.equal(max_num_chars, 2, "width = " + width);
                }
            }
        });

        it('should give zero for negative widths', function(){
            for(let width = 0; width < 17; width++){
                assert.equal(TextLine.max_num_chars(-width), 0);
            }
        })
    })
});