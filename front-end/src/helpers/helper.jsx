export const appLogo = "https://i.pinimg.com/736x/40/ca/6e/40ca6ed78eb8496b7f5df730d6ac2f1f.jpg"


export function formatDate(data_s) {
    const date = new Date(data_s);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    return formattedDate
}
export function capitalizeEachWord(text) {
  return text.replace(/\b\w+/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
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

export function formatNumber(num) {
  if (num < 1000) return num.toString();
  if (num < 1_000_000)
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K";
  return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "M";
}
export function formatDateToShort(dateInput) {
  const date = new Date(dateInput);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // e.g., "Feb"
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
export function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\s+/g, "").replace(/-/g, "");

  const formats = {
    "+212": (num) => num.replace(/(\d{2})(?=\d)/g, "$1 ").trim(), // Morocco
    "+33": (num) => num.replace(/(\d{2})(?=\d)/g, "$1 ").trim(), // France
    "+44": (num) => num.replace(/(\d{5})(\d{6})/, "$1 $2"), // UK (e.g. 07911123456 → 07911 123456)
    "+1": (num) => num.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"), // US (e.g. (555) 123-4567)
    "+91": (num) => num.replace(/(\d{5})(\d{5})/, "$1 $2"), // India (e.g. 98765 43210)
    "+34": (num) => num.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4"), // Spain
  };

  if (cleaned.startsWith("+")) {
    for (const code in formats) {
      if (cleaned.startsWith(code)) {
        const countryCode = code;
        const numberBody = cleaned.slice(code.length).replace(/\D/g, "");
        return `${countryCode} ${formats[code](numberBody)}`;
      }
    }
    return phone; // Unsupported country, return as is
  }

  // Assume French format for local numbers
  const local = cleaned.replace(/\D/g, "");
  return local.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
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


