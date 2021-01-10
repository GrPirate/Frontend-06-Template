function match(selector, element) {
    if (!element) return false;
    const selectorList = selector.split(' ').reverse();

    for (const select of selectorList) {
        const list = selector.match(/(#|.)?\w+/g);
        for (const item of list) {
            if (item.charAt(0) === '#') {
                if (!(element.id && element.id === item.replace('#', ''))) return false;
            } else if (item.charAt(0) === '.') {
                if (!(element.classList.length > 0 && Array.from(element.classList).includes(item.replace('.', '')))) return false;
            }
        }
    }
    return true;
}