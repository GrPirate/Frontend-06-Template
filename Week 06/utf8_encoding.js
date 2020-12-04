function UTF8_Encoding(string) {
    var temp = "",rs = "";
	for( var i=0 , len = string.length; i < len; i++ ){
		temp = string.charCodeAt(i).toString(16);
		rs  += "\\u"+ new Array(5-temp.length).join("0") + temp;
	}
	return rs;
}

console.log(UTF8_Encoding('qwer'))
