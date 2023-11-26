export function isCapitalLetterPresentInPassword(password) {
    const capitals = password.match(/[A-Z]/g);
    console.log(capitals);
    if (capitals) {
        return true;
    } else {
        return false;
    }
};

export function isSpecialCharacterPresentInPassword(password) {
    const special = password.match(/[^a-zA-Z0-9\s]/g);
    console.log(special);
    if (special) {
        return true;
    } else {
        return false;
    }
};
export function isPasswordLengthEnough(password) {
    if (password.length > 6) {
        return true;
    } else {
        return false;
    }
};

export function getProjectName() {
    return 'Skill Share';
}


export function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

export function convertDate(epochTime) {
    const date = new Date(epochTime * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


export function convertDateToEpoch(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day); // Months are 0-based, so subtract 1 from the month
    const epochTime = date.getTime() / 1000; // Convert to seconds
    return epochTime;
}


