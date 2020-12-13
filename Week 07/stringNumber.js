function stringToNumber(str) {
    function changeFormat(val) {
        let formatList = '0123456789ABCDEF'
        return formatList.indexOf(val)
    }

    let radix = null;
    switch (str.substr(0, 2)) {
        case '0b':
            radix = 2
            break;
        case '0o':
            radix = 8
            break;
        case '0x':
            radix = 16;
            break
    }

    str = str.substr(2)
    let fixedIndex = str.indexOf('.')
    let fixed, intger

    if (fixedIndex !== -1) {
        fixed = str.substr(fixedIndex + 1)
        intger = str.substr(0, fixedIndex)
    } else {
        intger = str
    }
    let num = 0;
    for (let i = 0; i < intger.length; i++) {
        num += Number(changeFormat(intger[i])) * radix ** (intger.length - 1 - i)
    }
    if (fixed) {
        for (let i = 0; i < fixed.length; i++) {
            num += Number(changeFormat(fixed[i])) * radix ** -(i + 1)
        }
    }
    return Number(num)
}

console.log(stringToNumber('0b2313'))

function numberToString(num, base) {
    if (num === 0) return '0';
    if (base === 10) return String(num);

    let str = '';
    let number = Math.abs(num);
    let sign = num > 0 ? '' : '-';

    const table = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'
    ]

    while (number > 0) {
        str = table[number % base] + str;

        number = parseInt(String(number / base));
    }

    return sign + str;
}