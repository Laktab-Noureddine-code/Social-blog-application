export function formatDate(data_s){
    const date = new Date(data_s);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    return formattedDate
}

export function getNumber(count) {
    if (count.length < 1000) {
        return count.length
    }
    return `${(count.length / 1000).toFixed(1)}k`
}

