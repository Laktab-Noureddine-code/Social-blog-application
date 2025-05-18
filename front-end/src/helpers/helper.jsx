export const appLogo = "https://i.pinimg.com/736x/40/ca/6e/40ca6ed78eb8496b7f5df730d6ac2f1f.jpg"


export function formatDate(data_s) {
    const date = new Date(data_s);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    return formattedDate
}

export function getNumber(count) {
    if (Array.isArray(count)) {
        if (count.length < 1000) {
            return count.length
        }
        return `${(count.length / 1000).toFixed(1)} k`
    }
    return `${(count / 1000).toFixed(1)} k`
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



export function groupCover(cover) {
    const defaultCover = "https://i.pinimg.com/736x/b7/80/6e/b7806eb61be831f86a4000f8cde924b1.jpg";
    if (cover) {
        if (cover.startsWith("https://")) {
            return cover
        } else {
            return "http://localhost:8000/storage/" + cover
        }

    }
    return defaultCover;
}
export function groupProfile(profile) {
    const defaultprofile = "https://i.pinimg.com/736x/b7/80/6e/b7806eb61be831f86a4000f8cde924b1.jpg";
    const profileImage = profile ? "http://localhost:8000/storage/" + profile : defaultprofile;
    return profileImage;
}

export function userProfile(profile) {
    const defaultprofile = "https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg";
    const profileImage = profile ? profile : defaultprofile;
    return profileImage;
}


