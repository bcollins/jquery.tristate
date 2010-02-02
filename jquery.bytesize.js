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