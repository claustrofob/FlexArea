/**
 *  FlexArea plugin for textarea
 *  
 *  @author		Nikola Zmachinsky <claus@zlog.ru>
 *  @version	0.0.2
 */

(function(jQuery){
	jQuery.fn.flexarea = function(){

		return this.each(function(){

			var $t = jQuery(this),
				t = this;

			var tVal = t.value;
			var tHeight = $t.height();

			t.style.resize = 'none';
			t.style.overflow = 'hidden';
			t.style.wordWrap = 'break-word';
			t.style.height = '0px';
			
			t.value = "";
			var H1 = t.scrollHeight;

			t.value = "\n";
			var H2 = t.scrollHeight;

			t.value = tVal;
			tVal = null;

			//some browsers (firefox) calculate scrollHeight without padding,
			//so we have to adjust scrollHeight value
			var vertAdjust = H1*2 - H2;

			$t.bind('input propertychange', function(){
				if (tVal != t.value){
					tVal = t.value;
					t.style.height = tHeight+'px';
					//sometimes IE8 may return invalid scrollHeight for the first time. 
					t.scrollHeight;
					var tH = t.scrollHeight - vertAdjust;
					if (tH > tHeight) {
						t.style.height = tH + 'px';
					}
					t.scrollTop = 0;
				}
			}).trigger('input');

		});

	};

})(jQuery);
