var request;
var $current;
var cache={};
var $frame =$('#photo-viewer');
var $thumbs = $('.thumb');

function crossfade($img) {
    if ($surrent) {
        $current.stop().fadeOut('slow');
    }
    $img.css({
        marginLeft:-$img.width() / 2,
        marginTop:-$img.height() / 2
    });

    $img.stop().fadeTo('slow', 1);
    $current = $img;
}
$(document).on('click','thumb', function(e){
    var $img,
        src = this.hrel;
        request = src;
    e.preventDefault();
    
    $thumbs.removeClass('active');
    $(this).addClass('active');
    if (cache.hasOwnProperty(src)){
        if (cache[src].isLoading === false){
            crossfade(cache[src].$img);
        }
    } esle {
        $img = $('<img/>');
        cache[src] = {
            $img : $img,
            isLoading: true
        };

        $img.on('Load',function(){
            $img.hide();
            $frame.removeClass('is-loading').append($img);
            cache[src].isLoading = false;
            if (request === src) {
                crossfade($img);
            }
        });
        $frame.addClass('is-loading');
        $img.attr({
            'src':src,
            'alt':this.title || ''
        });
    }
});
$('.thumb').eq(0).click();

