/***********************************************************************
 * Copyright (c) 2010 Bit Thicket Software
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function($) {
    $.fn.tristate = function(settings) {
        var config = {
            initialState: 'intermediate',
            imgPath: 'images/',
            after: null
        };

        if (settings) $.extend(config, settings);

        var getNextState = function(state) {
            switch (state) {
            case 'intermediate':
                return 'unchecked';
            case 'unchecked':
                return 'checked';
            case 'checked':
                return 'intermediate';
            }
        }

        this.each(function() {
            var html = '<img src="' + config.imgPath + config.initialState + '.gif' + '"/>' +
                '<input type="hidden" value="' + config.initialState + '" />';
            $(this).html(html);

            $(this).unbind('click');
            $(this).click(function() {
                var nextState = getNextState($('input', this).val());
                $('img', this).attr('src', config.imgPath + nextState + '.gif');
                $('input', this).val(nextState);
            });
            $('img', this).hover(function() {   /* in */
                var src = $(this).attr('src').replace(/\.gif$/i, '_highlighted.gif');
                $(this).attr('src', src);
            }, function() {                     /* out */
                var src = $(this).attr('src').replace(/_highlighted/, '');
                $(this).attr('src', src);
            });

            if (settings.after)
                settings.after(this);
        });
    };
})(jQuery);