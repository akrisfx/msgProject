function getUniqueID() {
    prefix = 1;
    uniqueId = new Date().getMilliseconds();
    if (!uniqueId) uniqueId = (new Date()).getTime();
    return (prefix || 'id') + (uniqueId++);
}

module.exports = getUniqueID;