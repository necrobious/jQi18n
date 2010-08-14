/**
 * Provides i18n dictionary via the $.i18n function.
 * The $.i18n function takes two parameters, the second being optional.
 * 
 * @param keyOrDict either a String or Object. If a String, then $.i18n will 
 *                  return the current dictionary value for the fiven string.
 *                  If an object, then the given object's properties and values
 *                  are appended to $.i18n's dictionary.
 *
 * @param substitutionMap an optional object to use for supplanting
 *                        $.i18n's dictionary value with.
 * 
 * e.g.
 *     // appends the object's properties to the i18n's lookup map
 *     $.i18n({"some.i18n.key": "hello world"}); 
 *
 *     // gets the key's value
 *     $.i18n('some.i18n.key'); ~> "hello world" 
 *
 *     // appends the object's properties to the i18n's lookup map, with a 
 *     // {greeting} placeholder
 *     $.i18n({"some.i18n.key": "{greeting} world"});
 *
 *     // replaces the {greeting}  placeholder within the
 *     $.i18n('some.i18n.key', {"greeting" : "hello"}); ~> "hello world"
 *
 */
(function($){
	$.i18n = function(keyOrDict, substitutionMap) {
		if (typeof keyOrDict === 'string') {
			var v = $.i18n.dictionary[keyOrDict];
			if (!substitutionMap) return v;
			
			// thanks doug! http://javascript.crockford.com/remedial.html
			return v.replace(/{([^{}]*)}/g, function (a, b) {
                var r = substitutionMap[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
		} 
		else if (typeof keyOrDict === 'object') {$.extend($.i18n.dictionary, keyOrDict)} 
		else {return null;}
	};
	$.i18n.dictionary = {};
})(jQuery);
