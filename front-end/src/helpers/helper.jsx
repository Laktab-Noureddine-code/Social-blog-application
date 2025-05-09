export function formatDate(data_s){
    const date = new Date(data_s);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    return formattedDate
}

export function getNumber(count) {
    if(Array.isArray(count)){
        if (count.length < 1000) {
            return count.length
        }
        return `${(count.length / 1000).toFixed(1)} k`
    }
    return `${(count / 1000).toFixed(1) } k`
}

export const formatDateHeader = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
};

export const useCover = "https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
 